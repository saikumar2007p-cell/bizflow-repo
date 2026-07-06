"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  UserCheck,
  TrendingUp,
  FileText,
  Megaphone,
  Settings,
  Bell,
  Sparkles,
  GitBranch,
  Search,
  Menu,
  X,
  Volume2
} from "lucide-react";
import { BRANCHES } from "@/utils/mockData";
import { motion, AnimatePresence } from "framer-motion";
import ChatBot from "./ChatBot";
import { useBranch } from "@/context/BranchContext";

interface DashboardLayoutProps {
  children: ReactNode;
  activeBranch: string;
  setActiveBranch: (branchId: string) => void;
}

export default function DashboardLayout({
  children,
  activeBranch,
  setActiveBranch,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { businessDetails } = useBranch();

  const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "CRM / Customers", href: "/dashboard/customers", icon: Users },
    { name: "Inventory", href: "/dashboard/inventory", icon: Package },
    { name: "Invoicing & Orders", href: "/dashboard/orders", icon: ShoppingBag },
    { name: "Employee Hub", href: "/dashboard/employees", icon: UserCheck },
    { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
    { name: "AI Marketing", href: "/dashboard/marketing", icon: Megaphone },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const currentBranchName = BRANCHES.find(b => b.id === activeBranch)?.name || "Delhi HQ";

  const notifications = [
    { id: 1, text: "AI Alert: Low stock detected in Suede Loafers (Mumbai)", type: "warning" },
    { id: 2, text: "Invoice generated successfully for Aarav Mehta (₹4,000)", type: "success" },
    { id: 3, text: "Customer Vikram Malhotra is inactive for 84 days. High churn risk.", type: "danger" }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#050816]/80 backdrop-blur-md border-b border-white/10 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-white/5 rounded-lg lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6C63FF] to-[#00E5FF] flex items-center justify-center text-white font-black text-lg group-hover:scale-105 transition-transform">
              B
            </div>
            <span className="font-extrabold text-lg bg-gradient-to-r from-white via-white to-text-secondary bg-clip-text text-transparent">
              BizFlow <span className="text-[#00E5FF] font-medium">AI</span>
            </span>
          </Link>

          {/* Branch Switcher Selector */}
          <div className="hidden sm:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
            <GitBranch className="w-3.5 h-3.5 text-[#00E5FF]" />
            <span className="text-text-secondary font-medium mr-1">Active Branch:</span>
            <select
              value={activeBranch}
              onChange={(e) => setActiveBranch(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
            >
              {BRANCHES.map((b) => (
                <option key={b.id} value={b.id} className="bg-[#050816] text-white">
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Top bar right utilities */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-text-secondary w-64">
            <Search className="w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search customers, invoices..."
              className="bg-transparent w-full text-white placeholder-text-secondary focus:outline-none"
            />
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-text-secondary hover:text-white hover:bg-white/10 transition-colors relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF5252] rounded-full animate-pulse" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 bg-[#0c102b] border border-white/10 rounded-2xl shadow-2xl p-4 z-25 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <h4 className="text-xs font-bold text-white">Smart Notifications</h4>
                      <span className="text-[10px] text-[#00E5FF] font-bold">BizFlow AI Engine</span>
                    </div>
                    <div className="space-y-2">
                      {notifications.map((n) => (
                        <div key={n.id} className="text-xs p-2 bg-white/5 rounded-lg border-l-2 border-[#6C63FF] hover:bg-white/8 transition-colors">
                          <p className="text-white leading-snug">{n.text}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] flex items-center justify-center font-bold text-xs">
              SME
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-white">{businessDetails.ownerName}</div>
              <div className="text-[10px] text-text-secondary">{businessDetails.name} ({currentBranchName})</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Left Desktop */}
        <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-[#050816] p-4 shrink-0 justify-between">
          <nav className="space-y-1.5">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white shadow-lg shadow-primary-app/20"
                      : "text-text-secondary hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-text-secondary group-hover:text-white"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-4 rounded-2xl bg-gradient-to-tr from-[#6C63FF]/10 to-[#00E5FF]/5 border border-white/5 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-[#00E5FF]/10 rounded-full blur-xl pointer-events-none" />
            <Sparkles className="w-5 h-5 text-[#00E5FF] mb-2 animate-bounce" />
            <h5 className="text-xs font-bold text-white">Need AI help?</h5>
            <p className="text-[10px] text-text-secondary mt-1">Click the bottom-right AI Copilot badge anytime.</p>
          </div>
        </aside>

        {/* Sidebar Mobile Overlay Drawer */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 z-50 bg-black lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 z-50 w-72 bg-[#050816] p-6 border-r border-white/10 flex flex-col justify-between lg:hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6C63FF] to-[#00E5FF] flex items-center justify-center text-white font-bold">
                        B
                      </div>
                      <span className="font-extrabold text-lg text-white">BizFlow AI</span>
                    </Link>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 hover:bg-white/5 rounded-lg"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-6 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <GitBranch className="w-4 h-4 text-[#00E5FF]" />
                    <span className="text-text-secondary font-medium">Branch:</span>
                    <select
                      value={activeBranch}
                      onChange={(e) => setActiveBranch(e.target.value)}
                      className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                    >
                      {BRANCHES.map((b) => (
                        <option key={b.id} value={b.id} className="bg-[#050816] text-white">
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <nav className="space-y-1">
                    {navigation.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white"
                              : "text-text-secondary hover:text-white hover:bg-white/5"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#050816] relative">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#6C63FF]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00E5FF]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>

      {/* Floating ChatBot Panel */}
      <ChatBot branch={activeBranch} />
    </div>
  );
}
