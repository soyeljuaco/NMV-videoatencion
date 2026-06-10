import { useState } from 'react'
import { A } from '../assets.js'

const col1 = ['Conócenos','Memoria Corporativa','Estados Financieros','Colaboradores','Trabaja con nosotros','Contrato de Salud','Superintendencia de Salud']
const col2 = ['Informe de devolución por Ley 21.674','Cartola de excedentes por Ley 21.674','Acceso para beneficiarios','Certificado no vigencia para ex afiliados','Registro cuenta bancaria ex afiliados','Cotizaciones mal enteradas','Documentos pendientes de cobro','Excesos de cotización','Pago de cotización','Solicitud para devolución de excedentes','Voucher cartas de cobranza para Fun 2']
const col3 = ['Aranceles de Prestaciones','Cobertura a prestaciones otorgadas en forma remota']

function AccordionSection({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[#dee2e6] xl:border-none">
      {/* Header — clickable on mobile only */}
      <button
        onClick={() => setOpen(v => !v)}
        className="xl:hidden flex items-center justify-between w-full py-4 px-4 text-left"
      >
        <p className="text-[#212529] font-semibold text-base leading-6">{title}</p>
        <span className={`text-[#495057] text-xl leading-none transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>›</span>
      </button>
      {/* Desktop title (always visible) */}
      <div className="hidden xl:block p-4 rounded-lg">
        <p className="text-[#212529] font-semibold text-lg">{title}</p>
      </div>
      {/* Content */}
      <div className={`overflow-hidden transition-all duration-200 xl:!max-h-none xl:!opacity-100 ${open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 xl:max-h-none xl:opacity-100'}`}>
        <div className="px-4 pb-4 xl:px-4 xl:pb-0 flex flex-col gap-4 xl:gap-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="w-full flex-shrink-0 bg-white">
      {/* Desktop: 4-col grid. Mobile: accordion stack */}
      <div className="xl:flex xl:justify-center xl:px-8">
        <div className="w-full xl:grid xl:grid-cols-4 xl:gap-6 xl:pb-12 xl:pt-8">

          <AccordionSection title="Nuestra empresa">
            {col1.map(l => <p key={l} className="footer-link text-[#495057] font-medium text-base leading-6 cursor-pointer">{l}</p>)}
          </AccordionSection>

          <AccordionSection title="Gestión de información">
            {col2.map(l => <p key={l} className="footer-link text-[#495057] font-medium text-base leading-6 cursor-pointer">{l}</p>)}
          </AccordionSection>

          <AccordionSection title="Contenidos relevantes">
            {col3.map(l => <p key={l} className="footer-link text-[#495057] font-medium text-base leading-6 cursor-pointer">{l}</p>)}
          </AccordionSection>

          {/* Contáctanos */}
          <AccordionSection title="Contáctanos">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[rgba(37,163,55,0.1)] flex items-center justify-center flex-shrink-0">
                <img src={A.iconWhatsapp} alt="" className="w-6 h-6" />
              </div>
              <p className="text-[#495057] text-base leading-6">Escríbenos al +569 6901 5876</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[rgba(124,132,154,0.1)] flex items-center justify-center flex-shrink-0">
                <img src={A.iconPhone} alt="" className="w-6 h-6" />
              </div>
              <p className="text-[#495057] text-base leading-6">Llámanos al 600 6000 262</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[rgba(239,144,51,0.1)] flex items-center justify-center flex-shrink-0">
                <img src={A.iconLocation} alt="" className="w-6 h-6" />
              </div>
              <p className="footer-link text-[#495057] text-base cursor-pointer">Buscar sucursales</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[rgba(0,133,202,0.1)] flex items-center justify-center flex-shrink-0">
                <img src={A.iconVideoBlue} alt="" className="w-6 h-6" />
              </div>
              <p className="footer-link text-[#495057] text-base cursor-pointer">Iniciar Video Atención</p>
            </div>
          </AccordionSection>

        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-[#dee2e6] flex flex-col xl:flex-row items-center justify-between gap-4 px-4 xl:px-8 py-6 xl:pb-8 xl:pt-12">
        <div className="w-[140px] xl:w-[173px] h-[40px] xl:h-[49px]">
          <img src={A.logoFooter} alt="Nueva Masvida" className="h-full w-full object-contain" />
        </div>
        <p className="text-[#6c757d] font-medium text-sm xl:text-base text-center xl:text-right xl:leading-6">
          © Isapre Nueva Masvida 2026 – Todos los Derechos Reservados – Políticas de Privacidad
        </p>
      </div>
    </footer>
  )
}
