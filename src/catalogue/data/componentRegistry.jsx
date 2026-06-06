/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import {
  Bell,
  BookOpen,
  Box,
  CheckCircle2,
  Clock3,
  Database,
  FileInput,
  FileText,
  Filter,
  FolderOpen,
  FormInput,
  GitBranch,
  Grid2X2,
  Home,
  LayoutDashboard,
  ListChecks,
  MessageSquare,
  MousePointer2,
  PanelRight,
  Phone,
  PieChart,
  Search,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Table2,
  Tag,
  Upload,
  Users,
  Wrench,
} from "lucide-react";
import {
  TenantActivityFeed,
  TenantAlertBanner,
  TenantBadge,
  TenantBottomSheet,
  TenantBreadcrumbs,
  TenantButton,
  TenantCalloutBox,
  TenantCard,
  TenantColourSwatch,
  TenantCommandPalette,
  TenantEmptyState,
  TenantFilterBuilder,
  TenantIconButton,
  TenantInfoCard,
  TenantLogoLockup,
  TenantMobileBottomNav,
  TenantPagination,
  TenantProgressBar,
  TenantRadioGroup,
  TenantSearchInput,
  TenantSegmentedControl,
  TenantSelect,
  TenantStatCard,
  TenantStatusPill,
  TenantStepper,
  TenantTabs,
  TenantTable,
  TenantTableToolbar,
  TenantTextInput,
  TenantTextarea,
  TenantTimeline,
  TenantToggle,
  TenantTypographySample,
  TenantUploadDropzone,
  TenantCheckbox,
  TenantModal,
  TenantSidePanel,
} from "../../lib";

export const categories = [
  { id: "foundations", name: "Foundations", icon: Box, count: 12 },
  { id: "navigation", name: "Navigation", icon: LayoutDashboard, count: 14 },
  { id: "buttons", name: "Buttons and actions", icon: MousePointer2, count: 18 },
  { id: "forms", name: "Inputs and forms", icon: FormInput, count: 22 },
  { id: "tabs", name: "Tabs and segmented controls", icon: FolderOpen, count: 8 },
  { id: "cards", name: "Cards", icon: FileText, count: 10 },
  { id: "tables", name: "Lists and tables", icon: Table2, count: 14 },
  { id: "search", name: "Search and filters", icon: Search, count: 10 },
  { id: "feedback", name: "Feedback and status", icon: Bell, count: 15 },
  { id: "modals", name: "Modals and panels", icon: PanelRight, count: 12 },
  { id: "steppers", name: "Steppers and progress", icon: GitBranch, count: 8 },
  { id: "mobile", name: "Mobile patterns", icon: Smartphone, count: 11 },
  { id: "admin", name: "Admin and workflow patterns", icon: Wrench, count: 14 },
  { id: "data", name: "Data visualisation", icon: PieChart, count: 9 },
  { id: "sharing", name: "Session and sharing tools", icon: Share2, count: 7 },
  { id: "casework", name: "Casework patterns", icon: MessageSquare, count: 11 },
  { id: "utility", name: "Utility components", icon: SlidersHorizontal, count: 6 },
];

const rows = [
  { name: "Mia Benson", phone: "+447345678901", last: "19 May 2024", status: "ready", label: "Follow up" },
  { name: "Jake Woods", phone: "+443461234567", last: "18 May 2024", status: "draft", label: "No answer" },
  { name: "Lila Harper", phone: "+44784098765", last: "17 May 2024", status: "in-progress", label: "Busy" },
];

const timelineItems = [
  { title: "Case opened", meta: "09:24", text: "Repair issue logged against private landlord." },
  { title: "Evidence added", meta: "11:10", text: "Member uploaded photos and tenancy notes." },
  { title: "Follow-up due", meta: "Tomorrow", text: "Organiser to confirm next contact window." },
];

const feedItems = [
  { initials: "SM", title: "Sandy Mills called", text: "Asked for repair notes to be resent.", time: "4 minutes ago" },
  { initials: "JR", title: "Jordan added a note", text: "Member prefers WhatsApp after 6pm.", time: "16 minutes ago" },
];

