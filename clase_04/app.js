// Crear al menos un objeto para controlar el funcionamiento de tu simulador.
// Incorporarle sus propiedades y su constructor.

class Empleado{
    constructor(nombre,legajo,puesto, fechaIngreso){
        this.nombre = nombre;
        this.legajo = legajo;
        this.puesto = puesto;
        this.fechaIngreso = fechaIngreso;
    }
    calcularAntiguedad(){
        var actual = new Date();
        var diff = new Date(actual- (new Date(this.fechaIngreso)));
        var antiguedad = (diff.getUTCFullYear() - 1970) + " años " + (diff.getUTCMonth()) + " meses " + (diff.getUTCDate() - 1) + " días."
        return antiguedad

    }
}

const empleado1 = new Empleado ("carlos gomez", 1234, "gerente", "10/07/1990");
const empleado2 = new Empleado ("carla diaz", 4567, "supervisora", "02/09/2012");
const empleado3 = new Empleado ("jorge sanchez", 7890, "operario", "20/01/2018");

for ( let i = 0; i < 3; i++){
    let legajo = prompt (" Ingrese número de legajo para calcular antigüedad")
    if (Number (legajo) == legajo)
}

console.log (empleado1.calcularAntiguedad())



















// Invocar a ese objeto en algún momento donde el usuario realice alguna acción.
// Utilizar sus mètodos.

