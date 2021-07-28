/* Agregar a mi lista */


const cards = document.getElementById('cards');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const templateFooter = document.getElementById('template-footer').content;
const templateCarrito = document.getElementById('template-carrito').content;
const items = document.getElementById('items')
const footer = document.getElementById('footer')
let carrito = {}

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarLista()
    }
})

cards.addEventListener('click', e => {
    addCarrito(e)
})

items.addEventListener('click', e=>{
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('./data/api.json')
        const data = await res.json()
        /* console.log(data)  */
        pintarCards(data)
    } catch (error) {
        console.log(error)

    }
}



const pintarCards = data => {
    
    data.forEach(peliculas => {
        
        
        templateCard.querySelector('h5').textContent = peliculas.title
        templateCard.querySelector('p').textContent = peliculas.publicacion
        templateCard.querySelector('img').setAttribute("src", peliculas.thumbnailUrl)
        templateCard.querySelector('.btn-dark').dataset.id = peliculas.id


        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    /* console.log(e.target)
    console.log(e.target.classList.contains('btn-dark')) */
    if (e.target.classList.contains('btn-dark')) {
        setCarrito(e.target.parentElement)

    }
    e.stopPropagation()
}

const setCarrito = objeto => {

    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        publicacion: objeto.querySelector('p').textContent,
        cantidad: 1

    }

    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad /* +1 pendiente */

    }

    carrito[producto.id] = { ...producto }
    pintarLista()
    /* console.log(carrito) */
}

const pintarLista = () => {
    items.innerHTML = ''
    /* console.log(carrito) */
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment) 

    pintarFooter()

    localStorage.setItem('carrito', JSON.stringify(carrito))
}

 const pintarFooter = () => {
    footer.innerHTML = ''
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="5" class="text-danger">Lista vacia - Agrega algun titulo!</th>
        `
        return
    } 
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)

    templateFooter.querySelectorAll('td')[0].textContent = nCantidad

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById('vaciar-carrito')
    btnVaciar.addEventListener('click', ()=>{
        carrito = {}
        pintarLista()
    })
    
} 

const btnAccion = e =>{
    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0 ) {
            delete carrito[e.target.dataset.id]
        }
        pintarLista() 
    }

    e.stopPropagation()
}
