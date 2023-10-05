import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

const Orders = () => {
  return (
    <>
    <div className="flex">
      <Sidebar />
      <div className="py-8 w-full space-y-8 lg:px-5 2xl:px-14">
        <Header />
      </div>
    </div>
  </>
  )
}

export default Orders