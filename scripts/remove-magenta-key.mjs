import fs from "node:fs";
import zlib from "node:zlib";

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  throw new Error("Usage: node scripts/remove-magenta-key.mjs <input.png> <output.png>");
}

const source = fs.readFileSync(input);
const signature = source.subarray(0, 8);
const expected = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

if (!signature.equals(expected)) throw new Error("Input is not a PNG");

let offset = 8;
let width = 0;
let height = 0;
let colorType = 0;
const idat = [];

while (offset < source.length) {
  const length = source.readUInt32BE(offset);
  const type = source.subarray(offset + 4, offset + 8).toString("ascii");
  const data = source.subarray(offset + 8, offset + 8 + length);
  offset += 12 + length;

  if (type === "IHDR") {
    width = data.readUInt32BE(0);
    height = data.readUInt32BE(4);
    colorType = data[9];
  }

  if (type === "IDAT") idat.push(data);
  if (type === "IEND") break;
}

if (colorType !== 2 && colorType !== 6) {
  throw new Error(`Unsupported PNG colour type: ${colorType}`);
}

const channels = colorType === 6 ? 4 : 3;
const inflated = zlib.inflateSync(Buffer.concat(idat));
const stride = width * channels;
const raw = Buffer.alloc(height * (width * 4 + 1));
let srcOffset = 0;
let previous = Buffer.alloc(stride);

for (let y = 0; y < height; y += 1) {
  const filter = inflated[srcOffset];
  srcOffset += 1;
  const scanline = Buffer.from(inflated.subarray(srcOffset, srcOffset + stride));
  srcOffset += stride;
  const reconstructed = unfilter(scanline, previous, filter, channels);
  previous = reconstructed;

  const rowStart = y * (width * 4 + 1);
  raw[rowStart] = 0;

  for (let x = 0; x < width; x += 1) {
    const inIndex = x * channels;
    const outIndex = rowStart + 1 + x * 4;
    const red = reconstructed[inIndex];
    const green = reconstructed[inIndex + 1];
    const blue = reconstructed[inIndex + 2];
    const alpha = colorType === 6 ? reconstructed[inIndex + 3] : 255;
    const magentaDistance = Math.abs(red - 255) + Math.abs(green - 0) + Math.abs(blue - 255);
    const isKey = magentaDistance < 70 && red > 190 && blue > 190 && green < 80;
    const isFringe = magentaDistance < 150 && red > 150 && blue > 150 && green < 120;

    if (isKey) {
      raw[outIndex] = 0;
      raw[outIndex + 1] = 0;
      raw[outIndex + 2] = 0;
      raw[outIndex + 3] = 0;
    } else if (isFringe) {
      raw[outIndex] = Math.min(red, 32);
      raw[outIndex + 1] = Math.max(green, 84);
      raw[outIndex + 2] = Math.min(blue, 48);
      raw[outIndex + 3] = Math.min(alpha, 96);
    } else {
      raw[outIndex] = red;
      raw[outIndex + 1] = green;
      raw[outIndex + 2] = blue;
      raw[outIndex + 3] = alpha;
    }
  }
}

const png = Buffer.concat([
  expected,
  chunk("IHDR", ihdr(width, height)),
  chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

fs.writeFileSync(output, png);

function unfilter(scanline, previous, filter, bpp) {
  const out = Buffer.alloc(scanline.length);

  for (let i = 0; i < scanline.length; i += 1) {
    const left = i >= bpp ? out[i - bpp] : 0;
    const up = previous[i] ?? 0;
    const upLeft = i >= bpp ? previous[i - bpp] : 0;
    const value = scanline[i];

    if (filter === 0) out[i] = value;
    else if (filter === 1) out[i] = (value + left) & 255;
    else if (filter === 2) out[i] = (value + up) & 255;
    else if (filter === 3) out[i] = (value + Math.floor((left + up) / 2)) & 255;
    else if (filter === 4) out[i] = (value + paeth(left, up, upLeft)) & 255;
    else throw new Error(`Unsupported PNG filter: ${filter}`);
  }

  return out;
}

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function ihdr(widthValue, heightValue) {
  const data = Buffer.alloc(13);
  data.writeUInt32BE(widthValue, 0);
  data.writeUInt32BE(heightValue, 4);
  data[8] = 8;
  data[9] = 6;
  data[10] = 0;
  data[11] = 0;
  data[12] = 0;
  return data;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}
