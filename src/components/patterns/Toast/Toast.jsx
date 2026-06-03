/**
 * Toast — sistema de notificaciones tipo snackbar
 *
 * Props del contenedor:
 *   toasts    { id, message, type: 'success'|'error' }[]
 *   onDismiss fn(id)
 *
 * Uso:
 *   const [toasts, setToasts] = useState([])
 *   function addToast(message, type = 'success') {
 *     setToasts(prev => [...prev, { id: Date.now(), message, type }])
 *   }
 *   function dismissToast(id) {
 *     setToasts(prev => prev.filter(t => t.id !== id))
 *   }
 */
import { useEffect } from 'react'
import './Toast.css'

const ICONS = { success: '✓', error: '✕' }
const AUTO_DISMISS_MS = 4000

export default function Toast({ toasts, onDismiss }) {
  if (!toasts.length) return null
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  return (
    <div
      className={`toast-item toast-item--${toast.type}`}
      role="alert"
    >
      <span className="toast-icon" aria-hidden="true">{ICONS[toast.type]}</span>
      <span className="toast-msg">{toast.message}</span>
      <button
        className="toast-close"
        onClick={() => onDismiss(toast.id)}
        aria-label="Cerrar notificación"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path d="M10 3L3 10M3 3l7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}
