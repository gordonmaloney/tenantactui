import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  X,
  Code2,
  Copy,
  Home,
  Library,
  Map,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { categories, components, stats } from "./data/componentRegistry.jsx";
import { TenantSearchInput, TenantStatusPill } from "../lib";
import { createTenantMuiTheme } from "../lib/theme.js";

const THEME_STORAGE_KEY = "tenantact-ui.theme";

function getCategoryFromHash() {
  const id = window.location.hash.replace("#", "");
  if (!id) return "all";
  if (categories.some((item) => item.id === id)) return id;
  return components.find((component) => component.id === id)?.category || "all";
}

function getInitialTheme() {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) return "dark";
    return "light";
  } catch {
    return "light";
  }
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(getCategoryFromHash);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const muiTheme = useMemo(() => createTenantMuiTheme(theme), [theme]);

  const activeCategory = categories.find((item) => item.id === category);
  const isOverview = category === "all";
  const isSearching = query.trim().length > 0;
  const demoCategory = categories.find((item) => item.id === "demos");
  const DemoIcon = demoCategory?.icon;
  const componentCategories = categories.filter((item) => item.id !== "demos");
  const demoComponents = components.filter((component) => component.category === "demos");

  const searchResults = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];

    return components.filter((component) => {
      const componentCategory = categories.find((item) => item.id === component.category)?.name || "";
      const haystack = [
        component.name,
        component.description,
        component.type,
        component.status,
        componentCategory,
        ...component.tags,
      ].join(" ").toLowerCase();
      return haystack.includes(needle);
    });
  }, [query]);

  const categoryComponents = useMemo(() => (
    category === "all"
      ? components
      : components.filter((component) => component.category === category)
  ), [category]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.body.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const handleHashChange = () => {
      setCategory(getCategoryFromHash());
      setQuery("");
      setMobileNavOpen(false);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id || categories.some((item) => item.id === id)) return undefined;

    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, [category]);

  useEffect(() => {
    let mediaQuery;
    try {
      if (window.localStorage.getItem(THEME_STORAGE_KEY)) return undefined;
      mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    } catch {
      mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    }

    if (!mediaQuery) return undefined;

    const handleSystemThemeChange = (event) => {
      try {
        if (window.localStorage.getItem(THEME_STORAGE_KEY)) return;
      } catch {
        // Keep following the device theme if storage is unavailable.
      }
      setTheme(event.matches ? "dark" : "light");
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    } else {
      mediaQuery.addListener?.(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      } else {
        mediaQuery.removeListener?.(handleSystemThemeChange);
      }
    };
  }, []);

  function toggleTheme() {
    setTheme((current) => {
      const nextTheme = current === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // Theme still changes for this render if storage is unavailable.
      }
      return nextTheme;
    });
  }

  function chooseCategory(nextCategory) {
    setCategory(nextCategory);
    setQuery("");
    setMobileNavOpen(false);
    if (nextCategory === "all") {
      window.history.pushState(null, "", window.location.pathname);
    } else {
      window.history.pushState(null, "", `#${nextCategory}`);
    }
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className="catalogue-shell" data-theme={theme}>
      <header className="topbar">
        <div className="brand">
          <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={18} /></button>
          <button className="brand-word" onClick={() => chooseCategory("all")}><span>TENANT</span>ACT UI</button>
          <span className="product-pill">Component Library</span>
          <span className="version">v0.1.0</span>
        </div>
        <div className="topbar-search"><TenantSearchInput placeholder="Search components..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <nav className="topbar-actions" aria-label="Resources">
          <button aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button aria-label="Docs"><Map size={18} /></button>
          <button aria-label="Code"><Code2 size={18} /></button>
          <button aria-label="Repository"><Library size={18} /></button>
        </nav>
      </header>

      {mobileNavOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}

      <aside className={mobileNavOpen ? "sidebar is-mobile-open" : "sidebar"}>
        <div className="sidebar-mobile-header">
          <span className="brand-word"><span>TENANT</span>ACT UI</span>
          <button aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><X size={18} /></button>
        </div>
        <button className={isOverview ? "sidebar-home is-active" : "sidebar-home"} onClick={() => chooseCategory("all")}>
          <Home size={17} />Overview
        </button>
        {demoCategory && (
          <div className={category === "demos" ? "sidebar-group sidebar-demo is-open" : "sidebar-group sidebar-demo"}>
            <button className={category === "demos" ? "is-active" : ""} onClick={() => chooseCategory("demos")}>
              {DemoIcon && <DemoIcon size={16} />}
              <span>{demoCategory.name}</span>
              <span>{demoComponents.length}</span>
            </button>
            {category === "demos" && (
              <div className="sidebar-subnav">
                {demoComponents.map((component) => (
                  <a key={component.id} href={`#${component.id}`}>
                    {component.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        <h2>Components</h2>
        <nav className="sidebar-nav">
          {componentCategories.map((item) => {
            const Icon = item.icon;
            const categoryComponents = components.filter((component) => component.category === item.id);
            const isActive = category === item.id;
            return (
              <div key={item.id} className={isActive ? "sidebar-group is-open" : "sidebar-group"}>
                <button className={isActive ? "is-active" : ""} onClick={() => chooseCategory(item.id)}>
                  <Icon size={16} />
                  <span>{item.name}</span>
                  <span>{categoryComponents.length}</span>
                </button>
                {isActive && (
                  <div className="sidebar-subnav">
                    {categoryComponents.map((component) => (
                      <a key={component.id} href={`#${component.id}`}>
                        {component.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <h2>Resources</h2>
        <a href="#coding"><BookOpen size={16} />Coding conventions <span>Draft</span></a>
        <a href="#copy"><BookOpen size={16} />Copy and content guide <span>Draft</span></a>
        <button className="theme-box" onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}Theme <strong>{theme === "dark" ? "Dark" : "Light"}</strong>
        </button>
        <footer><Library size={28} /><span>TenantAct UI v0.1.0</span></footer>
      </aside>

      <main id="top" className="content">
        {isSearching ? (
          <SearchResultsPage
            query={query}
            results={searchResults}
            theme={theme}
            onQueryChange={setQuery}
            onClearSearch={() => setQuery("")}
          />
        ) : isOverview ? (
          <OverviewPage
            query={query}
            filtered={components}
            onQueryChange={setQuery}
            onCategoryChange={chooseCategory}
          />
        ) : (
          <CategoryPage
            category={activeCategory}
            components={categoryComponents}
            query={query}
            theme={theme}
            onQueryChange={setQuery}
            onClearSearch={() => setQuery("")}
          />
        )}
      </main>
      </div>
    </ThemeProvider>
  );
}

function SearchResultsPage({ query, results, theme, onQueryChange, onClearSearch }) {
  return (
    <section className="category-page search-results-page">
      <header className="category-page__header">
        <span><Search size={22} /></span>
        <div>
          <p className="eyebrow">Catalogue search</p>
          <h1>Search results</h1>
          <p>{results.length} component{results.length === 1 ? "" : "s"} matching "{query}". Search checks names, categories, tags, descriptions, status, and component type.</p>
        </div>
      </header>

      <section className="category-search" aria-label="Catalogue search results">
        <TenantSearchInput placeholder="Search all components..." value={query} onChange={(event) => onQueryChange(event.target.value)} />
        <button className="clear-button" onClick={onClearSearch}>Clear search</button>
      </section>

      {results.length ? (
        <div className="component-sections">
          {results.map((component) => (
            <ComponentSection
              key={component.id}
              component={component}
              appTheme={theme}
              category={categories.find((item) => item.id === component.category)}
            />
          ))}
        </div>
      ) : (
        <div className="search-empty">
          <Search size={24} />
          <strong>No matching components</strong>
          <p>Try a component name, category, tag, or pattern such as buttons, tabs, status, modal, table, or brush.</p>
        </div>
      )}
    </section>
  );
}

function OverviewPage({ query, filtered, onQueryChange, onCategoryChange }) {
  const featured = filtered.slice(0, 6);

  return (
    <>
      <section className="hero-panel" id="overview">
        <div>
          <p className="eyebrow">TenantAct component catalogue</p>
          <h1>All components</h1>
          <p>Browse available components in the TenantAct design system. Search by name, category, tag, or workflow pattern.</p>
        </div>
        <div className="hero-lockup">
          <span><span>TA</span></span>
          <strong>Built for tenants and campaigns</strong>
        </div>
      </section>

      <section className="overview-search" aria-label="Component search">
        <TenantSearchInput placeholder="Search components, categories, tags..." value={query} onChange={(event) => onQueryChange(event.target.value)} />
        {query && <button className="clear-button" onClick={() => onQueryChange("")}>Clear search</button>}
      </section>

      <section className="stats-grid" aria-label="Catalogue stats">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article key={stat.label} className="stat-tile">
              <span><Icon size={25} /></span>
              <strong>{stat.value}</strong>
              <b>{stat.label}</b>
              <small>{stat.note}</small>
            </article>
          );
        })}
      </section>

      <section className="section-heading">
        <h2>Browse by category</h2>
      </section>

      <section className="category-grid">
        {categories.map((item) => {
          const Icon = item.icon;
          const count = components.filter((component) => component.category === item.id).length;
          return (
            <button key={item.id} onClick={() => onCategoryChange(item.id)}>
              <span><Icon size={20} /></span>
              <strong>{item.name}</strong>
              <small>{count} components</small>
            </button>
          );
        })}
      </section>

      <section className="section-heading">
        <h2>{query ? `${filtered.length} matching components` : "Featured components"}</h2>
      </section>
      <div className="component-grid">
        {featured.map((component) => (
          <ComponentSummaryCard key={component.id} component={component} onCategoryChange={onCategoryChange} />
        ))}
      </div>
    </>
  );
}

function CategoryPage({ category, components: categoryComponents, query, theme, onQueryChange, onClearSearch }) {
  if (!category) return null;
  const Icon = category.icon || Search;

  return (
    <section className="category-page">
      <header className="category-page__header">
        <span><Icon size={22} /></span>
        <div>
          <p className="eyebrow">Components</p>
          <h1>{category.name}</h1>
          <p>{categoryComponents.length} component{categoryComponents.length === 1 ? "" : "s"} in this section. Use the expanded navbar links to jump between examples.</p>
        </div>
      </header>

      <section className="category-search" aria-label={`${category.name} search`}>
        <TenantSearchInput placeholder={`Search ${category.name.toLowerCase()}...`} value={query} onChange={(event) => onQueryChange(event.target.value)} />
        {query && <button className="clear-button" onClick={onClearSearch}>Clear search</button>}
      </section>

      <div className="component-sections">
        {categoryComponents.map((component) => (
          <ComponentSection key={component.id} component={component} category={category} appTheme={theme} />
        ))}
      </div>
    </section>
  );
}

function ComponentSummaryCard({ component, onCategoryChange }) {
  const cat = categories.find((item) => item.id === component.category);
  const Icon = cat?.icon || Search;

  return (
    <button className="component-card" onClick={() => onCategoryChange(component.category)}>
      <span className="component-card__icon"><Icon size={18} /></span>
      <strong>{component.name}</strong>
      <p>{component.description}</p>
      <div>{component.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
      <TenantStatusPill status={component.status} />
    </button>
  );
}

function ComponentSection({ component, category, appTheme }) {
  const Preview = component.Preview;
  const snippet = createUsageSnippet(component);
  const isDemo = component.category === "demos";
  const [previewTheme, setPreviewTheme] = useState(appTheme);

  return (
    <article className={isDemo ? "component-section component-section--demo" : "component-section"} id={component.id}>
      <div className="component-section__header">
        <div>
          <p className="eyebrow">{category.name}</p>
          <h2>{component.name}</h2>
          <p>{component.description}</p>
        </div>
        <TenantStatusPill status={component.status} />
      </div>

      <div className="preview-theme-toolbar" aria-label={`${component.name} preview theme`}>
        <span>Preview</span>
        <div>
          <button className={previewTheme === "light" ? "is-active" : ""} onClick={() => setPreviewTheme("light")} type="button">
            <Sun size={14} />Light
          </button>
          <button className={previewTheme === "dark" ? "is-active" : ""} onClick={() => setPreviewTheme("dark")} type="button">
            <Moon size={14} />Dark
          </button>
        </div>
      </div>

      <div className="preview-surface" data-theme={previewTheme}>
        <Preview />
      </div>

      {!isDemo && (
        <div className="component-section__meta">
          <section>
            <h3>Example usage</h3>
            <CodeSnippet code={snippet} />
          </section>
          <section>
            <h3>Tags</h3>
            <div className="tag-row">{component.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </section>
          <section>
            <h3>Guidance</h3>
            <p>{component.notes || "Keep copy concise, use TenantAct tokens, and prefer wrapped components from src/lib for reusable project UI."}</p>
          </section>
          <section>
            <h3>Customisation</h3>
            <ComponentCustomisation component={component} />
          </section>
        </div>
      )}
    </article>
  );
}

function ComponentCustomisation({ component }) {
  const customisation = getComponentCustomisation(component);

  return (
    <div className="component-customisation">
      <p>{customisation.summary}</p>
      <dl>
        {customisation.props.map((item) => (
          <div key={item.name}>
            <dt>{item.name}</dt>
            <dd>{item.description}</dd>
          </div>
        ))}
      </dl>
      <p><strong>General styling:</strong> {customisation.general}</p>
    </div>
  );
}

function getComponentCustomisation(component) {
  const base = {
    summary: "Use semantic TenantAct props first. Reach for raw styles only for local layout tweaks.",
    props: [
      { name: "className", description: "Adds a project-specific class while preserving TenantAct styling." },
      { name: "style", description: "Supports one-off inline layout changes such as width or margin." },
    ],
    general: "Prefer CSS custom properties, `className`, or MUI `sx` where the component wraps MUI. Avoid changing colours directly unless a token does not exist yet.",
  };

  const byType = {
    action: {
      summary: "Action components expose named variants for intent and size.",
      props: [
        { name: "variant", description: "Use primary, secondary, outline, ghost, danger, or danger-outline." },
        { name: "size", description: "Use small, medium, or large." },
        { name: "icon", description: "Pass `arrow` or an icon node for action affordance." },
      ],
    },
    metadata: {
      summary: "Metadata components should be changed by tone before custom styling.",
      props: [
        { name: "tone", description: "Use neutral, success, warning, or danger." },
        { name: "variant", description: "Use filled or outline." },
        { name: "onDelete", description: "Adds a removable chip control where supported." },
      ],
    },
    status: {
      summary: "Status components use workflow status names rather than arbitrary colours.",
      props: [
        { name: "status", description: "Use ready, active, in-progress, draft, warning, or error." },
        { name: "variant", description: "Use filled or outline." },
      ],
    },
    surface: {
      summary: "Surface components support tone and density so layout can flex without new card styles.",
      props: [
        { name: "tone", description: "Use default, soft, stat, accent, warning, or danger." },
        { name: "density", description: "Use compact, default, or spacious." },
        { name: "interactive", description: "Adds hover affordance for clickable cards." },
      ],
    },
    metric: {
      summary: "Metric cards should stay visually consistent with stat surfaces.",
      props: [
        { name: "tone", description: "Use stat by default, or accent for stronger emphasis." },
        { name: "icon", description: "Adds a leading visual cue." },
      ],
    },
    form: {
      summary: "Form components expose variant, size, state, and MUI escape hatches.",
      props: [
        { name: "variant", description: "Use default or quiet." },
        { name: "size", description: "Use small or medium where supported." },
        { name: "helperText/error/disabled", description: "Use standard MUI field props through the wrapper." },
        { name: "sx", description: "Available on MUI-backed inputs for local spacing or sizing." },
      ],
    },
    navigation: {
      summary: "Navigation components expose variant and size props for compact or stronger navigation treatments.",
      props: [
        { name: "variant", description: "Use underline, pill, slash, chevron, floating, or component-specific variants." },
        { name: "size", description: "Use small or medium where supported." },
      ],
    },
    input: {
      summary: "Input-like controls expose simple size and tone props.",
      props: [
        { name: "size", description: "Use small or medium." },
        { name: "tone", description: "Use neutral or success where available." },
      ],
    },
    feedback: {
      summary: "Feedback components should be customised by tone and visual strength.",
      props: [
        { name: "tone", description: "Use success, warning, danger, or info." },
        { name: "variant", description: "Use soft or solid." },
        { name: "onClose", description: "Adds a dismiss button where supported." },
      ],
    },
    overlay: {
      summary: "Overlay components expose sizing and action slots while keeping accessible MUI behaviour.",
      props: [
        { name: "size", description: "Modal max width, for example xs, sm, md." },
        { name: "width", description: "Side panel width, default or wide." },
        { name: "actions", description: "Custom modal action row." },
      ],
    },
    progress: {
      summary: "Progress components expose orientation, size, and tone without custom colour hacks.",
      props: [
        { name: "vertical", description: "Stepper direction." },
        { name: "variant", description: "Stepper style, currently numbered by default." },
        { name: "tone/size", description: "Progress bar tone and thickness." },
      ],
    },
    data: {
      summary: "Data components support density and display variants for different information loads.",
      props: [
        { name: "density", description: "Use compact or default." },
        { name: "variant", description: "Use default or component-specific variants." },
        { name: "rows/items", description: "Pass structured content arrays rather than custom DOM where possible." },
      ],
    },
    utility: {
      summary: "Utility components expose tone, action, and density hooks for common empty/loading states.",
      props: [
        { name: "tone", description: "Use default or compact-style component tones where available." },
        { name: "action", description: "Pass a custom action node." },
      ],
    },
  };

  const match = byType[component.type] || byType[component.category] || {};

  return {
    ...base,
    ...match,
    props: [...(match.props || []), ...base.props],
  };
}

function CodeSnippet({ code }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="code-snippet">
      <button type="button" onClick={copyCode} aria-label="Copy example usage">
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function createUsageSnippet(component) {
  if (component.usage.trim().startsWith("import ")) {
    return `${component.usage}\n\nexport function App() {\n  return <YourTenantActScreen />;\n}`;
  }

  const imports = new Set();
  const matches = component.usage.matchAll(/<([A-Z][A-Za-z0-9]*)/g);

  for (const match of matches) {
    imports.add(match[1]);
  }

  if (component.usage.includes("Tenant")) {
    return `import { ${Array.from(imports).join(", ")} } from "@tenantact/ui";\n\nexport function Example() {\n  return (\n    ${indentUsage(component.usage)}\n  );\n}`;
  }

  return `import "@tenantact/ui/styles.css";\n\nexport function Example() {\n  ${component.usage}\n}`;
}

function indentUsage(usage) {
  if (usage.includes("\n")) {
    return usage.split("\n").join("\n    ");
  }

  return usage;
}
