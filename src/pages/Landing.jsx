import { useState, useEffect } from 'react'
import { A } from '../assets.js'
import icoHero from '../icons/ico-hero.svg'
import icoClockCheck from '../icons/ico-clock-check.svg'
import icoComputerVideo from '../icons/ico-computer-video-call.svg'
import icoBranchCard from '../icons/ico-branch-card.svg'
import '../styles/interactions.css'

const FEATURES = [
  { icon: A.iconCompVideo,  title: 'Mayor accesibilidad', desc: 'Consulta desde cualquier lugar sin desplazarte',      barColor: '#0085ca', iconBg: 'rgba(0,133,202,0.12)'  },
  { icon: A.iconClockHeart, title: 'Ahorro de tiempo',    desc: 'Atención más eficiente, sin filas de espera',        barColor: '#7e4ed7', iconBg: 'rgba(126,78,215,0.12)' },
  { icon: A.iconCalFav,     title: 'Agenda flexible',     desc: 'Agenda tus citas en el momento que más te acomode', barColor: '#ef9033', iconBg: 'rgba(239,144,51,0.12)' },
  { icon: A.iconSecurity,   title: 'Rápido y seguro',     desc: 'Plataforma confiable para tu atención',              barColor: '#25a337', iconBg: 'rgba(37,163,55,0.12)'  },
]

const INTERVAL = 2500

