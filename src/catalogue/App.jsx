import { useMemo, useState } from "react";
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
  Search,
  Sun,
} from "lucide-react";
import { categories, components, stats } from "./data/componentRegistry.jsx";
import { TenantSearchInput, TenantStatusPill } from "../lib";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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

  function chooseCategory(nextCategory) {
    setCategory(nextCategory);
    setQuery("");
    setMobileNavOpen(false);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }

  return (
    <div className="catalogue-shell" data-theme="light">
      <header className="topbar">
        <div className="brand">
          <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={18} /></button>
          <button className="brand-word" onClick={() => chooseCategory("all")}><span>TENANT</span>ACT UI</button>
          <span className="product-pill">Component Library</span>
          <span className="version">v0.1.0</span>
        </div>
        <div className="topbar-search"><TenantSearchInput placeholder="Search components..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <nav className="topbar-actions" aria-label="Resources">
          <button aria-label="Theme"><Sun size={18} /></button>
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
        <div className="theme-box"><Sun size={16} />Theme <strong>Light</strong></div>
        <footer><Library size={28} /><span>TenantAct UI v0.1.0</span></footer>
      </aside>

      <main id="top" className="content">
        {isSearching ? (
          <SearchResultsPage
            query={query}
            results={searchResults}
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
            onQueryChange={setQuery}
            onClearSearch={() => setQuery("")}
          />
        )}
      </main>
    </div>
  );
}

function SearchResultsPage({ query, results, onQueryChange, onClearSearch }) {
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

function CategoryPage({ category, components: categoryComponents, query, onQueryChange, onClearSearch }) {
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
          <ComponentSection key={component.id} component={component} category={category} />
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

function ComponentSection({ component, category }) {
  const Preview = component.Preview;
  const snippet = createUsageSnippet(component);
  const isDemo = component.category === "demos";

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

      <div className="preview-surface">
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
        </div>
      )}
    </article>
  );
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
