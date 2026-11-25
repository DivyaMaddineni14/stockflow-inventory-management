
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  ShoppingBag,
  Package,
  ChartNoAxesCombined,
  Users,
  Truck,
  Boxes,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
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

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu after navigation
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm md:hidden"
        aria-label="Open menu"
      >
        <Menu size={23} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white p-4 shadow-xl transition-transform duration-300 md:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Logo */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
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

          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Main Menu
        </p>

        {/* Mobile Navigation */}
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile User Profile */}
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
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

      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 hidden h-screen border-r border-slate-200 bg-white p-4 transition-all duration-300 md:flex md:flex-col ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo and Toggle */}
        <div
          className={`mb-10 flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Boxes size={23} />
            </div>

            {!isCollapsed && (
              <div className="whitespace-nowrap">
                <h1 className="text-xl font-bold text-slate-900">
                  StockFlow
                </h1>
                <p className="text-xs text-slate-400">
                  Inventory Management
                </p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
              title="Collapse sidebar"
            >
              <PanelLeftClose size={20} />
            </button>
          )}

          {isCollapsed && (
            <button
              onClick={() => setIsCollapsed(false)}
              className="absolute -right-3 top-7 rounded-full border border-slate-200 bg-white p-1.5 text-slate-600 shadow-sm hover:bg-blue-50 hover:text-blue-600"
              title="Expand sidebar"
            >
              <PanelLeftOpen size={17} />
            </button>
          )}
        </div>

        {!isCollapsed && (
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>
        )}

        {/* Desktop Navigation */}
        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : ""}
                className={`flex items-center rounded-lg py-3 text-sm font-medium transition-all duration-200 ${
                  isCollapsed
                    ? "justify-center px-2"
                    : "gap-3 px-3"
                } ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={20} className="shrink-0" />

                {!isCollapsed && (
                  <span className="whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop User Profile */}
        <div
          className={`flex items-center rounded-xl bg-slate-50 p-3 ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
            AD
          </div>

          {!isCollapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                Admin User
              </p>
              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
