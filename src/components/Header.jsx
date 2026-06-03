import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { A } from '../assets.js'
import '../styles/ayuda-menu.css'

// ── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  'Planes y Beneficios','GES/CAEC','Servicios en Línea',
  'Medicina Preventiva','Cotiza y contrata ahora','Mereces Más',
]

// ── Ayuda sub-items ──────────────────────────────────────────────────────────
const AYUDA_ITEMS = [
  {
    id: 'centro',
    label: 'Centro de ayuda',
    desc: 'Preguntas frecuentes y guías rápidas',
    bg: '#e8f4fd',
    color: '#0062a3',
    Icon: CentroIcon,
    dotColor: '#0085ca',
  },
  {
    id: 'contacto',
    label: 'Contacto',
    desc: 'Escríbenos o llámanos directamente',
    bg: '#e9f7ec',
    color: '#1a7a28',
    Icon: ContactoIcon,
    dotColor: '#25a337',
  },
  {
    id: 'video',
    label: 'Videoatención',
    desc: 'Agenda tu consulta por videollamada',
    bg: '#f0eaf8',
    color: '#5a2a6b',
    Icon: VideoIcon,
    dotColor: '#713474',
  },
]

// ── Component ────────────────────────────────────────────────────────────────
export default function Header() {
  const [menuOpen,  setMenuOpen]  = useState(false)  // mobile hamburger
  const [ayudaOpen, setAyudaOpen] = useState(false)  // desktop dropdown
  const [mobileAyudaOpen, setMobileAyudaOpen] = useState(false) // mobile sub
  const triggerRef = useRef(null)

  // Close desktop dropdown on click-outside
  useEffect(() => {
    if (!ayudaOpen) return
    function onDown(e) {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        setAyudaOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [ayudaOpen])

  // Close on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setAyudaOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Close mobile sub-menu when mobile menu closes
  useEffect(() => { if (!menuOpen) setMobileAyudaOpen(false) }, [menuOpen])

  return (
    <header className="w-full flex-shrink-0 sticky top-0 z-40 shadow-sm">

      {/* ── MOBILE bar ── */}
      <div className="xl:hidden bg-white flex items-center justify-between px-4 h-16 border-b border-[#dee2e6]">
        <img src={A.logo} alt="Nueva Masvida" className="w-[140px] h-[40px] object-contain" />
        <div className="flex items-center gap-3">
          <button className="bg-[#ef9033] text-white text-xs font-semibold rounded-full px-3 py-1.5 hover:bg-[#d87f25] transition-colors whitespace-nowrap">
            Sucursal Virtual
          </button>
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block h-0.5 w-5 bg-[#212529] transition-all origin-center duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-5 bg-[#212529] transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-[#212529] transition-all origin-center duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile slide-down nav */}
      <div className={`xl:hidden bg-[#0085ca] overflow-hidden transition-all duration-200 ease-out ${menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>

        {/* Regular nav items */}
        {NAV_ITEMS.map((item, i) => (
          <button key={i} className="flex items-center justify-between w-full text-white text-sm font-medium px-4 py-3.5 border-b border-white/10 hover:bg-white/10 transition-colors text-left">
            <span>{item}</span>
            <span className="text-white/60 text-lg leading-none">›</span>
          </button>
        ))}

        {/* Ayuda — con sub-items expandibles */}
        <button
          onClick={() => setMobileAyudaOpen(v => !v)}
          className="flex items-center justify-between w-full text-white text-sm font-medium px-4 py-3.5 border-b border-white/10 hover:bg-white/10 transition-colors text-left"
        >
          <span>Ayuda</span>
          <span className={`text-white/60 text-base leading-none transition-transform duration-200 ${mobileAyudaOpen ? 'rotate-90' : ''}`}>›</span>
        </button>

        {/* Mobile sub-items */}
        <div className={`ayuda-sub ${mobileAyudaOpen ? 'ayuda-sub--open' : 'ayuda-sub--closed'}`}>
          {AYUDA_ITEMS.map(({ id, label, dotColor }) => (
            <button key={id} className="ayuda-sub-item">
              <span className="ayuda-sub-item__dot" style={{ background: dotColor }} />
              {label}
            </button>
          ))}
        </div>

      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden xl:block">

        {/* Top bar */}
        <div className="bg-white flex items-center justify-center py-4 h-[80px]">
          <div className="w-[1200px] flex items-center justify-between px-0">
            <div className="w-[173px] h-[49px] flex-shrink-0">
              <img src={A.logo} alt="Nueva Masvida" className="h-full w-full object-contain" />
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-[#f5f7fa] border border-[#ced4da] rounded-full w-[214px] flex items-center gap-2 px-4 py-2">
                <img src={A.iconSearch} alt="" className="w-[18px] h-[18px] flex-shrink-0" />
                <span className="text-[#6c757d] text-sm">Buscar</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-[#0085ca] text-sm font-medium h-10 px-2 hover:underline">EMPLEADORES</button>
                <button className="text-[#0085ca] text-sm font-medium h-10 px-2 hover:underline">PRESTADORES</button>
                <button className="btn-sv bg-[#ef9033] text-white text-sm font-medium h-10 rounded-full px-5">Sucursal Virtual</button>
              </div>
            </div>
          </div>
        </div>

        {/* Blue nav bar */}
        <nav className="bg-[#0085ca] flex items-center justify-center h-[52px]">
          <div className="w-[1200px] flex items-center justify-between">

            {/* Regular items */}
            {NAV_ITEMS.map((item, i) => (
              <button key={i} className="nav-link flex items-center gap-1 text-white text-base font-medium">
                {item}
                {item !== 'Mereces Más' && <img src={A.iconNavChevron} alt="" className="w-4 h-4" />}
              </button>
            ))}

            {/* Ayuda — con dropdown */}
            <div className="ayuda-trigger" ref={triggerRef}>
              <button
                onClick={() => setAyudaOpen(v => !v)}
                aria-expanded={ayudaOpen}
                aria-haspopup="true"
                className={`nav-link flex items-center gap-1 text-white text-base font-medium ${ayudaOpen ? 'opacity-80' : ''}`}
              >
                Ayuda
                <ChevronIcon open={ayudaOpen} />
              </button>

              {/* Desktop dropdown panel */}
              {ayudaOpen && (
                <div className="ayuda-panel" role="menu">
                  {/* Panel header */}
                  <div className="ayuda-head">
                    <p className="ayuda-head__title">¿En qué podemos ayudarte?</p>
                    <p className="ayuda-head__sub">Selecciona una opción para continuar</p>
                  </div>

                  {/* Items */}
                  {AYUDA_ITEMS.map(({ id, label, desc, bg, color, Icon }) => (
                    <button key={id} className="ayuda-item" role="menuitem">
                      <div className="ayuda-item__icon" style={{ background: bg, color }}>
                        <Icon />
                      </div>
                      <div className="ayuda-item__text">
                        <span className="ayuda-item__label">{label}</span>
                        <span className="ayuda-item__desc">{desc}</span>
                      </div>
                      <div className="ayuda-item__arrow">
                        <ArrowIcon />
                      </div>
                    </button>
                  ))}

                  {/* Footer */}
                  <div className="ayuda-foot">
                    <PhoneSmIcon />
                    <span className="ayuda-foot__label">Línea de atención</span>
                    <span className="ayuda-foot__phone">600 6000 262</span>
                  </div>
                </div>
              )}
            </div>

          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="bg-white border-b border-[#dee2e6] flex items-start justify-center h-[45px]">
          <div className="w-[1200px] flex items-center gap-2 pt-3">
            <img src={A.iconHome} alt="Inicio" className="w-5 h-5 flex-shrink-0" />
            <img src={A.iconBreadChevron} alt=">" className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-[#495057] text-base">Videoatención</span>
          </div>
        </div>

      </div>

      {/* Backdrop del dropdown — fuera del header para no heredar stacking context */}
      {ayudaOpen && createPortal(
        <div className="ayuda-backdrop" onClick={() => setAyudaOpen(false)} aria-hidden="true" />,
        document.body
      )}

    </header>
  )
}

// ── Inline SVG icons ─────────────────────────────────────────────────────────

function CentroIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7.8 7.9a2.25 2.25 0 0 1 4.4.65c0 1.55-2.2 1.95-2.2 3.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="10" cy="14.2" r="0.85" fill="currentColor"/>
    </svg>
  )
}

function ContactoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M17 12.5A1.5 1.5 0 0 1 15.5 14H5.5L2 17.5V4.5A1.5 1.5 0 0 1 3.5 3h12A1.5 1.5 0 0 1 17 4.5v8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M5.5 7.5h9M5.5 10.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function VideoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1.5" y="5.5" width="11" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12.5 9.2 18 6v8l-5.5-3.2V9.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14" fill="none"
      aria-hidden="true"
      style={{
        transition: 'transform 0.22s cubic-bezier(0.16,1,0.3,1)',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      }}
    >
      <path d="M3 5l4 4 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PhoneSmIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: '#6c757d', flexShrink: 0 }}>
      <path d="M2 2.5A.5.5 0 0 1 2.5 2h2a.5.5 0 0 1 .5.4l.5 2.5a.5.5 0 0 1-.14.47L4.2 6.5A8 8 0 0 0 7.5 9.8l1.13-1.16a.5.5 0 0 1 .47-.14l2.5.5a.5.5 0 0 1 .4.5v2a.5.5 0 0 1-.5.5C5.15 12 2 8.85 2 5V2.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}
