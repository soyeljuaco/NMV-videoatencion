import { A } from '../assets.js'

export default function ModalNoAfiliado({ rut, onTryOther, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] p-8 w-full max-w-[520px] flex flex-col gap-6 items-center">

        {/* Orange icon */}
        <div className="w-20 h-20 rounded-full bg-[rgba(239,144,51,0.15)] flex items-center justify-center flex-shrink-0">
          <img src={A.iconInfoCircle} alt="" className="w-10 h-10" />
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2 w-full text-center">
          <h3 className="font-display font-bold text-xl text-[#212529]">RUT no encontrado</h3>
          <p className="text-[#495057] text-base leading-6">
            El RUT <strong className="text-[#212529] font-semibold">{rut}</strong> no está registrado como afiliado de Nueva Masvida. Las videoatenciones son un beneficio exclusivo para nuestros afiliados.
          </p>
        </div>

        {/* Info box */}
        <div className="w-full border border-[#dee2e6] rounded-xl px-6 py-4">
          <p className="text-[#495057] text-sm leading-5">
            Si crees que esto es un error, comunícate con nuestro contact center al <strong className="text-[#212529] font-semibold">600 600 2000</strong> o acude a una sucursal.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center justify-center w-full pt-2 flex-wrap">
          <button
            onClick={onTryOther}
            className="bg-white border border-[#adb5bd] text-[#495057] font-semibold rounded-full px-6 py-3 text-sm hover:bg-gray-50 transition-colors flex items-center justify-center min-w-[170px]"
          >
            Probar con otro RUT
          </button>
          <button
            onClick={onClose}
            className="bg-[#212529] text-white font-semibold rounded-full px-6 py-3 text-sm hover:bg-[#343a40] transition-colors flex items-center justify-center min-w-[120px]"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )
}
