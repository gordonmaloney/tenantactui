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

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function TenantButton({
  variant = "primary",
  size = "medium",
  icon,
  className,
  children,
  ...props
}) {
  const muiVariant = variant === "ghost" ? "text" : variant.includes("outline") ? "outlined" : "contained";
  return (
    <Button
      className={cx("ta-button", `ta-button--${variant}`, `ta-button--${size}`, className)}
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
  const { className, ...rest } = props;
  return (
    <Tooltip title={label}>
      <IconButton className={cx("ta-icon-button", `ta-icon-button--${variant}`, className)} aria-label={label} {...rest}>
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export function TenantBadge({ children, tone = "neutral", variant = "filled", onDelete, className, ...props }) {
  return <Chip className={cx("ta-badge", `ta-badge--${tone}`, `ta-badge--${variant}`, className)} label={children} onDelete={onDelete} size="small" {...props} />;
}

export function TenantStatusPill({ status = "ready", variant = "filled", children, className, ...props }) {
  const labels = {
    ready: "Ready",
    active: "Active",
    "in-progress": "In progress",
    draft: "Draft",
    warning: "Needs review",
    error: "Blocked",
  };
  return <span className={cx("ta-status", `ta-status--${status}`, `ta-status--${variant}`, className)} {...props}>{children || labels[status] || status}</span>;
}

export function TenantCard({
  title,
  eyebrow,
  icon,
  tone = "default",
  density = "default",
  interactive = false,
  children,
  action,
  className,
  ...props
}) {
  return (
    <section className={cx("ta-card", `ta-card--${tone}`, `ta-card--${density}`, interactive && "ta-card--interactive", className)} {...props}>
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

export function TenantInfoCard({ title, children, icon = <FileText size={18} />, action = "Learn more", tone = "default", ...props }) {
  return (
    <TenantCard title={title} icon={icon} tone={tone} action={<a className="ta-link" href="#top">{action} <ArrowRight size={14} /></a>} {...props}>
      <p>{children}</p>
    </TenantCard>
  );
}

export function TenantStatCard({ value, label, note, icon, tone = "stat", ...props }) {
  return (
    <TenantCard tone={tone} {...props}>
      <div className="ta-stat">
        {icon && <span className="ta-card__icon">{icon}</span>}
        <strong>{value}</strong>
        <span>{label}</span>
        {note && <small>{note}</small>}
      </div>
    </TenantCard>
  );
}

export function TenantTextInput({ label, placeholder, value, onChange, helperText, variant = "default", size = "small", fullWidth = true, className, ...props }) {
  return (
    <TextField
      className={cx("ta-field", `ta-field--${variant}`, className)}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      helperText={helperText}
      size={size}
      fullWidth={fullWidth}
      {...props}
    />
  );
}

export function TenantSearchInput({ placeholder = "Search...", value, onChange, variant = "default", size = "small", fullWidth = true, className, ...props }) {
  return (
    <TextField
      className={cx("ta-field", "ta-search", `ta-field--${variant}`, className)}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      size={size}
      fullWidth={fullWidth}
      InputProps={{ startAdornment: <InputAdornment position="start"><Search size={17} /></InputAdornment> }}
      {...props}
    />
  );
}

export function TenantTextarea({ label, placeholder, maxLength = 300, value: controlledValue, onChange, minRows = 4, variant = "default", className, ...props }) {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue ?? internalValue;

  function handleChange(event) {
    setInternalValue(event.target.value);
    onChange?.(event);
  }

  return (
    <div className={cx("ta-textarea-wrap", className)}>
      <TextField
        className={cx("ta-field", `ta-field--${variant}`)}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        multiline
        minRows={minRows}
        fullWidth
        {...props}
      />
      <span>{value.length} / {maxLength}</span>
    </div>
  );
}

export function TenantSelect({ label, options = [], value = "", onChange, variant = "default", size = "small", fullWidth = true, className, ...props }) {
  const id = useId();
  return (
    <FormControl className={cx("ta-select", `ta-select--${variant}`, className)} size={size} fullWidth={fullWidth}>
      <label htmlFor={id}>{label}</label>
      <Select id={id} value={value || options[0]?.value || ""} onChange={onChange} {...props}>
        {options.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
      </Select>
    </FormControl>
  );
}

export function TenantCheckbox({ label, checked = true, size = "small", className, ...props }) {
  return <FormControlLabel className={cx("ta-check", className)} control={<Checkbox defaultChecked={checked} size={size} {...props} />} label={label} />;
}

export function TenantRadioGroup({ options = ["Phone call", "SMS"], direction = "vertical", size = "small", className, ...props }) {
  return (
    <RadioGroup className={cx("ta-radio", `ta-radio--${direction}`, className)} defaultValue={options[0]} {...props}>
      {options.map((option) => <FormControlLabel key={option} value={option} control={<Radio size={size} />} label={option} />)}
    </RadioGroup>
  );
}

export function TenantToggle({ label, checked = true, size = "small", className, ...props }) {
  return <FormControlLabel className={cx("ta-toggle", className)} control={<Switch defaultChecked={checked} size={size} {...props} />} label={label} />;
}

export function TenantTabs({ tabs, value, onChange, variant = "underline", size = "medium", className, ...props }) {
  return (
    <Tabs className={cx("ta-tabs", `ta-tabs--${variant}`, `ta-tabs--${size}`, className)} value={value} onChange={(_, next) => onChange(next)} variant="scrollable" scrollButtons="auto" {...props}>
      {tabs.map((tab) => <Tab key={tab.value} value={tab.value} label={tab.label} />)}
    </Tabs>
  );
}

export function TenantSegmentedControl({ options, value, onChange, size = "medium", tone = "neutral", className, ...props }) {
  return (
    <div className={cx("ta-segmented", `ta-segmented--${size}`, `ta-segmented--${tone}`, className)} role="tablist" aria-label="Segmented control" {...props}>
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

export function TenantAlertBanner({ tone = "success", variant = "soft", children, onClose, className, ...props }) {
  return (
    <Alert
      className={cx("ta-alert", `ta-alert--${tone}`, `ta-alert--${variant}`, className)}
      severity={tone === "danger" ? "error" : tone}
      action={onClose ? <IconButton size="small" onClick={onClose} aria-label="Dismiss"><X size={14} /></IconButton> : null}
      {...props}
    >
      {children}
    </Alert>
  );
}

export function TenantCalloutBox({ tone = "info", variant = "soft", title, children, className, ...props }) {
  return (
    <aside className={cx("ta-callout", `ta-callout--${tone}`, `ta-callout--${variant}`, className)} {...props}>
      <strong>{title}</strong>
      <p>{children}</p>
    </aside>
  );
}

export function TenantModal({ open, title, children, onClose, size = "xs", actions, className, ...props }) {
  return (
    <Dialog className={cx("ta-modal", className)} open={open} onClose={onClose} maxWidth={size} fullWidth {...props}>
      <DialogTitle>{title}<IconButton aria-label="Close" onClick={onClose}><X size={16} /></IconButton></DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions || (
          <>
            <TenantButton variant="outline" onClick={onClose}>Cancel</TenantButton>
            <TenantButton onClick={onClose}>Yes, start</TenantButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

export function TenantSidePanel({ open, title, children, onClose, width = "default", className, ...props }) {
  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ className: cx("ta-drawer", `ta-drawer--${width}`, className) }} {...props}>
      <div className="ta-drawer__header">
        <h3>{title}</h3>
        <TenantIconButton label="Close" icon={<X size={16} />} onClick={onClose} />
      </div>
      {children}
    </Drawer>
  );
}

export function TenantStepper({ steps = [], current = 0, vertical = false, variant = "numbered", className, ...props }) {
  return (
    <ol className={cx("ta-stepper", vertical && "ta-stepper--vertical", `ta-stepper--${variant}`, className)} {...props}>
      {steps.map((step, index) => (
        <li key={step} className={index < current ? "is-done" : index === current ? "is-current" : ""}>
          <span>{index < current ? <Check size={13} /> : index + 1}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}

export function TenantProgressBar({ value = 45, label, tone = "primary", size = "medium", className, ...props }) {
  return (
    <div className={cx("ta-progress", `ta-progress--${tone}`, `ta-progress--${size}`, className)} {...props}>
      {label && <span>{label}</span>}
      <LinearProgress variant="determinate" value={value} />
    </div>
  );
}

export function TenantTable({ rows = [], density = "default", variant = "default", className, ...props }) {
  return (
    <div className={cx("ta-table-wrap", `ta-table-wrap--${variant}`, className)} {...props}>
      <table className={cx("ta-table", `ta-table--${density}`)}>
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

export function TenantTableToolbar({ resultCount = 1415, density = "default", className, ...props }) {
  return (
    <div className={cx("ta-table-toolbar", `ta-table-toolbar--${density}`, className)} {...props}>
      <strong>{resultCount} results found</strong>
      <TenantSelect label="Sort by" options={[{ label: "Newest first", value: "new" }, { label: "Most relevant", value: "relevant" }]} />
    </div>
  );
}

export function TenantPagination({ page = 1, total = 71, size = "medium", className, ...props }) {
  return (
    <nav className={cx("ta-pagination", `ta-pagination--${size}`, className)} aria-label="Pagination" {...props}>
      <TenantIconButton label="Previous page" icon={<ChevronLeft size={15} />} />
      {[1, 2, 3].map((item) => <button key={item} className={item === page ? "is-active" : ""}>{item}</button>)}
      <span>...</span>
      <button>{total}</button>
      <TenantIconButton label="Next page" icon={<ChevronRight size={15} />} />
    </nav>
  );
}

export function TenantEmptyState({ title = "No results yet", children = "Try adjusting your filters or search for a different location or issue.", action, tone = "default", className, ...props }) {
  return (
    <div className={cx("ta-empty", `ta-empty--${tone}`, className)} {...props}>
      <span><Inbox size={34} /></span>
      <strong>{title}</strong>
      <p>{children}</p>
      {action || <TenantButton variant="outline">Clear filters</TenantButton>}
    </div>
  );
}

export function TenantToolbar({ children, density = "default", align = "start", className, ...props }) {
  return <div className={cx("ta-toolbar", `ta-toolbar--${density}`, `ta-toolbar--${align}`, className)} {...props}>{children}</div>;
}

export function TenantBreadcrumbs({ items = [], variant = "slash", className, ...props }) {
  return <nav className={cx("ta-breadcrumbs", `ta-breadcrumbs--${variant}`, className)} aria-label="Breadcrumb" {...props}>{items.map((item, index) => <span key={item}>{index > 0 && "/"} {item}</span>)}</nav>;
}

export function TenantCommandPalette({ variant = "panel", className, ...props }) {
  return (
    <div className={cx("ta-command", `ta-command--${variant}`, className)} {...props}>
      <TenantSearchInput placeholder="Type a command or component..." />
      {["Open Buttons and actions", "Insert status pill", "Copy import snippet"].map((item) => (
        <button key={item}><Search size={14} />{item}<kbd>Enter</kbd></button>
      ))}
    </div>
  );
}

export function TenantFilterBuilder({ variant = "inline", className, ...props }) {
  return (
    <div className={cx("ta-filter-builder", `ta-filter-builder--${variant}`, className)} {...props}>
      <TenantBadge tone="success">Location: Edinburgh</TenantBadge>
      <TenantBadge tone="success">Issue: Repair</TenantBadge>
      <TenantButton variant="ghost"><Filter size={15} /> Show advanced filters</TenantButton>
    </div>
  );
}

export function TenantUploadDropzone({ tone = "default", className, ...props }) {
  return (
    <div className={cx("ta-dropzone", `ta-dropzone--${tone}`, className)} {...props}>
      <Upload size={30} />
      <strong>Import contacts</strong>
      <p>Drop a CSV here or choose a file to map columns.</p>
      <TenantButton variant="outline">Choose file</TenantButton>
    </div>
  );
}

export function TenantTimeline({ items = [], density = "default", className, ...props }) {
  return (
    <ol className={cx("ta-timeline", `ta-timeline--${density}`, className)} {...props}>
      {items.map((item) => <li key={item.title}><span /><strong>{item.title}</strong><small>{item.meta}</small><p>{item.text}</p></li>)}
    </ol>
  );
}

export function TenantActivityFeed({ items = [], density = "default", className, ...props }) {
  return (
    <div className={cx("ta-feed", `ta-feed--${density}`, className)} {...props}>
      {items.map((item) => (
        <article key={item.title}>
          <span className="ta-avatar">{item.initials}</span>
          <div><strong>{item.title}</strong><p>{item.text}</p><small>{item.time}</small></div>
        </article>
      ))}
    </div>
  );
}

export function TenantMobileBottomNav({ items = [], defaultActive = 0, onChange, variant = "default", className, ...props }) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  function chooseItem(index, item) {
    setActiveIndex(index);
    onChange?.(item, index);
  }

  return (
    <nav className={cx("ta-mobile-nav", `ta-mobile-nav--${variant}`, className)} aria-label="Mobile navigation" {...props}>
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

export function TenantBottomSheet({ title = "Call notes", children, height = "default", className, ...props }) {
  return (
    <div className={cx("ta-phone-frame", className)} {...props}>
      <div className={cx("ta-bottom-sheet", `ta-bottom-sheet--${height}`)}>
        <span className="ta-sheet-handle" />
        <div className="ta-bottom-sheet__header"><strong>{title}</strong><GripVertical size={16} /></div>
        {children}
      </div>
    </div>
  );
}

export function TenantLogoLockup({ product = "REACHOUT", size = "medium", className, ...props }) {
  const split = product === "REACHOUT" ? ["REACH", "OUT"] : [product.split(" ")[0], product.replace(product.split(" ")[0], "")];
  return <span className={cx("ta-lockup", `ta-lockup--${size}`, className)} {...props}><span>{split[0]}</span>{split[1]} <small>by TenantAct</small></span>;
}

export function TenantColourSwatch({ name, value, className, ...props }) {
  return <div className={cx("ta-swatch", className)} {...props}><span style={{ background: value }} /><strong>{name}</strong><code>{value}</code></div>;
}

export function TenantTypographySample({ scale = "default", className, ...props }) {
  return (
    <div className={cx("ta-type-sample", `ta-type-sample--${scale}`, className)} {...props}>
      <h2>This is a headline</h2>
      <h3>This is a section title</h3>
      <p>This is body copy. It should be clear, readable, and work at a wide range of sizes.</p>
    </div>
  );
}
