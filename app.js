let amigos = []; // Array para almacenar los amigos para el sorteo
let lista = document.getElementById("listaAmigos");
let resultado = document.getElementById("resultado");
let amigoInput = document.getElementById("amigo");
let sorteoBtn = document.getElementById("sorteoBtn");
let agregarBtn = document.getElementById("agregarBtn");
let reinicioBtn = document.getElementById("reinicioBtn");
let mensajeAlerta = document.getElementById("mensajeAlerta");
let alertaVisible = false;
let confetiLanzado = false; 

// Evento para escuchar la tecla "Enter" y agregar amigo
amigoInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Evita el comportamiento por defecto (enviar formulario)
        agregarAmigo();
    }
});

// Función para mostrar mensaje de alerta en caso de error
function mostrarAlerta(mensaje) {
    if (alertaVisible) return;

    alertaVisible = true;
    mensajeAlerta.textContent = mensaje; 
    mensajeAlerta.style.display = "block";
    setTimeout(function() {
        mensajeAlerta.style.display = "none";
        alertaVisible = false;
    }, 2000);
}

// Función para agregar un amigo a la lista
function agregarAmigo() {
    let inputAmigo = amigoInput.value.trim();

    // Validación de nombre válido
    if (inputAmigo === "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(inputAmigo)) {
        mostrarAlerta("¡Error! Ingrese un nombre válido (solo letras y espacios)");
        amigoInput.value = "";
        return;
    }

    // Verificación de nombre duplicado
    if (amigos.some(amigo => amigo.toUpperCase() === inputAmigo.toUpperCase())) {
        mostrarAlerta("Este participante ya está en la lista");
        amigoInput.value = "";
        return;
    }

    amigos.push(inputAmigo);

    let nuevoAmigo = document.createElement('li'); 
    nuevoAmigo.textContent = inputAmigo;

    lista.appendChild(nuevoAmigo);
    resultado.textContent = "¡Participante agregado con éxito!"; 
    amigoInput.value = "";
}

document.getElementById("sorteoBtn").removeAttribute('disabled');

// Función para gestionar el estado de los botones
function gestionarBotones(desactivar) {
    sorteoBtn.disabled = desactivar;
    amigoInput.disabled = desactivar;
    agregarBtn.disabled = desactivar;
    reinicioBtn.disabled = !desactivar;
}

// Función para sortear un amigo secreto y mostrar el resultado
function sortearAmigo() {
    let indice = Math.floor(Math.random() * amigos.length);

    // Verificar si hay amigos suficientes
    if (amigos.length === 0) {
        resultado.textContent = "Por favor. Ingrese algún dato";
    } else if (amigos.length < 3) {
        resultado.textContent = "Ingrese 3 amigos o más para poder iniciar";
    } else {
        resultado.innerHTML = `¡Felicidades! ¡Tu amigo secreto es <span class="subrayado">${amigos[indice]}</span>!`;
        amigoInput.value = "";

        const listItems = document.querySelectorAll('ul li');
        listItems.forEach((item, i) => {
            if (i === indice) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });

        // Modificar botones al finalizar el sorteo
        gestionarBotones(true);

        // Lanzar confeti solo si no se ha lanzado
        if (!confetiLanzado) {
            dispararConfeti();
            confetiLanzado = true; 
        }
    }
}

// Función optimizada para disparar el confeti
function dispararConfeti() {
    if (confetiLanzado) return;

    // Creamos 10 puntos en el eje X (de 0.1 a 1.0)
    const puntosOrigen = Array.from({ length: 10 }, (_, i) => (i + 1) / 10);

    // Lanza el confeti desde cada uno de los 10 puntos
    puntosOrigen.forEach((x) => {
        confetti({
            particleCount: 200, // Cantidad de partículas por ráfaga
            startVelocity: 80, // Velocidad de salida
            spread: 540, // Rango de dispersión
            ticks: 150, // Duración de la animación
            gravity: 0.5, // Gravedad para que caiga más lento
            scalar: 2, // Aumenta el tamaño de las partículas
            decay: 0.9, // Hace que desaparezca más suavemente
            origin: { x: x, y: 0 }, // Posición inicial en el eje X y la parte superior de la pantalla
            shapes: ['square', 'circle', 'triangle'], 
            colors: ["#ff0", "#ff6347", "#ff1493", "#00bfff", "#32cd32", "#ff4500", "#0026ff", "#9400d3", "#ff8c00", "#1e90ff", "#ff69b4", "#00fa9a"], 
        });
    });
    confetiLanzado = true; 
}

// Función para limpiar el confeti
function limpiarConfeti() {
    confetti.reset();
    confetiLanzado = false;
}

// Función para reiniciar el sorteo con una animación de desvanecimiento
function reiniciarSorteo() {
    lista.classList.add("fade-out");
    resultado.classList.add("fade-out");
    setTimeout(() => {
        amigos = [];
        lista.innerHTML = '';
        resultado.textContent = ''; 
        limpiarConfeti(); 

        lista.classList.remove("fade-out");
        resultado.classList.remove("fade-out");

        // Restaura los botones para la próxima ronda
        gestionarBotones(false);

        // Reinicia el estado del confeti
        confetiLanzado = false; 
    }, 500);
}