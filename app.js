let amigos = []; // Array para almacenar los amigos para el sorteo
let lista = document.getElementById("listaAmigos");

// Evento para escuchar la tecla "Enter" y agregar amigo
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Evita el comportamiento por defecto (enviar formulario)
        agregarAmigo();
    }
});

// Función para mostrar mensaje de alerta en caso de error
function mostrarAlerta(mensaje) {
    const alerta = document.getElementById("mensajeAlerta");
    alerta.innerHTML = mensaje;
    alerta.style.display = "block";
    setTimeout(function() {
        alerta.style.display = "none"; // Ocultar alerta después de 1 segundo
    }, 1000);
}

// Función para agregar un amigo a la lista
function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo").value.trim();

    // Validación de nombre válido
    if (inputAmigo === "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(inputAmigo)) {
        mostrarAlerta("¡Error! Ingrese un nombre válido (solo letras y espacios)");
        document.getElementById("amigo").value = "";
        return;
    }
    // Verificación de nombre duplicado
    if(amigos.some(amigo => amigo.toUpperCase() === inputAmigo.toUpperCase())){
        mostrarAlerta("Ese amigo ya fue agregado");
        document.getElementById("amigo").value = "";
        return;
    }

    amigos.push(inputAmigo); // Agrega el amigo al array

    let nuevoAmigo = document.createElement('li'); // Crea un nuevo elemento de lista
    nuevoAmigo.textContent = inputAmigo;
    lista.appendChild(nuevoAmigo);

    document.getElementById("amigo").value = "";
    document.getElementById("sorteoBtn").removeAttribute('disabled');
}

document.getElementById("sorteoBtn").removeAttribute('disabled');

// Función para sortear un amigo secreto y mostrar el resultado
function sortearAmigo(){
    let resultado = document.getElementById('resultado');
    let indice = Math.floor(Math.random() * amigos.length);

    // Condicionales para verificar las listas
    if (amigos.length === 0){
        resultado.innerHTML = " Por favor. Ingrese algún nombre"
    } else if (amigos.length < 3){
        resultado.innerHTML = "Por favor. Ingrese 3 o más amigos para iniciar"
    } else {
        resultado.innerHTML = `¡Felicidades! ¡Tu amigo secreto es <span class="subrayado">${amigos[indice]}</span>!`;

        const listItems = document.querySelectorAll('ul li');
        listItems.forEach((item, i) => {
            if (i === indice) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });

        // Modifica los botones al finalizar el sorteo
        document.getElementById("sorteoBtn").setAttribute('disabled', 'true');
        document.getElementById("amigo").setAttribute("disabled", "true");
        document.getElementById("agregarBtn").setAttribute("disabled", "true");
        document.getElementById("reinicioBtn").removeAttribute('disabled');
    }
}

// Función para reiniciar el sorteo con una animación de desvanecimiento
function reiniciarSorteo() {
    lista.classList.add("fade-out");
    resultado.classList.add("fade-out");
    setTimeout(() => {
        amigos = [];
        lista.innerHTML = '';
        resultado.innerHTML = '';

        // Restaura los estilos para la próxima ronda
        lista.classList.remove("fade-out");
        resultado.classList.remove("fade-out");

        // Restaura los botones para la próxima ronda
        document.getElementById("sorteoBtn").removeAttribute('disabled');
        document.getElementById("amigo").removeAttribute("disabled");
        document.getElementById("agregarBtn").removeAttribute("disabled");
        document.getElementById("reinicioBtn").setAttribute("disabled", "true");
    }, 500); // Espera 0.5 segundos hasta que termine la animación
}