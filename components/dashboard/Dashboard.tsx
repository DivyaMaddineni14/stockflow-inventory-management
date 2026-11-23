
import StatCard from "./StatCard";
import SalesOverview from "./SalesOverview";
import LowStockAlerts from "./LowStockAlerts";
import RecentActivity from "./RecentActivity";

import { dashboardStats } from "@/components/data/mockData";

export default function Dashboard() {
  return (
    <div className="space-y-6 p-6 md:p-8">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your inventory today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            description={stat.description}
            icon={stat.icon as "Package" | "Wallet" | "TrendingUp" | "AlertTriangle"}
          />
        ))}
      </div>

      {/* Sales Chart */}
      <div className="grid grid-cols-1">
        <SalesOverview />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <LowStockAlerts />
        <RecentActivity />
      </div>
    </div>
  );
}
