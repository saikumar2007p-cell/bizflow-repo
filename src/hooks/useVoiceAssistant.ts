"use client";

import { useState, useEffect, useRef } from "react";

export interface VoiceAssistantProps {
  onCommand: (command: string) => void;
  branch: string;
}

export const useVoiceAssistant = ({ onCommand, branch }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check for standard or webkit SpeechRecognition
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-IN"; // Set lang format for Indian accents

    rec.onstart = () => {
      setIsListening(true);
      setError("");
    };

    rec.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      onCommand(speechToText);
    };

    rec.onerror = (event: any) => {
      console.error("Speech Recognition Error:", event.error);
      setError(`Error: ${event.error}`);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = rec;
  }, [onCommand]);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Error starting speech recognition:", err);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const speakText = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Stop speaking any previous cues
    window.speechSynthesis.cancel();

    // Clean markdown bold syntax so it sounds natural
    const cleanText = text.replace(/\*\*/g, "").replace(/₹/g, "Rupees");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Attempt to set a premium voice if available
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Microsoft Zira") || v.lang === "en-US");
    if (premiumVoice) {
      utterance.voice = premiumVoice;
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    speakText,
  };
};
