/**
 * tokens.js — Design System Nueva Masvida 2026
 * Fuente única de verdad para colores, tipografía, espaciado,
 * radios y sombras usados en toda la plataforma.
 *
 * Uso en JSX:   import { color, font, radius } from '../tokens'
 * Uso en CSS:   var(--color-primary)   [si se genera con injectCSSVars()]
 */

// ─────────────────────────────────────────────
// COLORES
// ─────────────────────────────────────────────

export const color = {
  // ── Marca principal ──────────────────────────
  primary:          '#0085ca',   // Azul NMV — botones, links, selección
  primaryHover:     '#0074b0',   // Hover del azul primario
  primaryLight:     'rgba(0,133,202,0.10)',  // Fondos de botones inactivos
  primaryLighter:   'rgba(0,133,202,0.05)',  // Fondo wizard-tag
  primarySubtle:    'rgba(0,133,202,0.04)',  // Fondo card seleccionada
  primaryFocusRing: 'rgba(0,133,202,0.15)',  // Ring de foco en inputs
  primaryIconBg:    'rgba(0,133,202,0.12)',  // Círculo de ícono en modales
  primarySoftBg:    'rgba(0,133,202,0.08)',  // Empty state, icon bg tenue
  primaryVideoBg:   'rgba(0,145,206,0.15)',  // Variante de ícono ejecutivo

  // ── Marca secundaria — Púrpura ───────────────
  purple:           '#713474',   // Brand purple (beneficios, iconos)
  purpleAlt:        '#723585',   // Variante alt del púrpura
  purpleAccent:     '#7e4ed7',   // Eyebrow / badge acento
  purpleSoft:       'rgba(113,52,116,0.15)',  // Fondo íconos beneficios

  // ── Acento — Naranja ─────────────────────────
  orange:           '#ef9033',   // Acento / warnings suaves
  orangeHover:      '#d87f25',   // Hover naranja
  orangeSoft:       'rgba(239,144,51,0.15)',  // Fondo card Sucursal Virtual

  // ── Estado — Verde (éxito / confirmación) ────
  green:            '#25a337',   // Confirmación, botón confirmar cita
  greenHover:       '#1e8c2d',   // Hover verde
  greenSoft:        'rgba(53,173,68,0.15)',   // Fondo ícono check

  // ── Texto ────────────────────────────────────
  textPrimary:      '#212529',   // Títulos, texto fuerte
  textBody:         '#495057',   // Cuerpo de texto, labels
  textMuted:        '#50606e',   // Labels de sección, subtítulo tenue
  textSubtle:       '#6c757d',   // Slots ocupados, texto deshabilitado
  textPlaceholder:  '#adb5bd',   // Placeholder de inputs
  textInverse:      '#ffffff',   // Texto sobre fondos oscuros/primarios

  // ── Superficies y fondos ─────────────────────
  white:            '#ffffff',
  bgPage:           '#f5f7fa',   // Fondo de secciones (hero, wizard)
  bgCardLight:      '#f9fcfe',   // Resumen sidebar, cards internas
  bgDisabled:       '#f8f9fa',   // Input deshabilitado
  bgOccupied:       '#e9ecef',   // Slot ocupado en horario
  bgDark:           '#212529',   // Botón "Entendido" modal no-afiliado
  bgDarkHover:      '#343a40',   // Hover fondo oscuro

  // ── Bordes ───────────────────────────────────
  borderDefault:    '#dee2e6',   // Bordes generales, separadores
  borderInput:      '#ced4da',   // Bordes de inputs
  borderWizard:     '#d8e7f0',   // Borde del card wizard principal
  borderHr:         '#e0e0e0',   // Línea divisoria footer wizard
  borderPrimary:    '#0085ca',   // Borde elemento activo/seleccionado
  borderTag:        'rgba(0,133,202,0.3)',  // Borde wizard-tag

  // ── Overlay ──────────────────────────────────
  overlay:          'rgba(0,0,0,0.30)',   // Fondo de modales
}

// ─────────────────────────────────────────────
// TIPOGRAFÍA
// ─────────────────────────────────────────────

