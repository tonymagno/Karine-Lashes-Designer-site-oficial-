/* ===== CONTAGEM REGRESSIVA ===== */
let endDate = new Date();
endDate.setHours(endDate.getHours() + 48); // 48h de urgência

let countdown = setInterval(() => {
  let now = new Date().getTime();
  let distance = endDate - now;

  document.getElementById("days").innerText = Math.floor(distance/(1000*60*60*24));
  document.getElementById("hours").innerText = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
  document.getElementById("mins").innerText = Math.floor((distance%(1000*60*60))/(1000*60));
  document.getElementById("secs").innerText = Math.floor((distance%(1000*60))/(1000));

  if (distance < 0) clearInterval(countdown);
}, 1000);

/* ===== CARROSSEL DEPOIMENTOS ===== */
let carousel = document.querySelector(".carousel-wrapper");
let slides = [...document.querySelectorAll(".slide")];
let current = 0;

function autoSlide() {
  current = (current + 1) % slides.length;
  carousel.scrollTo({
    left: slides[current].offsetLeft,
    behavior: "smooth"
  });
}

setInterval(autoSlide, 3500);

/* ===== FORMULÁRIO GOOGLE SHEETS ===== */
let form = document.getElementById("emailForm");
let msg   = document.querySelector(".form-msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch('https://script.google.com/macros/s/SEU_SCRIPT_ID/exec', {
    method: 'POST',
    body: new URLSearchParams(new FormData(form))
  })
  .then(res => {
    msg.innerText = "Obrigado! E-mail registrado com sucesso.";
    form.reset();
  })
  .catch(err => {
    msg.innerText = "Erro. Tente novamente.";
  });
});
