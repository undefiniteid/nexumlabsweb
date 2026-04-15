"use client"
import React from 'react';
import { ShinyText } from './shiny-text';

function Testimonial() {
  return (
    <div className="relative z-10 font-sans flex flex-col items-center pt-24 pb-0 px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white">
      {/* Main Heading */}
      <h2 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight mb-6 text-center max-w-4xl leading-tight">
        <ShinyText
          text="Resultados reales. Respaldados por nuestros clientes."
          speed={3}
          className="text-white"
        />
      </h2>

      {/* Subheading */}
      <p className="text-base sm:text-lg text-white/50 text-center max-w-3xl mb-16 font-light leading-relaxed">
        Diseñamos soluciones a medida que permiten a empresas y fundadores innovar más rápido, automatizar procesos pesados y operar sin fricciones en el día a día.
      </p>

      {/* Testimonial Cards Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-6xl text-left pointer-events-auto">
        {/* Large Left Card */}
        <div className="relative p-[1px] rounded-2xl group overflow-hidden h-full">
          {/* Animated Border */}
          <div className="absolute inset-0 bg-[length:200%_200%] animate-aurora opacity-40 group-hover:opacity-80 transition-opacity duration-700 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
          <div className="bg-[#0a0a0a] h-full p-8 rounded-[15px] flex flex-col justify-between backdrop-blur-sm shadow-md transition-colors relative isolate">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] -z-10"></div>
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 10.99C22 5.47 17.52 1 12 1S2 5.47 2 10.99C2 16.51 6.48 21 12 21S22 16.51 22 10.99ZM12 19C7.58 19 4 15.42 4 11C4 6.58 7.58 3 12 3S20 6.58 20 11C20 15.42 16.42 19 12 19ZM12 5C9.24 5 7 7.24 7 10C7 12.76 9.24 15 12 15C14.76 15 17 12.76 17 10C17 7.24 14.76 5 12 5ZM12 13C10.34 13 9 11.66 9 10C9 8.34 10.34 7 12 7C13.66 7 15 8.34 15 10C15 11.66 13.66 13 12 13Z" />
                </svg>
              </div>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed mb-8 font-light">
                &quot;Trabajar con Nexum Labs ha acelerado dramáticamente nuestro ciclo. Sus integraciones automatizadas y herramientas personalizadas nos han permitido escalar sin aumentar la plantilla. Es un antes y un después para nuestro negocio.&quot;
              </p>
            </div>
            <div className="flex items-center">
              <img
                src="/foto-guillermo-publidental.png"
                alt="Guillermo P."
                className="w-12 h-12 rounded-full object-cover mr-4"
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "https://placehold.co/48x48/1e293b/FFFFFF?text=GP" }}
              />
              <div>
                <p className="font-semibold text-white">Guillermo P.</p>
                <p className="text-sm text-white/50">Director de publidental.es</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column for Testimonials */}
        <div className="flex flex-col gap-4">
          {/* Large Right Card */}
          <div className="relative p-[1px] rounded-2xl group overflow-hidden h-full">
            {/* Animated Border */}
            <div className="absolute inset-0 bg-[length:200%_200%] animate-aurora opacity-40 group-hover:opacity-80 transition-opacity duration-700 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
            <div className="bg-[#0a0a0a] h-full p-8 rounded-[15px] flex flex-col justify-between backdrop-blur-sm shadow-md transition-colors relative isolate">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] -z-10"></div>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed mb-8 font-light">
                &quot;El presupuestador interactivo que desarrollaron para nosotros nos ha ahorrado muchísimo tiempo. Ahora puedo crear y enviar presupuestos personalizados de forma automática: solo selecciono las opciones, pongo el email y el cliente lo recibe al instante. Una herramienta brutal para agilizar nuestras ventas.&quot;
              </p>
              <div className="flex items-center">
                <img
                  src="/foto-ventanas-banuls.png"
                  alt="Alejandro Bañuls"
                  className="w-12 h-12 rounded-full object-contain bg-white p-1 mr-4"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "https://placehold.co/48x48/1e293b/FFFFFF?text=AB" }}
                />
                <div>
                  <p className="font-semibold text-white">Alejandro Bañuls</p>
                  <p className="text-sm text-white/50">Gerente de ventanasbañuls.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Small Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Small Card 1 */}
            <div className="relative p-[1px] rounded-2xl group overflow-hidden h-full">
              {/* Animated Border */}
              <div className="absolute inset-0 bg-[length:200%_200%] animate-aurora opacity-40 group-hover:opacity-80 transition-opacity duration-700 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"></div>
              <div className="bg-[#0a0a0a] h-full p-6 rounded-[15px] flex flex-col justify-between backdrop-blur-sm shadow-md transition-colors relative isolate">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-[40px] -z-10"></div>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 font-light">
                  &quot;Los flujos y automatizaciones que implementaron son de primer nivel. Nos han ahorrado cientos de horas manuales.&quot;
                </p>
                <div className="flex items-center">
                  <img
                    src="/foto-tadeo-fundadores.png"
                    alt="Tadeo Casas"
                    className="w-10 h-10 rounded-full object-cover mr-3"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "https://placehold.co/40x40/1e293b/FFFFFF?text=TC" }}
                  />
                  <div>
                    <p className="font-semibold text-white text-sm">Tadeo Casas</p>
                    <p className="text-xs text-white/50">Director de esfundadores.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="relative p-[1px] rounded-2xl group overflow-hidden h-full">
              {/* Animated Border */}
              <div className="absolute inset-0 bg-[length:200%_200%] animate-aurora opacity-40 group-hover:opacity-80 transition-opacity duration-700 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
              <div className="bg-[#0a0a0a] h-full p-6 rounded-[15px] flex flex-col justify-between backdrop-blur-sm shadow-md transition-colors relative isolate">
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 rounded-full blur-[40px] -z-10"></div>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6 font-light">
                  &quot;Calidad excepcional y atención al detalle extrema. Llevaron nuestra operativa a otro nivel.&quot;
                </p>
                <div className="flex items-center">
                  <img
                    src="/foto-muebles-yuste.png"
                    alt="Alberto Yuste"
                    className="w-10 h-10 rounded-full object-cover mr-3"
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = "https://placehold.co/40x40/1e293b/FFFFFF?text=AY" }}
                  />
                  <div>
                    <p className="font-semibold text-white text-sm">Alberto Yuste</p>
                    <p className="text-xs text-white/50">Fundador de Muebles Yuste</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
