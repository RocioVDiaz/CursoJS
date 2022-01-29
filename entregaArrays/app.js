class Empleado {
    constructor(nombre, legajo, puesto, fechaIngreso) {
        this.nombre = nombre;
        this.legajo = legajo;
        this.puesto = puesto;
        this.fechaIngreso = fechaIngreso;
    }
    calcularAntiguedad() {
        var actual = new Date();
        var diff = new Date(actual - new Date(this.fechaIngreso));
        var antiguedad =
            diff.getUTCFullYear() -
            1970 +
            " años " +
            diff.getUTCMonth() +
            " meses " +
            (diff.getUTCDate() - 1) +
            " días.";
        return antiguedad;
    }
}

const empleado1 = new Empleado("Carlos Gomez", 1234, "gerente", "12/15/1990");
const empleado2 = new Empleado("Carla Diaz", 4567, "supervisora", "09/29/2012");
const empleado3 = new Empleado("Jorge Sanchez", 7890, "operario", "08/01/2018");

let legajo;
let empleados = [];
empleados.push(empleado1, empleado2, empleado3);

function administacionDeEmpleados() {
    do {
        legajo = prompt(
            " Ingrese número de legajo para calcular antigüedad, escriba 'ESC' para finalizar."
        );

        if (legajo.toLocaleUpperCase() !== "ESC") {
            let buscarEmpleado = empleados.find((elemento) => {
                if (elemento.legajo == Number(legajo)) {
                    return true;
                }
            });
            if (buscarEmpleado == undefined) {
                alert("El número de legajo es incorrecto, vuelva a intentar");
            } else {
                alert(
                    "La antigüedad del empleado " +
                    buscarEmpleado.nombre +
                    " es: " +
                    buscarEmpleado.calcularAntiguedad()
                );
            }
        }
    } while (legajo.toLocaleUpperCase() !== "ESC");
}

administacionDeEmpleados();

let arrayOrdenadoPorLegajo = empleados.sort((a, b) => b.legajo - a.legajo);
console.log("Array ordenado de mayor a menor", arrayOrdenadoPorLegajo);