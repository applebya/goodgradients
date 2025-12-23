import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: 'hsl(0 0% 10%)',
          color: 'hsl(0 0% 98%)',
          border: '1px solid hsl(0 0% 20%)',
        },
      }}
    />
  </StrictMode>
);
