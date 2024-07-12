const contenedorListadoDePaquetes = document.getElementById('id_paquetes__listado');
const modal = document.getElementById('modalReserva');
const fechaInicial = document.getElementById('fechaInicio');
const fechaFinal = document.getElementById('fechaFinal');
const precioTotal = document.getElementById('precioTotal');
const cantidadDeNoches = document.getElementById('cantidaDeNoches');
const btnCancelar = document.getElementById('btnCancelar');
const btnComprar = document.getElementById('btnComprar');

const obtenerDestinosAlojamientos = async () => {

    try {
        const response = await fetch('/destinos/alojamientos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return response.json();

    } catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error.message);
    }
}

const crearDivsPaquetes = async () => {


    const data = await obtenerDestinosAlojamientos();

    data.forEach(item => {
        let img = item['Imagen'];
        let destinoNombre = item['DestinoNombre']
        let destinoDescripcion = item['DestinoDescripcion'];
        let alojamientoDescripcion = item['AlojamientoDescripcion']
        let precioPorNoche = item['PrecioPorNoche']
        let alojamientoID = item['AlojamientoID']

        const divPaquete = document.createElement('div');
        divPaquete.classList.add('paquete');
        divPaquete.innerHTML = `
                        <div class="paquete__imagen">
                            <img src="${img}" alt="Imagen">
                        </div>
                        <div class="paquete__descripcion">
                            <h3>${destinoNombre}</h3>
                            <p>${destinoDescripcion}</p>
                            <p>${alojamientoDescripcion}</p>
                            <p class="paquete__precio">$ ${precioPorNoche}</p>
                            <button type="button" class="btn btnComprarPaquete">Comprar</button>
                        </div>
    `;

        const btnComprarPaquete = divPaquete.querySelector('.btnComprarPaquete');
        btnComprarPaquete.addEventListener('click', () => mostrarModal(precioPorNoche, alojamientoID));

        contenedorListadoDePaquetes.appendChild(divPaquete);
    });
};

const mostrarModal = (precioPorNoche, alojamientoID) => {
    fechaInicial.value = '';
    fechaFinal.value = '';
    precioTotal.value = `$ ${precioPorNoche}`;
    cantidadDeNoches.value = '1';

    modal.showModal();

    fechaInicial.addEventListener('change', () => {
        calcularTotalNoches(precioPorNoche);
    });

    fechaFinal.addEventListener('change', () => {
        calcularTotalNoches(precioPorNoche);
    });

    btnComprar.addEventListener('click', (event) => {
        crearReserva(event, alojamientoID);
    });
};

const usuarioLogueado = async () => {

    try {
        const response = await fetch('/usuarios/session-status', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();

    } catch (error) {
        console.error('Hubo un problema con la solicitud fetch:', error.message);
    }
}

const calcularTotalNoches = (precioPorNoche) => {
    const inicio = new Date(fechaInicial.value);
    const final = new Date(fechaFinal.value);

    if (inicio && final && inicio <= final) {
        const diffTime = final.getTime() - inicio.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        cantidadDeNoches.value = diffDays;

        precioTotal.value = `$ ${precioPorNoche * cantidadDeNoches.value}`;
    }
};

const crearReserva = async (event, alojamientoID) => {
    try {
        const estadoSesion = await usuarioLogueado();
        console.log('Estado de sesión:', estadoSesion);
        
        if (!estadoSesion || !estadoSesion.login) {
            alert("Inicie sesión para crear una reserva");
            window.location.href = 'login.html';
            return;
        }

        event.preventDefault();
        const precioTotalDecimal = parseFloat(precioTotal.value.replace(/[^\d.-]/g, ""));

        const data = {
            fechaInicio: fechaInicial.value,
            fechaFin: fechaFinal.value,
            precioTotal: precioTotalDecimal,
            AlojamientoID: alojamientoID
        };

        console.log('Datos de reserva:', data); // Verifica los datos antes de enviarlos

        const response = await fetch('/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(`Error al crear reserva: ${errorMessage}`);
        } else {
            alert("Reserva creada con éxito");
        }

    } catch (error) {
        console.error('Error al crear reserva:', error.message);
    }
};

btnCancelar.addEventListener('click', () => {
    modal.close();
    precioTotal.value = '';
    cantidadDeNoches.value = '';
});

crearDivsPaquetes();