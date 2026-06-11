/**
 * FAQAccordion — rich single-open accordion.
 *
 * Each item accepts:
 *   id, q, intro, timeEstimate?, requirements?, steps[]
 *
 * Opens with smooth max-height transition.
 * Includes inline feedback section (thumbs up/down, textarea, contact links).
 */
import { useState, useRef, useEffect } from 'react'
import './FAQAccordion.css'

export default function FAQAccordion({ items = [] }) {
  const [open, setOpen] = useState(null)
  function toggle(id) { setOpen(p => (p === id ? null : id)) }

  return (
    <div className="faq" role="list">
      {items.map(item => (
        <FAQItem
          key={item.id}
          item={item}
          isOpen={open === item.id}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  )
}

// ── Single accordion item ────────────────────────────────────────────────────

function FAQItem({ item, isOpen, onToggle }) {
  const bodyRef  = useRef(null)
  const [height,   setHeight]   = useState(0)
  const [feedback, setFeedback] = useState(null) // null | 'yes' | 'no'

  // Recalculate max-height whenever open state OR feedback selection changes
  useEffect(() => {
    if (!bodyRef.current) return
    if (!isOpen) { setHeight(0); return }
    const raf = requestAnimationFrame(() => {
      if (bodyRef.current) setHeight(bodyRef.current.scrollHeight)
    })
    return () => cancelAnimationFrame(raf)
  }, [isOpen, feedback])

  function handleFeedback(val) {
    setFeedback(f => (f === val ? null : val))
  }

  return (
    <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`} role="listitem">

      {/* ── Trigger ── */}
      <button
        className="faq__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq__question">{item.q}</span>
        <ChevronIcon open={isOpen} />
      </button>

      {/* ── Collapsible body ── */}
      <div
        className="faq__body"
        style={{ maxHeight: height }}
        aria-hidden={!isOpen}
      >
        <div ref={bodyRef} className="faq__content">

          {/* Intro paragraph */}
          {item.intro && <p className="faq__intro">{item.intro}</p>}

          {/* Yellow time-estimate chip */}
          {item.timeEstimate && (
            <div className="faq__time-box">
              <ClockIcon />
              <p className="faq__time-text">
                <strong>Tiempo estimado:</strong> {item.timeEstimate}
              </p>
            </div>
          )}

          {/* Requirements bullet list */}
          {item.requirements?.length > 0 && (
            <div className="faq__section">
              <h4 className="faq__section-title">Requisitos necesarios:</h4>
              <ul className="faq__bullet-list">
                {item.requirements.map((req, i) => (
                  <li key={i} className="faq__bullet-item">
                    <span className="faq__bullet" aria-hidden="true">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Numbered steps */}
          {item.steps?.length > 0 && (
            <div className="faq__section">
              <h4 className="faq__section-title">Pasos a seguir:</h4>
              <ol className="faq__steps">
                {item.steps.map((step, i) => (
                  <li key={i} className="faq__step">
                    <span className="faq__step-num" aria-hidden="true">{i + 1}</span>
                    <span className="faq__step-text">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* ── Feedback section ── */}
          <div className="faq__feedback">
            <p className="faq__feedback-label">¿Te ayudó esta respuesta?</p>
            <div className="faq__feedback-btns">
              <button
                className={`faq__fb-btn faq__fb-btn--yes ${feedback === 'yes' ? 'faq__fb-btn--sel-yes' : ''}`}
                onClick={() => handleFeedback('yes')}
              >
                <ThumbUpIcon /> Sí, me ayudó
              </button>
              <button
                className={`faq__fb-btn faq__fb-btn--no ${feedback === 'no' ? 'faq__fb-btn--sel-no' : ''}`}
                onClick={() => handleFeedback('no')}
              >
                <ThumbDownIcon /> No, necesito más ayuda
              </button>
            </div>

            {/* Positive thanks */}
            {feedback === 'yes' && (
              <p className="faq__thanks">¡Gracias por tu opinión! 😊</p>
            )}

            {/* Negative flow: textarea + contact options */}
            {feedback === 'no' && (
              <div className="faq__no-help">
                <div className="faq__textarea-wrap">
                  <label className="faq__textarea-label">
                    ¿Qué información te falta? (opcional)
                  </label>
                  <textarea
                    className="faq__textarea"
                    placeholder="Cuéntanos cómo podemos mejorar esta respuesta..."
                    rows={3}
                  />
                </div>

                <div className="faq__contact-box">
                  <p className="faq__contact-title">Puedes resolver esto también por:</p>
                  <div className="faq__contact-links">
                    <a
                      href="https://wa.me/56969015876"
                      className="faq__contact-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WaIcon /> WhatsApp: +569 6901 5876
                    </a>
                    <a href="tel:600600262" className="faq__contact-link">
                      <PhoneCallIcon /> Llamar al 600 6000 262
                    </a>
                    <button className="faq__contact-link">
                      <UserIcon /> Sucursal Virtual
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function ChevronIcon({ open }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"
      style={{
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="6.25" stroke="#b07d10" strokeWidth="1.5"/>
      <path d="M8 5v3.5l2.2 2.2" stroke="#b07d10" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ThumbUpIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5 14H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h2m0 7V7m0 7h6.5a1 1 0 0 0 .97-.76l1-4A1 1 0 0 0 12.5 7H10V4a1 1 0 0 0-1-1H8L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function ThumbDownIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M11 2h2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2m0-7V9m0-7H4.5a1 1 0 0 0-.97.76l-1 4A1 1 0 0 0 3.5 9H6v3a1 1 0 0 0 1 1h1l3-4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function WaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5A6.5 6.5 0 0 0 2.07 10.9L1.5 14.5l3.7-.56A6.5 6.5 0 1 0 8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M5.5 6.5c0 3 5 5 5 2.5-.5-.5-1-.5-1.5-.25-.25.25-.5.5-1 .25S6.5 7.5 6.25 7c-.25-.5 0-.75.25-1s.5-1 .25-1.5C6.5 4 5.5 5.5 5.5 6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}

function PhoneCallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 3a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.4l.5 2.5a.5.5 0 0 1-.14.47L4.2 6.5A7 7 0 0 0 9.5 11.8l1.13-1.16a.5.5 0 0 1 .47-.14l2.5.5a.5.5 0 0 1 .4.5V14a.5.5 0 0 1-.5.5C5.65 14.5 1.5 10.35 1.5 5.5V3H2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
