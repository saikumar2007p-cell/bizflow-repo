"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [activeBranch, setActiveBranch] = useState("delhi");
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

  const setBusinessDetails = (details: BusinessDetails) => {
    setBusinessDetailsState(details);
    if (typeof window !== "undefined") {
      localStorage.setItem("bizflow_business_details", JSON.stringify(details));
    }
  };

  return (
    <BranchContext.Provider value={{ activeBranch, setActiveBranch, businessDetails, setBusinessDetails }}>
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
