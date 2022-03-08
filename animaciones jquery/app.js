class Camiseta {
    constructor(camiseta, cantidad) {
        this.id = camiseta.id;
        this.nombre = camiseta.nombre;
        this.precio = camiseta.precio;
        this.cantidad = 1;
        this.precioTotal = camiseta.precio;
        this.talle = camiseta.talle;

    }

    agregarUnidad() {
        this.cantidad++;
    }

    agregarTalle(talleElegido) {
        this.talle.push(talleElegido);
    }

    quitarUnidad() {
        this.cantidad--;
    }

    actualizarPrecioTotal() {
        this.precioTotal = this.precio * this.cantidad;
    }

}


/* Stock de camisetas */
const camisetas = [{
    id: 0,
    nombre: "Camiseta Titular 2021/22",
    descripcion: "Camiseta Puma Titular de Juego 2021/22 ",
    precio: 8999,
    talle: ["S", "M", "L", "XL"],
    img: "./img/camiseta_2022.jpg",
},
{
    id: 1,
    nombre: "Camiseta Alternativa Blanca",
    descripcion: "Camiseta Puma Alternativa de Juego 2021-22 ",
    precio: 10599,
    talle: ["S", "M", "L", "XL"],
    img: "./img/alternativa-2022-blanca.jpg",
},
{
    id: 2,
    nombre: "Camiseta Paladar Negro",
    descripcion: "Camiseta Puma 3° Edición 2021-22",
    precio: 11399,
    talle: ["S", "M", "L", "XL"],
    img: "./img/paladar-negro-2022.jpg",
},
{
    id: 3,
    nombre: "Camiseta Retro Adidas 1995",
    descripcion: "Camiseta Adidas sponsor Ades titular",
    precio: 5500,
    talle: ["S", "M", "L", "XL"],
    img: "./img/retro_1995.jpeg",
},
{
    id: 4,
    nombre: "Camiseta Campeón 2010",
    descripcion: "Camiseta Puma sponsor Motomel alternativa",
    precio: 4300,
    talle: ["S", "M", "L", "XL"],
    img: "./img/campeon_2010.jpg",
},
{
    id: 5,
    nombre: "Camiseta Campeón 2017",
    descripcion: "Camiseta Puma roja con parche Sudamericana",
    precio: 7000,
    talle: ["S", "M", "L", "XL"],
    img: "./img/camiseta_2017.jpg",
}
];

/* Declaración de variables globales */

var carrito = [];
let precioTotal;
let idProducto;
let tallesValidos = ["S", "M", "L", "XL"]

/* Función para corroborar si tenemos un carrito cargado en el Storage */
function carritoEnStorage() {
    let contenidoStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));
    if (contenidoStorage) {
        let array = [];
        for (let i = 0; i < contenidoStorage.length; i++) {
            let camiseta = new Camiseta(
                contenidoStorage[i],
                contenidoStorage[i].cantidad
            );
            camiseta.actualizarPrecioTotal();
            array.push(camiseta);
        }
        return array;
    }
    return [];
}

/* Función para imprimir las camisetas en el body */
function catalogo(camisetas) {
    let contenedor = document.getElementById("contenedor");
    for (const producto of camisetas) {
        let card = document.createElement("div");
        card.innerHTML = `
        <div class="card camiseta rounded-3 text-center" >
            <div class="card-body catalogo">
                <img src="${producto.img}" id="" class="" alt="">
                <h2 class="card-title text-white my-3">${producto.nombre}</h2>
                <h5 class="card-subtitle  text-white mb-2 ">${producto.descripcion}</h5>
                <p class="card-text text-white fs-4 fw-bold">$${producto.precio}</p>
                <form id="${producto.id}">
                <div class="container">
                    <div class="row">
                        <div class="col ">
                        <select id="select${producto.id}" class="form-select " >
                        <option disabled  selected>Seleccioná el talle</option>
                        <option value="1">S</option>
                        <option value="2">M</option>
                        <option value="3">L</option>
                        <option value="4">XL</option>
                    </select>
                    </div>
                    <div class="col">
                        <input id="agregar${producto.id}" disabled type="submit" value="Agregar"  class="btn fw-bold text-white agregar w-100 ">                     
                    </div> 
                    </div>
                </div>
              
                </form>
            </div>
        </div>      
        `;
        contenedor.appendChild(card);

        let select = document.getElementById(`select${producto.id}`);
        select.onchange = (e) => {
            validar(e, producto.id)
        }

        let prueba = document.getElementById(`${producto.id}`);
        prueba.addEventListener("submit", validarFormulario);
    }
}
carrito = carritoEnStorage();

/* Función para validar la selección y habilitar el botón agregar */
function validar(e, productoId) {
    e.preventDefault();
    let seleccionado = e.target    
    document.getElementById(`agregar${productoId}`).disabled = "disabled";
    if (seleccionado.value == null || seleccionado.value == 0) {
        return false;
    }
    document.getElementById(`agregar${productoId}`).disabled = false;
}

/* Función para validar el formulario y deshabilitar el botón agregar */
function validarFormulario(e) {
    e.preventDefault();
    let formulario = e.target
    let select = document.getElementById(`select${formulario.id}`);   
    agregarAlCarrito(formulario.id, select.value)
    formulario.reset()
    document.getElementById(`agregar${formulario.id}`).disabled = "disabled";
}

