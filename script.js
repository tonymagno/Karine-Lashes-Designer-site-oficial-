/* =====================================================
   KARINE LASHES DESIGNER
   PREMIUM SCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     CONTADOR REGRESSIVO PERSISTENTE
  ===================================================== */

  const STORAGE_KEY = "karine_lashes_countdown";

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minsEl = document.getElementById("mins");
  const secsEl = document.getElementById("secs");

  if (daysEl && hoursEl && minsEl && secsEl) {

    let endDate = localStorage.getItem(STORAGE_KEY);

    if (!endDate) {

      const futureDate = new Date();

      futureDate.setHours(
        futureDate.getHours() + 48
      );

      endDate = futureDate.getTime();

      localStorage.setItem(
        STORAGE_KEY,
        endDate
      );

    }

    endDate = parseInt(endDate);

    function updateCountdown() {

      const now = Date.now();

      const distance = endDate - now;

      if (distance <= 0) {

        localStorage.removeItem(STORAGE_KEY);

        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minsEl.textContent = "00";
        secsEl.textContent = "00";

        return;
      }

      const days =
        Math.floor(
          distance /
          (1000 * 60 * 60 * 24)
        );

      const hours =
        Math.floor(
          (
            distance %
            (1000 * 60 * 60 * 24)
          ) /
          (1000 * 60 * 60)
        );

      const mins =
        Math.floor(
          (
            distance %
            (1000 * 60 * 60)
          ) /
          (1000 * 60)
        );

      const secs =
        Math.floor(
          (
            distance %
            (1000 * 60)
          ) /
          1000
        );

      daysEl.textContent =
        String(days).padStart(2, "0");

      hoursEl.textContent =
        String(hours).padStart(2, "0");

      minsEl.textContent =
        String(mins).padStart(2, "0");

      secsEl.textContent =
        String(secs).padStart(2, "0");

    }

    updateCountdown();

    setInterval(
      updateCountdown,
      1000
    );

  }

  /* =====================================================
     REVEAL ANIMATION
  ===================================================== */

  const revealElements =
    document.querySelectorAll(
      ".card, .learning-card, .slide, .lead-box, .full-image, .hero-image"
    );

  revealElements.forEach(el => {

    el.style.opacity = "0";

    el.style.transform =
      "translateY(40px)";

    el.style.transition =
      "all .8s ease";

  });

  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform =
              "translateY(0)";

          }

        });

      },

      {
        threshold: 0.15
      }

    );

  revealElements.forEach(el => {
    observer.observe(el);
  });

  /* =====================================================
     CARROSSEL AUTOMÁTICO
  ===================================================== */

  const carousel =
    document.querySelector(
      ".carousel-wrapper"
    );

  const slides =
    document.querySelectorAll(
      ".slide"
    );

  if (
    carousel &&
    slides.length > 1
  ) {

    let currentSlide = 0;

    setInterval(() => {

      currentSlide++;

      if (
        currentSlide >=
        slides.length
      ) {

        currentSlide = 0;

      }

      carousel.scrollTo({

        left:
          slides[currentSlide]
            .offsetLeft,

        behavior: "smooth"

      });

    }, 5000);

  }

  /* =====================================================
     FORMULÁRIO
  ===================================================== */

  const form =
    document.getElementById(
      "emailForm"
    );

  const msg =
    document.querySelector(
      ".form-msg"
    );

  if (form && msg) {

    form.addEventListener(
      "submit",

      async (e) => {

        e.preventDefault();

        msg.textContent =
          "Enviando...";

        msg.style.color =
          "#d4af37";

        try {

          const response =
            await fetch(

              "https://script.google.com/macros/s/SEU_SCRIPT_ID/exec",

              {
                method: "POST",

                body:
                  new URLSearchParams(
                    new FormData(form)
                  )

              }

            );

          if (!response.ok) {

            throw new Error();

          }

          msg.textContent =
            "Cadastro realizado com sucesso!";

          msg.style.color =
            "#6EEB83";

          form.reset();

        } catch {

          msg.textContent =
            "Erro ao enviar. Tente novamente.";

          msg.style.color =
            "#ff6b6b";

        }

      }

    );

  }

  /* =====================================================
     BOTÕES CTA
  ===================================================== */

  const buttons =
    document.querySelectorAll(
      ".btn-primary"
    );

  buttons.forEach(btn => {

    btn.addEventListener(
      "mouseenter",

      () => {

        btn.style.transform =
          "translateY(-4px) scale(1.02)";

      }

    );

    btn.addEventListener(
      "mouseleave",

      () => {

        btn.style.transform =
          "translateY(0) scale(1)";

      }

    );

  });

  /* =====================================================
     ANO AUTOMÁTICO
  ===================================================== */

  const year =
    document.querySelector(
      ".year"
    );

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }

  /* =====================================================
     LOG
  ===================================================== */

  console.log(
    "%cKarine Lashes Designer Premium",
    "color:#d4af37;font-size:16px;font-weight:bold;"
  );

});
