import React from 'react';

function HiddenMenu({tasks, handleLogout, isOpen, navigate}) {
  return (
    <div className={isOpen ? 'openedMenu' : 'closedMenu' }>
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
  );
}

export default HiddenMenu;