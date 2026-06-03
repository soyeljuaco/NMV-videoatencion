/**
 * AppointmentEmpty — estado vacío para las tabs de Mis Videoatenciones
 *
 * Props:
 *   tab       'proximas' | 'pasadas'
 *   onAgendar fn — abre el wizard de agendamiento
 */
import { A } from '../../../assets.js'

export default function AppointmentEmpty({ tab, onAgendar }) {
  const isProximas = tab === 'proximas'

  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">

      {/* Inline calendar SVG */}
      <div className="w-20 h-20 rounded-[20px] bg-[#e8f4fd] flex items-center justify-center flex-shrink-0">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="8" width="36" height="30" rx="5" stroke="#0085ca" strokeWidth="2.2" fill="none"/>
          <path d="M4 17h36" stroke="#0085ca" strokeWidth="2.2"/>
          <path d="M14 4v8M30 4v8" stroke="#0085ca" strokeWidth="2.2" strokeLinecap="round"/>
          <rect x="12" y="24" width="7" height="7" rx="2" fill="#0085ca"/>
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-raleway font-bold text-xl text-[#212529]">
          {isProximas ? 'No tienes videoatenciones próximas' : 'No tienes videoatenciones anteriores'}
        </h3>
        <p className="text-[#6c757d] text-base whitespace-nowrap">
          {isProximas
            ? 'Agenda una videoatención y nos vemos pronto.'
            : 'Tus videoatenciones completadas y anuladas aparecerán aquí.'}
        </p>
      </div>

      {isProximas && (
        <button
          onClick={onAgendar}
          className="bg-[#0085ca] text-white font-semibold rounded-full px-10 py-[13px] text-sm leading-6 hover:bg-[#006fa8] transition-colors flex items-center gap-2.5"
        >
          <img src={A.iconVideoBlue} alt="" className="w-5 h-5" />
          Agendar videoatención
        </button>
      )}

    </div>
  )
}
