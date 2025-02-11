let amigos = [];
let lista = document.getElementById("listaAmigos");

document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Evita que el formulario se envíe o se realice algún comportamiento por defecto
        agregarAmigo();
    }
});

function mostrarAlerta(mensaje) {
    const alerta = document.getElementById("mensajeAlerta");
    alerta.innerHTML = mensaje;
    alerta.style.display = "block";

    // Ocultar el mensaje después de 3 segundos
    setTimeout(function() {
        alerta.style.display = "none";
    }, 3000);
}

function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo").value.trim();

    if (inputAmigo === "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(inputAmigo)) {
        mostrarAlerta("¡Error! Ingrese un nombre válido (solo letras y espacios)");
        document.getElementById("amigo").value = "";
        return;
    }

    if(amigos.some(amigo => amigo.toUpperCase() === inputAmigo.toUpperCase())){
        mostrarAlerta("Ese nombre está duplicado");
        document.getElementById("amigo").value = "";
        return;
    }

    amigos.push(inputAmigo);
    lista.innerHTML = amigos.map(amigo => `<li>${amigo}</li>`).join("");
    document.getElementById("amigo").value = "";
    document.getElementById("sorteoBtn").removeAttribute('disabled');
}

document.getElementById("sorteoBtn").removeAttribute('disabled');

function sortearAmigo(){
    let resultado = document.getElementById('resultado');
    let indice = Math.floor(Math.random() * amigos.length);

    if (amigos.length === 0){
        resultado.innerHTML = "Por favor. Ingrese los nombres de sus amigos para el sorteo"
    } else if (amigos.length < 3){
        resultado.innerHTML = "Por favor. Ingrese 3 o más amigos para el sorteo"
    } else {
        resultado.innerHTML = `Seleccionó a ${amigos[indice]} como su amigo/a secreto`;
        document.getElementById("sorteoBtn").setAttribute('disabled', 'true');
        document.getElementById("amigo").setAttribute("disabled", "true");
        document.getElementById("agregarBtn").setAttribute("disabled", "true");
        document.getElementById("reinicioBtn").removeAttribute('disabled');
    }
}

function reiniciarSorteo() {
    amigos = [];
    lista.innerHTML = '';
    document.getElementById("sorteoBtn").removeAttribute('disabled');
    document.getElementById("amigo").removeAttribute("disabled");
    document.getElementById("agregarBtn").removeAttribute("disabled");
    document.getElementById("reinicioBtn").setAttribute("disabled", "true");
    document.getElementById("resultado").innerHTML = '';
}