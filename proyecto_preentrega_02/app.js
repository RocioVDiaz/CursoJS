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

var carrito = [];
let precioTotal;
let idProducto;
let tallesValidos = ["S", "M", "L", "XL"]

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

function validar(e, productoId) {

    e.preventDefault();

    let seleccionado = e.target

    document.getElementById(`agregar${productoId}`).disabled = "disabled";

    if (seleccionado.value == null || seleccionado.value == 0) {
        return false;
    }
    document.getElementById(`agregar${productoId}`).disabled = false;
}

function validarFormulario(e) {
    e.preventDefault();
    let formulario = e.target
    agregarAlCarrito(formulario.id, formulario.children[0].value)
    formulario.reset()
    document.getElementById(`agregar${formulario.id}`).disabled = "disabled";
}

function vistaPrevia() {
    let carrito = JSON.parse(localStorage.getItem("carritoEnStorage"));
    let precioTotal;

    if (carrito) {
        precioTotal = obtenerPrecioTotal(carrito);
    }

    let resumenCompra = document.getElementById("resumen");

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
    let total = document.createElement("div");
    total.innerHTML = `
    <p class="m-3 fw-bold text-end" >Precio Total de Compra: ${precioTotal}</p> `;

    resumenCompra.appendChild(total)


}

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
        carrito.push(new Camiseta(camisetaElegida, 1));
    }

    localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));

}

function eliminarProductosAnteriores() {
    let resumenCompra = document.getElementById("resumen");
    while (resumenCompra.hasChildNodes()) {
        resumenCompra.removeChild(resumenCompra.firstChild);
    }

}

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
botonCerrar.onclick = () => eliminarProductosAnteriores()