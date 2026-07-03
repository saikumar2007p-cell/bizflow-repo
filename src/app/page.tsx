"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Database,
  Sliders,
  Check,
  ChevronDown,
  Building,
  TrendingUp,
  MessageSquare,
  Star,
  Users,
  Smartphone,
  MousePointer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function LandingPage() {
  const [selectedIndustry, setSelectedIndustry] = useState("Retail Stores");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // AI generator simulator states
  const [businessNameInput, setBusinessNameInput] = useState("");
  const [businessCategory, setBusinessCategory] = useState("Cafe");
  const [isGeneratingWebsite, setIsGeneratingWebsite] = useState(false);
  const [generatedWebsiteUrl, setGeneratedWebsiteUrl] = useState("");

  const handleGenerateWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessNameInput) return;
    setIsGeneratingWebsite(true);

    setTimeout(() => {
      setIsGeneratingWebsite(false);
      setGeneratedWebsiteUrl(`https://bizflow.ai/sites/${businessNameInput.toLowerCase().replace(/\s+/g, "-")}`);
      
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#6C63FF", "#00E5FF", "#00C853"]
      });
    }, 2000);
  };

  const industries = [
    { name: "Retail Stores", desc: "Manage inventory margins, barcode scanning, and GST bills." },
    { name: "Shoe Shops", desc: "Handle size variants, style SKUs, and restock alerts." },
    { name: "Restaurants & Cafes", desc: "Manage kitchen ordering, bills, menu catalogues." },
    { name: "Hospitals & Clinics", desc: "Patient appointments booking, doctors rosters, medicine inventory." },
    { name: "Educational Institutes", desc: "Fee accounting registers, classes timetables, student attendance." },
    { name: "Service Businesses", desc: "Client quotes, automated payment collection links, project reports." }
  ];

  const features = [
    { title: "AI Website Builder", desc: "Type your store name to generate a fully SEO-optimized product catalogue website with online ordering.", icon: Globe, color: "from-[#6C63FF] to-[#8B5CF6]" },
    { title: "Smart GST Billing", desc: "Generate professional GST invoices and share instantly via WhatsApp or Email.", icon: Database, color: "from-[#00C853] to-[#2E7D32]" },
    { title: "Predictive Inventory", desc: "AI forecasts when you will run out of stock based on historical customer purchase trends.", icon: TrendingUp, color: "from-[#00E5FF] to-[#00B0FF]" },
    { title: "Automated CRM Portal", desc: "Follow up with inactive clients via targeted WhatsApp marketing campaigns.", icon: Users, color: "from-[#FFC107] to-[#FF8F00]" }
  ];

  const faqs = [
    { q: "Do I need technical skills to build a website?", a: "No! BizFlow AI Website Generator takes your business name and writes the copy, formats the product catalogue, and sets up maps coordinates instantly." },
    { q: "Is the invoicing system GST compliant?", a: "Yes, our billing ledger is compliant with standard GST tax rates (5%, 12%, 18%, 28%) and outputs printable tax summaries." },
    { q: "Can I manage multiple outlets/branches?", a: "Yes. Our centralized multi-branch dashboard allows shared inventory mapping and consolidated revenue tracking across Delhi, Mumbai, and Bangalore." }
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative selection:bg-accent-app selection:text-background-app">
      {/* 3D Glowing Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6C63FF]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-[#00E5FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[30%] h-[30%] bg-[#8B5CF6]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#050816]/70 backdrop-blur-md border-b border-white/5 h-16 flex items-center justify-between px-6 md:px-12">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6C63FF] to-[#00E5FF] flex items-center justify-center font-black text-white">
            B
          </div>
          <span className="font-extrabold text-lg tracking-tight">
            BizFlow <span className="text-[#00E5FF] font-medium">AI</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-text-secondary">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#demo" className="hover:text-white transition-colors">AI Generator</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:shadow-lg hover:shadow-primary-app/20 hover:scale-102 transition-all rounded-xl text-xs font-extrabold text-white"
          >
            Launch Dashboard
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center max-w-5xl mx-auto space-y-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#00E5FF] font-bold"
        >
          <Sparkles className="w-3.5 h-3.5" /> All-in-One SME Operating System
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] bg-gradient-to-b from-white via-white to-text-secondary bg-clip-text text-transparent"
        >
          Digitize Your Business <br /> With <span className="text-[#6C63FF] drop-shadow-[0_0_30px_rgba(108,99,255,0.3)]">BizFlow AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-text-secondary text-sm sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed"
        >
          Replace notebooks, WhatsApp coordination lists, Excel inventory sheets, and disconnected registers with one intelligent, voice-powered cloud platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 text-xs font-bold pt-4"
        >
          <Link
            href="/dashboard"
            className="px-6 py-3.5 bg-gradient-to-r from-[#6C63FF] via-[#8B5CF6] to-[#00E5FF] rounded-xl hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-1.5 text-white"
          >
            Start Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#demo"
            className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-text-secondary hover:text-white"
          >
            Watch AI Demo
          </a>
        </motion.div>
      </section>

      {/* Trust Company Section */}
      <section className="border-y border-white/5 bg-white/2 py-8 text-center text-[10px] text-text-secondary font-black tracking-widest uppercase">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-6 items-center opacity-40">
          <span>TRUSTED BY 10,000+ SMEs</span>
          <span>APEX LEATHERS</span>
          <span>FITSTRIDE INC</span>
          <span>TRENDCRAFT LTD</span>
          <span>SHOE WORLD</span>
        </div>
      </section>

      {/* Landing Page Dashboard Preview Widget */}
      <section className="px-6 py-16 max-w-6xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-2 rounded-2xl border border-white/10 bg-[#0c102b]/60 overflow-hidden shadow-2xl relative"
        >
          <div className="absolute top-2 left-2 flex gap-1.5 z-20">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5252]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFC107]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00C853]" />
          </div>
          
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
            alt="BizFlow AI Dashboard"
            className="rounded-xl w-full h-[320px] md:h-[450px] object-cover opacity-75 blur-[0.5px] hover:blur-none transition-all duration-500 scale-100 hover:scale-[1.01]"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent flex flex-col justify-end p-6 md:p-10 text-left">
            <div className="max-w-md space-y-2">
              <span className="px-2 py-0.5 rounded bg-[#00E5FF]/15 text-[#00E5FF] text-[8px] uppercase font-bold tracking-widest border border-[#00E5FF]/20">Live Sync</span>
              <h3 className="text-lg md:text-2xl font-black text-white">Centralized Management Ledger</h3>
              <p className="text-xs text-text-secondary">Toggle inventory levels, GST parameters, and generate campaigns directly from your dashboard.</p>
              <Link href="/dashboard" className="text-xs text-[#00E5FF] font-bold inline-flex items-center gap-1 hover:underline pt-2">
                Simulate Dashboard live <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Problem vs Solution Comparison Section */}
      <section className="px-6 py-16 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">The SME Operations Shift</h2>
          <p className="text-text-secondary text-sm max-w-md mx-auto">Manual operations bleed time and accuracy. BizFlow AI changes that.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed">
          {/* Problem */}
          <div className="glass-panel p-6 border-[#FF5252]/20 space-y-4">
            <span className="px-2 py-0.5 rounded bg-[#FF5252]/10 text-[#FF5252] font-black uppercase text-[8px] tracking-wider">Before BizFlow AI</span>
            <h4 className="font-extrabold text-white text-base">Notebooks & Excel Chains</h4>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-[#FF5252] font-bold">✕</span> Data loss from torn paper ledgers or deleted excel spreadsheets.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF5252] font-bold">✕</span> Delayed billing causing long customer waiting checkout queues.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF5252] font-bold">✕</span> Disconnected inventory counts causing sudden out-of-stock items.
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="glass-panel p-6 border-[#00C853]/20 space-y-4 relative glow-primary">
            <span className="px-2 py-0.5 rounded bg-[#00C853]/15 text-[#00C853] font-black uppercase text-[8px] tracking-wider">With BizFlow AI</span>
            <h4 className="font-extrabold text-white text-base">Unified AI Intelligence</h4>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-[#00C853] font-bold">✓</span> Centralized encrypted databases synced across all store outlets.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00C853] font-bold">✓</span> Real-time 18% GST invoice generation with print triggers.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#00C853] font-bold">✓</span> AI depletion predictor triggers reordering alerts in advance.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive AI Website Generator Simulator */}
      <section id="demo" className="px-6 py-16 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white flex justify-center items-center gap-2">
            AI Website Builder Simulator
            <Sparkles className="w-6 h-6 text-[#00E5FF]" />
          </h2>
          <p className="text-text-secondary text-sm max-w-md mx-auto">Generate a custom responsive business catalog website in 2 seconds.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Settings Entry */}
          <div className="glass-panel p-6 lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-wider block">Simulator Controller</span>
            <form onSubmit={handleGenerateWebsite} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-text-secondary font-bold">Business / Store Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pioneer Shoes"
                  value={businessNameInput}
                  onChange={(e) => setBusinessNameInput(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-app"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-text-secondary font-bold">SME Industry Category</label>
                <select
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                  className="w-full bg-[#0c102b] border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                >
                  <option value="Shoe Shop">Shoe Store</option>
                  <option value="Cafe">Coffee Shop / Cafe</option>
                  <option value="Retail Store">Supermarket Retail</option>
                  <option value="Clinic">Medical Clinic</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isGeneratingWebsite || !businessNameInput}
                className="w-full py-3 bg-gradient-to-r from-primary-app to-secondary-app text-white font-extrabold rounded-xl hover:scale-102 transition-all cursor-pointer disabled:opacity-50"
              >
                {isGeneratingWebsite ? "Writing SEO catalogue website..." : "Generate Store Website"}
              </button>
            </form>
          </div>

          {/* Generated Result Container */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {isGeneratingWebsite ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel p-12 text-center flex flex-col items-center justify-center gap-3 bg-[#0c102b] border border-white/10 h-[280px]"
                >
                  <div className="p-3 bg-primary-app/20 rounded-full animate-bounce">
                    <Globe className="w-6 h-6 text-accent-app animate-spin" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Generating HTML layout...</h4>
                  <p className="text-[10px] text-text-secondary">Setting up maps coordinates and billing links.</p>
                </motion.div>
              ) : generatedWebsiteUrl ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-panel p-6 bg-[#0c102b] border border-white/15 rounded-2xl space-y-4 relative overflow-hidden h-[280px] flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="px-2 py-0.5 rounded bg-[#00C853]/15 text-[#00C853] text-[9px] uppercase font-bold tracking-widest border border-[#00C853]/20">
                      Website live & ready
                    </span>
                    <h3 className="text-base font-black text-white">{businessNameInput} Catalogs</h3>
                    <p className="text-text-secondary text-xs">
                      A beautiful responsive catalog landing page has been created for your <strong>{businessCategory}</strong> business. Online orders received here sync directly with your dashboard inventory indices.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-white/3 rounded-xl border border-white/5 text-[10px] font-mono text-accent-app flex justify-between items-center">
                    <span>{generatedWebsiteUrl}</span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Launching website catalogue for ${businessNameInput}!`);
                      }}
                      className="underline font-bold text-white hover:text-accent-app"
                    >
                      Visit site
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="glass-panel p-12 text-center text-xs text-text-secondary flex flex-col items-center justify-center border border-dashed border-white/10 h-[280px]">
                  <Globe className="w-8 h-8 text-white/15 mb-2" />
                  <p>Type your business details on the left to see the AI simulator generate your storefront.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Supported Industries Tabbing */}
      <section id="features" className="px-6 py-16 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">Supported SME Industries</h2>
          <p className="text-text-secondary text-sm max-w-md mx-auto">BizFlow AI adapts immediately to your specific industrial workflows.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((ind) => (
            <div
              key={ind.name}
              onClick={() => setSelectedIndustry(ind.name)}
              className={`glass-panel p-5 space-y-2 cursor-pointer transition-all ${
                selectedIndustry === ind.name
                  ? "border-[#6C63FF] bg-[#6C63FF]/5 scale-102"
                  : "hover:bg-white/5"
              }`}
            >
              <h4 className="font-extrabold text-white text-sm flex items-center justify-between">
                {ind.name}
                {selectedIndustry === ind.name && <Check className="w-4 h-4 text-[#00E5FF]" />}
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className="px-6 py-16 max-w-6xl mx-auto space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="glass-panel p-5 space-y-3 relative overflow-hidden">
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-white/5 rounded-full blur-xl" />
              <div className={`p-2.5 rounded-xl bg-gradient-to-r ${f.color} text-white w-fit`}>
                <f.icon className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white text-sm">{f.title}</h4>
              <p className="text-xs text-text-secondary leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-16 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">Simple, Transparent Pricing</h2>
          <p className="text-text-secondary text-sm max-w-md mx-auto">Get early access at startup pricing rates.</p>
          
          <div className="inline-flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold mt-2">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full transition-all ${
                billingCycle === "monthly" ? "bg-[#6C63FF] text-white" : "text-text-secondary"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                billingCycle === "yearly" ? "bg-[#6C63FF] text-white" : "text-text-secondary"
              }`}
            >
              Yearly billing <span className="bg-[#00C853] text-background-app text-[9px] px-1.5 py-0.5 rounded-full font-black">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Starter */}
          <div className="glass-panel p-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block">Starter Tier</span>
              <h4 className="font-extrabold text-white text-base">Growth Plan</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">
                  ₹{billingCycle === "monthly" ? "1,499" : "1,199"}
                </span>
                <span className="text-xs text-text-secondary">/ month</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">Perfect for a single outlet shop looking to digitalize inventory and invoices.</p>
              
              <ul className="space-y-2 text-xs text-text-secondary pt-2">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00E5FF]" /> 1 Active Store Outlet</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00E5FF]" /> Automated GST Invoicing</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00E5FF]" /> AI Web Generator Site</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00E5FF]" /> 500 low stock SMS alerts</li>
              </ul>
            </div>
            
            <Link
              href="/dashboard"
              className="w-full py-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl font-bold text-center block text-xs mt-6"
            >
              Choose growth plan
            </Link>
          </div>

          {/* Premium Pro */}
          <div className="glass-panel p-6 border-[#6C63FF]/30 space-y-6 flex flex-col justify-between relative overflow-hidden glow-primary bg-gradient-to-tr from-[#6C63FF]/5 to-transparent">
            {/* Absolute badge */}
            <div className="absolute right-0 top-0 bg-[#6C63FF] text-white text-[9px] uppercase font-black tracking-widest px-4 py-1.5 rounded-bl-xl">
              Recommended
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest block">Pro Tier</span>
              <h4 className="font-extrabold text-white text-base">Consolidated Hub</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white">
                  ₹{billingCycle === "monthly" ? "3,999" : "3,199"}
                </span>
                <span className="text-xs text-text-secondary">/ month</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">Perfect for businesses managing multiple branches with shared warehouses.</p>
              
              <ul className="space-y-2 text-xs text-text-secondary pt-2">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00E5FF]" /> Unlimited Branch Outlets</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00E5FF]" /> Shared Inventory Matrix</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00E5FF]" /> Voice AI Business Copilot</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00E5FF]" /> Unlimited CRM WhatsApp Campaigns</li>
              </ul>
            </div>
            
            <Link
              href="/dashboard"
              className="w-full py-2.5 bg-gradient-to-r from-primary-app to-secondary-app text-white rounded-xl font-bold text-center block text-xs mt-6"
            >
              Choose Consolidated Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section id="faq" className="px-6 py-16 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-text-secondary text-sm">Everything you need to know about setting up BizFlow AI.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="glass-panel overflow-hidden">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left text-xs font-bold text-white flex justify-between items-center hover:bg-white/3 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-text-secondary transition-transform ${isOpen ? "rotate-180 text-white" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-white/5 bg-white/2"
                    >
                      <p className="p-5 text-xs text-text-secondary leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 text-center text-xs text-text-secondary bg-white/2">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-tr from-primary-app to-accent-app flex items-center justify-center font-bold text-white text-xs">
              B
            </div>
            <span className="font-extrabold text-white">BizFlow AI</span>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>

          <p>© {new Date().getFullYear()} BizFlow AI Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
