import LoveReact from "./love-react";

const XIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = ({ onLegalClick }: { onLegalClick: (type: "AvisoLegal" | "Privacidad" | "Cookies") => void }) => {
  return (
    <footer className="relative bg-black text-white py-16 px-6 font-sans border-t border-white/10 z-20">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        {/* Brand & Description */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src="/logo-x.png" alt="Nexum Labs" className="w-full h-full object-contain" onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextSibling && ((e.target as HTMLImageElement).nextSibling as HTMLElement).classList.remove('hidden');
                }} />
              <span className="hidden text-white font-black text-2xl">N</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Nexum Labs
            </h3>
          </div>
          <p className="text-white/50 text-sm leading-relaxed max-w-sm">
            Diseñamos infraestructuras tecnológicas para negocios. Automatizaciones robustas y soluciones de inteligencia artificial sin atajos.
          </p>          <div className="flex space-x-4 pt-2">
            {[
              { icon: <XIcon size={18} />, title: "X (Twitter)", href: "#" },
              { 
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                ), 
                title: "Instagram", 
                href: "#" 
              },
              { 
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                ), 
                title: "Facebook", 
                href: "#" 
              }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href} 
                className="relative group p-[1px] rounded-full overflow-hidden transition-all hover:scale-110 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]" 
                title={social.title}
              >
                {/* Aurora Background Layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Inner Black Circle (creates the ring effect) */}
                <div className="relative bg-[#0a0a0a] rounded-full p-2.5 flex items-center justify-center text-white/50 group-hover:text-white transition-colors duration-300">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
          <p className="text-white/20 text-[10px] uppercase tracking-widest pt-4">
            &copy; {new Date().getFullYear()} Nexum Labs. Todos los derechos reservados.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/40">
            Navegación
          </h3>
          <ul className="space-y-4">
            <li>
              <a href="#que-hacemos" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Qué hacemos
              </a>
            </li>
            <li>
              <a href="#como-lo-hacemos" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Cómo lo hacemos
              </a>
            </li>
            <li>
              <a href="#stack" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Nuestro Stack
              </a>
            </li>
            <li>
              <a href="#sobre-nosotros" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Sobre Nosotros
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/40">
            Legales
          </h3>
          <ul className="space-y-4">
            <li>
              <button onClick={() => onLegalClick("AvisoLegal")} className="text-sm text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
                Aviso Legal
              </button>
            </li>
            <li>
              <button onClick={() => onLegalClick("Privacidad")} className="text-sm text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
                Política de Privacidad
              </button>
            </li>
            <li>
              <button onClick={() => onLegalClick("Cookies")} className="text-sm text-white/60 hover:text-white transition-colors duration-300 cursor-pointer">
                Cookies
              </button>
            </li>
            <li>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Términos de Servicio
              </a>
            </li>
          </ul>
        </div>

        {/* Contact CTA */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/40">
            ¿Hablamos?
          </h3>
          <p className="text-white/50 text-sm">
            Escríbenos directamente o agenda una asesoría técnica.
          </p>
          <a href="mailto:contacto@nexumlabs.es" className="inline-block text-white font-medium hover:text-blue-400 transition-colors">
            contacto@nexumlabs.es
          </a>
          <div className="pt-2">
            <button className="relative group inline-flex items-center justify-center px-8 py-3.5 font-bold text-white rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] cursor-pointer">
              {/* Vibrant Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-cyan-400 transition-all duration-500"></div>
              
              {/* Inner Glow/Border Effect */}
              <div className="absolute inset-0 border border-white/40 rounded-full shadow-inner opacity-60 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Text */}
              <span className="relative z-10 tracking-[0.05em] text-sm font-extrabold drop-shadow-sm">
                AGENDAR UNA DEMO
              </span>
              
              {/* Shimmer Effect */}
              <div className="absolute top-0 -inset-x-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]"></div>
            </button>
          </div>
        </div>

      </div>

      {/* Hearts Row - Cada uno con un color único */}
      <div className="flex items-center justify-center pt-16 pb-0 gap-3 opacity-40 hover:opacity-100 transition-opacity duration-700">
        <LoveReact size={20} color="#06b6d4" /> {/* Cian */}
        <LoveReact size={20} color="#a855f7" /> {/* Púrpura */}
        <LoveReact size={20} color="#3b82f6" /> {/* Azul */}
        <LoveReact size={20} color="#10b981" /> {/* Esmeralda */}
        <LoveReact size={20} color="#ec4899" /> {/* Rosa */}
      </div>
    </footer>
  );
};

export default Footer;
