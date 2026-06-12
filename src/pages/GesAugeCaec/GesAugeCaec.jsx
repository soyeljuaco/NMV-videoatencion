/**
 * GesAugeCaec — /GES-AUGE-CAEC
 * DS NMV2026 — Figma node 992:3491
 * Tema: marca-secundaria/purple #713474
 */
import { useState } from 'react'
import { A } from '../../assets.js'
import { useReveal } from '../../hooks/useReveal.js'
import FAQAccordion from '../../components/patterns/FAQAccordion/FAQAccordion.jsx'
import './GesAugeCaec.css'

// ── Data ─────────────────────────────────────────────────────────────────────

const PRESTACIONES = [
  {
    num: 1,
    title: 'Drogas inmunosupresoras',
    desc: 'En caso de trasplantes de órganos o tejidos.',
  },
  {
    num: 2,
    title: 'Radioterapia',
    desc: 'Tratamientos de radioterapia oncológica.',
  },
  {
    num: 3,
    title: 'Drogas citotóxicas',
    desc: 'Aplicadas en ciclos de quimioterapia para el tratamiento del cáncer.',
  },
  {
    num: 4,
    title: 'Medicamentos coadyuvantes o biomoduladores',
    desc: 'Utilizados antes, durante y después de los ciclos de quimioterapia, considerados en los programas del Ministerio de Salud.',
  },
]

const STEPS = {
  reembolso: [
    { title: 'Diagnóstico presuntivo',             desc: 'El médico tratante presume que la enfermedad podría transformarse en catastrófica.',                      icon: <StethoscopeIcon />, green: false },
    { title: 'Solicitud de ingreso a la Red CAEC', desc: 'El afiliado firma la solicitud en cualquier sucursal de Nueva Masvida o llama al 600 6000 262.',         icon: <DocSignIcon />,     green: false },
    { title: 'Asignación de prestador',            desc: 'La Isapre asigna un prestador dentro de la Red CAEC con cobertura nacional.',                            icon: <HospitalIcon />,    green: false },
    { title: 'Acumulación del deducible',          desc: 'Los gastos médicos se acumulan hasta alcanzar el deducible definido en tu plan.',                        icon: <ListIcon />,        green: false },
    { title: 'Activación de cobertura CAEC',       desc: 'Una vez superado el deducible, la CAEC cubre el 100% de los gastos elegibles en el prestador asignado.', icon: <ShieldCheckIcon />, green: true  },
  ],
  bono: [
    { title: 'Solicita tu bono en línea',    desc: 'Ingresa a Mi Sucursal Virtual y selecciona "Solicitar bono GES/CAEC".',                       icon: <MonitorIcon />,    green: false },
    { title: 'Indica el prestador',          desc: 'Selecciona el prestador acreditado dentro de la Red CAEC donde te atenderás.',                icon: <DocSignIcon />,    green: false },
    { title: 'Recibe tu bono electrónico',   desc: 'El bono se emite de forma inmediata para presentar en el prestador asignado.',                icon: <ShieldCheckIcon />, green: true  },
  ],
}

