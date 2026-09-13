import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
/* Molle is branding-only (splash + logo), so just the latin italic cut.
   Inter is declared by hand in index.css against a stable path in public/ so
   index.html can preload it — Vite content-hashes anything imported here,
   which a preload in the HTML cannot name. */
import '@fontsource/molle/latin-400-italic.css';
import { ToastProvider } from './components/Toast';
import App from './App';
import { initAnalytics } from './lib/analytics';
import './index.css';

// Initialize analytics
initAnalytics();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
);
