import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { A } from '../assets.js'

const DAYS_ES      = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
const MONTHS_ES    = ['ene.','feb.','mar.','abr.','may.','jun.','jul.','ago.','sep.','oct.','nov.','dic.']
const MONTHS_LONG  = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
const DAYS_LONG_ES = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']

const MOTIVO_LABELS     = { orientacion:'Orientación', ges:'GES/CAEC', presupuestos:'Presupuestos y Programas Médicos', servicio:'Servicio al Cliente' }
const MOTIVO_TAG_LABELS = { ...MOTIVO_LABELS, presupuestos: 'Presupuestos y Pro...' }
const SUCURSAL_LABELS = { norte:'Zona Norte', centro:'Zona Centro', sur:'Zona Sur' }

// ── Helpers ──────────────────────────────────────────────

/** 7 días hábiles (Lun–Sáb) — mínimo 7 para elegir */
function getWorkDays(offset = 0) {
  const today = new Date()
  const days  = []
  const cur   = new Date(today)
  cur.setHours(0, 0, 0, 0)
  if (offset > 0) cur.setDate(cur.getDate() + offset * 7)
  while (days.length < 7) {
    if (cur.getDay() !== 0) days.push(new Date(cur)) // Lun–Sáb, sin domingo
    cur.setDate(cur.getDate() + 1)
  }
  return days
}

/** Returns true for days with no availability (example: Tue Jun 2 2026) */
function isFullyBookedDay(date) {
  return date.getFullYear() === 2026 && date.getMonth() === 5 && date.getDate() === 2
}

/** Bloques por día:
 *  Lun–Vie → tarde  14:30–17:30
 *  Sábado  → mañana 09:00–13:30
 */
function getSlots(date) {
  const dow = date.getDay()
  if (dow === 0) return [] // Sin bloques domingo

  if (dow === 6) {
    // Sábado: mañana 09:00–13:30
    const slots = []
    for (let h = 9; h <= 13; h++) {
      for (let m = 0; m < 60; m += 30) {
        if (h === 13 && m > 30) break
        slots.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`)
      }
    }
    return slots
  }

  // Lun–Vie: tarde 14:30–17:30
  const slots = []
  for (let h = 14; h <= 17; h++) {
    for (let m = 0; m < 60; m += 30) {
      if (h === 14 && m < 30) continue
      if (h === 17 && m > 30) break
      slots.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`)
    }
  }
  return slots
}

/** Sábado → mañana; Lun–Vie → tarde */
function splitSlots(date, slots) {
  if (date.getDay() === 6) return { morning: slots, afternoon: [] }
  return { morning: [], afternoon: slots }
}

/** Deterministic pseudo-random occupied set — consistent per date */
function getOccupiedSlots(date, slots) {
  const occupied = new Set()
  slots.forEach((slot, i) => {
    const hash = (date.getDate() * 13 + date.getMonth() * 7 + i * 3) % 5
    if (hash === 0) occupied.add(slot)
  })
  return occupied
}

function formatDate(date) {
  const dow = DAYS_LONG_ES[date.getDay()]
  return `${dow.charAt(0).toUpperCase() + dow.slice(1)} ${date.getDate()} ${MONTHS_ES[date.getMonth()]}`
}

/** Given a Date, return the weekOffset that puts it inside the 7-day strip */
function getWeekOffsetForDate(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diffDays = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(0, Math.floor(diffDays / 7))
}

// ── Mini Calendar (portal-based to escape overflow:hidden) ────────────────