const FAQ_ITEMS = [
  {
    id: 'solicitar-caec',
    q: '¿Cómo y dónde se solicita el beneficio CAEC?',
    intro: 'Puedes solicitar el beneficio CAEC en cualquier sucursal de Nueva Masvida o llamando al 600 6000 262.',
    timeEstimate: 'Este proceso se inicia de forma presencial o telefónica',
    requirements: [
      'Diagnóstico presuntivo del médico tratante',
      'Cédula de identidad vigente',
    ],
    steps: [
      'El médico tratante emite el diagnóstico presuntivo',
      'Dirígete a la sucursal más cercana o llama al 600 6000 262',
      'Firma la solicitud de ingreso a la Red CAEC',
      'La Isapre asigna el prestador dentro de la red',
    ],
  },
  {
    id: 'contacto-caec',
    q: '¿Existe un número de contacto para dudas de GES o CAEC?',
    intro: 'Para consultas sobre GES o CAEC puedes llamar al 600 6000 262, de lunes a viernes de 08:00 a 20:00 hrs, o acercarte a cualquier sucursal.',
    requirements: [],
    steps: [],
  },
  {
    id: 'prestador-red',
    q: '¿Qué pasa si el afiliado no desea atenderse en el prestador de la Red asignado por la Isapre?',
    intro: 'Si el afiliado elige atenderse fuera de la Red CAEC, pierde el beneficio de cobertura catastrófica del 100% para ese episodio de salud.',
    requirements: [],
    steps: [],
  },
  {
    id: 'red-caec',
    q: '¿Qué es la Red CAEC?',
    intro: 'La Red CAEC es el conjunto de prestadores (hospitales, clínicas y médicos) acreditados por la Isapre para otorgar cobertura catastrófica con alcance nacional.',
    requirements: [],
    steps: [],
  },
  {
    id: 'utilizar-caec',
    q: '¿Cómo utilizar la cobertura CAEC?',
    intro: 'Para activar la cobertura CAEC debes seguir el proceso formal de ingreso a través de tu Isapre, comenzando con el diagnóstico presuntivo de tu médico.',
    requirements: [
      'Diagnóstico presuntivo del médico tratante',
      'Firma de solicitud de ingreso a la Red CAEC',
    ],
    steps: [
      'Obtén el diagnóstico presuntivo',
      'Ingresa la solicitud en cualquier sucursal',
      'Espera la asignación de prestador',
      'Acumula gastos hasta el deducible',
      'La CAEC cubre el 100% desde ese punto',
    ],
  },
  {
    id: 'enfermedades',
    q: '¿Cuáles son las enfermedades catastróficas?',
    intro: 'Son enfermedades de alto costo, alta complejidad y larga duración que pueden comprometer gravemente la salud del afiliado, como ciertos cánceres, trasplantes y enfermedades degenerativas.',
    requirements: [],
    steps: [],
  },
  {
    id: 'deducible',
    q: '¿Cómo calculo mi deducible?',
    intro: 'El deducible es el monto máximo que debes pagar por prestaciones de salud en un año. Está definido en tu plan de salud y puedes consultarlo en Mi Sucursal Virtual.',
    requirements: [
      'Revisa tu contrato de salud',
      'Consulta el saldo en Mi Sucursal Virtual',
    ],
    steps: [
      'Ingresa a Mi Sucursal Virtual',
      'Ve a "Mi plan" → "Deducible"',
      'Verifica el monto acumulado y el límite anual',
    ],
  },
  {
    id: 'copagos-caec',
    q: '¿Se puede agregar otros copagos a la enfermedad cubierta por CAEC?',
    intro: 'No. Una vez activada la CAEC, la Isapre cubre el 100% de los gastos elegibles en el prestador asignado. No se agregan copagos adicionales sobre esas prestaciones.',
    requirements: [],
    steps: [],
  },
  {
    id: 'grupo-familiar',
    q: '¿Qué pasa si más de un beneficiario del grupo familiar utiliza CAEC?',
    intro: 'Cada beneficiario tiene su propio proceso de ingreso y deducible independiente, sin importar el uso de otros miembros del grupo familiar.',
    requirements: [
      'Cada beneficiario solicita ingreso por separado',
      'Cada uno acumula su propio deducible',
    ],
    steps: [],
  },
  {
    id: 'documentos-caec',
    q: '¿Se tiene que llevar algún documento para activar CAEC?',
    intro: 'Sí. Debes presentar el diagnóstico presuntivo de tu médico tratante y tu cédula de identidad en la sucursal.',
    requirements: [
      'Diagnóstico presuntivo del médico tratante',
      'Cédula de identidad vigente',
    ],
    steps: [
      'Reúne los documentos necesarios',
      'Dirígete a la sucursal más cercana',
      'Entrega los documentos al ejecutivo',
      'Firma la solicitud de ingreso a la Red CAEC',
    ],
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function GesAugeCaec({ onAgendar }) {
  const [activeTab, setActiveTab] = useState('reembolso')

  const hero      = useReveal()
  const queEs     = useReveal({ threshold: 0.05 })
  const como      = useReveal({ threshold: 0.05 })
  const faq       = useReveal({ threshold: 0.08 })

  return (
    <div className="ges">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="ges-hero">
        <div className="ges-hero__bg" aria-hidden="true" />
        <div
          ref={hero.ref}
          className={`ges-hero__inner reveal-block ${hero.visible ? 'revealed' : ''}`}
        >
          {/* Left */}
          <div className="ges-hero__left">
            <h1 className="ges-hero__title">GES - AUGE / CAEC</h1>
            <p className="ges-hero__subtitle">
              La CAEC aumenta la cobertura de tu plan en prestaciones
              hospitalarias y ambulatorias de alta complejidad,
              protegiéndote ante enfermedades de alto costo.
            </p>
          </div>

          {/* Info card */}
          <div className="ges-hero__card">
            <p className="ges-hero__card-label">Información clave</p>
            {[
              { icon: <GlobeIcon />,    sub: 'Cobertura',        val: 'Nacional, Red CAEC'   },
              { icon: <UserCheckIcon />, sub: 'Profesionales',   val: 'Acreditados por ley'  },
              { icon: <BuildingIcon />, sub: 'Establecimientos', val: 'Requisitos legales'   },
              { icon: <CalendarIcon />, sub: 'Vigencia circular', val: 'Desde 1° junio 2005' },
            ].map((item, i) => (
              <div key={i} className="ges-hero__card-row">
                <span className="ges-hero__card-icon">{item.icon}</span>
                <div className="ges-hero__card-text">
                  <span className="ges-hero__card-sub">{item.sub}</span>
                  <span className="ges-hero__card-val">{item.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ¿QUÉ ES LA CAEC? ════════════════════════════════════════════════ */}
      <section className="ges-que-es">
        <div className="ges-que-es__inner">
          <div
            ref={queEs.ref}
            className={`reveal-block ${queEs.visible ? 'revealed' : ''}`}
          >
            {/* Head */}
            <div className="ges-que-es__head">
              <h2 className="ges-que-es__title">¿Qué es la CAEC?</h2>
              <p className="ges-que-es__sub">
                Cobertura Adicional para Enfermedades Catastróficas — regulada por la Superintendencia de Salud
              </p>
            </div>

            {/* Info card */}
            <div className="ges-info-card">
              <div className="ges-info-card__head-row">
                <div className="ges-info-card__badge">
                  <img src={A.helpBillCheck} alt="" className="ges-info-card__badge-icon" />
                </div>
                <h3 className="ges-info-card__title">Bono de atención</h3>
              </div>
              <div className="ges-info-card__body">
                <p>
                  La <strong>Cobertura Adicional de Enfermedades Catastróficas (CAEC)</strong> tiene
                  por finalidad aumentar la cobertura que otorga al afiliado y sus beneficiarios el
                  Plan Complementario de Salud en el ámbito de las prestaciones hospitalarias, así
                  como en el de las prestaciones ambulatorias otorgadas exclusivamente dentro del
                  territorio nacional.
                </p>
                <p>
                  Esta cobertura se encuentra regulada por la Circular IF/N°7 vigente del 1 de junio
                  de 2005 de la Superintendencia de Salud, y se otorga mediante la red médica
                  establecida por la Isapre (Red CAEC), con cobertura nacional, profesionales
                  acreditados y establecimientos que cumplen los requisitos establecidos por la ley.
                </p>
              </div>
            </div>

            {/* Purple callout */}
            <div className="ges-callout">
              <InfoCircleIcon />
              <p>
                La CAEC cubre al <strong>100%</strong> los gastos elegibles una vez superado el
                deducible establecido en tu plan de salud. Esto significa que Nueva Masvida asume
                los costos más allá de ese monto, protegiéndote de gastos catastróficos.
              </p>
            </div>

            {/* Prestaciones grid */}
            <div className="ges-prestaciones">
              <h3 className="ges-prestaciones__title">Prestaciones ambulatorias cubiertas excepcionalmente</h3>
              <p className="ges-prestaciones__sub">
                La CAEC cubre excepcionalmente las siguientes prestaciones ambulatorias, siempre
                que estén consideradas en los programas del Ministerio de Salud:
              </p>
              <div className="ges-prestaciones__grid">
                {PRESTACIONES.map(p => (
                  <div key={p.num} className="ges-prest-card">
                    <div className="ges-prest-card__num">{p.num}</div>
                    <div className="ges-prest-card__content">
                      <span className="ges-prest-card__title">{p.title}</span>
                      <span className="ges-prest-card__desc">{p.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ¿CÓMO FUNCIONA? ══════════════════════════════════════════════════ */}
      <section className="ges-como">
        <div className="ges-como__inner">
          <div
            ref={como.ref}
            className={`reveal-block ${como.visible ? 'revealed' : ''}`}
          >
            <div className="ges-como__head">
              <h2 className="ges-como__title">¿Cómo funciona la CAEC?</h2>
              <p className="ges-como__sub">Proceso paso a paso para activar tu cobertura catastrófica</p>
            </div>

            {/* Tab toggle */}
            <div className="ges-tabs">
              <button
                className={`ges-tabs__btn ges-tabs__btn--left ${activeTab === 'reembolso' ? 'ges-tabs__btn--active' : ''}`}
                onClick={() => setActiveTab('reembolso')}
              >
                Reembolso médico
              </button>
              <button
                className={`ges-tabs__btn ges-tabs__btn--right ${activeTab === 'bono' ? 'ges-tabs__btn--active' : ''}`}
                onClick={() => setActiveTab('bono')}
              >
                Bono electrónico
              </button>
            </div>

            {/* Steps card */}
            <div className="ges-steps-card">
              <ol className="ges-steps__list">
                {STEPS[activeTab].map((step, i) => (
                  <li key={i} className="ges-step">
                    <div className="ges-step__left">
                      <div className={`ges-step__num ${step.green ? 'ges-step__num--green' : ''}`}>
                        {i + 1}
                      </div>
                      {i < STEPS[activeTab].length - 1 && <div className="ges-step__line" />}
                    </div>
                    <div className="ges-step__content">
                      <div className="ges-step__title-row">
                        <span className="ges-step__icon">{step.icon}</span>
                        <span className="ges-step__name">{step.title}</span>
                      </div>
                      <p className="ges-step__desc">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════ */}
      <section className="ges-faq">
        <div className="ges-faq__inner">
          <div
            ref={faq.ref}
            className={`reveal-block ${faq.visible ? 'revealed' : ''}`}
          >
            <h2 className="ges-faq__title">Preguntas frecuentes</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

    </div>
  )
}

// ── Hero card icons ───────────────────────────────────────────────────────────

function GlobeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function UserCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 13l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 20c0-3.3 3.1-6 7-6 1.4 0 2.8.4 3.9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 9h18M9 9v12M15 9v12" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 3v6M15 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7 14h2M11 14h2M15 14h2M7 18h2M11 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// ── Info card icon ────────────────────────────────────────────────────────────

function InfoCircleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9" stroke="#713474" strokeWidth="1.5"/>
      <path d="M12 11v6M12 8v.5" stroke="#713474" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

// ── Step icons ────────────────────────────────────────────────────────────────

function StethoscopeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 3H4M6 3h2M18 3h-2M18 3h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="19" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 16v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function DocSignIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function HospitalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 21V10M16 21V10M3 12h18M10 6V3h4v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 15h1v4h-1zM13 15h1v4h-1z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8 6h13M8 12h13M8 18h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function ShieldCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l8 3v6c0 5-3.5 9.3-8 11C7.5 20.3 4 16 4 11V5l8-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
