import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[80vh] bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 text-white/70 text-sm md:text-base leading-relaxed space-y-6 custom-scrollbar">
              {content}
            </div>

            {/* Footer shadow fade */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const LegalContent = {
  AvisoLegal: () => (
    <>
      <section>
        <h3 className="text-white font-bold text-lg mb-2">1. Información General</h3>
        <p>
          En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se facilitan los siguientes datos:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li><strong>Titular:</strong> [NOMBRE O RAZÓN SOCIAL]</li>
          <li><strong>NIF/CIF:</strong> [NIF/CIF]</li>
          <li><strong>Domicilio:</strong> [DIRECCIÓN COMPLETA]</li>
          <li><strong>Email:</strong> contacto@nexumlabs.es</li>
          <li><strong>Actividad:</strong> Servicios de consultoría tecnológica y desarrollo de software.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-white font-bold text-lg mb-2">2. Propiedad Intelectual</h3>
        <p>
          Nexum Labs es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (logos, textos, imágenes, software, etc.). Todos los derechos reservados.
        </p>
      </section>

      <section>
        <h3 className="text-white font-bold text-lg mb-2">3. Exclusión de Responsabilidad</h3>
        <p>
          Nexum Labs no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos.
        </p>
      </section>
    </>
  ),

  Privacidad: () => (
    <>
      <section>
        <h3 className="text-white font-bold text-lg mb-2">1. Responsable del Tratamiento</h3>
        <p>
          Los datos personales recogidos a través de esta web serán tratados de conformidad con el RGPD (Reglamento General de Protección de Datos) y la LOPDGDD (Ley Orgánica de Protección de Datos y Garantía de Derechos Digitales).
        </p>
      </section>

      <section>
        <h3 className="text-white font-bold text-lg mb-2">2. Finalidad del Tratamiento</h3>
        <p>Tratamos sus datos para:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>Gestionar las solicitudes de información enviadas a través de los formularios.</li>
          <li>Prestar los servicios contratados vinculados a la automatización e IA.</li>
          <li>Enviar comunicaciones comerciales si existe consentimiento previo.</li>
        </ul>
      </section>

      <section>
        <h3 className="text-white font-bold text-lg mb-2">3. Derechos de los Usuarios</h3>
        <p>
          Cualquier persona tiene derecho a obtener confirmación sobre si estamos tratando sus datos. Los interesados tienen derecho a acceder, rectificar, suprimir sus datos, así como otros derechos detallados en la normativa vigente, enviando un email a contacto@nexumlabs.es.
        </p>
      </section>
    </>
  ),

  Cookies: () => (
    <>
      <section>
        <h3 className="text-white font-bold text-lg mb-2">¿Qué son las cookies?</h3>
        <p>
          Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo.
        </p>
      </section>

      <section>
        <h3 className="text-white font-bold text-lg mb-2">Tipos de cookies utilizadas</h3>
        <ul className="list-disc ml-6 mt-2 space-y-2">
          <li><strong>Técnicas:</strong> Necesarias para el funcionamiento de la web (sesión, seguridad).</li>
          <li><strong>Analíticas:</strong> Nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico de la utilización que hacen los usuarios de la web (Google Analytics).</li>
          <li><strong>Personalización:</strong> Permiten al usuario acceder al servicio con algunas características de carácter general predefinidas (idioma).</li>
        </ul>
      </section>

      <section>
        <h3 className="text-white font-bold text-lg mb-2">Cómo desactivar las cookies</h3>
        <p>
          El usuario podrá en cualquier momento elegir qué cookies desea que funcionen en este sitio web mediante la configuración del navegador: Chrome, Firefox, Safari o Edge.
        </p>
      </section>
    </>
  ),

  Terminos: () => (
    <>
      <section>
        <h3 className="text-white font-bold text-lg mb-2">1. Objeto y Ámbito de Aplicación</h3>
        <p>
          Las presentes condiciones generales rigen el acceso y uso del sitio web, así como la contratación de los servicios de consultoría tecnológica, desarrollo y automatización ofrecidos por Nexum Labs.
        </p>
      </section>

      <section>
        <h3 className="text-white font-bold text-lg mb-2">2. Condiciones de Servicio</h3>
        <p>
          La prestación de nuestros servicios estará sujeta a un acuerdo de colaboración específico o presupuesto aceptado, donde se detallarán alcances, plazos, condiciones de entrega y costes asociados a cada proyecto.
        </p>
      </section>

      <section>
        <h3 className="text-white font-bold text-lg mb-2">3. Obligaciones del Cliente</h3>
        <p>
          El cliente se compromete a facilitar toda la información y accesos necesarios para el correcto desarrollo de los servicios contratados y asume la responsabilidad sobre la licitud de los datos proporcionados a nuestros sistemas.
        </p>
      </section>
    </>
  ),
};

export default LegalModal;
