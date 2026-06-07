import { useId, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  GripVertical,
  Inbox,
  MoreVertical,
  Search,
  Upload,
  X,
} from "lucide-react";
import { tenantBrushStrokes } from "../brushes.js";
import "./tenant-components.css";

export function TenantButton({
  variant = "primary",
  size = "medium",
  icon,
  children,
  ...props
}) {
  const muiVariant = variant === "ghost" ? "text" : variant === "outline" ? "outlined" : "contained";
  return (
    <Button
      className={`ta-button ta-button--${variant} ta-button--${size}`}
      variant={muiVariant}
      endIcon={icon === "arrow" ? <ArrowRight size={16} /> : icon}
      {...props}
    >
      {children}
    </Button>
  );
}

export function TenantAccentPhrase({
  children,
  phrase,
  variant = 0,
  as: Element = "span",
  className = "",
}) {
  const text = String(children ?? "");
  const brush = typeof variant === "string"
    ? tenantBrushStrokes.find((item) => item.id === variant) || tenantBrushStrokes[0]
    : tenantBrushStrokes[Math.abs(variant) % tenantBrushStrokes.length];

  if (!phrase || !text.includes(phrase)) {
    return <Element className={className}>{children}</Element>;
  }

  const [before, ...afterParts] = text.split(phrase);
  const after = afterParts.join(phrase);

  return (
    <Element className={`ta-accent-phrase ${className}`.trim()}>
      {before}
      <span className="ta-accent-phrase__word">
        {phrase}
        <img
          src={brush.src}
          alt=""
          aria-hidden="true"
          style={{ transform: brush.transform }}
        />
      </span>
      {after}
    </Element>
  );
}

