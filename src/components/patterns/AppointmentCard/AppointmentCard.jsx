/**
 * AppointmentCard — tarjeta de cita individual
 *
 * Props:
 *   appointment  object  — cita del servicio
 *   onReschedule fn      — recibe el objeto appointment
 *   onCancel     fn      — recibe el objeto appointment
 */
import { useAppointmentStatus } from '../../../hooks/useAppointmentStatus.js'
import { getMotivo, getSucursal } from '../../../services/appointmentsService.js'
import './AppointmentCard.css'

const DAYS_ES   = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado']
const MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']

function formatDate(fecha) {
  const [y, mo, d] = fecha.split('-').map(Number)
  const date  = new Date(y, mo - 1, d)
  return `${DAYS_ES[date.getDay()]} ${d} de ${MONTHS_ES[mo - 1]} ${y}`
}

const BADGE = {
  upcoming:  { label: 'Próxima',    cls: 'apt-badge--upcoming'  },
  past:      { label: 'Completada', cls: 'apt-badge--past'      },
  cancelled: { label: 'Cancelada',  cls: 'apt-badge--cancelled' },
}

export default function AppointmentCard({ appointment, onReschedule, onCancel }) {
  const { motivo, sucursal, ejecutivo, fecha, hora, videoUrl, status } = appointment
  const joinStatus = useAppointmentStatus(fecha, hora)
  const isCancelled = status === 'cancelled'
  const isPast      = status === 'past' || (status === 'upcoming' && joinStatus === 'past')

  const badge = BADGE[status] ?? BADGE.upcoming

  return (
    <article className={`apt-card${isCancelled ? ' apt-card--cancelled' : ''}`}>

      {/* Badge */}
      <div>
        <span className={`apt-badge ${badge.cls}`}>{badge.label}</span>
      </div>

      {/* Body: info + actions */}
      <div className="apt-card__body">

        {/* Info */}
        <div className="apt-card__info">
          <p className="apt-card__date">{formatDate(fecha)} · {hora} hrs</p>
          <h3 className="apt-card__motivo">{getMotivo(motivo)}</h3>
          <p className="apt-card__meta">
            {getSucursal(sucursal)}
            {ejecutivo && <> &middot; {ejecutivo}</>}
          </p>
        </div>

        {/* Actions — ocultar si cancelada */}
        {!isCancelled && (
          <div className="apt-card__actions">

            {/* Botón ingreso — no mostrar si ya pasó */}
            {!isPast && <JoinButton status={joinStatus} videoUrl={videoUrl} />}

            {/* Reagendar / Cancelar — solo próximas no pasadas */}
            {status === 'upcoming' && !isPast && (
              <>
                <button
                  className="apt-btn apt-btn--ghost"
                  onClick={() => onReschedule(appointment)}
                >
                  Reagendar
                </button>
                <button
                  className="apt-btn apt-btn--danger"
                  onClick={() => onCancel(appointment)}
                >
                  Anular
                </button>
              </>
            )}

          </div>
        )}

      </div>
    </article>
  )
}

/* ── Join button by status ─────────────────────────────────────────────── */

function JoinButton({ status, videoUrl }) {
  const open = () => window.open(videoUrl, '_blank', 'noopener,noreferrer')

  if (status === 'inactive') {
    return (
      <button className="apt-btn apt-btn--join apt-btn--join-inactive" disabled>
        Ingresar a videoatención
      </button>
    )
  }
  if (status === 'soon') {
    return (
      <button className="apt-btn apt-btn--join apt-btn--join-soon" onClick={open}>
        Ingresar a videoatención
      </button>
    )
  }
  if (status === 'now') {
    return (
      <button className="apt-btn apt-btn--join apt-btn--join-now" onClick={open}>
        ¡Ingresar ahora!
      </button>
    )
  }
  return null
}
