"use client";

import { useBranch } from "@/context/BranchContext";
import DashboardLayout from "@/components/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { activeBranch, setActiveBranch } = useBranch();

  return (
    <DashboardLayout
      activeBranch={activeBranch}
      setActiveBranch={setActiveBranch}
    >
      {children}
    </DashboardLayout>
  );
}
