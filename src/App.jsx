import { useState, useEffect, useRef } from "react";

// ── Utility: useInView hook ──────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── ShinyText ────────────────────────────────────────────────────────────────
function ShinyText({ text, className = "" }) {
  return (
    <span
      className={`bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-white to-violet-300 bg-[length:200%_auto] animate-[shine_3s_linear_infinite] ${className}`}
      style={{ backgroundImage: "linear-gradient(90deg,#c4b5fd 0%,#ffffff 40%,#a78bfa 60%,#c4b5fd 100%)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shine 3s linear infinite" }}
    >
      {text}
    </span>
  );
}

// ── TypeWriter ───────────────────────────────────────────────────────────────
function TypeWriter({ phrases }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[idx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setIdx(i => (i + 1) % phrases.length);
          setCharIdx(0);
        } else setCharIdx(c => c - 1);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx, phrases]);

  return (
    <span className="text-violet-300 font-mono text-sm md:text-base">
      &gt; {display}<span className="animate-pulse">|</span>
    </span>
  );
}

// ── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["about", "skills", "projects", "certifications", "contact"];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-zinc-950/90 backdrop-blur-lg border-b border-violet-500/20 shadow-lg shadow-violet-900/10" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono font-bold text-lg text-white">
            SSP<span className="text-violet-400">_</span>
          </div>
          <ul className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <li key={l}>
                <a href={`#${l}`} className="font-mono text-sm text-zinc-400 hover:text-violet-300 transition-colors duration-200">
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <button className="md:hidden flex flex-col gap-1.5" onClick={() => setOpen(o => !o)}>
            <span className={`block h-0.5 w-6 bg-zinc-300 transition-all ${open ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block h-0.5 w-6 bg-zinc-300 transition-all ${open ? "opacity-0" : ""}`}></span>
            <span className={`block h-0.5 w-6 bg-zinc-300 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-0 z-40 bg-zinc-950/95 flex flex-col items-center justify-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l}`} onClick={() => setOpen(false)}
              className="font-mono text-2xl text-zinc-300 hover:text-violet-300 transition-colors">
              {l}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="min-h-screen relative flex items-center overflow-hidden">
      {/* Aurora bg */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-700/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        {/* Grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(167,139,250,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="animate-[fadeInUp_0.8s_ease_forwards]" style={{ animationFillMode: "backwards" }}>
          <div className="inline-flex items-center gap-2 bg-violet-900/30 border border-violet-500/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="font-mono text-xs text-violet-300">Systems Developer & Automation Engineer</span>
          </div>
          <div className="font-mono text-violet-500/60 text-sm mb-3">// systems_developer.init()</div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            <ShinyText text="Subha Sankar" /><br />
            <span className="text-white">Panda</span>
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6 max-w-lg">
            Building modern, high-performance applications with intuitive user experience and scalable automation logic.
          </p>
          <div className="mb-8 bg-zinc-900/60 border border-zinc-700/40 rounded-lg px-4 py-3 inline-block">
            <TypeWriter phrases={[
              "automation_engineer.build()",
              "backend_systems.scale()",
              "workflow.optimize(90%)",
              "python.run(smart_solutions)",
              "status: available_for_work",
            ]} />
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://github.com/subhasankarpanda24" target="_blank" rel="noreferrer"
              className="font-mono text-sm bg-zinc-900 border border-zinc-700 hover:border-violet-500 px-6 py-3 rounded-full transition-all duration-300 hover:bg-zinc-800 text-white">
              GitHub ↗
            </a>
            <a href="/assets/resume.pdf" download
              className="font-mono text-sm bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-full transition-all duration-300 text-white">
              Download Resume
            </a>
            <a href="#contact"
              className="font-mono text-sm border border-violet-500/30 hover:border-violet-500 px-6 py-3 rounded-full transition-all duration-300 text-zinc-300">
              Contact Me
            </a>
          </div>
        </div>

        {/* Profile Card with Photo */}
        <div className="animate-[fadeInUp_0.8s_ease_0.3s_forwards] flex flex-col items-center gap-6" style={{ opacity: 0, animationFillMode: "forwards" }}>
          {/* Photo */}
          <div className="relative group">
            {/* Glow rings */}
            <div className="absolute -inset-3 rounded-full bg-violet-600/20 blur-xl animate-pulse"></div>
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-zinc-950"></div>
            </div>
            {/* Photo */}
            <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-violet-500/50 shadow-2xl shadow-violet-900/50 transition-transform duration-500 group-hover:scale-105">
              <img
                src="/assets/subha.png"
                alt="Subha Sankar Panda"
                className="w-full h-full object-cover object-top"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-violet-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            {/* Status badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-900 border border-violet-500/40 rounded-full px-3 py-1 shadow-lg whitespace-nowrap">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="font-mono text-xs text-green-400">Online</span>
            </div>
          </div>

          {/* Terminal mini card */}
          <div className="w-full bg-zinc-900/80 border border-violet-500/30 rounded-2xl overflow-hidden shadow-xl shadow-violet-900/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800/60 border-b border-zinc-700/50">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span className="font-mono text-xs text-zinc-500 ml-2">~/portfolio/profile.json</span>
            </div>
            <div className="p-4 font-mono text-xs space-y-1">
              <div className="text-zinc-500">{"{"}</div>
              {[
                ["name", "Subha Sankar Panda"],
                ["role", "Systems Developer"],
                ["location", "Odisha, India"],
                ["education", "B.Tech CSE"],
                ["status", "available"],
              ].map(([k, v], i) => (
                <div key={k} className="pl-3" style={{ animation: `fadeInLeft 0.4s ease ${0.1 * i + 0.5}s both` }}>
                  <span className="text-violet-400">"{k}"</span>
                  <span className="text-zinc-500">: </span>
                  <span className={k === "status" ? "text-green-400" : "text-amber-300"}>"{v}"</span>
                  {i < 4 && <span className="text-zinc-500">,</span>}
                </div>
              ))}
              <div className="text-zinc-500">{"}"}</div>
            </div>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-zinc-500 flex flex-col items-center gap-1 animate-bounce">
        scroll <span>↓</span>
      </a>
    </section>
  );
}

