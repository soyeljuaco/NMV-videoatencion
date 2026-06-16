// Local icon assets — stored in /public/icons/ (no expiry)
const I = (name) => `/icons/${name}`;

export const A = {
  // Brand
  logo:               I('logo.svg'),
  logoFooter:         I('logo-footer.svg'),

  // Landing decorations
  elemA3:             I('elem-a3.png'),
  elemA4:             I('elem-a4.png'),
  elemB1:             I('elem-b1.png'),

  // Header / Nav
  iconSearch:         I('icon-search.svg'),
  iconNavChevron:     I('icon-nav-chevron.svg'),
  iconHome:           I('icon-home.svg'),
  iconBreadChevron:   I('icon-bread-chevron.svg'),

  // Video CTA icons
  iconVideoBlue:      I('icon-video-blue.svg'),
  iconVideoWhite:     I('icon-video-white.svg'),

  // Green check icons
  iconCheckGreenSm:   I('icon-check-green-sm.svg'),
  iconCheckGreenMd:   I('icon-check-green-sm.svg'),   // same icon, sized by CSS
  iconCheckGreenLg:   I('icon-check-green-lg.svg'),

  // Benefit icons (purple tint cards)
  iconCompVideo:      I('icon-comp-video.svg'),
  iconClockHeart:     I('icon-clock-heart.svg'),
  iconCalFav:         I('icon-cal-fav.svg'),
  iconSecurity:       I('icon-security.svg'),

  // Footer contact icons
  iconWhatsapp:       I('icon-whatsapp.svg'),
  iconPhone:          I('icon-phone.svg'),
  iconLocation:       I('icon-location.svg'),

  // HeaderLogueado — Sucursal Virtual
  iconLogoSucursalVirtual: I('icon-logo-sucursal-virt.png'),
  iconBreadHome:           I('icon-bread-home.svg'),
  iconBreadChevronSV:      I('icon-bread-chevron-sv.svg'),

  // Wizard breadcrumb tags
  iconMotivoTag:      I('icon-motivo-tag.svg'),
  iconMapPin:         I('icon-map-pin.svg'),
  iconCalendarTag:    I('icon-calendar-tag.svg'),
  iconPencil:         I('icon-pencil.svg'),

  // Step 3 date picker
  iconCalOther:       I('icon-calendar-small.svg'),   // alias
  iconCalendarSmall:  I('icon-calendar-small.svg'),
  iconChevronRight:   I('icon-chevron-right.svg'),

  // Step 3 time slots
  iconSunMorning:     I('icon-sun-morning.svg'),
  iconMoonAfternoon:  I('icon-moon-afternoon.svg'),

  // Step 4 confirm form
  iconInfoShield:     I('icon-info-shield.svg'),

  // Final confirm
  iconRefresh:        I('icon-refresh.svg'),

  // Modal dialogs
  iconUserScreen:     I('icon-user-screen.svg'),
  iconInfoCircle:     I('icon-info-circle.svg'),

  // Kept for compatibility (arrow right ≈ chevron right)
  iconArrowRight:     I('icon-chevron-right.svg'),
  iconShieldCheck:    I('icon-check-green-sm.svg'),

  // Centro de Ayuda — category icons (SVG)
  helpHealth:         I('ico-help-health.svg'),
  helpBillCheck:      I('ico-help-bill-check.svg'),
  helpSecurity:       I('ico-help-security.svg'),
  helpLicense:        I('ico-help-license.svg'),
  helpDoctor:         I('ico-help-doctor.svg'),
  helpDoc:            I('ico-help-doc.svg'),
  helpBriefcase:      I('ico-help-briefcase.svg'),
  helpGift:           I('ico-help-gift.svg'),

  // Centro de Ayuda — contact channel icons (SVG)
  contactWhatsapp:    I('ico-contact-whatsapp.svg'),
  contactPhone:       I('ico-contact-phone.svg'),
  contactVideo:       I('ico-contact-video.svg'),
  contactBranch:      I('ico-contact-branch.svg'),

  // Centro de Ayuda — category images (stored in /public/img/help/)
  catPlanSalud:       '/img/help/cat-plan-salud.jpg',
  catBonos:           '/img/help/cat-bonos.jpg',
  catGes:             '/img/help/cat-ges.jpg',
  catLicencias:       '/img/help/cat-licencias.jpg',
  catUrgencias:       '/img/help/cat-urgencias.jpg',
  catPresupuestos:    '/img/help/cat-presupuestos.jpg',
  catIndependientes:  '/img/help/cat-independientes.jpg',
  catBeneficios:      '/img/help/cat-beneficios.jpg',

  // Centro de Ayuda — decorative elements
  decoD2:             '/img/help/deco-d2.png',

  // RRSS
  iconFacebook:       I('icon-facebook.svg'),
  iconInstagram:      I('icon-instagram.svg'),
  iconLinkedin:       I('icon-linkedin.svg'),
};
