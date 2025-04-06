import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import InfoCard from "@/components/InfoCard";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-8">
        <DashboardHeader />
        <div className="grid grid-cols-2 gap-4 mt-8">
          <InfoCard />
          <InfoCard />
        </div>
      </main>
    </div>
  )
}

export default Dashboard