export const components = [
  {
    id: "tokens",
    name: "Design tokens",
    category: "foundations",
    type: "foundation",
    status: "ready",
    tags: ["colour", "spacing", "radius", "shadow"],
    description: "CSS custom properties for the TenantAct light theme with a dark-mode placeholder.",
    usage: "import './lib/tokens/tenantact.css';",
    notes: "Use tokens rather than raw colours in reusable components.",
    Preview: () => (
      <div className="preview-row">
        {[
          ["Forest green", "#1e633b"],
          ["Light green", "#dcefe2"],
          ["Warm off-white", "#f6f4ed"],
          ["Mid grey", "#dedbd0"],
          ["Charcoal", "#141817"],
          ["Error red", "#d64a45"],
        ].map(([name, value]) => <TenantColourSwatch key={name} name={name} value={value} />)}
      </div>
    ),
  },
  {
    id: "typography",
    name: "Typography",
    category: "foundations",
    type: "foundation",
    status: "ready",
    tags: ["display", "body", "mono"],
    description: "Condensed display headings, readable body copy, and mono labels for organiser workflows.",
    usage: "<TenantTypographySample />",
    Preview: TenantTypographySample,
  },
  {
    id: "brand-lockups",
    name: "Logo lockups",
    category: "foundations",
    type: "brand",
    status: "ready",
    tags: ["logo", "brand"],
    description: "TenantAct product lockups for catalogue examples and project headers.",
    usage: '<TenantLogoLockup product="REACHOUT" />',
    Preview: () => <div className="stack"><TenantLogoLockup product="REACHOUT" /><TenantLogoLockup product="TRIBUNAL SCRAPER" /></div>,
  },
  {
    id: "breadcrumbs",
    name: "Breadcrumbs",
    category: "navigation",
    type: "navigation",
    status: "ready",
    tags: ["wayfinding", "hierarchy"],
    description: "Compact wayfinding trail for admin and documentation views.",
    usage: '<TenantBreadcrumbs items={["Components", "Inputs and forms", "Text input"]} />',
    Preview: () => <TenantBreadcrumbs items={["Components", "Inputs and forms", "Text input"]} />,
  },
  {
    id: "toolbar",
    name: "Toolbar",
    category: "navigation",
    type: "layout",
    status: "ready",
    tags: ["actions", "header"],
    description: "Responsive action row for page and panel controls.",
    usage: "<TenantToolbar>...</TenantToolbar>",
    Preview: () => <div className="ta-toolbar"><TenantSearchInput placeholder="Search decisions..." /><TenantButton icon="arrow">Search</TenantButton></div>,
  },
  {
    id: "button",
    name: "Button",
    category: "buttons",
    type: "action",
    status: "ready",
    tags: ["primary", "outline", "destructive"],
    description: "Primary, outline, ghost, size, and destructive action buttons.",
    usage: '<TenantButton variant="primary" icon="arrow">Start contacting</TenantButton>',
    Preview: () => <div className="preview-row"><TenantButton size="large" icon="arrow">Large button</TenantButton><TenantButton variant="outline">Outline button</TenantButton><TenantButton variant="ghost">Ghost button</TenantButton><TenantButton variant="danger">Delete</TenantButton></div>,
  },
  {
    id: "icon-button",
    name: "Icon button",
    category: "buttons",
    type: "action",
    status: "ready",
    tags: ["icon", "tooltip"],
    description: "Accessible square icon buttons with built-in labels and tooltips.",
    usage: '<TenantIconButton label="Search" icon={<Search size={16} />} />',
    Preview: () => <div className="preview-row"><TenantIconButton label="Search" icon={<Search size={16} />} /><TenantIconButton label="Filter" icon={<Filter size={16} />} variant="soft" /><TenantIconButton label="Upload" icon={<Upload size={16} />} /></div>,
  },
  {
    id: "badges",
    name: "Badge and chip",
    category: "buttons",
    type: "metadata",
    status: "ready",
    tags: ["chip", "tag", "filter"],
    description: "Small removable or static tags for filters, locations, and issue types.",
    usage: '<TenantBadge tone="success">Edinburgh</TenantBadge>',
    Preview: () => <div className="preview-row"><TenantBadge tone="success">Edinburgh</TenantBadge><TenantBadge>Private landlord</TenantBadge><TenantBadge tone="warning">In progress</TenantBadge><TenantBadge tone="danger">Flagged</TenantBadge></div>,
  },
  {
    id: "text-input",
    name: "Text input",
    category: "forms",
    type: "form",
    status: "ready",
    tags: ["field", "forms"],
    description: "TenantAct text field wrapper around MUI TextField.",
    usage: '<TenantTextInput label="Text input" placeholder="Enter contact name..." />',
    Preview: () => <TenantTextInput label="Text input" placeholder="Enter contact name..." />,
  },
  {
    id: "search-input",
    name: "Search input",
    category: "forms",
    type: "form",
    status: "ready",
    tags: ["search", "field"],
    description: "Search field with leading icon for catalogues and data tables.",
    usage: '<TenantSearchInput placeholder="Search decisions..." />',
    Preview: () => <TenantSearchInput placeholder="Search decisions..." />,
  },
  {
    id: "textarea",
    name: "Textarea",
    category: "forms",
    type: "form",
    status: "ready",
    tags: ["message", "notes"],
    description: "Multi-line text area for notes, messages, and reportback prompts.",
    usage: '<TenantTextarea label="Textarea" placeholder="Write a note..." />',
    Preview: () => <TenantTextarea label="Textarea" placeholder="Write a note or message..." />,
  },
  {
    id: "select",
    name: "Select",
    category: "forms",
    type: "form",
    status: "ready",
    tags: ["menu", "field"],
    description: "Select control for constrained option sets.",
    usage: '<TenantSelect label="Select" options={options} />',
    Preview: () => <TenantSelect label="Select an option" options={[{ label: "Repair", value: "repair" }, { label: "Deposit", value: "deposit" }]} />,
  },
  {
    id: "checks",
    name: "Checkbox, radio and toggle",
    category: "forms",
    type: "form",
    status: "ready",
    tags: ["checkbox", "radio", "toggle"],
    description: "Accessible wrapped MUI controls for common form state.",
    usage: "<TenantCheckbox label=\"Record summary after each call\" />",
    Preview: () => <div className="stack"><TenantToggle label="Enable reportbacks" /><TenantCheckbox label="Record summary after each call" /><TenantRadioGroup /></div>,
  },
  {
    id: "tabs",
    name: "Tabs",
    category: "tabs",
    type: "navigation",
    status: "ready",
    tags: ["tabs", "views"],
    description: "Scrollable tabs using TenantAct styling over MUI behaviour.",
    usage: "<TenantTabs tabs={tabs} value={value} onChange={setValue} />",
    Preview: () => <TabsPreview />,
  },
  {
    id: "segmented-control",
    name: "Segmented control",
    category: "tabs",
    type: "input",
    status: "ready",
    tags: ["toggle", "view"],
    description: "Small segmented control for switching view modes and simple filters.",
    usage: "<TenantSegmentedControl options={options} value={value} onChange={setValue} />",
    Preview: () => <SegmentedPreview />,
  },
  {
    id: "card",
    name: "Card",
    category: "cards",
    type: "surface",
    status: "ready",
    tags: ["surface", "content"],
    description: "Generic content surface with optional icon, title, tone, and action.",
    usage: '<TenantCard tone="soft" title="Reportbacks enabled">...</TenantCard>',
    Preview: () => <TenantCard tone="soft" title="Reportbacks enabled" icon={<CheckCircle2 size={18} />}><p>Phonebankers will record what happened after each contact.</p></TenantCard>,
  },
  {
    id: "info-card",
    name: "Info card",
    category: "cards",
    type: "surface",
    status: "ready",
    tags: ["feature", "help"],
    description: "Small explanatory card for feature panels and documentation snippets.",
    usage: '<TenantInfoCard title="Organiser mode">...</TenantInfoCard>',
    Preview: () => <TenantInfoCard title="Organiser mode">Notes, reportbacks and session hosting enabled.</TenantInfoCard>,
  },
  {
    id: "stat-card",
    name: "Stat card",
    category: "cards",
    type: "metric",
    status: "ready",
    tags: ["stats", "metric"],
    description: "Large number card for counts and performance summaries.",
    usage: '<TenantStatCard value="1415" label="Results found" />',
    Preview: () => <TenantStatCard value="1415" label="Results found" note="Across all locations and issues." icon={<Database size={18} />} />,
  },
  {
    id: "table",
    name: "Table",
    category: "tables",
    type: "data",
    status: "ready",
    tags: ["contacts", "results"],
    description: "Responsive table styling for people, cases, and tribunal results.",
    usage: "<TenantTable rows={rows} />",
    Preview: () => <TenantTable rows={rows} />,
  },
  {
    id: "table-toolbar",
    name: "Table toolbar",
    category: "tables",
    type: "data",
    status: "ready",
    tags: ["sort", "results"],
    description: "Result-count and sort toolbar for dense data views.",
    usage: "<TenantTableToolbar resultCount={1415} />",
    Preview: () => <TenantTableToolbar />,
  },
  {
    id: "pagination",
    name: "Pagination",
    category: "tables",
    type: "navigation",
    status: "ready",
    tags: ["pages", "results"],
    description: "Compact pagination for search results and admin tables.",
    usage: "<TenantPagination page={1} total={71} />",
    Preview: TenantPagination,
  },
  {
    id: "filter-builder",
    name: "Filter builder",
    category: "search",
    type: "mock",
    status: "ready",
    tags: ["filters", "search"],
    description: "Mock filter builder pattern for advanced search flows.",
    usage: "<TenantFilterBuilder />",
    Preview: TenantFilterBuilder,
  },
  {
    id: "command-palette",
    name: "Command palette",
    category: "search",
    type: "mock",
    status: "ready",
    tags: ["command", "keyboard"],
    description: "Mock command palette for future keyboard-led catalogue and admin flows.",
    usage: "<TenantCommandPalette />",
    Preview: TenantCommandPalette,
  },
  {
    id: "alert-banner",
    name: "Alert banner",
    category: "feedback",
    type: "feedback",
    status: "ready",
    tags: ["success", "warning", "error"],
    description: "Inline feedback banner for success, warning, info, and error states.",
    usage: '<TenantAlertBanner tone="success">Saved.</TenantAlertBanner>',
    Preview: () => <div className="stack"><TenantAlertBanner tone="success">Success! Your reportbacks were saved.</TenantAlertBanner><TenantAlertBanner tone="warning">Heads up! This contact has opted out.</TenantAlertBanner><TenantAlertBanner tone="danger">Error: Unable to save. Try again.</TenantAlertBanner></div>,
  },
  {
    id: "status-pill",
    name: "Status pill",
    category: "feedback",
    type: "status",
    status: "ready",
    tags: ["status", "state"],
    description: "Semantic status chip for workflows, cases, contacts, and catalogue entries.",
    usage: '<TenantStatusPill status="in-progress" />',
    Preview: () => <div className="preview-row"><TenantStatusPill status="ready" /><TenantStatusPill status="active" /><TenantStatusPill status="in-progress" /><TenantStatusPill status="draft" /><TenantStatusPill status="error" /></div>,
  },
  {
    id: "callout",
    name: "Callout box",
    category: "feedback",
    type: "feedback",
    status: "ready",
    tags: ["note", "guidance"],
    description: "Contextual note box for sensitive guidance and organiser-facing help.",
    usage: '<TenantCalloutBox title="Note">...</TenantCalloutBox>',
    Preview: () => <TenantCalloutBox title="Reportbacks enabled">Phonebankers will record what happened after each contact and send a summary.</TenantCalloutBox>,
  },
  {
    id: "modal",
    name: "Modal dialog",
    category: "modals",
    type: "overlay",
    status: "ready",
    tags: ["dialog", "confirmation"],
    description: "Wrapped MUI dialog with TenantAct title, actions, and close treatment.",
    usage: "<TenantModal open={open} title=\"Start contacting?\" />",
    Preview: () => <OverlayPreview kind="modal" />,
  },
  {
    id: "side-panel",
    name: "Side panel",
    category: "modals",
    type: "overlay",
    status: "ready",
    tags: ["drawer", "panel"],
    description: "Right-side drawer for call notes, filters, and contextual details.",
    usage: "<TenantSidePanel open={open} title=\"Call notes\" />",
    Preview: () => <OverlayPreview kind="panel" />,
  },
  {
    id: "stepper",
    name: "Stepper",
    category: "steppers",
    type: "progress",
    status: "ready",
    tags: ["workflow", "stages"],
    description: "Horizontal and vertical progress steps for campaign setup flows.",
    usage: "<TenantStepper steps={steps} current={2} />",
    Preview: () => <TenantStepper current={2} steps={["Import contacts", "Write messages", "Call notes", "Start contacting"]} />,
  },
  {
    id: "progress-bar",
    name: "Progress bar",
    category: "steppers",
    type: "progress",
    status: "ready",
    tags: ["completion", "loading"],
    description: "Linear progress indicator themed through TenantAct tokens.",
    usage: '<TenantProgressBar value={62} label="Stage 3 of 4" />',
    Preview: () => <TenantProgressBar value={62} label="Stage 3 of 4" />,
  },
  {
    id: "mobile-bottom-nav",
    name: "Mobile bottom nav",
    category: "mobile",
    type: "mobile",
    status: "ready",
    tags: ["mobile", "navigation"],
    description: "Bottom navigation pattern for compact organiser tools.",
    usage: "<TenantMobileBottomNav items={items} />",
    Preview: () => <TenantMobileBottomNav items={[{ label: "Home", icon: <Home size={17} /> }, { label: "Cases", icon: <FileText size={17} /> }, { label: "People", icon: <Users size={17} /> }, { label: "More", icon: <MoreIcon /> }]} />,
  },
  {
    id: "bottom-sheet",
    name: "Bottom sheet",
    category: "mobile",
    type: "mobile",
    status: "ready",
    tags: ["mobile", "panel"],
    description: "Static mock of a mobile bottom sheet for call notes and short forms.",
    usage: '<TenantBottomSheet title="Call notes">...</TenantBottomSheet>',
    Preview: () => <TenantBottomSheet title="Call notes"><TenantCalloutBox title="How this appears to phonebankers">No call notes yet.</TenantCalloutBox></TenantBottomSheet>,
  },
  {
    id: "upload-dropzone",
    name: "Upload dropzone",
    category: "admin",
    type: "workflow",
    status: "ready",
    tags: ["csv", "import"],
    description: "Import surface for contacts, evidence, and case attachments.",
    usage: "<TenantUploadDropzone />",
    Preview: TenantUploadDropzone,
  },
  {
    id: "timeline",
    name: "Timeline",
    category: "casework",
    type: "casework",
    status: "ready",
    tags: ["case", "history"],
    description: "Chronological case history for evidence, calls, and organiser actions.",
    usage: "<TenantTimeline items={items} />",
    Preview: () => <TenantTimeline items={timelineItems} />,
  },
  {
    id: "activity-feed",
    name: "Activity feed",
    category: "admin",
    type: "workflow",
    status: "ready",
    tags: ["activity", "updates"],
    description: "Recent activity stream for shared sessions and admin dashboards.",
    usage: "<TenantActivityFeed items={items} />",
    Preview: () => <TenantActivityFeed items={feedItems} />,
  },
  {
    id: "empty-state",
    name: "Empty state",
    category: "utility",
    type: "utility",
    status: "ready",
    tags: ["empty", "results"],
    description: "Reusable empty state for filters, tables, uploads, and search results.",
    usage: "<TenantEmptyState />",
    Preview: TenantEmptyState,
  },
  {
    id: "advanced-breadcrumb-trail",
    name: "Advanced breadcrumb trail",
    category: "navigation",
    type: "navigation",
    status: "ready",
    tags: ["breadcrumbs", "casework", "hierarchy"],
    description: "Multi-level breadcrumb path for moving between products, sessions, case notes, and reportbacks.",
    usage: "<TenantAdvancedBreadcrumbTrail items={items} />",
    notes: "Keep paths short and specific. Use it for deep casework or session flows, not every simple page.",
    Preview: AdvancedBreadcrumbPreview,
  },
  {
    id: "sticky-action-bar",
    name: "Sticky page action bar",
    category: "navigation",
    type: "actions",
    status: "ready",
    tags: ["bulk", "sticky", "selection"],
    description: "Persistent action strip for selected contacts, reportbacks, cases, or imported rows.",
    usage: '<TenantStickyActionBar selectedCount={3} actions={["Follow up", "Export"]} />',
    Preview: StickyActionBarPreview,
  },
  {
    id: "page-toolbar-actions",
    name: "Page toolbar with search and actions",
    category: "navigation",
    type: "toolbar",
    status: "ready",
    tags: ["toolbar", "search", "filters"],
    description: "Compact page toolbar combining search, filters, secondary icon actions, and one primary action.",
    usage: "<TenantPageToolbar searchPlaceholder=\"Search reportbacks...\" />",
    Preview: PageToolbarPreview,
  },
  {
    id: "inline-validation",
    name: "Inline validation",
    category: "forms",
    type: "form",
    status: "ready",
    tags: ["validation", "errors", "success"],
    description: "Field validation states for good, invalid, and helper-text feedback.",
    usage: '<TenantValidatedField state="error" message="Enter a valid UK mobile number." />',
    Preview: ValidationPreview,
  },
  {
    id: "autocomplete",
    name: "Autocomplete",
    category: "forms",
    type: "form",
    status: "ready",
    tags: ["autocomplete", "search", "suggestions"],
    description: "Suggestion picker for councils, landlords, campaigns, case owners, and saved templates.",
    usage: "<TenantAutocomplete suggestions={items} />",
    Preview: AutocompletePreview,
  },
  {
    id: "tag-input",
    name: "Token and tag input",
    category: "forms",
    type: "form",
    status: "ready",
    tags: ["tokens", "chips", "tagging"],
    description: "Inline chip entry for issue tags, locations, saved filters, and case labels.",
    usage: '<TenantTagInput values={["Damp", "Heating"]} />',
    Preview: TokenInputPreview,
  },
  {
    id: "date-range-picker",
    name: "Date and range pickers",
    category: "forms",
    type: "form",
    status: "ready",
    tags: ["date", "calendar", "range"],
    description: "Calendar and date-range surfaces for hearing dates, reporting windows, and campaign timelines.",
    usage: "<TenantDateRangePicker start=\"01 May 2024\" end=\"31 May 2024\" />",
    Preview: DatePickerPreview,
  },
  {
    id: "step-summary-panel",
    name: "Step summary and review panel",
    category: "forms",
    type: "workflow",
    status: "ready",
    tags: ["review", "stepper", "summary"],
    description: "Final review pattern for multi-step flows before publishing, submitting, or starting outreach.",
    usage: "<TenantReviewPanel />",
    Preview: ReviewPanelPreview,
  },
  {
    id: "rich-data-table",
    name: "Rich data table",
    category: "tables",
    type: "data",
    status: "ready",
    tags: ["table", "sorting", "bulk"],
    description: "Dense table with selection, sortable headings, status pills, and row actions.",
    usage: "<TenantRichDataTable rows={rows} selectable />",
    Preview: RichTablePreview,
  },
  {
    id: "bulk-actions-bar",
    name: "Bulk actions bar",
    category: "tables",
    type: "actions",
    status: "ready",
    tags: ["bulk", "selection", "actions"],
    description: "Table-level action row for selected contacts, reportbacks, imports, or cases.",
    usage: '<TenantBulkActionsBar selectedCount={4} />',
    Preview: BulkActionsPreview,
  },
  {
    id: "column-filter-chips",
    name: "Column filter chips and saved views",
    category: "tables",
    type: "data",
    status: "ready",
    tags: ["filters", "columns", "saved views"],
    description: "Table controls for saved views, column filters, and compact mobile list alternatives.",
    usage: "<TenantTableViewControls filters={filters} />",
    Preview: ColumnFilterPreview,
  },
  {
    id: "upload-import-status",
    name: "Upload import status",
    category: "admin",
    type: "workflow",
    status: "ready",
    tags: ["import", "csv", "progress"],
    description: "File import progress card for CSV/XLSX uploads and row processing.",
    usage: '<TenantImportStatus fileName="contacts_may_2024.csv" progress={78} />',
    Preview: ImportCleaningPreview,
  },
  {
    id: "duplicate-detection",
    name: "Duplicate detection",
    category: "admin",
    type: "workflow",
    status: "ready",
    tags: ["duplicates", "data cleaning", "review"],
    description: "Import cleaning panel for possible duplicate contacts, cases, or files.",
    usage: "<TenantDuplicateDetection duplicateCount={12} />",
    Preview: DuplicateDetectionPreview,
  },
  {
    id: "import-validation-results",
    name: "Import validation results",
    category: "admin",
    type: "workflow",
    status: "ready",
    tags: ["validation", "import", "fixes"],
    description: "Validation summary for good rows, warnings, errors, downloads, and suggested fixes.",
    usage: "<TenantImportValidationResults />",
    Preview: ImportValidationPreview,
  },
  {
    id: "accordion-list",
    name: "Accordion list",
    category: "modals",
    type: "disclosure",
    status: "ready",
    tags: ["accordion", "disclosure", "case details"],
    description: "Disclosure pattern for contact history, issue details, attachments, and next steps.",
    usage: "<TenantAccordionList sections={sections} />",
    Preview: AccordionPreview,
  },
  {
    id: "expandable-result-row",
    name: "Expandable result row",
    category: "tables",
    type: "data",
    status: "ready",
    tags: ["expandable", "results", "casework"],
    description: "Row preview that opens into richer property, notes, and support detail.",
    usage: "<TenantExpandableResultRow result={result} />",
    Preview: ExpandableRowPreview,
  },
  {
    id: "faq-disclosure-block",
    name: "FAQ disclosure block",
    category: "modals",
    type: "disclosure",
    status: "ready",
    tags: ["faq", "help", "accordion"],
    description: "Small disclosure blocks for help text, risk notes, and common questions.",
    usage: "<TenantDisclosureBlock questions={questions} />",
    Preview: DisclosureBlocksPreview,
  },
  {
    id: "audit-log",
    name: "Activity feed and audit log",
    category: "casework",
    type: "history",
    status: "ready",
    tags: ["audit", "activity", "history"],
    description: "Audit trail for reportback updates, notes, status changes, and case ownership changes.",
    usage: "<TenantAuditLog items={items} />",
    Preview: AuditLogPreview,
  },
  {
    id: "campaign-case-timeline",
    name: "Campaign and case timeline",
    category: "casework",
    type: "history",
    status: "ready",
    tags: ["timeline", "campaign", "case"],
    description: "Vertical timeline for enquiries, letters, tribunal submissions, and hearings.",
    usage: "<TenantCaseTimeline events={events} />",
    Preview: CaseTimelinePreview,
  },
  {
    id: "comment-thread",
    name: "Comment and note thread",
    category: "casework",
    type: "casework",
    status: "ready",
    tags: ["comments", "notes", "thread"],
    description: "Conversation pattern for organiser notes, volunteer replies, and last-updated summaries.",
    usage: "<TenantCommentThread comments={comments} />",
    Preview: CommentThreadPreview,
  },
  {
    id: "location-map-card",
    name: "Location map card",
    category: "search",
    type: "location",
    status: "ready",
    tags: ["map", "location", "postcode"],
    description: "Small location card for addresses, postcodes, and external map links.",
    usage: "<TenantLocationMapCard address=\"2/14 Loth Walk\" />",
    Preview: LocationSearchPreview,
  },
  {
    id: "radius-area-filters",
    name: "Radius and area filters",
    category: "search",
    type: "filters",
    status: "ready",
    tags: ["radius", "postcode", "saved searches"],
    description: "Area search tools for campaign geography, case density, and local authority boundaries.",
    usage: "<TenantRadiusFilters />",
    Preview: RadiusAreaPreview,
  },
  {
    id: "results-breakdown",
    name: "Results breakdown chart",
    category: "data",
    type: "chart",
    status: "ready",
    tags: ["chart", "breakdown", "results"],
    description: "Compact donut/bar breakdown for search and reporting summaries.",
    usage: "<TenantResultsBreakdown values={values} />",
    Preview: ResultsBreakdownPreview,
  },
  {
    id: "qr-code-share",
    name: "QR code share",
    category: "sharing",
    type: "sharing",
    status: "ready",
    tags: ["qr", "share", "session"],
    description: "QR code card for joining sessions, importing links, or opening mobile workflows.",
    usage: "<TenantQrShare codeUrl={url} />",
    Preview: QrSharePreview,
  },
  {
    id: "protected-session",
    name: "Protected session controls",
    category: "sharing",
    type: "security",
    status: "ready",
    tags: ["session", "password", "expiry"],
    description: "Session controls for password protection, expiry, and copy-link behaviour.",
    usage: "<TenantProtectedSession expiresIn=\"23h 45m\" />",
    Preview: ProtectedSessionPreview,
  },
  {
    id: "share-options-drawer",
    name: "Share options row",
    category: "sharing",
    type: "sharing",
    status: "ready",
    tags: ["email", "whatsapp", "copy link"],
    description: "Drawer-style sharing controls for email, WhatsApp, SMS, copy link, and overflow actions.",
    usage: "<TenantShareOptions channels={channels} />",
    Preview: ShareOptionsPreview,
  },
  {
    id: "pagination-variants",
    name: "Pagination variants",
    category: "utility",
    type: "navigation",
    status: "ready",
    tags: ["pagination", "page size", "results"],
    description: "Pagination pattern with page controls, previous/next, and per-page selection.",
    usage: '<TenantPagination page={2} total={71} pageSize={25} />',
    Preview: UtilityPaginationPreview,
  },
  {
    id: "comparison-option-chooser",
    name: "Comparison and option chooser",
    category: "utility",
    type: "choice",
    status: "ready",
    tags: ["comparison", "chooser", "selection"],
    description: "Side-by-side option selection for roles, session modes, or workflow choices.",
    usage: "<TenantOptionChooser options={options} selected=\"organiser\" />",
    Preview: ComparisonChooserPreview,
  },
  {
    id: "advanced-command-palette",
    name: "Power user command palette",
    category: "utility",
    type: "command",
    status: "ready",
    tags: ["command", "keyboard", "shortcuts"],
    description: "Command palette for creating contacts, searching decisions, importing data, and opening dashboards.",
    usage: "<TenantCommandPalette commands={commands} />",
    Preview: CommandPaletteAdvancedPreview,
  },
  {
    id: "global-search-results",
    name: "Global search results",
    category: "search",
    type: "search",
    status: "ready",
    tags: ["global search", "recents", "results"],
    description: "Expanded search result surface with grouped decisions, contacts, templates, and recent items.",
    usage: "<TenantGlobalSearchResults query=\"mould\" />",
    Preview: GlobalSearchPreview,
  },
  {
    id: "saved-views",
    name: "Saved views",
    category: "admin",
    type: "workflow",
    status: "ready",
    tags: ["saved views", "filters", "admin"],
    description: "Saved admin views for repeated case triage, campaign lists, and follow-up queues.",
    usage: "<TenantSavedViews views={views} />",
    Preview: SavedViewsPreview,
  },
  {
    id: "advanced-filter-builder",
    name: "Advanced filter builder",
    category: "search",
    type: "filters",
    status: "ready",
    tags: ["query builder", "filters", "nested rules"],
    description: "Nested query-builder pattern for complex admin and casework filtering.",
    usage: "<TenantAdvancedFilterBuilder rules={rules} />",
    Preview: FilterBuilderAdvancedPreview,
  },
  {
    id: "admin-permissions-table",
    name: "Admin permissions matrix",
    category: "admin",
    type: "permissions",
    status: "ready",
    tags: ["permissions", "roles", "assignment"],
    description: "Permissions and assignment pattern for organisers, volunteers, admins, and viewers.",
    usage: "<TenantPermissionsMatrix roles={roles} />",
    Preview: AdminPermissionsPreview,
  },
  {
    id: "metrics-dashboard",
    name: "Metrics dashboard",
    category: "data",
    type: "dashboard",
    status: "ready",
    tags: ["dashboard", "charts", "metrics"],
    description: "Dashboard cards for open cases, trends, issue types, goals, and comparisons.",
    usage: "<TenantMetricsDashboard metrics={metrics} />",
    Preview: MetricsDashboardPreview,
  },
  {
    id: "calendar-scheduler",
    name: "Calendar and scheduler",
    category: "admin",
    type: "scheduling",
    status: "ready",
    tags: ["calendar", "events", "availability"],
    description: "Scheduling pattern for sessions, upcoming calls, reminders, and organiser availability.",
    usage: "<TenantScheduler sessions={sessions} />",
    Preview: EventSchedulerPreview,
  },
  {
    id: "message-composer",
    name: "Messaging composer",
    category: "casework",
    type: "messaging",
    status: "ready",
    tags: ["whatsapp", "sms", "composer"],
    description: "Composer pattern for outreach messages, previews, scheduled messages, and channel status.",
    usage: "<TenantMessageComposer channel=\"WhatsApp\" />",
    Preview: ComposerPreview,
  },
  {
    id: "approval-workflow",
    name: "Review and approval workflow",
    category: "admin",
    type: "workflow",
    status: "ready",
    tags: ["review", "approval", "quality control"],
    description: "Approval and moderation pattern for draft changes, publishing, rejection, and quality control.",
    usage: "<TenantApprovalWorkflow />",
    Preview: ApprovalWorkflowPreview,
  },
  {
    id: "case-relationship-map",
    name: "Case relationship map",
    category: "casework",
    type: "casework",
    status: "ready",
    tags: ["relationships", "case", "privacy"],
    description: "Case relationship and privacy pattern for linked cases, deputies, badges, and watch/follow controls.",
    usage: "<TenantCaseRelationshipMap caseId=\"FTS/24/1324\" />",
    Preview: CaseRelationshipPreview,
  },
  {
    id: "mobile-swipe-actions",
    name: "Mobile swipe actions",
    category: "mobile",
    type: "mobile",
    status: "ready",
    tags: ["mobile", "swipe", "actions"],
    description: "Mobile row pattern with swipe-style actions for edit, more, archive, and delete.",
    usage: "<TenantMobileSwipeActions contact={contact} />",
    Preview: MobileSwipePreview,
  },
  {
    id: "mobile-confirmation-bar",
    name: "Mobile confirmation bar",
    category: "mobile",
    type: "mobile",
    status: "ready",
    tags: ["mobile", "confirmation", "delete"],
    description: "Compact confirmation bar for destructive or important mobile actions.",
    usage: '<TenantMobileConfirmationBar message="Delete this reportback?" />',
    Preview: MobileConfirmationPreview,
  },
  {
    id: "data-summary",
    name: "Data summary",
    category: "data",
    type: "data",
    status: "in-progress",
    tags: ["metric", "chart"],
    description: "First-pass data visualisation card combining status and metric patterns.",
    usage: "<TenantStatCard value=\"72%\" label=\"Follow-up rate\" />",
    Preview: () => <div className="preview-grid compact"><TenantStatCard value="72%" label="Follow-up rate" icon={<PieChart size={18} />} /><TenantProgressBar value={72} label="This week" /></div>,
  },
  {
    id: "session-tools",
    name: "Session tools",
    category: "sharing",
    type: "sharing",
    status: "in-progress",
    tags: ["session", "sharing"],
    description: "Share and session controls for phonebanking or organising sessions.",
    usage: '<TenantButton variant="outline">Copy session link</TenantButton>',
    Preview: () => <div className="preview-row"><TenantButton variant="outline">Copy session link</TenantButton><TenantButton icon="arrow">Open live session</TenantButton><TenantBadge tone="success">Encrypted</TenantBadge></div>,
  },
];

