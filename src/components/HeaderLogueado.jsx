/**
 * HeaderLogueado — DS Nueva Masvida 2026
 * Aparece tras autenticarse con clave de Sucursal Virtual.
 *
 * Props:
 *   nombre          string   — nombre del afiliado (no se muestra, reservado para accesibilidad)
 *   activePage      string   — 'wizard' | 'done' | 'misCitas'
 *   onGoHome        fn       — vuelve a la landing (logo + ícono casa)
 *   onCerrarSesion  fn       — cierra sesión y vuelve a la landing
 *   onMisCitas      fn       — navega a Mis videoatenciones
 *   onAgendar       fn       — navega al wizard (ya logueado)
 */
import { A } from '../assets.js'

const BREADCRUMB = {
  wizard:   'Agendar videoatención',
  done:     'Agendar videoatención',
  misCitas: 'Mis videoatenciones',
}

export default function HeaderLogueado({
  nombre,
  activePage,
  onGoHome,
  onCerrarSesion,
  onMisCitas,
  onAgendar,
}) {
  const breadcrumbLabel = BREADCRUMB[activePage] ?? 'Sucursal Virtual'

  return (
    <header className="w-full sticky top-0 z-40 shadow-sm">

      {/* ── Barra azul principal ──────────────────────────────── */}
      <div className="bg-[#0085ca] h-14 xl:h-[80px] flex items-center px-4 xl:px-10">
        <div className="w-full max-w-full xl:max-w-[1200px] mx-auto flex items-center justify-between gap-4">

          {/* Logo — clic va al home */}
          <button
            onClick={onGoHome}
            aria-label="Ir al inicio"
            className="flex-shrink-0 hover:opacity-85 transition-opacity"
          >
            <img
              src={A.iconLogoSucursalVirtual}
              alt="Nueva Masvida — Sucursal Virtual"
              className="w-[140px] xl:w-auto h-[38px] xl:h-[40px] object-contain"
            />
          </button>

          {/* Nav links — desktop */}
          <nav className="hidden xl:flex items-center gap-1 flex-1 ml-10">
            <NavLink
              label="Agendar videoatención"
              active={activePage === 'wizard' || activePage === 'done'}
              onClick={onAgendar}
            />
            <NavLink
              label="Mis videoatenciones"
              active={activePage === 'misCitas'}
              onClick={onMisCitas}
            />
          </nav>

          {/* Cerrar sesión */}
          <button
            onClick={onCerrarSesion}
            className="text-white text-xs xl:text-sm font-semibold hover:opacity-80 transition-opacity flex items-center gap-1.5 flex-shrink-0"
          >
            Cerrar sesión
          </button>

        </div>
      </div>

      {/* ── Sub-nav mobile ────────────────────────────────────── */}
      <div className="xl:hidden bg-[#006fa8] flex border-b border-[rgba(255,255,255,0.15)]">
        <MobileNavLink
          label="Agendar videoatención"
          active={activePage === 'wizard' || activePage === 'done'}
          onClick={onAgendar}
        />
        <MobileNavLink
          label="Mis videoatenciones"
          active={activePage === 'misCitas'}
          onClick={onMisCitas}
        />
      </div>

      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#dee2e6] h-auto xl:h-[45px] flex items-center px-4 xl:px-10">
        <nav className="w-full max-w-full xl:max-w-[1200px] mx-auto flex items-center gap-2 py-2 xl:py-0">

          {/* Ícono casa — clic va al home */}
          <button
            onClick={onGoHome}
            aria-label="Ir al inicio"
            className="flex items-center hover:opacity-70 transition-opacity"
          >
            <img src={A.iconBreadHome} alt="Inicio" className="w-4 h-4 flex-shrink-0 opacity-60" />
          </button>

          <img src={A.iconBreadChevronSV} alt="" className="w-3 h-3 flex-shrink-0 opacity-40" />
          <span className="text-[#0085ca] text-xs xl:text-sm font-semibold leading-none">
            Videoatención
          </span>
          <img src={A.iconBreadChevronSV} alt="" className="w-3 h-3 flex-shrink-0 opacity-40" />
          <span className="text-[#495057] text-xs xl:text-sm font-normal leading-none">
            {breadcrumbLabel}
          </span>

        </nav>
      </div>

    </header>
  )
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

function NavLink({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm font-semibold transition-colors
        ${active
          ? 'bg-white text-[#0085ca]'
          : 'text-white hover:bg-[rgba(255,255,255,0.15)]'}
      `}
    >
      {label}
    </button>
  )
}

function MobileNavLink({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 py-2 text-xs font-semibold transition-colors border-b-2
        ${active
          ? 'text-white border-white'
          : 'text-[rgba(255,255,255,0.7)] border-transparent hover:text-white'}
      `}
    >
      {label}
    </button>
  )
}
