import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck } from "lucide-react";

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [settings, setSettings] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent-settings");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSave = (finalSettings = settings) => {
    localStorage.setItem("cookie-consent-settings", JSON.stringify(finalSettings));
    setIsVisible(false);
    setIsConfiguring(false);
  };

  const handleAcceptAll = () => {
    const allOn = { necessary: true, analytics: true, marketing: true };
    setSettings(allOn);
    handleSave(allOn);
  };

  const toggleSetting = (key: keyof typeof settings) => {
    if (key === 'necessary') return; // Cannot disable necessary
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl opacity-40 blur-[1px]"></div>
            
            <div className="relative bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl">
              {!isConfiguring ? (
                // Initial View
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-500/10 text-blue-400">
                      <Cookie className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-base mb-1">Tu privacidad nos importa</h4>
                      <p className="text-white/50 text-xs leading-relaxed">
                        Utilizamos cookies para personalizar el contenido y analizar nuestro tráfico. Puedes aceptar todas o configurar tus preferencias.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleAcceptAll}
                      className="w-full bg-white text-black font-bold py-2 px-4 rounded-xl text-xs hover:bg-blue-50 transition-colors shadow-lg shadow-white/5"
                    >
                      Aceptar todas
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsConfiguring(true)}
                        className="flex-1 bg-white/5 text-white font-medium border border-white/10 py-2 px-4 rounded-xl text-xs hover:bg-white/10 transition-colors"
                      >
                        Configurar
                      </button>
                      <button
                        onClick={() => handleSave()}
                        className="flex-1 bg-white/5 text-white/50 border border-white/5 py-2 px-4 rounded-xl text-xs hover:text-white transition-colors"
                      >
                        Rechazar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Configuration View
                <div className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-purple-400" />
                      <h4 className="text-white font-bold text-sm">Configuración</h4>
                    </div>
                    <button onClick={() => setIsConfiguring(false)} className="text-white/30 hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'necessary', label: 'Necesarias', desc: 'Indispensables para la web.', forced: true },
                      { id: 'analytics', label: 'Analíticas', desc: 'Para mejorar nuestra web.', forced: false },
                      { id: 'marketing', label: 'Marketing', desc: 'Publicidad personalizada.', forced: false },
                    ].map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex flex-col">
                          <span className="text-white text-xs font-bold">{item.label}</span>
                          <span className="text-white/40 text-[10px]">{item.desc}</span>
                        </div>
                        <button
                          disabled={item.forced}
                          onClick={() => toggleSetting(item.id as any)}
                          className={`
                            relative w-8 h-4 rounded-full transition-colors duration-200
                            ${settings[item.id as keyof typeof settings] ? 'bg-blue-500' : 'bg-white/10'}
                            ${item.forced ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                        >
                          <div className={`
                            absolute top-1 w-2 h-2 bg-white rounded-full transition-transform duration-200
                            ${settings[item.id as keyof typeof settings] ? 'translate-x-5' : 'translate-x-1'}
                          `} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSave()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-2 px-4 rounded-xl text-xs hover:opacity-90 transition-opacity shadow-lg"
                  >
                    Guardar preferencias
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
