import { useState, useRef, useEffect } from 'react'
import Header from './components/Header.jsx'
import HeaderLogueado from './components/HeaderLogueado.jsx'
import Footer from './components/Footer.jsx'
import WizardStepper from './components/WizardStepper.jsx'
import Landing from './pages/Landing.jsx'
import Step1Motivo from './pages/Step1Motivo.jsx'
import Step2Sucursal from './pages/Step2Sucursal.jsx'
import Step3Hora from './pages/Step3Hora.jsx'
import Step4Confirm from './pages/Step4Confirm.jsx'
import ConfirmFinal from './pages/ConfirmFinal.jsx'
import MisCitas from './pages/SucursalVirtual/MisCitas/MisCitas.jsx'
import CentroDeAyuda from './pages/CentroDeAyuda/CentroDeAyuda.jsx'
import ModalRutValidacion from './dialogs/ModalRutValidacion.jsx'
import ModalClaveSucursal from './dialogs/ModalClaveSucursal.jsx'
import ModalNoAfiliado from './dialogs/ModalNoAfiliado.jsx'
import ModalPaso1 from './dialogs/ModalPaso1.jsx'

const INITIAL = {
  motivo: null, sucursal: null, fecha: null, hora: null,
  nombre: '', rut: '', telefono: '', email: '',
}

/**
 * Simula la obtención del nombre del afiliado desde la Sucursal Virtual.
 * En producción, este dato vendría de la API tras autenticar con RUT + clave.
 */
function fetchNombreAfiliado(rut) {
  const NOMBRES = [
    'María González', 'Juan Pérez', 'Ana Martínez',
    'Carlos López', 'Patricia Rodríguez', 'Jorge Soto',
    'Claudia Fuentes', 'Rodrigo Herrera',
  ]
  const digits = rut.replace(/\D/g, '')
  const idx    = digits.split('').reduce((acc, d) => acc + parseInt(d), 0) % NOMBRES.length
  return NOMBRES[idx]
}

// ── URL ↔ page mapping ───────────────────────────────────────────────────────
const PATH_MAP = { '/centro-de-ayuda': 'centroDeAyuda' }
function pageFromPath(path) { return PATH_MAP[path] ?? 'landing' }

