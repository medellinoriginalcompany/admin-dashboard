import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import MonthlyRevenue from "../components/dashboard/MonthlyRevenue"
import RecentOrders from "../components/dashboard/RecentOrders"
import Resume from "../components/dashboard/Resume"



const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <Sidebar /> 
        <div className="py-8 w-full space-y-8 lg:px-5 2xl:px-14">
          <Header />
          <Resume />
          <div className="flex space-x-5 w-fit max-h-80">
            <MonthlyRevenue />
            <RecentOrders />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard