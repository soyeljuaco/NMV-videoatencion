/**
 * CentroDeAyuda — Centro de Ayuda page (/centro-de-ayuda)
 * Actualizado al diseño DS NMV2026 (Figma node 924:2)
 *
 * Props:
 *   onAgendar   fn — navigate to the videoatención wizard
 *   onGoHome    fn — navigate to landing / home
 */
import { useState, useEffect, useRef, useMemo } from 'react'
import { A } from '../../assets.js'
import { useReveal } from '../../hooks/useReveal.js'
import FAQAccordion from '../../components/patterns/FAQAccordion/FAQAccordion.jsx'
import './CentroDeAyuda.css'

// ── Data ─────────────────────────────────────────────────────────────────────

// DS NMV2026 — Quick-search tags con ícono (Figma 927:12)
// 4 tags con iconstack.io icon + label, text/secondary, border/default
const SEARCH_TAGS = [
  { id: 'reembolsos',    label: 'Reembolsos',       icon: A.helpBillCheck },
  { id: 'licencias',    label: 'Licencias médicas', icon: A.helpLicense   },
  { id: 'ges',          label: 'GES / CAEC',        icon: A.helpSecurity  },
  { id: 'videoatencion',label: 'Videoatención',     icon: A.iconCompVideo },
]

const SEARCH_PLACEHOLDERS = [
  'Busca licencias médicas, bonos o reembolsos...',
  '¿Cómo solicitar un reembolso?',
  '¿Qué cubre mi plan de salud?',
  '¿Cómo acceder a la Videoatención?',
  '¿Qué es el GES y CAEC?',
]

// gradient: overlay inferior de la imagen de portada (por categoría, Figma 934:55)
// badge bg: unificado → surface/icon-blue = rgba(0,133,202,0.12) (Figma var primaryiconbg)
const CATEGORIES = [
  {
    id: 'plan-salud',
    title: 'Mi plan de salud',
    desc: 'Contrato de Salud, Cargas legales, Cargas médicas, Copia de contrato.',
    img: A.catPlanSalud,
    icon: A.helpHealth,
    gradient: 'rgba(46,204,113,0.25)',
  },
  {
    id: 'bonos',
    title: 'Bonos y reembolsos',
    desc: 'Bonos de atención, Copago, Reembolsos, Documentación.',
    img: A.catBonos,
    icon: A.helpBillCheck,
    gradient: 'rgba(58,170,53,0.25)',
  },
  {
    id: 'ges',
    title: 'GES / CAEC',
    desc: 'Acceso, Tiempos de espera, Protección financiera.',
    img: A.catGes,
    icon: A.helpSecurity,
    gradient: 'rgba(232,76,61,0.25)',
  },
  {
    id: 'licencias',
    title: 'Licencias médicas',
    desc: 'Requisitos de licencias médicas, Documentación.',
    img: A.catLicencias,
    icon: A.helpLicense,
    gradient: 'rgba(232,76,61,0.25)',
  },
  {
    id: 'urgencias',
    title: 'Urgencias',
    desc: 'Información sobre atención de urgencia y emergencia vital.',
    img: A.catUrgencias,
    icon: A.helpDoctor,
    gradient: 'rgba(192,57,43,0.25)',
  },
  {
    id: 'presupuestos',
    title: 'Presupuestos',
    desc: 'Presupuesto hospitalario, Programa médico, Prefactura.',
    img: A.catPresupuestos,
    icon: A.helpDoc,
    gradient: 'rgba(0,131,200,0.25)',
  },
  {
    id: 'independientes',
    title: 'Independientes y Empleadores',
    desc: 'Cambio de empleador, beneficios para independientes.',
    img: A.catIndependientes,
    icon: A.helpBriefcase,
    gradient: 'rgba(245,148,29,0.25)',
  },
  {
    id: 'beneficios',
    title: 'Beneficios y alianzas',
    desc: 'Descuentos preferenciales, Beneficios adicionales, Servicios gratuitos.',
    img: A.catBeneficios,
    icon: A.helpGift,
    gradient: 'rgba(155,89,182,0.25)',
  },
]

