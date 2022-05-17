import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import { Link, useNavigate } from 'react-router-dom';
import '../Auth.styles.css';
import * as Yup from 'yup';
import { v4 as uuidv4 } from "uuid";
import { Switch, FormControlLabel } from '@mui/material';

const { REACT_APP_API_ENDPOINT } = process.env;

export default function Register() {

  const [data, setData] = useState();
  const navigate = useNavigate();

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
      userName: Yup.string()
          .min(4, "La cantidad minima de caracteres es 4")
          .matches(/^[aA-zZ\s]+$/, "El nombre usuario debe ser solo letras")
          .required(required),
      password: Yup.string()
          .min(6, "La cantidad minima de caracteres es 6")
          .matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/, "Debe contener al menos 1 mayúscula, 1 minúscula y 1 número")
          .required(required),
      email: Yup.string().email().required("Debe ser un email valido"),
      // teamID: Yup.string().required(required),
      role: Yup.string().required(required),
      continent: Yup.string().required(required),
      region: Yup.string().required(required),
  })

  const handleChangeContinent = (value) => {
    setFieldValue('continent', value);
    if (value !== "America") {
      setFieldValue("region", "Otro")
    }
  }

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID;

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
    .then(data => 
      navigate("/registered/" + data?.result?.user?.teamID, {
        replace: true 
      })
    )
  }

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

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
                value={values.switch}
                onChange={() =>
                  formik.setFieldValue("switch", !formik.values.switch)
                }
                name="switch"
                color="secondary"
                />
            }
            label="Perteneces a un equipo ya creado"
          />
          {values.switch && (
            <div>
              <label> Por favor Introduce el identificador de equipo</label>
              <input 
                type='text'
                name='teamID' 
                value={values.teamID} 
                onChange={handleChange}
              />
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
              <option value="">Seleccionar un Rol</option>
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
              <option value="">Seleccionar un continente</option>
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
            <label>Region</label>
            <select
              name='region'  
              value={values.region} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.region && touched.region ? "error" : ''}
            >
              <option value="">Seleccionar una region</option>
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
            <Link to="/login">Iniciar Sesion</Link>
          </div>
        </form>
      </div>
    </>
  );
}