function MiniCalendar({ anchorRef, selected, onSelect, onClose }) {
  const today = new Date()
  today.setHours(0,0,0,0)

  const [pos, setPos] = useState(null)
  const [viewDate, setViewDate] = useState(() => {
    const d = selected ? new Date(selected) : new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  useEffect(() => {
    if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 8, left: rect.left })
    }
  }, [anchorRef])

  if (!pos) return null

  const year        = viewDate.getFullYear()
  const month       = viewDate.getMonth()
  const firstDow    = (new Date(year, month, 1).getDay() + 6) % 7 // Mon=0
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDow; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  function isDisabled(d) {
    if (!d) return true
    if (d < today) return true
    if (d.getDay() === 0) return true // Sunday
    return false
  }

  function handleSelect(d) {
    if (isDisabled(d)) return
    onSelect(d)
  }

  const DAY_LABELS = ['L','M','X','J','V','S','D']

  return createPortal(
    <>
      {/* Invisible backdrop to close on outside click */}
      <div className="fixed inset-0" style={{ zIndex: 998 }} onClick={onClose} />

      {/* Calendar card */}
      <div
        style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 999 }}
        className="bg-white border border-[#dee2e6] rounded-2xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] p-4 w-[290px]"
        onClick={e => e.stopPropagation()}
      >
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-[#495057] font-bold text-base"
          >
            ‹
          </button>
          <span className="text-[#212529] font-semibold text-sm capitalize">
            {MONTHS_LONG[month]} {year}
          </span>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-[#495057] font-bold text-base"
          >
            ›
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-0 mb-1">
          {DAY_LABELS.map(d => (
            <div key={d} className="text-center text-[10px] font-semibold text-[#adb5bd] uppercase py-1">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-0">
          {cells.map((d, i) => {
            if (!d) return <div key={`e-${i}`} />
            const disabled = isDisabled(d)
            const isSel    = selected && d.toDateString() === selected.toDateString()
            const isToday  = d.toDateString() === today.toDateString()
            return (
              <button
                key={i}
                onClick={() => handleSelect(d)}
                disabled={disabled}
                className={`
                  w-9 h-9 rounded-full text-xs font-semibold transition-all flex items-center justify-center mx-auto
                  ${isSel     ? 'bg-[#0085ca] text-white' : ''}
                  ${!isSel && isToday  ? 'border border-[#0085ca] text-[#0085ca]' : ''}
                  ${!isSel && !disabled && !isToday ? 'text-[#212529] hover:bg-[rgba(0,133,202,0.1)]' : ''}
                  ${disabled   ? 'text-[#dee2e6] cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {d.getDate()}
              </button>
            )
          })}
        </div>

        {/* Close link */}
        <div className="flex justify-end mt-3 pt-3 border-t border-[#dee2e6]">
          <button onClick={onClose} className="text-xs text-[#495057] font-semibold hover:underline">Cerrar</button>
        </div>
      </div>
    </>,
    document.body
  )
}

// ── Slot button ───────────────────────────────────────────

function SlotButton({ slot, isSelected, isOccupied, onClick }) {
  if (isOccupied) {
    return (
      <div className="rounded-xl py-3 px-2 text-center text-xs font-semibold border border-[#dee2e6] bg-[#e9ecef] text-[#6c757d] line-through select-none">
        {slot} hrs
      </div>
    )
  }
  return (
    <button
      onClick={onClick}
      className={`
        rounded-xl py-3 font-semibold text-xs border transition-all
        ${isSelected
          ? 'bg-[#0085ca] border-[#0085ca] text-white shadow-[0_2px_8px_rgba(0,133,202,0.3)]'
          : 'bg-white border-[#dee2e6] text-[#212529] hover:border-[#0085ca] hover:shadow-sm'
        }
      `}
    >
      {slot} hrs
    </button>
  )
}

// ── Empty state ────────────────────────────────────────────

function EmptyStateSlots({ date }) {
  return (
    <div className="flex flex-col items-center gap-4 py-10 bg-[#f9fcfe] border border-dashed border-[#dee2e6] rounded-2xl">
      {/* Calendar icon with X */}
      <div className="w-14 h-14 rounded-full bg-[rgba(0,133,202,0.08)] flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0085ca" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
          <path d="M9.5 16l5-5M14.5 16l-5-5" stroke="#0085ca" strokeWidth="1.8" />
        </svg>
      </div>
      <div className="flex flex-col gap-1 text-center px-6">
        <p className="text-[#212529] font-semibold text-base leading-6">Sin horarios disponibles</p>
        <p className="text-[#495057] text-sm leading-5">
          El día <strong>{formatDate(date)}</strong> no tiene horas disponibles.<br />
          Elige otro día en el calendario.
        </p>
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────

export default function Step3Hora({ motivo, sucursal, fecha, hora, onSelect, onNext, onBack, onEditMotivo, onEditSucursal }) {
  const [weekOffset,   setWeekOffset]   = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)
  const calBtnRef = useRef(null)
  const days = getWorkDays(weekOffset)

  const selectedDay  = fecha
  const fullyBooked  = selectedDay && isFullyBookedDay(selectedDay)
  const allSlots     = selectedDay && !fullyBooked ? getSlots(selectedDay) : []
  const { morning, afternoon } = selectedDay && !fullyBooked ? splitSlots(selectedDay, allSlots) : { morning: [], afternoon: [] }
  const occupied     = selectedDay && !fullyBooked ? getOccupiedSlots(selectedDay, allSlots) : new Set()
  const canContinue  = fecha && hora

  function selectDay(d) {
    setWeekOffset(getWeekOffsetForDate(d))
    onSelect('fecha', d)
    onSelect('hora', null)
    setShowCalendar(false)
  }

  function handleWeekPrev() {
    setWeekOffset(o => Math.max(0, o - 1))
    onSelect('fecha', null)
    onSelect('hora', null)
  }
  function handleWeekNext() {
    setWeekOffset(o => o + 1)
    onSelect('fecha', null)
    onSelect('hora', null)
  }

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
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-raleway font-bold text-2xl text-[#212529]">Elige el día y la hora</h3>
        <p className="text-[#495057] text-base leading-6">
          Lunes a Viernes 14:30 - 17:30 hrs · Sábados 09:00 - 13:30 hrs.
        </p>
      </div>

      {/* Day selector */}
      <div className="flex flex-col gap-4 pb-2">
        <p className="text-[#50606e] text-xs font-semibold uppercase tracking-[0.6px]">Día</p>

        {/* Mobile: carrusel mostrando ~4 días · Desktop: grid 7 columnas */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 pb-1 xl:grid xl:grid-cols-7 xl:gap-2.5 xl:overflow-visible xl:snap-none xl:pb-0 -mx-4 px-4 xl:mx-0 xl:px-0">
          {days.map((d, i) => {
            const isSelected = fecha && d.toDateString() === fecha.toDateString()
            const isBooked   = isFullyBookedDay(d)
            return (
              <button
                key={i}
                onClick={() => selectDay(d)}
                className={`min-w-[72px] xl:min-w-0 flex-shrink-0 xl:flex-shrink snap-start
                  flex flex-col items-center gap-0.5 px-2 py-3 xl:py-4 rounded-2xl border transition-all text-center
                  ${isSelected
                    ? 'bg-[#0085ca] border-[#0085ca] text-white shadow-[0_2px_8px_rgba(0,133,202,0.3)]'
                    : isBooked
                      ? 'bg-[#f8f9fa] border-[#dee2e6] opacity-60 cursor-pointer'
                      : 'bg-white border-[#dee2e6] text-[#212529] hover:border-[#0085ca] hover:shadow-sm'
                  }
                `}
              >
                <span className={`text-[10px] xl:text-xs font-semibold uppercase ${isSelected ? 'text-white' : 'text-[#495057]'}`}>
                  {DAYS_ES[d.getDay()]}
                </span>
                <span className={`text-xl xl:text-2xl font-extrabold leading-6 ${isSelected ? 'text-white' : 'text-[#212529]'}`}>
                  {d.getDate()}
                </span>
                <span className={`text-[10px] xl:text-xs uppercase ${isSelected ? 'text-white/80' : 'text-[#495057]'}`}>
                  {MONTHS_ES[d.getMonth()]}
                </span>
              </button>
            )
          })}
        </div>

        {/* Week navigation + calendar picker — deshabilitados temporalmente */}
        {/* <div className="flex items-center gap-6">
          <button
            onClick={handleWeekPrev}
            disabled={weekOffset === 0}
            className="flex items-center gap-2 text-[#0085ca] text-sm font-semibold hover:underline disabled:opacity-40 disabled:no-underline"
          >
            ← Semana anterior
          </button>

          <div className="relative">
            <button
              ref={calBtnRef}
              onClick={() => setShowCalendar(v => !v)}
              className="flex items-center gap-2 text-[#0085ca] text-sm font-semibold hover:underline"
            >
              <img
                src={A.iconCalendarSmall}
                alt=""
                className="w-4 h-4"
                style={{ filter: 'brightness(0) saturate(100%) invert(35%) sepia(94%) saturate(578%) hue-rotate(167deg) brightness(102%) contrast(104%)' }}
              />
              Elegir otra fecha
            </button>
            {showCalendar && (
              <MiniCalendar
                anchorRef={calBtnRef}
                selected={fecha}
                onSelect={selectDay}
                onClose={() => setShowCalendar(false)}
              />
            )}
          </div>
        </div> */}
      </div>

      {/* Time slots / empty state / placeholder */}
      {!selectedDay ? (
        <div className="bg-[#f9fcfe] border border-dashed border-[#dee2e6] rounded-2xl py-10 flex items-center justify-center">
          <p className="text-[#50606e] text-sm text-center">
            Selecciona un día para ver los horarios disponibles.
          </p>
        </div>
      ) : fullyBooked ? (
        <EmptyStateSlots date={selectedDay} />
      ) : (
        <div className="flex flex-col gap-6">
          <p className="text-[#50606e] text-xs font-semibold uppercase tracking-[0.6px]">
            Hora — {formatDate(selectedDay)}
          </p>

          {/* Morning section */}
          {morning.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img src={A.iconSunMorning} alt="" className="w-4 h-4" />
                <span className="text-[#50606e] text-xs font-semibold uppercase tracking-[0.6px]">Horarios en la mañana</span>
              </div>
              <div className="grid grid-cols-3 xl:grid-cols-6 gap-2">
                {morning.map(slot => (
                  <SlotButton
                    key={slot}
                    slot={slot}
                    isSelected={hora === slot}
                    isOccupied={occupied.has(slot)}
                    onClick={() => !occupied.has(slot) && onSelect('hora', slot)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Afternoon section — only Mon-Thu */}
          {afternoon.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <img src={A.iconMoonAfternoon} alt="" className="w-4 h-4" />
                <span className="text-[#50606e] text-xs font-semibold uppercase tracking-[0.6px]">Horarios en la tarde</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {afternoon.map(slot => (
                  <SlotButton
                    key={slot}
                    slot={slot}
                    isSelected={hora === slot}
                    isOccupied={occupied.has(slot)}
                    onClick={() => !occupied.has(slot) && onSelect('hora', slot)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-5 pt-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 rounded bg-[#0085ca]" />
              <span className="text-[#495057] text-xs">Seleccionado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 rounded bg-white border border-[#dee2e6]" />
              <span className="text-[#495057] text-xs">Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 rounded bg-[#e9ecef] border border-[#dee2e6]" />
              <span className="text-[#495057] text-xs">Ocupado</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer nav */}
      <div className="border-t border-[#dee2e6] flex flex-col-reverse xl:flex-row items-stretch xl:items-center justify-between pt-6 gap-3 xl:gap-0">
        <button onClick={onBack} className="btn-secondary w-full xl:w-auto justify-center">Volver</button>
        <button
          onClick={() => canContinue && onNext()}
          className={`btn-continue w-full xl:w-auto justify-center ${canContinue ? 'active' : 'inactive'}`}
        >
          Continuar
          <img src={A.iconChevronRight} alt="" className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
