"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {
  generateDataForBusiness,
  BranchData,
  InventoryItem,
  Customer,
  Employee,
  Order
} from "@/utils/mockData";

interface BusinessDetails {
  name: string;
  type: string;
  ownerName: string;
}

interface BranchContextType {
  activeBranch: string;
  setActiveBranch: (branch: string) => void;
  businessDetails: BusinessDetails;
  setBusinessDetails: (details: BusinessDetails) => void;
  
  // Dynamic business data states
  branches: BranchData[];
  setBranches: (branches: BranchData[]) => void;
  inventory: InventoryItem[];
  setInventory: (inventory: InventoryItem[]) => void;
  customers: Customer[];
  setCustomers: (customers: Customer[]) => void;
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [activeBranch, setActiveBranch] = useState("delhi");
  
  // 1. Business details profile state
  const [businessDetails, setBusinessDetailsState] = useState<BusinessDetails>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bizflow_business_details");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return {
      name: "BizFlow Shoes Ltd",
      type: "Shoe Shop",
      ownerName: "Store Admin"
    };
  });

  // Generate initial datasets matching default profile
  const initialData = generateDataForBusiness(businessDetails.type, businessDetails.name);

  // 2. React states for dynamic datasets
  const [branches, setBranches] = useState<BranchData[]>(initialData.branches);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialData.inventory);
  const [customers, setCustomers] = useState<Customer[]>(initialData.customers);
  const [employees, setEmployees] = useState<Employee[]>(initialData.employees);
  const [orders, setOrders] = useState<Order[]>(initialData.orders);

  // Hook to regenerate dynamic data when details change
  const setBusinessDetails = (details: BusinessDetails) => {
    setBusinessDetailsState(details);
    if (typeof window !== "undefined") {
      localStorage.setItem("bizflow_business_details", JSON.stringify(details));
    }
    
    // Regenerate data instantly matching new type
    const freshData = generateDataForBusiness(details.type, details.name);
    setBranches(freshData.branches);
    setInventory(freshData.inventory);
    setCustomers(freshData.customers);
    setEmployees(freshData.employees);
    setOrders(freshData.orders);
  };

  return (
    <BranchContext.Provider
      value={{
        activeBranch,
        setActiveBranch,
        businessDetails,
        setBusinessDetails,
        branches,
        setBranches,
        inventory,
        setInventory,
        customers,
        setCustomers,
        employees,
        setEmployees,
        orders,
        setOrders
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error("useBranch must be used within a BranchProvider");
  }
  return context;
}