export const stats = [
  { label: "Components", value: components.length, note: "In library", icon: Box },
  { label: "Categories", value: categories.length, note: "Organised", icon: Grid2X2 },
  { label: "Tags", value: new Set(components.flatMap((component) => component.tags)).size, note: "Available", icon: Tag },
  { label: "Ready", value: components.filter((component) => component.status === "ready").length, note: "To use", icon: ShieldCheck },
  { label: "In progress", value: components.filter((component) => component.status === "in-progress").length, note: "Coming soon", icon: Clock3 },
];

function AdvancedBreadcrumbPreview() {
  return <div className="exp-breadcrumb"><span>Home</span><span>ReachOut</span><span>Sessions</span><span>Call notes</span><strong>Reportbacks</strong></div>;
}

function StickyActionBarPreview() {
  return <div className="exp-action-bar"><strong>3 selected</strong><TenantButton variant="outline">Follow up</TenantButton><TenantButton variant="outline">Export</TenantButton><TenantIconButton label="Clear" icon={<XIcon />} /></div>;
}

function PageToolbarPreview() {
  return <div className="exp-toolbar"><TenantSearchInput placeholder="Search reportbacks, contacts, notes..." /><TenantIconButton label="Filter" icon={<Filter size={15} />} /><TenantIconButton label="Refresh" icon={<Clock3 size={15} />} /><TenantButton icon="arrow">New reportback</TenantButton></div>;
}

