// Lightweight toast system to replace sonner (~2KB vs ~40KB)
import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Check, X } from './icons';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'error') => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const context = useContext(ToastContext);
  if (!context) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {context.toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={context.removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <div
      className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm animate-in slide-in-from-right-full fade-in duration-200 ${
        toast.type === 'success'
          ? 'bg-neutral-800 text-white border border-neutral-700'
          : 'bg-red-900/90 text-red-100 border border-red-700'
      }`}
    >
      {toast.type === 'success' ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <X className="w-4 h-4 text-red-400" />
      )}
      {toast.message}
    </div>
  );
}

// Singleton toast API for compatibility with sonner's toast()
let toastFn: ((message: string, type?: 'success' | 'error') => void) | null = null;

export function useToastRegister() {
  const context = useContext(ToastContext);
  useEffect(() => {
    if (context) {
      toastFn = context.addToast;
    }
    return () => {
      toastFn = null;
    };
  }, [context]);
}

// Export toast function matching sonner's API
export const toast = {
  success: (message: string) => toastFn?.(message, 'success'),
  error: (message: string) => toastFn?.(message, 'error'),
};
