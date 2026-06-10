import { useState } from 'react'
import { A } from '../assets.js'
import icoModal1 from '../icons/ico-modal1.svg'

/** Formatea RUT chileno en tiempo real: XX.XXX.XXX-X */
function formatRut(raw) {
  const v = raw.replace(/[^0-9kK]/g, '').toUpperCase()
  if (!v) return ''
  if (v.length === 1) return v
  const dv  = v.slice(-1)
  const num = v.slice(0, -1)
  let body  = '', count = 0
  for (let i = num.length - 1; i >= 0; i--) {
    if (count > 0 && count % 3 === 0) body = '.' + body
    body = num[i] + body
    count++
  }
  return `${body}-${dv}`
}

function validarRut(rut) {
  const clean = rut.replace(/\./g, '').replace(/-/g, '').trim().toUpperCase()
  if (clean.length < 2) return false
  const body = clean.slice(0, -1)
  const dv   = clean.slice(-1)
  if (!/^\d+$/.test(body)) return false
  let sum = 0, mult = 2
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * mult
    mult = mult === 7 ? 2 : mult + 1
  }
  const rem = 11 - (sum % 11)
  const computed = rem === 11 ? '0' : rem === 10 ? 'K' : String(rem)
  return computed === dv
}

export default function ModalRutValidacion({ onValid, onInvalid, onCancel }) {
  const [rut, setRut]           = useState('')
  const [validating, setValidating] = useState(false)

  function handleContinue() {
    const trimmed = rut.trim()
    if (!trimmed || validating) return
    setValidating(true)
    // Simula la llamada al backend (1.5 s)
    setTimeout(() => {
      setValidating(false)
      if (validarRut(trimmed)) onValid(trimmed)
      else onInvalid(trimmed)
    }, 1500)
  }

  const hasValue = rut.trim().length > 0

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.2)] p-8 w-full max-w-[500px] flex flex-col gap-6 items-center">

        {/* Icon — solo visible en desktop */}
        <img src={icoModal1} alt="" className="hidden xl:block w-10 h-10" />

        {/* Heading */}
        <div className="flex flex-col gap-2 w-full text-center">
          <h3 className="font-display font-bold text-xl text-[#212529]">Validemos tu identidad</h3>
          <p className="text-[#495057] text-base leading-6">
            Ingresa tu RUT para verificar tu afiliación a Nueva Masvida antes de agendar.
          </p>
        </div>

        {/* RUT input */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[#495057] text-xs font-semibold uppercase tracking-[0.6px]">RUT</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Ej. 15.801.354-K"
            value={rut}
            maxLength={12}
            onChange={e => setRut(formatRut(e.target.value))}
            onKeyDown={e => e.key === 'Enter' && handleContinue()}
            disabled={validating}
            autoFocus
            className="bg-white border border-[#ced4da] rounded-2xl px-4 py-4 text-sm text-[#212529] placeholder-[#adb5bd] focus:outline-none focus:border-[#0085ca] focus:ring-2 focus:ring-[rgba(0,133,202,0.15)] w-full disabled:bg-[#f8f9fa] disabled:text-[#adb5bd]"
          />
        </div>

        {/* Actions — mobile: flex-col-reverse → primaria arriba, cancelar abajo · desktop: fila normal */}
        <div className="flex flex-col-reverse gap-3 w-full pt-2 xl:flex-row xl:justify-end">
          <button
            onClick={onCancel}
            disabled={validating}
            className="bg-white border border-[#adb5bd] text-[#495057] font-semibold rounded-full px-6 py-3 text-sm hover:bg-gray-50 transition-colors w-full xl:w-auto xl:min-w-[110px] flex items-center justify-center disabled:opacity-40"
          >
            Cancelar
          </button>
          <button
            onClick={handleContinue}
            disabled={!hasValue || validating}
            className={`flex items-center justify-center gap-2 font-semibold rounded-full px-6 py-3 text-sm transition-colors w-full xl:w-auto xl:min-w-[190px]
              ${hasValue && !validating
                ? 'bg-[#0085ca] text-white hover:bg-[#0074b0] cursor-pointer'
                : 'bg-[rgba(0,133,202,0.1)] text-[#50606e] cursor-not-allowed'
              }`}
          >
            {validating ? (
              <>
                {/* Spinner */}
                <svg className="animate-spin w-4 h-4 text-[#0085ca]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Validando...
              </>
            ) : (
              <>
                Validar y continuar
                <img
                  src={A.iconChevronRight}
                  alt=""
                  className="w-4 h-4"
                  style={{ filter: hasValue ? 'brightness(0) invert(1)' : 'none' }}
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
