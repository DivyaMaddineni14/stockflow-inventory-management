
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Area */}
      <main
        className={`min-h-screen min-w-0 transition-all duration-300 ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        {/* Header */}
        <Header />

        {/* Page Content */}
        <div>
          {children}
        </div>
      </main>
    </div>
  );
}
