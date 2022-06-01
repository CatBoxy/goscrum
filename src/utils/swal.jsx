import Swal from 'sweetalert2';

export const swal = (props) =>
      Swal.fire({
        title: "Ocurrió un error",
        text: props === "login" ? "Por favor introduzca credenciales válidas" : "Ocurrio un error",
        confirmButtonText: "Aceptar",
        width: "400px",
        timer: 10000,
        timerProgressBar: true,
      });
