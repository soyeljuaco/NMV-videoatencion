/**
 * useAppointments — gestión de estado de las citas del usuario
 */
import { useState, useEffect, useCallback } from 'react'
import {
  fetchAppointments,
  rescheduleAppointment,
  cancelAppointment,
} from '../services/appointmentsService.js'

export function useAppointments() {
  const [appointments, setAppointments] = useState([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAppointments()
      setAppointments(data)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const reschedule = useCallback(async (id, { fecha, hora }) => {
    const updated = await rescheduleAppointment(id, { fecha, hora })
    setAppointments(prev => prev.map(a => (a.id === id ? updated : a)))
    return updated
  }, [])

  const cancel = useCallback(async (id) => {
    const updated = await cancelAppointment(id)
    setAppointments(prev => prev.map(a => (a.id === id ? updated : a)))
    return updated
  }, [])

  return { appointments, loading, error, reschedule, cancel, reload: load }
}