/* Función que dibuja el modal del carrito */
function vistaPrevia() {
    let carrito = JSON.parse(localStorage.getItem("carritoEnStorage"));
    let precioTotal = 0;
    let resumenCompra = document.getElementById("resumen");
    if (carrito) {
        precioTotal = obtenerPrecioTotal(carrito);
        $("#btnconfirmar").prop('disabled', false);
        for (let camiseta of carrito) {

            let card = document.createElement("div");
            card.innerHTML = `            
                <div class="card mt-3 resumen">
                  <div class="card-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-8">
                                 <h5 class=" card-title">${camiseta.nombre}</h5>
                                 <p class="card-text">Precio: ${camiseta.precioTotal} Talle: ${camiseta.talle} Cantidad: ${camiseta.cantidad}</p>
                            </div>
                            <div class="col">
                                 <a href="#" id="eliminar${camiseta.id}"  role="button" class="btn fw-bold text-white agregar">Eliminar</a>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>           
              `;
            resumenCompra.appendChild(card);
            let botonEliminar = document.getElementById(`eliminar${camiseta.id}`)
            botonEliminar.onclick = () => eliminarDelCarrito(camiseta.id)
        }
    } else {
        $("#btnconfirmar").prop('disabled', true);
    }
    let total = document.createElement("div");
    total.innerHTML = `
    <p class="m-3 fw-bold text-end" >Precio Total de Compra: ${precioTotal}</p> `;
    resumenCompra.appendChild(total)

}

/* Función para agregar una camiseta al carrito */
function agregarAlCarrito(idProducto, talle) {
    let camisetaEnCarrito = carrito.find((elemento) => {
        if (elemento.id == idProducto) {
            return true;
        }
    });

    let talleElegido = tallesValidos[talle - 1];

    if (camisetaEnCarrito) {
        let index = carrito.findIndex((elemento) => {
            if (elemento.id === camisetaEnCarrito.id) {
                return true;
            }
        });

        carrito[index].agregarUnidad();
        carrito[index].actualizarPrecioTotal();
        carrito[index].agregarTalle(talleElegido);
    } else {
        let camisetaElegida = {
            id: camisetas[idProducto].id,
            nombre: camisetas[idProducto].nombre,
            descripcion: camisetas[idProducto].descripcion,
            precio: camisetas[idProducto].precio,
            talle: [talleElegido]
        }
        console.log(camisetaElegida)
        carrito.push(new Camiseta(camisetaElegida, 1));
    }

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));

}

/* Función para eliminar los productos del modal efectuada para evitar que cuando se cierre el modal y se vuelva a abrir se dupliquen los productos además sirve para que cuando se confirme la compra los elementos desaparezcan del modal */
function eliminarProductosAnteriores() {
    let resumenCompra = document.getElementById("resumen");
    while (resumenCompra.hasChildNodes()) {
        resumenCompra.removeChild(resumenCompra.firstChild);
    }
}

/* Función para eliminar la alerta del modal  */
function eliminarAlerta() {
    let alert = document.getElementById("alert");
    if (alert) {
        alert.remove()
    }
}

/* Función para eliminar un producto del carrito */
function eliminarDelCarrito(id) {
    eliminarProductosAnteriores()
    let camiseta = carrito.find((camiseta) => camiseta.id === id);

    let index = carrito.findIndex((element) => {
        if (element.id === camiseta.id) {
            return true;
        }
    });

    if (camiseta.cantidad > 1) {
        carrito[index].quitarUnidad();
        carrito[index].actualizarPrecioTotal();
    } else {
        carrito.splice(index, 1);

        if (carrito.length === 0) {
            carrito = [];
        }
    }
    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));

    vistaPrevia(carrito);
}

/* Función para calcular el costo total del carrito */
function obtenerPrecioTotal(array) {
    let precioTotal = 0;

    for (const producto of array) {
        precioTotal += producto.precioTotal;
    }
    return precioTotal;
}

catalogo(camisetas);


let botonCarrito = document.getElementById("boton-carrito")
botonCarrito.onclick = () => vistaPrevia()

let botonCerrar = document.getElementById("cerrar-modal")
botonCerrar.onclick = () => {
    eliminarProductosAnteriores();
    eliminarAlerta();
}

/* Se llama al botón cerrar para que se controle el cierre del modal y que al mismo tiempo se borre lo cargado en el modal */
$("#cerrar").click(() => {
    $('#carrito').modal('toggle');
    eliminarProductosAnteriores();
    eliminarAlerta();
})

/* Se agrega por jquery el boton confirmar en el modal */
/* $(".modal-footer").append(`<button id="btnconfirmar" type="button" class="btn btn-success">Confirmar</button>`);
 */
$(".modal-footer").append(`<p>Test</p>`);

$(".caja").append("<p>Test</p>");


/* Se maneja el evento click del botón confirmar para que desaparezcan los productos del modal, se cree una alerta de compra exitosa, se limpie el local storage y se deshabilite el boton agregar */
$("#btnconfirmar").click(() => {
    eliminarProductosAnteriores()
    $('.modal-body').prepend(`<div id="alert" class="alert alert-success d-flex align-items-center" role="alert"> <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/><symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </symbol></svg>Compra exitosa</div>`);
    localStorage.clear()
    $("#btnconfirmar").prop('disabled', true);
});





$("body").append('<div id="main">Lorem ipsum dolor sit, amet consectetur adipisicing elitAd, eligendi. Amet, autem? Ratione, sit? Facere perferendis necessitatibus architectoet ullam nulla quo quas sequi! Nobis dicta obcaecati expedita tempora? Placeat</div>')


//declaramos los metodos de animacion en cadena

$("#main").css("color", "red")
    .slideUp(3000)
    .delay(2000)
    .slideDown(3000);
  