export const font = {
  // ── Familias ─────────────────────────────────
  heading: "'Raleway', sans-serif",   // H1–H6, títulos de pasos
  body:    "'Inter', sans-serif",     // Todo el resto (UI, labels, párrafos)

  // ── Tamaños (en px) ──────────────────────────
  size: {
    micro:      '10px',   // Día del mes en picker (abreviado)
    caption:    '11px',   // Sub-labels de floating cards
    xs:         '12px',   // Labels uppercase (NOMBRE, RUT…), leyenda
    sm:         '14px',   // Botones, slots de hora, texto general pequeño
    base:       '16px',   // Cuerpo principal, subtítulos de paso
    lg:         '18px',   // Beneficios — título de beneficio
    xl:         '20px',   // Subtítulo hero, modal body
    '2xl':      '24px',   // Títulos de paso (h3 wizard)
    '3xl':      '32px',   // Reserva Rápida h2
    '4xl':      '36px',   // CTA azul h2
    display:    '48px',   // Sección h2 principal
    hero:       '72px',   // H1 hero
  },

  // ── Pesos ────────────────────────────────────
  weight: {
    regular:    '400',
    medium:     '500',
    semibold:   '600',
    bold:       '700',
    extrabold:  '800',
  },

  // ── Interlineado (line-height) ────────────────
  leading: {
    tight:    '1.15',   // display / hero headings
    snug:     '1.25',   // headings medianos
    normal:   '1.5',    // cuerpo base
    relaxed:  '1.625',  // subtítulo hero
    loose:    '1.75',   // beneficios, lista
  },

  // ── Tracking (letter-spacing) ─────────────────
  tracking: {
    label:  '0.6px',   // Labels uppercase en formularios y resumen
    wide:   '0.05em',  // Eyebrow / badge superior
  },
}

// ─────────────────────────────────────────────
// ESPACIADO
// ─────────────────────────────────────────────
// Basado en la escala Tailwind × 4px

export const space = {
  0:    '0px',
  1:    '4px',
  1.5:  '6px',
  2:    '8px',
  2.5:  '10px',
  3:    '12px',
  4:    '16px',
  5:    '20px',
  6:    '24px',
  8:    '32px',
  10:   '40px',
  12:   '48px',
  14:   '56px',
  16:   '64px',
  20:   '80px',  // Padding vertical de secciones (py-20)
}

// ─────────────────────────────────────────────
// BORDER RADIUS
// ─────────────────────────────────────────────

export const radius = {
  sm:    '8px',      // rounded-lg  — tarjetas pequeñas, slots
  md:    '12px',     // rounded-xl  — slots de hora
  lg:    '16px',     // rounded-2xl — inputs, cards internas, modales internos
  xl:    '32px',     // rounded-[32px] — wizard card, modales
  hero:  '40px',     // rounded-[40px] — imagen hero
  pill:  '9999px',   // rounded-full — botones, badges, chips
}

// ─────────────────────────────────────────────
// SOMBRAS
// ─────────────────────────────────────────────

export const shadow = {
  wizard: '0px 20px 25px -5px rgba(0,0,0,0.10), 0px 8px 10px -6px rgba(0,0,0,0.10)',
  card:   '0px 25px 50px 12px rgba(0,0,0,0.25)',
  float:  '0px 16px 8px rgba(0,0,0,0.25)',
  step:   '0px 10px 15px -3px rgba(0,145,206,0.30)',
  modal:  '0px 20px 60px -10px rgba(0,0,0,0.20)',
  input:  '0 0 0 3px rgba(0,133,202,0.15)',  // focus ring
  sm:     '0px 1px 3px rgba(0,0,0,0.12)',
  md:     '0px 4px 12px rgba(0,0,0,0.10)',
}

// ─────────────────────────────────────────────
// LAYOUT — Anchos de contenedor
// ─────────────────────────────────────────────

export const layout = {
  container:   '1200px',  // Ancho máximo de secciones
  wizard:      '996px',   // Wizard + encabezado de sección
  heroImage:   '560px',   // Imagen hero (ancho)
  heroImageH:  '549px',   // Imagen hero (alto proporcional)
  summaryCard: '588px',   // Tarjeta resumen ConfirmFinal
  modalSm:     '500px',   // Modales RUT / Clave
  modalMd:     '520px',   // Modal No Afiliado
  modalLg:     '680px',   // Modal Paso 1
}

// ─────────────────────────────────────────────
// Z-INDEX
// ─────────────────────────────────────────────

export const zIndex = {
  base:            0,
  dropdown:       10,
  calendarBackdrop: 998,
  calendar:       999,
  modal:           50,   // clase z-50 de Tailwind = 50
}

// ─────────────────────────────────────────────
// TRANSICIONES
// ─────────────────────────────────────────────

export const transition = {
  fast:    'all 150ms ease',
  default: 'all 200ms ease',
  slow:    'all 300ms ease',
}

// ─────────────────────────────────────────────
// ICONOS — Filtros CSS para recolorear PNGs
// ─────────────────────────────────────────────

export const iconFilter = {
  // Convierte cualquier PNG oscuro a #0085CA
  primary: 'brightness(0) saturate(100%) invert(35%) sepia(94%) saturate(578%) hue-rotate(167deg) brightness(102%) contrast(104%)',
  // Convierte a blanco puro
  white: 'brightness(0) invert(1)',
}

// ─────────────────────────────────────────────
// EXPORT DEFAULT — objeto unificado
// ─────────────────────────────────────────────

const tokens = { color, font, space, radius, shadow, layout, zIndex, transition, iconFilter }
export default tokens
