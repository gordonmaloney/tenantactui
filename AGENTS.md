# AGENTS.md

This is a React + Vite TenantAct UI component-library catalogue.

Use UK spelling. Do not use em dashes.

Use React, JSX and CSS custom properties. MUI is allowed, but reusable TenantAct components should wrap/theme MUI rather than exposing stock MUI everywhere.

Keep reusable components in src/lib. Keep catalogue/demo code in src/catalogue. src/lib must not import from src/catalogue.

Run npm run build before finishing. Run npm run lint if available.

Do not add a backend. Do not implement dark mode yet, but structure tokens so dark mode can be added later.