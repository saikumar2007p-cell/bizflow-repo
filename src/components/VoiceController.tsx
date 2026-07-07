"use client";

import { useVoiceAssistant } from "@/hooks/useVoiceAssistant";
import { Mic, MicOff, Volume2, Sparkles, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { getResponse } from "@/utils/mockData";
import { useBranch } from "@/context/BranchContext";

interface VoiceControllerProps {
  branch: string;
  onResponse: (response: string, query: string) => void;
}

export default function VoiceController({ branch, onResponse }: VoiceControllerProps) {
  const [activeCommand, setActiveCommand] = useState("");
  const { branches, inventory, customers } = useBranch();
  
  const handleVoiceCommand = (command: string) => {
    setActiveCommand(command);
    const reply = getResponse(command, branch, branches, inventory, customers);
    onResponse(reply, command);
    speakText(reply);
  };

  const { isListening, error, startListening, stopListening, speakText } = useVoiceAssistant({
    onCommand: handleVoiceCommand,
    branch,
  });

  return (
    <div className="flex flex-col gap-2 p-4 glass-panel glow-primary relative overflow-hidden">
      {/* Floating Sparkle glow */}
      <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-accent-app/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary-app/20 rounded-lg text-primary-app animate-pulse">
            <Sparkles className="w-4 h-4 text-accent-app" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
              BizFlow AI Voice Assistant
              {isListening && (
                <span className="flex gap-0.5 items-center justify-center h-2">
                  <span className="w-0.5 h-2 bg-accent-app rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="w-0.5 h-3 bg-accent-app rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-0.5 h-2 bg-accent-app rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </span>
              )}
            </h4>
            <p className="text-xs text-text-secondary">
              {isListening ? "Listening for command..." : "Click mic and say 'Show today's sales'"}
            </p>
          </div>
        </div>

        <button
          onClick={isListening ? stopListening : startListening}
          className={`relative p-3 rounded-full flex items-center justify-center transition-all ${
            isListening
              ? "bg-danger-app text-white ring-4 ring-danger-app/30 animate-pulse"
              : "bg-gradient-to-r from-primary-app to-secondary-app text-white hover:shadow-lg hover:scale-105"
          }`}
          title={isListening ? "Stop listening" : "Start Voice Assistant"}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>
      </div>

      {activeCommand && (
        <div className="mt-2 text-xs bg-white/5 border border-white/5 rounded-lg p-2 flex items-start gap-2">
          <Volume2 className="w-3.5 h-3.5 text-accent-app mt-0.5 shrink-0" />
          <div>
            <span className="text-text-secondary font-medium">You said:</span>{" "}
            <span className="text-white italic">"{activeCommand}"</span>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 text-[10px] text-danger-app bg-danger-app/10 border border-danger-app/20 rounded-md p-1.5 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
