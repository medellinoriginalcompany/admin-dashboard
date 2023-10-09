import DefaultPage from "../components/page/DefaultPage"

const Orders = () => {
  document.title = import.meta.env.VITE_APP_TITLE + ' | Pedidos';
  return (
    <DefaultPage>
    </DefaultPage>
  )
}

export default Orders