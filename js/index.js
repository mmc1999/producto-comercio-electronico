const $imagenesCarrousel = document.querySelectorAll(".imagenesMobile"),
    $numero = document.querySelector(".numero"),
    $segundoDivCarrito = document.querySelector(".segundoDivCarrito"),
    $divCarrito = document.querySelector(".divCarrito"),
    $elementosDelCarrito = document.querySelector(".elementosDelCarrito"),
    $imagenesMobile = document.querySelector(".imagenesMobile");

console.log($imagenesMobile)

let ultimoDiv = document.createElement("div");
    ultimoDiv.classList.add("comprarCarrito");
    ultimoDiv.innerHTML = `<p class="checkout">Checkout</p>`;

let j= 0;
const carrusel = e => {
    if(e.target.matches(".atras")) (j<=0) ? j=3 : j--;
    if(e.target.matches(".siguiente")) (j>=$imagenesCarrousel.length-1) ? j=0 : j++;
    for (let i = 0; i < $imagenesCarrousel.length; i++) { $imagenesCarrousel[i].style.display = "none" }
    $imagenesCarrousel[j].style.display = "block";
}

const sumarAlCarrito = e => {
    let cantidad = parseInt($numero.textContent);
    if(e.target.matches(".menos")) {
        cantidad--;
        $numero.textContent = cantidad;
        if(cantidad<0) $numero.textContent = 0;
    }
    if(e.target.matches(".mas")) {
        cantidad++;
        $numero.textContent = cantidad;
    }
    if(e.target.matches(`.divAnadirAlCarrito`) || e.target.matches(`.carritoDeCompras`)
     || e.target.matches(`.agregarCarrito`) && cantidad > 0) {
        $elementosDelCarrito.style.display = "block"
        $elementosDelCarrito.innerHTML = `${cantidad}`
        ultimoDiv.style.display = "inherit"
        $segundoDivCarrito.innerHTML = "";
        $segundoDivCarrito.innerHTML = `
        <img src="../images/image-product-1-thumbnail.jpg" alt="imagen pequeña de la zapatilla" class="imagenCarrito">
        <div>
            <p class="contenidoCarrito">Fall limited edition sneakers</p> 
            <p class="contenidoCarrito insertarCantidad">$${125} x ${cantidad} <b>$${125*cantidad}</b></p>
        </div>
        <img src="../images/icon-delete.svg" alt="imagen de un tacho de basura" class="tachoBasura">
        `;
        console.log($segundoDivCarrito.innerHTML)
        $divCarrito.insertAdjacentElement("beforeend", ultimoDiv)
    } else if(cantidad === 0){
        $segundoDivCarrito.innerHTML = ""
        $segundoDivCarrito.innerHTML += `<p class="cartaVacia">Your cart is empty</p>`
    }
    if(e.target.matches(".tachoBasura")) {
        $elementosDelCarrito.style.display = "none"
        $elementosDelCarrito.innerHTML = ""
        ultimoDiv.style.display = "none"
        $segundoDivCarrito.innerHTML = ""
        $segundoDivCarrito.innerHTML += `<p class="cartaVacia">Your cart is empty</p>`
    }
}



document.addEventListener("click", e => {
    /* MENU MOBILE */
    if(e.target.matches(".menuMobile") || e.target.matches(".cerrarMenu"))  {
        document.querySelector(".nav").classList.toggle("left")
        document.querySelector(".divCarrito").classList.add("top")
    }
    if(e.target.matches(".carritoDeCompras2")) {
        document.querySelector(".divCarrito").classList.toggle("top")
        document.querySelector(".nav").classList.remove("left")
    }
    //CARROUSEL DE IMAGENES
    carrusel(e)
    //CARRITO DE COMPRAS
    sumarAlCarrito(e)
    e.preventDefault();
})
// SACAR EL CARRITO SI BAJO 
document.addEventListener("scroll", () => {
    if(scrollY > 20) document.querySelector(".divCarrito").classList.add("top")
})

