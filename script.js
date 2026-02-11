diff --git a/script.js b/script.js
index 46935d334194eaf2f0bb589bb6cb3c781e5e9e8a..27a3404029180893e810b3acb6dc730417b34772 100644
--- a/script.js
+++ b/script.js
@@ -1,51 +1,90 @@
-// script.js
+// Interações da landing page Karine Lashes
 
-// Form Validation
-function validateForm() {
-    // Validate form fields here
-}
+// Rolagem suave apenas para links internos existentes
+const linksInternos = document.querySelectorAll('a[href^="#"]');
+linksInternos.forEach((link) => {
+    link.addEventListener('click', (evento) => {
+        const alvoId = link.getAttribute('href');
+        const alvo = alvoId ? document.querySelector(alvoId) : null;
+
+        if (!alvo) {
+            return;
+        }
 
-// Smooth Scrolling
-const links = document.querySelectorAll('a[href^="#"]');
-links.forEach(link => {
-    link.addEventListener('click', function(e) {
-        e.preventDefault();
-        const target = document.querySelector(this.getAttribute('href'));
-        target.scrollIntoView({ behavior: 'smooth' });
+        evento.preventDefault();
+        alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
     });
 });
 
-// Countdown Timer for Limited Spots
-const countdownDate = new Date('2026-02-11T23:59:59Z').getTime();
-const countdownFunction = setInterval(function() {
-    const now = new Date().getTime();
-    const distance = countdownDate - now;
-    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
-    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
-    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
-    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
-    document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
-    if (distance < 0) {
-        clearInterval(countdownFunction);
-        document.getElementById('countdown').innerHTML = 'EXPIRED';
+// Contador regressivo do lote promocional
+const contador = document.getElementById('countdown');
+if (contador) {
+    const dataLimite = new Date('2026-12-31T23:59:59-03:00').getTime();
+
+    const atualizarContador = () => {
+        const agora = Date.now();
+        const distancia = dataLimite - agora;
+
+        if (distancia <= 0) {
+            contador.textContent = 'lote encerrado';
+            return false;
+        }
+
+        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
+        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
+        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
+        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
+
+        contador.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
+        return true;
+    };
+
+    const ativo = atualizarContador();
+    if (ativo) {
+        const timer = setInterval(() => {
+            const continua = atualizarContador();
+            if (!continua) {
+                clearInterval(timer);
+            }
+        }, 1000);
     }
-}, 1000);
-
-// Testimonial Carousel
-const testimonials = document.querySelectorAll('.testimonial');
-let currentTestimonial = 0;
-function showTestimonial(index) {
-    testimonials.forEach((testimonial, i) => {
-        testimonial.style.display = i === index ? 'block' : 'none';
-    });
 }
-showTestimonial(currentTestimonial);
-setInterval(() => {
-    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
-    showTestimonial(currentTestimonial);
-}, 5000); // Change testimonial every 5 seconds
-
-// Analytics Tracking
-function trackEvent(event) {
-    // Implement analytics tracking here
+
+// Carrossel simples de depoimentos (1 por vez em telas pequenas)
+const depoimentos = document.querySelectorAll('.testimonial');
+if (depoimentos.length > 1) {
+    let indiceAtual = 0;
+
+    const mostrarDepoimento = (indice) => {
+        depoimentos.forEach((item, i) => {
+            item.classList.toggle('is-hidden', i !== indice);
+        });
+    };
+
+    const deveRotacionar = () => window.matchMedia('(max-width: 900px)').matches;
+
+    const iniciarRotacao = () => {
+        mostrarDepoimento(indiceAtual);
+
+        return setInterval(() => {
+            if (!deveRotacionar()) {
+                depoimentos.forEach((item) => item.classList.remove('is-hidden'));
+                return;
+            }
+
+            indiceAtual = (indiceAtual + 1) % depoimentos.length;
+            mostrarDepoimento(indiceAtual);
+        }, 4500);
+    };
+
+    let intervalo = iniciarRotacao();
+
+    window.addEventListener('resize', () => {
+        clearInterval(intervalo);
+        if (!deveRotacionar()) {
+            depoimentos.forEach((item) => item.classList.remove('is-hidden'));
+            indiceAtual = 0;
+        }
+        intervalo = iniciarRotacao();
+    });
 }
