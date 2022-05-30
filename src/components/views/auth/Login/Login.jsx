import React from 'react';
import { useFormik } from "formik";
import { useNavigate, Link } from 'react-router-dom';
import '../Auth.styles.css';
import * as Yup from 'yup';
import { swal } from '../../../../utils/swal';

const { REACT_APP_API_ENDPOINT: API_ENDPOINT } = process.env;

export default function Login() {
  // Import useNavigate hook to navigate between pages on succesfull submit
  const navigate = useNavigate();

  // Declare initial form values
  const initialValues = {
    userName: '',
    password: ''
  }

  // Declare "required" error inside variable
  const required = "* Campo obligatorio"

  // Declare validation schema for each form input
  // Create custom validations with Yup
  const validationSchema = () => 
    Yup.object().shape({
      userName: Yup.string()
          .min(4, "La cantidad minima de caracteres es 4")
          .required(required),
      password: Yup.string().required(required),
  })

  // Declare onSubmit function
  const onSubmit = () => {

    // Destructuring form input values
    const { userName, password } = values;

    // Send POST fetch request to auth API
    // If success store recieved token, and form userName in localStorage
    // Then navigate to "/"
    // If no response or error, execute swal()
    fetch(`${API_ENDPOINT}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          userName,
          password,
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status_code === 200) {
        localStorage.setItem('token', data?.result?.token);
        localStorage.setItem('userName', data?.result?.user.userName);
        navigate("/", { replace:true });
        return
      }
      swal();
    })  
  }

  // Declare formik hook, pass in necessary values
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  // Destructuring necessary states/helpers from formik hook
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = formik;

  // Create input with formik state values and helpers
  return (
    <>
      <div className='auth'>
        <form onSubmit={handleSubmit}>
          <h1>Iniciar Sesión</h1>
          <div>
            <label>Nombre de usuario</label>
            <input 
              name='userName' 
              type="text" 
              value={values.userName} 
              onChange={handleChange}
              onBlur={handleBlur}
              // Class for displaying input error color
              className={errors.userName && touched.userName ? "error" : ''}
            />
            {errors.userName && touched.userName && <div className='error-message'>{errors.userName}</div>}
          </div>
          <div>
            <label>Contraseña</label>
            <input 
              name='password' 
              type="password" 
              value={values.password} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.password && touched.password ? "error" : ''}
            />
            {errors.password && touched.password && <div className='error-message'>{errors.password}</div>}
          </div>
          <div>
            <button type="submit">Enviar</button>
          </div>
          <div>
            <Link to="/register" id='register'>Registrarme</Link>
          </div>
        </form>
      </div>
    </>
  );
}