// ── About ────────────────────────────────────────────────────────────────────
function About() {
  const [ref, visible] = useInView();
  return (
    <section id="about" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="font-mono text-violet-500 text-sm mb-2">// 01 &nbsp; about_me</div>
          <h2 className="text-4xl font-black text-white mb-12" style={{ fontFamily: "'Syne', sans-serif" }}>A Bit About Me</h2>

          <div className="grid md:grid-cols-12 gap-10 items-stretch">
            {/* Text block */}
            <div className="md:col-span-7 bg-zinc-900/50 border border-violet-500/20 rounded-2xl p-8 shadow-lg">
              <p className="text-zinc-300 text-base leading-relaxed mb-4">
                I'm a second-year <span className="text-violet-300 font-semibold">B.Tech CSE student at NIST University</span>, focused on automation engineering, backend logic, and scalable workflow systems.
              </p>
              <p className="text-zinc-300 text-base leading-relaxed mb-4">
                I enjoy building structured, efficient solutions — from API-driven automation pipelines to backend systems that scale. Currently evolving toward technical leadership through hands-on projects and continuous learning.
              </p>
              <p className="text-zinc-300 text-base leading-relaxed mb-8">
                When I'm not coding, I'm exploring new tools, reading about distributed systems, or hunting for the next problem worth solving.
              </p>
              <div className="grid grid-cols-3 gap-4 border-t border-zinc-700/50 pt-6">
                {[["2+", "Projects"], ["90%", "Automation Gain"], ["3+", "Tech Stacks"]].map(([n, l]) => (
                  <div key={l} className="text-center">
                    <div className="text-3xl font-black text-white">{n}<span className="text-violet-400"></span></div>
                    <div className="text-zinc-500 text-sm mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info cards */}
            <div className="md:col-span-5 flex flex-col gap-4">
              {[
                { label: "Based in", value: "Odisha, India", icon: "📍" },
                { label: "Education", value: "B.Tech CSE, NIST University", icon: "🎓" },
                { label: "Focus", value: "Automation & Backend Systems", icon: "⚙️" },
                { label: "Status", value: "Open to opportunities", icon: "✅" },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-4 bg-zinc-900/50 border border-violet-500/20 rounded-xl p-4 hover:border-violet-400/40 transition-all">
                  <div className="text-2xl">{icon}</div>
                  <div>
                    <div className="text-zinc-500 text-xs font-mono">{label}</div>
                    <div className="text-white text-sm font-semibold">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Skills ───────────────────────────────────────────────────────────────────
function Skills() {
  const [ref, visible] = useInView();
  const groups = [
    {
      icon: "💻", label: "Programming",
      skills: ["Python", "JavaScript", "Node.js", "C"]
    },
    {
      icon: "⚙️", label: "Backend & Database",
      skills: ["Flask", "REST APIs", "MongoDB Atlas", "SQL", "CRUD Operations"]
    },
    {
      icon: "🤖", label: "Automation & Tools",
      skills: ["n8n", "Selenium", "Webhooks", "API Chaining", "Git & GitHub", "Postman"]
    },
    {
      icon: "🧠", label: "Concepts & Architecture",
      skills: ["RAG Architecture", "NLP", "Systems Thinking", "Scalable Workflow Design", "Event-Driven Systems"]
    },
  ];

  return (
    <section id="skills" ref={ref} className="py-24 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="font-mono text-violet-500 text-sm mb-2">// 02 &nbsp; skills</div>
          <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>What I Work With</h2>
          <p className="text-zinc-500 text-base mb-12">My professional stack & tools</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {groups.map(({ icon, label, skills }, gi) => (
              <div key={label}
                className="bg-zinc-900/60 border border-violet-500/20 rounded-2xl p-5 hover:border-violet-400/50 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                style={{ transitionDelay: `${gi * 80}ms` }}>
                <div className="text-3xl mb-3">{icon}</div>
                <div className="font-mono text-violet-300 text-xs mb-4 font-semibold uppercase tracking-wider">{label}</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span key={s} className="text-xs font-mono bg-violet-900/30 border border-violet-500/30 text-violet-200 px-2 py-1 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projects ─────────────────────────────────────────────────────────────────
function Projects() {
  const [ref, visible] = useInView();
  const [selected, setSelected] = useState(null);

  const projects = [
    {
      id: 1,
      number: "01",
      title: "Smart Attendance & Risk Analytics System",
      description: "Developed a full-stack student management platform with real-time attendance tracking and ML-lite trend predictor.",
      fullDescription: "Developed a full-stack student management platform with real-time attendance tracking. Implemented role-based dashboards for Admins and Students with automated risk profiling. Built a 'ML-lite' trend predictor to project attendance breaches using 4-week moving averages. Automated critical alerts via MongoDB triggers for consecutive absences and threshold drops.",
      tags: ["Flask", "MongoDB", "Python", "REST API"],
      github: "https://github.com/subhasankarpanda24",
      demo: "#",
      color: "#7c3aed",
      featured: true,
    },
    {
      id: 2,
      number: "02",
      title: "Faculty AI Agent",
      description: "AI assistant that helps faculty automate academic tasks using RAG architecture and Selenium scraping.",
      fullDescription: "Architected a retrieval-augmented generation chatbot for educational institutional data. Scraped 198+ faculty profiles using Selenium and processed data into structured Excel/Pandas sources. Integrated fuzzy-string matching (RapidFuzz) for high-accuracy identity resolution across research and department queries.",
      tags: ["RAG", "NLP", "Python", "Selenium"],
      github: "https://github.com/subhasankarpanda24/faculty-AI",
      demo: "/assets/faculty-ai.mp4",
      color: "#6d28d9",
    },
    {
      id: 3,
      number: "03",
      title: "AI Automation Workflow Architecture",
      description: "Modular automation pipelines synchronization using n8n and event-driven webhook triggers.",
      fullDescription: "Designed modular automation pipelines to synchronize data across disparate services. Minimized manual intervention by 90% through event-driven webhook triggers and API chaining. Engineered error-handling logic for high-reliability data processing workflows.",
      tags: ["n8n", "Webhooks", "Automation"],
      github: "https://github.com/subhasankarpanda24",
      demo: "#",
      color: "#5b21b6",
    },
  ];

  return (
    <section id="projects" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="font-mono text-violet-500 text-sm mb-2">// 03 &nbsp; selected_work</div>
          <h2 className="text-4xl font-black text-white mb-4 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>Project Repository</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <div key={p.id}
                className="group bg-zinc-900/60 border border-violet-500/20 rounded-2xl p-6 hover:border-violet-400/60 transition-all duration-300 backdrop-blur-sm flex flex-col"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-violet-400/60 text-3xl font-black">{p.number}</span>
                  {p.featured && <span className="text-xs font-mono bg-violet-900/50 border border-violet-500/30 text-violet-300 px-2 py-1 rounded-full">Featured</span>}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{p.description}</p>
                
                {p.demo && p.demo.endsWith(".mp4") && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-zinc-700/50 bg-black">
                    <video controls className="w-full aspect-video">
                      <source src={p.demo} type="video/mp4" />
                    </video>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] font-mono bg-zinc-800 border border-zinc-700 text-zinc-400 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="flex-1 text-center font-mono text-xs bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg transition-colors border border-zinc-700">
                    GitHub
                  </a>
                  {p.demo !== "#" && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center font-mono text-xs bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white py-2 rounded-lg transition-all border border-violet-500/30">
                      Live Demo
                    </a>
                  )}
                  <button onClick={() => setSelected(p)} className="text-zinc-500 hover:text-white p-2">
                    ℹ️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-zinc-900 border border-violet-500/40 rounded-2xl p-8 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-violet-400/60 text-4xl font-black">{selected.number}</span>
              <button onClick={() => setSelected(null)} className="text-zinc-500 hover:text-white text-xl font-mono">✕</button>
            </div>
            <h3 className="text-white font-black text-xl mb-3">{selected.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-5">{selected.fullDescription}</p>
            <div className="flex flex-wrap gap-2">
              {selected.tags.map(t => (
                <span key={t} className="text-xs font-mono bg-violet-900/40 border border-violet-500/30 text-violet-300 px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Certifications ────────────────────────────────────────────────────────────
function Certifications() {
  const [ref, visible] = useInView();
  const certs = [
    { year: "2026", name: "SQL Micro Course", issuer: "Skill Course", icon: "🗄️" },
    { year: "2026", name: "AI Tools & ChatGPT Workshop", issuer: "be10x", icon: "🤖" },
    { year: "2026", name: "Python Bootcamp", issuer: "LetsUpgrade", icon: "🐍" },
    { year: "2026", name: "Scroll Reveal Animations", issuer: "LetsUpgrade", icon: "✨" },
  ];

  return (
    <section id="certifications" ref={ref} className="py-24 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="font-mono text-violet-500 text-sm mb-2">// 04 &nbsp; certifications</div>
          <h2 className="text-4xl font-black text-white mb-12" style={{ fontFamily: "'Syne', sans-serif" }}>Licenses & Certs</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certs.map(({ year, name, issuer, icon }, i) => (
              <div key={name}
                className="bg-zinc-900/60 border border-violet-500/20 rounded-2xl p-5 hover:border-violet-400/50 hover:-translate-y-1 transition-all duration-300"
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="text-3xl mb-3">{icon}</div>
                <div className="font-mono text-violet-400/60 text-xs mb-1">{year}</div>
                <div className="text-white font-semibold text-sm mb-1">{name}</div>
                <div className="text-zinc-500 text-xs font-mono">{issuer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const contacts = [
    {
      icon: "✉️", label: "Email", value: "subhasankarpanda16@gmail.com",
      href: "mailto:subhasankarpanda16@gmail.com"
    },
    {
      icon: "🔗", label: "LinkedIn", value: "subha-sankar-panda",
      href: "https://linkedin.com/in/subha-sankar-panda-115b0b375"
    },
    {
      icon: "⌨️", label: "GitHub", value: "subhasankarpanda24",
      href: "https://github.com/subhasankarpanda24"
    },
    {
      icon: "📄", label: "Resume", value: "Download PDF",
      href: "/assets/resume.pdf"
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="font-mono text-violet-500 text-sm mb-2">// 05 &nbsp; contact</div>
          <h2 className="text-4xl font-black text-white mb-4 text-center" style={{ fontFamily: "'Syne', sans-serif" }}>Let's Work Together</h2>
          <p className="text-zinc-500 text-base mb-12 text-center">Have a project, opportunity, or just want to connect?</p>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact Cards */}
            <div className="flex-1 flex flex-col gap-4 justify-center">
              {contacts.map(({ icon, label, value, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 bg-zinc-900/60 border border-violet-500/20 rounded-xl p-4 hover:border-violet-400/50 hover:bg-zinc-800/60 transition-all group">
                  <span className="text-2xl">{icon}</span>
                  <div className="flex-1">
                    <div className="text-zinc-500 text-xs font-mono">{label}</div>
                    <div className="text-white text-sm font-medium">{value}</div>
                  </div>
                  <span className="text-zinc-600 group-hover:text-violet-400 transition-colors">→</span>
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <div className="flex-1">
              {sent ? (
                <div className="bg-zinc-900/60 border border-violet-500/30 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 h-full">
                  <div className="text-5xl">✅</div>
                  <div className="text-white font-bold text-lg">Message Sent!</div>
                  <div className="text-zinc-500 text-sm text-center">Thanks for reaching out. I'll get back to you soon.</div>
                  <button onClick={() => setSent(false)} className="font-mono text-xs text-violet-400 hover:text-violet-300 mt-2">Send another →</button>
                </div>
              ) : (
                <form
                  action="https://formsubmit.co/subhasankarpanda16@gmail.com"
                  method="POST"
                  className="bg-zinc-900/60 border border-violet-500/20 rounded-2xl p-8 flex flex-col gap-5"
                  onSubmit={() => setSent(true)}
                >
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-zinc-500 uppercase tracking-wider">Full Name</label>
                    <input type="text" name="Name" placeholder="Your name..." required
                      className="bg-zinc-800/60 border border-zinc-700 text-white rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-violet-500 transition-colors placeholder-zinc-600" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-zinc-500 uppercase tracking-wider">Email</label>
                    <input type="email" name="Email" placeholder="your@email.com" required
                      className="bg-zinc-800/60 border border-zinc-700 text-white rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-violet-500 transition-colors placeholder-zinc-600" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-zinc-500 uppercase tracking-wider">Message</label>
                    <textarea name="message" placeholder="Your message..." rows={5} required
                      className="bg-zinc-800/60 border border-zinc-700 text-white rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-violet-500 transition-colors placeholder-zinc-600 resize-none" />
                  </div>
                  <button type="submit"
                    className="w-full font-mono text-sm bg-violet-600 hover:bg-violet-500 text-white rounded-full py-3 transition-all duration-300 hover:shadow-lg hover:shadow-violet-600/30">
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-violet-500/10 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono font-bold text-white">SSP<span className="text-violet-400">_</span></span>
        <span className="font-mono text-xs text-zinc-600">// Built with React · Tailwind · Vite</span>
        <span className="font-mono text-xs text-zinc-600">© 2025 Subha Sankar Panda</span>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    // Inject keyframes
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Syne:wght@700;800&display=swap');
      @keyframes fadeInUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeInLeft { from { opacity:0; transform:translateX(-12px); } to { opacity:1; transform:translateX(0); } }
      @keyframes shine { from { background-position:200% center; } to { background-position:-200% center; } }
      body { background: #09090b; color: #e4e4e7; }
      html { scroll-behavior: smooth; }
      ::-webkit-scrollbar { width: 6px; } 
      ::-webkit-scrollbar-track { background: #09090b; } 
      ::-webkit-scrollbar-thumb { background: #7c3aed; border-radius: 3px; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ fontFamily: "'JetBrains Mono', monospace", background: "#09090b", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
