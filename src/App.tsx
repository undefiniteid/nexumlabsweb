import React from "react";
import { motion } from "framer-motion";
import { Settings, BarChart3, AlertTriangle, Blocks, Code2, Database, Zap } from "lucide-react";
import PortfolioHeader from "../components/portfolio-header";
import ShimmerButton from "../components/shimmer-button";
import OrbitingSkills from "../components/orbiting-skills";
import CursorGlow from "../components/cursor-glow";
import { LinearLoop } from "../components/marquee-text";
import Starfield from "../components/starfield";
import Footer from "../components/footer";
import { AuroraText } from "../components/aurora-text";
import { TextReveal } from "../components/text-reveal";
import Testimonial from "../components/testimonial";
import GradientAccordion from "../components/gradient-accordion";
import MorphingView from "../components/morphing-text";
import NeonParticles from "../components/neon-particles";
import NeonThreads from "../components/neon-threads";
import { Vortex } from "../components/ui/vortex";
import TextHighlighter from "../components/text-highlighter";
import { FlipWords } from "../components/ui/flip-words";
import LegalModal, { LegalContent } from "../components/legal-modal";
import CookieConsent from "../components/cookie-consent";

function App() {
  const modelRef = React.useRef<any>(null);
  const [legalModal, setLegalModal] = React.useState<{ isOpen: boolean; title: string; content: React.ReactNode }>({
    isOpen: false,
    title: "",
    content: null,
  });

  const openLegal = (type: "AvisoLegal" | "Privacidad" | "Cookies") => {
    const titles = {
      AvisoLegal: "Aviso Legal",
      Privacidad: "Política de Privacidad",
      Cookies: "Política de Cookies",
    };
    setLegalModal({
      isOpen: true,
      title: titles[type],
      content: React.createElement(LegalContent[type]),
    });
  };

  React.useEffect(() => {
    let isDragging = false;
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!modelRef.current || isDragging) return;

      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (!modelRef.current) return;
        const xPercent = (e.clientX / window.innerWidth) - 0.5;
        const yPercent = (e.clientY / window.innerHeight) - 0.5;
        const orbitX = 90 + (xPercent * 30);
        const orbitY = 85 + (yPercent * 20);
        modelRef.current.cameraOrbit = `${orbitX}deg ${orbitY}deg auto`;
      });
    };

    const handlePointerDown = () => { isDragging = true; };
    const handlePointerUp = () => { isDragging = false; };
    const el = modelRef.current;
    window.addEventListener("mousemove", handleMouseMove);
    if (el) {
      el.addEventListener("pointerdown", handlePointerDown);
      el.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
      if (el) {
        el.removeEventListener("pointerdown", handlePointerDown);
        el.removeEventListener("pointerup", handlePointerUp);
      }
    };
  }, []);
  return (
    <div className="min-h-screen w-full relative bg-black text-white selection:bg-purple-500/30 overflow-hidden font-sans">
      {/* Indigo Cosmos Background with Top Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Moderately dispersed animated starfield */}
      <Starfield />

      <PortfolioHeader />

      <CursorGlow />

      {/* 1. Hero Section */}
      <section id="que-hacemos" className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-start text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            El futuro del trabajo es <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">automatizado</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 font-light leading-relaxed max-w-lg">
            En Nexum Labs diseñamos integraciones de Inteligencia Artificial que{" "}
            <TextHighlighter highlightColor="rgba(59, 130, 246, 0.4)" className="text-white/90">automatizan tareas</TextHighlighter>,{" "}
            <TextHighlighter highlightColor="rgba(168, 85, 247, 0.4)" transition={{ delay: 0.6 }} className="text-white/90">optimizan tu tiempo</TextHighlighter> y{" "}
            <TextHighlighter highlightColor="rgba(6, 182, 212, 0.4)" transition={{ delay: 1.0 }} className="text-white/90">potencian tu escalabilidad</TextHighlighter>.
            Soluciones a la medida, implementación ágil. Con resultados.
          </p>
          <a href="https://calendly.com/alfonsoalegregarcia/llamada" target="_blank" rel="noopener noreferrer" className="inline-block cursor-pointer mt-2">
            <ShimmerButton className="text-base md:text-lg font-semibold text-white px-6 md:px-10 py-3 md:py-4 tracking-wide w-full md:w-auto">
              Agenda una demo
            </ShimmerButton>
          </a>
        </motion.div>

        {/* Robot / Image placeholder area */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center h-[400px] md:h-[500px] relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Brillo de fondo para integrar el modelo sin formar un marco */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {/* Componente estándar de Google para 3D (No usa React-Three-Fiber, es nativo) */}
            {/* @ts-ignore */}
            <model-viewer
              ref={modelRef}
              src={`${import.meta.env.BASE_URL}robot.glb`}
              alt="Nexum Labs Robot"
              autoplay
              camera-controls
              disable-zoom
              interaction-prompt="none"
              shadow-intensity="1.5"
              exposure="1"
              camera-orbit="90deg 85deg 105%"
              style={{ width: '100%', height: '100%', background: 'transparent', outline: 'none' }}
            />
          </div>
        </motion.div>
      </section>

      {/* 2. Interactive Marquee Banner */}
      <div className="relative z-10 w-full h-16 md:h-24 overflow-hidden flex items-center border-y border-white/5 bg-transparent my-12">
        <LinearLoop
          marqueeText="LA AUTOMATIZACIÓN DEL FUTURO • LA SOLUCIÓN DEL PRESENTE • "
          speed={0.8}
          direction="left"
          interactive={true}
          className="fill-blue-400/60 transition-colors duration-500 hover:fill-purple-400/80 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]"
        />
      </div>

      {/* 3. Pain Points Module */}
      <section id="como-lo-hacemos" className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          <span>¿Cuántas horas pierde tu equipo con tareas que podrían </span>
          <FlipWords
            words={["automatizarse?", "simplificarse?", "delegarse?", "mejorarse?"]}
            duration={3000}
            className="text-cyan-400"
          />
        </h2>
        <p className="text-lg text-white/50 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
          Tus competidores ya tienen sistemas que trabajan solos — bots personalizados, flujos automatizados y código a medida que ejecutan procesos sin que nadie tenga que mover un dedo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Card 1 */}
          <div className="relative rounded-2xl p-[2px] group">
            {/* Gradient Border Glow (Non-uniform) */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 via-blue-500/20 to-transparent rounded-2xl opacity-70"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/60 via-transparent to-transparent rounded-2xl blur-xl opacity-60"></div>

            {/* Card Content */}
            <div className="relative h-full bg-[#0a0a0a] rounded-2xl p-8 backdrop-blur-md hover:bg-blue-900/10 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-6">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tiempo perdido</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Tareas de tu negocio o de ventas rutinarias que consumen tiempo y no generan valor real.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative rounded-2xl p-[2px] group">
            {/* Gradient Border Glow (Non-uniform) */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/80 via-red-500/20 to-transparent rounded-2xl opacity-70"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/60 via-transparent to-transparent rounded-2xl blur-xl opacity-60"></div>

            <div className="relative h-full bg-[#0a0a0a] rounded-2xl p-8 backdrop-blur-md hover:bg-red-900/10 transition-colors">
              <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Errores humanos</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Los procesos manuales fallan. Misión crítica comprometida sin validación estricta y automática.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative rounded-2xl p-[2px] group">
            {/* Gradient Border Glow (Non-uniform) */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/80 via-purple-500/20 to-transparent rounded-2xl opacity-70"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/60 via-transparent to-transparent rounded-2xl blur-xl opacity-60"></div>

            <div className="relative h-full bg-[#0a0a0a] rounded-2xl p-8 backdrop-blur-md hover:bg-purple-900/10 transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sin escalabilidad</h3>
              <p className="text-white/50 text-sm leading-relaxed">
                Crecen las dudas, tu cuota de clientes continua rota. Hay un tapón muy alto por el esfuerzo manual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Planet Surface Glow & CTA */}
      <section className="relative z-10 w-full bg-transparent pt-32 pb-24 text-center overflow-hidden">
        {/* Curved Planet Surface Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] md:w-[130%] max-w-[2500px] h-[800px] rounded-[100%] pointer-events-none"
          style={{
            borderTop: '2px solid rgba(96, 165, 250, 0.5)',
            background: 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
            boxShadow: '0 -20px 50px rgba(59, 130, 246, 0.2), inset 0 20px 50px rgba(59, 130, 246, 0.1)',
            maskImage: 'linear-gradient(to right, transparent 5%, black 40%, black 60%, transparent 95%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 5%, black 30%, black 70%, transparent 95%)',
          }}>
          {/* Intense central glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-blue-400/50 blur-[12px] rounded-[100%]"></div>
          <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 w-1/6 h-[2px] bg-white blur-[2px] rounded-[100%]"></div>
        </div>

        <p className="text-2xl md:text-3xl font-medium max-w-4xl mx-auto leading-relaxed px-6 mb-10 mt-8 text-white/90">
          En Nexum Labs construimos esa infraestructura para tu negocio. Sin atajos. Con resultados.
        </p>
        <br />

        <a href="https://calendly.com/alfonsoalegregarcia/llamada" target="_blank" rel="noopener noreferrer" className="relative group inline-flex items-center justify-center px-10 py-4 font-bold text-white bg-blue-950/30 border border-blue-500/50 rounded-full overflow-hidden transition-all hover:scale-105 hover:bg-blue-900/40 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] backdrop-blur-md">
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* Text */}
          <span className="relative z-10 tracking-widest uppercase text-sm">Contáctanos</span>
          {/* Hover highlight line at top */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
        </a>
      </section>

      {/* 5. Our Stack Section (Orbiting Skills on Left, Text on Right) */}
      <section id="stack" className="relative z-10 border-t border-white/5 bg-black/50 py-32 overflow-hidden">
        {/* Neon Threads Background */}
        <div className="absolute inset-0 z-0 opacity-40"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
          }}>
          <NeonThreads />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-stretch justify-between pointer-events-none gap-16">

          {/* Left: Interactive Orbits */}
          <div className="relative w-full lg:w-1/2 flex pointer-events-auto rounded-[40px] p-[2px] group">
            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-600 rounded-[40px] blur-[20px] opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
            {/* Gradient border */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-600 rounded-[40px] opacity-80"></div>

            {/* Content Container */}
            <div className="relative w-full h-full flex justify-center bg-[#050505] rounded-[38px] overflow-hidden py-10 z-10">
              {/* Subtle texture/overlay */}
              <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none"></div>
              <OrbitingSkills />
            </div>
          </div>

          {/* Right: Text Description */}
          <div className="w-full lg:w-1/2 text-left">
            <div className="relative inline-flex mb-8 group cursor-default">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-blue-500/30 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative inline-flex items-center gap-2 border border-white/20 rounded-full px-5 py-1.5 bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_5px_rgba(96,165,250,0.8)]"></div>
                <span className="text-white/90 text-[11px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Nuestro Stack</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-10 leading-tight">
              Tecnología de <AuroraText className="font-bold pb-1" speed={1.5} colors={["#38BDF8", "#3B82F6", "#EC4899"]}>primer nivel</AuroraText>,<br />soluciones a medida.
            </h2>
            <TextReveal
              className="text-white/60 text-lg font-light leading-relaxed mb-10"
              text="No usamos plantillas ni atajos. Cada solución que construimos en Nexum Labs está diseñada con el stack tecnológico adecuado para cada espacio: desde integraciones con IA hasta bots y agentes autónomos en producción."
            />

            {/* Feature Cards Grid */}
            <div className="relative w-full rounded-2xl p-[2px] group pointer-events-auto mt-2">
              {/* Gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-600 rounded-2xl blur-[20px] opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              {/* Gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-600 rounded-2xl opacity-80"></div>

              <div className="relative w-full p-6 bg-[#0a0a0a] rounded-[14px] grid grid-cols-1 sm:grid-cols-2 gap-4 z-10">
                {/* Box 1 */}
                <div className="relative isolate p-5 border border-white/5 bg-[#0e0e11] rounded-xl hover:bg-white/[0.04] transition-colors group/box overflow-hidden">
                  <Code2 className="relative z-10 w-5 h-5 text-blue-400 mb-3 opacity-70 group-hover/box:opacity-100" />
                  <h4 className="relative z-10 text-xs text-white/40 font-bold tracking-widest uppercase mb-1">Desarrollo en general</h4>
                  <p className="relative z-10 text-sm font-medium">.NET, JS, TS,<br />React, Node</p>
                </div>
                {/* Box 2 */}
                <div className="relative isolate p-5 border border-white/5 bg-[#0e0e11] rounded-xl hover:bg-white/[0.04] transition-colors group/box overflow-hidden">
                  <Blocks className="relative z-10 w-5 h-5 text-purple-400 mb-3 opacity-70 group-hover/box:opacity-100" />
                  <h4 className="relative z-10 text-xs text-white/40 font-bold tracking-widest uppercase mb-1">Inteligencia Artificial</h4>
                  <p className="relative z-10 text-sm font-medium">OpenAI,<br />Anthropic, Mistral</p>
                </div>
                {/* Box 3 */}
                <div className="relative isolate p-5 border border-white/5 bg-[#0e0e11] rounded-xl hover:bg-white/[0.04] transition-colors group/box overflow-hidden">
                  <Zap className="relative z-10 w-5 h-5 text-cyan-400 mb-3 opacity-70 group-hover/box:opacity-100" />
                  <h4 className="relative z-10 text-xs text-white/40 font-bold tracking-widest uppercase mb-1">Automatización</h4>
                  <p className="relative z-10 text-sm font-medium">Make, n8n, Zapier</p>
                </div>
                {/* Box 4 */}
                <div className="relative isolate p-5 border border-white/5 bg-[#0e0e11] rounded-xl hover:bg-white/[0.04] transition-colors group/box overflow-hidden">
                  <Database className="relative z-10 w-5 h-5 text-emerald-400 mb-3 opacity-70 group-hover/box:opacity-100" />
                  <h4 className="relative z-10 text-xs text-white/40 font-bold tracking-widest uppercase mb-1">Bases de Datos</h4>
                  <p className="relative z-10 text-sm font-medium">Supabase, PostgreSQL,<br />MongoDB</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Sobre Nosotros Section */}
      <section id="sobre-nosotros" className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center">
        <div className="relative inline-flex mb-8 group cursor-default">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-2 bg-[#0a0a0a]/80 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_5px_rgba(96,165,250,0.8)]"></div>
            <span className="text-white/90 text-[11px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Sobre Nosotros</span>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 text-center">
          Tecnología y estrategia - Una misma{" "}
          <span className="relative inline-block">
            visión
            <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)] rounded-full"></span>
          </span>
        </h2>

        <p className="text-base md:text-lg text-white/50 text-center max-w-3xl mb-20 leading-relaxed font-light px-4">
          Nexum Labs nació de la convicción de que cualquier negocio, sin importar su tamaño, merece acceder a la tecnología que antes solo tenían las grandes empresas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mx-auto">
          {/* Card Alfonso */}
          <div className="relative p-[1px] rounded-[2rem] group overflow-hidden h-full">
            {/* Animated Border */}
            <div className="absolute inset-0 bg-[length:200%_200%] animate-aurora opacity-40 group-hover:opacity-70 transition-opacity duration-700 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
            <div className="bg-[#0a0a0a] rounded-[31px] h-full p-8 md:p-10 lg:p-12 transition-colors relative isolate overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] -z-10 transition-opacity duration-700"></div>

              <div className="w-24 h-24 rounded-full border border-purple-500/30 overflow-hidden mb-8 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <img
                  src={`${import.meta.env.BASE_URL}foto-alfonso.png`}
                  alt="Alfonso - Cofundador de Nexum Labs"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <h4 className="text-purple-500 text-[10px] font-bold tracking-[0.15em] uppercase mb-2">Cofundador</h4>
              <h3 className="text-3xl font-bold text-white mb-2">Alfonso</h3>
              <p className="text-white/40 text-sm mb-8 font-light">Estrategia, Diseño & Negocio</p>

              <div className="w-12 h-[1px] bg-white/10 mb-8"></div>

              <p className="text-white/50 leading-relaxed font-light text-base">
                Soy el puente entre la tecnología y el cliente. Me encargo de entender cada negocio, diseñar la solución adecuada y asegurarme de que el resultado final tiene tanto fondo como forma.
              </p>
            </div>
          </div>

          {/* Card Edgar */}
          <div className="relative p-[1px] rounded-[2rem] group overflow-hidden h-full">
            {/* Animated Border */}
            <div className="absolute inset-0 bg-[length:200%_200%] animate-aurora opacity-40 group-hover:opacity-70 transition-opacity duration-700 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"></div>
            <div className="bg-[#0a0a0a] rounded-[31px] h-full p-8 md:p-10 lg:p-12 transition-colors relative isolate overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] -z-10 transition-opacity duration-700"></div>

              <div className="w-24 h-24 rounded-full border border-emerald-500/30 overflow-hidden mb-8 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <img
                  src={`${import.meta.env.BASE_URL}edgar-foto.png`}
                  alt="Edgar - Cofundador de Nexum Labs"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
              </div>

              <h4 className="text-emerald-500 text-[10px] font-bold tracking-[0.15em] uppercase mb-2">Cofundador</h4>
              <h3 className="text-3xl font-bold text-white mb-2">Edgar</h3>
              <p className="text-white/40 text-sm mb-8 font-light">Desarrollo & Automatización</p>

              <div className="w-12 h-[1px] bg-white/10 mb-8"></div>

              <p className="text-white/50 leading-relaxed font-light text-base">
                Convierto ideas en sistemas que funcionan. Desde bots complejos hasta integraciones a medida — si se puede automatizar, lo construyo con el código y las herramientas adecuadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Upcoming Sections (Placeholders as per Figma mock) */}
      <section className="relative z-10 w-full py-8 text-center flex flex-col gap-0 px-4">
        {/* Interactive Morphing Text Section */}
        <div className="relative w-full py-6"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)'
          }}>
          <NeonParticles />
          <MorphingView />
        </div>

        {/* Testimonials */}
        <div className="mb-0">
          <Testimonial />
        </div>

        {/* FAQ Accordion — wrapped in Vortex particle background */}
        <div className="relative w-full rounded-2xl mt-8">
          <Vortex
            backgroundColor="transparent"
            particleCount={600}
            baseHue={220}
            rangeHue={80}
            rangeY={200}
            baseSpeed={0.3}
            rangeSpeed={1.2}
            baseRadius={0.8}
            rangeRadius={1.5}
            className="flex flex-col items-center justify-center w-full py-0"
          >
            <GradientAccordion />
          </Vortex>
        </div>
      </section>

      {/* Footer Area */}
      <Footer onLegalClick={openLegal} />

      {/* Legal Modal Component */}
      <LegalModal
        isOpen={legalModal.isOpen}
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        title={legalModal.title}
        content={legalModal.content}
      />

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}

export default App;