function ValidationPreview() {
  return <div className="exp-grid three"><div className="exp-field good"><label>Email address</label><span>mia.benson@email.com</span><small>Looks good.</small></div><div className="exp-field bad"><label>Phone number</label><span>0712345</span><small>Enter a valid UK mobile number.</small></div><div className="exp-field"><label>Summary of issue</label><p>No heating or hot water for 3 weeks despite reports.</p><small>56 / 200</small></div></div>;
}

function AutocompletePreview() {
  return <div className="exp-card"><TenantTextInput label="Council / Landlord" placeholder="Edin..." /><ul className="exp-option-list"><li>Edinburgh Council</li><li>Edinburgh & Lothians HA</li><li>City of Edinburgh Council</li></ul></div>;
}

function TokenInputPreview() {
  return <div className="exp-token-input"><TenantBadge tone="success">Damp</TenantBadge><TenantBadge tone="success">Heating</TenantBadge><TenantBadge tone="success">Disrepair</TenantBadge><span>Type to add tag...</span></div>;
}

function DatePickerPreview() {
  return <div className="exp-grid two"><div className="exp-calendar"><strong>May 2024</strong><div>{["Mo","Tu","We","Th","Fr","Sa","Su",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map((d) => <span key={d} className={d === 17 ? "active" : ""}>{d}</span>)}</div></div><div className="exp-card"><strong>Date range</strong><p>01 May 2024 → 31 May 2024</p><TenantStatusPill status="ready">Calendar linked</TenantStatusPill></div></div>;
}

function ReviewPanelPreview() {
  return <div className="exp-review"><TenantStepper vertical current={3} steps={["Contact details", "Issue details", "Attachments", "Review and submit"]} /><div><strong>Review your reportback</strong><dl><dt>Name</dt><dd>Mia Benson</dd><dt>Phone</dt><dd>+447345678901</dd><dt>Issue</dt><dd>No heating</dd></dl><TenantButton>Submit reportback</TenantButton></div></div>;
}

function RichTablePreview() {
  return <table className="exp-table"><thead><tr><th><input type="checkbox" defaultChecked /></th><th>Contact name</th><th>Phone</th><th>Issue</th><th>Status</th><th /></tr></thead><tbody>{["Mia Benson","Jake Woods","Lila Harper","Omar Ali"].map((name, index) => <tr key={name}><td><input type="checkbox" defaultChecked={index < 3} /></td><td>{name}</td><td>+44734567890{index}</td><td>{["No heating","Damp & mould","Disrepair","Eviction threat"][index]}</td><td><TenantStatusPill status={index === 1 ? "in-progress" : "ready"}>{index === 1 ? "In progress" : "New"}</TenantStatusPill></td><td>...</td></tr>)}</tbody></table>;
}

function BulkActionsPreview() {
  return <div className="stack"><div className="exp-action-bar"><strong>4 selected</strong><TenantButton variant="outline">Follow up</TenantButton><TenantButton variant="outline">Export</TenantButton><TenantButton variant="ghost">Tag</TenantButton><span className="exp-muted">Clear</span></div><RichTablePreview /></div>;
}

function ColumnFilterPreview() {
  return <div className="exp-grid two"><div className="exp-mobile-list">{["Mia Benson","Jake Woods","Lila Harper"].map((name) => <article key={name}><span className="ta-avatar">{name.slice(0,2)}</span><div><strong>{name}</strong><small>No heating</small></div><span>19 May</span></article>)}</div><div className="exp-card"><strong>Column filter chips</strong><div className="preview-row"><TenantBadge tone="success">Status: New</TenantBadge><TenantBadge tone="success">Issue: Heating</TenantBadge><TenantBadge tone="success">Council: Edinburgh</TenantBadge></div><TenantSelect label="Saved view" options={[{ label: "All reportbacks", value: "all" }]} /></div></div>;
}

function ImportCleaningPreview() {
  return <div className="exp-grid two"><TenantUploadDropzone /><div className="exp-card"><strong>contacts_may_2024.csv</strong><TenantProgressBar value={78} label="Import status" /><small>152 of 200 rows processed</small></div></div>;
}

function DuplicateDetectionPreview() {
  return <div className="exp-card centred"><FileInput size={24} /><strong>Potential duplicates found</strong><p>12 possible duplicates detected.</p><TenantButton>Review duplicates</TenantButton></div>;
}

function ImportValidationPreview() {
  return <div className="exp-card"><strong>Import validation</strong><ul className="exp-status-list"><li><TenantStatusPill status="ready">132 valid rows</TenantStatusPill></li><li><TenantStatusPill status="warning">16 warnings</TenantStatusPill></li><li><TenantStatusPill status="error">0 errors</TenantStatusPill></li></ul><TenantButton variant="outline">Download report</TenantButton></div>;
}

function AccordionPreview() {
  return <div className="exp-card">{["Contact context & history", "Issue details", "Attachments (1)", "Notes & next steps"].map((item, index) => <details key={item} open={index === 0}><summary>{item}</summary><p>Mia has reported heating issues twice before. Currently living with a young child.</p></details>)}</div>;
}

function ExpandableRowPreview() {
  return <div className="exp-card"><div className="exp-row-head"><strong>Mia Benson</strong><TenantStatusPill status="ready">New</TenantStatusPill></div><dl><dt>Last contacted</dt><dd>19 May 2024</dd><dt>Property</dt><dd>2/14 Loth Walk, Edinburgh</dd><dt>Notes</dt><dd>Needs interpreter support.</dd></dl></div>;
}

function DisclosureBlocksPreview() {
  return <div className="exp-grid two"><details className="exp-disclosure" open><summary>How is my data used?</summary><p>We use your data only to support your case and organise around the issue.</p></details><details className="exp-disclosure"><summary>Can I delete my data?</summary><p>Yes. Show clear routes for deletion and export.</p></details></div>;
}

function AuditLogPreview() {
  return <TenantActivityFeed items={[{ initials: "MB", title: "Mia Benson added by Sophie Grant", text: "Contact imported from May case list.", time: "10 May 2024" }, { initials: "JW", title: "Reportback updated by Jake Woods", text: "Status changed to follow up.", time: "18 May 2024" }]} />;
}

function CaseTimelinePreview() {
  return <TenantTimeline items={[{ title: "Enquiry received", meta: "12 May 2024", text: "Initial case opened." }, { title: "Evidence gathered", meta: "18 May 2024", text: "Photos and notes added." }, { title: "Hearing scheduled", meta: "5 Jun 2024", text: "Reminder enabled." }]} />;
}

function CommentThreadPreview() {
  return <div className="exp-thread"><article><span className="ta-avatar">SM</span><p><strong>Sandy Mills</strong><br />Spoke with Mia today. Heating still not fixed.</p></article><article><span className="ta-avatar">JW</span><p><strong>Jake Woods</strong><br />Thanks Sandy, I'll follow up with the landlord.</p></article><div className="exp-note">Last updated by Jake Woods on 10 May 2024, 11:45</div></div>;
}

function LocationSearchPreview() {
  return <div className="exp-map-card"><div className="exp-map"><Search size={24} /></div><strong>2/14 Loth Walk</strong><p>Edinburgh, EH6 5EB</p><a>View in Google Maps</a></div>;
}

function RadiusAreaPreview() {
  return <div className="exp-grid two"><div className="preview-row">{["1km","3km","5km","10km"].map((item, index) => <button className={index === 1 ? "exp-chip active" : "exp-chip"} key={item}>{item}</button>)}</div><div className="exp-card"><TenantSearchInput placeholder="Search by postcode..." /><small>Saved searches: Edinburgh, Leith, West Lothian</small></div></div>;
}

function ResultsBreakdownPreview() {
  return <div className="exp-breakdown"><span /><div><strong>Reportbacks by issue</strong><p>Heating 47%, Damp 20%, Eviction 18%, Other 12%</p></div></div>;
}

function QrSharePreview() {
  return <div className="exp-grid two"><div className="exp-qr">{Array.from({ length: 49 }).map((_, index) => <span key={index} className={index % 3 === 0 || index % 7 === 0 ? "filled" : ""} />)}</div><div className="exp-card"><strong>QR code share</strong><p>Scan to join session. Valid for 24 hours.</p></div></div>;
}

function ProtectedSessionPreview() {
  return <div className="exp-grid two"><div className="exp-card"><strong>Protected session</strong><p>••••••••••••</p><TenantStatusPill status="ready">Password protected</TenantStatusPill></div><div className="exp-card"><strong>Session expiry</strong><TenantStatusPill status="ready">Expires in 23h 45m</TenantStatusPill></div></div>;
}

function ShareOptionsPreview() {
  return <div className="preview-row">{["Email","WhatsApp","SMS","Copy link","More"].map((item) => <button className="exp-share" key={item}><Share2 size={15} />{item}</button>)}</div>;
}

function UtilityPaginationPreview() {
  return <div className="stack"><TenantPagination page={2} total={71} /><div className="preview-row"><span className="exp-muted">Show</span><button className="exp-chip">25</button><span className="exp-muted">per page</span></div></div>;
}

function ComparisonChooserPreview() {
  return <div className="exp-grid two"><div className="exp-choice"><strong>Organiser mode</strong><p>Best for team and campaign groups.</p><TenantButton variant="outline">Select</TenantButton></div><div className="exp-choice selected"><strong>Session host</strong><p>Run protected sessions and support teams.</p><TenantButton>Selected</TenantButton></div></div>;
}

function CommandPaletteAdvancedPreview() {
  return <div className="exp-command"><TenantSearchInput placeholder="Type a command or search..." />{["Create new contact", "Search decisions", "Import contacts", "View dashboards", "Manage templates"].map((item, index) => <button key={item}><Search size={14} />{item}<kbd>Ctrl {index + 1}</kbd></button>)}</div>;
}

function GlobalSearchPreview() {
  return <div className="exp-grid three"><div className="exp-card"><TenantSearchInput placeholder="mould" /><small>Decisions (12), Contacts (4), Templates (3)</small></div><div className="exp-card"><strong>Recent items</strong><p>Mia Benson<br />FTS/HPC/RP/25/1940</p></div><div className="exp-card"><strong>Saved view</strong><p>My workspace<br />Damp & mould cases</p></div></div>;
}

function SavedViewsPreview() {
  return <div className="exp-card"><strong>Saved views</strong>{["All cases", "High priority cases", "My custom view", "Damp & mould cases"].map((view, index) => <div className="exp-row-head" key={view}><span>{view}</span><TenantStatusPill status={index === 0 ? "ready" : "draft"}>{index === 0 ? "Default" : "Saved"}</TenantStatusPill></div>)}<TenantButton variant="outline">Create new view</TenantButton></div>;
}

function FilterBuilderAdvancedPreview() {
  return <div className="exp-card"><strong>Show items where</strong><div className="exp-rules"><span>Issue type</span><span>contains</span><span>mould</span><span>Status</span><span>is</span><span>Open</span></div><TenantButton variant="outline">Add rule</TenantButton></div>;
}

function AdminPermissionsPreview() {
  return <div className="exp-grid two"><table className="exp-table"><thead><tr><th>Role</th><th>View</th><th>Edit</th><th>Assign</th></tr></thead><tbody>{["Organiser","Volunteer","Admin","Viewer"].map((role) => <tr key={role}><td>{role}</td><td>✓</td><td>{role === "Viewer" ? "-" : "✓"}</td><td>{role === "Admin" ? "✓" : "-"}</td></tr>)}</tbody></table><TenantActivityFeed items={[{ initials: "MB", title: "Mia Benson", text: "Organiser", time: "Today" }, { initials: "JW", title: "Jake Woods", text: "Volunteer", time: "Today" }]} /></div>;
}

function MetricsDashboardPreview() {
  return <div className="exp-grid three"><TenantStatCard value="1,245" label="Open cases" icon={<Database size={18} />} /><TenantStatCard value="+18%" label="Resolved vs last month" icon={<Sparkles size={18} />} /><div className="exp-card"><strong>Goal progress</strong><TenantProgressBar value={64} label="Monthly outreach goal" /></div></div>;
}

function EventSchedulerPreview() {
  return <div className="exp-grid three"><DatePickerPreview /><div className="exp-card"><strong>Agenda slot</strong><p>15 May, 14:00<br />Community call</p><TenantButton variant="outline">View full agenda</TenantButton></div><div className="exp-card"><strong>Availability</strong><div className="preview-row">{["Tue","Wed","Thu","Fri"].map((day) => <TenantBadge tone="success" key={day}>{day}</TenantBadge>)}</div></div></div>;
}

function ComposerPreview() {
  return <div className="exp-grid three"><div className="exp-card"><strong>WhatsApp</strong><TenantTextarea label="Message" placeholder="Hi {{first_name}}, just following up..." /></div><div className="exp-message">Hi Sandy, just following up on your case about damp and mould. Let us know if you need help.</div><div className="exp-card"><strong>Connect status</strong><TenantStatusPill status="ready">Open rate healthy</TenantStatusPill><TenantStatusPill status="warning">SMS delayed</TenantStatusPill></div></div>;
}

function ApprovalWorkflowPreview() {
  return <div className="exp-grid three"><TenantStepper vertical current={1} steps={["Submitted", "In review", "Approved", "Published"]} /><div className="exp-card"><strong>Moderation decision</strong><div className="stack"><TenantButton>Approve</TenantButton><TenantButton variant="danger">Reject</TenantButton><TenantButton variant="outline">Request edits</TenantButton></div></div><div className="exp-card"><strong>Publish confirmation</strong><p>This action will make it visible to all team members.</p></div></div>;
}

function CaseRelationshipPreview() {
  return <div className="exp-grid three"><div className="exp-card"><strong>Linked cases</strong><p>FTS/24/1324 (Open)<br />LCT/24/346 (Open)</p><TenantButton variant="outline">View all linked cases</TenantButton></div><div className="exp-map-nodes"><span>Tenant</span><span>Agent</span><span>Property</span></div><div className="exp-card"><strong>Privacy badges</strong><div className="stack"><TenantStatusPill status="error">Urgent</TenantStatusPill><TenantStatusPill status="warning">High</TenantStatusPill><TenantStatusPill status="ready">Low</TenantStatusPill></div></div></div>;
}

function MobileSwipePreview() {
  return <div className="exp-phone-list"><article><span className="ta-avatar">MB</span><strong>Mia Benson</strong><button>Edit</button><button className="danger">Delete</button></article><article><span className="ta-avatar">JW</span><strong>Jake Woods</strong><button>More</button><button className="danger">Archive</button></article></div>;
}

function MobileConfirmationPreview() {
  return <div className="exp-mobile-confirm"><strong>Delete this reportback?</strong><div><TenantButton variant="outline">Cancel</TenantButton><TenantButton variant="danger">Delete</TenantButton></div></div>;
}

function XIcon() {
  return <span aria-hidden="true">×</span>;
}

function TabsPreview() {
  const [value, setValue] = useState("overview");
  return <TenantTabs value={value} onChange={setValue} tabs={[{ label: "Overview", value: "overview" }, { label: "Usage", value: "usage" }, { label: "Props", value: "props" }]} />;
}

function SegmentedPreview() {
  const [value, setValue] = useState("grid");
  return <TenantSegmentedControl value={value} onChange={setValue} options={[{ label: "Grid", value: "grid" }, { label: "List", value: "list" }]} />;
}

function OverlayPreview({ kind }) {
  const [open, setOpen] = useState(false);
  const isModal = kind === "modal";
  const Overlay = isModal ? TenantModal : TenantSidePanel;
  return (
    <>
      <TenantButton variant="outline" onClick={() => setOpen(true)}>Open {isModal ? "modal" : "panel"}</TenantButton>
      <Overlay open={open} onClose={() => setOpen(false)} title={isModal ? "Start contacting?" : "Call notes"}>
        <p>You have added 45 contacts and 2 templates. Ready to begin?</p>
      </Overlay>
    </>
  );
}

function MoreIcon() {
  return <BookOpen size={17} />;
}
