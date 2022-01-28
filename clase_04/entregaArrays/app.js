// Crear al menos un objeto para controlar el funcionamiento de tu simulador.
// Incorporarle sus propiedades y su constructor.
// Invocar a ese objeto en algún momento donde el usuario realice alguna acción.
// Utilizar sus mètodos.

class Empleado {
    constructor(nombre, legajo, puesto, fechaIngreso) {
        this.nombre = nombre;
        this.legajo = legajo;
        this.puesto = puesto;
        this.fechaIngreso = fechaIngreso;
    }
    calcularAntiguedad() {
        var actual = new Date();
        var diff = new Date(actual - (new Date(this.fechaIngreso)));
        var antiguedad = (diff.getUTCFullYear() - 1970) + " años " + (diff.getUTCMonth()) + " meses " + (diff.getUTCDate() - 1) + " días."
        return antiguedad

    }
}

const empleado1 = new Empleado("Carlos Gomez", 1234, "gerente", "12/15/1990");
const empleado2 = new Empleado("Carla Diaz", 4567, "supervisora", "09/29/2012");
const empleado3 = new Empleado("Jorge Sanchez", 7890, "operario", "08/01/2018");


let empleados = []
empleados.push (empleado1, empleado2, empleado3)
console.log (empleados)

do {
    let legajo = prompt(" Ingrese número de legajo para calcular antigüedad, escriba 'ESC' para finalizar.")
    
    let buscarEmpleado = empleados.find((elemento) => {
        console.log (elemento)
        if (elemento.legajo == (Number(legajo))) {
            return true;
                    }
    })
    console.log (buscarEmpleado)
}
while ( legajo !== "ESC")



















// for (let i = 0; i < 3; i++) {
//     let legajo = prompt(" Ingrese número de legajo para calcular antigüedad")
//     if (Number(legajo) == legajo) {
//         switch (Number(legajo)) {
//             case empleado1.legajo:
//                 alert("La antigüedad del empleado " + empleado1.nombre + " es: " + empleado1.calcularAntiguedad())
//                 break;
//             case empleado2.legajo:
//                 alert("La antigüedad del empleado " + empleado2.nombre + " es: " + empleado2.calcularAntiguedad())
//                 break;
//             case empleado3.legajo:
//                 alert("La antigüedad del empleado " + empleado3.nombre + " es: " + empleado3.calcularAntiguedad())
//                 break;

//             default:
//                 alert("El número de legajo es incorrecto, vuelva a intentar")
//                 break;
//         }

//     }
// }





















