import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import MonthlyRevenue from "../components/dashboard/MonthlyRevenue"
import Resume from "../components/dashboard/Resume"



const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="py-8 w-full space-y-8 lg:px-5 2xl:px-14">
          <Header />
          <Resume />
          <MonthlyRevenue />
        </div>
      </div>
    </>
  )
}

export default Dashboard