const textarea = document.querySelector(".textarea");
const mensaje = document.querySelector(".mensaje");
const encriptar = document.querySelector(".encriptar");
const desencriptar = document.querySelector(".desencriptar");
const copiar = document.querySelector(".copiar");

// Función para encriptar el texto
function encriptarTexto(texto) {
  // Reemplazar las letras según la clave de encriptación
  const textoEncriptado = texto
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
  return textoEncriptado;
}

// Función para desencriptar el texto
function desencriptarTexto(textoEncriptado) {
  // Reemplazar las letras según la clave de desencriptación
  const textoOriginal = textoEncriptado
    .replace(/ufat/g, "u")
    .replace(/ober/g, "o")
    .replace(/ai/g, "a")
    .replace(/imes/g, "i")
    .replace(/enter/g, "e");
  return textoOriginal;
}

// Event listener para el botón de encriptar
encriptar.addEventListener("click", function () {
  const textoOriginal = textarea.value.toLowerCase();
  const textoEncriptado = encriptarTexto(textoOriginal);
  mensaje.value = textoEncriptado;
  textarea.value = "";

  document.querySelector(".mensaje-texto").style.backgroundImage = "none";
  document.querySelector(".mensaje-info").style.display = "none";
  document.querySelector(".copiar").style.display = "block";
  document.querySelector(".mensaje").style.display = "block";
});

// Event listener para el botón de desencriptar
desencriptar.addEventListener("click", function () {
  const textoEncriptado = mensaje.value.toLowerCase();
  const textoOriginal = desencriptarTexto(textoEncriptado);
  mensaje.value = textoOriginal;
  textarea.value = "";
});

// Event listener para el botón de copiar
copiar.addEventListener("click", function () {
  const textoCopiar = mensaje.value;
  navigator.clipboard
    .writeText(textoCopiar)
    .then(() => {
      console.log("Texto copiado al portapapeles:", textoCopiar);
    })
    .catch((err) => {
      console.error("Error al copiar el texto:", err);
    });
});

// Pegar el texto encriptado/desencriptado en .textarea
let isPasteHandled = false;

textarea.addEventListener("paste", function handlePaste(event) {
  if (isPasteHandled) {
    return;
  }

  event.preventDefault();

  const textoPegado = (event.clipboardData || window.clipboardData).getData(
    "text"
  );

  textarea.value = textoPegado;

  isPasteHandled = true;

  textarea.removeEventListener("paste", handlePaste);
});

// Actualizar año en footer
const yearElement = document.querySelector("footer .copyright");
const currentYear = new Date().getFullYear();
yearElement.textContent = `© ${currentYear} | Amelia Mabel Díaz`;
