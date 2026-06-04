import { useState, useEffect } from 'react'
import { A } from '../assets.js'
import icoHero from '../icons/ico-hero.svg'
import icoClockCheck from '../icons/ico-clock-check.svg'
import icoComputerVideo from '../icons/ico-computer-video-call.svg'
import icoBranchCard from '../icons/ico-branch-card.svg'
import '../styles/interactions.css'

const FEATURES = [
  { icon: A.iconCompVideo,  title: 'Mayor accesibilidad', desc: 'Consulta desde cualquier lugar sin desplazarte',      barColor: '#0085ca', iconBg: 'rgba(0,133,202,0.12)'   },
  { icon: A.iconClockHeart, title: 'Ahorro de tiempo',    desc: 'Atención más eficiente, sin filas de espera',        barColor: '#7e4ed7', iconBg: 'rgba(126,78,215,0.12)'  },
  { icon: A.iconCalFav,     title: 'Agenda flexible',     desc: 'Agenda tus citas en el momento que más te acomode', barColor: '#ef9033', iconBg: 'rgba(239,144,51,0.12)'  },
  { icon: A.iconSecurity,   title: 'Rápido y seguro',     desc: 'Plataforma confiable para tu atención',              barColor: '#25a337', iconBg: 'rgba(37,163,55,0.12)'   },
]
const INTERVAL = 2500

export default function Landing({ onStart }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused,    setIsPaused]    = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % FEATURES.length)
    }, INTERVAL)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="bg-[#f5f7fa] py-10 xl:py-20 flex flex-col items-center overflow-hidden relative">
        <div className="w-full xl:w-[1200px] px-4 xl:px-0 flex flex-col xl:flex-row items-center xl:items-start xl:justify-between relative gap-8 xl:gap-0">
          {/* Left column — text */}
          <div className="flex flex-col gap-4 xl:gap-6 items-center xl:items-start w-full xl:w-[681px] xl:self-stretch text-center xl:text-left">
            {/* Badge */}
            <div className="flex items-center gap-2.5 rounded-full">
              <img src={icoHero} alt="" className="w-8 h-8 object-contain" />
              <span className="text-[#723585] text-xs font-semibold uppercase tracking-[0.6px]">Nueva Experiencia</span>
            </div>
            {/* Heading */}
            <div className="flex flex-col items-center xl:items-start">
              <h1 className="font-raleway font-medium text-[36px] leading-[40px] xl:text-[72px] xl:leading-[76px] text-[#212529] m-0">Agenda tu </h1>
              <h1 className="font-raleway font-bold text-[36px] leading-[40px] xl:text-[72px] xl:leading-[76px] text-[#212529] m-0">videoatención</h1>
            </div>
            {/* Subtitle */}
            <p className="text-[#495057] text-base xl:text-xl leading-6 xl:leading-relaxed w-full xl:w-[571px]">
              Atención personalizada desde donde quieras. Resuelve tus trámites sin salir de casa.
            </p>
            {/* CTA */}
            <div className="flex flex-col xl:flex-row items-center xl:items-center gap-3 xl:gap-6 w-full xl:w-auto">
              <button
                onClick={onStart}
                className="btn-cta-hero bg-[#0085ca] text-white font-semibold rounded-full px-12 py-[14px] flex items-center justify-center gap-[10px] text-base leading-7 w-full xl:w-auto"
              >
                <img src={A.iconVideoBlue} alt="" className="w-6 h-6" />
                Agendar videoatención
              </button>
            </div>
          </div>

          {/* Hero image — desktop only, mostrar tal cual sin recorte */}
          <div
            className="hidden xl:block flex-shrink-0 hero-img-wrap"
            style={{ width: '578px', height: '567px' }}
          >
            <img
              src="/img-hero.png"
              alt="Videoatención Nueva Masvida"
              className="w-full h-full"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Decoration stars — desktop only */}
          <div className="hidden xl:block absolute top-6 right-0 pointer-events-none">
            <img src={A.elemA3} alt="" className="w-9 h-9 absolute left-11 top-0" />
            <img src={A.elemA4} alt="" className="w-11 h-11 absolute left-0 top-9" />
          </div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ── */}
      <section className="bg-white py-12 xl:py-20 flex justify-center">
        <div className="w-full xl:w-[1200px] px-4 xl:px-0 flex flex-col xl:flex-row items-start justify-between gap-8 xl:gap-16">
          {/* Left */}
          <div className="flex flex-col gap-4 xl:gap-6 flex-1">
            <img src={A.elemB1} alt="" className="w-[105px] h-[22px] object-cover" />
            <h2 className="font-raleway text-[28px] xl:text-[48px] text-[#212529] leading-tight">
              <span className="font-semibold">Resolver tus trámites,</span><br />
              <span className="font-bold">hoy es más simple</span>
            </h2>
          </div>

          {/* Right: 4 feature items con highlight loop */}
          <div
            className="flex flex-col gap-5 xl:gap-8 flex-1"
            aria-live="polite"
            onMouseLeave={() => setIsPaused(false)}
          >
            {FEATURES.map(({ icon, title, desc, barColor, iconBg }, i) => {
              const isActive = activeIndex === i
              return (
                <div key={title} className="flex items-stretch gap-3">

                  {/* Barra de progreso vertical */}
                  <div className="progress-track">
                    {isActive && <div key={i + '-' + activeIndex} className="progress-bar" style={{ background: barColor }} />}
                  </div>

                  {/* Feature item */}
                  <div
                    className={`feature-item flex items-start gap-4 flex-1 ${isActive ? 'is-active' : 'is-dim'}`}
                    onMouseEnter={() => { setIsPaused(true); setActiveIndex(i) }}
                  >
                    <div className="icon-container w-12 h-12 rounded-[14px] flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
                      <img src={icon} alt="" className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="feature-title text-[#212529] font-semibold text-lg leading-7 tracking-tight">{title}</p>
                      <p className="feature-desc text-[#495057] text-base leading-6">{desc}</p>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── RESERVA RÁPIDA SECTION ── */}
      <section className="bg-[#f5f7fa] pt-10 xl:pt-12 pb-12 xl:pb-20 flex justify-center overflow-hidden">
        <div className="w-full xl:w-[1200px] px-4 xl:px-0 flex flex-col gap-8 xl:gap-12">

          {/* Heading */}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-[#723585] text-xs font-semibold uppercase tracking-[0.6px]">PROCESO SIMPLE</span>
            <h2 className="font-raleway text-2xl xl:text-[48px] text-[#212529] leading-tight xl:leading-[50px]">
              <span className="font-semibold">Reserva de manera </span>
              <span className="font-bold">rápida</span>
            </h2>
          </div>

          {/* Content block */}
          <div className="flex flex-col gap-4 xl:gap-12">

            {/* Background image card */}
            <div className="bg-zoom-wrap relative h-48 xl:h-[448px] rounded-2xl overflow-hidden">
              <img src="/img-bg-features.png" alt="" aria-hidden="true" className="bg-photo absolute inset-0 w-full h-full object-cover object-center" />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(85.52deg, rgba(33,37,41,0.3) 11.25%, rgba(255,255,255,0) 84.53%)' }}
              />
              {/* Overlay oscuro sutil en hover */}
              <div className="bg-zoom-overlay absolute inset-0" />
              {/* Decorativo D2 — bottom-left */}
              <img
                src="/img-elementos-d2.png"
                alt="" aria-hidden="true"
                className="hidden xl:block absolute pointer-events-none"
                style={{ left: '55px', bottom: '48px', width: '72px', height: '77px', objectFit: 'cover', zIndex: 2 }}
              />
              {/* Branch card — centro-derecha con bounce sutil */}
              <img
                src={icoBranchCard}
                alt="Ejecutivo de sucursal"
                className="hidden xl:block absolute pointer-events-none branch-card-float"
                style={{ left: '48%', top: '65%', zIndex: 2 }}
              />
            </div>

            {/* Two feature cards — Figma 789:4479 */}
            <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
              <div className="step-card bg-white border border-[#dee2e6] rounded-2xl flex-1 flex flex-col gap-4 px-8 xl:px-[60px] py-6">
                <div className="flex items-center gap-4">
                  <img src={icoClockCheck} alt="" className="w-9 h-9 flex-shrink-0" />
                  <p className="font-raleway font-bold text-xl text-[#0085ca] leading-7">Reserva tu hora en minutos</p>
                </div>
                <p className="text-[#495057] text-base leading-6">Elige el día y el horario que mejor te acomoden para conversar con nuestros ejecutivos sin salir de casa.</p>
              </div>
              <div className="step-card bg-white border border-[#dee2e6] rounded-2xl flex-1 flex flex-col gap-4 px-8 xl:px-[60px] py-6">
                <div className="flex items-center gap-4">
                  <img src={icoComputerVideo} alt="" className="w-9 h-9 flex-shrink-0" />
                  <p className="font-raleway font-bold text-xl text-[#0085ca] leading-7">Conéctate a tu videoatención</p>
                </div>
                <p className="text-[#495057] text-base leading-6">Cuando llegue el momento, accede de forma segura desde cualquier dispositivo y habla con nosotros cara a cara.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <button
              onClick={onStart}
              className="btn-cta-hero bg-[#0085ca] text-white font-semibold rounded-full px-12 py-[14px] flex items-center justify-center gap-[10px] text-base leading-7 w-full xl:w-auto"
            >
              <img src={A.iconVideoBlue} alt="" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
              Agendar videoatención
            </button>
          </div>

        </div>
      </section>

      {/* ── CTA BLUE SECTION ── */}
      <section className="bg-[#0085ca] py-12 xl:py-20 flex justify-center overflow-hidden">
        <div className="w-full xl:w-[1200px] px-4 xl:px-0 flex flex-col xl:flex-row items-start gap-8 xl:gap-6">
          {/* Left */}
          <div className="flex flex-col gap-6 xl:gap-8 items-start w-full xl:w-[690px]">
            <div className="flex flex-col gap-4 xl:gap-6">
              <h2 className="font-raleway text-[28px] xl:text-[36px] text-white leading-tight xl:leading-[52px]">
                <span className="font-medium">Estamos cuando </span>
                <span className="font-bold">nos necesitas</span>
              </h2>
              <p className="text-white text-base xl:text-2xl leading-6 xl:leading-[34px]">
                Atendemos de lunes a sábado en horarios pensados para acompañar tu rutina, sin necesidad de ir a sucursal.
              </p>
            </div>
            <button
              onClick={onStart}
              className="btn-cta-white bg-white text-[#0085ca] font-semibold rounded-full px-12 py-[14px] flex items-center justify-center gap-[10px] text-base leading-7 w-full xl:w-auto"
            >
              <img src={A.iconVideoWhite} alt="" className="w-6 h-6" />
              Agendar videoatención
            </button>
          </div>

          {/* Right: Schedule cards */}
          <div className="flex flex-col gap-4 xl:gap-8 flex-1 w-full xl:w-auto">
            {[
              { days: 'Lunes a Jueves',   hours: '9:00 — 17:30 hrs' },
              { days: 'Viernes y Sábado', hours: '9:00 — 14:00 hrs' },
            ].map(({ days, hours }) => (
              <div
                key={days}
                className="rounded-2xl flex flex-col gap-2 p-6 w-full"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(6px)' }}
              >
                <p className="text-white text-sm font-semibold uppercase">{days}</p>
                <p className="text-white text-2xl xl:text-[32px] font-bold leading-tight xl:leading-10">{hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
