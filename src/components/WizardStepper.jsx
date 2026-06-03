const steps = [
  { n: 1, label: 'Motivo' },
  { n: 2, label: 'Sucursal' },
  { n: 3, label: 'Fecha y hora' },
  { n: 4, label: 'Confirmación' },
]

export default function WizardStepper({ current }) {
  const activeStep = steps.find(s => s.n === current) || steps[steps.length - 1]
  const isDone = current > 4

  return (
    <div className="border-b border-[#dee2e6]">
      {/* ── Mobile: "Paso X de 4" + barras de progreso angostas ── */}
      <div className="xl:hidden flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isDone ? 'bg-[#25a337]' : 'bg-[#0085ca]'}`}>
            <span className="font-raleway font-bold text-xs text-white">{isDone ? '✓' : current}</span>
          </div>
          <span className="text-[#212529] font-semibold text-sm whitespace-nowrap">
            {isDone ? 'Completado' : `Paso ${current} de 4`}
          </span>
          {!isDone && (
            <span className="text-[#495057] text-sm whitespace-nowrap">— {activeStep.label}</span>
          )}
        </div>
        {/* Barras angostas para que el texto quepa en una línea */}
        <div className="flex gap-1 flex-shrink-0 ml-3">
          {steps.map(s => (
            <div
              key={s.n}
              className={`h-1.5 w-4 rounded-full transition-all ${
                s.n < current || isDone ? 'bg-[#25a337]' :
                s.n === current         ? 'bg-[#0085ca]' :
                                          'bg-[#dee2e6]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Desktop: full step indicators ── */}
      <div className="hidden xl:flex gap-4 items-center justify-center py-12">
        {steps.map((s, i) => {
          const done    = s.n < current
          const active  = s.n === current
          const pending = s.n > current
          const isLast  = i === steps.length - 1
          return (
            <div key={s.n} className="flex items-center gap-2">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative ${done ? 'bg-[#25a337]' : ''} ${active ? 'bg-[#0085ca] shadow-step' : ''} ${pending ? 'bg-white border border-[#dee2e6]' : ''}`}>
                <span className={`font-raleway font-bold text-sm leading-none ${done || active ? 'text-white' : 'text-[#495057]'}`}>{s.n}</span>
              </div>
              <span className={`text-sm font-semibold whitespace-nowrap ${active ? 'text-[#212529]' : 'text-[#495057]'}`}>{s.label}</span>
              {!isLast && <div className={`h-px w-16 ${done ? 'bg-[#25a337]' : 'bg-[#dee2e6]'}`} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
