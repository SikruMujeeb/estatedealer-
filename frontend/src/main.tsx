import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import { ErrorBoundary } from "./components/ErrorBoundary";
import { PortfolioPage } from "./features/portfolio/PortfolioPage";
import { registerServiceWorker } from "./lib/serviceWorker";
import "./styles.css";

const ManagementApp = lazy(() => import("./App"));
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontró el elemento #root en index.html");
}

/*
 * Before rendering, and deliberately not awaited: registration is fire-and-
 * forget, defers its own work to the `load` event, and nothing on screen
 * depends on whether it succeeds. See lib/serviceWorker.ts.
 */
registerServiceWorker();

const isManagementRoute =
  window.location.pathname === "/gestion" || window.location.pathname === "/gestion/";
createRoot(rootElement).render(
  <StrictMode>
    {/* The outermost net: if a render error escapes every panel-level boundary,
        this shows a full-page message with a reload instead of a blank tab. */}
    <ErrorBoundary variant="page">
      {isManagementRoute ? (
        <Suspense fallback={<div className="app-booting">Cargando aplicación…</div>}>
          <ManagementApp />
        </Suspense>
      ) : (
        <PortfolioPage />
      )}
    </ErrorBoundary>
  </StrictMode>,
);
