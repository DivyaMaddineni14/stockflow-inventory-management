
import {
  ShoppingCart,
  PackageCheck,
  PackagePlus,
  AlertCircle,
} from "lucide-react";

import { recentActivity } from "@/components/data/mockData";

const activityIcons = {
  sale: ShoppingCart,
  purchase: PackageCheck,
  product: PackagePlus,
  alert: AlertCircle,
};

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Activity
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Latest updates from your store
        </p>
      </div>

      <div className="space-y-5">
        {recentActivity.map((activity) => {
          const Icon =
            activityIcons[activity.type as keyof typeof activityIcons];

          return (
            <div
              key={activity.id}
              className="flex items-start gap-3"
            >
              <div className="rounded-xl bg-gray-50 p-2 text-gray-600">
                <Icon size={18} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {activity.title}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {activity.description}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {activity.time}
                </p>
              </div>

              <span className="whitespace-nowrap text-sm font-semibold text-gray-700">
                {activity.amount}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
