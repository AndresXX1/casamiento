"use client"

import { Heart, Calendar, MapPin, Music, Utensils, Shirt, CreditCard, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function WeddingInvitation() {
  const [visibleSections, setVisibleSections] = useState({})
  const sectionRefs = useRef({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute("data-section")
            if (key) {
              setVisibleSections((prev) => ({ ...prev, [key]: true }))
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: "50px" },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const getAnimationStyle = (sectionKey, variant) => {
    const isVisible = visibleSections[sectionKey]
    
    const variants = {
      fadeUp: {
        hidden: { opacity: 0, transform: 'translateY(40px)' },
        visible: { opacity: 1, transform: 'translateY(0)' }
      },
      slideLeft: {
        hidden: { opacity: 0, transform: 'translateX(-60px)' },
        visible: { opacity: 1, transform: 'translateX(0)' }
      },
      slideRight: {
        hidden: { opacity: 0, transform: 'translateX(60px)' },
        visible: { opacity: 1, transform: 'translateX(0)' }
      },
      scale: {
        hidden: { opacity: 0, transform: 'scale(0.8)' },
        visible: { opacity: 1, transform: 'scale(1)' }
      }
    }

    return variants[variant][isVisible ? 'visible' : 'hidden']
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-amber-50 to-amber-900 py-8 px-4 overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out;
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl animate-float"
        ></div>
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div
          ref={(el) => (sectionRefs.current["header"] = el)}
          data-section="header"
          style={{
            ...getAnimationStyle("header", "fadeUp"),
            transition: 'all 0.8s ease-out'
          }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
        >
          <div className="animate-bounce mb-4">
            <Heart className="w-12 h-12 mx-auto text-rose-400 animate-pulse" />
          </div>
          <h1 className="text-5xl font-serif text-gray-800 mb-2 bg-gradient-to-r from-amber-700 to-rose-500 bg-clip-text text-transparent">
            Luz & Guillermo
          </h1>
          <p className="text-xl text-gray-600 font-light">Se casan</p>
        </div>

        {/* Photo/Video Space */}
        <div
          ref={(el) => (sectionRefs.current["photo"] = el)}
          data-section="photo"
          style={{
            ...getAnimationStyle("photo", "scale"),
            transition: 'all 0.8s ease-out'
          }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
        >
          <div className="aspect-video bg-gradient-to-br from-amber-50 to-rose-100 rounded-2xl flex items-center justify-center overflow-hidden group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300/0 via-white/20 to-rose-300/0 group-hover:animate-shimmer"></div>
            <img
              src="/luzGuille.jpg"
              alt="Foto de la pareja"
              className="w-full h-full object-cover rounded-lg object-top"
            />
          </div>
        </div>

        {/* Event Details */}
        <div
          ref={(el) => (sectionRefs.current["details"] = el)}
          data-section="details"
          style={{
            ...getAnimationStyle("details", "slideLeft"),
            transition: 'all 0.8s ease-out'
          }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
        >
          <div className="flex items-center gap-3 mb-6 group">
            <Calendar className="w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-3xl font-serif text-gray-800">Detalles del Evento</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg leading-relaxed hover:text-gray-900 transition-colors">
              En un momento muy especial, queremos compartir con ustedes la celebración de nuestro matrimonio.
            </p>
            <p className="text-lg leading-relaxed hover:text-gray-900 transition-colors">
              La ceremonia civil se realizará en el mismo lugar del festejo, donde el juez nos acompañará para firmar el
              acta matrimonial.
            </p>
          </div>
        </div>

        {/* Location */}
      <div
  ref={(el) => (sectionRefs.current["location"] = el)}
  data-section="location"
  style={{
    ...getAnimationStyle("location", "slideRight"),
    transition: 'all 0.8s ease-out'
  }}
  className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
>
  <div className="flex items-center gap-3 mb-6 group">
    <MapPin className="w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
    <h2 className="text-3xl font-serif text-gray-800">Ubicación</h2>
  </div>
  <h3 className="text-2xl font-semibold text-gray-800 mb-4">La Cantina de Don Carlos</h3>

  {/* ✅ Contenedor corregido */}
  <div className="rounded-2xl overflow-hidden mb-4 border border-amber-200 shadow-inner">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.857447892842!2d-64.19039492347654!3d-31.388406874263397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432985c3a756061%3A0x53327df8111f70b6!2sCantina%20Don%20Carlo!5e0!3m2!1ses!2sar!4v1730841234567!5m2!1ses!2sar"
      className="w-full h-80 border-0"
      allowFullScreen=""
      sandbox="allow-scripts allow-same-origin allow-popups"
      loading="eager"
      style={{
        pointerEvents: "auto",
        transform: "none",
        WebkitTransform: "none",
        borderRadius: "0.75rem",
      }}
      title="Mapa de La Cantina de Don Carlos"
    ></iframe>
  </div>

  <a
    href="https://www.google.com/maps/place/Cantina+Don+Carlo/@-31.3889409,-64.1898024,16.22z"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block w-full bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
  >
    📍 Abrir en Google Maps
  </a>
</div>


        {/* Celebration */}
        <div
          ref={(el) => (sectionRefs.current["celebration"] = el)}
          data-section="celebration"
          style={{
            ...getAnimationStyle("celebration", "fadeUp"),
            transition: 'all 0.8s ease-out'
          }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
        >
          <div className="flex items-center gap-3 mb-6 group">
            <Music className="w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-3xl font-serif text-gray-800">La Celebración</h2>
          </div>

          <div className="space-y-6">
            <div
              style={{
                opacity: visibleSections["celebration"] ? 1 : 0,
                transform: visibleSections["celebration"] ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.6s ease-out 0.2s'
              }}
              className="flex items-start gap-4 group p-4 rounded-xl hover:bg-rose-50/50 transition-colors duration-300"
            >
              <Music className="w-6 h-6 text-rose-400 mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Show en vivo</h3>
                <p className="text-gray-600">Música y entretenimiento durante toda la noche</p>
              </div>
            </div>

            <div
              style={{
                opacity: visibleSections["celebration"] ? 1 : 0,
                transform: visibleSections["celebration"] ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.6s ease-out 0.4s'
              }}
              className="flex items-start gap-4 group p-4 rounded-xl hover:bg-rose-50/50 transition-colors duration-300"
            >
              <Utensils className="w-6 h-6 text-rose-400 mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Parrillada libre</h3>
                <p className="text-gray-600">
                  Incluye una gaseosa por persona o una cerveza/vino para compartir entre dos personas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dress Code */}
        <div
          ref={(el) => (sectionRefs.current["dress"] = el)}
          data-section="dress"
          style={{
            ...getAnimationStyle("dress", "slideLeft"),
            transition: 'all 0.8s ease-out'
          }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
        >
          <div className="flex items-center gap-3 mb-6 group">
            <Shirt className="w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-3xl font-serif text-gray-800">Vestimenta</h2>
          </div>
          <p className="text-lg text-gray-700 group-hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-rose-50/50">
            Elegante sport / Formal
          </p>
        </div>

        {/* Confirmation */}
        <div
          ref={(el) => (sectionRefs.current["confirmation"] = el)}
          data-section="confirmation"
          style={{
            ...getAnimationStyle("confirmation", "slideRight"),
            transition: 'all 0.8s ease-out'
          }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
        >
          <div className="flex items-center gap-3 mb-6 group">
            <Clock className="w-8 h-8 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
            <h2 className="text-3xl font-serif text-gray-800">Confirmación</h2>
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 rounded-2xl p-6 mb-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <p className="text-xl font-semibold text-gray-800 mb-2">Fecha límite: 15 de Diciembre de 2025</p>
            <p className="text-gray-700">Por favor confirmar asistencia y realizar el pago antes de esta fecha.</p>
          </div>

          {/* PRECIO AGREGADO AQUÍ */}
          <div className="bg-gradient-to-r from-amber-50 to-rose-50 border-2 border-amber-200 rounded-2xl p-6 mb-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CreditCard className="w-6 h-6 text-amber-600" />
              <h3 className="text-2xl font-bold text-gray-800">Valor por persona</h3>
            </div>
            <p className="text-4xl font-bold text-amber-700 mb-2">$40.000</p>
            <p className="text-gray-600 text-sm">Pesos argentinos</p>
          </div>

          <div className="flex items-center gap-3 mb-4 group">
            <CreditCard className="w-7 h-7 text-rose-400 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-semibold text-gray-800">Datos de pago</h3>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Alias:</p>
              <p className="text-2xl font-mono font-bold text-gray-800 hover:text-rose-600 transition-colors cursor-pointer">
                guilleluz2025
              </p>
            </div>

            <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-rose-300 transition-all duration-300 hover:bg-rose-50/30">
              <p className="text-gray-600 text-center">
                [espacio para el qr "si es que es de mercado pago se hace el link de pago desde la app"]
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={(el) => (sectionRefs.current["footer"] = el)}
          data-section="footer"
          style={{
            ...getAnimationStyle("footer", "fadeUp"),
            transition: 'all 0.8s ease-out'
          }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center transform transition-all duration-700 hover:scale-105 hover:shadow-3xl"
        >
          <div className="animate-bounce mb-4">
            <Heart className="w-10 h-10 mx-auto text-rose-400 animate-pulse" />
          </div>
          <p className="text-xl text-gray-700 font-light mb-2">¡Los esperamos para celebrar juntos!</p>
          <p className="text-gray-600">Luz & Guillermo</p>
        </div>
      </div>
    </div>
  )
}