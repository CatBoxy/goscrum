import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Header.styles.css';
import logo from '../../assets/img/GoScrum.svg'
import {HiMenu} from "react-icons/hi";
import HiddenMenu from './HiddenMenu/HiddenMenu';


export default function Header(props) {
  // burguer menu display state
  const [isOpen, setIsOpen] = useState(false);

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
      <img src={logo} alt="logo"/>
      <div className="wrapper_right_header">
        <div className='btnWrapper'>
          <button className="donateButton" onClick={() => navigate("/donate", { replace: true })}>
            Donar
          </button>
        </div>
        <div>
          Tareas creadas: {!tasks ? 0 : tasks.length}
        </div>
        <div>{localStorage.getItem("userName")}</div>
        <div className='logout' onClick={handleLogout}>
          X
        </div>
      </div>
      <div className="wrapper_burguer_header">
        <button className='burguer' onClick={() => setIsOpen(!isOpen)}>
          <HiMenu/>
        </button>
        <HiddenMenu tasks={tasks} handleLogout={handleLogout} isOpen={isOpen} navigate={navigate}/>
      </div>
    </header>
  );
}
