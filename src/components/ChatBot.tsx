"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Bot, Sparkles, X, Mic } from "lucide-react";
import { getResponse } from "@/utils/mockData";
import { motion, AnimatePresence } from "framer-motion";
import VoiceController from "./VoiceController";
import { useBranch } from "@/context/BranchContext";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface ChatBotProps {
  branch: string;
}

export default function ChatBot({ branch }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { branches, inventory, customers } = useBranch();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hello! I am your BizFlow AI Business Assistant. How can I help you manage your business today? You can type a query or click the mic button below to talk to me.",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Simulate thinking and answer
    setTimeout(() => {
      const replyText = getResponse(textToSend, branch, branches, inventory, customers);
      const aiMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "ai",
        text: replyText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const handleVoiceResponse = (reply: string, query: string) => {
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: query,
      timestamp: new Date(),
    };
    const aiMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "ai",
      text: reply,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary-app to-secondary-app text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:rotate-3 transition-transform cursor-pointer group"
      >
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent-app to-primary-app opacity-50 blur group-hover:opacity-80 transition-opacity" />
        <MessageSquare className="w-6 h-6 relative z-10" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-semibold text-sm relative z-10 group-hover:pl-2 whitespace-nowrap">
          AI Copilot
        </span>
      </motion.button>

      {/* Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 w-96 h-[550px] z-50 rounded-2xl border border-white/10 flex flex-col overflow-hidden bg-background-app/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-primary-app/10 to-secondary-app/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-app to-accent-app flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-1">
                    BizFlow AI Assistant
                    <Sparkles className="w-3 h-3 text-accent-app animate-pulse" />
                  </h3>
                  <span className="text-[10px] text-accent-app font-medium">Online & Listening</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-md text-text-secondary hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === "user"
                        ? "bg-primary-app text-white rounded-br-none"
                        : "bg-white/5 border border-white/10 text-white rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <span className="block text-[8px] text-text-secondary mt-1 text-right">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input & Voice Control Panel */}
            <div className="p-3 border-t border-white/10 bg-white/5 flex flex-col gap-2">
              <VoiceController branch={branch} onResponse={handleVoiceResponse} />

              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a command (e.g. show sales)..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-text-secondary focus:outline-none focus:border-accent-app"
                />
                <button
                  onClick={() => handleSend()}
                  className="p-2.5 bg-accent-app text-background-app rounded-xl font-bold hover:scale-105 transition-all cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
