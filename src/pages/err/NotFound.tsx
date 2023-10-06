import { Link } from "react-router-dom";

const NotFound = () => {


  return (
    <div>

      <div className="h-screen">
        <Link to={'/dashboard'}>
          voltar
        </Link>
      </div>
    </div>
  )
}

export default NotFound