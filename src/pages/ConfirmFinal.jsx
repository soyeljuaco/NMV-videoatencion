import { A } from '../assets.js'

const MOTIVO_LABELS  = {
  orientacion:  'Orientación',
  ges:          'GES/CAEC',
  presupuestos: 'Presupuestos y Programas Médicos',
  servicio:     'Servicio al Cliente',
}
const SUCURSAL_LABELS = { norte:'Zona Norte', centro:'Zona Centro', sur:'Zona Sur' }
const DAYS_LONG_ES = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
const MONTHS_LONG = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

function formatFecha(d) {
  if (!d) return ''
  const dow = DAYS_LONG_ES[d.getDay()]
  return `${dow.charAt(0).toUpperCase() + dow.slice(1)}, ${d.getDate()} de ${MONTHS_LONG[d.getMonth()]}`
}

export default function ConfirmFinal({ motivo, sucursal, fecha, hora, email, onRestart, onAgendarOtra }) {
  return (
    <div className="flex flex-col items-center gap-8 p-4 xl:p-8">
      {/* All steps green = done in WizardStepper (step=5 signals all complete) */}

      {/* Big green check */}
      <div className="w-16 h-16 rounded-full bg-[rgba(53,173,68,0.15)] flex items-center justify-center">
        <img src={A.iconCheckGreenLg} alt="Confirmado" className="w-8 h-8" />
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2.5 text-center">
        <h3 className="font-raleway font-bold text-2xl text-[#212529]">¡Cita confirmada!</h3>
        <p className="text-[#495057] text-base">
          Te enviamos los datos de tu videoatención a{' '}
          <strong className="text-[#212529] font-semibold">{email}</strong>
        </p>
      </div>

      {/* Summary card */}
      <div className="w-full xl:w-[588px] bg-[#f9fcfe] border border-[#dee2e6] rounded-2xl p-6 flex flex-col gap-4">
        <p className="text-[#495057] text-xs font-semibold uppercase tracking-[0.6px]">RESUMEN DE TU CITA</p>
        <div className="flex flex-col gap-3 pb-2">
          {[
            { label: 'MOTIVO',   value: MOTIVO_LABELS[motivo] },
            { label: 'SUCURSAL', value: SUCURSAL_LABELS[sucursal] },
            { label: 'FECHA',    value: formatFecha(fecha) },
            { label: 'HORA',     value: hora ? `${hora} hrs` : '' },
          ].map(({ label, value }, i, arr) => (
            <div
              key={label}
              className={`flex items-center justify-between py-2 ${i < arr.length - 1 ? 'border-b border-[#dee2e6]' : ''}`}
            >
              <span className="text-[#495057] text-xs font-semibold uppercase tracking-[0.6px]">{label}</span>
              <span className="text-[#212529] font-semibold text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Restart button */}
      <button
        onClick={onAgendarOtra || onRestart}
        className="bg-white border border-[#adb5bd] text-[#495057] font-semibold rounded-full px-5 py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm w-full xl:w-auto"
      >
        <img src={A.iconRefresh} alt="" className="w-4 h-4" />
        Agendar otra cita
      </button>
    </div>
  )
}
