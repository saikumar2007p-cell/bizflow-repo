"use client";

import { useEffect, useState } from "react";
import { useBranch } from "@/context/BranchContext";
import { CUSTOMERS } from "@/utils/mockData";
import { Users, AlertTriangle, Search, Plus, Sparkles, Filter, Mail, Phone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function CRMCustomers() {
  const { activeBranch } = useBranch();
  const [filterRisk, setFilterRisk] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCustName, setNewCustName] = useState("");
  const [newCustPhone, setNewCustPhone] = useState("");
  const [newCustEmail, setNewCustEmail] = useState("");
  const [localCustomers, setLocalCustomers] = useState(CUSTOMERS);

  // Sync state on load
  useEffect(() => {
    setLocalCustomers(CUSTOMERS);
  }, []);

  const branchCustomers = localCustomers.filter((c) => c.branch === activeBranch);

  const filteredCustomers = branchCustomers.filter((c) => {
    const matchesRisk = filterRisk === "All" || c.risk === filterRisk;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.phone.includes(searchQuery) || 
                          c.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const activeCount = branchCustomers.filter(c => c.risk === "Low").length;
  const churnRiskCount = branchCustomers.filter(c => c.risk === "High").length;
  const warningCount = branchCustomers.filter(c => c.risk === "Medium").length;

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName || !newCustPhone || !newCustEmail) return;

    const newCustomer = {
      id: `cust-${Date.now()}`,
      name: newCustName,
      email: newCustEmail,
      phone: newCustPhone,
      lastVisit: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      branch: activeBranch,
      insights: "Newly onboarded customer. Welcome marketing email sent. AI predicts low immediate churn.",
      risk: "Low" as const
    };

    setLocalCustomers([newCustomer, ...localCustomers]);
    setShowAddModal(false);
    setNewCustName("");
    setNewCustPhone("");
    setNewCustEmail("");

    // Celebratory confetti trigger
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#6C63FF", "#00E5FF", "#00C853"]
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
            CRM & Customer Intelligence
            <span className="p-1 rounded bg-[#6C63FF]/15 text-[#6C63FF] text-[10px] font-bold uppercase tracking-wider border border-[#6C63FF]/20">
              Insights Layer
            </span>
          </h1>
          <p className="text-text-secondary text-sm">
            Monitor engagement levels, purchase frequencies, and AI churn predictors.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-primary-app to-secondary-app text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-primary-app/20 hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Customer
        </button>
      </div>

      {/* Analytics widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 border-l-4 border-[#00C853] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase">Highly Engaged</span>
            <h3 className="text-2xl font-black text-white mt-1">{activeCount} Clients</h3>
            <p className="text-[10px] text-text-secondary mt-0.5">Purchased within last 30 days</p>
          </div>
          <Users className="w-6 h-6 text-[#00C853]" />
        </div>

        <div className="glass-panel p-5 border-l-4 border-[#FFC107] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase">Churn Warning</span>
            <h3 className="text-2xl font-black text-white mt-1">{warningCount} Clients</h3>
            <p className="text-[10px] text-text-secondary mt-0.5">Inactive for 30-60 days</p>
          </div>
          <AlertTriangle className="w-6 h-6 text-[#FFC107]" />
        </div>

        <div className="glass-panel p-5 border-l-4 border-[#FF5252] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase">High Churn Risk</span>
            <h3 className="text-2xl font-black text-white mt-1">{churnRiskCount} Clients</h3>
            <p className="text-[10px] text-text-secondary mt-0.5">No visit for 60+ days</p>
          </div>
          <AlertTriangle className="w-6 h-6 text-[#FF5252]" />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 glass-panel bg-white/3">
        <div className="flex flex-1 items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-text-secondary max-w-md">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent w-full text-white placeholder-text-secondary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-text-secondary" />
          <span className="text-text-secondary font-medium">Risk filter:</span>
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            {["All", "Low", "Medium", "High"].map((risk) => (
              <button
                key={risk}
                onClick={() => setFilterRisk(risk)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterRisk === risk
                    ? "bg-[#6C63FF] text-white"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {risk}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Intelligence Database Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-primary-app/5 to-transparent">
          <h3 className="text-sm font-bold text-white">Client Portfolio</h3>
          <span className="text-xs text-text-secondary">{filteredCustomers.length} Records</span>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="p-12 text-center text-xs text-text-secondary space-y-2">
            <Users className="w-8 h-8 text-white/20 mx-auto" />
            <p>No customers match the active filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-text-secondary bg-white/2">
                  <th className="p-4 font-semibold">Client Name</th>
                  <th className="p-4 font-semibold">Contact Info</th>
                  <th className="p-4 font-semibold">Last Visit</th>
                  <th className="p-4 font-semibold text-right">LTV (Spend)</th>
                  <th className="p-4 font-semibold">AI Insights & Churn Risk</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="p-4 font-extrabold text-white">{cust.name}</td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-white/90">
                        <Mail className="w-3 h-3 text-text-secondary" />
                        {cust.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-text-secondary">
                        <Phone className="w-3 h-3" />
                        {cust.phone}
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary font-medium">{cust.lastVisit}</td>
                    <td className="p-4 text-right text-white font-extrabold">₹{cust.totalSpent.toLocaleString()}</td>
                    <td className="p-4 max-w-sm">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black ${
                            cust.risk === "Low" 
                              ? "bg-[#00C853]/15 text-[#00C853]" 
                              : cust.risk === "Medium"
                              ? "bg-[#FFC107]/15 text-[#FFC107]"
                              : "bg-[#FF5252]/15 text-[#FF5252]"
                          }`}>
                            {cust.risk} Churn Risk
                          </span>
                        </div>
                        <p className="text-[10px] text-text-secondary italic leading-relaxed">
                          "{cust.insights}"
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-1.5">
                        <a
                          href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-[#00C853]/10 text-[#00C853] hover:bg-[#00C853]/20 rounded-lg transition-colors"
                          title="Share Campaign via WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Customer Modal Drawer */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-[#0c102b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-primary-app/10 to-transparent border-b border-white/10 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-accent-app" /> Add Client Profile
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-xs text-text-secondary hover:text-white">Close</button>
            </div>
            <form onSubmit={handleAddCustomer} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-text-secondary font-bold">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent-app"
                />
              </div>
              <div className="space-y-1">
                <label className="text-text-secondary font-bold">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 99887 76655"
                  value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent-app"
                />
              </div>
              <div className="space-y-1">
                <label className="text-text-secondary font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. v.sharma@gmail.com"
                  value={newCustEmail}
                  onChange={(e) => setNewCustEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent-app"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-primary-app to-secondary-app text-white font-bold rounded-xl hover:scale-102 transition-all cursor-pointer mt-2"
              >
                Register Customer
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
