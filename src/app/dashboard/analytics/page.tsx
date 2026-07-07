"use client";

import { useEffect, useState } from "react";
import { useBranch } from "@/context/BranchContext";
import { TrendingUp, Sparkles, BarChart2, PieChart, Info } from "lucide-react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart as RechartsPieChart,
  Pie
} from "recharts";

export default function AnalyticsDashboard() {
  const { activeBranch, branches } = useBranch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeBranchData = branches.find((b) => b.id === activeBranch) || branches[0];

  if (!isMounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-white/5 rounded-lg" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-white/5 rounded-2xl border border-white/5" />
          <div className="h-96 bg-white/5 rounded-2xl border border-white/5" />
        </div>
      </div>
    );
  }

  // Colors for Pie Chart
  const COLORS = ["#6C63FF", "#00E5FF", "#8B5CF6"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            Advanced Analytics Matrix
            <span className="p-1 rounded bg-[#00E5FF]/15 text-[#00E5FF] text-[10px] font-bold uppercase tracking-wider border border-[#00E5FF]/20">
              AI Powered Insights
            </span>
          </h1>
          <p className="text-text-secondary text-sm">
            Deep dive into customer demographics, revenue trends, and operational ratios.
          </p>
        </div>
      </div>

      {/* Primary Graphs Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Area Chart */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary-app" /> Revenue & Profit Ledger Mapping
            </h3>
            <span className="text-[10px] text-text-secondary">Last 6 Months</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeBranchData.revenueHistory}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
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
                    fontSize: "11px"
                  }}
                />
                <Legend wrapperStyle={{ fontSize: "10px", paddingTop: "5px" }} />
                <Area type="monotone" dataKey="amount" name="Gross Revenue" stroke="#6C63FF" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGrad)" />
                <Area type="monotone" dataKey="profit" name="Net Margin Profit" stroke="#00C853" strokeWidth={2.5} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Sales Bar Chart */}
        <div className="glass-panel p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-[#00E5FF]" /> Product Category Volume Performance
            </h3>
            <span className="text-[10px] text-text-secondary">Current Branch</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeBranchData.topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" stroke="#AAB0C5" fontSize={9} tickLine={false} />
                <YAxis stroke="#AAB0C5" fontSize={9} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0c102b",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "11px"
                  }}
                />
                <Bar dataKey="sales" name="Units Sold" fill="#00E5FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Row: Customer segmentation & KPI Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer segmentation Pie chart */}
        <div className="glass-panel p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-secondary-app" /> Client Category Spread
              </h3>
              <span className="text-[10px] text-text-secondary">SME Segmentation</span>
            </div>

            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={activeBranchData.customerCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {activeBranchData.customerCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex justify-around text-[10px] text-text-secondary border-t border-white/5 pt-4">
            {activeBranchData.customerCategories.map((cat, idx) => (
              <div key={cat.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                <span>{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Branch KPI performance matrix */}
        <div className="glass-panel p-5 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Branch Comparative Matrix</h3>
            <span className="text-[10px] text-accent-app font-bold">Consolidated Operations</span>
          </div>

          <div className="space-y-3 mt-4 text-xs">
            {branches.map((b) => {
              const profitPercentage = ((b.revenue - b.expenses) / b.revenue) * 100;
              return (
                <div key={b.id} className="p-3 bg-white/3 border border-white/5 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-white">{b.name}</span>
                    <span className="text-[10px] text-text-secondary">Growth: <strong className="text-[#00C853]">{b.salesGrowth}%</strong></span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[10px] text-text-secondary">
                    <div>
                      <span>Monthly revenue</span>
                      <p className="text-white font-bold mt-0.5">₹{b.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <span>Operating Margin</span>
                      <p className="text-[#00E5FF] font-bold mt-0.5">{profitPercentage.toFixed(1)}%</p>
                    </div>
                    <div className="text-right">
                      <span>Low Stocks</span>
                      <p className="text-[#FF5252] font-bold mt-0.5">{b.lowStockCount} alerts</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
