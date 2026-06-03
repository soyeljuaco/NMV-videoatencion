import { useEffect, useRef, useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { A } from '../assets.js'

const MOTIVO_LABELS     = { orientacion:'Orientación', ges:'GES/CAEC', presupuestos:'Presupuestos y Programas Médicos', servicio:'Servicio al Cliente' }
const MOTIVO_TAG_LABELS = { ...MOTIVO_LABELS, presupuestos: 'Presupuestos y Pro...' }
const SUCURSAL_LABELS = { norte:'Zona Norte', centro:'Zona Centro', sur:'Zona Sur' }
const DAYS_LONG_ES    = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
const MONTHS_LONG     = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatFecha(d) {
  if (!d) return ''
  const dow = DAYS_LONG_ES[d.getDay()]
  return `${dow.charAt(0).toUpperCase() + dow.slice(1)}, ${d.getDate()} de ${MONTHS_LONG[d.getMonth()]}`
}

function formatFechaTag(d) {
  if (!d) return ''
  const dow = DAYS_LONG_ES[d.getDay()]
  return `${dow.charAt(0).toUpperCase() + dow.slice(1)} ${d.getDate()}`
}

/**
 * Formatea un RUT chileno en tiempo real: XX.XXX.XXX-X
 * Acepta dígitos + K; ignora todo lo demás.
 */
function formatRut(raw) {
  const v = raw.replace(/[^0-9kK]/g, '').toUpperCase()
  if (!v) return ''
  if (v.length === 1) return v
  const dv  = v.slice(-1)          // dígito verificador
  const num = v.slice(0, -1)       // cuerpo numérico
  // Agrupa de derecha a izquierda con puntos cada 3 dígitos
  let body  = ''
  let count = 0
  for (let i = num.length - 1; i >= 0; i--) {
    if (count > 0 && count % 3 === 0) body = '.' + body
    body = num[i] + body
    count++
  }
  return `${body}-${dv}`
}

/** Validación básica de correo electrónico */
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim())

// ─────────────────────────────────────────────────────────────────────────────

