document.addEventListener('DOMContentLoaded', function(){

    // Seleccionar elementos
    const inputEmail =  document.querySelector('#email');
    const inputAsunto =  document.querySelector('#asunto');
    const inputMensaje =  document.querySelector('#mensaje');
    //const inputFormulario =  document.querySelector('#formulario');

    // Llamar addEventListener
    inputEmail.addEventListener('blur',validar);
    inputAsunto.addEventListener('blur',validar);
    inputMensaje.addEventListener('blur',validar);

    function validar(event){
        
        validarVacio(event);

    }

    function validarVacio(event){
        
        if(event.target.value.trim() === ''){
            mostrarAlerta(`El campo ${event.target.id} es obligatorio`, event.target.parentElement);
            return;
        }
        
        limpiarAlerta(event.target.parentElement);
        console.log("CORRECTO");
        const valueInputEmail = event.target.value.trim();
        console.log("valueInputEmail - " + valueInputEmail);
        
    }

    function mostrarAlerta(mensaje, ref){
        // Limpiar alerta 
        limpiarAlerta(ref);
                
        // Generar HTML para warning
        const errorParrafo = document.createElement('P');
        errorParrafo.textContent = mensaje;
        errorParrafo.classList.add('bg-red-600', 'p-2', 'text-white', 'rounded-lg');

        // Inyectar dentro de cada div
        ref.appendChild(errorParrafo);
    }

    function limpiarAlerta(ref){
        // Comprobar si existe otra alerta
        var parrafoAlert = ref.querySelector('p');

        if (parrafoAlert) {
            parrafoAlert.remove();
        }
    }
});