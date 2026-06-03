/**
 * useAppointmentStatus — estado en tiempo real del botón de ingreso
 *
 * Retorna:
 *   'inactive' — la cita está a más de 10 min
 *   'soon'     — dentro de los próximos 10 min (botón azul pulsante)
 *   'now'      — durante la cita (hasta 30 min después de la hora) (botón verde)
 *   'past'     — la cita ya terminó
 *
 * Se recalcula cada 30 segundos.
 */
import { useState, useEffect } from 'react'

function computeStatus(fecha, hora) {
  if (!fecha || !hora) return 'inactive'
  const [y, mo, d] = fecha.split('-').map(Number)
  const [h, mi]    = hora.split(':').map(Number)
  const aptTime    = new Date(y, mo - 1, d, h, mi, 0)
  const diffMin    = (aptTime - Date.now()) / 60_000

  if (diffMin > 10)  return 'inactive'
  if (diffMin > 0)   return 'soon'
  if (diffMin > -30) return 'now'
  return 'past'
}

export function useAppointmentStatus(fecha, hora) {
  const [status, setStatus] = useState(() => computeStatus(fecha, hora))

  useEffect(() => {
    const update = () => setStatus(computeStatus(fecha, hora))
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [fecha, hora])

  return status
}