export function TenantIconButton({ label, icon, variant = "plain", ...props }) {
  return (
    <Tooltip title={label}>
      <IconButton className={`ta-icon-button ta-icon-button--${variant}`} aria-label={label} {...props}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export function TenantBadge({ children, tone = "neutral", onDelete }) {
  return <Chip className={`ta-badge ta-badge--${tone}`} label={children} onDelete={onDelete} size="small" />;
}

export function TenantStatusPill({ status = "ready", children }) {
  const labels = {
    ready: "Ready",
    active: "Active",
    "in-progress": "In progress",
    draft: "Draft",
    warning: "Needs review",
    error: "Blocked",
  };
  return <span className={`ta-status ta-status--${status}`}>{children || labels[status] || status}</span>;
}

export function TenantCard({ title, eyebrow, icon, tone = "default", children, action }) {
  return (
    <section className={`ta-card ta-card--${tone}`}>
      {(icon || eyebrow) && (
        <div className="ta-card__meta">
          {icon && <span className="ta-card__icon">{icon}</span>}
          {eyebrow && <span className="ta-eyebrow">{eyebrow}</span>}
        </div>
      )}
      {title && <h3>{title}</h3>}
      <div className="ta-card__body">{children}</div>
      {action && <div className="ta-card__action">{action}</div>}
    </section>
  );
}

export function TenantInfoCard({ title, children, icon = <FileText size={18} />, action = "Learn more" }) {
  return (
    <TenantCard title={title} icon={icon} action={<a className="ta-link" href="#top">{action} <ArrowRight size={14} /></a>}>
      <p>{children}</p>
    </TenantCard>
  );
}

export function TenantStatCard({ value, label, note, icon }) {
  return (
    <TenantCard tone="stat">
      <div className="ta-stat">
        {icon && <span className="ta-card__icon">{icon}</span>}
        <strong>{value}</strong>
        <span>{label}</span>
        {note && <small>{note}</small>}
      </div>
    </TenantCard>
  );
}

export function TenantTextInput({ label, placeholder, value, onChange, helperText }) {
  return (
    <TextField
      className="ta-field"
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      helperText={helperText}
      size="small"
      fullWidth
    />
  );
}

export function TenantSearchInput({ placeholder = "Search...", value, onChange }) {
  return (
    <TextField
      className="ta-field ta-search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      size="small"
      fullWidth
      InputProps={{ startAdornment: <InputAdornment position="start"><Search size={17} /></InputAdornment> }}
    />
  );
}

export function TenantTextarea({ label, placeholder, maxLength = 300 }) {
  const [value, setValue] = useState("");
  return (
    <div className="ta-textarea-wrap">
      <TextField
        className="ta-field"
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        multiline
        minRows={4}
        fullWidth
      />
      <span>{value.length} / {maxLength}</span>
    </div>
  );
}

export function TenantSelect({ label, options = [], value = "", onChange }) {
  const id = useId();
  return (
    <FormControl className="ta-select" size="small" fullWidth>
      <label htmlFor={id}>{label}</label>
      <Select id={id} value={value || options[0]?.value || ""} onChange={onChange}>
        {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

export function TenantCheckbox({ label, checked = true }) {
  return <FormControlLabel className="ta-check" control={<Checkbox defaultChecked={checked} size="small" />} label={label} />;
}

export function TenantRadioGroup({ options = ["Phone call", "SMS"] }) {
  return (
    <RadioGroup className="ta-radio" defaultValue={options[0]}>
      {options.map((option) => <FormControlLabel key={option} value={option} control={<Radio size="small" />} label={option} />)}
    </RadioGroup>
  );
}

export function TenantToggle({ label, checked = true }) {
  return <FormControlLabel className="ta-toggle" control={<Switch defaultChecked={checked} size="small" />} label={label} />;
}

export function TenantTabs({ tabs, value, onChange }) {
  return (
    <Tabs className="ta-tabs" value={value} onChange={(_, next) => onChange(next)} variant="scrollable" scrollButtons="auto">
      {tabs.map((tab) => <Tab key={tab.value} value={tab.value} label={tab.label} />)}
    </Tabs>
  );
}

export function TenantSegmentedControl({ options, value, onChange }) {
  return (
    <div className="ta-segmented" role="tablist" aria-label="Segmented control">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={value === option.value ? "is-active" : ""}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function TenantAlertBanner({ tone = "success", children, onClose }) {
  return (
    <Alert
      className={`ta-alert ta-alert--${tone}`}
      severity={tone === "danger" ? "error" : tone}
      action={onClose ? <IconButton size="small" onClick={onClose} aria-label="Dismiss"><X size={14} /></IconButton> : null}
    >
      {children}
    </Alert>
  );
}

export function TenantCalloutBox({ tone = "info", title, children }) {
  return (
    <aside className={`ta-callout ta-callout--${tone}`}>
      <strong>{title}</strong>
      <p>{children}</p>
    </aside>
  );
}

export function TenantModal({ open, title, children, onClose }) {
  return (
    <Dialog className="ta-modal" open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}<IconButton aria-label="Close" onClick={onClose}><X size={16} /></IconButton></DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <TenantButton variant="outline" onClick={onClose}>Cancel</TenantButton>
        <TenantButton onClick={onClose}>Yes, start</TenantButton>
      </DialogActions>
    </Dialog>
  );
}

export function TenantSidePanel({ open, title, children, onClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ className: "ta-drawer" }}>
      <div className="ta-drawer__header">
        <h3>{title}</h3>
        <TenantIconButton label="Close" icon={<X size={16} />} onClick={onClose} />
      </div>
      {children}
    </Drawer>
  );
}

export function TenantStepper({ steps = [], current = 0, vertical = false }) {
  return (
    <ol className={`ta-stepper ${vertical ? "ta-stepper--vertical" : ""}`}>
      {steps.map((step, index) => (
        <li key={step} className={index < current ? "is-done" : index === current ? "is-current" : ""}>
          <span>{index < current ? <Check size={13} /> : index + 1}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}

export function TenantProgressBar({ value = 45, label }) {
  return (
    <div className="ta-progress">
      {label && <span>{label}</span>}
      <LinearProgress variant="determinate" value={value} />
    </div>
  );
}

export function TenantTable({ rows = [] }) {
  return (
    <div className="ta-table-wrap">
      <table className="ta-table">
        <thead>
          <tr><th>Name</th><th>Phone number</th><th>Last contact</th><th>Status</th><th /></tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td><span className="ta-avatar">{row.name.slice(0, 2)}</span>{row.name}</td>
              <td>{row.phone}</td>
              <td>{row.last}</td>
              <td><TenantStatusPill status={row.status}>{row.label}</TenantStatusPill></td>
              <td><TenantIconButton label="More" icon={<MoreVertical size={16} />} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TenantTableToolbar({ resultCount = 1415 }) {
  return (
    <div className="ta-table-toolbar">
      <strong>{resultCount} results found</strong>
      <TenantSelect label="Sort by" options={[{ label: "Newest first", value: "new" }, { label: "Most relevant", value: "relevant" }]} />
    </div>
  );
}

export function TenantPagination({ page = 1, total = 71 }) {
  return (
    <nav className="ta-pagination" aria-label="Pagination">
      <TenantIconButton label="Previous page" icon={<ChevronLeft size={15} />} />
      {[1, 2, 3].map((item) => <button key={item} className={item === page ? "is-active" : ""}>{item}</button>)}
      <span>...</span>
      <button>{total}</button>
      <TenantIconButton label="Next page" icon={<ChevronRight size={15} />} />
    </nav>
  );
}

export function TenantEmptyState({ title = "No results yet", children = "Try adjusting your filters or search for a different location or issue." }) {
  return (
    <div className="ta-empty">
      <span><Inbox size={34} /></span>
      <strong>{title}</strong>
      <p>{children}</p>
      <TenantButton variant="outline">Clear filters</TenantButton>
    </div>
  );
}

export function TenantToolbar({ children }) {
  return <div className="ta-toolbar">{children}</div>;
}

export function TenantBreadcrumbs({ items = [] }) {
  return <nav className="ta-breadcrumbs" aria-label="Breadcrumb">{items.map((item, index) => <span key={item}>{index > 0 && "/"} {item}</span>)}</nav>;
}

export function TenantCommandPalette() {
  return (
    <div className="ta-command">
      <TenantSearchInput placeholder="Type a command or component..." />
      {["Open Buttons and actions", "Insert status pill", "Copy import snippet"].map((item) => (
        <button key={item}><Search size={14} />{item}<kbd>Enter</kbd></button>
      ))}
    </div>
  );
}

export function TenantFilterBuilder() {
  return (
    <div className="ta-filter-builder">
      <TenantBadge tone="success">Location: Edinburgh</TenantBadge>
      <TenantBadge tone="success">Issue: Repair</TenantBadge>
      <TenantButton variant="ghost"><Filter size={15} /> Show advanced filters</TenantButton>
    </div>
  );
}

export function TenantUploadDropzone() {
  return (
    <div className="ta-dropzone">
      <Upload size={30} />
      <strong>Import contacts</strong>
      <p>Drop a CSV here or choose a file to map columns.</p>
      <TenantButton variant="outline">Choose file</TenantButton>
    </div>
  );
}

export function TenantTimeline({ items = [] }) {
  return (
    <ol className="ta-timeline">
      {items.map((item) => <li key={item.title}><span /><strong>{item.title}</strong><small>{item.meta}</small><p>{item.text}</p></li>)}
    </ol>
  );
}

export function TenantActivityFeed({ items = [] }) {
  return (
    <div className="ta-feed">
      {items.map((item) => (
        <article key={item.title}>
          <span className="ta-avatar">{item.initials}</span>
          <div><strong>{item.title}</strong><p>{item.text}</p><small>{item.time}</small></div>
        </article>
      ))}
    </div>
  );
}

export function TenantMobileBottomNav({ items = [], defaultActive = 0, onChange }) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  function chooseItem(index, item) {
    setActiveIndex(index);
    onChange?.(item, index);
  }

  return (
    <nav className="ta-mobile-nav" aria-label="Mobile navigation">
      {items.map((item, index) => (
        <button
          key={item.label}
          type="button"
          className={index === activeIndex ? "is-active" : ""}
          onClick={() => chooseItem(index, item)}
          aria-current={index === activeIndex ? "page" : undefined}
        >
          {item.icon}<span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function TenantBottomSheet({ title = "Call notes", children }) {
  return (
    <div className="ta-phone-frame">
      <div className="ta-bottom-sheet">
        <span className="ta-sheet-handle" />
        <div className="ta-bottom-sheet__header"><strong>{title}</strong><GripVertical size={16} /></div>
        {children}
      </div>
    </div>
  );
}

export function TenantLogoLockup({ product = "REACHOUT" }) {
  const split = product === "REACHOUT" ? ["REACH", "OUT"] : [product.split(" ")[0], product.replace(product.split(" ")[0], "")];
  return <span className="ta-lockup"><span>{split[0]}</span>{split[1]} <small>by TenantAct</small></span>;
}

export function TenantColourSwatch({ name, value }) {
  return <div className="ta-swatch"><span style={{ background: value }} /><strong>{name}</strong><code>{value}</code></div>;
}

export function TenantTypographySample() {
  return (
    <div className="ta-type-sample">
      <h2>This is a headline</h2>
      <h3>This is a section title</h3>
      <p>This is body copy. It should be clear, readable, and work at a wide range of sizes.</p>
    </div>
  );
}
