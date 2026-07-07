"use client";

import { useState } from "react";
import { useBranch } from "@/context/BranchContext";
import { ShoppingBag, Search, Plus, Trash2, Printer, CheckCircle, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface InvoiceItem {
  itemId: string;
  name: string;
  qty: number;
  price: number;
}

export default function InvoicingOrders() {
  const { activeBranch, orders: localOrders, setOrders: setLocalOrders, inventory: branchInventorySource } = useBranch();
  const [customerName, setCustomerName] = useState("");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  
  // Selection state
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productQty, setProductQty] = useState(1);

  const branchInventory = branchInventorySource.filter(i => i.branch === activeBranch);
  const branchOrders = localOrders.filter(o => o.branch === activeBranch);

  const handleAddItem = () => {
    if (!selectedProduct) return;
    const prod = branchInventory.find(i => i.id === selectedProduct);
    if (!prod) return;

    // Check if item already added
    const existingIndex = invoiceItems.findIndex(i => i.itemId === prod.id);
    if (existingIndex > -1) {
      const updated = [...invoiceItems];
      updated[existingIndex].qty += Number(productQty);
      setInvoiceItems(updated);
    } else {
      setInvoiceItems([
        ...invoiceItems,
        {
          itemId: prod.id,
          name: prod.name,
          qty: Number(productQty),
          price: prod.price
        }
      ]);
    }

    setSelectedProduct("");
    setProductQty(1);
  };

  const handleRemoveItem = (index: number) => {
    setInvoiceItems(invoiceItems.filter((_, idx) => idx !== index));
  };

  // Calculations
  const subtotal = invoiceItems.reduce((acc, item) => acc + item.qty * item.price, 0);
  const gst = subtotal * 0.18; // 18% GST standard
  const total = subtotal + gst;

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || invoiceItems.length === 0) return;

    const newOrder = {
      id: `ord-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      date: new Date().toISOString().split('T')[0],
      total,
      status: "Delivered" as const,
      items: invoiceItems.map(i => `${i.name} x ${i.qty}`).join(", "),
      branch: activeBranch
    };

    setLocalOrders([newOrder, ...localOrders]);
    setCustomerName("");
    setInvoiceItems([]);

    // Celebrate!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#6C63FF", "#00E5FF", "#00C853", "#FFC107"]
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
            Invoicing & Billing Core
            <span className="p-1 rounded bg-[#00C853]/15 text-[#00C853] text-[10px] font-bold uppercase tracking-wider border border-[#00C853]/20">
              GST Compliant
            </span>
          </h1>
          <p className="text-text-secondary text-sm">
            Generate digital GST invoices instantly and map sales logs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Invoice Creator Form */}
        <div className="glass-panel p-6 lg:col-span-7 space-y-6">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-primary-app" /> Billing Entry Portal
          </h3>

          <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-text-secondary font-bold">Customer Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Aarav Mehta"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-app"
              />
            </div>

            {/* Product selection rows */}
            <div className="p-4 bg-white/3 border border-white/5 rounded-xl space-y-3">
              <span className="font-bold text-white">Add Products to Invoice</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-text-secondary font-bold">Select Product</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full bg-[#0c102b] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                  >
                    <option value="">-- Choose Product --</option>
                    {branchInventory.map((i) => (
                      <option key={i.id} value={i.id}>
                        {i.name} (Stock: {i.stock} - ₹{i.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 flex gap-2 items-end">
                  <div className="flex-1 space-y-1.5">
                    <label className="text-text-secondary font-bold">Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={productQty}
                      onChange={(e) => setProductQty(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="p-2.5 bg-gradient-to-r from-primary-app to-secondary-app text-white rounded-xl font-bold cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Selected items table */}
            {invoiceItems.length > 0 && (
              <div className="space-y-2">
                <span className="font-bold text-white">Invoice Items Ledger</span>
                <div className="bg-white/3 rounded-xl border border-white/5 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-text-secondary bg-white/2 text-[10px]">
                        <th className="p-3">Item Description</th>
                        <th className="p-3 text-right">Unit Price</th>
                        <th className="p-3 text-right">Qty</th>
                        <th className="p-3 text-right">Total</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceItems.map((item, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/3">
                          <td className="p-3 font-semibold text-white">{item.name}</td>
                          <td className="p-3 text-right text-text-secondary">₹{item.price.toLocaleString()}</td>
                          <td className="p-3 text-right text-white font-bold">{item.qty}</td>
                          <td className="p-3 text-right text-white font-black">₹{(item.qty * item.price).toLocaleString()}</td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(idx)}
                              className="text-danger-app hover:text-red-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={invoiceItems.length === 0 || !customerName}
              className="w-full py-3 bg-gradient-to-r from-[#00C853] to-[#2E7D32] text-white font-extrabold rounded-xl hover:scale-102 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none mt-4 text-xs"
            >
              Generate GST Invoice (₹{total.toLocaleString(undefined, { maximumFractionDigits: 2 })})
            </button>
          </form>
        </div>

        {/* Right Side: LIVE INVOICE PREVIEW CARD */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-text-secondary uppercase">Live Invoice Preview</h3>
            <span className="text-[10px] text-accent-app font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Auto Updates
            </span>
          </div>

          {/* Premium styled preview board */}
          <div className="glass-panel p-6 bg-[#0c102b] border border-white/10 rounded-2xl space-y-6 text-xs shadow-2xl relative overflow-hidden">
            {/* Holographic watermark background */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary-app/5 rounded-full blur-2xl pointer-events-none" />
            
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <h4 className="font-extrabold text-white text-base">BizFlow Operating Co.</h4>
                <p className="text-[10px] text-text-secondary mt-0.5">GSTIN: 07AAAAA1111A1Z1</p>
                <p className="text-[10px] text-text-secondary">Active Branch: {activeBranch === "delhi" ? "Delhi HQ" : activeBranch === "mumbai" ? "Mumbai Branch" : "Bangalore Hub"}</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-0.5 rounded bg-[#00C853]/15 text-[#00C853] text-[9px] uppercase font-bold tracking-wider">
                  Draft Preview
                </span>
                <p className="text-[10px] text-text-secondary mt-1">Invoice Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Bill to */}
            <div>
              <span className="text-[10px] text-text-secondary font-bold block uppercase tracking-wider">Billed To:</span>
              <span className="font-black text-white text-sm mt-1 block">
                {customerName || "Customer Name Details"}
              </span>
              <p className="text-[10px] text-text-secondary mt-0.5">Payment Status: POS Settlement</p>
            </div>

            {/* Preview table items summary */}
            <div className="space-y-2">
              <div className="border-b border-white/5 pb-1 flex justify-between font-bold text-[10px] text-text-secondary uppercase">
                <span>Item</span>
                <span>Total</span>
              </div>
              <div className="space-y-1.5 min-h-[80px]">
                {invoiceItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-white font-medium">
                      {item.name} <span className="text-text-secondary">x{item.qty}</span>
                    </span>
                    <span className="text-white font-bold">₹{(item.qty * item.price).toLocaleString()}</span>
                  </div>
                ))}
                {invoiceItems.length === 0 && (
                  <div className="h-full flex items-center justify-center text-center text-[10px] text-text-secondary py-6 italic">
                    Add products on left to populate invoice template.
                  </div>
                )}
              </div>
            </div>

            {/* Total blocks details */}
            <div className="border-t border-white/10 pt-4 space-y-1.5 text-right">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>GST (18% Integrated):</span>
                <span>₹{gst.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between font-black text-white text-sm border-t border-white/5 pt-2">
                <span>Grand Total:</span>
                <span className="text-accent-app">₹{total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Terms */}
            <div className="border-t border-white/5 pt-3 text-[9px] text-text-secondary text-center leading-relaxed">
              This is an AI-generated digital POS ledger copy. Fully tax compliant under CGST/SGST bylaws. Thank you for your business!
            </div>
          </div>
        </div>
      </div>

      {/* Orders database logs list */}
      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-primary-app/5 to-transparent">
          <h3 className="text-sm font-bold text-white">Sales Ledger Audit</h3>
          <span className="text-xs text-text-secondary">{branchOrders.length} Completed Runs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-text-secondary bg-white/2">
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Client Name</th>
                <th className="p-4 font-semibold">Date Logged</th>
                <th className="p-4 font-semibold">Details</th>
                <th className="p-4 font-semibold text-right">Tax-Inclusive Total</th>
                <th className="p-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {branchOrders.map((o) => (
                <tr key={o.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="p-4 font-extrabold text-[#00E5FF]">{o.id}</td>
                  <td className="p-4 font-bold text-white">{o.customerName}</td>
                  <td className="p-4 text-text-secondary font-medium">{o.date}</td>
                  <td className="p-4 text-text-secondary max-w-xs truncate" title={o.items}>{o.items}</td>
                  <td className="p-4 text-right text-white font-extrabold">₹{o.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  <td className="p-4 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#00C853]/15 text-[#00C853]">
                      {o.status}
                    </span>
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
