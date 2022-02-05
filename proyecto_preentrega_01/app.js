class Camiseta {
    constructor(camiseta) {
        this.codigo = camiseta.codigo;
        this.nombre = camiseta.nombre;
        this.precio = camiseta.precio;
        this.cantidad = 1;
        this.precioTotal = camiseta.precio;
        this.talle = camiseta.talle;
    }

    agregarUnidad() {
        this.cantidad++;
    }

    actualizarPrecioTotal() {
        this.precioTotal = this.precio * this.cantidad;
    }

}

const camisetas = [{
        id: 0,
        nombre: "Camiseta Titular",
        descripcion: "Camiseta Puma Titular de Juego 2021/22 ",
        precio: 8999,
        talle: ["S", "M", "L", "XL"],
    },
    {
        id: 1,
        nombre: "Camiseta Alternativa Blanca",
        descripcion: "Camiseta Puma Alternativa de Juego 2021-22 ",
        precio: 10599,
        talle: ["S", "M", "L", "XL"]
    },
    {
        id: 2,
        nombre: "Camiseta Paladar Negro",
        descripcion: "Camiseta Puma 3° Edición INDEPENDIENTE 2021-22 PALADAR NEGRO",
        precio: 11399,
        talle: ["S", "M", "L", "XL"]
    }
];

let carrito = [];
let precioTotal;
let idProducto;
let tallesValidos = ["S", "M", "L", "XL"]


function seleccion() {



    do {
        idProducto = prompt(`Escriba el número del producto que desea, o escriba 'ESC' para finalizar
        0: ${camisetas[0].nombre}, Precio: ${camisetas[0].precio}
        1: ${camisetas[1].nombre}, Precio: ${camisetas[1].precio}
        2: ${camisetas[2].nombre}, Precio: ${camisetas[2].precio}`);

        if (idProducto.toLocaleUpperCase() !== "ESC") {
            let buscarCamiseta = camisetas.find((elemento) => {
                if (elemento.id == Number(idProducto)) {
                    return true
                }
            });

            if (buscarCamiseta == undefined) {
                alert("El número es incorrecto, vuelva a intentar");

            } else {
                let talleIngresado = prompt("Seleccione el talle entre S, M, L, XL");
                let buscarTalle = tallesValidos.find((elemento) => {
                    if (elemento == talleIngresado.toLocaleUpperCase()) {
                        return true
                    }
                });
                if (buscarTalle == undefined) {
                    alert("Ingresó un talle incorrecto, vuelva a intentar");
                } else {
                    let talleElegido = camisetas.find((elemento) => {

                        let talle = elemento.talle.find((elem) => {
                            if (elem == talleIngresado.toLocaleUpperCase()) {
                                return true
                            }
                        })

                        if (talle) {
                            return true
                        }
                    })

                    if (talleElegido == undefined) {
                        alert("El talle no se encuentra en stock, vuelva a intentar");
                    } else {



                        alert(`Se agregó al carrito la ${camisetas[idProducto].nombre}`);
                        let camisetaCarrito = carrito.find((elemento) => {
                            if (elemento.id == idProducto) {
                                return true;
                            }
                        });

                        if (camisetaCarrito) {
                            let indice = carrito.findIndex((elemento) => {
                                if (elemento.id == camisetaCarrito.id) {
                                    return true;
                                }
                            });

                            carrito[indice].agregarUnidad();
                            carrito[indice].actualizarPrecioTotal();
                        } else {
                            let camisetaElegida = {
                                id: camisetas[idProducto].id,
                                nombre: camisetas[idProducto].nombre,
                                descripcion: camisetas[idProducto].descripcion,
                                precio: camisetas[idProducto].precio,
                                talle: talleElegido
                            }
                            carrito.push(new Camiseta(camisetaElegida));
                        }
                    }
                }

            }

        }

    } while (idProducto.toLocaleUpperCase() !== "ESC")


}

function obtenerPrecioTotal() {
    let precioTotal = 0;

    for (const producto of carrito) {
        precioTotal += producto.precioTotal;
    }
    return precioTotal
}

seleccion();
precioTotal = obtenerPrecioTotal();

alert(`El precio total de tu compra es de ${precioTotal}
Gracias por tu compra!`);