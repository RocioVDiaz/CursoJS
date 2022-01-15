do {
  var usuario = prompt(
    "CALCULADORA: Ingrese la operación que quiere realizar en minúsculas (suma, resta, multiplicacion, division)"
  );
  var primerNumero = prompt("Ingrese un número");
  var segundoNumero = prompt("Ingrese otro número");
  var resultado = 0;
  var mensaje = "";
  if (
    Number(primerNumero) == primerNumero &&
    Number(segundoNumero) == segundoNumero
  ) {
    switch (usuario) {
      case "suma":
        resultado = parseInt(primerNumero) + parseInt(segundoNumero);
        mensaje += "El resultado de la " + usuario + " es: " + resultado;
        break;
      case "resta":
        resultado = parseInt(primerNumero) - parseInt(segundoNumero);
        mensaje += "El resultado de la " + usuario + " es: " + resultado;
        break;
      case "multiplicacion":
        resultado = parseInt(primerNumero) * parseInt(segundoNumero);
        mensaje += "El resultado de la " + usuario + " es: " + resultado;
        break;
      case "division":
        resultado = parseInt(primerNumero) / parseInt(segundoNumero);
        mensaje += "El resultado de la " + usuario + " es: " + resultado;
        break;

      default:
        mensaje += "Ha ingresado una operación inválida, intente nuevamente";
        break;
    }
    alert(mensaje);
  } else {
    alert("Los valores ingresados son incorrectos");
  }
} while (confirm("¿Desea realizar otra operación? "));