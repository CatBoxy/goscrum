import { useParams } from "react-router-dom";

export default function Registered(props) {

  const { teamID } = useParams();

  return (
    <>
      <div className='container'>
        El team ID de tu equipo es: {teamID}
      </div>
    </>
  );
}