export default function App() {
  const [page, setPage]       = useState(() => pageFromPath(window.location.pathname))
  const [step, setStep]       = useState(1)
  const [booking, setBooking] = useState(INITIAL)
  const [modal, setModal]     = useState(null) // null | 'rut' | 'clave' | 'noAfiliado' | 'paso1'
  const [rutIngresado, setRutIngresado] = useState('')
  const wizardRef     = useRef(null)
  const wizardCardRef = useRef(null) // apunta al card blanco del wizard

  // Handle browser back/forward
  useEffect(() => {
    function onPop() { setPage(pageFromPath(window.location.pathname)) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  function scrollToWizard() {
    setTimeout(() => {
      if (window.innerWidth >= 1280) {
        // Desktop: centra el foco en el card del wizard (stepper + paso)
        const el = wizardCardRef.current
        if (!el) return
        const headerH = document.querySelector('header')?.offsetHeight ?? 177
        const top = el.getBoundingClientRect().top + window.scrollY - headerH - 24
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
      } else {
        // Mobile: sube al inicio (el wizard ocupa toda la pantalla)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 50)
  }

  function goToStep(n) {
    setStep(n)
    scrollToWizard()
  }

  function set(key, val) {
    setBooking(b => ({ ...b, [key]: val }))
  }

  function handleStepSelect(key, val) {
    set(key, val)
    if (key === 'fecha') set('hora', null)
  }

  // ── RUT flow ────────────────────────────────────────────
  function openRutModal() {
    setModal('rut')
  }

  function handleRutValid(rut) {
    setRutIngresado(rut)
    setModal('clave')
  }

  function handleRutInvalid(rut) {
    setRutIngresado(rut)
    setModal('noAfiliado')
  }

  function handleClaveOk() {
    setModal(null)
    // Pre-fill RUT + nombre from sucursal virtual data
    const nombre = fetchNombreAfiliado(rutIngresado)
    setBooking({ ...INITIAL, rut: rutIngresado, nombre })
    setPage('wizard')
    setStep(1)
    scrollToWizard()
  }

  // ── Wizard navigation ────────────────────────────────────
  function goNext() {
    // After step 1: show Paso1 dialog ONLY for "trámite administrativo"
    if (step === 1 && booking.motivo === 'tramite') {
      setModal('paso1')
      return
    }
    if (step < 4) {
      setStep(s => s + 1)
      scrollToWizard()
    } else {
      setPage('done')
      scrollToWizard()
    }
  }

  function goBack() {
    if (step > 1) {
      setStep(s => s - 1)
      scrollToWizard()
    }
  }

  function restart() {
    setPage('landing')
    setStep(1)
    setBooking(INITIAL)
    setRutIngresado('')
    setModal(null)
    window.history.pushState({}, '', '/')
  }

  // "Agendar otra cita" — vuelve al paso 1 sin cerrar sesión
  function agendarOtra() {
    setBooking(b => ({ ...INITIAL, rut: b.rut, nombre: b.nombre }))
    setPage('wizard')
    setStep(1)
    scrollToWizard()
  }

  // ── Mis Citas navigation ─────────────────────────────────
  function goToMisCitas() {
    setPage('misCitas')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Centro de Ayuda navigation ───────────────────────────
  function goToCentroDeAyuda() {
    setPage('centroDeAyuda')
    window.history.pushState({}, '', '/centro-de-ayuda')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Stepper: use step; if done show 5 (all green)
  const stepperCurrent = page === 'done' ? 5 : step

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ── Modals ── */}
      {modal === 'rut' && (
        <ModalRutValidacion
          onValid={handleRutValid}
          onInvalid={handleRutInvalid}
          onCancel={() => setModal(null)}
        />
      )}
      {modal === 'clave' && (
        <ModalClaveSucursal
          onSuccess={handleClaveOk}
          onCancel={() => setModal(null)}
        />
      )}
      {modal === 'noAfiliado' && (
        <ModalNoAfiliado
          rut={rutIngresado}
          onTryOther={() => setModal('rut')}
          onClose={() => setModal(null)}
        />
      )}
      {modal === 'paso1' && (
        <ModalPaso1
          motivo={booking.motivo}
          onGoSucursal={() => { setModal(null); restart() }}
          onContinue={() => { setModal(null); goToStep(2) }}
          onSalir={() => { setModal(null); restart() }}
        />
      )}

      {(page === 'wizard' || page === 'done' || page === 'misCitas')
        ? (
          <HeaderLogueado
            nombre={booking.nombre}
            activePage={page}
            onGoHome={restart}
            onCerrarSesion={restart}
            onMisCitas={goToMisCitas}
            onAgendar={agendarOtra}
          />
        )
        : (
          <Header
            onGoHome={restart}
            onCentroDeAyuda={goToCentroDeAyuda}
            onVideoAtencion={restart}
            breadcrumbLabel={page === 'centroDeAyuda' ? 'Centro de ayuda' : 'Videoatención'}
          />
        )
      }

      <main className="flex-1">
        {page === 'landing' && (
          <Landing onStart={openRutModal} />
        )}

        {page === 'centroDeAyuda' && (
          <CentroDeAyuda
            onAgendar={openRutModal}
            onGoHome={restart}
          />
        )}

        {page === 'misCitas' && (
          <MisCitas onAgendar={agendarOtra} />
        )}

        {(page === 'wizard' || page === 'done') && (
          <section ref={wizardRef} className="bg-[#f5f7fa] xl:py-20 flex justify-center">
            <div className="w-full xl:w-[1200px] flex justify-center">
              <div className="w-full xl:w-[996px] flex flex-col xl:gap-12 items-center">
                {/* Section header — desktop only */}
                <div className="hidden xl:flex text-center w-full flex-col gap-4">
                  <p className="text-[#7e4ed7] text-sm font-semibold uppercase tracking-wider">Nueva experiencia</p>
                  <div className="flex flex-col gap-4">
                    <h2 className="font-raleway font-bold text-[48px] text-[#212529] leading-tight">
                      Agenda tu videoatención
                    </h2>
                    <p className="text-[#495057] text-base leading-6">
                      Cuatro pasos rápidos. Elige cuándo te acomoda y nosotros confirmamos al instante.
                    </p>
                  </div>
                </div>

                {/* Wizard card — full-screen mobile, rounded desktop */}
                <div ref={wizardCardRef} className="bg-white xl:border xl:border-[#d8e7f0] xl:rounded-[32px] xl:shadow-wizard w-full min-h-[calc(100dvh-64px)] xl:min-h-0 overflow-hidden">
                  <WizardStepper current={stepperCurrent} />

                  {page === 'wizard' && step === 1 && (
                    <Step1Motivo
                      motivo={booking.motivo}
                      onSelect={v => set('motivo', v)}
                      onNext={goNext}
                      onExit={restart}
                    />
                  )}

                  {page === 'wizard' && step === 2 && (
                    <Step2Sucursal
                      motivo={booking.motivo}
                      sucursal={booking.sucursal}
                      onSelect={v => set('sucursal', v)}
                      onNext={goNext}
                      onBack={goBack}
                      onEditMotivo={() => goToStep(1)}
                    />
                  )}

                  {page === 'wizard' && step === 3 && (
                    <Step3Hora
                      motivo={booking.motivo}
                      sucursal={booking.sucursal}
                      fecha={booking.fecha}
                      hora={booking.hora}
                      onSelect={handleStepSelect}
                      onNext={goNext}
                      onBack={goBack}
                      onEditMotivo={() => goToStep(1)}
                      onEditSucursal={() => goToStep(2)}
                    />
                  )}

                  {page === 'wizard' && step === 4 && (
                    <Step4Confirm
                      motivo={booking.motivo}
                      sucursal={booking.sucursal}
                      fecha={booking.fecha}
                      hora={booking.hora}
                      nombre={booking.nombre}
                      rut={booking.rut}
                      telefono={booking.telefono}
                      email={booking.email}
                      onChange={set}
                      onNext={goNext}
                      onBack={goBack}
                      onEditMotivo={() => goToStep(1)}
                      onEditSucursal={() => goToStep(2)}
                      onEditFecha={() => goToStep(3)}
                    />
                  )}

                  {page === 'done' && (
                    <ConfirmFinal
                      motivo={booking.motivo}
                      sucursal={booking.sucursal}
                      fecha={booking.fecha}
                      hora={booking.hora}
                      email={booking.email}
                      onRestart={restart}
                      onAgendarOtra={agendarOtra}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
