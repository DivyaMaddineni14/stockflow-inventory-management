
import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { InventoryProvider } from "@/context/InventoryContext";

export const metadata: Metadata = {
  title: "StockFlow | Inventory Management",
  description: "Modern Inventory Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <InventoryProvider>
          <MainLayout>{children}</MainLayout>
        </InventoryProvider>
      </body>
    </html>
  );
}
