(function () {
  "use strict";
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  // Menu no celular
  var btn = document.querySelector(".menu-btn"), nav = document.getElementById("menu");
  function setMenu(open) { btn.setAttribute("aria-expanded", String(open)); btn.textContent = open ? "Fechar" : "Menu"; nav.classList.toggle("is-open", open); }
  if (btn && nav) {
    btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); btn.focus(); } });
    document.addEventListener("click", function (e) { if (nav.classList.contains("is-open") && !nav.contains(e.target) && !btn.contains(e.target)) setMenu(false); });
  }

  // Entradas escalonadas
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll("main h2, main h3, main p, main figure, main details, main img, .composer, .calc");
  els.forEach(function (el, i) { el.classList.add("reveal"); if (!reduce) el.style.transitionDelay = (i % 3) * 80 + "ms"; });
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("is-in"); }); }
  else {
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  // Montador de mensagem para o WhatsApp
  var form = document.getElementById("composer");
  if (form) {
    var preview = document.getElementById("preview");
    var msg = function () {
      var parts = [form.dataset.intro];
      form.querySelectorAll("fieldset").forEach(function (fs) { var c = fs.querySelector("input:checked"); if (c) parts.push(c.dataset.tpl.replace("{v}", c.value)); });
      var x = form.querySelector("#extra"); if (x && x.value.trim()) parts.push(x.dataset.tpl.replace("{v}", x.value.trim()));
      return parts.join(" ");
    };
    var upd = function () { preview.textContent = msg(); };
    form.addEventListener("input", upd); form.addEventListener("change", upd);
    form.addEventListener("submit", function (e) { e.preventDefault(); window.open("https://wa.me/" + form.dataset.wa + "?text=" + encodeURIComponent(msg()), "_blank", "noopener"); });
    upd();
  }

  // Calculadora de BTUs (estimativa)
  var calc = document.getElementById("calc");
  if (calc) {
    var sizes = [9000, 12000, 18000, 24000, 30000, 36000, 48000, 60000];
    var out = calc.querySelector("[data-out]"), link = calc.querySelector("[data-link]");
    var run = function () {
      var a = parseFloat(calc.area.value.replace(",", ".")) || 0, p = parseInt(calc.people.value, 10) || 1, sun = calc.sun.checked;
      if (a <= 0) { out.textContent = "Informe a área do ambiente."; link.hidden = true; return; }
      var btu = a * (sun ? 800 : 600) + Math.max(0, p - 2) * 600;
      var pick = sizes.find(function (s) { return s >= btu; });
      out.textContent = pick ? "Cerca de " + Math.round(btu).toLocaleString("pt-BR") + " BTUs: um aparelho de " + pick.toLocaleString("pt-BR") + " BTUs costuma atender." : "Cerca de " + Math.round(btu).toLocaleString("pt-BR") + " BTUs: ambiente grande, peça uma avaliação.";
      var t = "Olá, " + calc.dataset.name + "! Fiz a estimativa no site: ambiente de " + a + " m², " + p + " pessoa(s)" + (sun ? ", com sol à tarde" : "") + ". Deu cerca de " + Math.round(btu).toLocaleString("pt-BR") + " BTUs. Podem confirmar e passar um orçamento de instalação?";
      link.href = "https://wa.me/" + calc.dataset.wa + "?text=" + encodeURIComponent(t); link.hidden = false;
    };
    calc.addEventListener("input", run); calc.addEventListener("change", run);
    calc.addEventListener("submit", function (e) { e.preventDefault(); run(); });
    run();
  }

  // Abas de perguntas (Totum)
  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    var tabs = box.querySelectorAll("[role=tab]"), panels = box.querySelectorAll("[role=tabpanel]");
    function show(i) { tabs.forEach(function (t, j) { t.setAttribute("aria-selected", String(i === j)); t.tabIndex = i === j ? 0 : -1; }); panels.forEach(function (p, j) { p.hidden = i !== j; }); }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { show(i); });
      t.addEventListener("keydown", function (e) { var n = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0; if (n) { e.preventDefault(); var k = (i + n + tabs.length) % tabs.length; show(k); tabs[k].focus(); } });
    });
  });
})();
