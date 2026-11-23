
"use client";

import { createContext, useContext, type ReactNode } from "react";
import { products as initialProducts } from "@/components/data/mockData";
import { useLocalStorage } from "@/lib/useLocalStorage";
import type { Product } from "@/components/types";

interface InventoryContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const InventoryContext = createContext<InventoryContextType | undefined>(
  undefined
);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useLocalStorage<Product[]>(
    "stockflow_products",
    initialProducts
  );

  return (
    <InventoryContext.Provider value={{ products, setProducts }}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);

  if (!context) {
    throw new Error("useInventory must be used inside InventoryProvider");
  }

  return context;
}
