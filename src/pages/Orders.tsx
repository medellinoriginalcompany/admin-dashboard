import DefaultPage from "../components/page/DefaultPage"

const Orders = () => {
  document.title = 'Pedidos | ' + import.meta.env.VITE_APP_TITLE;
  return (
    <DefaultPage>
    </DefaultPage>
  )
}

export default Orders