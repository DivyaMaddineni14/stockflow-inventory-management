
import Sidebar from '@/components/layout/Sidebar'
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F7FB]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <main className="min-h-screen md:ml-64">

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
