/**
 * appointmentsService.js — Mock del servicio de citas
 * No existe API real: se simula con datos en memoria.
 * En producción: reemplazar fetch* con llamadas a /api/citas o equivalente.
 */

export const MOTIVO_LABELS = {
  orientacion:  'Orientación',
  ges:          'GES / CAEC',
  presupuestos: 'Presupuestos y Programas Médicos',
  servicio:     'Servicio al Cliente',
  tramite:      'Trámite Administrativo',
}

export const SUCURSAL_LABELS = {
  norte:  'Zona Norte',
  centro: 'Zona Centro',
  sur:    'Zona Sur',
}

export function getMotivo(key)   { return MOTIVO_LABELS[key]   || key }
export function getSucursal(key) { return SUCURSAL_LABELS[key] || key }

// ── In-memory store ────────────────────────────────────────────────────────────
let _store = [
  {
    id:        'apt-001',
    motivo:    'orientacion',
    sucursal:  'centro',
    ejecutivo: 'Valentina Muñoz',
    fecha:     '2026-06-10',
    hora:      '14:30',
    videoUrl:  'https://meet.nuevamasvida.cl/apt-001',
    status:    'upcoming', // 'upcoming' | 'past' | 'cancelled'
    createdAt: '2026-05-28T10:00:00',
  },
  {
    id:        'apt-002',
    motivo:    'ges',
    sucursal:  'norte',
    ejecutivo: 'Pablo Contreras',
    fecha:     '2026-05-20',
    hora:      '15:00',
    videoUrl:  'https://meet.nuevamasvida.cl/apt-002',
    status:    'past',
    createdAt: '2026-05-10T09:30:00',
  },
]

function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

/** Devuelve todas las citas del usuario autenticado */
export async function fetchAppointments() {
  await delay(320)
  return _store.map(a => ({ ...a }))
}

/** Reagenda una cita: cambia fecha y hora */
export async function rescheduleAppointment(id, { fecha, hora }) {
  await delay(420)
  _store = _store.map(a =>
    a.id === id ? { ...a, fecha, hora, status: 'upcoming' } : a
  )
  return { ..._store.find(a => a.id === id) }
}

/** Anula una cita */
export async function cancelAppointment(id) {
  await delay(380)
  _store = _store.map(a =>
    a.id === id ? { ...a, status: 'cancelled' } : a
  )
  return { ..._store.find(a => a.id === id) }
}
