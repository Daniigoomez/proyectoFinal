let apellidoNombre =[];

let apellido = document.getElementById("apellido")

let nombre = document.getElementById("nombre")

let boton = document.getElementById("iniciarSeccion")

let resultado1 = document.getElementById("resultado1")

let resultado2 = document.getElementById("resultado2")


window.onload = function(){
    
    let UsuarioUno = localStorage.getItem("apellidoGuardado")
    if (UsuarioUno){
        resultado1.innerHTML = UsuarioUno

        resultado1.innerHTML = `Bienvenido: ${fechaNac.apellido}, Nombre: ${fechaNac.nombre}, Inicio seccion: ${fechaNac.fecha} `;
    }
    let UsuarioDos = localStorage.getItem("nombreGuardado")
    if (UsuarioDos){
        resultado2.innerHTML = UsuarioDos

    }
}
  

boton.addEventListener("click",function(){

    let valorinput1 = apellido.value;

    let valorinput2 = nombre.value;

    let fechaNac = {
        apellido:valorinput1,
        nombre:valorinput2,
        fecha:new Date().toLocaleDateString()
     } 

     apellidoNombre.push(fechaNac)

    resultado1.innerHTML = `Bienvenido: ${fechaNac.apellido}, Inicio seccion el dia: ${fechaNac.fecha}`

    localStorage.setItem("apellidoGuardado",JSON.stringify(fechaNac))
    localStorage.setItem("nombreGuardado",JSON.stringify(fechaNac))
    
    apellido.value = ""
    nombre.value = ""

    
})


const Alimento = function (nombre,caracteristica,kg,precio){
    this.nombre = nombre
    this.caracteristica= caracteristica  
    this.kg = kg
    this.precio = precio
    }


let alimento1 = new Alimento ("kongo","adulto", 20 , 8999)
let alimento2 = new Alimento ("pedigree","cachorro", 15 , 7000)
let alimento3 = new Alimento ("royal canin","adulto", 15 , 15000)
let alimento4 = new Alimento ("proplan","cachorro", 20 , 1400)
let alimento5 = new Alimento ("old prince","adulto", 15 , 12000)
let alimento6 = new Alimento ("nutribom","cachorro", 20 , 7000)


let stock = [alimento1,alimento2,alimento3,alimento4,alimento5,alimento6]

if(localStorage.getItem("productos")){
    stock = JSON.parse(localStorage.getItem("productos"))
}else{
    stock = stock
}

function filtrarStock(){
    const body = document.querySelector("body")
    const input = document.getElementById("filtrarProducto").value
    const palabra = input.trim().toUpperCase()
    const resultado = stock.filter ((producto) => producto.nombre.toUpperCase().includes(palabra))
    

    if(resultado.length >0){ 
   
        const constainer = document.createElement("div")
        constainer.classList.add("container")
        
        resultado.forEach((x)=>{
            const card = document.createElement("div")
        
        const nombre = document.createElement("h3")
        nombre.textContent = `Nombre: ${ x.nombre}`
        card.append(nombre)
    

        const caracteristica = document.createElement("p")
        caracteristica.textContent = `De tipo: ${x.caracteristica}`
        card.appendChild(caracteristica)

        const kg = document.createElement("p")
        kg.textContent = `Bolson de kg: ${x.kg}`
        card.append(kg)

        const precio = document.createElement("p")
        precio.textContent = `Su importe $ : ${x.precio}`
        card.appendChild(precio)

        constainer.appendChild(card)

     })
     body.appendChild(constainer)
 }else{
    Swal.fire({
        title: "No se encontro la Marca de Alimento",
        text: "Agregar Alimento para poder continuar",
        icon: "error"
      });
 }
    
 }
  


 function agregarAlimento(){
     const form = document.createElement("form")
     form.innerHTML=`
     <label for="nombre-input">Nombre:</label>
     <input id="nombre-input" type="text" step="0.01" required>

     <label for="caracteristica-input">Caracteristica:</label>
     <input id="caracteristica-input" type="text" step="0.01" required>

     <label for="precio-input">Precio:</label>
     <input id="precio-input" type="number" step="0.01" required>

     <label for="kg-input">kg:</label>
     <input id="kg-input" type="number" step="0.01" required>

     <button type ="submit">Agregar</button>    
     `
 
     form.addEventListener("submit", function (e){
        e.preventDefaul();

        const nombreInput = documentElement.getElementById("nombre-input").value.trim()
        const caracteristicaInput = documentElement.getElementById("caracteristica-input")
        const precioInput = parseFloat(document.getElementById("precio-input").value)
        const kgInput = parseInt(document.getElementById("kg-input").value)

        if(isNaN(precioInput)|| isNaN(kgInput) || isNaN(caracteristicaInput) ||nombreInput ===""){
            Swal.fire({
                title: "No se encontro la Marca de Alimento",
                text: "Agregar Alimento para poder continuar",
                icon: "error"
              });
     
              const producto = new Alimento(nombreInput,precioInput,kgInput,caracteristicaInput)

              if(stock.some((x)=> x.nombre === producto.nombre)){
                Swal.fire({
                    text: "Este alimento ya existe",
                    icon: "error"
                  });    

              }
              stock.push(producto)

              localStorage.setItem("productos", JSON.stringify(stock))
              alert(`se agrego el producto ${producto.nombre}`)

              const container = document.createElement("div")

              stock.forEach((producto)=>{
                const card = document.createElement("div")

                const nombre = document.createElement("h2")
                nombre.textContent = `nombre: ${producto.nombre}`
                card.append(nombre)
            
        
                const caracteristica = document.createElement("h3")
                caracteristica.textContent = `caracrteristica: ${producto.caracteristica}`
                card.appendChild(caracteristica)
        
                const kg = document.createElement("h3")
                kg.textContent = `kg: ${producto.kg}`
                card.append(kg)
        
                const precio = document.createElement("h4")
                precio.textContent = `precio: ${producto.precio}`
                card.appendChild(precio)
        
                constainer.appendChild(card)

              })

              const body = document.querySelector("body")
              body.appendChild(container)

              form.reset()
        }

        const body = document.querySelector("body")
        body.appendChild(form)


    })
}
    
    const buscarBtn = document.getElementById("bucar")
    buscarBtn.classList.add("button")
    buscarBtn.addEventListener("click",filtrarStock)

    const agregarBtn = document.getElementById("agregarAlimento")
    agregarBtn.addEventListener("click",agregarAlimento)

    let url = "https://pokeapi.co/api/v2/pokemon?limit=1"
 
    const pokemonContainer = document.getElementById("pokemon-container")

    fetch(url)
    .then((res)=> res.json())
    .then(data =>{

      let pokemon = data.results  

      pokemon.forEach((x)=>{
        fetch(x.url)
        .then((res)=> res.json())
        .then(pokemonData =>{

            const pokemonElement = document.createElement("div")
            pokemonElement.innerHTML=`
            <h2>${pokemonData.name}</h2>
            <img src="${pokemonData.sprites.front_default}">       
            `
            pokemonContainer.appendChild(pokemonElement)
        })

       }) 
       .catch(error =>{
        console.error("Es incorrecto")
       })
      
    })

 
    fetch("productos.json")
    .then( (response)=> response.json())
    .then( data=>{
        const productos = data.productos
        const productosContainer = document.getElementById("producto-container")
        productos.forEach( producto =>{
            const productosElement = document.createElement("p")
            productosElement.textContent = `Nombre: ${producto.nombre}, Precio:${producto.precio} `
            productosContainer.appendChild(productosElement)
        })


    })
    .catch (error=>{
        console.error("valores invalidos")

    })

 


 

