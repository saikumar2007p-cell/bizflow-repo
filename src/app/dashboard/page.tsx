"use client";

import { useEffect, useState } from "react";
import { useBranch } from "@/context/BranchContext";
import { BRANCHES, ORDERS, INVENTORY } from "@/utils/mockData";
import {
  TrendingUp,
  DollarSign,
  Users,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  ShoppingBag,
  Sparkles,
  Plus
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardOverview() {
  const { activeBranch } = useBranch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Find data for active branch
  const activeBranchData = BRANCHES.find((b) => b.id === activeBranch) || BRANCHES[0];
  const branchOrders = ORDERS.filter((o) => o.branch === activeBranch);
  const branchLowStock = INVENTORY.filter((i) => i.branch === activeBranch && i.stock < i.minStock);

  if (!isMounted) {
    // Beautiful Loading Skeleton
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-white/5 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-white/5 rounded-2xl border border-white/5" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-96 lg:col-span-2 bg-white/5 rounded-2xl border border-white/5" />
          <div className="h-96 bg-white/5 rounded-2xl border border-white/5" />
        </div>
      </div>
    );
  }

  // Calculate quick stats
  const profit = activeBranchData.revenue - activeBranchData.expenses;
  const metrics = [
    {
      title: "Monthly Revenue",
      value: `₹${activeBranchData.revenue.toLocaleString()}`,
      change: `+${activeBranchData.salesGrowth}%`,
      isPositive: true,
      icon: DollarSign,
      color: "from-primary-app to-secondary-app",
      glow: "glow-primary",
    },
    {
      title: "Operating Expenses",
      value: `₹${activeBranchData.expenses.toLocaleString()}`,
      change: "-2.4%",
      isPositive: true,
      icon: TrendingDown,
      color: "from-[#8B5CF6] to-[#D946EF]",
      glow: "",
    },
    {
      title: "Net Margin (Profit)",
      value: `₹${profit.toLocaleString()}`,
      change: "+18.2%",
      isPositive: true,
      icon: TrendingUp,
      color: "from-[#00C853] to-[#2E7D32]",
      glow: "",
    },
    {
      title: "Low Stock Warnings",
      value: branchLowStock.length.toString(),
      change: `${branchLowStock.length > 0 ? "Action Required" : "Healthy Stock"}`,
      isPositive: branchLowStock.length === 0,
      icon: AlertTriangle,
      color: branchLowStock.length > 0 ? "from-[#FFC107] to-[#FF5252]" : "from-[#00C853] to-[#00E5FF]",
      glow: branchLowStock.length > 0 ? "glow-accent" : "",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-white to-text-secondary bg-clip-text text-transparent flex items-center gap-2">
            Control Center
            <span className="p-1 rounded bg-[#00E5FF]/10 text-[#00E5FF] text-[10px] uppercase font-bold tracking-widest border border-[#00E5FF]/20">
              AI Engine v2
            </span>
          </h1>
          <p className="text-text-secondary text-sm mt-1">
            Real-time analytics and predictive insights for <span className="text-white font-semibold">{activeBranchData.name}</span>.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/orders"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-app to-secondary-app text-white text-xs font-bold shadow-lg hover:shadow-primary-app/20 hover:scale-102 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Invoice
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`glass-panel glass-panel-hover p-6 flex flex-col justify-between relative overflow-hidden ${m.glow}`}
          >
            {/* Background glowing shape */}
            <div className="absolute -right-6 -top-6 w-16 h-16 bg-white/5 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{m.title}</span>
              <div className={`p-2 rounded-xl bg-gradient-to-tr ${m.color} text-white`}>
                <m.icon className="w-4 h-4" />
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-2xl font-black tracking-tight text-white">{m.value}</h3>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  m.isPositive 
                    ? "bg-[#00C853]/15 text-[#00C853]" 
                    : "bg-[#FF5252]/15 text-[#FF5252]"
                }`}>
                  {m.change}
                </span>
                <span className="text-[10px] text-text-secondary">vs last month</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Charts & Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Card */}
        <div className="glass-panel p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Revenue Performance</h3>
              <p className="text-xs text-text-secondary">Monthly sales ledger & expense mapping</p>
            </div>
            <span className="text-[10px] font-bold text-[#00E5FF] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Recharts Dynamic
            </span>
          </div>

          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeBranchData.revenueHistory}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C853" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="#AAB0C5" fontSize={10} tickLine={false} />
                <YAxis stroke="#AAB0C5" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0c102b",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px"
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="amount" name="Revenue" stroke="#6C63FF" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
                <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#00C853" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products List Card */}
        <div className="glass-panel p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div>
                <h3 className="text-base font-bold text-white">Top-Selling Products</h3>
                <p className="text-xs text-text-secondary">Branch volume sales</p>
              </div>
              <ShoppingBag className="w-4 h-4 text-primary-app" />
            </div>
            
            <div className="mt-4 space-y-3">
              {activeBranchData.topProducts.map((p, idx) => (
                <div key={p.name} className="flex items-center justify-between text-xs p-2.5 rounded-lg hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#00E5FF] w-4">{idx + 1}</span>
                    <span className="text-white font-medium">{p.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">₹{p.revenue.toLocaleString()}</div>
                    <div className="text-[10px] text-text-secondary">{p.sales} sales</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link href="/dashboard/inventory" className="text-xs text-[#00E5FF] hover:underline font-bold mt-4 flex items-center gap-1 w-fit group">
            View complete inventory
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Bottom Grid: Recent Invoices & Low Stock Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders / Invoices */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Recent Branch Ledger</h3>
            <span className="text-xs text-text-secondary">{branchOrders.length} Invoices</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-text-secondary">
                  <th className="pb-3 font-semibold">ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold text-right">Amount</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {branchOrders.map((o) => (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="py-3 text-[#00E5FF] font-bold">{o.id}</td>
                    <td className="py-3 text-white font-medium">{o.customerName}</td>
                    <td className="py-3 text-text-secondary">{o.date}</td>
                    <td className="py-3 text-right text-white font-bold">₹{o.total.toLocaleString()}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        o.status === "Delivered"
                          ? "bg-[#00C853]/15 text-[#00C853]"
                          : o.status === "Processing"
                          ? "bg-[#00E5FF]/15 text-[#00E5FF]"
                          : "bg-[#FF5252]/15 text-[#FF5252]"
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Alerts & AI Restock Predictions */}
        <div className="glass-panel p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              AI Inventory Watcher
              {branchLowStock.length > 0 && (
                <span className="w-2.5 h-2.5 bg-[#FF5252] rounded-full animate-ping" />
              )}
            </h3>
            <span className="text-xs text-text-secondary">Low Stock threshold alert</span>
          </div>

          {branchLowStock.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center gap-2 border border-dashed border-white/10 rounded-xl p-4 bg-white/3">
              <span className="p-3 bg-[#00C853]/10 text-[#00C853] rounded-full">
                <Sparkles className="w-5 h-5" />
              </span>
              <p className="text-xs font-bold text-white">All stocks are in healthy state</p>
              <p className="text-[10px] text-text-secondary">AI predicts no restock needed for 15+ days.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {branchLowStock.map((i) => (
                <div key={i.id} className="p-3.5 bg-white/5 border border-white/5 rounded-xl space-y-2 hover:bg-white/8 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{i.name}</h4>
                      <span className="text-[9px] text-text-secondary">SKU: {i.sku} | Cat: {i.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-[#FF5252]">{i.stock} units left</div>
                      <span className="text-[9px] text-text-secondary">Min Threshold: {i.minStock}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-[#FFC107]/10 border border-[#FFC107]/20 rounded-lg text-[10px] text-[#FFC107] leading-relaxed">
                    <strong>AI Recommendation:</strong> {i.prediction}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
