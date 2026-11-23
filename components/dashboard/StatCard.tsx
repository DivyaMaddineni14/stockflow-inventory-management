
import {
  Package,
  Wallet,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const iconMap = {
  Package,
  Wallet,
  TrendingUp,
  AlertTriangle,
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  icon: keyof typeof iconMap;
}

export default function StatCard({
  title,
  value,
  change,
  description,
  icon,
}: StatCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{title}</p>

        <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
          <Icon size={20} />
        </div>
      </div>

      <h2 className="mt-4 text-2xl font-bold text-gray-900">
        {value}
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-emerald-600">
          {change}
        </span>

        <span className="text-xs text-gray-400">
          {description}
        </span>
      </div>
    </div>
  );
}
