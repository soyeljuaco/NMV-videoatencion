import { A } from '../assets.js'

import icoOrientacion  from '../icons/ico-orientacion.svg'
import icoGes          from '../icons/ico-ges.svg'
import icoPresupuestos from '../icons/ico-presupuestos.svg'
import icoServicio     from '../icons/ico-servicio.svg'

const OPTIONS = [
  {
    id:   'orientacion',
    icon: icoOrientacion,
    title: 'Orientación',
    desc:  'Bono, reembolsos, licencias médicas y pagos',
    tip:   true,
  },
  {
    id:   'ges',
    icon: icoGes,
    title: 'GES/CAEC',
    desc:  'Activación, orientación e información',
    tip:   true,
  },
  {
    id:   'presupuestos',
    icon: icoPresupuestos,
    title: 'Presupuestos y Programas Médicos',
    desc:  'Información, recepción de documentos y gestión',
  },
  {
    id:   'servicio',
    icon: icoServicio,
    title: 'Servicio al Cliente',
    desc:  'Mantención de Plan de Salud, ingreso y retiro de beneficiario, cambio de empleador, etc',
  },
]

export default function Step1Motivo({ motivo, onSelect, onNext, onExit }) {

  return (
    <div className="flex flex-col gap-8 p-4 xl:p-8">

      {/* Heading */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-raleway font-bold text-2xl text-[#212529] tracking-tight">¿En qué te ayudamos hoy?</h3>
        <p className="text-[#495057] text-base">Elige el motivo de tu videoatención para asignarte al ejecutivo adecuado.</p>
      </div>

      {/* Option grid 2×2 — CSS Grid iguala altos dentro de cada fila automáticamente */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-6">
        {OPTIONS.map(({ id, icon, title, desc, tip }) => {
          const selected  = motivo === id
          const showTip   = selected && tip

          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`option-card text-left ${selected ? 'selected' : ''}`}
            >
              {/* ── Fila principal: icono + texto + radio ── */}
              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Contenedor icono 48 × 48 px */}
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(0,133,202,0.1)] flex items-center justify-center flex-shrink-0">
                    <img src={icon} alt="" className="w-6 h-6" />
                  </div>

                  {/* Título + descripción */}
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="font-raleway font-bold text-base text-[#212529] leading-6">{title}</p>
                    <p className="text-[#495057] text-sm leading-[1.45]">{desc}</p>
                  </div>
                </div>

                {/* Radio */}
                <div className={`radio-circle flex-shrink-0 mt-0.5 ${selected ? 'checked' : ''}`}>
                  {selected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="3" fill="white" />
                    </svg>
                  )}
                </div>
              </div>

              {/* ── Tip inline Sucursal Virtual ── */}
              {showTip && (
                <div className="mt-4 pt-4 border-t border-[rgba(126,78,215,0.15)] flex items-start gap-2.5">
                  {/* Ícono chispa */}
                  <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 2L4.5 13.5H12L11 22L19.5 10.5H12L13 2Z" stroke="#7e4ed7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>

                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm text-[#495057] leading-relaxed">
                      Puedes resolver esto{' '}
                      <span className="font-semibold text-[#212529]">ahora mismo</span>{' '}
                      en tu Sucursal Virtual, sin necesidad de agendar.
                    </p>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation()
                        window.open('https://sucursalvirtual.nuevamasvida.cl', '_blank')
                      }}
                      className="text-sm font-semibold text-[#7e4ed7] hover:underline text-left flex items-center gap-1 w-fit"
                    >
                      Ir a Sucursal Virtual
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 6H10M6.5 2.5L10 6L6.5 9.5" stroke="#7e4ed7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <p className="text-xs text-[#6c757d] leading-snug">
                      O continúa abajo para agendar tu videoatención.
                    </p>
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Footer nav */}
      <div className="border-t border-[#dee2e6] flex flex-col-reverse xl:flex-row items-stretch xl:items-center justify-between pt-6 gap-3 xl:gap-0">
        <button onClick={onExit} className="btn-secondary w-full xl:w-auto justify-center">Salir</button>
        <button
          onClick={() => motivo && onNext()}
          className={`btn-continue w-full xl:w-auto justify-center ${motivo ? 'active' : 'inactive'}`}
        >
          Continuar
          <img src={A.iconChevronRight} alt="" className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}
