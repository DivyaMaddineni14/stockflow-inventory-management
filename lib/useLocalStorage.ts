
"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [loaded, setLoaded] = useState(false);

  // Load saved data when the component mounts
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(key);

      if (savedData !== null) {
        setValue(JSON.parse(savedData) as T);
      }
    } catch (error) {
      console.error(`Unable to load ${key}:`, error);
    } finally {
      setLoaded(true);
    }
  }, [key]);

  // Save data whenever it changes
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Unable to save ${key}:`, error);
    }
  }, [key, value, loaded]);

  return [value, setValue] as const;
}
