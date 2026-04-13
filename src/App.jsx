import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Menu,
  X,
  Shield,
  Smartphone,
  Zap,
  Headphones,
  Wrench,
  Package,
  CheckCircle,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  MessageCircle,
  Send,
  MapPin,
  Clock,
  Star,
  Award,
} from "lucide-react";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0, as: Tag = "div" }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ──────────────────────────────────────────────
   CSS Keyframe animations injected once
   ────────────────────────────────────────────── */
const animationStyles = `
@keyframes gradient-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.6; }
  70%  { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1.5); opacity: 0; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-18px); }
}
@keyframes float-slow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%      { transform: translateY(-24px) rotate(3deg); }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes slide-down {
  from { opacity: 0; max-height: 0; }
  to   { opacity: 1; max-height: 400px; }
}
`;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipo: "Consumidor",
    mensaje: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const navLinks = [
    { label: "Productos", href: "#categorias" },
    { label: "Mayorista", href: "#mayorista" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Contacto", href: "#contacto" },
  ];

  const categories = [
    {
      icon: Shield,
      title: "Fundas Premium",
      desc: "OtterBox y Spigen ",
    },
    {
      icon: Smartphone,
      title: "Protectores de Pantalla",
      desc: "Vidrio templado e hidrogel",
    },
    {
      icon: Zap,
      title: "Carga y Cables",
      desc: "MFi certified, fast charge",
    },
    {
      icon: Headphones,
      title: "Audio",
      desc: "AirPods, auriculares, altavoces",
    },
    {
      icon: Wrench,
      title: "Repuestos",
      desc: "Pantallas, baterias, herramientas",
    },
    {
      icon: Package,
      title: "Programa Mayorista",
      desc: "Precios especiales por volumen",
    },
  ];

  const stats = [
    { value: "5000+", label: "Productos", icon: Package },
    { value: "500+", label: "Clientes", icon: Star },
    { value: "24h", label: "Envios", icon: Clock },
    { value: "100%", label: "Garantia Real", icon: Award },
  ];

  return (
    <>
      {/* Inject keyframes */}
      <style>{animationStyles}</style>

      {/* ───────── NAVIGATION ───────── */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-0.5 font-display text-2xl font-bold">
              <span style={{ color: "#00D9FF" }}>iPro</span>
              <span style={{ color: "#FF6B35" }}>Miami</span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* WhatsApp CTA desktop */}
            <a
              href="https://wa.me/17861234567"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 shadow-lg shadow-[#25D366]/20"
            >
              <Phone size={16} />
              Hablar por WhatsApp
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden bg-[#0A1929]/95 backdrop-blur-lg border-t border-white/10 overflow-hidden"
            style={{ animation: "slide-down 0.3s ease-out forwards" }}
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-white/80 hover:text-white text-base font-medium py-2 transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://wa.me/17861234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-5 py-2.5 rounded-full mt-2"
              >
                <Phone size={16} />
                Hablar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* ───────── HERO ───────── */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(180deg, #0A1929 0%, #003366 50%, #0A1929 100%)" }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('/img1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.25,
            }}
          />
          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 opacity-60 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(10,25,41,0.9) 0%, rgba(0,51,102,0.7) 25%, rgba(255,107,53,0.35) 50%, rgba(0,51,102,0.7) 75%, rgba(10,25,41,0.9) 100%)",
              backgroundSize: "400% 400%",
              animation: "gradient-shift 12s ease infinite",
            }}
          />

          {/* Floating decorative blobs */}
          <div
            className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{
              background: "radial-gradient(circle, #00D9FF, transparent 70%)",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
            style={{
              background: "radial-gradient(circle, #FF6B35, transparent 70%)",
              animation: "float-slow 10s ease-in-out infinite",
            }}
          />
          <div
            className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-10 blur-2xl pointer-events-none"
            style={{
              background: "radial-gradient(circle, #00D9FF, transparent 70%)",
              animation: "float 6s ease-in-out infinite 1s",
            }}
          />

          {/* Content */}
          <div
            className="relative z-10 max-w-5xl mx-auto px-4 text-center"
            style={{ animation: "fade-in-up 0.8s ease-out" }}
          >
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              El stock que tu negocio
              <br />
              necesita.
            </h1>
            <h2 className="text-xl md:text-2xl font-body mb-10" style={{ color: "#00D9FF" }}>
              La calidad que tus clientes exigen.
            </h2>

            {/* Stats bar */}
            <div className="inline-flex flex-wrap justify-center gap-4 md:gap-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 md:px-10 py-4 mb-10">
              {["5000+ Productos", "Envio el Mismo Dia", "Soporte ES/EN"].map(
                (item, i) => (
                  <span
                    key={i}
                    className="text-white/90 text-sm md:text-base font-medium flex items-center gap-2"
                  >
                    {i > 0 && (
                      <span className="hidden md:inline text-white/30">|</span>
                    )}
                    {item}
                  </span>
                )
              )}
            </div>

            <div>
              <a
                href="#categorias"
                className="inline-flex items-center gap-2 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-xl transition-transform duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #00D9FF 0%, #FF6B35 100%)",
                }}
              >
                Ver Catalogo Mayorista
                <ChevronRight size={20} />
              </a>
            </div>
          </div>
        </section>

        {/* ───────── CATEGORIES ───────── */}
        <section id="categorias" className="py-20 md:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Title */}
            <Reveal className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0A1929] mb-4">
                Nuestras Categorias
              </h2>
              <div
                className="mx-auto w-24 h-1 rounded-full"
                style={{ background: "#00D9FF" }}
              />
            </Reveal>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                return (
                  <Reveal key={i} delay={i * 0.08}>
                    <div
                      className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer group h-full"
                    >
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                        style={{ background: "#00D9FF15" }}
                      >
                        <Icon
                          size={28}
                          style={{ color: "#00D9FF" }}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="font-display text-xl font-bold text-[#0A1929] mb-2">
                        {cat.title}
                      </h3>
                      <p className="font-body text-gray-500 text-sm leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────── SHOWROOM GALLERY ───────── */}
        <section id="showroom" className="relative py-20 md:py-28 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-14">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0A1929] mb-4">
                Nuestro Showroom en Miami
              </h2>
              <p className="font-body text-gray-500 max-w-2xl mx-auto">
                Inventario real, local y listo para entrega. Miles de
                accesorios premium exhibidos en tienda.
              </p>
              <div
                className="mx-auto mt-6 w-24 h-1 rounded-full"
                style={{ background: "#00D9FF" }}
              />
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { src: "/img1.jpg", label: "Accesorios Premium", sub: "Fundas, cargadores y mas" },
                { src: "/img2.jpg", label: "Pared de Fundas", sub: "Catalogo completo por modelo" },
                { src: "/img3.jpg", label: "Experiencia Apple", sub: "Demos de iPad, MacBook y iPhone" },
              ].map((item, i) => (
                <Reveal key={item.src} delay={i * 0.15}>
                  <div className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <img
                      src={item.src}
                      alt={item.label}
                      loading="lazy"
                      className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, rgba(10,25,41,0.95) 100%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-white font-bold text-lg">
                        {item.label}
                      </h3>
                      <p className="font-body text-white/80 text-sm">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── MAYORISTA ───────── */}
        <section id="mayorista" className="relative py-20 md:py-28 overflow-hidden" style={{ background: "#0A1929" }}>
          {/* Decorative gradient blob right */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -right-32 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl pointer-events-none"
            style={{
              background: "radial-gradient(circle, #FF6B35 0%, #00D9FF 60%, transparent 80%)",
              animation: "float-slow 10s ease-in-out infinite",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: text */}
              <div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                  Tienes un repair shop o tienda de accesorios?
                </h2>
                <p className="font-body text-lg text-white/70 leading-relaxed mb-8">
                  Accede a precios especiales por volumen. Sin minimos de compra
                  absurdos. Sin esperar 3 semanas por envios de China.
                </p>

                <ul className="space-y-4 mb-10">
                  {[
                    "Inventario local en Miami",
                    "Envio mismo di a todo Florida",
                    "Soporte en espanol e ingles",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle size={22} style={{ color: "#00D9FF" }} className="shrink-0" />
                      <span className="text-white/90 font-body text-base">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-white font-semibold text-base px-8 py-4 rounded-full shadow-xl transition-transform duration-200 hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #00D9FF 0%, #FF6B35 100%)",
                  }}
                >
                  Solicitar Precios Mayorista
                  <ChevronRight size={20} />
                </a>
              </div>

              {/* Right: Image + floating stats card */}
              <Reveal delay={0.2} className="hidden lg:flex items-center justify-center relative">
                <div
                  className="w-80 h-80 rounded-full opacity-20 blur-2xl absolute"
                  style={{
                    background: "radial-gradient(circle, #00D9FF, transparent 70%)",
                    animation: "float 7s ease-in-out infinite",
                  }}
                />
                <div className="relative w-full max-w-lg">
                  <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                    <img
                      src="/img2.jpg"
                      alt="Inventario mayorista iPro Miami"
                      loading="lazy"
                      className="w-full h-[420px] object-cover"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(0,217,255,0.15) 0%, transparent 45%, rgba(255,107,53,0.2) 100%)",
                      }}
                    />
                  </div>

                  <div
                    className="absolute -bottom-8 -left-8 bg-[#0A1929]/90 backdrop-blur-md border border-white/15 rounded-2xl p-5 shadow-xl max-w-[260px] space-y-3"
                    style={{ animation: "float 6s ease-in-out infinite" }}
                  >
                    {[
                      { icon: MapPin, text: "Miami, FL" },
                      { icon: Clock, text: "Envio mismo dia" },
                      { icon: Award, text: "Garantia real" },
                    ].map((item, i) => {
                      const Ic = item.icon;
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: "#00D9FF20" }}
                          >
                            <Ic size={18} style={{ color: "#00D9FF" }} />
                          </div>
                          <span className="text-white/90 font-body text-sm">{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───────── ABOUT / QUALITY ───────── */}
        <section id="nosotros" className="py-20 md:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Reveal>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0A1929] leading-tight mb-6">
                Desde 2015 conectando Miami
                <br className="hidden md:block" /> con la mejor tecnologia
              </h2>
              <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto mb-14 leading-relaxed">
                Todos nuestros productos pasan por control de calidad iPro.
                Garantia real, no promesas vacias.
              </p>
            </Reveal>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s, i) => {
                const Ic = s.icon;
                return (
                  <Reveal key={i} delay={i * 0.1}>
                    <div
                      className="bg-gray-50 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: "#00D9FF15" }}
                      >
                        <Ic size={24} style={{ color: "#00D9FF" }} />
                      </div>
                      <p className="font-display text-3xl md:text-4xl font-bold text-[#0A1929] mb-1">
                        {s.value}
                      </p>
                      <p className="font-body text-sm text-gray-500">{s.label}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ───────── CONTACT FORM ───────── */}
        <section
          id="contacto"
          className="py-20 md:py-28"
          style={{
            background: "linear-gradient(180deg, #f8fafc 0%, #eef4fb 50%, #f8fafc 100%)",
          }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-[#0A1929] mb-4">
                Contactanos
              </h2>
              <div
                className="mx-auto w-24 h-1 rounded-full"
                style={{ background: "#00D9FF" }}
              />
            </Reveal>

            <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-xl p-6 md:p-10 space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1929] mb-1.5 font-body">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/40 focus:border-[#00D9FF] transition font-body text-sm"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1929] mb-1.5 font-body">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/40 focus:border-[#00D9FF] transition font-body text-sm"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Telefono */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1929] mb-1.5 font-body">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/40 focus:border-[#00D9FF] transition font-body text-sm"
                    placeholder="+1 (786) 000-0000"
                  />
                </div>

                {/* Tipo */}
                <div>
                  <label className="block text-sm font-medium text-[#0A1929] mb-1.5 font-body">
                    Tipo
                  </label>
                  <select
                    name="tipo"
                    value={form.tipo}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/40 focus:border-[#00D9FF] transition font-body text-sm bg-white"
                  >
                    <option value="Consumidor">Consumidor</option>
                    <option value="Negocio">Negocio</option>
                    <option value="Mayorista">Mayorista</option>
                  </select>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-sm font-medium text-[#0A1929] mb-1.5 font-body">
                  Mensaje
                </label>
                <textarea
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/40 focus:border-[#00D9FF] transition font-body text-sm resize-none"
                  placeholder="\u00bfEn qu\u00e9 podemos ayudarte?"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 text-white font-semibold text-base px-10 py-4 rounded-full shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #00D9FF 0%, #FF6B35 100%)",
                  }}
                >
                  Enviar Mensaje
                  <Send size={18} />
                </button>
              </div>
            </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ───────── FOOTER ───────── */}
      <footer className="pt-16 pb-8" style={{ background: "#0A1929" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 mb-12">
            {/* Col 1: Company */}
            <div>
              <a href="#" className="inline-block font-display text-2xl font-bold mb-4">
                <span style={{ color: "#00D9FF" }}>iPro</span>
                <span style={{ color: "#FF6B35" }}>Miami</span>
              </a>
              <p className="font-body text-white/60 text-sm leading-relaxed mb-6">
                Tu conexion perfecta empieza aqui. Accesorios y repuestos de
                calidad desde Miami para todo Florida.
              </p>
              <div className="flex items-center gap-3">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon size={18} className="text-white/80" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="font-display text-base font-semibold text-white mb-4">
                Enlaces Rapidos
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Productos", href: "#categorias" },
                  { label: "Programa Mayorista", href: "#mayorista" },
                  { label: "Sobre Nosotros", href: "#nosotros" },
                  { label: "Contacto", href: "#contacto" },
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="font-body text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Newsletter */}
            <div>
              <h4 className="font-display text-base font-semibold text-white mb-4">
                Newsletter
              </h4>
              <p className="font-body text-sm text-white/60 mb-4">
                Recibe ofertas exclusivas y novedades directamente en tu bandeja.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/40 font-body"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-transform duration-200 hover:scale-105 cursor-pointer shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #00D9FF 0%, #FF6B35 100%)",
                  }}
                >
                  Suscribir
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="font-body text-sm text-white/40">
              &copy; 2024 iPro Miami. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* ───────── WHATSAPP FLOATING BUTTON ───────── */}
      <a
        href="https://wa.me/17861234567"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: "#25D366",
            animation: "pulse-ring 2s ease-out infinite",
          }}
        />
        {/* Button */}
        <span className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-transform duration-200 group-hover:scale-110"
          style={{ background: "#25D366" }}
        >
          <MessageCircle size={26} className="text-white" fill="white" />
        </span>
      </a>
    </>
  );
}
