/**
 * MisCitas — sección de gestión de citas en la Sucursal Virtual
 *
 * Props:
 *   onAgendar  fn — inicia el wizard de agendamiento (usuario ya logueado)
 */
import { useState, useCallback } from 'react'
import { useAppointments }    from '../../../hooks/useAppointments.js'
import AppointmentCard        from '../../../components/patterns/AppointmentCard/AppointmentCard.jsx'
import AppointmentEmpty       from '../../../components/patterns/AppointmentEmpty/AppointmentEmpty.jsx'
import RescheduleModal        from '../../../components/patterns/RescheduleModal/RescheduleModal.jsx'
import CancelModal            from '../../../components/patterns/CancelModal/CancelModal.jsx'
import Toast                  from '../../../components/patterns/Toast/Toast.jsx'
import './MisCitas.css'

export default function MisCitas({ onAgendar }) {
  const [tab,              setTab]              = useState('proximas')
  const [rescheduleTarget, setRescheduleTarget] = useState(null)
  const [cancelTarget,     setCancelTarget]     = useState(null)
  const [cancelLoading,    setCancelLoading]    = useState(false)
  const [toasts,           setToasts]           = useState([])

  const { appointments, loading, error, reschedule, cancel } = useAppointments()

  // ── Clasificación ──────────────────────────────────────────────────────
  const proximas = appointments.filter(a => a.status === 'upcoming')
  const pasadas  = appointments.filter(a => a.status !== 'upcoming')  // past + cancelled
  const current  = tab === 'proximas' ? proximas : pasadas

  // ── Toast helpers ──────────────────────────────────────────────────────
  const addToast = useCallback((message, type = 'success') => {
    setToasts(prev => [...prev, { id: Date.now() + Math.random(), message, type }])
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  // ── Handlers ───────────────────────────────────────────────────────────
  async function handleReschedule({ fecha, hora }) {
    try {
      await reschedule(rescheduleTarget.id, { fecha, hora })
      setRescheduleTarget(null)
      addToast('Cita reagendada correctamente.')
    } catch {
      addToast('No pudimos reagendar tu cita. Intenta de nuevo.', 'error')
    }
  }

  async function handleCancel() {
    setCancelLoading(true)
    try {
      await cancel(cancelTarget.id)
      setCancelTarget(null)
      // Si la tab activa era "próximas", la cita desaparece de ahí; cambiar a pasadas
      setTab(prev => prev)          // no forzamos cambio de tab
      addToast('Tu cita ha sido anulada.')
    } catch {
      addToast('No pudimos anular tu cita. Intenta de nuevo.', 'error')
    } finally {
      setCancelLoading(false)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <>
      <section className="bg-[#f5f7fa] min-h-screen py-8 xl:py-16 flex justify-center">
        <div className="w-full xl:w-[900px] px-4 xl:px-0 flex flex-col gap-8">

          {/* ── Page header ── */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            <div>
              <h1 className="font-raleway font-bold text-2xl xl:text-[36px] text-[#212529] leading-tight">
                Mis videoatenciones
              </h1>
              <p className="text-[#6c757d] text-sm mt-1">
                Administra tus videoatenciones agendadas.
              </p>
            </div>
            <button
              onClick={onAgendar}
              className="bg-[#0085ca] text-white font-semibold rounded-full px-8 py-[13px] text-sm leading-6 hover:bg-[#006fa8] transition-colors self-start xl:self-auto flex-shrink-0"
            >
              + Agendar nueva videoatención
            </button>
          </div>

          {/* ── Tabs ── */}
          <div className="flex border-b border-[#dee2e6]">
            {[
              { key: 'proximas', label: `Próximas (${proximas.length})` },
              { key: 'pasadas',  label: `Pasadas (${pasadas.length})`  },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`tab-btn px-6 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                  tab === key
                    ? 'border-[#0085ca] text-[#0085ca]'
                    : 'border-transparent text-[#6c757d] hover:text-[#212529]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ── Content ── */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="mc-spinner" aria-label="Cargando citas…" />
            </div>
          )}

          {error && !loading && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-[#dc3545] text-sm font-semibold">No pudimos cargar tus citas.</p>
              <button
                onClick={() => window.location.reload()}
                className="text-[#0085ca] text-sm font-semibold underline"
              >
                Reintentar
              </button>
            </div>
          )}

          {!loading && !error && current.length === 0 && (
            <AppointmentEmpty tab={tab} onAgendar={onAgendar} />
          )}

          {!loading && !error && current.length > 0 && (
            <div className="flex flex-col gap-4 pb-8">
              {current.map(apt => (
                <AppointmentCard
                  key={apt.id}
                  appointment={apt}
                  onReschedule={setRescheduleTarget}
                  onCancel={setCancelTarget}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── Modals ── */}
      {rescheduleTarget && (
        <RescheduleModal
          appointment={rescheduleTarget}
          onConfirm={handleReschedule}
          onCancel={() => setRescheduleTarget(null)}
        />
      )}

      {cancelTarget && (
        <CancelModal
          appointment={cancelTarget}
          onConfirm={handleCancel}
          onCancel={() => setCancelTarget(null)}
          loading={cancelLoading}
        />
      )}

      {/* ── Toasts ── */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}
