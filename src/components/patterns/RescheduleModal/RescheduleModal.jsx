/**
 * RescheduleModal — modal de reagendamiento
 *
 * Reglas del rango:
 *   - Solo muestra días hábiles (Lun–Sáb) dentro de ±6 días calendario
 *     respecto a la fecha original de la cita.
 *   - No muestra días pasados (antes de hoy).
 *   - Sin navegación de semanas; el rango es fijo.
 *
 * Props:
 *   appointment  object        — cita a reagendar
 *   onConfirm    fn({fecha,hora}) — llamado al confirmar
 *   onCancel     fn            — cierra el modal
 */
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { getMotivo, getSucursal } from '../../../services/appointmentsService.js'
import { A } from '../../../assets.js'

// ── Constantes ──────────────────────────────────────────────────────────────
const DAYS_ES   = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
const MONTHS_ES = ['ene.','feb.','mar.','abr.','may.','jun.','jul.','ago.','sep.','oct.','nov.','dic.']

const RANGE_DAYS = 6   // días antes/después de la cita original

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Días hábiles (Lun–Sáb) dentro de ±RANGE_DAYS días calendario de aptFecha.
 * Se excluyen días anteriores a hoy.
 */
function getDaysInRange(aptFecha) {
  const [y, mo, d] = aptFecha.split('-').map(Number)
  const aptDate    = new Date(y, mo - 1, d)
  const today      = new Date(); today.setHours(0, 0, 0, 0)

  const days = []
  for (let offset = -RANGE_DAYS; offset <= RANGE_DAYS; offset++) {
    const cur = new Date(aptDate)
    cur.setDate(aptDate.getDate() + offset)
    if (cur.getDay() === 0) continue   // sin domingos
    if (cur < today)        continue   // sin pasados
    days.push(new Date(cur))
  }
  return days
}

/** Bloques horarios según día: Sáb → mañana, Lun–Vie → tarde */
function getSlots(date) {
  const dow = date.getDay()
  if (dow === 0) return []

  if (dow === 6) {
    // Sábado: 09:00 – 13:30
    const s = []
    for (let h = 9; h <= 13; h++)
      for (let m = 0; m < 60; m += 30) {
        if (h === 13 && m > 30) break
        s.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`)
      }
    return s
  }

  // Lun–Vie: 14:30 – 17:30
  const s = []
  for (let h = 14; h <= 17; h++)
    for (let m = 0; m < 60; m += 30) {
      if (h === 14 && m < 30) continue
      if (h === 17 && m > 30) break
      s.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`)
    }
  return s
}

/** Pseudo-random occupied set — determinista por fecha */
function getOccupied(date, slots) {
  const occupied = new Set()
  slots.forEach((slot, i) => {
    const hash = (date.getDate() * 13 + date.getMonth() * 7 + i * 3) % 5
    if (hash === 0) occupied.add(slot)
  })
  return occupied
}

function toISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

// ── Component ────────────────────────────────────────────────────────────────

