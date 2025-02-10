
let amigos = [];
let lista = document.getElementById("listaAmigos");

function agregarAmigo() {
    let inputAmigo = document.getElementById("amigo").value.trim();

    if (inputAmigo === "" || !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(inputAmigo)) {
        alert("¡Error! Ingrese un nombre válido (solo letras y espacios)");
        document.getElementById("amigo").value = "";
        return;
    }

    amigos.push(inputAmigo);
    lista.innerHTML = amigos.map(amigo => `<li>${amigo}</li>`).join("");
    document.getElementById("amigo").value = "";
}

function sortearAmigo(){
    let resultado = document.getElementById('resultado');
    let indice = Math.floor(Math.random() * amigos.length);

    if(amigos.length === 0){
        alert("Por favor. Ingrese un nombre");
        return;
    } else {
        resultado.innerHTML = `Seleccionó a ${amigos[indice]} como su amigo/a secreto`;
    }
}