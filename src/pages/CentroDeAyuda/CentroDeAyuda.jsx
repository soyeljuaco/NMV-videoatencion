/**
 * CentroDeAyuda — Centro de Ayuda page (/centro-de-ayuda)
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

const SEARCH_TAGS = ['Solicitar bono', 'Licencia médica', 'Videoatención', 'Mi plan']

// Cycling placeholder texts for animated search bar
const SEARCH_PLACEHOLDERS = [
  'Busca por tema, trámite o palabra clave…',
  '¿Cómo solicitar un bono de atención?',
  '¿Qué cubre mi plan de salud?',
  '¿Cómo acceder a la Videoatención?',
  '¿Qué es el GES y CAEC?',
]

// Exact gradients and badge colors from Figma node 764:4211
const CATEGORIES = [
  {
    id: 'plan-salud',
    title: 'Mi plan de salud',
    desc: 'Contrato de Salud, Cargas legales, Cargas médicas, Copia de contrato.',
    img: A.catPlanSalud,
    icon: A.helpHealth,
    badgeBg: 'rgba(37,163,55,0.1)',
  },
  {
    id: 'bonos',
    title: 'Bonos y reembolsos',
    desc: 'Bonos de atención, Copago, Reembolsos, Documentación.',
    img: A.catBonos,
    icon: A.helpBillCheck,
    badgeBg: 'rgba(0,133,202,0.1)',
  },
  {
    id: 'ges',
    title: 'GES / CAEC',
    desc: 'Acceso garantizado, Tiempos máximos de espera, Protección financiera.',
    img: A.catGes,
    icon: A.helpSecurity,
    badgeBg: 'rgba(239,144,51,0.1)',
  },
  {
    id: 'licencias',
    title: 'Licencias médicas',
    desc: 'Requisitos de licencias médicas, Documentación.',
    img: A.catLicencias,
    icon: A.helpLicense,
    badgeBg: 'rgba(110,78,209,0.1)',
  },
  {
    id: 'urgencias',
    title: 'Urgencias',
    desc: 'Información sobre atención de urgencia y emergencia vital.',
    img: A.catUrgencias,
    icon: A.helpDoctor,
    badgeBg: 'rgba(226,56,39,0.1)',
  },
  {
    id: 'presupuestos',
    title: 'Presupuestos',
    desc: 'Presupuesto hospitalario, Programa médico, Prefactura.',
    img: A.catPresupuestos,
    icon: A.helpDoc,
    badgeBg: 'rgba(124,132,154,0.1)',
  },
  {
    id: 'independientes',
    title: 'Independientes y Empleadores',
    desc: 'Cambio de empleador, beneficios para independientes.',
    img: A.catIndependientes,
    icon: A.helpBriefcase,
    badgeBg: 'rgba(113,52,116,0.1)',
  },
  {
    id: 'beneficios',
    title: 'Beneficios y alianzas',
    desc: 'Descuentos preferenciales, Beneficios adicionales, Servicios gratuitos.',
    img: A.catBeneficios,
    icon: A.helpGift,
    badgeBg: 'rgba(200,183,0,0.1)',
  },
]

// Rich accordion data — structure: intro, timeEstimate?, requirements?, steps[]
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
    id: 'plan',
    q: '¿Qué cubre mi plan de salud?',
    intro: 'Tu plan cubre consultas médicas, exámenes, hospitalizaciones y procedimientos quirúrgicos según los porcentajes de tu contrato.',
    timeEstimate: null,
    requirements: [
      'Cédula de identidad vigente',
      'Número de contrato de salud',
    ],
    steps: [
      'Ingresa a Mi Sucursal Virtual con tu RUT y clave',
      'Selecciona "Mi plan de salud"',
      'Revisa las coberturas, copagos y topes de tu contrato',
      'Descarga tu contrato vigente si lo necesitas',
    ],
  },
  {
    id: 'video',
    q: '¿Cómo puedo acceder a la Videoatención?',
    intro: 'La Videoatención te permite consultar a un médico o especialista desde cualquier lugar con conexión a internet.',
    timeEstimate: 'La consulta tiene una duración aproximada de 20 minutos',
    requirements: [
      'Dispositivo con cámara y micrófono',
      'Conexión a internet estable',
      'Sesión activa en la Sucursal Virtual',
    ],
    steps: [
      'Ingresa a Mi Sucursal Virtual',
      'Selecciona la sección "Videoatención"',
      'Elige el motivo de consulta, la sucursal y el horario',
      'Recibirás un correo con el enlace a tu consulta',
    ],
  },
  {
    id: 'ges',
    q: '¿Qué es el GES y qué enfermedades cubre?',
    intro: 'El GES (Garantías Explícitas en Salud) garantiza atención oportuna y protección financiera para más de 85 enfermedades prioritarias.',
    timeEstimate: null,
    requirements: [
      'Diagnóstico médico confirmado de una enfermedad GES',
      'Derivación del médico tratante',
      'Carnet GES emitido por tu isapre',
    ],
    steps: [
      'Consulta con tu médico si tu enfermedad está en el listado GES',
      'Solicita la apertura del caso GES en tu isapre',
      'Recibe tu carnet GES con las garantías de tu tratamiento',
      'Accede a los prestadores de la red GES de Nueva Masvida',
    ],
  },
]

const CONTACTS = [
  {
    id: 'whatsapp',
    icon: A.contactWhatsapp,
    title: 'WhatsApp',
    desc: 'Respuesta en minutos, cuando lo necesites',
    cta: 'Iniciar chat',
    href: 'https://wa.me/56600600262',
  },
  {
    id: 'phone',
    icon: A.contactPhone,
    title: '600 6000 262',
    desc: 'Lunes a viernes de 8:00 a 20:00 hrs',
    cta: 'Llamar ahora',
    href: 'tel:600600262',
  },
  {
    id: 'video',
    icon: A.contactVideo,
    title: 'Videoatención',
    desc: 'Consulta con un médico desde tu casa',
    cta: 'Agendar hora',
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

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="cda-hero">
        <div
          ref={hero.ref}
          className={`cda-hero__inner reveal-block ${hero.visible ? 'revealed' : ''}`}
        >
          {/* Title — all same weight */}
          <h1 className="cda-hero__title">
            ¿En qué podemos ayudarte?
          </h1>

          {/* Subtitle */}
          <p className="cda-hero__sub">
            Encuentra información sobre tu plan de salud, licencias médicas, pagos y mucho más.
          </p>

          <HelpSearchBar />
        </div>
      </section>

      {/* ══ CATEGORIES ════════════════════════════════════════════════════════ */}
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

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════ */}
      <section className="cda-faq">
        <div className="cda-faq__inner">
          <div
            ref={faq.ref}
            className={`reveal-block ${faq.visible ? 'revealed' : ''}`}
          >
            <div className="cda-faq__head">
              <h2 className="cda-faq__title">Preguntas frecuentes</h2>
              <p className="cda-faq__sub">Las dudas más comunes, respondidas en detalle</p>
            </div>

            <div className="cda-faq__accordion">
              <FAQAccordion items={FAQ_ITEMS} />
            </div>

            <div className="cda-faq__more">
              <p className="cda-faq__more-text">¿No encontraste lo que buscabas?</p>
              <button type="button" className="cda-faq__more-btn">
                Ver todas las preguntas
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════════════════ */}
      <section className="cda-contact">
        <div className="cda-contact__inner">

          <div
            ref={contact.ref}
            className={`cda-contact__left reveal-block ${contact.visible ? 'revealed' : ''}`}
          >
            {/* "Estamos aquí para ti" — white */}
            <p className="cda-contact__eyebrow">Estamos aquí para ti</p>
            <h2 className="cda-contact__title">
              Elige el canal que<br />
              <strong>más te acomode</strong>
            </h2>
            {/* font-size 20px, min-width 500px */}
            <p className="cda-contact__sub">
              Nuestros ejecutivos están disponibles para resolver cualquier consulta de forma rápida y cercana.
            </p>
            <img
              src={A.decoD2}
              alt=""
              aria-hidden="true"
              className="cda-contact__deco"
            />
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

  // Compute filtered results — search across question, intro, requirements and steps
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
    setQuery(tag)
    setActive(tag)
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

      {/* Quick-access chips */}
      <div className="cda-search__tags">
        <span className="cda-search__label">Lo más buscado:</span>
        {SEARCH_TAGS.map(tag => (
          <button
            key={tag}
            type="button"
            className={`cda-search__tag ${active === tag ? 'cda-search__tag--active' : ''}`}
            onClick={() => pickTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Search results panel ──────────────────────────────────────────────────────

function SearchResults({ results, query, onClose }) {
  const hasResults = results && (results.cats.length > 0 || results.faqs.length > 0)

  // Highlight matching text
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
                <div className="cda-results__item-badge" style={{ background: cat.badgeBg }}>
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

/**
 * CatCard — matches Figma 764:4211 exactly:
 *   - image (160px) with black bottom gradient + zoom on hover
 *   - content: [icon badge] + [title] row, then description paragraph
 */
function CatCard({ cat, delay }) {
  return (
    <button
      className="cda-cat"
      style={{ '--delay': `${delay}ms` }}
      aria-label={cat.title}
    >
      {/* ── Image area ── */}
      <div className="cda-cat__img-wrap">
        <img src={cat.img} alt="" className="cda-cat__img" />
        {/* Gradiente negro fijo en base */}
        <div className="cda-cat__overlay" aria-hidden="true" />
        {/* Oscurecido sutil en hover — igual que bg-zoom-overlay */}
        <div className="cda-cat__hover-dim" aria-hidden="true" />
      </div>

      {/* ── Content below image ── */}
      <div className="cda-cat__body">
        {/* Icon badge + title on same row */}
        <div className="cda-cat__head-row">
          <div
            className="cda-cat__badge"
            style={{ background: cat.badgeBg }}
            aria-hidden="true"
          >
            <img src={cat.icon} alt="" className="cda-cat__badge-icon" />
          </div>
          <span className="cda-cat__title">{cat.title}</span>
        </div>

        {/* Description */}
        <p className="cda-cat__desc">{cat.desc}</p>
      </div>
    </button>
  )
}

function ContactCard({ contact, delay, revealed, onAction }) {
  return (
    <button
      className={`cda-ccard reveal-block ${revealed ? 'revealed' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
      onClick={onAction}
    >
      <div className="cda-ccard__icon-wrap">
        <img src={contact.icon} alt="" className="cda-ccard__icon" />
      </div>
      <div className="cda-ccard__text">
        <span className="cda-ccard__title">{contact.title}</span>
        <span className="cda-ccard__desc">{contact.desc}</span>
      </div>
      <span className="cda-ccard__cta">
        {contact.cta}
        <ArrowRightIcon />
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
