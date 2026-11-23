
"use client";

import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 md:px-8">

      {/* Welcome */}
      <div>
        <h2 className="text-sm font-semibold text-slate-800">
          Welcome back, Admin 👋
        </h2>
        <p className="text-xs text-slate-400">
          Manage your business efficiently
        </p>
      </div>

      <div className="flex items-center gap-3">

        {/* Search */}
        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 sm:flex">
          <Search size={17} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-40 bg-transparent text-sm outline-none md:w-52"
          />
        </div>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg border border-slate-200 p-2 transition hover:bg-slate-50"
        >
          <Bell size={19} className="text-slate-600" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

      </div>
    </header>
  );
}

