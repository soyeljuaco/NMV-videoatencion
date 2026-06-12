/**
 * BonosReembolsos — /bonos-y-reembolsos
 * DS NMV2026 — Figma node 982:2371
 */
import { useState } from 'react'
import { A } from '../../assets.js'
import { useReveal } from '../../hooks/useReveal.js'
import FAQAccordion from '../../components/patterns/FAQAccordion/FAQAccordion.jsx'
import './BonosReembolsos.css'

// ── Data ─────────────────────────────────────────────────────────────────────

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
    intro: 'Tienes hasta 2 años desde la fecha de atención para solicitar un reembolso.',
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
    intro: 'La licencia médica debe presentarse dentro de 3 días hábiles desde el inicio del reposo.',
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
    intro: 'Puedes incorporar cargas legales e hijos a tu plan de salud en línea o en sucursal.',
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

const CONTACTS = [
  {
    id: 'whatsapp', icon: A.contactWhatsapp,
    title: 'WhatsApp', desc: 'Respuestas en minutos, cuando lo necesites.',
    cta: 'Iniciar chat', href: 'https://wa.me/56600600262',
  },
  {
    id: 'phone', icon: A.contactPhone,
    title: '600 600 262', desc: 'Lunes a viernes de 08:00 a 20:00 hrs',
    cta: 'Llamar ahora', href: 'tel:600600262',
  },
  {
    id: 'video', icon: A.contactVideo,
    title: 'Videoatención', desc: 'Atención personalizada con un ejecutivo.',
    cta: 'Agendar ahora', action: 'agendar',
  },
  {
    id: 'branch', icon: A.contactBranch,
    title: 'Sucursales', desc: 'Encuéntranos en todo el país',
    cta: 'Ver sucursales', href: '#',
  },
]

// Steps data per tab
const STEPS = {
  reembolso: [
    { title: 'Ingresa a Mi Sucursal Virtual',    desc: 'Usa tu RUT y contraseña en sucursalvirtual.nuevamasvida.cl o en la app.', icon: <MonitorIcon /> },
    { title: 'Selecciona "Nueva solicitud"',      desc: 'Ve a la sección Reembolsos y haz clic en Nueva solicitud.',               icon: <DocPlusIcon /> },
    { title: 'Sube tus documentos',              desc: 'Fotografía o escanea tus boletas y documentos de forma legible.',          icon: <UploadIcon /> },
    { title: 'Confirma tus datos bancarios',     desc: 'Asegúrate de que tu cuenta bancaria esté correctamente registrada.',       icon: <BankCardIcon /> },
    { title: 'Recibe tu reembolso',              desc: 'El depósito se realizará en tu cuenta en aproximadamente 5 días hábiles.', icon: <MoneyIcon /> },
  ],
  bono: [
    { title: 'Solicita en línea o en sucursal',  desc: 'Ingresa a Mi Sucursal Virtual o dirígete a la sucursal más cercana.',       icon: <MonitorIcon /> },
    { title: 'Indica el prestador',              desc: 'Selecciona el prestador en convenio donde te atenderás.',                   icon: <DocPlusIcon /> },
    { title: 'Recibe tu bono electrónico',       desc: 'El bono se emitirá de forma inmediata en tu cuenta digital.',               icon: <MoneyIcon /> },
  ],
}

