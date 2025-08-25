import DashboardHero from "@/components/Admin/Sidebar/DashboardHero";

export default function DashboardPage() {
  return (
    <div >
<DashboardHero />
      <div className="p-4">
        {/* Main content goes here */}
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome to the admin dashboard. Here you can manage your application.</p>
      </div>
    </div>
  )
}
