"use client";

import { useState } from "react";
import { useBranch } from "@/context/BranchContext";
import { BRANCHES } from "@/utils/mockData";
import { FileText, Download, Sparkles, AlertCircle, FileSpreadsheet, Eye } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

export default function ReportsDashboard() {
  const { activeBranch } = useBranch();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const activeBranchData = BRANCHES.find((b) => b.id === activeBranch) || BRANCHES[0];

  const reportTemplates = [
    { id: "rep-sales", title: "Monthly Sales Ledger", desc: "Detailed breakdown of sales tax, GST inputs, and payment logs.", format: "PDF", size: "2.4 MB" },
    { id: "rep-inventory", title: "Inventory Forecasting Log", desc: "List of stock depletion counts, suppliers, and AI order projections.", format: "Excel", size: "1.2 MB" },
    { id: "rep-crm", title: "Customer Churn & Risk Index", desc: "Engagement score audit mapping high risk accounts.", format: "PDF", size: "940 KB" },
    { id: "rep-payroll", title: "Roster Payroll Audit", desc: "Detailed pay slips, attendance ratios, and salary payouts.", format: "Excel", size: "540 KB" }
  ];

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);

    setTimeout(() => {
      setDownloadingId(null);
      alert(`Report "${name}" downloaded successfully! Mock exports formatted according to accounting guidelines.`);
      
      confetti({
        particleCount: 40,
        spread: 40,
        colors: ["#6C63FF", "#00E5FF"]
      });
    }, 1200); // Simulate network load
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
            Business Report Center
            <span className="p-1 rounded bg-[#6C63FF]/15 text-[#6C63FF] text-[10px] font-bold uppercase tracking-wider border border-[#6C63FF]/20">
              Audited Logs
            </span>
          </h1>
          <p className="text-text-secondary text-sm">
            Generate and export IRS/GST compliant reports for your financial statements.
          </p>
        </div>
      </div>

      {/* Primary Report Action Panel */}
      <div className="glass-panel p-6 bg-gradient-to-tr from-[#6C63FF]/5 to-transparent space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary-app/20 rounded-xl text-primary-app animate-pulse">
            <Sparkles className="w-5 h-5 text-accent-app" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Tax compliance ledger (Quarterly)</h3>
            <p className="text-[10px] text-text-secondary">AI audit scan complete. GST/VAT tax reporting status: **Active & Match**.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-xs pt-2">
          <button
            onClick={() => handleDownload("quarterly-pdf", "Q2 Consolidated Audit (PDF)")}
            disabled={downloadingId !== null}
            className="px-4 py-2.5 bg-gradient-to-r from-primary-app to-secondary-app text-white rounded-xl font-bold flex items-center gap-2 hover:scale-102 transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" /> Download PDF Audit
          </button>
          <button
            onClick={() => handleDownload("quarterly-excel", "Q2 Spreadsheet Sheet (Excel)")}
            disabled={downloadingId !== null}
            className="px-4 py-2.5 bg-[#00C853] text-white rounded-xl font-bold flex items-center gap-2 hover:scale-102 transition-all cursor-pointer disabled:opacity-50"
          >
            <FileSpreadsheet className="w-4 h-4" /> Export Excel Sheet
          </button>
        </div>
      </div>

      {/* Grid List of downloadable files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTemplates.map((report) => (
          <div key={report.id} className="glass-panel p-5 space-y-4 hover:border-white/20 transition-all flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex justify-between items-start">
                <h4 className="font-extrabold text-white text-sm">{report.title}</h4>
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                  report.format === "PDF" 
                    ? "bg-[#FF5252]/15 text-[#FF5252]" 
                    : "bg-[#00C853]/15 text-[#00C853]"
                }`}>
                  {report.format} ({report.size})
                </span>
              </div>
              <p className="text-text-secondary text-xs leading-relaxed">{report.desc}</p>
            </div>

            <div className="flex gap-2 text-xs pt-2 border-t border-white/5">
              <button
                onClick={() => handleDownload(report.id, report.title)}
                disabled={downloadingId !== null}
                className="flex-1 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {downloadingId === report.id ? (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                {downloadingId === report.id ? "Downloading..." : "Export File"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
