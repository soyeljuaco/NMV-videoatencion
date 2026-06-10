import { useState } from 'react'
import { A } from '../assets.js'
import icoModal2 from '../icons/ico-modal2.svg'

export default function ModalClaveSucursal({ onSuccess, onCancel }) {
  const [clave, setClave]       = useState('')
  const [showPwd, setShowPwd]   = useState(false)

  const hasValue = clave.trim().length > 0

  function handleContinue() {
    if (!hasValue) return
    // In production, validate clave against backend.
    // For now, any non-empty value is accepted.
    onSuccess()
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] p-8 w-full max-w-[500px] flex flex-col gap-6 items-center">

        {/* Icon — solo visible en desktop */}
        <img src={icoModal2} alt="" className="hidden xl:block w-10 h-10" />

        {/* Heading */}
        <div className="flex flex-col gap-2 w-full text-center">
          <h3 className="font-display font-bold text-xl text-[#212529]">Ingresa tu clave de Sucursal Virtual</h3>
          <p className="text-[#495057] text-base leading-6">
            Usa la misma clave que utilizas para ingresar en la Sucursal Virtual de Nueva Masvida.
          </p>
        </div>

        {/* Password input */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[#495057] text-xs font-semibold uppercase tracking-[0.6px]">CLAVE</label>
          <div className="relative">
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Ingresa tu clave"
              value={clave}
              onChange={e => setClave(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleContinue()}
              autoFocus
              className="bg-white border border-[#ced4da] rounded-2xl px-4 py-4 text-sm text-[#212529] placeholder-[#adb5bd] focus:outline-none focus:border-[#0085ca] focus:ring-2 focus:ring-[rgba(0,133,202,0.15)] w-full pr-24"
            />
            <button
              type="button"
              onClick={() => setShowPwd(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#0085ca] hover:underline"
            >
              {showPwd ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {/* Forgot password */}
          <div className="flex justify-end mt-1">
            <button
              type="button"
              onClick={() => window.open('https://sucursalvirtual.nuevamasvida.cl/recuperar-clave', '_blank')}
              className="text-xs font-semibold text-[#0085ca] hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        {/* Actions — mobile: flex-col-reverse → primaria arriba, cancelar abajo · desktop: fila normal */}
        <div className="flex flex-col-reverse gap-3 w-full pt-2 xl:flex-row xl:justify-end">
          <button
            onClick={onCancel}
            className="bg-white border border-[#adb5bd] text-[#495057] font-semibold rounded-full px-6 py-3 text-sm hover:bg-gray-50 transition-colors w-full xl:w-auto xl:min-w-[110px] flex items-center justify-center"
          >
            Cancelar
          </button>
          <button
            onClick={handleContinue}
            disabled={!hasValue}
            className={`flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 text-sm transition-colors w-full xl:w-auto xl:min-w-[160px]
              ${hasValue
                ? 'bg-[#0085ca] text-white hover:bg-[#0074b0] cursor-pointer'
                : 'bg-[rgba(0,133,202,0.1)] text-[#50606e] cursor-not-allowed'
              }`}
          >
            Continuar
            <img
              src={A.iconChevronRight}
              alt=""
              className="w-4 h-4"
              style={{ filter: hasValue ? 'brightness(0) invert(1)' : 'none' }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
