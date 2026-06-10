/**
 * CancelModal — confirmación de anulación de cita
 *
 * Props:
 *   appointment  object  — cita a anular
 *   onConfirm    fn      — confirma la anulación
 *   onCancel     fn      — descarta el modal
 *   loading      bool    — mientras procesa
 */
import { createPortal } from 'react-dom'
import { getMotivo } from '../../../services/appointmentsService.js'

export default function CancelModal({ appointment, onConfirm, onCancel, loading }) {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end xl:items-center justify-center"
      style={{ background: 'rgba(33,37,41,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={e => { if (e.target === e.currentTarget && !loading) onCancel() }}
    >
      <div className="bg-white w-full xl:w-[460px] rounded-t-[24px] xl:rounded-[24px] p-6 xl:p-8 flex flex-col gap-6">

        {/* Ícono */}
        <div className="w-12 h-12 rounded-full bg-[#fdecea] flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M11 7v5M11 15.5h.01"
              stroke="#dc3545" strokeWidth="2" strokeLinecap="round"
            />
            <circle cx="11" cy="11" r="9.25" stroke="#dc3545" strokeWidth="1.8"/>
          </svg>
        </div>

        {/* Texto */}
        <div className="flex flex-col gap-2">
          <h2 className="font-display font-bold text-xl text-[#212529]">
            ¿Anular esta cita?
          </h2>
          <p className="text-[#495057] text-sm leading-6">
            Si anulas tu cita de{' '}
            <strong className="text-[#212529]">{getMotivo(appointment.motivo)}</strong>,
            perderás la hora reservada. Podrás agendar nuevamente cuando quieras.
          </p>
        </div>

        {/* Acciones */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="w-full py-[13px] rounded-full bg-[#0085ca] text-white font-semibold text-sm hover:bg-[#006fa8] disabled:opacity-50 transition-colors"
          >
            Mantener cita
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full py-[13px] rounded-full border border-[#dc3545] text-[#dc3545] font-semibold text-sm hover:bg-[#fdecea] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Anulando…' : 'Sí, anular cita'}
          </button>
        </div>

      </div>
    </div>,
    document.body
  )
}