export default function RescheduleModal({ appointment, onConfirm, onCancel }) {
  const [selectedDay,  setSelectedDay]  = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [loading,      setLoading]      = useState(false)

  const days     = getDaysInRange(appointment.fecha)
  const slots    = selectedDay ? getSlots(selectedDay)           : []
  const occupied = selectedDay ? getOccupied(selectedDay, slots) : new Set()
  const isSat    = selectedDay ? selectedDay.getDay() === 6      : false
  const allFull  = slots.length > 0 && slots.every(s => occupied.has(s))

  function selectDay(d) { setSelectedDay(d); setSelectedSlot(null) }

  async function handleConfirm() {
    if (!selectedDay || !selectedSlot) return
    setLoading(true)
    try {
      await onConfirm({ fecha: toISO(selectedDay), hora: selectedSlot })
    } finally {
      setLoading(false)
    }
  }

  const canConfirm = selectedDay && selectedSlot && !loading

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end xl:items-center justify-center"
      style={{ background: 'rgba(33,37,41,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={e => { if (e.target === e.currentTarget) onCancel() }}
    >
      <div className="bg-white w-full xl:w-[580px] rounded-t-[24px] xl:rounded-[24px] p-6 xl:p-8 flex flex-col gap-6 max-h-[92dvh] overflow-y-auto">

        {/* ── Encabezado ── */}
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-xl text-[#212529]">
            Reagendar videoatención
          </h2>
          <button
            onClick={onCancel}
            aria-label="Cerrar"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f5f7fa] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4l8 8" stroke="#212529" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* ── Resumen cita actual ── */}
        <div className="bg-[#f5f7fa] rounded-2xl p-4 flex flex-col gap-1.5">
          <p className="text-[#6c757d] text-[11px] font-semibold uppercase tracking-wider">
            Videoatención actual
          </p>
          <p className="text-[#212529] font-semibold text-base leading-6">
            {getMotivo(appointment.motivo)}
          </p>
          <p className="text-[#495057] text-sm">
            {getSucursal(appointment.sucursal)} &middot; {appointment.fecha} &middot; {appointment.hora} hrs
          </p>
        </div>

        {/* ── Selector de día ── */}
        <div className="flex flex-col gap-3">
          <p className="text-[#212529] text-sm font-semibold">Elige un nuevo día</p>

          {days.length === 0 ? (
            /* Sin días disponibles en el rango (cita pasada, etc.) */
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="4" y="7" width="32" height="26" rx="5" stroke="#adb5bd" strokeWidth="2" fill="none"/>
                <path d="M4 15h32" stroke="#adb5bd" strokeWidth="2"/>
                <path d="M13 4v6M27 4v6" stroke="#adb5bd" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p className="text-[#6c757d] text-sm">
                No hay días disponibles para reagendar en el rango permitido.
              </p>
            </div>
          ) : (
            <div
              className="grid gap-2 w-full"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(44px, 1fr))' }}
            >
              {days.map(d => {
                const iso        = toISO(d)
                const isSelected = selectedDay ? toISO(selectedDay) === iso : false
                const dow        = d.getDay()
                const isAptDay   = iso === appointment.fecha

                return (
                  <button
                    key={iso}
                    onClick={() => selectDay(d)}
                    className={`
                      flex flex-col items-center gap-0.5 py-2.5 rounded-xl border
                      transition-all relative w-full
                      ${isSelected
                        ? 'border-[#0085ca] bg-[#e8f4fd]'
                        : 'border-[#dee2e6] bg-white hover:border-[#adb5bd]'}
                    `}
                  >
                    {/* Punto indicador: día original de la cita */}
                    {isAptDay && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#0085ca] opacity-60" />
                    )}
                    <span className={`text-[11px] font-semibold ${isSelected ? 'text-[#0085ca]' : 'text-[#6c757d]'}`}>
                      {DAYS_ES[dow]}
                    </span>
                    <span className={`text-sm font-bold ${isSelected ? 'text-[#0085ca]' : 'text-[#212529]'}`}>
                      {d.getDate()}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-[#0085ca]' : 'text-[#adb5bd]'}`}>
                      {MONTHS_ES[d.getMonth()]}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Slots de hora ── */}
        {selectedDay && (
          <div className="flex flex-col gap-3">

            {/* Encabezado con ícono mañana/tarde */}
            <div className="flex items-center gap-2">
              <img
                src={isSat ? A.iconSunMorning : A.iconMoonAfternoon}
                alt=""
                className="w-5 h-5"
              />
              <p className="text-[#212529] text-sm font-semibold">
                {isSat ? 'Horarios — mañana' : 'Horarios — tarde'}
              </p>
            </div>

            {/* Estado vacío: sin horarios en absoluto (no debería ocurrir con días hábiles) */}
            {slots.length === 0 && (
              <EmptySlots reason="no-slots" />
            )}

            {/* Estado vacío: todos los horarios ocupados */}
            {slots.length > 0 && allFull && (
              <EmptySlots reason="full" />
            )}

            {/* Grilla de slots */}
            {slots.length > 0 && !allFull && (
              <div className="flex flex-wrap gap-2">
                {slots.map(slot => {
                  const isOcc = occupied.has(slot)
                  const isSel = selectedSlot === slot
                  return (
                    <button
                      key={slot}
                      disabled={isOcc}
                      onClick={() => setSelectedSlot(slot)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-medium border transition-all
                        ${isOcc
                          ? 'border-[#dee2e6] bg-[#f8f9fa] text-[#adb5bd] cursor-not-allowed line-through'
                          : isSel
                            ? 'border-[#0085ca] bg-[#0085ca] text-white'
                            : 'border-[#dee2e6] bg-white text-[#212529] hover:border-[#0085ca] hover:text-[#0085ca]'}
                      `}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Instrucción cuando no hay día elegido */}
        {!selectedDay && days.length > 0 && (
          <p className="text-[#adb5bd] text-sm">
            Selecciona un día para ver los horarios disponibles.
          </p>
        )}

        {/* ── Acciones ── */}
        <div className="flex flex-col xl:flex-row gap-3 pt-1">
          <button
            onClick={onCancel}
            className="flex-1 py-[13px] rounded-full border border-[#dee2e6] text-[#495057] font-semibold text-sm hover:bg-[#f5f7fa] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!canConfirm}
            className="flex-1 py-[13px] rounded-full bg-[#0085ca] text-white font-semibold text-sm hover:bg-[#006fa8] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Guardando…' : 'Confirmar reagendamiento'}
          </button>
        </div>

      </div>
    </div>,
    document.body
  )
}

// ── Empty state para slots ───────────────────────────────────────────────────

function EmptySlots({ reason }) {
  const msg = reason === 'full'
    ? 'No quedan horas disponibles para este día.'
    : 'Este día no tiene bloques de atención.'

  return (
    <div className="flex items-center gap-3 py-5 px-4 bg-[#f8f9fa] rounded-2xl">
      {/* Ícono calendario tachado */}
      <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#dee2e6] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1.5" y="3" width="15" height="13" rx="3" stroke="#6c757d" strokeWidth="1.5" fill="none"/>
          <path d="M1.5 7h15" stroke="#6c757d" strokeWidth="1.5"/>
          <path d="M6 1.5v3M12 1.5v3" stroke="#6c757d" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 11l6-2M6 13l6-2" stroke="#6c757d" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>
      <div>
        <p className="text-[#495057] text-sm font-semibold">{msg}</p>
        <p className="text-[#6c757d] text-xs mt-0.5">Prueba con otro día del rango.</p>
      </div>
    </div>
  )
}
