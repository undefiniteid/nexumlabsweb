"use client"
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

const PortfolioHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { href: "#que-hacemos", text: "Qué hacemos" },
    { href: "#como-lo-hacemos", text: "Cómo lo hacemos" },
    { href: "#stack", text: "Nuestro Stack" },
    { href: "#sobre-nosotros", text: "Sobre Nosotros" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ease-out ${
      isScrolled 
        ? 'bg-black/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/10' 
        : 'bg-transparent border-b border-transparent pt-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo and Name */}
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2 group relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                {/* Fluid Logo Image */}
                <img src="/logo-x.png" alt="Nexum Labs Logo" className="w-full h-full object-contain" onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).nextSibling && ((e.target as HTMLImageElement).nextSibling as HTMLElement).classList.remove('hidden');
                }} />
                <span className="hidden text-white font-black text-2xl">N</span>
              </div>
              <span className="font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-blue-200 transition-colors">
                Nexum Labs
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.text}
                href={link.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors relative group"
              >
                {link.text}
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-purple-500 blur-[4px] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="relative group p-[1px] rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              {/* Animated Aurora Border */}
              <div className="absolute inset-0 bg-[length:200%_200%] animate-aurora bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-80"></div>
              
              <div className="relative bg-[#050505] rounded-full px-6 py-2.5 flex items-center space-x-2 transition-colors group-hover:bg-[#050505]/80">
                <span className="text-sm font-bold text-white tracking-wide">Hablemos</span>
                <ArrowRight className="h-4 w-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100 border-t border-white/10' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-white/70 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
                >
                  {link.text}
                </a>
              ))}
              <div className="pt-4 mt-2 px-4">
                <button className="relative group w-full p-[1px] rounded-xl overflow-hidden active:scale-95 transition-transform">
                  <div className="absolute inset-0 bg-[length:200%_200%] animate-aurora bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-80"></div>
                  <div className="relative bg-[#0a0a0a] rounded-[11px] px-4 py-3 flex justify-center items-center space-x-2">
                    <span className="text-sm font-bold text-white">Hablemos</span>
                    <ArrowRight className="h-4 w-4 text-blue-400" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PortfolioHeader;
