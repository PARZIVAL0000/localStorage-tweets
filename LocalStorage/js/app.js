//variables
const $formulario = document.querySelector('.MyTweets_Formulario .formulario');
const $nuestroMensajes = document.querySelector(".MyTweets_Listados");



LoadEventListener();
let bancoMensajes = [];


function LoadEventListener(){
    $formulario.addEventListener('submit', MyTweets);
    document.addEventListener('DOMContentLoaded', DatosLocalStorage);
    $nuestroMensajes.addEventListener('click', EliminarMensaje);
}

function MyTweets(e){
    e.preventDefault();
    let $mensaje = document.querySelector('textarea');
    
    if($mensaje.value.trim() === "" || !$mensaje.value.trim().length > 0){
        $mensaje.style.border = "1px solid red";
        ImprimirAlerta("Las ideas no deben estar vacias ... :(", "error");
        return;
    }

    $mensaje.style.border = "1px solid green";
    EliminarAlerta();

    //Crear una personalizacion de nuestro mensaje...
    let ObjtMensaje = {
        mensaje : $mensaje.value,
        id : Date.now()
    }

    bancoMensajes = [...bancoMensajes, ObjtMensaje];

    CrearHTML();

}

function EliminarMensaje(e){
    if(e.target.classList.contains('eliminar-mensaje')){
        let $identificador = e.target.getAttribute('data-id');
        bancoMensajes  = bancoMensajes.filter(mensaje => mensaje.id !== parseInt($identificador));
        CrearHTML();
    }
}

function ImprimirAlerta($mensaje, $tipo){

    let $contenedor = document.querySelector('.formulario');

    let $parrafo = document.createElement('P');
    $parrafo.textContent = $mensaje;
    $parrafo.classList.add('alerta', $tipo);

    $contenedor.appendChild($parrafo);
}

function EliminarAlerta(){
    //Eliminar una alerta existente.
    $eliminar = document.querySelector('.alerta');
    if($eliminar){
        $eliminar.remove();
    }
}

function CrearHTML(){
    if(bancoMensajes.length > 0){

        LimpiarHTML();

        bancoMensajes.forEach(message => {
            const {mensaje, id} = message;

            const listado = document.createElement('li');
            listado.style.listStyleType = 'none';
            listado.classList.add('mensaje_listado');
            listado.innerHTML = `<p>${mensaje}</p>`;

            const eliminar_mensaje = document.createElement('A');
            eliminar_mensaje.href = '#';
            eliminar_mensaje.classList.add('eliminar-mensaje');
            eliminar_mensaje.setAttribute('data-id', id);
            eliminar_mensaje.textContent = 'X';

            listado.appendChild(eliminar_mensaje);
            $nuestroMensajes.appendChild(listado);
        });
    }else{
        LimpiarHTML();
    }

    SincronizandoLocalStorage();
}

function LimpiarHTML(){
    //Limpiaremos contenido duplicado dentor de nuestro HTML...
    while($nuestroMensajes.firstElementChild){
        $nuestroMensajes.removeChild($nuestroMensajes.firstElementChild);
    }
}

function SincronizandoLocalStorage(){
    localStorage.setItem('datos', JSON.stringify(bancoMensajes));
}

function DatosLocalStorage(){
    bancoMensajes = JSON.parse(localStorage.getItem("datos")) || [];
    CrearHTML();
}