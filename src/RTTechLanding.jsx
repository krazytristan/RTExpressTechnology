import { useEffect, useMemo, useRef, useState } from "react";

export default function RTTechLanding() {
  /* ---------------- THEME ---------------- */
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ---------------- SCROLL STATE + PROGRESS ---------------- */
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 6);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- TYPEWRITER ---------------- */
  const prefersReduced = useMemo(
    () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
  const phrases = useMemo(
    () => ["Custom Systems.", "Mobile & Web Apps.", "Systems Integration.", "Beautiful UX."],
    []
  );
  const typeRef = useRef(null);
  useEffect(() => {
    if (prefersReduced) {
      if (typeRef.current) typeRef.current.textContent = phrases[0];
      return;
    }
    let p = 0, i = 0, deleting = false, timer;
    const tick = () => {
      const el = typeRef.current;
      if (!el) return;
      const full = phrases[p];
      el.textContent = full.slice(0, i);
      if (!deleting && i < full.length) i++;
      else if (deleting && i > 0) i--;
      else { deleting = !deleting; if (!deleting) p = (p + 1) % phrases.length; }
      const speed = deleting ? 40 : 70;
      timer = setTimeout(tick, speed);
      if (i === full.length) setTimeout(() => (deleting = true), 900);
      if (i === 0 && deleting) { deleting = false; p = (p + 1) % phrases.length; }
    };
    tick();
    return () => clearTimeout(timer);
  }, [phrases, prefersReduced]);

  /* ---------------- NAV + REVEAL ---------------- */
  const navLinks = ["home", "services", "projects", "founders", "contact"];
  const revealIds = ["home", "about", "services", "projects", "founders", "testimonials", "clients", "newsletter", "impact", "contact"];
  useEffect(() => {
    const links = Array.from(document.querySelectorAll("a[data-nav]"));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const id = e.target.id;
        if (navLinks.includes(id)) {
          const link = links.find((a) => a.getAttribute("href") === `#${id}`);
          if (link) {
            const active = e.isIntersecting;
            link.classList.toggle("text-indigo-600", active);
            link.classList.toggle("after:w-full", active);
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          }
        }
        if (e.isIntersecting) e.target.classList.remove("opacity-0", "translate-y-6");
      });
    }, { rootMargin: "-45% 0px -55% 0px", threshold: 0 });
    revealIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) { el.classList.add("opacity-0","translate-y-6","transition-all","duration-700"); obs.observe(el); }
    });
    return () => obs.disconnect();
  }, []);

  /* ---------------- MOBILE MENU ---------------- */
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; }, [menuOpen]);
  useEffect(() => {
    const onHash = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  /* ---------------- COUNTERS (fixed for .jsx) ---------------- */
  const counterRefs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target; // no TypeScript cast
        const target = Number(el.dataset.target || "0");
        let curr = 0;
        const step = Math.max(1, Math.floor(target / 60));
        const anim = () => {
          curr = Math.min(target, curr + step);
          el.textContent = String(curr);
          if (curr < target) requestAnimationFrame(anim);
        };
        anim();
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counterRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ---------------- MARQUEE LOGOS ---------------- */
  const logos = useMemo(() => ([
    { src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", h: "h-8", alt: "Microsoft" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",        h: "h-8", alt: "IBM" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Google_logo.svg",     h: "h-8", alt: "Google" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Oracle_logo.svg",     h: "h-8", alt: "Oracle" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/7/73/Logo_NVIDIA.svg",     h: "h-8", alt: "NVIDIA" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Intel-logo-2020.svg", h: "h-8", alt: "Intel" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/3/3b/SAP_2011_logo.svg",   h: "h-8", alt: "SAP" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Red_Hat_logo.svg",    h: "h-8", alt: "Red Hat" },
    { src: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Adobe_Systems_logo_and_wordmark.svg", h: "h-8", alt: "Adobe" },
  ]), []);

  /* ---------------- BACK TO TOP ---------------- */
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const toTop = () => window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });

  /* ---------------- HERO PARALLAX (mouse) ---------------- */
  const heroRef = useRef(null);
  const [parallax, setParallax] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  useEffect(() => {
    if (prefersReduced) return;
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width - 0.5;
      const cy = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x1: cx * 12, y1: cy * 12, x2: -cx * 16, y2: -cy * 16 });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [prefersReduced]);

  /* ---------------- INLINE KEYFRAMES ---------------- */
  const keyframes = `
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes float { 0%,100%{ transform: translateY(0px);} 50%{ transform: translateY(-10px);} }
    @keyframes blink { 50% { opacity: 0; } }
  `;

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-100">
      <style>{keyframes}</style>

      {/* Skip link */}
      <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-indigo-600 text-white px-3 py-2 rounded">
        Skip to content
      </a>

      {/* Header + scroll progress */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-shadow ${scrolled ? "shadow-lg" : ""}`}>
        <div className="mx-auto max-w-7xl px-4">
          <div className="mt-4 rounded-2xl bg-white/60 dark:bg-gray-900/60 backdrop-blur ring-1 ring-black/5 dark:ring-white/10">
            <div className="px-5 py-4 flex items-center justify-between">
              <a href="#home" className="group inline-flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow">RT</span>
                <span className="text-xl font-extrabold tracking-wide">
                  <span className="text-indigo-700 dark:text-indigo-300">RT EXPRESS</span>{" "}
                  <span className="text-gray-700 dark:text-gray-200">TECHNOLOGY</span>
                </span>
              </a>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
                {navLinks.map((id) => (
                  <a
                    key={id}
                    data-nav
                    href={`#${id}`}
                    className="relative hover:text-indigo-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-current after:transition-all after:duration-300"
                  >
                    {id.toUpperCase()}
                  </a>
                ))}
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-black/5 dark:ring-white/10 hover:ring-black/10 dark:hover:ring-white/20 transition"
                  aria-label="Toggle theme"
                  title="Toggle theme"
                >
                  {theme === "dark" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.536-7.536-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0-1.414-1.414M7.05 7.05 5.636 5.636"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z"/></svg>
                  )}
                </button>
              </nav>

              {/* Mobile button */}
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl ring-1 ring-black/5 dark:ring-white/10"
                aria-label="Open menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            {/* Scroll progress bar */}
            <div className="h-1 w-full bg-transparent">
              <div
                className="h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div onClick={() => setMenuOpen(false)} className={`lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm transition ${menuOpen ? "" : "hidden"}`} />
        <aside className={`lg:hidden fixed top-0 right-0 h-full w-72 z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="h-full bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 p-6 flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="rounded-full ring-1 ring-black/5 dark:ring-white/10 h-10 w-10 inline-flex items-center justify-center" aria-label="Close menu">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="mt-6 grid gap-3 text-base font-medium">
              {navLinks.map((id) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="hover:text-indigo-600">
                  {id.toUpperCase()}
                </a>
              ))}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="mt-2 inline-flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-black/5 dark:ring-white/10"
              >
                Toggle Theme
              </button>
            </nav>
          </div>
        </aside>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-28" />

      {/* Hero (Home) */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-[92vh] w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-black text-white flex items-center scroll-mt-28"
      >
        {/* Parallax blobs */}
        {!prefersReduced && (
          <>
            <div
              className="absolute -top-20 -left-10 h-80 w-80 rounded-full bg-purple-500/40 blur-3xl"
              style={{ transform: `translate(${parallax.x1}px, ${parallax.y1}px)` }}
            />
            <div
              className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-500/30 blur-3xl"
              style={{ transform: `translate(${parallax.x2}px, ${parallax.y2}px)` }}
            />
          </>
        )}
        <div className="relative z-10 mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <p className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Innovate • Build • Scale
            </p>
            <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">Welcome to RT Technology</span>
            </h1>
            <p className="mt-3 text-xl text-white/90 h-8">
              <span ref={typeRef} className={!prefersReduced ? "border-r-2 border-white pr-1 animate-[blink_1s_steps(1)_infinite]" : ""} />
            </p>
            <p className="mt-4 text-white/80">Empowering innovation through technology and design.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton href="#contact" solid>Message Now</MagneticButton>
              <MagneticButton href="#services">Our Services</MagneticButton>
            </div>
          </div>
          <div className="hidden md:block">
            <img src="/images/hero.png" alt="Hero visual" loading="lazy" className="rounded-3xl shadow-2xl object-cover h-[420px] w-full" />
          </div>
        </div>
      </section>

      {/* About (not in navbar, still on page) */}
      <Section id="about" title="About RT Express Technology">
        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard>
            <h4 className="text-xl font-semibold mb-3">📌 Company Overview</h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Business Name:</strong> RT Express Technology</li>
              <li><strong>Business Type:</strong> Startup – Technology Solutions Provider</li>
              <li><strong>Founded:</strong> 2025</li>
              <li><strong>Headquarters:</strong> Balintawak, Lipa City, Batangas</li>
              <li><strong>Legal Structure:</strong> Partnership</li>
              <li><strong>Website:</strong> <a href="https://krazytristan.github.io/RTExpressTechnology/" className="text-indigo-600 hover:underline">RT Express Technology</a></li>
              <li><strong>Email:</strong> <a href="mailto:trstnjorge@gmail.com" className="text-indigo-600 hover:underline">trstnjorge@gmail.com</a></li>
              <li><strong>Phone:</strong> 0951 169 2537</li>
            </ul>
          </GlassCard>
          <GlassCard>
            <h4 className="text-xl font-semibold mb-3">🚀 Mission</h4>
            <p>To deliver innovative, efficient, and user-centric technology solutions that empower businesses and institutions in their digital transformation journey.</p>
            <h4 className="text-xl font-semibold mt-6 mb-3">👁️ Vision</h4>
            <p>To become a trusted name in the Philippine tech landscape by providing reliable and scalable systems that make life and work easier through digital innovation.</p>
          </GlassCard>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" title="Our Services" tone="alt">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Custom Software Development", text: "Tailored software for operations—from academic systems to business platforms." },
            { title: "Web & Mobile App Development", text: "Responsive, modern apps built with the latest technologies and UX best practices." },
            { title: "Systems Integration", text: "Connect and optimize your tools to work together efficiently and seamlessly." },
          ].map((item, idx) => (
            <TiltCard key={item.title} delay={idx * 60}>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-extrabold">
                  {item.title.split(" ")[0].slice(0,2)}
                </div>
              </div>
              <h4 className="text-xl font-semibold text-center">{item.title}</h4>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">{item.text}</p>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Featured & Current Projects">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "LibrarySys", text: "Smart library system with barcode scanning and student attendance tracking.", img: "/images/librarysys.jpg" },
            { title: "WiFi Connect", text: "Waste management & city monitoring system powered by WiFi and sensors.", img: "/images/wifi-connect.jpg" },
            { title: "AMATrack", text: "Digital time-in/out tracker and scheduler for schools and academic use.", img: "/images/amatrack.jpeg" },
          ].map((item, idx) => (
            <ProjectCard key={item.title} item={item} delay={idx * 60} />
          ))}
        </div>
      </Section>

      {/* Founders */}
      <Section id="founders" title="Meet Our Team" tone="alt">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "TRISTAN JORGE CUARTERO", role: "Founder / CTO", img: "/images/BSU_6102.jpg", desc: "Visionary leader & technology strategist passionate about digital innovation." },
            { name: "RODOLFO C. GUCE III", role: "Co-Founder / CTO", img: "/images/dither.jpg", desc: "System architect focused on seamless UX and front-end technologies." },
            { name: "RICKY D. DOLOR", role: "Designer / CTO", img: "/images/pic.jpg", desc: "Layout & design specialist." },
          ].map((m, idx) => (
            <TiltCard key={m.name} delay={idx * 60}>
              <img src={m.img} alt={m.name} loading="lazy" className="w-28 h-28 mx-auto rounded-full object-cover shadow mb-4" />
              <h4 className="text-xl font-semibold">{m.name}</h4>
              <p className="text-indigo-600 dark:text-indigo-400 font-medium">{m.role}</p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{m.desc}</p>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section id="testimonials" title="What Our Clients Say">
        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard>
            <p className="italic">“RT Express transformed our outdated system into a sleek, modern platform. Truly impressed with their professionalism.”</p>
            <footer className="mt-4 font-semibold">— Sarah D., School Principal</footer>
          </GlassCard>
          <GlassCard>
            <p className="italic">“They really listened to what we needed. The app they developed boosted our team's productivity by 40%.”</p>
            <footer className="mt-4 font-semibold">— Mark L., Business Owner</footer>
          </GlassCard>
        </div>
      </Section>

      {/* Clients (marquee) */}
      <Section id="clients" title="Our Partners & Clients" tone="alt">
        <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-12 whitespace-nowrap p-6" style={{ animation: prefersReduced ? "none" : "marquee 25s linear infinite" }}>
            {[...logos, ...logos].map((l, idx) => (
              <img key={idx} src={l.src} alt={l.alt} loading="lazy" className={l.h} />
            ))}
          </div>
        </div>
      </Section>

      {/* Newsletter */}
      <Section id="newsletter" title="Stay Updated">
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">Subscribe to our newsletter and receive the latest updates on our projects and innovations.</p>
        <form action="https://formsubmit.co/trstnjorge@gmail.com" method="POST" className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="email" name="email" required placeholder="Your email" className="px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          <button type="submit" className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">Subscribe</button>
        </form>
      </Section>

      {/* Impact */}
      <Section id="impact" title="Our Impact" tone="alt">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { target: 5, label: "Projects Completed" },
            { target: 25,  label: "Happy Clients" },
            { target: 1,   label: "Years Experience" },
            { target: 3,   label: "Team Members" },
          ].map((b, i) => (
            <GlassCard key={b.label}>
              <h4
                ref={(el) => (counterRefs.current[i] = el)}
                data-target={b.target}
                className="text-5xl font-extrabold text-indigo-600"
              >
                0
              </h4>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{b.label}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get in Touch">
        <p className="mb-6 text-gray-600 dark:text-gray-300 text-center">Want to collaborate or have a project in mind? Let’s talk.</p>
        <div className="text-left text-lg space-y-2 mb-8 max-w-xl mx-auto">
          <p><strong>Email:</strong> <a href="mailto:rtexpresstechnology@gmail.com" className="text-indigo-600 hover:underline">rtexpresstechnology@gmail.com</a></p>
          <p><strong>Phone:</strong> +63 951 169 2537</p>
          <p><strong>Location:</strong> Lipa City, Batangas, Philippines</p>
        </div>
        <form action="https://formsubmit.co/rtexpresstechnology@gmail.com" method="POST" className="space-y-4 text-left max-w-xl mx-auto">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <div>
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea name="message" rows="4" required className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600" />
          </div>
          <MagneticButton asButton solid className="w-full justify-center">Send Message</MagneticButton>
        </form>
      </Section>

      {/* Footer */}
      <footer className="text-center py-10">
        <p className="text-sm opacity-80">&copy; {new Date().getFullYear()} RT Tech. All rights reserved.</p>
        <p className="text-xs mt-1 opacity-70">Designed with ♥ by the RT Express Team</p>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={toTop}
          className="fixed bottom-6 right-6 h-11 w-11 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none"
          aria-label="Back to top"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

/* ---------------- COMPONENTS / HELPERS ---------------- */

function Section({ id, title, tone, children }) {
  return (
    <section id={id} className={`py-20 scroll-mt-28 ${tone === "alt" ? "bg-gray-50 dark:bg-gray-900/40" : ""}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-rose-500 dark:from-indigo-400 dark:via-fuchsia-400 dark:to-rose-300">
            {title}
          </span>
        </h3>
        {children}
      </div>
    </section>
  );
}

