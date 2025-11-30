// VALIDACIÓN DE DATOS DE CONTACTO
function validarDatos() {
  const nombre = document.getElementById("nombre").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const email = document.getElementById("email").value.trim();
  const condiciones = document.getElementById("condiciones").checked;

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  const soloNumeros = /^[0-9]+$/;
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let errores = [];

  if (!soloLetras.test(nombre) || nombre.length > 15) {
    errores.push("• El nombre solo puede contener letras y máximo 15 caracteres.");
  }

  if (!soloLetras.test(apellidos) || apellidos.length > 40) {
    errores.push("• Los apellidos solo pueden contener letras y máximo 40 caracteres.");
  }

  if (!soloNumeros.test(telefono) || telefono.length !== 9) {
    errores.push("• El teléfono debe tener exactamente 9 dígitos numéricos.");
  }

  if (!formatoEmail.test(email)) {
    errores.push("• El correo electrónico no tiene un formato válido.");
  }

  if (!condiciones) {
    errores.push("• Debes aceptar las condiciones de privacidad.");
  }

  return errores;
}

//CÁLCULO AUTOMÁTICO DEL PRESUPUESTO
const producto = document.getElementById("producto");
const plazo = document.getElementById("plazo");
const extras = document.querySelectorAll('input[type="checkbox"]');
const resultado = document.getElementById("resultado");

function calcularPresupuesto() {
  let total = parseFloat(producto.value);

  if (isNaN(total) || total === 0) {
    resultado.textContent = "0 €";
    return;
  }

  // Sumar extras seleccionados
  extras.forEach(extra => {
    if (extra.checked && extra.value > 0) {
      total += parseFloat(extra.value);
    }
  });

  // Aplicar descuento según plazo (ejemplo: menos meses = más descuento)
  const meses = parseInt(plazo.value);
  let descuento = 0;
  if (meses >= 7 && meses <= 12) descuento = 0.20; // 20%
  else if (meses >= 1 && meses <= 6) descuento = 0.30; // 30%

  total -= total * descuento;

  resultado.textContent = total.toFixed(2) + " €";
}

//Actualiza el presupuesto automáticamente
producto.addEventListener("change", calcularPresupuesto);
plazo.addEventListener("input", calcularPresupuesto);
extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));

//ENVÍO DEL FORMULARIO
document.getElementById("formPresupuesto").addEventListener("submit", function(e) {
  e.preventDefault();

  const errores = validarDatos();

  if (errores.length > 0) {
    alert("⚠️ Se encontraron los siguientes errores:\n\n" + errores.join("\n"));
  } else {
    alert("Formulario enviado correctamente ✅");
  }
});