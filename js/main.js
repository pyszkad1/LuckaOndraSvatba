/**
 * Lucka & Ondra Wedding - Interactive JavaScript
 * Date: Sobota 8. 5. 2027
 * Venue: Chateau St. Havel, Praha 4 - Krč
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initMobileMenu();
  initLightbox();
  initRSVPForm();
  initCalendarButtons();
  initScrollAnimations();
});

/* ==========================================================================
   1. COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  // Wedding Date: May 8, 2027 at 13:00:00 (Czech Local Time)
  const weddingDate = new Date('2027-05-08T13:00:00+02:00').getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minutesEl = document.getElementById('cd-minutes');
  const secondsEl = document.getElementById('cd-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      document.querySelector('.countdown-box').innerHTML = '<div class="countdown-unit" style="min-width:200px;"><span class="countdown-number">Náš velký den je tady! 🎉</span></div>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

/* ==========================================================================
   2. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen 
      ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
      : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });
  });
}

/* ==========================================================================
   3. PHOTO LIGHTBOX GALLERY
   ========================================================================== */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item, .story-image-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Svatební foto';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   4. RSVP FORM SUBMISSION (Connected to Google Forms on background)
   ========================================================================== */

// --- GOOGLE FORM CONFIGURATION ---
const GOOGLE_FORM_CONFIG = {
  formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeJUSw9vL7rk6vvjV-Vv0cuKWXM1HEtRyWIMtEWju7mKe2fag/formResponse',
  entries: {
    name: 'entry.1498135098',       // Vaše Jméno a Příjmení
    attendance: 'entry.877086558',  // Vaše účast (Yes,  I'll be there / Sorry, can't make it)
    guests: 'entry.495194723',      // Počet osob
    dietary: 'entry.1912311180',    // Dietní omezení / Alergie
    note: 'entry.696778978'         // Vzkaz / Písnička na přání
  }
};

function initRSVPForm() {
  const rsvpForm = document.getElementById('rsvpForm');
  const statusMsg = document.getElementById('rsvpStatus');

  if (!rsvpForm || !statusMsg) return;

  let isSubmitting = false;

  rsvpForm.addEventListener('submit', () => {
    if (isSubmitting) return;
    isSubmitting = true;

    const name = document.getElementById('rsvpName').value.trim();
    const attendance = document.getElementById('rsvpAttendance').value;
    const isAttending = attendance === 'Ano';
    const guests = document.getElementById('rsvpGuests').value;

    const submitBtn = rsvpForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Odesílám potvrzení...';
    submitBtn.disabled = true;

    // Po odeslání do skrytého iframe zobrazíme hezké potvrzení pro hosta
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      rsvpForm.style.display = 'none';
      statusMsg.style.display = 'block';
      statusMsg.innerHTML = `
        <div style="text-align: center; padding: 1.5rem 0;">
          <div style="font-size: 3.2rem; margin-bottom: 0.75rem;">💌</div>
          <h4 style="font-family: var(--font-serif-display); font-size: 1.7rem; color: var(--gold-dark); margin-bottom: 0.5rem;">
            Děkujeme, ${name}! ❤️
          </h4>
          <p style="color: var(--text-secondary); font-size: 1.1rem; max-width: 520px; margin: 0 auto; line-height: 1.6;">
            Vaše potvrzení (${isAttending ? 'Rád/a dorazím 🎉' : 'Bohužel nedorazím 💔'}, počet hostů: <strong>${guests}</strong>) bylo úspěšně uloženo do naší tabulky hostů. Moc se na vás těšíme v Chateau St. Havel!
          </p>
        </div>
      `;
    }, 600);
  });
}

/* ==========================================================================
   5. CALENDAR INTEGRATION (Google Calendar & .ics download)
   ========================================================================== */
function initCalendarButtons() {
  const gcalBtn = document.getElementById('btnGoogleCal');
  const icsBtn = document.getElementById('btnIcsCal');

  const title = encodeURIComponent("Svatba Lucky & Ondry");
  const details = encodeURIComponent("Svatba Lucky & Ondry v Chateau St. Havel. Velký den pro bridžovou rodinu Bahníků!");
  const location = encodeURIComponent("Chateau St. Havel wellness hotel, Před nádražím 1/6, 140 00 Praha 4 - Krč");
  const dates = "20270508T110000Z/20270509T020000Z";

  if (gcalBtn) {
    gcalBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  }

  if (icsBtn) {
    icsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Lucka & Ondra Wedding//CZ",
        "BEGIN:VEVENT",
        "SUMMARY:Svatba Lucky & Ondry",
        "DESCRIPTION:Svatba Lucky & Ondry v Chateau St. Havel. Velký den pro bridžovou rodinu Bahníků!",
        "LOCATION:Chateau St. Havel wellness hotel, Před nádražím 1/6, Praha 4 - Krč",
        "DTSTART:20270508T110000Z",
        "DTEND:20270509T020000Z",
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'svatba-lucka-ondra.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

/* ==========================================================================
   6. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.section-header, .story-image-card, .story-content, .gallery-item, .venue-card, .info-card, .rsvp-card');

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)';
    observer.observe(el);
  });
}
