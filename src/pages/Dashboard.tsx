import DefaultPage from "../components/page/DefaultPage"
import MonthlyRevenue from "../components/dashboard/MonthlyRevenue"
import RecentOrders from "../components/dashboard/RecentOrders"
import Resume from "../components/dashboard/Resume"



const Dashboard = () => {
  return (
    <DefaultPage>
      <Resume />
      <div className="flex space-x-5 w-fit max-h-80">
        <MonthlyRevenue />
        <RecentOrders />
      </div>
    </DefaultPage>
  )
}

export default Dashboard