const SCHEDULE = [
  { days: 'Lunes a Jueves',   hours: '9:00 — 17:30 hrs' },
  { days: 'Viernes y Sábado', hours: '9:00 — 14:00 hrs' },
]

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
      {/* ── HERO ── */}
      <section className="bg-white relative overflow-hidden" style={{ paddingTop: '80px', paddingBottom: '80px', minHeight: '678px' }}>

        {/* Background: photo + white gradient overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/img-hero-new.png"
              alt=""
              className="absolute max-w-none"
              style={{ left: '33.32%', top: '0', width: '69.81%', height: 'auto' }}
            />
          </div>
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(82.17deg, #ffffff 38.16%, rgba(255,255,255,0) 54.17%)' }}
          />
        </div>

        {/* Content container */}
        <div className="relative w-full xl:w-[1200px] mx-auto px-4 xl:px-0">

          {/* Text column */}
          <div className="flex flex-col gap-6 items-center xl:items-start w-full xl:w-[681px] text-center xl:text-left">

            {/* Badge */}
            <div className="flex items-center gap-2.5">
              <img src="/icons/elem-hero-badge.png" alt="" className="w-8 h-[31px] object-contain flex-shrink-0" />
              <span className="text-[#723585] text-[12px] font-semibold uppercase tracking-[0.6px]">NUEVA EXPERIENCIA</span>
            </div>

            {/* Heading */}
            <div className="flex flex-col items-center xl:items-start">
              <h1 className="font-display font-medium text-[36px] leading-[40px] xl:text-[72px] xl:leading-[76px] text-[#212529] m-0">Agenda tu</h1>
              <h1 className="font-display font-bold text-[36px] leading-[40px] xl:text-[72px] xl:leading-[76px] text-[#212529] m-0">videoatención</h1>
            </div>

            {/* Body */}
            <p className="text-[#495057] text-base xl:text-[24px] leading-6 xl:leading-[34px] w-full">
              Atención personalizada desde donde quieras.{' '}
              <br className="hidden xl:block" />
              Resuelve tus trámites sin salir de casa.
            </p>

            {/* CTA */}
            <button
              onClick={onStart}
              className="btn-cta-hero bg-[#0085ca] text-white font-semibold rounded-full px-12 py-[14px] flex items-center justify-center gap-[10px] text-base leading-7 w-full xl:w-auto"
            >
              <img src={A.iconVideoBlue} alt="" className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
              Agendar videoatención
            </button>
          </div>

          {/* Floating confirmation card — desktop only */}
          <div
            className="hidden xl:flex absolute bg-white gap-3 items-center p-4 rounded-2xl"
            style={{
              left: '684px',
              top: '491px',
              boxShadow: '0px 16px 24px rgba(0,0,0,0.12)',
            }}
          >
            <div
              className="rounded-full flex items-center justify-center flex-shrink-0 w-10 h-10"
              style={{ background: 'rgba(53,173,68,0.15)' }}
            >
              <img src="/icons/icon-check-hero.svg" alt="" className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-[12px] leading-4 text-[#212529] whitespace-nowrap">Confirmación Inmediata</span>
              <span className="text-[11px] leading-[16px] text-[#495057]">Hoy · 10:30 hrs</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="bg-white py-12 xl:py-20 flex justify-center">
        <div className="w-full xl:w-[1200px] px-4 xl:px-0 flex flex-col xl:flex-row items-start justify-between gap-8 xl:gap-16">

          {/* Left */}
          <div className="flex flex-col gap-4 xl:gap-6 flex-1">
            <img src={A.elemB1} alt="" className="w-[105px] h-[22px] object-cover" />
            <h2 className="font-display text-[28px] xl:text-[48px] text-[#212529] leading-tight">
              <span className="font-semibold">Resolver tus trámites,</span><br />
              <span className="font-bold">hoy es más simple</span>
            </h2>
          </div>

          {/* Right: feature highlight loop */}
          <div className="flex flex-col gap-5 xl:gap-8 flex-1" aria-live="polite" onMouseLeave={() => setIsPaused(false)}>
            {FEATURES.map(({ icon, title, desc, barColor, iconBg }, i) => {
              const isActive = activeIndex === i
              return (
                <div key={title} className="flex items-stretch gap-3">
                  <div className="progress-track">
                    {isActive && <div key={`${i}-${activeIndex}`} className="progress-bar" style={{ background: barColor }} />}
                  </div>
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

      {/* ── RESERVA RÁPIDA ── */}
      <section className="bg-white pt-10 xl:pt-12 pb-12 xl:pb-20 flex justify-center overflow-hidden">
        <div className="w-full xl:w-[1200px] px-4 xl:px-0 flex flex-col gap-8 xl:gap-12">

          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-[#723585] text-xs font-semibold uppercase tracking-[0.6px]">PROCESO SIMPLE</span>
            <h2 className="font-display text-2xl xl:text-[48px] text-[#212529] leading-tight xl:leading-[50px]">
              <span className="font-semibold">Reserva de manera </span>
              <span className="font-bold">rápida</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 xl:gap-12">
            {/* Background image card */}
            <div className="bg-zoom-wrap relative h-48 xl:h-[448px] rounded-2xl overflow-hidden">
              <img src="/img-bg-features.png" alt="" aria-hidden="true" className="bg-photo absolute inset-0 w-full h-full object-cover object-center" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(85.52deg, rgba(33,37,41,0.3) 11.25%, rgba(255,255,255,0) 84.53%)' }} />
              <div className="bg-zoom-overlay absolute inset-0" />
              <img
                src="/img-elementos-d2.png"
                alt="" aria-hidden="true"
                className="hidden xl:block absolute pointer-events-none"
                style={{ left: '55px', bottom: '48px', width: '72px', height: '77px', objectFit: 'cover', zIndex: 2 }}
              />
              <img
                src={icoBranchCard}
                alt="Ejecutivo de sucursal"
                className="hidden xl:block absolute pointer-events-none branch-card-float"
                style={{ left: '48%', top: '65%', zIndex: 2 }}
              />
            </div>

            {/* Step cards */}
            <div className="flex flex-col xl:flex-row gap-4 xl:gap-6">
              <div className="step-card bg-white border border-[#dee2e6] rounded-2xl flex-1 flex flex-col gap-4 px-8 xl:px-[60px] py-6">
                <div className="flex items-center gap-4">
                  <img src={icoClockCheck} alt="" className="w-9 h-9 flex-shrink-0" />
                  <p className="font-display font-bold text-xl text-[#0085ca] leading-7">Reserva tu hora en minutos</p>
                </div>
                <p className="text-[#495057] text-base leading-6">Elige el día y el horario que mejor te acomoden para conversar con nuestros ejecutivos sin salir de casa.</p>
              </div>
              <div className="step-card bg-white border border-[#dee2e6] rounded-2xl flex-1 flex flex-col gap-4 px-8 xl:px-[60px] py-6">
                <div className="flex items-center gap-4">
                  <img src={icoComputerVideo} alt="" className="w-9 h-9 flex-shrink-0" />
                  <p className="font-display font-bold text-xl text-[#0085ca] leading-7">Conéctate a tu videoatención</p>
                </div>
                <p className="text-[#495057] text-base leading-6">Cuando llegue el momento, accede de forma segura desde cualquier dispositivo y habla con nosotros cara a cara.</p>
              </div>
            </div>
          </div>

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

      {/* ── CTA BLUE ── */}
      <section className="bg-[#0085ca] py-12 xl:py-20 flex justify-center overflow-hidden">
        <div className="w-full xl:w-[1200px] px-4 xl:px-0 flex flex-col xl:flex-row items-start gap-8 xl:gap-6">

          <div className="flex flex-col gap-6 xl:gap-8 items-start w-full xl:w-[690px]">
            <div className="flex flex-col gap-4 xl:gap-6">
              <h2 className="font-display text-[28px] xl:text-[36px] text-white leading-tight xl:leading-[52px]">
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

          <div className="flex flex-col gap-4 xl:gap-8 flex-1 w-full xl:w-auto">
            {SCHEDULE.map(({ days, hours }) => (
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
