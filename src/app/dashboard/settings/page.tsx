"use client";

import { useState } from "react";
import { useBranch } from "@/context/BranchContext";
import { BRANCHES } from "@/utils/mockData";
import { Settings, Save, CheckCircle, BellRing, Sparkles, Building2, Sliders } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function SettingsDashboard() {
  const { activeBranch } = useBranch();
  const activeBranchData = BRANCHES.find((b) => b.id === activeBranch) || BRANCHES[0];

  const [companyName, setCompanyName] = useState("BizFlow Shoes Ltd");
  const [currency, setCurrency] = useState("INR");
  const [taxRate, setTaxRate] = useState(18);
  const [enableGst, setEnableGst] = useState(true);
  const [enableLowStockAlerts, setEnableLowStockAlerts] = useState(true);
  const [enableWhatsAppAlerts, setEnableWhatsAppAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    alert(`Settings saved successfully for ${activeBranchData.name}! Changes have been synced to the database.`);

    confetti({
      particleCount: 50,
      spread: 50,
      colors: ["#6C63FF", "#00E5FF"]
    });
  };

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
            System Preferences
            <span className="p-1 rounded bg-[#00E5FF]/15 text-[#00E5FF] text-[10px] font-bold uppercase tracking-wider border border-[#00E5FF]/20">
              Control Panel
            </span>
          </h1>
          <p className="text-text-secondary text-sm">
            Configure system settings, invoicing regulations, and alerts.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Core Profile Configuration */}
        <div className="glass-panel p-6 space-y-5 lg:col-span-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
            <Building2 className="w-4 h-4 text-[#6C63FF]" /> SME Profile Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-text-secondary font-bold">Registered Corporate Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-app font-medium"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-text-secondary font-bold">Trading Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#0c102b] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none"
              >
                <option value="INR">INR (₹) Indian Rupee</option>
                <option value="USD">USD ($) US Dollar</option>
                <option value="EUR">EUR (€) Euro</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-text-secondary font-bold">Default GST rate (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-app"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-text-secondary font-bold">Current Branch Workspace</label>
              <div className="w-full bg-white/3 border border-white/5 rounded-xl px-3.5 py-2.5 text-white font-extrabold select-none">
                {activeBranchData.name} ({activeBranchData.id.toUpperCase()})
              </div>
            </div>
          </div>
        </div>

        {/* Feature Triggers Settings */}
        <div className="space-y-6">
          <div className="glass-panel p-6 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Sliders className="w-4 h-4 text-[#00E5FF]" /> Feature toggling
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-white block">GST Compliant Invoices</span>
                  <span className="text-[10px] text-text-secondary">Generates tax inputs automatically</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableGst}
                  onChange={(e) => setEnableGst(e.target.checked)}
                  className="w-4 h-4 accent-primary-app cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div>
                  <span className="font-extrabold text-white block">Low Stock Smart Warnings</span>
                  <span className="text-[10px] text-text-secondary">AI alerts on depletion index</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableLowStockAlerts}
                  onChange={(e) => setEnableLowStockAlerts(e.target.checked)}
                  className="w-4 h-4 accent-primary-app cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between border-t border-white/5 pt-4">
                <div>
                  <span className="font-extrabold text-white block">WhatsApp Billing Reminders</span>
                  <span className="text-[10px] text-text-secondary">Automated marketing scheduler</span>
                </div>
                <input
                  type="checkbox"
                  checked={enableWhatsAppAlerts}
                  onChange={(e) => setEnableWhatsAppAlerts(e.target.checked)}
                  className="w-4 h-4 accent-primary-app cursor-pointer"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary-app to-secondary-app text-white font-extrabold rounded-xl hover:scale-102 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs shadow-lg"
          >
            <Save className="w-4 h-4" /> Save Preferences
          </button>
        </div>
      </form>
    </motion.div>
  );
}
