import { A } from '../assets.js'

const NAV = [
  {
    title: 'Mi cobertura',
    links: ['Mi plan de salud', 'Enfermedades graves (GES)', 'Medicina preventiva', 'Mis beneficios'],
  },
  {
    title: 'Mis trámites',
    links: ['Solicitar reembolso', 'Licencias médicas', 'Certificados', 'Mis solicitudes'],
  },
  {
    title: 'Buscar atención',
    links: ['Médico o clínica', 'Videoatención', 'Urgencias', 'Farmacias con descuento'],
  },
  {
    title: 'Ayuda',
    links: ['Preguntas frecuentes', 'Sucursales', 'Empleadores', 'Prestadores'],
  },
]

const SOCIAL = [
  { icon: A.iconFacebook,  label: 'Facebook'  },
  { icon: A.iconInstagram, label: 'Instagram' },
  { icon: A.iconLinkedin,  label: 'LinkedIn'  },
]

export default function Footer() {
  return (
    <footer className="w-full flex-shrink-0 bg-white border-t border-[#dee2e6]">

      {/* Grid: logo + 4 cols */}
      <div className="flex justify-center">
        <div className="w-full xl:w-[1200px] px-4 xl:px-0 grid grid-cols-2 xl:grid-cols-5 gap-x-6 gap-y-8 pt-12 pb-6">

          {/* Logo col */}
          <div className="col-span-2 xl:col-span-1 flex items-start">
            <img src={A.logo} alt="Nueva Masvida" className="w-[173px] h-[49px] object-contain" />
          </div>

          {/* Nav cols */}
          {NAV.map(({ title, links }) => (
            <div key={title} className="flex flex-col gap-6">
              <p className="font-semibold text-[18px] leading-5 text-[#212529]">{title}</p>
              <ul className="flex flex-col gap-4 list-none m-0 p-0">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="font-medium text-[14px] leading-5 text-[#495057] no-underline hover:text-[#0085ca] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-center">
        <div className="w-full xl:w-[1200px] px-4 xl:px-0 border-t border-[#dee2e6] py-6 flex items-center justify-between">
          <p className="font-normal text-[14px] leading-5 text-[#495057]">
            © 2026 Nueva Masvida Isapre S.A. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            {SOCIAL.map(({ icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-full bg-[#0085ca] flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-85"
              >
                <img src={icon} alt="" className="w-5 h-5" style={{ filter: 'brightness(0) invert(1)' }} />
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
