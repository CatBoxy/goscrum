import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.styles.css';

export default function Header(props) {
  const navigate = useNavigate();

  const { tasks } = useSelector(state => {
    return state.tasksReducer
  })

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    navigate("/", { replace: true })
  }
  return (
    <header>
      <img src="/img/GoScrum.png" alt="logo"/>
      <div className="wrapper_right_header">
        <div>
          <button onClick={() => navigate("/donate", { replace: true })}>
            Donar
          </button>
        </div>
        <div>
          Tareas creadas: {!tasks ? 0 : tasks.length}
        </div>
        <div>{localStorage.getItem("userName")}</div>
        <div onClick={handleLogout}>
          X
        </div>
      </div>
    </header>
  );
}