// DS NMV2026 — Preguntas actualizadas (Figma 937:183)
const FAQ_ITEMS = [
  {
    id: 'reembolso',
    q: '¿Cómo solicito un reembolso médico?',
    intro: 'Para pedir tu reembolso, necesitas subir tus boletas y documentos en Mi Sucursal Virtual.',
    timeEstimate: 'Este trámite demora aproximadamente 5 días hábiles',
    requirements: [
      'Boleta o factura original del prestador',
      'Bono de atención médica',
      'Receta médica (para medicamentos)',
      'Cuenta bancaria registrada',
    ],
    steps: [
      'Ingresa a Mi Sucursal Virtual',
      'Ve a "Reembolsos" y selecciona "Nueva solicitud"',
      'Sube las boletas originales (en PDF o foto legible)',
      'Adjunta el bono de atención y receta (si corresponde)',
      'Confirma tus datos bancarios para el depósito',
      'Recibirás un correo de confirmación con el número de solicitud',
    ],
  },
  {
    id: 'plazo-reembolso',
    q: '¿Cuál es el plazo para solicitar un reembolso?',
    intro: 'Tienes hasta 2 años desde la fecha de atención para solicitar un reembolso. Te recomendamos hacerlo lo antes posible para agilizar el proceso.',
    requirements: [
      'Fecha de atención no mayor a 2 años',
      'Documentos originales del prestador',
    ],
    steps: [
      'Verifica que la atención sea menor a 2 años',
      'Reúne tus boletas y documentos',
      'Ingresa a Mi Sucursal Virtual',
      'Completa el formulario de reembolso',
    ],
  },
  {
    id: 'licencia',
    q: '¿Cómo se presenta una licencia médica?',
    intro: 'La licencia médica debe presentarse dentro de 3 días hábiles desde el inicio del reposo. Puedes hacerlo en línea o en cualquier sucursal.',
    requirements: [
      'Licencia médica original emitida por el médico tratante',
      'Cédula de identidad vigente',
    ],
    steps: [
      'Recibe la licencia de tu médico',
      'Ingresa a Mi Sucursal Virtual o ve a una sucursal',
      'Sube o entrega la licencia dentro de 3 días hábiles',
      'Recibirás un correo con el estado de tu licencia',
    ],
  },
  {
    id: 'carga-familiar',
    q: '¿Cómo agrego una carga familiar a mi plan?',
    intro: 'Puedes incorporar cargas legales (cónyuge e hijos) y cargas médicas a tu plan de salud. El proceso se realiza en línea o en sucursal.',
    requirements: [
      'Cédula de identidad del titular y la carga',
      'Certificado de nacimiento (para hijos)',
      'Certificado de matrimonio (para cónyuge)',
    ],
    steps: [
      'Ingresa a Mi Sucursal Virtual',
      'Ve a "Mi plan" → "Cargas"',
      'Selecciona el tipo de carga y completa los datos',
      'Sube los documentos requeridos',
      'Recibirás confirmación por correo',
    ],
  },
]

