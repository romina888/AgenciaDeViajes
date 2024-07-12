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
        let Img = item['Imagen'];
        let destinoDescripcion = item['DestinoDescripcion'];
        let alojamientoDescripcion = item['AlojamientoDescripcion']
        let precioPorNoche = item['PrecioPorNoche']
        let alojamientoID = item['AlojamientoID']

        const divPaquete = document.createElement('div');
        divPaquete.classList.add('paquete');
        divPaquete.innerHTML = `
                        <div class="paquete__imagen">
                            <img src="${item['Imagen']}" alt="Imagen">
                        </div>
                        <div class="paquete__descripcion">
                            <h3>${item['DestinoNombre']}</h3>
                            <p>${item['DestinoDescripcion']}</p>
                            <p>${item['AlojamientoDescripcion']}</p>
                            <p class="paquete__precio">$ ${item['PrecioPorNoche']}</p>
                            <button type="button" class="btn btnComprarPaquete">Comprar</button>
                        </div>
    `;
    
    const btnComprarPaquete = divPaquete.querySelector('.btnComprarPaquete');
    btnComprarPaquete.addEventListener('click', () => mostrarModal(item));
    contenedorListadoDePaquetes.appendChild(divPaquete);
    });
};



const mostrarModal = (item) => {
    fechaInicial.value = '';
    fechaFinal.value = '';
    precioTotal.value = `$ ${item['PrecioPorNoche']}`;
    cantidadDeNoches.value = '1';

    modal.showModal(); 

    fechaInicial.addEventListener('change', calcularTotalNoches(item));
    fechaFinal.addEventListener('change', calcularTotalNoches(item));

    btnComprar.addEventListener('click', async (event) => {

        event.preventDefault();
        // const formData = new FormData(crearUsuarioForm)
    
        const data = {
            fechaInicio: fechaInicial.value,
            fechaFin: fechaFinal.value,
            precioTotal: 2000,
            AlojamientoID: item['AlojamientoID']
        }
        console.log(data)

    
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
            alert("Reserva Creado Con Éxito");
        }
    
    });
};

const calcularTotalNoches = (item) => {
    const inicio = new Date(fechaInicial.value);
    const final = new Date(fechaFinal.value);
    const precioPorNoche = item['PrecioPorNoche']

    if (inicio && final && inicio <= final) {
        const diffTime = Math.abs(final - inicio);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        cantidadDeNoches.value = diffDays;

        precioTotal.value = `$ ${precioPorNoche * cantidadDeNoches.value}`;
    }
};

btnCancelar.addEventListener('click', () => {
    modal.close();
    precioTotal.value = '';
    cantidadDeNoches.value = '';
});

crearDivsPaquetes();
