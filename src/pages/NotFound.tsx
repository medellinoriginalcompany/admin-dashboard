import { redirect } from "react-router-dom";

const NotFound = () => {

  const back = () => {
    redirect('/dashboard');
  };
  return (
    <div className="h-screen">
      <span onClick={back}>
        voltar
      </span>
    </div>
  )
}

export default NotFound