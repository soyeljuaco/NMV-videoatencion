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
};
