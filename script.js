/* ===================================================
   KARINE LASHES DESIGNER
   PREMIUM SCRIPT 2026
=================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ===================================================
     CONTADOR PERSISTENTE
  =================================================== */

  const STORAGE_KEY = "karine_lashes_countdown";
  const countdownEls = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    mins: document.getElementById("mins"),
    secs: document.getElementById("secs"),
  };

  let endDate = localStorage.getItem(STORAGE_KEY);

  if (!endDate) {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 48);
    endDate = String(futureDate.getTime());
    localStorage.setItem(STORAGE_KEY, endDate);
  }

  endDate = parseInt(endDate, 10);

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function updateCountdown() {
    const now = Date.now();
    const distance = endDate - now;

    if (distance <= 0) {
      localStorage.removeItem(STORAGE_KEY);

      if (countdownEls.days) countdownEls.days.textContent = "00";
      if (countdownEls.hours) countdownEls.hours.textContent = "00";
      if (countdownEls.mins) countdownEls.mins.textContent = "00";
      if (countdownEls.secs) countdownEls.secs.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((distance % (1000 * 60)) / 1000);

    if (countdownEls.days) countdownEls.days.textContent = pad(days);
    if (countdownEls.hours) countdownEls.hours.textContent = pad(hours);
    if (countdownEls.mins) countdownEls.mins.textContent = pad(mins);
    if (countdownEls.secs) countdownEls.secs.textContent = pad(secs);
  }

  updateCountdown();
  const countdownTimer = setInterval(updateCountdown, 1000);

  /* ===================================================
     CARROSSEL PREMIUM
  =================================================== */

  const carousel = document.querySelector(".carousel-wrapper");
  const slides = carousel ? Array.from(carousel.querySelectorAll(".slide")) : [];
  let currentSlide = 0;

  function autoSlide() {
    if (!carousel || slides.length <= 1) return;

    currentSlide = (currentSlide + 1) % slides.length;

    carousel.scrollTo({
      left: slides[currentSlide].offsetLeft,
      behavior: "smooth",
    });
  }

  const carouselTimer = setInterval(autoSlide, 4500);

  /* ===================================================
     REVEAL ANIMATION
  =================================================== */

  const revealElements = document.querySelectorAll(
    ".card, .slide, .lead-box, .final-cta, .learning-card, .hero-image, .full-image"
  );

  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "opacity .8s ease, transform .8s ease";
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }

  /* ===================================================
     FORMULÁRIO PREMIUM
  =================================================== */

  const form = document.getElementById("emailForm");
  const msg = document.querySelector(".form-msg");

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/SEU_SCRIPT_ID/exec";

  if (form && msg) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (GOOGLE_SCRIPT_URL.includes("SEU_SCRIPT_ID")) {
        msg.textContent = "Configure o URL do Google Apps Script no script.js para ativar o envio.";
        msg.style.color = "#d4af37";
        return;
      }

      msg.textContent = "Enviando...";
      msg.style.color = "#d4af37";

      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          body: new URLSearchParams(new FormData(form)),
        });

        if (!response.ok) {
          throw new Error("Falha na resposta do servidor");
        }

        msg.textContent = "Cadastro realizado com sucesso!";
        msg.style.color = "#6eeb83";
        form.reset();
      } catch (error) {
        msg.textContent = "Não foi possível enviar. Tente novamente.";
        msg.style.color = "#ff6b6b";
      }
    });
  }

  /* ===================================================
     MICRO INTERAÇÕES DOS CARDS
  =================================================== */

  const cards = document.querySelectorAll(".card, .learning-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ===================================================
     BOTÃO CTA COM EFEITO
  =================================================== */

  const buttons = document.querySelectorAll(".btn-primary");

  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(-4px) scale(1.02)";
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  /* ===================================================
     SCROLL SUAVE PARA ÂNCORAS INTERNAS
  =================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ===================================================
     ANO AUTOMÁTICO FOOTER
  =================================================== */

  const yearElement = document.querySelector(".year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  console.log(
    "%cKarine Lashes Designer Premium",
    "color:#d4af37;font-size:18px;font-weight:bold;"
  );
  console.log(
    "%cLanding Page Premium carregada com sucesso.",
    "color:#ffffff;font-size:12px;"
  );

  window.addEventListener("beforeunload", () => {
    clearInterval(countdownTimer);
    clearInterval(carouselTimer);
  });
});
