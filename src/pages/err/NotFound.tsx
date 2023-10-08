import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  }

  return (
    <div>

      <div className="h-screen">
        <button onClick={back}>
          voltar
        </button>
      </div>
    </div>
  )
}

export default NotFound