const DOCS = {
  reembolso: [
    'Boleta o factura original',
    'Bono de atención médica',
    'Receta médica (si aplica)',
    'Cuenta bancaria registrada',
  ],
  bono: [
    'Derivación médica (si aplica)',
    'RUT vigente',
  ],
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BonosReembolsos({ onAgendar }) {
  const [activeTab, setActiveTab] = useState('reembolso')

  const hero    = useReveal()
  const tipos   = useReveal({ threshold: 0.06 })
  const steps   = useReveal({ threshold: 0.06 })
  const faq     = useReveal({ threshold: 0.08 })
  const contact = useReveal({ threshold: 0.06 })

  function handleContactAction(c) {
    if (c.action === 'agendar') onAgendar?.()
    else if (c.href && c.href !== '#') window.open(c.href, '_blank', 'noopener')
  }

  return (
    <div className="br">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="br-hero">
        <div className="br-hero__bg" aria-hidden="true" />
        <div
          ref={hero.ref}
          className={`br-hero__inner reveal-block ${hero.visible ? 'revealed' : ''}`}
        >
          {/* Left: title + subtitle */}
          <div className="br-hero__left">
            <h1 className="br-hero__title">
              <span className="br-hero__title-light">Bonos y</span>
              <span className="br-hero__title-bold">Reembolsos</span>
            </h1>
            <p className="br-hero__subtitle">
              Atención personalizada desde donde quieras.<br />
              Resuelve tus trámites sin salir de casa.
            </p>
          </div>

          {/* Right: quick info card */}
          <div className="br-hero__card">
            <p className="br-hero__card-label">Información rápida</p>
            {[
              { icon: <ClockIcon />,    label: 'Tiempo de reembolso',  value: '5 días hábiles'       },
              { icon: <DigitalIcon />, label: 'Solicitud 100% digital', value: 'App o web'            },
              { icon: <BankIcon />,    label: 'Depósito directo',       value: 'En tu cuenta bancaria' },
              { icon: <BoltIcon />,    label: 'Bonos electrónicos',     value: 'Inmediatos'           },
            ].map((item, i) => (
              <div key={i} className="br-hero__card-row">
                <span className="br-hero__card-icon">{item.icon}</span>
                <div className="br-hero__card-text">
                  <span className="br-hero__card-sub">{item.label}</span>
                  <span className="br-hero__card-val">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIPOS DE REEMBOLSOS ═══════════════════════════════════════════════ */}
      <section className="br-tipos">
        <div className="br-tipos__inner">
          <div
            ref={tipos.ref}
            className={`reveal-block ${tipos.visible ? 'revealed' : ''}`}
          >
            <div className="br-tipos__head">
              <h2 className="br-tipos__title">Tipos de reembolsos</h2>
              <p className="br-tipos__sub">Conoce qué puedes reembolsar y sus coberturas</p>
            </div>

            <div className="br-tipos__grid">
              {/* Card 1 — Bono de atención */}
              <div className="br-tipo-card">
                <div className="br-tipo-card__body">
                  <div className="br-tipo-card__head-row">
                    <div className="br-tipo-card__badge br-tipo-card__badge--blue">
                      <img src={A.helpBillCheck} alt="" className="br-tipo-card__badge-icon" />
                    </div>
                    <h3 className="br-tipo-card__title">Bono de atención</h3>
                  </div>
                  <p className="br-tipo-card__desc">
                    Documento personal e intransferible emitido por la Isapre como medio de pago para
                    atenciones de salud en prestadores en convenio. Su valor, denominado copago,
                    corresponde al monto no bonificado por el plan de salud del afiliado.
                  </p>
                  <p className="br-tipo-card__desc">
                    El bono permite que un afiliado y sus cargas puedan atenderse según el valor
                    convenido entre el prestador y la Isapre, que es menor al valor particular del
                    prestador.
                  </p>
                </div>
                <div className="br-tipo-card__footer">
                  <div className="br-tipo-card__meta">
                    <img src={A.helpSecurity} alt="" className="br-tipo-card__meta-icon" />
                    <span><span className="br-tipo-card__meta-label">Cobertura: </span><strong>Hasta un 80% del arancel Fonasa</strong></span>
                  </div>
                  <div className="br-tipo-card__meta">
                    <ClockSmIcon />
                    <span><strong>4 a 7 días hábiles</strong></span>
                  </div>
                </div>
              </div>

              {/* Card 2 — Reembolso médico */}
              <div className="br-tipo-card">
                <div className="br-tipo-card__body">
                  <div className="br-tipo-card__head-row">
                    <div className="br-tipo-card__badge br-tipo-card__badge--green">
                      <DocValidIcon />
                    </div>
                    <h3 className="br-tipo-card__title">Reembolso médico</h3>
                  </div>
                  <p className="br-tipo-card__desc">
                    Es el monto que se devuelve en forma posterior a un afiliado que pagó su atención
                    de salud directamente al prestador como particular.
                  </p>
                  <p className="br-tipo-card__desc">
                    El afiliado debe solicitar el reembolso con el comprobante de pago y otros
                    documentos complementarios, siendo el monto a reembolsar calculado al aplicar la
                    bonificación de su plan sobre el valor de las prestaciones recibidas.
                  </p>
                </div>
                <div className="br-tipo-card__footer">
                  <div className="br-tipo-card__meta">
                    <img src={A.helpSecurity} alt="" className="br-tipo-card__meta-icon" />
                    <span><span className="br-tipo-card__meta-label">Cobertura: </span><strong>Hasta un 80% del arancel Fonasa</strong></span>
                  </div>
                  <div className="br-tipo-card__meta">
                    <ClockSmIcon />
                    <span><strong>4 a 7 días hábiles</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CÓMO SOLICITAR ═══════════════════════════════════════════════════ */}
      <section className="br-steps-section">
        <div className="br-steps-section__inner">
          <div
            ref={steps.ref}
            className={`reveal-block ${steps.visible ? 'revealed' : ''}`}
          >
            <div className="br-steps-section__head">
              <h2 className="br-steps-section__title">¿Cómo solicitar paso a paso?</h2>
              <p className="br-steps-section__sub">Elige el trámite que necesitas</p>
            </div>

            {/* Tab toggle */}
            <div className="br-tabs">
              <button
                className={`br-tabs__btn br-tabs__btn--left ${activeTab === 'reembolso' ? 'br-tabs__btn--active' : ''}`}
                onClick={() => setActiveTab('reembolso')}
              >
                Reembolso médico
              </button>
              <button
                className={`br-tabs__btn br-tabs__btn--right ${activeTab === 'bono' ? 'br-tabs__btn--active' : ''}`}
                onClick={() => setActiveTab('bono')}
              >
                Bono electrónico
              </button>
            </div>

            <div className="br-steps-content">
              {/* Documents card */}
              <div className="br-card">
                <div className="br-docs__header">
                  <div className="br-docs__header-badge">
                    <DocListIcon />
                  </div>
                  <h3 className="br-docs__header-title">Documentos necesarios</h3>
                </div>
                <div className="br-docs__grid">
                  {DOCS[activeTab].map((doc, i) => (
                    <div key={i} className="br-docs__chip">
                      <DocSmIcon />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
                {activeTab === 'reembolso' && (
                  <div className="br-docs__warning">
                    <WarningIcon />
                    <p>
                      Recuerda que tienes <strong>2 años</strong> desde la fecha de la prestación para
                      solicitar tu reembolso médico. Para medicamentos, el plazo es de{' '}
                      <strong>6 meses</strong> desde la compra.
                    </p>
                  </div>
                )}
              </div>

              {/* Steps card */}
              <div className="br-card">
                <h3 className="br-steps__title">Pasos para solicitar tu reembolso</h3>
                <ol className="br-steps__list">
                  {STEPS[activeTab].map((step, i) => (
                    <li key={i} className="br-step">
                      <div className="br-step__left">
                        <div className="br-step__num">{i + 1}</div>
                        {i < STEPS[activeTab].length - 1 && <div className="br-step__line" />}
                      </div>
                      <div className="br-step__content">
                        <div className="br-step__title-row">
                          <span className="br-step__icon">{step.icon}</span>
                          <span className="br-step__name">{step.title}</span>
                        </div>
                        <p className="br-step__desc">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════ */}
      <section className="br-faq">
        <div className="br-faq__inner">
          <div
            ref={faq.ref}
            className={`reveal-block ${faq.visible ? 'revealed' : ''}`}
          >
            <h2 className="br-faq__title">Preguntas frecuentes</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════════════════ */}
      <section className="br-contact">
        <div className="br-contact__inner">
          <div
            ref={contact.ref}
            className={`br-contact__left reveal-block ${contact.visible ? 'revealed' : ''}`}
          >
            <p className="br-contact__eyebrow">¿Aún tienes dudas?</p>
            <h2 className="br-contact__title">
              Elige el canal que<br />
              <strong>más te acomode</strong>
            </h2>
          </div>
          <div className="br-contact__cards">
            {CONTACTS.map((c, i) => (
              <button
                key={c.id}
                className={`br-ccard reveal-block ${contact.visible ? 'revealed' : ''}`}
                style={{ transitionDelay: `${i * 75}ms` }}
                onClick={() => handleContactAction(c)}
              >
                <div className="br-ccard__icon-wrap">
                  <img src={c.icon} alt="" className="br-ccard__icon" />
                </div>
                <span className="br-ccard__title">{c.title}</span>
                <span className="br-ccard__desc">{c.desc}</span>
                <span className="br-ccard__cta">{c.cta} →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 7v5.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DigitalIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 9l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function BankIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 11h20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 4l12 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function ClockSmIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 7v5.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DocValidIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DocListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DocSmIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="#b07d10" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M12 9v5M12 17.5v.5" stroke="#b07d10" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function MonitorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DocPlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 2v6h6M9 13h6M12 10v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function BankCardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function MoneyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 6V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
