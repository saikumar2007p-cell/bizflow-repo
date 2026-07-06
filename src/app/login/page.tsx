"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBranch } from "@/context/BranchContext";
import { Sparkles, Building, ArrowRight, ArrowLeft, Mail, Lock, User, Briefcase, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function LoginPage() {
  const router = useRouter();
  const { setBusinessDetails } = useBranch();

  const [step, setStep] = useState(1); // 1: Login Credentials, 2: Business Profile, 3: Loading Engine
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("Retail Store");
  const [isActivating, setIsActivating] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!email || !password) return;
      setStep(2);
    }
  };

  const handleCompleteSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !businessName) return;

    setStep(3);
    setIsActivating(true);

    // Save profile configurations
    setBusinessDetails({
      name: businessName,
      type: businessType,
      ownerName: ownerName
    });

    // Simulate database initialization
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#6C63FF", "#00E5FF", "#00C853"]
      });
      router.push("/dashboard");
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#6C63FF]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00E5FF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Panel Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-panel p-8 bg-[#0c102b]/60 border border-white/10 rounded-3xl shadow-2xl relative"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00E5FF] flex items-center justify-center font-black text-white text-lg mx-auto">
                  B
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white">Welcome to BizFlow AI</h2>
                <p className="text-xs text-text-secondary">Access your digital store operating controls</p>
              </div>

              <form onSubmit={handleNextStep} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-text-secondary font-bold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. admin@yourstore.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-accent-app"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-accent-app"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-primary-app to-secondary-app text-white font-extrabold rounded-xl hover:scale-102 transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  Configure Business Profile <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00E5FF] flex items-center justify-center font-black text-white text-lg mx-auto">
                  B
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white">Configure Store Profile</h2>
                <p className="text-xs text-text-secondary">Register your business specifications</p>
              </div>

              <form onSubmit={handleCompleteSetup} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-text-secondary font-bold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Registered Owner Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saikumar P"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-accent-app"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary font-bold flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" /> Company / Business Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pioneer Footwear"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-3 text-white focus:outline-none focus:border-accent-app font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-text-secondary font-bold flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> Business Sector Type
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full bg-[#0c102b] border border-white/10 rounded-xl px-3 py-3 text-white focus:outline-none"
                  >
                    <option value="Shoe Shop">Shoe Shop / Footwear</option>
                    <option value="Retail Store">Retail Store / Supermarket</option>
                    <option value="Restaurant & Cafe">Restaurant & Cafe</option>
                    <option value="Hospital & Clinic">Hospital & Clinic</option>
                    <option value="Educational Institute">Educational Institute</option>
                    <option value="Service Business">Service Business</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-text-secondary hover:text-white"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="flex-2 py-3.5 bg-gradient-to-r from-primary-app to-secondary-app text-white font-extrabold rounded-xl hover:scale-102 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Initialize AI Panel <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="activating"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-primary-app/20" />
                <div className="absolute inset-0 rounded-full border-4 border-t-accent-app animate-spin" />
                <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-accent-app animate-pulse" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-black tracking-tight text-white animate-pulse">Launching BizFlow AI Engine...</h3>
                <div className="text-[10px] text-text-secondary space-y-1 font-mono">
                  <p>✓ Syncing databases configuration...</p>
                  <p>✓ Generating smart inventory matrices...</p>
                  <p>✓ Initializing voice synthesis listener...</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
