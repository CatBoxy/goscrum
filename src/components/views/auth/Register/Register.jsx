import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.styles.css';
import * as Yup from 'yup';
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from '@mui/material';
import { swal } from '../../../../utils/swal';

const { REACT_APP_API_ENDPOINT } = process.env;

// Register component renders User register form

export default function Register() {

  // Declare data state for handling form options with API's option data
  const [data, setData] = useState();
  const navigate = useNavigate();

  // Fetch API <Select> options data, stores in component state
  useEffect(() => {
    fetch(`${REACT_APP_API_ENDPOINT}auth/data`)
      .then(response => response.json())
      .then(data => setData(data.result))
  },[])

  const initialValues = {
    userName: '',
    password: '',
    email: '',
    teamID: '',
    role: '',
    continent: '',
    region: '',
    switch: false,
  };

  const required = "* Campo obligatorio"

  const validationSchema = () => 
    Yup.object().shape({
      switch: Yup.boolean(),
      userName: Yup.string()
          .min(4, "La cantidad mínima de caracteres es 4")
          .matches(/^[aA-zZ\s]+$/, "El nombre de usuario debe ser solo letras")
          .required(required),
      password: Yup.string()
          .min(6, "La cantidad mínima de caracteres es 6")
          .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/, "Debe contener al menos 1 mayúscula, 1 minúscula y 1 número")
          .required(required),
      email: Yup.string().email().required("Debe ser un email válido"),
      // Conditional validation
      teamID: Yup.string()
          .when("switch", {
            is: true,
            then: Yup.string().required(required)
          }),
      role: Yup.string().required(required),
      continent: Yup.string().required(required),
      region: Yup.string().required(required),
  })

  // Declare handler for managing region input render and value
  const handleChangeContinent = (value) => {
    setFieldValue('continent', value);
    if (value !== "America") {
      setFieldValue("region", "Otro")
    }
  }

  // Declare onSubmit function
  const onSubmit = () => {
    // Generates uuid if no previous teamID
    const teamID = !values.teamID ? uuidv4() : values.teamID;

    // Send POST fetch request to auth API
    // If success creates new user
    // Then navigate to "/"
    // If no response or error, execute swal()
    fetch(`${REACT_APP_API_ENDPOINT}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        },
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status_code === 201) {
        // send uuid through params
        navigate("/registered/" + data?.result?.user?.teamID, {
          replace: true 
        })
        return
      }
      swal();
    })
  }

  // Declare formik hook
  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  // Destructuring states and helpers from formik
  const { handleSubmit, handleChange, values, errors, touched, handleBlur, setFieldValue } = formik;

  return (
    <>
      <div className='auth'>
        <form onSubmit={handleSubmit}>
          <h1>Registro</h1>
          <div>
            <label>Nombre de usuario</label>
            <input 
              name='userName' 
              type="text" 
              value={values.userName} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.userName && touched.userName ? "error" : ''}
            />
            {errors.userName && touched.userName && (
              <span className='error-message'>{errors.userName}</span>
            )}
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
            {errors.password && touched.password && (
              <span className='error-message'>{errors.password}</span>
            )}
          </div>
          <div>
            <label>Email</label>
            <input
              name='email' 
              type="email" 
              value={values.email} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "error" : ''}
            />
            {errors.email && touched.email && (
              <span className='error-message'>{errors.email}</span>
            )}
          </div>
          <FormControlLabel
            control={
              <Switch
                sx={{
                  '& .MuiSwitch-track': {
                    backgroundColor: '#FFC5BE',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    '& .MuiSwitch-thumb': {
                    backgroundColor: '#FF452B',
                  }
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':{
                    backgroundColor: '#FFC5BE',
                  }
                }}
                value={values.switch}
                onChange={() =>
                  formik.setFieldValue("switch", !formik.values.switch)
                }
                name="switch"
                color="secondary"
              />
            }
            label="Perteneces a un equipo ya creado"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontFamily: 'Inter',
                fontSize: '12px'
              }
            }}
          />
          {values.switch && (
            <div>
              <label> Por favor, introduce el identificador de equipo</label>
              <input 
                type='text'
                name='teamID' 
                value={values.teamID} 
                onChange={handleChange}
                onBlur={handleBlur}
                className={values.switch && errors.teamID && touched.teamID ? "error" : ''}
              />
              {values.switch && errors.teamID && touched.teamID && (
              <span className='error-message'>{errors.teamID}</span>
            )}
          </div>
          )}
          <div>
            <label>Rol</label>
            <select
              name='role'  
              value={values.role} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.role && touched.role ? "error" : ''}
            >
              <option value="">Selecciona un rol...</option>
              {data?.Rol?.map(option =>
                 <option value={option} key={option}>
                    {option}
                  </option>
              )}
            </select>
            {errors.role && touched.role && (
              <span className='error-message'>{errors.role}</span>
            )}
          </div>
          <div>
            <label>Continente</label>
            <select
              name='continent'  
              value={values.continent} 
              onChange={event => handleChangeContinent(event.currentTarget.value)}
              onBlur={handleBlur}
              className={errors.continent && touched.continent ? "error" : ''}
            >
              <option value="">Selecciona un continente...</option>
              {data?.continente?.map(option =>
                 <option value={option} key={option}>
                    {option}
                  </option>
              )}
            </select>
            {errors.continent && touched.continent && (
              <span className='error-message'>{errors.continent}</span>
            )}
          </div>
          {values.continent === "America" && (
            <div>
            <label>Región</label>
            <select
              name='region'  
              value={values.region} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.region && touched.region ? "error" : ''}
            >
              <option value="">Selecciona una región...</option>
              {data?.region?.map(option =>
                 <option value={option} key={option}>
                    {option}
                  </option>
              )}
            </select>
            {errors.region && touched.region && (
              <span className='error-message'>{errors.region}</span>
            )}
          </div>
          )}
          <div>
            <button type="submit">Enviar</button>
          </div>
          <div>
            <Link to="/login">Ir a Iniciar Sesión</Link>
          </div>
        </form>
      </div>
    </>
  );
}
