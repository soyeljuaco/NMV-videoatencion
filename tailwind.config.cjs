/** @type {import('tailwindcss').Config} */

// ─────────────────────────────────────────────────────────────────────────────
// DS Nueva Masvida 2026 — Tailwind Config
// Fuente de verdad sincronizada con variables de Figma (DS Nueva Masvida 2026)
// Nomenclatura: [capa]-[grupo]-[variante] espeja 1:1 los tokens de Figma
// v2026.1 · 2026-06-10
// ─────────────────────────────────────────────────────────────────────────────

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

  theme: {
    // ── Breakpoints ────────────────────────────────────────────────────────
    // Figma: 1-primitive/breakpoint/*
    screens: {
      xs:  '375px',
      sm:  '640px',
      md:  '768px',
      lg:  '1024px',
      xl:  '1280px',
      '2xl': '1536px',
    },

    extend: {

      // ── Tipografía ─────────────────────────────────────────────────────
      // Figma: --font-display (Raleway) · --font-body (Inter)
      fontFamily: {
        display: ['Raleway', 'sans-serif'],   // headings, display
        body:    ['Inter',   'sans-serif'],   // UI, labels, body
      },

      // ── Escala tipográfica ─────────────────────────────────────────────
      // Figma: 2-token/type/*
      fontSize: {
        // Display / Heading — Raleway
        'display-hero':    ['72px', { lineHeight: '76px' }],
        'display-section': ['48px', { lineHeight: '52px' }],
        'heading-xl':      ['48px', { lineHeight: '1' }],
        'heading-lg':      ['32px', { lineHeight: '36px' }],
        'heading-md':      ['20px', { lineHeight: '28px' }],
        'heading-sm':      ['24px', { lineHeight: '32px' }],
        // Body — Inter
        'body-lg':         ['24px', { lineHeight: '34px' }],
        'body-md':         ['20px', { lineHeight: '28px' }],
        'body-sm':         ['18px', { lineHeight: '28px' }],
        // Label — Inter
        'label-lg':        ['16px', { lineHeight: '24px' }],
        'label-md':        ['14px', { lineHeight: '20px' }],
        'label-sm':        ['12px', { lineHeight: '16px' }],
        // Overline · Caption — Inter
        'overline':        ['12px', { lineHeight: '16px', letterSpacing: '0.6px' }],
        'caption':         ['11px', { lineHeight: '16px' }],
      },

      // ── Letter spacing ──────────────────────────────────────────────────
      // Figma: 2-token/letterSpacing/*
      letterSpacing: {
        none:   '0px',
        tight:  '-0.2px',
        wide:   '0.4px',
        button: '0.6px',
      },

      // ── Espaciado ──────────────────────────────────────────────────────
      // Figma: 1-primitive/spacing/*
      // Escala de 4px base, extiende los valores por defecto de Tailwind
      spacing: {
        'sp-1': '4px',
        'sp-2': '8px',
        'sp-3': '12px',
        'sp-4': '16px',
        'sp-5': '20px',
        'sp-6': '24px',
        'sp-7': '32px',
        'sp-8': '48px',
      },

      // ── Border radius ──────────────────────────────────────────────────
      // Figma: 1-primitive/radius/*
      borderRadius: {
        sm:   '4px',
        md:   '8px',
        lg:   '12px',
        xl:   '16px',
        pill: '9999px',
      },

      // ── Border width ───────────────────────────────────────────────────
      // Figma: 1-primitive/border-width/*
      borderWidth: {
        DEFAULT:  '1px',
        selected: '2px',
        focus:    '3px',
      },

      // ── Sombras ────────────────────────────────────────────────────────
      // Figma: 1-primitive/shadow/*
      boxShadow: {
        floating: '0px 4px 16px 0px rgba(0,0,0,0.10)',
        hero:     '0px 8px 32px -4px rgba(0,0,0,0.12)',
        modal:    '0px 24px 48px 0px rgba(0,0,0,0.14)',
        // Componentes — wizard card + stepper activo
        wizard:   '0px 20px 25px -5px rgba(0,0,0,0.10), 0px 8px 10px -6px rgba(0,0,0,0.10)',
        step:     '0px 10px 15px -3px rgba(0,145,206,0.30)',
      },

      // ── Motion / Duración ─────────────────────────────────────────────
      // Figma: 1-primitive/motion/duration/*
      transitionDuration: {
        instant: '80ms',
        fast:    '150ms',
        normal:  '250ms',
        slow:    '400ms',
        slower:  '600ms',
      },

      // ── Opacidad ───────────────────────────────────────────────────────
      // Figma: 1-primitive/opacity/*
      opacity: {
        0:   '0',
        6:   '0.06',
        8:   '0.08',
        10:  '0.10',
        12:  '0.12',
        15:  '0.15',
        20:  '0.20',
        25:  '0.25',
        50:  '0.50',
        70:  '0.70',
        100: '1',
      },

      // ── Colores ────────────────────────────────────────────────────────
      colors: {

        // ──────────────────────────────────────────────────────────────────
        // CAPA 1 — PRIMITIVOS
        // Figma: 1-primitive/color/*
        // NO usar directamente en componentes — usar tokens semánticos
        // ──────────────────────────────────────────────────────────────────
        primitive: {
          blue: {
            50:          '#E6F4FB',
            500:         '#0085CA',
            700:         '#0069A3',
            'alpha-15':  'rgba(0,133,202,0.15)',
            'alpha-15-alt': 'rgba(0,145,206,0.15)',
          },
          purple: {
            50:         '#EDE1EE',
            500:        '#713474',
            'alpha-15': 'rgba(113,52,116,0.15)',
          },
          orange: {
            50:         '#FDF3E7',
            500:        '#EF9033',
            'alpha-10': 'rgba(239,144,51,0.10)',
            warning: {
              50:  '#FFF8ED',
              500: '#FD7E14',
              700: '#E8690A',
            },
          },
          green: {
            50:         '#E5F7E7',
            500:        '#35AD44',
            'alpha-15': 'rgba(53,173,68,0.15)',
            'alpha-10': 'rgba(53,173,68,0.10)',
          },
          red: {
            50:  '#FFF5F5',
            500: '#DC3545',
            700: '#B02A37',
          },
          gray: {
            50:         '#F8F9FA',
            100:        '#F5F7FA',
            150:        '#E9ECEF',
            200:        '#DEE2E6',
            250:        '#CED4DA',
            300:        '#ADB5BD',
            400:        '#868E96',
            500:        '#6C757D',
            600:        '#5C636A',
            700:        '#495057',
            800:        '#343A40',
            900:        '#212529',
            'alpha-10': 'rgba(108,117,125,0.10)',
          },
          white:       '#FFFFFF',
          transparent: 'rgba(0,0,0,0)',
        },

        // ──────────────────────────────────────────────────────────────────
        // CAPA 2 — TOKENS SEMÁNTICOS
        // Figma: 2-token/color/*
        // Usar en componentes. Apuntan a primitivos como aliases.
        // ──────────────────────────────────────────────────────────────────

        // Marca
        brand: {
          primary:       '#0085CA',   // → blue/500
          'primary-hover': '#0069A3', // → blue/700
          secondary:     '#713474',   // → purple/500
          accent:        '#EF9033',   // → orange/500
          'accent-subtle': '#FDF3E7', // → orange/50
        },

        // Acción
        action: {
          'primary-bg':       '#0085CA', // → blue/500
          'primary-bg-hover': '#0069A3', // → blue/700
          'primary-text':     '#FFFFFF', // → white
          'secondary-bg':     '#FFFFFF', // → white
          'secondary-text':   '#0085CA', // → blue/500
        },

        // Navegación
        nav: {
          bg:   '#0085CA', // → blue/500
          text: '#FFFFFF', // → white
        },

        // Superficies
        surface: {
          default:      '#FFFFFF',                   // → white
          subtle:       '#F5F7FA',                   // → gray/100
          brand:        '#0085CA',                   // → blue/500
          'input-bg':   '#F8F9FA',                   // → gray/50
          transparent:  'rgba(0,0,0,0)',             // → transparent
          'overlay-white': 'rgba(255,255,255,0.10)', // → white α10%
          'icon-blue':  'rgba(0,133,202,0.15)',      // → blue/alpha-15
          'icon-purple':'rgba(113,52,116,0.15)',     // → purple/alpha-15
          'icon-green': 'rgba(53,173,68,0.10)',      // → green/alpha-10
          'icon-orange':'rgba(239,144,51,0.10)',     // → orange/alpha-10
          'icon-gray':  'rgba(108,117,125,0.10)',    // → gray/alpha-10
        },

        // Texto
        text: {
          primary:     '#212529', // → gray/900
          secondary:   '#495057', // → gray/700
          tertiary:    '#6C757D', // → gray/500
          muted:       '#5C636A', // → gray/600
          placeholder: '#868E96', // → gray/400
          disabled:    '#ADB5BD', // → gray/300
          'on-brand':  '#FFFFFF', // → white
          brand:       '#0085CA', // → blue/500
          accent:      '#713474', // → purple/500
          success:     '#35AD44', // → green/500
        },

        // Bordes
        border: {
          default:  '#DEE2E6', // → gray/200
          input:    '#CED4DA', // → gray/250
          strong:   '#ADB5BD', // → gray/300
          divider:  '#E9ECEF', // → gray/150
          selected: '#0085CA', // → blue/500
        },

        // Estados de interacción
        state: {
          'selected-bg':     '#E6F4FB',              // → blue/50
          'selected-border': '#0085CA',              // → blue/500
          'hover-fill':      '#F5F7FA',              // → gray/100
          'hover-overlay':   'rgba(0,133,202,0.15)', // → blue/alpha-15
          'active-fill':     '#E6F4FB',              // → blue/50
          'active-border':   '#0085CA',              // → blue/500
          'disabled-bg':     '#F5F7FA',              // → gray/100
          'disabled-text':   '#ADB5BD',              // → gray/300
          'focus-ring':      '#0085CA',              // → blue/500
          // Error
          'error-bg':        '#FFF5F5', // → red/50
          'error-border':    '#DC3545', // → red/500
          'error-text':      '#DC3545', // → red/500
          'error-icon':      '#DC3545', // → red/500
          'error-subtle':    '#FFF5F5', // → red/50
          // Warning
          'warning-bg':      '#FFF8ED', // → orange/warning/50
          'warning-border':  '#FD7E14', // → orange/warning/500
          'warning-text':    '#E8690A', // → orange/warning/700
          'warning-icon':    '#FD7E14', // → orange/warning/500
          'warning-subtle':  '#FFF8ED', // → orange/warning/50
          // Success
          'success-bg':      '#E5F7E7', // → green/50
          'success-border':  '#35AD44', // → green/500
          'success-text':    '#35AD44', // → green/500
          'success-icon':    '#35AD44', // → green/500
          // Info
          'info-bg':         '#E6F4FB', // → blue/50
          'info-border':     '#0085CA', // → blue/500
          'info-text':       '#0085CA', // → blue/500
          'info-icon':       '#0085CA', // → blue/500
        },

        // Steps / Stepper
        step: {
          active:    '#0085CA', // → blue/500
          completed: '#35AD44', // → green/500
          inactive:  '#DEE2E6', // → gray/200
        },

        // ──────────────────────────────────────────────────────────────────
        // CAPA 3 — TOKENS DE COMPONENTE
        // Figma: 3-component/*
        // Apuntan a tokens semánticos. Usar solo dentro del componente.
        // ──────────────────────────────────────────────────────────────────
        button: {
          primary: {
            'bg-rest':       '#0085CA', // → action/primary-bg
            'bg-hover':      '#0069A3', // → action/primary-bg-hover
            'bg-disabled':   '#DEE2E6', // → state/disabled-bg
            'text-rest':     '#FFFFFF', // → action/primary-text
            'text-disabled': '#ADB5BD', // → state/disabled-text
            'border-focus':  '#0085CA', // → state/focus-ring
          },
          secondary: {
            'bg-rest':    '#FFFFFF', // → surface/default
            'bg-hover':   '#E6F4FB', // → state/selected-bg
            'text-rest':  '#0085CA', // → action/secondary-text
            'border-rest':'#0085CA', // → action/secondary-text
          },
          ghost: {
            'bg-rest':   'rgba(0,0,0,0)', // → surface/transparent
            'bg-hover':  '#F5F7FA',        // → state/hover-fill
            'text-rest': '#0085CA',        // → text/brand
          },
          accent: {
            'bg-rest':   '#EF9033', // → brand/accent
            'bg-hover':  '#0069A3', // → brand/primary-hover
            'text-rest': '#FFFFFF', // → text/on-brand
          },
        },

        input: {
          'bg-rest':          '#F8F9FA', // → surface/input-bg
          'bg-focus':         '#FFFFFF', // → surface/default
          'bg-disabled':      '#F5F7FA', // → state/disabled-bg
          'bg-error':         '#FFF5F5', // → state/error-bg
          'border-rest':      '#CED4DA', // → border/input
          'border-focus':     '#0085CA', // → state/focus-ring
          'border-error':     '#DC3545', // → state/error-border
          'border-disabled':  '#DEE2E6', // → border/default
          'text-rest':        '#212529', // → text/primary
          'text-placeholder': '#868E96', // → text/placeholder
          'text-disabled':    '#ADB5BD', // → state/disabled-text
          'text-error':       '#DC3545', // → state/error-text
          label:              '#6C757D', // → text/tertiary
          'helper-default':   '#6C757D', // → text/tertiary
          'helper-error':     '#DC3545', // → state/error-text
          'helper-success':   '#35AD44', // → state/success-text
        },

        card: {
          bg:               '#FFFFFF',              // → surface/default
          'border-rest':    '#DEE2E6',              // → border/default
          'border-selected':'#0085CA',              // → state/selected-border
          'bg-selected':    '#E6F4FB',              // → state/selected-bg
          'bg-hover':       'rgba(0,133,202,0.15)', // → state/hover-overlay
        },
      },
    },
  },

  plugins: [],
}
