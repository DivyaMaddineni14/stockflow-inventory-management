
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Package,
  ChartNoAxesCombined,
  Users,
  Boxes,
  Truck,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Purchases", href: "/purchases", icon: ShoppingBag },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Reports", href: "/reports", icon: ChartNoAxesCombined },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Suppliers", href: "/suppliers", icon: Truck },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 border-r border-slate-200 bg-white p-5 md:flex md:flex-col">

      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Boxes size={23} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-slate-900">
            StockFlow
          </h1>
          <p className="text-xs text-slate-400">
            Inventory Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Main Menu
      </p>

      <nav className="flex-1 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon size={19} />
              {item.name}
            </Link>
          );
        })}
      </nav>

    

      {/* User Profile */}
      <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
          AD
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">
            Admin User
          </p>
          <p className="text-xs text-slate-400">
            Administrator
          </p>
        </div>
      </div>

    </aside>
  );
}

