import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "false");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-[110]"
        >
          <div className="relative overflow-hidden group">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl opacity-40 blur-[1px]"></div>
            
            <div className="relative bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-blue-500/10 text-blue-400 mt-1">
                  <Cookie className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-bold text-base mb-1">Cookies & Privacidad</h4>
                  <p className="text-white/50 text-[11px] leading-tight mb-4">
                    Utilizamos cookies para mejorar tu experiencia y analizar nuestro tráfico según nuestra{" "}
                    <span className="text-blue-400 underline cursor-pointer hover:text-blue-300">política de cookies</span>.
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleAccept}
                      className="flex-1 bg-white text-black font-bold py-1.5 px-4 rounded-full text-[11px] hover:bg-blue-100 transition-colors whitespace-nowrap"
                    >
                      Aceptar
                    </button>
                    <button
                      onClick={handleDecline}
                      className="flex-1 bg-white/5 text-white/70 border border-white/10 font-bold py-1.5 px-4 rounded-full text-[11px] hover:bg-white/10 transition-colors whitespace-nowrap"
                    >
                      Configurar
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-white/30 hover:text-white transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
