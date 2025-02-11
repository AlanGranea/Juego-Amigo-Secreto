
let amigos = [];
let lista = document.getElementById("listaAmigos");

document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        agregarAmigo()
    }
});

function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo").value.trim();

    if (inputAmigo === "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(inputAmigo)) {
        alert("¡Error! Ingrese un nombre válido (solo letras y espacios)");
        document.getElementById("amigo").value = "";
        return;
    }

    if(amigos.some(amigo => amigo.toUpperCase() === inputAmigo.toUpperCase())){
        alert("Ese nombre está duplicado");
        document.getElementById("amigo").value = "";
        return;
    }

    amigos.push(inputAmigo);
    lista.innerHTML = amigos.map(amigo => `<li>${amigo}</li>`).join("");
    document.getElementById("amigo").value = "";
    document.getElementById("sorteoBtn").removeAttribute('disabled');

}

function sortearAmigo(){
    let resultado = document.getElementById('resultado');
    let indice = Math.floor(Math.random() * amigos.length);

    if (amigos.length < 3){
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
    amigosSorteados = [];
    lista.innerHTML = '';
    document.getElementById("amigo").removeAttribute("disabled");
    document.getElementById("agregarBtn").removeAttribute("disabled");
    document.getElementById("resultado").innerHTML = '';
}