export default function Step4Confirm({
  motivo, sucursal, fecha, hora, nombre, rut, telefono, email,
  onChange, onNext, onBack, onEditMotivo, onEditSucursal, onEditFecha
}) {
  const [emailBlurred,    setEmailBlurred]    = useState(false)
  const [hasInteracted,   setHasInteracted]   = useState(false)
  const markInteracted = () => setHasInteracted(true)
  const emailError  = emailBlurred && email.length > 0 && !isValidEmail(email)
  const canContinue = nombre.trim() && rut.trim() && telefono?.trim() && email.trim() && isValidEmail(email)

  // Auto-focus en el primer campo vacío
  const nombreRef   = useRef(null)
  const telefonoRef = useRef(null)
  const emailRef    = useRef(null)

  useEffect(() => {
    if (!nombre.trim())              nombreRef.current?.focus()
    else if (!telefono?.trim())      telefonoRef.current?.querySelector('input')?.focus()
    else if (!email.trim())          emailRef.current?.focus()
  }, [])

  return (
    <div className="flex flex-col gap-8 p-4 xl:p-8">

      {/* Breadcrumb tags */}
      <div className="flex items-center gap-4 flex-wrap">
        <button onClick={onEditMotivo} className="wizard-tag">
          <img src={A.iconMotivoTag} alt="" className="w-4 h-4" />
          <span className="text-[#495057]">Motivo:</span>
          <strong>{MOTIVO_TAG_LABELS[motivo]}</strong>
          <img src={A.iconPencil} alt="" className="w-5 h-5 ml-1" />
        </button>
        <button onClick={onEditSucursal} className="wizard-tag">
          <img src={A.iconMapPin} alt="" className="w-4 h-4" />
          <span className="text-[#495057]">Sucursal:</span>
          <strong>{SUCURSAL_LABELS[sucursal]}</strong>
          <img src={A.iconPencil} alt="" className="w-5 h-5 ml-1" />
        </button>
        <button onClick={onEditFecha} className="wizard-tag">
          <img src={A.iconCalendarTag} alt="" className="w-4 h-4" />
          <span className="text-[#495057]">Fecha y hora:</span>
          <strong>{formatFechaTag(fecha)}, {hora} hrs</strong>
          <img src={A.iconPencil} alt="" className="w-5 h-5 ml-1" />
        </button>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-raleway font-bold text-2xl text-[#212529]">Confirma tus datos</h3>
        <p className="text-[#495057] text-base">Revisaremos esta información para validar tu identidad antes de la videoatención</p>
      </div>

      {/* Two-column layout: form + summary */}
      <div className="flex flex-col xl:flex-row gap-6 xl:items-start">

        {/* ── Formulario ───────────────────────────────────────── */}
        <div className="flex flex-col flex-1 pt-6 pb-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-5">

            {/* Nombre completo */}
            <div className="col-span-1 xl:col-span-2 flex flex-col gap-1.5">
              <label
                htmlFor="input-nombre"
                className="text-[#495057] text-xs font-semibold uppercase tracking-[0.6px]"
              >
                NOMBRE COMPLETO
              </label>
              <input
                id="input-nombre"
                ref={nombreRef}
                type="text"
                placeholder="Ej. María Pérez"
                value={nombre}
                onChange={e => { markInteracted(); onChange('nombre', e.target.value) }}
                aria-describedby="nombre-hint"
                className="bg-white border border-[#ced4da] rounded-2xl px-4 py-4 text-sm text-[#212529] placeholder-[#adb5bd] focus:outline-none focus:border-[#0085ca] focus:ring-2 focus:ring-[rgba(0,133,202,0.15)]"
              />
              <span id="nombre-hint" className="sr-only">
                Este campo fue autocompletado con la información de tu Sucursal Virtual
              </span>
            </div>

            {/* RUT — con preformato chileno */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="input-rut"
                className="text-[#495057] text-xs font-semibold uppercase tracking-[0.6px]"
              >
                RUT
              </label>
              <input
                id="input-rut"
                type="text"
                inputMode="numeric"
                placeholder="Ej. 12.345.678-9"
                value={rut}
                maxLength={12}
                onChange={e => { markInteracted(); onChange('rut', formatRut(e.target.value)) }}
                className="bg-white border border-[#ced4da] rounded-2xl px-4 py-4 text-sm text-[#212529] placeholder-[#adb5bd] focus:outline-none focus:border-[#0085ca] focus:ring-2 focus:ring-[rgba(0,133,202,0.15)]"
              />
            </div>

            {/* Teléfono */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#495057] text-xs font-semibold uppercase tracking-[0.6px]">TELÉFONO</label>
              <div ref={telefonoRef} className="phone-field">
                <PhoneInput
                  defaultCountry="CL"
                  value={telefono}
                  onChange={val => { markInteracted(); onChange('telefono', val || '') }}
                  placeholder="+56 9 1234 5678"
                  international
                />
              </div>
            </div>

            {/* Email — con validación de formato */}
            <div className="col-span-1 xl:col-span-2 flex flex-col gap-1.5">
              <label
                htmlFor="input-email"
                className="text-[#495057] text-xs font-semibold uppercase tracking-[0.6px]"
              >
                CORREO ELECTRÓNICO
              </label>
              <input
                id="input-email"
                ref={emailRef}
                type="email"
                placeholder="Ej. tucorreo@ejemplo.cl"
                value={email}
                onChange={e => { markInteracted(); onChange('email', e.target.value) }}
                onBlur={() => setEmailBlurred(true)}
                aria-describedby={emailError ? 'email-error' : undefined}
                aria-invalid={emailError ? 'true' : undefined}
                className={`bg-white border rounded-2xl px-4 py-4 text-sm text-[#212529] placeholder-[#adb5bd] focus:outline-none focus:ring-2 transition-colors
                  ${emailError
                    ? 'border-red-400 focus:border-red-500 focus:ring-[rgba(220,38,38,0.15)]'
                    : 'border-[#ced4da] focus:border-[#0085ca] focus:ring-[rgba(0,133,202,0.15)]'
                  }`}
              />
              {emailError && (
                <p id="email-error" role="alert" className="text-red-500 text-xs font-medium flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                  Ingresa un correo válido (ej: nombre@dominio.cl)
                </p>
              )}
            </div>

          </div>
        </div>

        {/* ── Sidebar resumen — relative para posicionar el tooltip ── */}
        <div className="w-full xl:w-[361px] bg-[#f9fcfe] border border-[#dee2e6] rounded-2xl p-6 flex flex-col gap-4 flex-shrink-0 xl:self-stretch relative">

          {/* ── Tooltip burbuja — visible solo hasta el primer cambio ── */}
          {!hasInteracted && (
            <div className="hidden xl:block">
            <div
              role="note"
              aria-label="Hemos completado algunos datos con la información de tu sucursal virtual"
              className="absolute top-5 left-0 z-20 animate-sv-tip"
              style={{ transform: 'translateX(calc(-100% - 10px))' }}
            >
              <div
                className="relative text-white rounded-[18px] py-[14px] px-5"
                style={{
                  width: '254px',
                  background: 'rgba(0,133,202,0.95)',
                  filter: 'drop-shadow(0 8px 20px rgba(0,133,202,0.35))',
                }}
              >
                <p className="text-sm font-medium leading-[1.45]">
                  Hemos completado algunos datos con la información de tu sucursal virtual.
                </p>

                {/* Flecha ← apunta al input de nombre (izquierda) */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '-9px',
                    top: '30px',
                    width: 0,
                    height: 0,
                    borderTop:    '9px solid transparent',
                    borderBottom: '9px solid transparent',
                    borderRight:  '9px solid rgba(0,133,202,0.95)',
                  }}
                />
              </div>
            </div>
            </div>
          )}
          {/* ────────────────────────────────────────────────────────── */}

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
                <span className="text-[#212529] font-semibold text-sm text-right">{value}</span>
              </div>
            ))}
          </div>

          {/* Nota de privacidad */}
          <div className="bg-[rgba(0,145,206,0.05)] rounded-2xl h-14 relative">
            <img src={A.iconInfoShield} alt="" className="absolute left-3 top-3.5 w-4 h-4" />
            <div className="absolute left-9 top-4 right-3">
              <p className="text-[#495057] text-xs leading-4">Tu información está protegida y solo será usada para gestionar tu cita.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer nav */}
      <div className="border-t border-[#dee2e6] flex flex-col-reverse xl:flex-row items-stretch xl:items-center justify-between pt-6 gap-3 xl:gap-0">
        <button onClick={onBack} className="btn-secondary w-full xl:w-auto justify-center">Volver</button>
        <button
          onClick={() => canContinue && onNext()}
          className={`btn-confirm w-full xl:w-[167px] ${canContinue ? 'active' : 'inactive'}`}
        >
          Confirmar cita
          <img src={A.iconChevronRight} alt="" className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}
