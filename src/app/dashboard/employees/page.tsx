"use client";

import { useState } from "react";
import { useBranch } from "@/context/BranchContext";
import { UserCheck, Sparkles, AlertTriangle, ShieldCheck, Mail, Edit, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function EmployeeManagement() {
  const { activeBranch, employees: localEmployees, setEmployees: setLocalEmployees } = useBranch();

  const branchEmployees = localEmployees.filter((e) => e.branch === activeBranch);

  const handleApproveLeave = (empId: string) => {
    const updated = localEmployees.map((e) => {
      if (e.id === empId) {
        if (e.status === "On Leave") {
          return { ...e, status: "Active" as const };
        } else {
          return {
            ...e,
            status: "On Leave" as const,
            leaveBalance: Math.max(0, e.leaveBalance - 1)
          };
        }
      }
      return e;
    });

    setLocalEmployees(updated);

    confetti({
      particleCount: 40,
      spread: 50,
      colors: ["#8B5CF6", "#00E5FF"]
    });
  };

  const handleRunPayroll = () => {
    const payrollSum = branchEmployees.reduce((acc, e) => acc + e.salary, 0);
    alert(`Consolidated payroll of ₹${payrollSum.toLocaleString()} processed successfully for ${branchEmployees.length} employees! Bank payout orders dispatched via IMPS settlement.`);
    
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#00C853", "#6C63FF", "#00E5FF"]
    });
  };

  const totalPayroll = branchEmployees.reduce((acc, e) => acc + e.salary, 0);
  const activeCount = branchEmployees.filter(e => e.status === "Active").length;
  const onLeaveCount = branchEmployees.filter(e => e.status === "On Leave").length;

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
            Employee Hub & Payroll
            <span className="p-1 rounded bg-[#8B5CF6]/15 text-[#8B5CF6] text-[10px] font-bold uppercase tracking-wider border border-[#8B5CF6]/20">
              Operations Center
            </span>
          </h1>
          <p className="text-text-secondary text-sm">
            Manage store employee leaves, rosters, and process salary payrolls.
          </p>
        </div>
        <button
          onClick={handleRunPayroll}
          className="px-4 py-2 bg-gradient-to-r from-primary-app to-secondary-app text-white text-xs font-bold rounded-xl shadow-lg hover:shadow-primary-app/20 hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" /> Process Salary Payroll
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 border-l-4 border-[#6C63FF] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase">Active On Duty</span>
            <h3 className="text-2xl font-black text-white mt-1">{activeCount} Workers</h3>
            <p className="text-[10px] text-text-secondary mt-0.5">Currently clocked in</p>
          </div>
          <UserCheck className="w-6 h-6 text-[#6C63FF]" />
        </div>

        <div className="glass-panel p-5 border-l-4 border-[#00E5FF] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase">On Approved Leave</span>
            <h3 className="text-2xl font-black text-white mt-1">{onLeaveCount} Workers</h3>
            <p className="text-[10px] text-text-secondary mt-0.5">Returning shortly</p>
          </div>
          <Calendar className="w-6 h-6 text-[#00E5FF]" />
        </div>

        <div className="glass-panel p-5 border-l-4 border-[#00C853] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase">Monthly Payroll Liability</span>
            <h3 className="text-2xl font-black text-white mt-1">₹{totalPayroll.toLocaleString()}</h3>
            <p className="text-[10px] text-text-secondary mt-0.5">Consolidated salary liabilities</p>
          </div>
          <Sparkles className="w-6 h-6 text-[#00C853]" />
        </div>
      </div>

      {/* Employee List Grid Database Table */}
      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-primary-app/5 to-transparent">
          <h3 className="text-sm font-bold text-white">Staff Roster</h3>
          <span className="text-xs text-text-secondary">{branchEmployees.length} active employee profiles</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-text-secondary bg-white/2">
                <th className="p-4 font-semibold">Worker Details</th>
                <th className="p-4 font-semibold">Business Role</th>
                <th className="p-4 font-semibold text-right">Attendance Rate</th>
                <th className="p-4 font-semibold text-right">Leave Balance</th>
                <th className="p-4 font-semibold text-right">Roster Status</th>
                <th className="p-4 font-semibold text-right">Monthly Salary</th>
                <th className="p-4 font-semibold text-right">Operations Action</th>
              </tr>
            </thead>
            <tbody>
              {branchEmployees.map((e) => (
                <tr key={e.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="p-4 font-extrabold text-white">{e.name}</td>
                  <td className="p-4 text-text-secondary font-medium">{e.role}</td>
                  <td className="p-4 text-right text-white font-bold">{e.attendance}</td>
                  <td className="p-4 text-right text-text-secondary">{e.leaveBalance} days remaining</td>
                  <td className="p-4 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                      e.status === "Active" 
                        ? "bg-[#00C853]/15 text-[#00C853]" 
                        : e.status === "On Leave"
                        ? "bg-[#FFC107]/15 text-[#FFC107]"
                        : "bg-[#FF5252]/15 text-[#FF5252]"
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="p-4 text-right text-white font-extrabold">₹{e.salary.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleApproveLeave(e.id)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                        e.status === "On Leave"
                          ? "bg-[#00C853]/10 border border-[#00C853]/20 text-[#00C853] hover:bg-[#00C853]/20"
                          : "bg-[#FFC107]/10 border border-[#FFC107]/20 text-[#FFC107] hover:bg-[#FFC107]/20"
                      }`}
                    >
                      {e.status === "On Leave" ? "Approve Return" : "Log Leave Request"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
