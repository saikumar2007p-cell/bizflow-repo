"use client";

import { useState } from "react";
import { Sparkles, Megaphone, Copy, Check, Mail, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const InstagramIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

interface GeneratedContent {
  headline: string;
  body: string;
  hashtags?: string;
  subject?: string;
}

export default function AIMarketing() {
  const [productName, setProductName] = useState("");
  const [channel, setChannel] = useState("Instagram");
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState(false);

  const generateCopy = () => {
    if (!productName) return;
    setIsGenerating(true);
    setContent(null);

    setTimeout(() => {
      let result: GeneratedContent;

      if (channel === "Instagram") {
        result = {
          headline: `✨ Step up your style with ${productName}! ✨`,
          body: `Meet the perfect blend of luxury and comfort. Crafted for the modern trendsetter who refuses to compromise on quality. Grab yours today and experience what ultimate premium comfort feels like! 🚶‍♂️💨`,
          hashtags: `#${productName.replace(/\s+/g, "")} #SMEStyle #PremiumFootwear #BizFlowAI #Trendsetter #ModernLux #DapperWalks`
        };
      } else if (channel === "Facebook") {
        result = {
          headline: `🔥 Discover the new gold standard: ${productName} 🔥`,
          body: `Tired of uncomfortable premium footwear? Say goodbye to compromises. Designed by master artisans, ${productName} is engineered to provide premium structural arch support while keeping you looking slick at the office or out in town. Limited Stock available! ⚡`,
          hashtags: `#PremiumLifestyle #StepUpYourGame #ArtisanCrafted #ShoeShopLovers`
        };
      } else if (channel === "Email") {
        result = {
          subject: `⚡ Exclusive early-access: Introducing ${productName} ⚡`,
          headline: `Upgrade Your Wardrobe Ledger Today!`,
          body: `Dear Valued Customer,\n\nWe are absolutely thrilled to present our newest arrival: the ${productName}. Built with certified premium materials and our signature comfort footbeds, it is designed to last years.\n\nAs a loyal customer, use code BIZFLOW10 for an exclusive 10% discount on checkout. Valid this weekend only!`
        };
      } else {
        result = {
          headline: `🎉 Mid-Year Festival Bonanza: ${productName} Offers! 🎉`,
          body: `Celebrate the monsoon season in style! Get an incredible 15% flat discount on our hot-selling ${productName}. Walk tall and step easy without burning a hole in your wallet. Swing by any of our branches (Delhi, Mumbai, Bangalore) to claim!`,
          hashtags: `#FestivalDeals #MonsoonSale #WalkInComfort #BizFlowAI`
        };
      }

      setContent(result);
      setIsGenerating(false);
      
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ["#6C63FF", "#00E5FF"]
      });
    }, 1200); // Simulated delay
  };

  const handleCopy = () => {
    if (!content) return;
    const textToCopy = content.subject
      ? `Subject: ${content.subject}\n\n${content.headline}\n\n${content.body}`
      : `${content.headline}\n\n${content.body}\n\n${content.hashtags || ""}`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            AI Marketing Generator
            <span className="p-1 rounded bg-[#00E5FF]/15 text-[#00E5FF] text-[10px] font-bold uppercase tracking-wider border border-[#00E5FF]/20">
              Copywriter Copilot
            </span>
          </h1>
          <p className="text-text-secondary text-sm">
            Generate high-converting ad copies, social posts, and email newsletters instantly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Panel */}
        <div className="glass-panel p-6 lg:col-span-5 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#6C63FF]" /> Campaign Settings
          </h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-text-secondary font-bold">Focus Product / Service Name</label>
              <input
                type="text"
                placeholder="e.g. Suede Loafers Pro"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-accent-app"
              />
            </div>

            <div className="space-y-2">
              <label className="text-text-secondary font-bold block">Target Channel</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "Instagram", icon: InstagramIcon, color: "text-[#D946EF]" },
                  { name: "Facebook", icon: FacebookIcon, color: "text-[#3B82F6]" },
                  { name: "Email", icon: Mail, color: "text-[#FFC107]" },
                  { name: "Festival Promo", icon: Calendar, color: "text-[#00C853]" }
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setChannel(item.name)}
                    className={`p-3 rounded-xl border flex items-center gap-2 font-semibold transition-all cursor-pointer ${
                      channel === item.name
                        ? "bg-white/10 border-[#00E5FF] text-white"
                        : "bg-white/3 border-white/5 text-text-secondary hover:text-white"
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateCopy}
              disabled={!productName || isGenerating}
              className="w-full py-3 bg-gradient-to-r from-primary-app to-secondary-app text-white font-extrabold rounded-xl hover:scale-102 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none mt-2"
            >
              {isGenerating ? "AI Copywriter writing..." : "Draft Marketing Copy"}
            </button>
          </div>
        </div>

        {/* Output Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-text-secondary uppercase">Artistic Layout Mockup</span>
            {content && (
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#00C853]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Clipboard"}
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-12 text-center flex flex-col items-center justify-center gap-3 bg-[#0c102b] border border-white/10 min-h-[300px]"
              >
                <div className="p-3 bg-primary-app/20 rounded-full animate-bounce">
                  <Sparkles className="w-6 h-6 text-accent-app animate-spin" />
                </div>
                <h4 className="text-xs font-bold text-white">Generating copywriting template...</h4>
                <p className="text-[10px] text-text-secondary">BizFlow AI LLM model is generating hooks & copy variants.</p>
              </motion.div>
            ) : content ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="glass-panel p-6 bg-[#0c102b] border border-white/10 rounded-2xl space-y-4 relative overflow-hidden min-h-[300px]"
              >
                {/* Visual Glow shape in container */}
                <div className="absolute -left-12 -top-12 w-28 h-28 bg-[#8B5CF6]/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" /> AI Generated Copy ({channel})
                  </span>
                  <span className="text-[9px] text-text-secondary">100% SEO Optimized</span>
                </div>

                {content.subject && (
                  <div className="p-3 bg-white/3 border border-white/5 rounded-xl space-y-1">
                    <span className="text-[10px] text-text-secondary font-bold block">EMAIL SUBJECT LINE:</span>
                    <span className="font-extrabold text-white text-xs">{content.subject}</span>
                  </div>
                )}

                <div className="space-y-3 text-xs leading-relaxed">
                  <h4 className="font-black text-white text-sm">{content.headline}</h4>
                  <p className="text-text-secondary whitespace-pre-wrap">{content.body}</p>
                  {content.hashtags && (
                    <p className="text-[#00E5FF] font-bold tracking-tight mt-3 text-[10px]">{content.hashtags}</p>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="glass-panel p-12 text-center text-xs text-text-secondary flex flex-col items-center justify-center border border-dashed border-white/10 min-h-[300px]">
                <Megaphone className="w-8 h-8 text-white/10 mb-2" />
                <p>Fill out the settings on the left to write premium advertising copy.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
