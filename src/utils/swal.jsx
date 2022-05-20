import Swal from 'sweetalert2';

export const swal = (props) =>
      Swal.fire({
        title: "Credenciales invalidas",
        text: "Por favor introduzca credenciales validas",
        confirmButtonText: "Aceptar",
        width: "400px",
        timer: 10000,
        timerProgressBar: true,
      });
