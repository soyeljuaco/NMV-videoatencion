import { A } from '../assets.js'

const MOTIVO_LABELS = {
  tramite:   'Trámite administrativo',
  cobertura: 'Consulta de cobertura',
  pagos:     'Pagos y facturación',
  otro:      'Otra gestión',
}

export default function ModalPaso1({ motivo, onGoSucursal, onContinue, onSalir }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] p-8 w-full max-w-[680px] flex flex-col gap-6">

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <p className="text-[#7e4ed7] text-xs font-semibold uppercase tracking-wider">Tu gestión</p>
          <h3 className="font-display font-bold text-2xl text-[#212529]">¿Cómo quieres continuar?</h3>
          <p className="text-[#495057] text-base leading-6">
            Para <strong className="text-[#212529]">{MOTIVO_LABELS[motivo] || 'tu gestión'}</strong>, puedes resolverla ahora mismo en nuestra Sucursal Virtual o agendar una videoatención con un ejecutivo.
          </p>
        </div>

        {/* Two action cards */}
        <div className="grid grid-cols-2 gap-4">

          {/* Card 1: Sucursal Virtual */}
          <button
            onClick={onGoSucursal}
            className="group flex flex-col items-start gap-4 p-6 rounded-2xl border border-[#dee2e6] bg-white text-left cursor-pointer
              hover:border-[#0085ca] hover:bg-[rgba(0,133,202,0.04)] hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[rgba(239,144,51,0.15)] flex items-center justify-center flex-shrink-0">
              <img src={A.iconUserScreen} alt="" className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-display font-bold text-base text-[#212529] leading-6">Sucursal Virtual</p>
              <p className="text-[#495057] text-sm leading-5">
                Resuelve tu trámite en línea de forma inmediata, sin esperar.
              </p>
            </div>
            <span className="text-[#0085ca] text-sm font-semibold group-hover:underline mt-auto">
              Abrir sucursal virtual →
            </span>
          </button>

          {/* Card 2: Videoatención */}
          <button
            onClick={onContinue}
            className="group flex flex-col items-start gap-4 p-6 rounded-2xl border border-[#dee2e6] bg-white text-left cursor-pointer
              hover:border-[#0085ca] hover:bg-[rgba(0,133,202,0.04)] hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-[rgba(0,133,202,0.15)] flex items-center justify-center flex-shrink-0">
              <img
                src={A.iconVideoBlue}
                alt=""
                className="w-6 h-6"
                style={{ filter: 'brightness(0) saturate(100%) invert(35%) sepia(94%) saturate(578%) hue-rotate(167deg) brightness(102%) contrast(104%)' }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-display font-bold text-base text-[#212529] leading-6">Videoatención con ejecutivo</p>
              <p className="text-[#495057] text-sm leading-5">
                Agenda una hora con un ejecutivo de Nueva Masvida para tu zona.
              </p>
            </div>
            <span className="text-[#0085ca] text-sm font-semibold group-hover:underline mt-auto">
              Continuar videoatención →
            </span>
          </button>

        </div>

        {/* Salir */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onSalir}
            className="bg-white border border-[#adb5bd] text-[#495057] font-semibold rounded-full px-6 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center justify-center min-w-[120px]"
          >
            Salir
          </button>
        </div>

      </div>
    </div>
  )
}
