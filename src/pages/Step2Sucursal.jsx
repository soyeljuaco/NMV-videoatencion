import { A } from '../assets.js'

const ZONAS = [
  { id: 'norte',  label: 'Zona Norte',  cities: 'Arica, Iquique, Calama, Antofagasta, Copiapó, La Serena.' },
  { id: 'centro', label: 'Zona Centro', cities: 'Viña del Mar, Santiago, Rancagua, Curicó, Talca, Chillán, Concepción, Los Ángeles.' },
  { id: 'sur',    label: 'Zona Sur',    cities: 'Temuco, Valdivia, Osorno, Puerto Montt, Chiloé, Coyhaique, Punta Arenas.' },
]

const MOTIVO_LABELS = {
  orientacion:  'Orientación',
  ges:          'GES/CAEC',
  presupuestos: 'Presupuestos y Programas Médicos',
  servicio:     'Servicio al Cliente',
}
const MOTIVO_TAG_LABELS = { ...MOTIVO_LABELS, presupuestos: 'Presupuestos y Pro...' }

export default function Step2Sucursal({ motivo, sucursal, onSelect, onNext, onBack, onEditMotivo }) {
  return (
    <div className="flex flex-col gap-8 p-4 xl:p-8">
      {/* Selection breadcrumb */}
      <div className="flex items-center gap-4">
        <button onClick={onEditMotivo} className="wizard-tag">
          <img src={A.iconMotivoTag} alt="" className="w-4 h-4" />
          <span className="text-[#495057]">Motivo:</span>
          <strong>{MOTIVO_TAG_LABELS[motivo]}</strong>
          <img src={A.iconPencil} alt="" className="w-5 h-5 ml-1" />
        </button>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-display font-bold text-2xl text-[#212529] tracking-tight">Elige tu Sucursal</h3>
        <p className="text-[#495057] text-base leading-6">Selecciona la zona más cercana para asignarte un ejecutivo local.</p>
      </div>

      {/* Zone cards 3-column */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 xl:gap-6">
        {ZONAS.map(({ id, label, cities }) => {
          const selected = sucursal === id
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className={`option-card flex-col items-start text-left xl:h-48 ${selected ? 'selected' : ''}`}
            >
              {/* Top row: icon + radio */}
              <div className="flex items-start justify-between w-full">
                <div className="w-11 h-11 rounded-2xl bg-[rgba(0,133,202,0.1)] flex items-center justify-center flex-shrink-0">
                  <img src={A.iconMapPin} alt="" className="w-6 h-6" />
                </div>
                <div className={`radio-circle ${selected ? 'checked' : ''}`}>
                  {selected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <circle cx="5" cy="5" r="3" fill="white"/>
                    </svg>
                  )}
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col gap-1 mt-4">
                <p className="font-display font-bold text-base text-[#212529] leading-6">{label}</p>
                <p className="text-[#495057] text-sm leading-5">{cities}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer nav */}
      <div className="border-t border-[#dee2e6] flex flex-col-reverse xl:flex-row items-stretch xl:items-center justify-between pt-6 gap-3 xl:gap-0">
        <button onClick={onBack} className="btn-secondary w-full xl:w-auto justify-center">Volver</button>
        <button
          onClick={() => sucursal && onNext()}
          className={`btn-continue w-full xl:w-auto justify-center ${sucursal ? 'active' : 'inactive'}`}
        >
          Continuar
          <img src={A.iconChevronRight} alt="" className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