// DS NMV2026 — Canales de contacto (Figma 937:225)
const CONTACTS = [
  {
    id: 'whatsapp',
    icon: A.contactWhatsapp,
    title: 'WhatsApp',
    desc: 'Respuestas en minutos, cuando lo necesites.',
    cta: 'Iniciar chat',
    href: 'https://wa.me/56600600262',
  },
  {
    id: 'phone',
    icon: A.contactPhone,
    title: '600 600 262',
    desc: 'Lunes a viernes de 08:00 a 20:00 hrs',
    cta: 'Llamar ahora',
    href: 'tel:600600262',
  },
  {
    id: 'video',
    icon: A.contactVideo,
    title: 'Videoatención',
    desc: 'Atención personalizada con un ejecutivo.',
    cta: 'Agendar ahora',
    action: 'agendar',
  },
  {
    id: 'branch',
    icon: A.contactBranch,
    title: 'Sucursales',
    desc: 'Encuéntranos en todo el país',
    cta: 'Ver sucursales',
    href: '#',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function CentroDeAyuda({ onAgendar }) {

  const hero    = useReveal()
  const cats    = useReveal({ threshold: 0.06 })
  const faq     = useReveal({ threshold: 0.08 })
  const contact = useReveal({ threshold: 0.06 })

  function handleContactAction(c) {
    if (c.action === 'agendar') {
      onAgendar?.()
    } else if (c.href && c.href !== '#') {
      window.open(c.href, '_blank', 'noopener')
    }
  }

  return (
    <div className="cda">

      {/* ══ HERO ══════════════════════════════════════════════════════════════
          DS NMV2026 — surface/subtle bg, Figma: 927:2
          Eyebrow: brand/secondary #713474, Inter SemiBold 12px, tracking-wide uppercase
          Título: text/primary #212529, Raleway Bold 48px */}
      <section className="cda-hero">
        <div
          ref={hero.ref}
          className={`cda-hero__inner reveal-block ${hero.visible ? 'revealed' : ''}`}
        >
          {/* Eyebrow + título agrupados con gap 8px — Figma 927:4 */}
          <div className="cda-hero__header">
            {/* DS: brand/secondary (#713474), overline 12px semibold uppercase — Figma 978:1134 */}
            <p className="cda-hero__eyebrow">CENTRO DE AYUDA</p>
            <h1 className="cda-hero__title">¿Cómo podemos ayudarte?</h1>
          </div>

          <HelpSearchBar />
        </div>
      </section>

      {/* ══ CATEGORIES ════════════════════════════════════════════════════════
          DS NMV2026 — surface/default bg, badge bg: surface/icon-blue
          Figma: 934:50 */}
      <section className="cda-cats">
        <div className="cda-cats__inner">
          <div
            ref={cats.ref}
            className={`reveal-block ${cats.visible ? 'revealed' : ''}`}
          >
            <div className="cda-cats__head">
              <h2 className="cda-cats__title">
                Tu salud bajo control y{' '}
                <strong className="cda-cats__title-strong">en un solo lugar</strong>
              </h2>
              <p className="cda-cats__sub">Explora por categoría y encuentra toda la información que necesitas</p>
            </div>

            <div className="cda-cats__grid">
              {CATEGORIES.map((cat, i) => (
                <CatCard key={cat.id} cat={cat} delay={i * 55} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════
          DS NMV2026 — surface/subtle bg, accordion: individual border-border-default cards
          Figma: 937:179 */}
      <section className="cda-faq">
        <div className="cda-faq__inner">
          <div
            ref={faq.ref}
            className={`reveal-block ${faq.visible ? 'revealed' : ''}`}
          >
            <div className="cda-faq__head">
              <h2 className="cda-faq__title">Preguntas frecuentes</h2>
            </div>

            <div className="cda-faq__accordion">
              <FAQAccordion items={FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════════════════
          DS NMV2026 — brand/primary bg, cards: surface/default, 2×2 grid
          Figma: 937:225 */}
      <section className="cda-contact">
        <div className="cda-contact__inner">

          <div
            ref={contact.ref}
            className={`cda-contact__left reveal-block ${contact.visible ? 'revealed' : ''}`}
          >
            {/* DS — body/md 20px regular, text/on-brand */}
            <p className="cda-contact__eyebrow">¿Aún tienes dudas?</p>
            {/* DS — display/section 48px, Raleway: regular + bold */}
            <h2 className="cda-contact__title">
              Elige el canal que<br />
              <strong>más te acomode</strong>
            </h2>
          </div>

          <div className="cda-contact__cards">
            {CONTACTS.map((c, i) => (
              <ContactCard
                key={c.id}
                contact={c}
                delay={i * 75}
                revealed={contact.visible}
                onAction={() => handleContactAction(c)}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}

// ── Internal sub-components ───────────────────────────────────────────────────

function HelpSearchBar() {
  const [query,  setQuery]  = useState('')
  const [active, setActive] = useState(null)
  const [phIdx,  setPhIdx]  = useState(0)
  const [phOut,  setPhOut]  = useState(false)
  const [focused, setFocused] = useState(false)
  const wrapRef  = useRef(null)
  const inputRef = useRef(null)

  // Close results on click-outside
  useEffect(() => {
    function onDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  // Close on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') { setFocused(false); inputRef.current?.blur() } }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Cycle placeholder every 3.5 s — stops when input has content
  useEffect(() => {
    if (query) return
    const id = setInterval(() => {
      setPhOut(true)
      setTimeout(() => {
        setPhIdx(i => (i + 1) % SEARCH_PLACEHOLDERS.length)
        setPhOut(false)
      }, 320)
    }, 3500)
    return () => clearInterval(id)
  }, [query])

  // Compute filtered results
  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return null
    return {
      cats: CATEGORIES.filter(c =>
        c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
      ),
      faqs: FAQ_ITEMS.filter(f => {
        const haystack = [
          f.q,
          f.intro ?? '',
          ...(f.requirements ?? []),
          ...(f.steps ?? []),
        ].join(' ').toLowerCase()
        return haystack.includes(q)
      }),
    }
  }, [query])

  const showPanel = focused && query.trim().length > 0

  function pickTag(tag) {
    setQuery(tag.label)
    setActive(tag.id)
    setFocused(true)
    inputRef.current?.focus()
  }

  function clear() {
    setQuery('')
    setActive(null)
    setPhIdx(0)
    setPhOut(false)
    setFocused(false)
    inputRef.current?.focus()
  }

  return (
    <div className="cda-search" ref={wrapRef}>

      {/* Bar + floating results panel */}
      <div className="cda-search__bar-wrap">
        <div className={`cda-search__bar ${showPanel ? 'cda-search__bar--open' : ''}`}>
          <img src={A.iconSearch} alt="" className="cda-search__icon" />

          <div className="cda-search__field">
            <input
              ref={inputRef}
              type="text"
              className="cda-search__input"
              value={query}
              onChange={e => { setQuery(e.target.value); setActive(null) }}
              onFocus={() => setFocused(true)}
              onKeyDown={e => { if (e.key === 'Enter') e.preventDefault() }}
              aria-label="Buscar en el centro de ayuda"
              aria-expanded={showPanel}
              aria-haspopup="listbox"
              autoComplete="off"
            />
            {!query && (
              <span
                className={`cda-search__ph ${phOut ? 'cda-search__ph--out' : 'cda-search__ph--in'}`}
                aria-hidden="true"
              >
                {SEARCH_PLACEHOLDERS[phIdx]}
              </span>
            )}
          </div>

          {query && (
            <button type="button" className="cda-search__clear" onClick={clear} aria-label="Limpiar búsqueda">
              <ClearIcon />
            </button>
          )}
        </div>

        {/* Results panel */}
        {showPanel && <SearchResults results={results} query={query} onClose={() => setFocused(false)} />}
      </div>

      {/* Quick-access chips — DS: ícono 24×24 + label, border/default, radius/pill — Figma 927:12 */}
      <div className="cda-search__tags">
        {SEARCH_TAGS.map(tag => (
          <button
            key={tag.id}
            type="button"
            className={`cda-search__tag ${active === tag.id ? 'cda-search__tag--active' : ''}`}
            onClick={() => pickTag(tag)}
          >
            <img src={tag.icon} alt="" className="cda-search__tag-icon" />
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Search results panel ──────────────────────────────────────────────────────

function SearchResults({ results, query, onClose }) {
  const hasResults = results && (results.cats.length > 0 || results.faqs.length > 0)

  function hi(text) {
    const q = query.trim()
    if (!q) return text
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(re)
    return parts.map((part, i) =>
      re.test(part) ? <mark key={i} className="cda-results__mark">{part}</mark> : part
    )
  }

  if (!hasResults) {
    return (
      <div className="cda-results" role="status">
        <div className="cda-results__empty">
          <NoResultsIcon />
          <p className="cda-results__empty-title">Sin resultados para <strong>"{query}"</strong></p>
          <p className="cda-results__empty-sub">Intenta con otra palabra o explora las categorías</p>
        </div>
      </div>
    )
  }

  let delay = 0

  return (
    <div className="cda-results" role="listbox">

      {results.cats.length > 0 && (
        <div className="cda-results__group">
          <p className="cda-results__group-label">Categorías</p>
          {results.cats.slice(0, 4).map(cat => {
            const d = delay; delay += 45
            return (
              <button
                key={cat.id}
                type="button"
                className="cda-results__item"
                style={{ animationDelay: `${d}ms` }}
                role="option"
                onClick={onClose}
              >
                {/* DS — surface/icon-blue badge */}
                <div className="cda-results__item-badge" style={{ background: 'rgba(0,133,202,0.12)' }}>
                  <img src={cat.icon} alt="" />
                </div>
                <div className="cda-results__item-text">
                  <span className="cda-results__item-title">{hi(cat.title)}</span>
                  <span className="cda-results__item-desc">{hi(cat.desc)}</span>
                </div>
                <span className="cda-results__item-arrow"><ArrowRightIcon /></span>
              </button>
            )
          })}
        </div>
      )}

      {results.faqs.length > 0 && (
        <div className="cda-results__group">
          <p className="cda-results__group-label">Preguntas frecuentes</p>
          {results.faqs.slice(0, 3).map(faq => {
            const d = delay; delay += 45
            const preview = faq.intro ?? (faq.steps?.[0] ?? '')
            return (
              <button
                key={faq.id}
                type="button"
                className="cda-results__item"
                style={{ animationDelay: `${d}ms` }}
                role="option"
                onClick={onClose}
              >
                <div className="cda-results__item-badge cda-results__item-badge--faq">
                  <FAQResultIcon />
                </div>
                <div className="cda-results__item-text">
                  <span className="cda-results__item-title">{hi(faq.q)}</span>
                  <span className="cda-results__item-desc">
                    {hi(preview.length > 90 ? preview.slice(0, 90) + '…' : preview)}
                  </span>
                </div>
                <span className="cda-results__item-arrow"><ArrowRightIcon /></span>
              </button>
            )
          })}
        </div>
      )}

    </div>
  )
}

// ── CatCard ───────────────────────────────────────────────────────────────────
// DS NMV2026 — sin imagen, layout plano: icon badge + title + desc
// Hover: "Floating Card" — scale(1.05) translateY(-6px) sobre vecinas, sombra azul
// Figma 934:55 (versión actualizada sin imagen de portada)

function CatCard({ cat, delay }) {
  return (
    <button
      className="cda-cat"
      style={{ '--delay': `${delay}ms` }}
      aria-label={cat.title}
    >
      {/* Icon badge + title en misma fila — DS: surface/icon-blue, gap sp-3 */}
      <div className="cda-cat__head-row">
        <div className="cda-cat__badge" aria-hidden="true">
          <img src={cat.icon} alt="" className="cda-cat__badge-icon" />
        </div>
        <span className="cda-cat__title">{cat.title}</span>
      </div>

      {/* Descripción — DS: label/lg regular, text/secondary */}
      <p className="cda-cat__desc">{cat.desc}</p>
    </button>
  )
}

// ── ContactCard ───────────────────────────────────────────────────────────────
// DS NMV2026:
//   layout → vertical flex-col, gap sp-3 (12px)
//   icon badge → surface/icon-blue 40×40 rounded-lg (14px)
//   title → label/lg semibold, text/primary
//   desc  → label/lg regular, text/secondary
//   cta   → label/lg semibold, text/brand → inline text link con →

function ContactCard({ contact, delay, revealed, onAction }) {
  return (
    <button
      className={`cda-ccard reveal-block ${revealed ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onAction}
    >
      {/* DS — surface/icon-blue badge */}
      <div className="cda-ccard__icon-wrap">
        <img src={contact.icon} alt="" className="cda-ccard__icon" />
      </div>
      <span className="cda-ccard__title">{contact.title}</span>
      <span className="cda-ccard__desc">{contact.desc}</span>
      {/* DS — text/brand semibold, inline arrow */}
      <span className="cda-ccard__cta">
        {contact.cta} →
      </span>
    </button>
  )
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ClearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function FAQResultIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 7a2.1 2.1 0 0 1 4.1.6c0 1.4-2.1 1.8-2.1 3.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="9" cy="13.2" r="0.8" fill="currentColor"/>
    </svg>
  )
}

function NoResultsIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="18" cy="18" r="12" stroke="#ced4da" strokeWidth="2"/>
      <path d="M27 27l7 7" stroke="#ced4da" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M14 18h8M18 14v8" stroke="#ced4da" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 14l8 8M22 14l-8 8" stroke="#dee2e6" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
