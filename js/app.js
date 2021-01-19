// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];
const fragment = new DocumentFragment();


// Event Listeners
eventListeners();
function eventListeners() {
    
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit", agregarTweet);

    // Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        crearHTML();
    });
}


// Funciones
function agregarTweet(evt) {
    evt.preventDefault();
    
    // Textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value.trim();
    
    // Validación...
    if(tweet === "") {
        mostrarError("Un mensaje no puede ir vacio");
        return; // Evita que se ejecuten más lineas de código
    }

    const tweetObj = {
        id: Date.now(),
        tweet 
    };

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Se agrega el HTML
    crearHTML();

    // Reiciniar el formulario
    formulario.reset();
}

// Mostrar Mensaje de Error
function mostrarError(error) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector("#contenido");

    if( !document.querySelector(".error") ) {
        fragment.appendChild(mensajeError);
        contenido.appendChild(fragment);

        setTimeout(() => {
            mensajeError.remove();
        }, 3000);
    }
}

// Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            // Agregar un boton de eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerText = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            // Crear el HTML
            const li = document.createElement("li");

            // Añadir el text
            li.textContent = tweet.tweet;

            // Insertarlo al fragment para inyectarlo al HTML
            fragment.appendChild(li);

            // Asignar el boton
            fragment.lastChild.appendChild(btnEliminar);

        });
        listaTweets.appendChild(fragment);
    }

    sincronizarStorage();
}

// Sincroniza los tweets actuales al localstorage
function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id );
    
    crearHTML();
}

function limpiarHTML() {
    listaTweets.textContent = '';
}
