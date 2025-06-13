const pasosCorrectos = [
  "Crear máquina virtual",
  "Montar ISO en VirtualBox",
  "Iniciar instalación",
  "Establecer usuario y contraseña",
  "Finalizar instalación"
];

const stepsContainer = document.getElementById("steps");
const dropZone = document.getElementById("dropZone");
const resultado = document.getElementById("resultado");
let draggedItem = null;

function mezclar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function crearElementoPaso(texto) {
  const div = document.createElement("div");
  div.classList.add("step");
  div.setAttribute("draggable", true);
  div.textContent = texto;

  div.addEventListener("dragstart", () => {
    draggedItem = div;
    setTimeout(() => div.style.display = "none", 0);
  });

  div.addEventListener("dragend", () => {
    setTimeout(() => div.style.display = "block", 0);
    draggedItem = null;
  });

  return div;
}

function cargarPasos() {
  const pasosMezclados = mezclar(pasosCorrectos);
  pasosMezclados.forEach(paso => {
    const pasoElemento = crearElementoPaso(paso);
    stepsContainer.appendChild(pasoElemento);
  });
}

[stepsContainer, dropZone].forEach(zone => {
  zone.addEventListener("dragover", e => e.preventDefault());
  zone.addEventListener("drop", e => {
    e.preventDefault();
    if (draggedItem && !zone.contains(draggedItem)) {
      zone.appendChild(draggedItem);
    }
  });
});

function verificarOrden() {
  const pasosUsuario = Array.from(dropZone.querySelectorAll(".step")).map(e => e.textContent.trim());

  if (pasosUsuario.length !== pasosCorrectos.length) {
    resultado.textContent = "⚠️ Aún faltan pasos por ordenar.";
    resultado.style.color = "orange";
    return;
  }

  const correcto = pasosUsuario.every((paso, idx) => paso === pasosCorrectos[idx]);

  if (correcto) {
    resultado.textContent = "✅ Bien hecho. El orden es correcto.";
    resultado.style.color = "green";
  } else {
    resultado.textContent = "❌ Intenta de nuevo. El orden no es correcto.";
    resultado.style.color = "red";
  }
}

cargarPasos();
