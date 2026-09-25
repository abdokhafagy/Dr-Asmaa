/**
 * Digital Wedding Invitation System - Interactive Script
 * Author: Antigravity Pair Programmer
 * Date: 2026-05-20
 * Target: Doctor Kareem & Doctor Asmaa Wedding (August 28, 2026)
 */

(function () {
  'use strict';

  /* ==========================================================================
     I. EVENT-SPECIFIC DATA CONFIGURATION (JSDoc Annotations)
     ========================================================================== */
  const WEDDING_CONFIG = window.WEDDING_CONFIG || {};

  /**
   * @typedef {Object} Venue
   * @property {string} name - Name of the venue
   * @property {string} location - City/Country location
   * @property {string} mapQuery - Query string for Google Maps search
   */

  /**
   * @typedef {Object} EventDetails
   * @property {string} date - ISO 8601 Date string with timezone offset
   * @property {Venue} venue - Venue details
   * @property {string} dressCode - Recommended dress code
   */

  /**
   * @typedef {Object} ScheduleItem
   * @property {string} time - Time of activity
   * @property {string} activity - Description of activity
   */

  /**
   * @typedef {Object} Couple
   * @property {string} groom - Groom's name
   * @property {string} bride - Bride's name
   */

  /**
   * @typedef {Object} WeddingData
   * @property {Couple} couple - Couple names
   * @property {EventDetails} event - Event details
   * @property {ScheduleItem[]} schedule - Schedule timeline items
   */

  /** @type {WeddingData} */
  const WEDDING_DATA = {
    couple: {
      groom: WEDDING_CONFIG.couple?.groom || "الدكتور كريم",
      bride: WEDDING_CONFIG.couple?.bride || "الدكتورة أسماء"
    },
    event: {
      date: WEDDING_CONFIG.event?.dateTime || "2026-10-23T17:00:00+02:00",
      venue: {
        name: WEDDING_CONFIG.event?.venueName || "قاعة رويال بالاس الجلاء طنطا",
        location: WEDDING_CONFIG.event?.venueLocation || "Tanta, Egypt",
        mapQuery: WEDDING_CONFIG.event?.mapQuery || "Royal+Palace+Hall+Tanta+Egypt"
      },
      dressCode: "ملابس أنيقة / كاجوال شيك"
    },
    schedule: WEDDING_CONFIG.timeline || [
      { time: "20:00", activity: "استقبال الضيوف الكرام" },
      { time: "17:30", activity: "بداية مراسم كتب الكتاب" }
    ]
  };

  function setMetaContent(selector, content) {
    const element = document.querySelector(selector);
    if (element) {
      element.setAttribute('content', content);
    }
  }

  function applyWeddingConfig() {
    const root = document.documentElement;
    const colors = WEDDING_CONFIG.colors || {};

    Object.keys(colors).forEach(name => {
      root.style.setProperty(name, colors[name]);
    });

    if (WEDDING_CONFIG.copy?.pageTitle) {
      document.title = `${WEDDING_CONFIG.copy.pageTitle} | ${WEDDING_CONFIG.event?.shortDate || ''}`;
    }

    if (WEDDING_CONFIG.copy?.metaDescription) {
      setMetaContent('meta[name="description"]', WEDDING_CONFIG.copy.metaDescription);
    }
    if (WEDDING_CONFIG.copy?.ogTitle) {
      setMetaContent('meta[property="og:title"]', WEDDING_CONFIG.copy.ogTitle);
    }
    if (WEDDING_CONFIG.copy?.ogDescription) {
      setMetaContent('meta[property="og:description"]', WEDDING_CONFIG.copy.ogDescription);
    }
    if (WEDDING_CONFIG.colors?.['--color-primary-bg']) {
      setMetaContent('meta[name="theme-color"]', WEDDING_CONFIG.colors['--color-primary-bg']);
    }

    const envelopeOverlay = document.getElementById('envelope-overlay');
    const envelopeCardTitle = document.querySelector('.envelope-card__title');
    const envelopeCardSubtitle = document.querySelector('.envelope-card__subtitle');
    const envelopeCardTap = document.querySelector('.envelope-card__tap');
    const heroBadge = document.querySelector('.hero__badge');
    const heroNames = document.querySelector('.hero__names');
    const heroSubtitle = document.querySelector('#hero-section .hero__subtitle');
    const saveDateHeading = document.getElementById('save-date-heading');
    const saveDateTime = document.querySelector('.save-date__date');
    const saveDateSubtitle = document.querySelector('#save-date-section .hero__subtitle');
    const detailsHeading = document.getElementById('details-heading');
    const detailValues = document.querySelectorAll('.detail-item__val');
    const mapsButton = document.getElementById('maps-btn');
    const timelineHeading = document.getElementById('timeline-heading');
    const timelineItems = document.querySelectorAll('.timeline__item');
    const countdownHeading = document.getElementById('countdown-heading');
    const countdownFooter = document.getElementById('countdown-message');
    const audioBtn = document.getElementById('audio-btn');

    if (envelopeOverlay) {
      envelopeOverlay.setAttribute('aria-label', WEDDING_CONFIG.copy?.envelopeAriaLabel || 'دعوة زفاف');
    }
    if (envelopeCardTitle && WEDDING_CONFIG.copy?.envelopeTitle) {
      envelopeCardTitle.textContent = WEDDING_CONFIG.copy.envelopeTitle;
    }
    if (envelopeCardSubtitle) {
      envelopeCardSubtitle.textContent = `${WEDDING_DATA.couple.groom} & ${WEDDING_DATA.couple.bride}`;
    }
    if (envelopeCardTap && WEDDING_CONFIG.copy?.envelopeTap) {
      envelopeCardTap.textContent = WEDDING_CONFIG.copy.envelopeTap;
    }
    if (heroBadge && WEDDING_CONFIG.copy?.heroBadge) {
      heroBadge.textContent = WEDDING_CONFIG.copy.heroBadge;
    }
    if (heroNames) {
      heroNames.innerHTML = `${WEDDING_DATA.couple.groom}<span>&amp;</span>${WEDDING_DATA.couple.bride}`;
    }
    if (heroSubtitle && WEDDING_CONFIG.copy?.heroSubtitle) {
      heroSubtitle.textContent = WEDDING_CONFIG.copy.heroSubtitle;
    }
    if (saveDateHeading && WEDDING_CONFIG.copy?.saveDateTitle) {
      saveDateHeading.textContent = WEDDING_CONFIG.copy.saveDateTitle;
    }
    if (saveDateTime && WEDDING_CONFIG.event?.displayDate) {
      saveDateTime.textContent = WEDDING_CONFIG.event.displayDate;
      saveDateTime.setAttribute('datetime', WEDDING_DATA.event.date.slice(0, 10));
    }
    if (saveDateSubtitle && WEDDING_CONFIG.copy?.saveDateSubtitle) {
      saveDateSubtitle.textContent = WEDDING_CONFIG.copy.saveDateSubtitle;
    }
    if (detailsHeading && WEDDING_CONFIG.copy?.detailsTitle) {
      detailsHeading.textContent = WEDDING_CONFIG.copy.detailsTitle;
    }
    if (detailValues[0] && WEDDING_CONFIG.copy?.themeValue) {
      detailValues[0].textContent = WEDDING_CONFIG.copy.themeValue;
    }
    if (detailValues[1] && WEDDING_CONFIG.event?.venueName) {
      detailValues[1].textContent = WEDDING_CONFIG.event.venueName;
    }
    if (detailValues[2] && WEDDING_CONFIG.event?.shortDate) {
      detailValues[2].textContent = `${WEDDING_CONFIG.event.shortDate} • الساعة ٥:٠٠ مساءً`;
    }
    if (mapsButton && WEDDING_CONFIG.event?.mapUrl) {
      mapsButton.href = WEDDING_CONFIG.event.mapUrl;
      if (WEDDING_CONFIG.copy?.mapsButton) {
        mapsButton.textContent = WEDDING_CONFIG.copy.mapsButton;
      }
    }
    if (timelineHeading && WEDDING_CONFIG.copy?.timelineTitle) {
      timelineHeading.textContent = WEDDING_CONFIG.copy.timelineTitle;
    }
    if (countdownHeading && WEDDING_CONFIG.copy?.countdownTitle) {
      countdownHeading.textContent = WEDDING_CONFIG.copy.countdownTitle;
    }
    if (countdownFooter && WEDDING_CONFIG.copy?.countdownFooter) {
      countdownFooter.textContent = WEDDING_CONFIG.copy.countdownFooter;
    }
    if (audioBtn && WEDDING_CONFIG.copy?.audioLabelPlay) {
      audioBtn.setAttribute('aria-label', WEDDING_CONFIG.copy.audioLabelPlay);
    }

    timelineItems.forEach((item, index) => {
      const scheduleItem = WEDDING_DATA.schedule[index];
      const timeElement = item.querySelector('.timeline__time');
      const activityElement = item.querySelector('.timeline__activity');

      if (scheduleItem && timeElement) {
        timeElement.textContent = scheduleItem.timeLabel || `الساعة ${scheduleItem.time}`;
        timeElement.setAttribute('datetime', scheduleItem.time);
      }
      if (scheduleItem && activityElement) {
        activityElement.textContent = scheduleItem.activity;
      }
    });
  }

  applyWeddingConfig();

  /* ==========================================================================
     II. LOCALIZED NUMERALS CONVERSION
     ========================================================================== */

  /**
   * Converts a number to localized Eastern Arabic Numerals (٠, ١, ٢, ...)
   * and pads it to 2 digits if necessary.
   * @param {number} num - The number to convert.
   * @returns {string} The localized, padded string representation.
   */
  function formatArabicNumerals(num) {
    const padded = String(num).padStart(2, '0');
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return padded
      .split('')
      .map(char => {
        const digit = parseInt(char, 10);
        return isNaN(digit) ? char : arabicDigits[digit];
      })
      .join('');
  }

  /* ==========================================================================
     III. ENVELOPE OPENING CONTROLLER
     ========================================================================== */
  
  const envelopeOverlay = document.getElementById('envelope-overlay');
  const envelopeTrigger = document.getElementById('envelope-trigger');
  
  if (envelopeOverlay && envelopeTrigger) {
    envelopeTrigger.addEventListener('click', function () {
      // 1. Trigger flap and card movement
      envelopeOverlay.classList.add('open');
      
      // 2. Play soft background music automatically upon user interaction
      playAudio();
      
      // 3. Fade out overlay and reveal main invitation content
      setTimeout(function () {
        envelopeOverlay.classList.add('fade-out');
        
        // Remove envelope wrapper from layout to restore document scroll/keyboard focus
        setTimeout(function () {
          envelopeOverlay.style.display = 'none';
          // Trigger timeline scroll reveal to check initial viewport items
          triggerReveal();
        }, 800);
      }, 1100);
    });
  }

  /* ==========================================================================
     IV. LIVE COUNTDOWN TIMER ENGINE
     ========================================================================== */
  
  const daysVal = document.getElementById('days-val');
  const hoursVal = document.getElementById('hours-val');
  const minsVal = document.getElementById('mins-val');
  const secsVal = document.getElementById('secs-val');
  const countdownTimer = document.getElementById('countdown-timer');
  const countdownMessage = document.getElementById('countdown-message');
  
  const targetTime = Date.parse(WEDDING_DATA.event.date);

  function updateCountdown() {
    const now = Date.now();
    const difference = targetTime - now;

    if (isNaN(targetTime)) {
      console.error("Invalid target date format in WEDDING_DATA.");
      return;
    }

    if (difference <= 0) {
      // Target reached
      if (daysVal) daysVal.textContent = formatArabicNumerals(0);
      if (hoursVal) hoursVal.textContent = formatArabicNumerals(0);
      if (minsVal) minsVal.textContent = formatArabicNumerals(0);
      if (secsVal) secsVal.textContent = formatArabicNumerals(0);
      
      if (countdownMessage) {
        countdownMessage.textContent = WEDDING_CONFIG.copy?.countdownEnded || "🎉 لقد حان موعد ليلتنا الكبرى وسعدنا بلقائكم!";
      }
      return;
    }

    // Mathematical breakdown of time intervals
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Apply formatted numerals to UI
    if (daysVal) daysVal.textContent = formatArabicNumerals(days);
    if (hoursVal) hoursVal.textContent = formatArabicNumerals(hours);
    if (minsVal) minsVal.textContent = formatArabicNumerals(minutes);
    if (secsVal) secsVal.textContent = formatArabicNumerals(seconds);
  }

  // Initial call and standard 1s interval loop
  updateCountdown();
  const timerInterval = setInterval(updateCountdown, 1000);

  /* ==========================================================================
     V. ICS CALENDAR FILE GENERATOR
     ========================================================================== */
  
  const saveDateBtn = document.getElementById('save-date-btn');

  if (saveDateBtn) {
    saveDateBtn.addEventListener('click', function () {
      generateICS();
    });
  }

  /**
   * Generates and triggers download of a standardized RFC 5545 ICS calendar event.
   */
  function generateICS() {
    const iCal = WEDDING_CONFIG.iCal || {};
    const summary = iCal.summary || "حفل كتب الكتاب - الدكتور كريم والدكتورة أسماء 💍";
    const location = WEDDING_CONFIG.event?.venueLabel || "قاعة رويال بالاس الجلاء طنطا، مصر";
    const description = iCal.description || "نتشرف بدعوتكم لحضور حفل كتب الكتاب. حضوركم يسعدنا ويتمم هذه المناسبة!";

    // Clean newlines for standard compatibility
    const icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Doctor Kareem and Doctor Asmaa//Katb Al-Kitaab Invitation//AR",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      "UID:" + (iCal.uid || "katb-dr-kareem-asmaa-2026-10-23"),
      "DTSTAMP:" + (iCal.dtStamp || "20260925T120000Z"),
      "DTSTART:" + (iCal.start || "20261023T150000Z"),
      "DTEND:" + (iCal.end || "20261023T190000Z"),
      "SUMMARY:" + summary,
      "DESCRIPTION:" + description,
      "LOCATION:" + location,
      "SEQUENCE:0",
      "STATUS:CONFIRMED",
      "TRANSP:OPAQUE",
      "END:VEVENT",
      "END:VCALENDAR"
    ];

    const icsContent = icsLines.join("\r\n");
    
    try {
      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute('download', 'dr-kareem-asmaa-23oct-katb-al-kitaab.ics');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Failed to generate and download ICS file:", e);
    }
  }

  /* ==========================================================================
     VI. INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
     ========================================================================== */
  
  const animatedElements = [];
  
  // Find all sections and timeline items
  document.querySelectorAll('.section').forEach(el => animatedElements.push(el));
  document.querySelectorAll('.timeline__item').forEach(el => animatedElements.push(el));

  let observer;
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.1, // trigger when 10% visible
      rootMargin: "0px 0px -60px 0px" // early reveal trigger before reaching viewport boundary
    };

    observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('section--hidden');
          if (entry.target.classList.contains('timeline__item')) {
            entry.target.classList.add('timeline__item--visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback if observer not supported
    animatedElements.forEach(el => {
      el.classList.remove('section--hidden');
      if (el.classList.contains('timeline__item')) {
        el.classList.add('timeline__item--visible');
      }
    });
  }

  // Triggers visibility check for elements in initial viewport
  function triggerReveal() {
    if (observer) {
      animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          el.classList.remove('section--hidden');
          if (el.classList.contains('timeline__item')) {
            el.classList.add('timeline__item--visible');
          }
        }
      });
    }
  }

  /* ==========================================================================
     VII. BACKGROUND AUDIO CONTROLLER
     ========================================================================== */
  
  const audioBtn = document.getElementById('audio-btn');
  const bgMusic = document.getElementById('bg-music');
  const iconPlay = document.getElementById('audio-icon-play');
  const iconPause = document.getElementById('audio-icon-pause');
  
  let isPlaying = false;

  if (audioBtn && bgMusic) {
    audioBtn.addEventListener('click', function () {
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }

  function playAudio() {
    if (!bgMusic) return;
    
    bgMusic.play()
      .then(() => {
        isPlaying = true;
        if (audioBtn) {
          audioBtn.classList.add('audio-player-fab--playing');
          audioBtn.setAttribute('aria-pressed', 'true');
          audioBtn.setAttribute('aria-label', WEDDING_CONFIG.copy?.audioLabelPause || 'إيقاف الموسيقى');
        }
        if (iconPlay) iconPlay.style.display = 'none';
        if (iconPause) iconPause.style.display = 'block';
      })
      .catch(error => {
        console.warn("Audio autoplay blocked or failed:", error);
      });
  }

  function pauseAudio() {
    if (!bgMusic) return;
    
    bgMusic.pause();
    isPlaying = false;
    if (audioBtn) {
      audioBtn.classList.remove('audio-player-fab--playing');
      audioBtn.setAttribute('aria-pressed', 'false');
      audioBtn.setAttribute('aria-label', WEDDING_CONFIG.copy?.audioLabelPlay || 'تشغيل الموسيقى');
    }
    if (iconPlay) iconPlay.style.display = 'block';
    if (iconPause) iconPause.style.display = 'none';
  }

})();
