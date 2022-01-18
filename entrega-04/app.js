function suma(n1, n2) {
  return parseInt(n1) + parseInt(n2);

}

function resta(n1, n2) {
  return parseInt(n1) - parseInt(n2);

}

function multiplicacion(n1, n2) {
  return parseInt(n1) * parseInt(n2);

}

function division(n1, n2) {
  return parseInt(n1) / parseInt(n2);

}

function mensaje(parametro1, parametro2) {
  return "El resultado de la " + parametro1 + " es: " + parametro2;
}

function calculadora() {
  do {
    var operacion = prompt(
      "CALCULADORA: Ingrese la operación que quiere realizar en minúsculas (suma, resta, multiplicacion, division)"
    );
    var primerNumero = prompt("Ingrese un número");
    var segundoNumero = prompt("Ingrese otro número");
    var resultado = 0;
    var msj = "";
    if (
      Number(primerNumero) == primerNumero &&
      Number(segundoNumero) == segundoNumero
    ) {
      switch (operacion.toLowerCase()) {
        case "suma":
          resultado = suma(primerNumero, segundoNumero)
          msj += mensaje(operacion, resultado)
          break;
        case "resta":
          resultado = resta(primerNumero, segundoNumero)
          msj += mensaje(operacion, resultado)
          break;
        case "multiplicacion":
          resultado = multiplicacion(primerNumero, segundoNumero)
          msj += mensaje(operacion, resultado)
          break;
        case "division":
          resultado = division(primerNumero, segundoNumero)
          msj += mensaje(operacion, resultado)
          break;
  
        default:
          msj += "Ha ingresado una operación inválida, intente nuevamente";
          break;
      }
      alert(msj);
    } else {
      alert("Los valores ingresados son incorrectos");
    }
  } while (confirm("¿Desea realizar otra operación? "));
}

calculadora()