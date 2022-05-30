import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Registered(props) {

  const navigate = useNavigate();

  // Recieve uuid through params for display
  const { teamID } = useParams();

  return (
    <>
      <div className='container'>
        <div>
          <span>El team ID de tu equipo es: {teamID}</span>
        <div>
          <button onClick={() => navigate("/", { replace: true })}>
            Login
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
