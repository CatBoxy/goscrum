import './TaskForm.styles.css';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { ToastContainer, toast }  from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createTask } from '../../store/actions/tasksActions';

import 'react-toastify/dist/ReactToastify.css';

// TaskForm component renders Task creation form
export default function TaskForm(props) {

  const dispatch = useDispatch();

  const initialValues = {
    title: '',
    status: '',
    importance: '',
    description: '',
  }

  const required = "* Campo obligatorio"

  const validationSchema = () => 
    Yup.object().shape({
      title: Yup.string().min(6, "La cantidad mínima de caracteres es 6").required(required),
      status: Yup.string().required(required),
      importance: Yup.string().required(required),
      description: Yup.string().required(required),
  })

  // onSubmit dispatch create action to Redux, resets form
  const onSubmit = () => {
    dispatch(createTask(values))
    resetForm()
    toast("Tu tarea se creó")
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, touched, handleBlur, values, resetForm } = formik;

  return (
    <>
      <section className="task-form">
        <h2>Crear tarea</h2>
        <p>Crea tus tareas</p>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                name='title' 
                onChange={handleChange} 
                onBlur={handleBlur} 
                type="text" 
                placeholder='Título'
                className={errors.title && touched.title ? "error" : ''}
                value={values.title}
              />
              {errors.title && touched.title && (
                <span className='error-message'>
                  {errors.title}
                </span>
              )}
            </div>
            
            <div>
              <select
                name="status"
                onChange={handleChange}
                onBlur={handleBlur} 
                className={errors.status && touched.status ? "error" : ''}
                value={values.status}
              >
                <option value="">Seleccionar un estado</option>
                <option value="NEW">Nueva</option>
                <option value="IN PROGRESS">En Proceso</option>
                <option value="FINISHED">Terminada</option>
              </select>
              {errors.status && touched.status && (
                <span className='error-message'>
                  {errors.status}
                </span>
              )}
            </div>
            
            <div>
              <select
                name="importance" 
                onChange={handleChange}
                onBlur={handleBlur} 
                className={errors.importance && touched.importance ? "error" : ''}
                value={values.importance}
              >
                <option value="">Seleccionar una prioridad</option>
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </select>
              {errors.importance && touched.importance && (
                <span className='error-message'>
                  {errors.importance}
                </span>
              )}
            </div>
            
          </div>
          <div className='description'>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder='Descripción'
              onBlur={handleBlur}
              className={errors.description && touched.description ? "error" : ''}
              value={values.description}
              ></textarea>
            {errors.description && touched.description && (
                <span className='error-message'>
                  {errors.description}
                </span>
              )}
          </div>
          <button className="createBtn" type='submit'>Crear</button>
        </form>
        <ToastContainer/>
      </section>
    </>
  );
}
