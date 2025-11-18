# Copilot Instructions for blood-donations-web-app

## Project Overview
- **Stack:** React (with JSX), Vite, JavaScript (no TypeScript), CSS Modules, and custom hooks.
- **Structure:**
  - `src/` contains all source code, organized by feature (e.g., `pages/`, `components/`, `apis/`, `stores/`).
  - API calls are abstracted in `src/apis/` (e.g., `campaigns.api.js`, `users.api.js`).
  - State management uses a custom store in `src/stores/` (see `store.js` and `user/slice.js`).
  - UI is composed of modular components in `src/components/` and feature-specific views in `src/pages/`.
  - Routing is handled in `src/routes/routes.jsx` with role-based navigation in `src/routes/navigation/`.

## Key Patterns & Conventions
- **API Layer:**
  - All backend communication is via files in `src/apis/`. Each file corresponds to a domain (e.g., campaigns, users).
  - Use the base API logic in `base.api.js` for HTTP requests; extend for domain-specific logic.
- **State Management:**
  - Centralized in `src/stores/`. User state is managed in `user/slice.js`.
  - Use React context and custom hooks (see `src/hooks/useApp.jsx`).
- **Component Organization:**
  - Shared UI components in `src/components/ui/` (e.g., `GenericTable.jsx`).
  - Form fields in `src/components/forms/`.
  - Feature views in `src/pages/{role}/` (e.g., donor, organizer, volunteer).
- **Styling:**
  - Use CSS modules for scoped styles (e.g., `Login.module.css`).
  - Theme variables in `src/styles/theme.js`.
- **Routing:**
  - All routes defined in `src/routes/routes.jsx`.
  - Role-based navigation in `src/routes/navigation/`.

## Developer Workflows
- **Start Dev Server:**
  - `npm install` (first time)
  - `npm run dev` (starts Vite dev server)
- **Build for Production:**
  - `npm run build`
- **Linting:**
  - `npm run lint` (uses ESLint config in `eslint.config.js`)
- **No built-in test suite** (as of current structure).

## Integration & Data Flow
- **External APIs:**
  - All data flows through the API layer in `src/apis/`.
  - No direct fetch calls in components; always use the API abstraction.
- **Role-based Views:**
  - Pages and navigation are separated by user role (donor, organizer, volunteer).
  - Example: `src/pages/organizer/` contains organizer-specific views.

## Examples
- To add a new API endpoint: create a function in the relevant `src/apis/*.api.js` file and use it in the corresponding page/component.
- To add a new page for a role: add a file in `src/pages/{role}/` and register the route in `src/routes/routes.jsx`.

## References
- See `README.md` for Vite/React basics.
- See `src/constants/blood-donation.constants.js` for domain constants.

---

**Update this file if you introduce new architectural patterns, workflows, or conventions.**
