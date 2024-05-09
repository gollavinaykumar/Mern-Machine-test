import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useEmployeeStore = create(
  persist(
    (set, get) => ({
      employees: [],
      setEmployees: (list: any) =>
        set({
          employees: [...list],
        }),
    }),
    {
      name: "employee",
    }
  )
);