function GlassCard({ children }) {
  return (
    <div className="rounded-2xl p-6 bg-white/70 dark:bg-gray-900/60 backdrop-blur ring-1 ring-black/5 dark:ring-white/10 shadow-sm">
      {children}
    </div>
  );
}

function TiltCard({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateX(${(-cy * 6).toFixed(2)}deg) rotateY(${(cx * 6).toFixed(2)}deg) translateY(-2px)`;
    };
    const onLeave = () => { el.style.transform = "rotateX(0) rotateY(0) translateY(0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className="rounded-2xl p-6 bg-white dark:bg-gray-900 ring-1 ring-black/5 dark:ring-white/10 shadow hover:shadow-xl transition-transform duration-300 will-change-transform"
    >
      {children}
    </div>
  );
}

function ProjectCard({ item, delay = 0 }) {
  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className="group rounded-2xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-gray-900 overflow-hidden shadow hover:shadow-2xl transition"
    >
      <div className="relative">
        <img src={item.img} alt={item.title} loading="lazy" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
        <p className="text-gray-600 dark:text-gray-300">{item.text}</p>
      </div>
    </div>
  );
}

function MagneticButton({ href, children, solid = false, asButton = false, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * 0.05}px, ${dy * 0.05}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);
  const classes = solid
    ? "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
    : "inline-flex items-center gap-2 px-6 py-3 rounded-full ring-1 ring-white/40 text-white hover:bg-white/10 transition";
  if (asButton) {
    return <button ref={ref} className={`${classes} ${className}`}>{children}</button>;
  }
  return <a ref={ref} href={href} className={`${classes} ${className}`}>{children}</a>;
}
