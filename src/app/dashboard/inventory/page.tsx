"use client";

import { useState } from "react";
import { useBranch } from "@/context/BranchContext";
import { Package, Search, Plus, AlertTriangle, Sparkles, Filter, Database, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import confetti from "canvas-confetti";

export default function InventoryDashboard() {
  const { activeBranch, inventory: localInventory, setInventory: setLocalInventory } = useBranch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = useState<any>(null);
  const [editQtyValue, setEditQtyValue] = useState(0);

  const branchInventory = localInventory.filter((i) => i.branch === activeBranch);

  const filteredInventory = branchInventory.filter((i) => {
    const matchesCategory = selectedCategory === "All" || i.category === selectedCategory;
    const matchesSearch = i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          i.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", ...Array.from(new Set(branchInventory.map((i) => i.category)))];

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItemForEdit) return;

    const updated = localInventory.map((item) => {
      if (item.id === selectedItemForEdit.id) {
        const newStock = Number(editQtyValue);
        const updatedPred = newStock >= item.minStock 
          ? "Stock levels are healthy. AI predicts no restock needed for 30+ days."
          : item.prediction;
        return {
          ...item,
          stock: newStock,
          prediction: updatedPred
        };
      }
      return item;
    });

    setLocalInventory(updated);
    setShowAddStockModal(false);
    setSelectedItemForEdit(null);

    confetti({
      particleCount: 50,
      spread: 40,
      origin: { y: 0.8 },
      colors: ["#6C63FF", "#00E5FF"]
    });
  };

  const chartData = branchInventory.map(item => ({
    name: item.name.substring(0, 10) + "..",
    Stock: item.stock,
    MinStock: item.minStock
  }));

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
            AI Inventory Tracker
            <span className="p-1 rounded bg-[#00E5FF]/15 text-[#00E5FF] text-[10px] font-bold uppercase tracking-wider border border-[#00E5FF]/20">
              Smart Predictor
            </span>
          </h1>
          <p className="text-text-secondary text-sm">
            Track current stock levels and see AI-powered reorder thresholds.
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-5 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Stock Level vs Thresholds</h3>
            <span className="text-[10px] text-text-secondary">Visual analysis for reordering</span>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
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
                <Bar dataKey="Stock" name="Current Stock" fill="#6C63FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="MinStock" name="Min Threshold" fill="#FF5252" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Prediction Summary */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-sm font-bold text-white">AI Purchase Plan</h3>
              <Sparkles className="w-4 h-4 text-accent-app animate-pulse" />
            </div>
            
            <div className="space-y-2.5">
              {branchInventory.filter(i => i.stock < i.minStock).map(i => (
                <div key={i.id} className="p-2.5 bg-danger-app/10 border border-danger-app/20 rounded-xl text-[10px] text-white flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-danger-app shrink-0 mt-0.5" />
                  <div>
                    <strong>Low Stock:</strong> {i.name} has only {i.stock} units (min: {i.minStock}).
                    <p className="text-text-secondary mt-1">{i.prediction}</p>
                  </div>
                </div>
              ))}
              {branchInventory.filter(i => i.stock < i.minStock).length === 0 && (
                <p className="text-xs text-text-secondary italic">No low stock items detected. AI forecasts supply chain stability.</p>
              )}
            </div>
          </div>
          
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] text-text-secondary mt-4">
            🤖 <strong>BizFlow Insight:</strong> Suppliers are dispatching within 48 hours. Keep thresholds active.
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 glass-panel bg-white/3">
        <div className="flex flex-1 items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-text-secondary max-w-md">
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search SKU or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent w-full text-white placeholder-text-secondary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-text-secondary" />
          <span className="text-text-secondary font-medium">Category:</span>
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#00E5FF] text-[#050816]"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Database Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-text-secondary bg-white/2">
                <th className="p-4 font-semibold">Product Name</th>
                <th className="p-4 font-semibold">SKU Code</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold text-right">Price</th>
                <th className="p-4 font-semibold text-right">In Stock</th>
                <th className="p-4 font-semibold">AI Recommendation</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((i) => {
                const isLow = i.stock < i.minStock;
                return (
                  <tr key={i.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isLow ? "bg-[#FF5252]" : "bg-[#00C853]"}`} />
                      {i.name}
                    </td>
                    <td className="p-4 text-text-secondary font-medium">{i.sku}</td>
                    <td className="p-4 text-text-secondary">{i.category}</td>
                    <td className="p-4 text-right text-white font-extrabold">₹{i.price.toLocaleString()}</td>
                    <td className="p-4 text-right">
                      <span className={`font-black ${isLow ? "text-[#FF5252]" : "text-white"}`}>
                        {i.stock}
                      </span>
                      <span className="text-[10px] text-text-secondary ml-1">/ {i.minStock}</span>
                    </td>
                    <td className="p-4 text-[10px] text-text-secondary max-w-xs italic leading-relaxed">
                      "{i.prediction}"
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedItemForEdit(i);
                          setEditQtyValue(i.stock);
                          setShowAddStockModal(true);
                        }}
                        className="p-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-white transition-colors cursor-pointer"
                        title="Update Stock Levels"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Stock Modal Drawer */}
      {showAddStockModal && selectedItemForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-[#0c102b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-4 bg-gradient-to-r from-primary-app/10 to-transparent border-b border-white/10 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-1">
                <Database className="w-4 h-4 text-[#00E5FF]" /> Update Stock Level
              </h3>
              <button
                onClick={() => {
                  setShowAddStockModal(false);
                  setSelectedItemForEdit(null);
                }}
                className="text-xs text-text-secondary hover:text-white"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleUpdateStock} className="p-6 space-y-4 text-xs">
              <div className="text-text-secondary bg-white/3 p-3 rounded-lg border border-white/5">
                <span className="font-bold text-white text-sm">{selectedItemForEdit.name}</span>
                <p className="mt-1">SKU: {selectedItemForEdit.sku} | Supplier: {selectedItemForEdit.supplier}</p>
              </div>
              <div className="space-y-1">
                <label className="text-text-secondary font-bold">New Inventory Quantity (units)</label>
                <input
                  type="number"
                  required
                  min={0}
                  placeholder="e.g. 50"
                  value={editQtyValue}
                  onChange={(e) => setEditQtyValue(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-accent-app"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-primary-app to-secondary-app text-white font-bold rounded-xl hover:scale-102 transition-all cursor-pointer mt-2"
              >
                Save Stock Update
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
