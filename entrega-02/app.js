
let usuario = prompt ("Ingrese su nombre y apellido");
let nacimiento = prompt ("Ingrese su año de nacimiento");


let edad = 2022 - nacimiento;
let sueldo = 55000;

if ( edad < 18) {
    alert ("Usted es menor de edad. Crédito no aprobado.")
}

else {
    let entrada = prompt("Ingrese el monto de su recibo de sueldo");
    if (entrada < sueldo) {
        alert ("El monto de su recibo es inferior al requerido. Crédito no aprobado")
    }
    else {
        let resultado = usuario +" "+"cumple con los requisitos solicitados. Crédito aprobado. ";
        alert(resultado);
    }
}






