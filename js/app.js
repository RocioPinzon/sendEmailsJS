document.addEventListener('DOMContentLoaded', function(){

    //

    const dataEmail = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    // Seleccionar elementos
    const inputEmail =  document.querySelector('#email');
    const inputAsunto =  document.querySelector('#asunto');
    const inputMensaje =  document.querySelector('#mensaje');
    const formulario =  document.querySelector('#formulario');
    const btnSubmit =  document.querySelector('#formulario button[type="submit"]');
    const btnReset =  document.querySelector('#formulario button[type="reset"]');
    const spinner =  document.querySelector('#spinner');

    // Llamar addEventListener
    inputEmail.addEventListener('input',validar);
    inputAsunto.addEventListener('blur',validar);
    inputMensaje.addEventListener('blur',validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetForm();
    });

    function resetForm(){
        // Reiniciar objeto
        dataEmail.email= '';
        dataEmail.asunto= '';
        dataEmail.mensaje= '';

        formulario.reset();
        comprobarEmail();
    }
    
    function enviarEmail(e){
        e.preventDefault();
        console.log('enviando...');
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetForm();
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent='Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);
            setTimeout(() => {
                alertaExito.remove();
            }, 4000);
        }, 3000);
    }

    function validar(event){
        
        if(event.target.value.trim() === ''){
            mostrarAlerta(`El campo ${event.target.id} es obligatorio`, event.target.parentElement);
            dataEmail[event.target.name] = '';
            comprobarEmail();
            return;
        }

        if(event.target.id === 'email' && !validarEmail(event.target.value)){
            mostrarAlerta(`El campo ${event.target.id} debe tener un formato de mail`, event.target.parentElement);
            dataEmail[event.target.name] = '';
            comprobarEmail();
            return;
        }
        
        limpiarAlerta(event.target.parentElement);

        // Asignar valores
        dataEmail[event.target.name] = event.target.value.trim().toLowerCase();
        //console.log(dataEmail);
        console.log("----");

        // Comprobar email
        comprobarEmail();
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

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        //console.log(resultado);

        return resultado;
    }
    function comprobarEmail(){
        console.log(dataEmail);
        if(Object.values(dataEmail).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true;
            return;
        }
        
        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false;
    }
});