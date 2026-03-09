import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const THEMES = {
  green: { name: "Phosphor Green", primary: "#00ff41", dim: "#00cc33", glow: "rgba(0,255,65,0.15)", glowS: "rgba(0,255,65,0.4)", bg: "#050805", bg2: "#0a0f0a", bg3: "#0f150f", text: "#d8f0d8", gray: "#3a5a3a", grayL: "#7aaa7a" },
  amber: { name: "Amber CRT", primary: "#ffb000", dim: "#cc8d00", glow: "rgba(255,176,0,0.15)", glowS: "rgba(255,176,0,0.4)", bg: "#080600", bg2: "#0f0c03", bg3: "#151108", text: "#f5ecd0", gray: "#5a4a2a", grayL: "#aa9a5a" },
  white: { name: "White Phosphor", primary: "#d4d4d4", dim: "#999", glow: "rgba(200,200,200,0.1)", glowS: "rgba(200,200,200,0.3)", bg: "#060606", bg2: "#0c0c0c", bg3: "#121212", text: "#e8e8e8", gray: "#444", grayL: "#888" },
};

const ABOUT = { bio: ["CS student at AUST focused on AI systems, full-stack dev, and building software that solves real problems.", "Trained AI models at Invisible Technologies, built frontend components professionally, shipped expo-winning projects.", "Dual Lebanese-American nationality. Three languages. Advanced across all digital competency dimensions."], details: [["Location", "Zahle, Lebanon"], ["Degree", "B.S. CS \u2014 AUST (2023\u20132026)"], ["Languages", "Arabic (Native) \u00b7 English (C2) \u00b7 French (B1)"], ["Nationality", "Lebanese \u00b7 American"], ["GitHub", "github.com/georgekhayat", "https://github.com/georgekhayat"], ["LinkedIn", "in/georgekhayat2001", "https://linkedin.com/in/georgekhayat2001"]] };

const EXP = [
  { date: "Jul 2025", role: "Web Developer", co: "Custom Digital Solutions, LLC \u00b7 Remote", bl: ["Built front-end components with HTML, CSS, Tailwind.", "Used AI-assisted tools (DeepAgent) to generate and debug code.", "Applied prompt engineering for AI-driven code generation.", "Debugged, tested, and optimized web features."] },
  { date: "Oct\u2013Dec 2024", role: "AI Data Trainer", co: "Invisible Technologies Inc. \u00b7 Remote", bl: ["Trained AI models on complex reasoning and instruction-following.", "Quality control on AI outputs \u2014 accuracy, clarity, reasoning depth.", "Applied reinforcement-style evaluation to improve model behavior.", "Deepened expertise in Python, prompt engineering, AI patterns."] },
  { date: "Jan 2021\u2013Jan 2022", role: "Sales Manager", co: "AutoZone \u00b7 Charleston, USA", bl: ["Managed inventory, POS operations, daily store workflow.", "Assisted customers in parts selection and diagnostics.", "Coordinated with suppliers for stock accuracy."] },
];

const PROJ = [
  { name: "CrashLens", sub: "Smart Crash Reporting", badge: "ACTIVE", feat: true, desc: "End-to-end crash detection ecosystem with video + sensor + location evidence, role-based dashboards, and mobile apps.", tags: ["IoT", "AI", "Dashboards", "Mobile"], link: "https://github.com/TwoFoundersLab/CrashLens" },
  { name: "MysteryPersona Deck", sub: "Digital Brand Platform", badge: "LIVE", desc: "Mystical e-commerce platform where users purchase draws to receive persona cards.", tags: ["E-commerce", "Frontend", "UX"], link: "https://mysterypersona.me" },
  { name: "DFA Minimization", sub: "Hopcroft Algorithm", badge: "ACADEMIC", desc: "GUI-based DFA minimization with step-by-step partition refinement visualization.", tags: ["C++", "Algorithms"], link: "https://github.com/TwoFoundersLab/DFA_Minimization" },
  { name: "Student Mgmt System", sub: "1st Place AUST Expo", badge: "1ST", desc: "Student administration platform with profiles, enrollment, search, role-based access.", tags: ["Java", "SQL", "OOP"] },
  { name: "Library Mgmt System", sub: "2nd Place AUST Expo", badge: "2ND", desc: "Library system with cataloging, availability tracking, borrowing/returns.", tags: ["Java", "MySQL"] },
  { name: "Cryptography", sub: "System Security", badge: "ACADEMIC", desc: "Core cryptography implementations and security protocol exercises.", tags: ["Python", "Security"], link: "https://github.com/TwoFoundersLab/Crypto" },
];

const SKL = { Programming: ["Python", "Java", "C/C++", "JavaScript", "HTML/CSS", "PHP", "C#", "SQL/MySQL", "Git"], "AI & ML": ["Prompt Engineering", "Model Training", "Data Analysis", "Supervised Learning", "NumPy", "Matplotlib"], Security: ["CCNA Routing/Switching", "Network Security", "Linux Admin", "Cybersecurity"], Tools: ["Linux", "VS Code", "Postman", "MySQL Workbench", "Tailwind", "Jupyter"] };

const CERTS = [
  { iss: "CISCO", name: "CCNA: Switching, Routing & Essentials", date: "Jan 2025", ic: "\uD83D\uDD17" },
  { iss: "CISCO", name: "Introduction to Networks", date: "Dec 2024", ic: "\uD83C\uDF10" },
  { iss: "Michigan", name: "Certificate of Proficiency in English", date: "Jul 2024", ic: "\uD83C\uDF93" },
  { iss: "Coursera", name: "Google Cybersecurity Professional", date: "Mar 2024", ic: "\uD83D\uDEE1" },
  { iss: "CISCO", name: "IT Essentials Certificate", date: "Feb 2024", ic: "\uD83D\uDCBB" },
  { iss: "Certiport", name: "IT Specialist Python Certificate", date: "Jan 2024", ic: "\uD83D\uDC0D" },
];

const LINKS = [
  { ic: "\u2709", lb: "Email", val: "khayatgeorge01@gmail.com", href: "mailto:khayatgeorge01@gmail.com" },
  { ic: "in", lb: "LinkedIn", val: "linkedin.com/in/georgekhayat2001", href: "https://linkedin.com/in/georgekhayat2001" },
  { ic: "\u2325", lb: "GitHub", val: "github.com/georgekhayat", href: "https://github.com/georgekhayat" },
  { ic: "\u260E", lb: "Phone", val: "(+961) 76 809 380", href: "tel:+96176809380" },
];

const TSENT = ["The quick brown fox jumps over the lazy dog.", "sudo apt-get install hacking-skills --force", "git commit -m 'fixed everything trust me'", "while(true) { coffee++; bugs--; }", "SELECT * FROM skills WHERE level = 'expert';", "First solve the problem then write the code.", "Talk is cheap show me the code"];

/* ============= PARTICLES ============= */
function Particles({ theme }) {
  const ref = useRef(null);
  const t = THEMES[theme];
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let W, H, pts, af;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    pts = Array.from({ length: 50 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.5, a: Math.random() * 0.3 + 0.08 }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = t.primary; ctx.globalAlpha = p.a; ctx.fill(); });
      ctx.globalAlpha = 0.04; ctx.strokeStyle = t.primary; ctx.lineWidth = 0.5;
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y; if (dx * dx + dy * dy < 15000) { ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); } }
      ctx.globalAlpha = 1; af = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(af); window.removeEventListener("resize", resize); };
  }, [theme]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ============= BOOT SCREEN ============= */
function Boot({ onDone, theme }) {
  const [lines, setLines] = useState([]);
  const [prog, setProg] = useState(0);
  const [phase, setPhase] = useState("bios");
  const t = THEMES[theme];

  useEffect(() => {
    const bl = [
      [" ██████╗ ██╗  ██╗", 0], ["██╔════╝ ██║ ██╔╝", 30], ["██║  ███╗█████╔╝ ", 60],
      ["██║   ██║██╔═██╗ ", 90], ["╚██████╔╝██║  ██╗", 120], [" ╚═════╝ ╚═╝  ╚═╝", 150],
      ["", 200], ["GeorgeOS v1.0.0 \u2014 Portfolio Edition", 350],
      ["(c) 2025 TwoFoundersLab", 500], ["", 600],
      ["POST: CPU .......... Ambition i9 @ MAX GHz   [ OK ]", 750],
      ["POST: RAM .......... 32GB DDR5 Creativity     [ OK ]", 950],
      ["POST: GPU .......... RTX 4090 Vision          [ OK ]", 1150],
      ["POST: NVMe ......... 2TB Projects SSD         [ OK ]", 1350],
      ["", 1450], ["Loading kernel modules:", 1550],
      ["  > crash_detection.ko .............. loaded", 1700],
      ["  > ai_training.ko .................. loaded", 1850],
      ["  > fullstack_engine.ko ............. loaded", 2000],
      ["  > portfolio_renderer.ko ........... loaded", 2150],
      ["", 2300], ["Initializing desktop ...", 2400],
    ];
    bl.forEach(([text, d]) => setTimeout(() => setLines(p => [...p, text]), d));
    setTimeout(() => setPhase("loading"), 2600);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 6 + 3;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => setPhase("welcome"), 300); setTimeout(onDone, 1500); }
      setProg(Math.min(p, 100));
    }, 60);
    return () => clearInterval(iv);
  }, [onDone]);

  const bw = Math.round(prog / 2);
  const bar = "\u2588".repeat(bw) + "\u2591".repeat(50 - bw);

  return (
    <div style={{ position: "fixed", inset: 0, background: t.bg, color: t.primary, fontFamily: "'Courier New',monospace", fontSize: "12px", padding: "30px", zIndex: 10000, display: "flex", flexDirection: "column", justifyContent: phase === "welcome" ? "center" : "flex-start", alignItems: phase === "welcome" ? "center" : "flex-start", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, ${t.glow} 0%, transparent 70%)`, pointerEvents: "none" }} />
      {phase === "bios" && <div style={{ position: "relative", zIndex: 2 }}>{lines.map((l, i) => <div key={i} style={{ minHeight: "16px", whiteSpace: "pre", opacity: l.includes("OK") || l.includes("loaded") ? 0.7 : 1, fontSize: i < 6 ? "11px" : "12px" }}>{l}</div>)}</div>}
      {phase === "loading" && <div style={{ position: "relative", zIndex: 2, textAlign: "center", width: "100%", marginTop: "25vh" }}><div style={{ fontSize: "11px", letterSpacing: "8px", opacity: 0.4, marginBottom: "12px" }}>GEORGE OS</div><div style={{ fontSize: "40px", fontWeight: "bold", letterSpacing: "8px", textShadow: `0 0 30px ${t.glowS}`, marginBottom: "30px" }}>LOADING</div><div style={{ fontSize: "11px", opacity: 0.8, marginBottom: "6px" }}>[{bar}]</div><div style={{ fontSize: "12px", opacity: 0.5 }}>{Math.round(prog)}%</div></div>}
      {phase === "welcome" && <div style={{ position: "relative", zIndex: 2, textAlign: "center", animation: "gFade 0.6s ease" }}><div style={{ fontSize: "56px", fontWeight: "bold", letterSpacing: "12px", textShadow: `0 0 40px ${t.glowS}`, marginBottom: "8px" }}>GK</div><div style={{ fontSize: "13px", letterSpacing: "6px", opacity: 0.4 }}>SYSTEM READY</div></div>}
    </div>
  );
}

/* ============= DRAGGABLE WINDOW ============= */
function Win({ id, title, icon, children, x, y, w, h, zIndex, active, min, onFocus, onClose, onMin, onDrag, theme }) {
  const t = THEMES[theme];
  const [drag, setDrag] = useState(false);
  const [off, setOff] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 20); }, []);

  const md = (e) => { if (e.target.closest(".wb")) return; setDrag(true); setOff({ x: e.clientX - x, y: e.clientY - y }); onFocus(id); };
  useEffect(() => { if (!drag) return; const mv = (e) => onDrag(id, e.clientX - off.x, e.clientY - off.y); const up = () => setDrag(false); window.addEventListener("mousemove", mv); window.addEventListener("mouseup", up); return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); }; }, [drag, off, id, onDrag]);

  if (min) return null;
  return (
    <div onClick={() => onFocus(id)} style={{ position: "absolute", left: x, top: y, width: w, minHeight: h, zIndex, display: "flex", flexDirection: "column", border: `1px solid ${active ? t.primary + "80" : t.gray + "50"}`, background: `${t.bg2}f0`, backdropFilter: "blur(8px)", boxShadow: active ? `0 0 1px ${t.primary}, 0 0 20px ${t.glow}, 0 8px 32px rgba(0,0,0,0.7)` : `0 4px 20px rgba(0,0,0,0.5)`, maxHeight: "82vh", overflow: "hidden", opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.95)", transition: "opacity 0.2s, transform 0.2s, box-shadow 0.25s" }}>
      {active && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${t.primary}, transparent)` }} />}
      <div onMouseDown={md} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: active ? `linear-gradient(180deg, ${t.primary}12, transparent)` : t.bg3, borderBottom: `1px solid ${active ? t.primary + "30" : t.gray + "25"}`, cursor: "grab", userSelect: "none", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontFamily: "'Courier New',monospace", color: active ? t.primary : t.grayL }}><span>{icon}</span><span>{title}</span></div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="wb" onClick={(e) => { e.stopPropagation(); onMin(id); }} style={{ width: 18, height: 18, border: `1px solid ${t.gray}60`, borderRadius: 2, background: "transparent", color: t.grayL, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", padding: 0 }} aria-label="Minimize">_</button>
          <button className="wb" onClick={(e) => { e.stopPropagation(); onClose(id); }} style={{ width: 18, height: 18, border: `1px solid ${t.gray}60`, borderRadius: 2, background: "transparent", color: "#ff5555", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace", padding: 0 }} aria-label="Close">{"\u00d7"}</button>
        </div>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, color: t.text, fontFamily: "'Courier New',monospace", fontSize: 13, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

/* ============= TERMINAL ============= */
function Term({ theme, openWin, setTheme }) {
  const t = THEMES[theme];
  const [hist, setHist] = useState([{ tp: "sys", tx: "GeorgeOS Terminal v1.0 \u2014 Type 'help' for commands." }]);
  const [inp, setInp] = useState("");
  const [ch, setCh] = useState([]);
  const [ci, setCi] = useState(-1);
  const bRef = useRef(null);
  const iRef = useRef(null);
  useEffect(() => { bRef.current?.scrollIntoView({ behavior: "smooth" }); }, [hist]);

  const add = (arr) => setHist(h => [...h, ...arr]);
  const wids = ["about", "experience", "projects", "skills", "certs", "contact", "guestbook", "settings", "snake", "matrix", "typing", "minesweeper"];

  const exec = (raw) => {
    const s = raw.trim(); if (!s) return;
    const parts = s.split(" "); const cmd = parts[0].toLowerCase(); const args = parts.slice(1).join(" ").toLowerCase();
    setHist(h => [...h, { tp: "in", tx: "> " + s }]); setCh(h => [s, ...h]); setCi(-1);

    if (cmd === "help") { add([{ tp: "out", tx: "  NAVIGATION: about, experience, projects, skills, certs, contact" }, { tp: "out", tx: "  GAMES: snake, matrix, typing, minesweeper" }, { tp: "out", tx: "  SYSTEM: whoami, neofetch, theme <name>, clear, exit, sudo, ls" }, { tp: "out", tx: "  Use: open <window> to open any window" }]); return; }
    if (cmd === "whoami") { add([{ tp: "ok", tx: "georges@portfolio \u2014 CS Student | Dev | AI | Builder" }]); return; }
    if (cmd === "neofetch") { add([{ tp: "out", tx: "  OS: GeorgeOS v1.0  |  Host: Portfolio Desktop" }, { tp: "out", tx: "  Uptime: since 2001  |  Shell: GK Terminal" }, { tp: "out", tx: "  Theme: " + THEMES[theme].name + "  |  Certs: 6  |  Projects: 6" }]); return; }
    if (cmd === "ls") { add([{ tp: "out", tx: "about.md  experience.log  projects/  skills.json  certs.md  contact.sh  games/" }]); return; }
    if (cmd === "pwd") { add([{ tp: "out", tx: "/home/georges/portfolio" }]); return; }
    if (cmd === "date") { add([{ tp: "out", tx: new Date().toString() }]); return; }
    if (cmd === "sudo") { add([{ tp: "err", tx: "Permission denied. Nice try." }, { tp: "out", tx: "George appreciates the ambition." }]); return; }
    if (cmd === "clear") { setHist([{ tp: "sys", tx: "Terminal cleared." }]); return; }
    if (cmd === "exit") { openWin(null, "terminal"); return; }
    if (cmd === "echo") { add([{ tp: "out", tx: parts.slice(1).join(" ") || "" }]); return; }
    if (cmd === "theme" && THEMES[args]) { setTheme(args); add([{ tp: "ok", tx: "Theme changed to " + THEMES[args].name }]); return; }
    if (cmd === "theme") { add([{ tp: "err", tx: "Themes: green, amber, white" }]); return; }
    if (cmd === "open" && wids.includes(args)) { openWin(args); add([{ tp: "ok", tx: "Opening " + args + "..." }]); return; }
    if (wids.includes(cmd)) { openWin(cmd); add([{ tp: "ok", tx: "Opening " + cmd + "..." }]); return; }
    add([{ tp: "err", tx: "Command not found: " + cmd + ". Type 'help'." }]);
  };

  const hk = (e) => {
    if (e.key === "Enter") { exec(inp); setInp(""); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (ch.length) { const i = Math.min(ci + 1, ch.length - 1); setCi(i); setInp(ch[i]); } }
    else if (e.key === "ArrowDown") { e.preventDefault(); if (ci > 0) { setCi(ci - 1); setInp(ch[ci - 1]); } else { setCi(-1); setInp(""); } }
  };

  const cols = { in: t.primary, out: t.text, ok: t.primary, err: "#ff5555", sys: t.grayL };
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }} onClick={() => iRef.current?.focus()}>
      <div style={{ flex: 1, overflow: "auto", marginBottom: 8 }}>{hist.map((h, i) => <div key={i} style={{ color: cols[h.tp], whiteSpace: "pre-wrap", fontSize: 12, lineHeight: 1.5 }}>{h.tx}</div>)}<div ref={bRef} /></div>
      <div style={{ display: "flex", alignItems: "center", borderTop: `1px solid ${t.gray}30`, paddingTop: 8 }}>
        <span style={{ color: t.primary, marginRight: 8, fontSize: 13 }}>{"\u276f"}</span>
        <input ref={iRef} value={inp} onChange={e => setInp(e.target.value)} onKeyDown={hk} autoFocus style={{ flex: 1, background: "transparent", border: "none", color: t.text, fontFamily: "'Courier New',monospace", fontSize: 12, outline: "none", caretColor: t.primary }} />
      </div>
    </div>
  );
}

/* ============= GAMES ============= */
function Snake({ theme }) {
  const t = THEMES[theme]; const ref = useRef(null); const [sc, setSc] = useState(0); const [over, setOver] = useState(false); const [on, setOn] = useState(false);
  const st = useRef({ sn: [{ x: 10, y: 10 }], d: { x: 1, y: 0 }, f: { x: 15, y: 10 }, nd: { x: 1, y: 0 } });
  const G = 20, C = 14;
  const reset = () => { st.current = { sn: [{ x: 10, y: 10 }], d: { x: 1, y: 0 }, f: { x: Math.floor(Math.random() * G), y: Math.floor(Math.random() * G) }, nd: { x: 1, y: 0 } }; setSc(0); setOver(false); setOn(true); };
  useEffect(() => {
    if (!on || over) return;
    const cv = ref.current, ctx = cv.getContext("2d");
    const hk = (e) => { const m = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 } }[e.key]; if (m && !(m.x === -st.current.d.x && m.y === -st.current.d.y)) { st.current.nd = m; e.preventDefault(); } };
    window.addEventListener("keydown", hk);
    const iv = setInterval(() => {
      const s = st.current; s.d = s.nd; const hd = { x: s.sn[0].x + s.d.x, y: s.sn[0].y + s.d.y };
      if (hd.x < 0 || hd.x >= G || hd.y < 0 || hd.y >= G || s.sn.some(p => p.x === hd.x && p.y === hd.y)) { setOver(true); return; }
      s.sn.unshift(hd); if (hd.x === s.f.x && hd.y === s.f.y) { setSc(v => v + 10); s.f = { x: Math.floor(Math.random() * G), y: Math.floor(Math.random() * G) }; } else s.sn.pop();
      ctx.fillStyle = t.bg; ctx.fillRect(0, 0, G * C, G * C);
      s.sn.forEach((p, i) => { ctx.fillStyle = i === 0 ? t.primary : t.dim; ctx.fillRect(p.x * C + 1, p.y * C + 1, C - 2, C - 2); });
      ctx.fillStyle = "#ff4444"; ctx.fillRect(s.f.x * C + 2, s.f.y * C + 2, C - 4, C - 4);
    }, 110);
    return () => { window.removeEventListener("keydown", hk); clearInterval(iv); };
  }, [on, over, theme]);
  return (<div style={{ textAlign: "center" }}><div style={{ color: t.primary, marginBottom: 10, fontSize: 13, letterSpacing: 2 }}>SNAKE {sc} pts</div><canvas ref={ref} width={G * C} height={G * C} style={{ border: `1px solid ${t.gray}60`, display: "block", margin: "0 auto" }} />{(!on || over) && <div style={{ marginTop: 14 }}>{over && <div style={{ color: "#ff5555", marginBottom: 8 }}>GAME OVER</div>}<button onClick={reset} style={{ padding: "6px 20px", background: t.primary + "15", border: `1px solid ${t.primary}`, color: t.primary, cursor: "pointer", fontFamily: "'Courier New',monospace", fontSize: 12 }}>{over ? "Retry" : "Start"}</button><div style={{ color: t.grayL, fontSize: 10, marginTop: 8 }}>Arrow keys</div></div>}</div>);
}

function Matrix({ theme }) {
  const t = THEMES[theme]; const ref = useRef(null);
  useEffect(() => { const c = ref.current, ctx = c.getContext("2d"), W = 400, H = 280; c.width = W; c.height = H; const cols = Math.floor(W / 14), drops = Array(cols).fill(1); const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>@#$%"; const draw = () => { ctx.fillStyle = "rgba(0,0,0,0.04)"; ctx.fillRect(0, 0, W, H); ctx.fillStyle = t.primary; ctx.font = "13px monospace"; for (let i = 0; i < drops.length; i++) { ctx.globalAlpha = Math.random() * 0.5 + 0.5; ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, drops[i] * 14); ctx.globalAlpha = 1; if (drops[i] * 14 > H && Math.random() > 0.975) drops[i] = 0; drops[i]++; } }; const iv = setInterval(draw, 40); return () => clearInterval(iv); }, [theme]);
  return (<div style={{ textAlign: "center" }}><canvas ref={ref} style={{ border: `1px solid ${t.gray}40`, display: "block", margin: "0 auto", width: "100%", maxWidth: 400 }} /><div style={{ color: t.grayL, fontSize: 10, marginTop: 8, letterSpacing: 3 }}>WAKE UP NEO...</div></div>);
}

function Typing({ theme }) {
  const t = THEMES[theme]; const [sent, setSent] = useState(""); const [inp, setInp] = useState(""); const [on, setOn] = useState(false); const [done, setDone] = useState(false); const [st, setSt] = useState(0); const [wpm, setWpm] = useState(0); const [acc, setAcc] = useState(0); const ir = useRef(null);
  const begin = () => { setSent(TSENT[Math.floor(Math.random() * TSENT.length)]); setInp(""); setOn(true); setDone(false); setSt(Date.now()); setTimeout(() => ir.current?.focus(), 50); };
  const hi = (e) => { const v = e.target.value; setInp(v); if (v.length >= sent.length) { const el = (Date.now() - st) / 60000; setWpm(Math.round(sent.split(" ").length / el)); let ok = 0; for (let i = 0; i < sent.length; i++) if (v[i] === sent[i]) ok++; setAcc(Math.round(ok / sent.length * 100)); setDone(true); } };
  return (<div><div style={{ color: t.primary, marginBottom: 12, fontSize: 13, letterSpacing: 2 }}>TYPING TEST</div>{!on ? <button onClick={begin} style={{ padding: "8px 24px", background: t.primary + "15", border: `1px solid ${t.primary}`, color: t.primary, cursor: "pointer", fontFamily: "'Courier New',monospace" }}>Begin</button> : <div><div style={{ padding: 14, background: t.bg, border: `1px solid ${t.gray}40`, marginBottom: 12, fontSize: 15, lineHeight: 1.8 }}>{sent.split("").map((ch, i) => { let c = t.gray; if (i < inp.length) c = inp[i] === ch ? t.primary : "#ff5555"; return <span key={i} style={{ color: c, background: i === inp.length ? t.primary + "30" : "transparent" }}>{ch}</span>; })}</div><input ref={ir} value={inp} onChange={hi} disabled={done} autoFocus style={{ width: "100%", padding: 10, background: t.bg, border: `1px solid ${t.gray}60`, color: t.text, fontFamily: "'Courier New',monospace", fontSize: 13, outline: "none" }} />{done && <div style={{ marginTop: 16, padding: 14, background: t.primary + "08", border: `1px solid ${t.primary}40`, textAlign: "center" }}><div style={{ color: t.primary, fontSize: 28, fontWeight: "bold" }}>{wpm} WPM</div><div style={{ color: t.text, fontSize: 13, marginTop: 4 }}>Accuracy: {acc}%</div><button onClick={begin} style={{ marginTop: 12, padding: "6px 20px", background: t.primary + "15", border: `1px solid ${t.primary}`, color: t.primary, cursor: "pointer", fontFamily: "'Courier New',monospace", fontSize: 12 }}>Again</button></div>}</div>}</div>);
}

function Mines({ theme }) {
  const t = THEMES[theme]; const R = 9, CL = 9, M = 10;
  const mk = () => { const b = Array.from({ length: R }, () => Array.from({ length: CL }, () => ({ m: false, r: false, f: false, a: 0 }))); let p = 0; while (p < M) { const r = Math.floor(Math.random() * R), c = Math.floor(Math.random() * CL); if (!b[r][c].m) { b[r][c].m = true; p++; } } for (let r = 0; r < R; r++) for (let c = 0; c < CL; c++) { if (b[r][c].m) continue; let n = 0; for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) { const nr = r + dr, nc = c + dc; if (nr >= 0 && nr < R && nc >= 0 && nc < CL && b[nr][nc].m) n++; } b[r][c].a = n; } return b; };
  const [bd, setBd] = useState(() => mk()); const [ov, setOv] = useState(false); const [won, setWon] = useState(false);
  const reveal = (r, c) => { if (ov || won) return; const nb = bd.map(rw => rw.map(cl => ({ ...cl }))); if (nb[r][c].f || nb[r][c].r) return; if (nb[r][c].m) { nb.forEach(rw => rw.forEach(cl => { if (cl.m) cl.r = true; })); setBd(nb); setOv(true); return; } const fl = (r, c) => { if (r < 0 || r >= R || c < 0 || c >= CL || nb[r][c].r || nb[r][c].f || nb[r][c].m) return; nb[r][c].r = true; if (nb[r][c].a === 0) for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) fl(r + dr, c + dc); }; fl(r, c); if (nb.flat().filter(c => !c.r && !c.m).length === 0) setWon(true); setBd(nb); };
  const flag = (e, r, c) => { e.preventDefault(); if (ov || won || bd[r][c].r) return; const nb = bd.map(rw => rw.map(cl => ({ ...cl }))); nb[r][c].f = !nb[r][c].f; setBd(nb); };
  const rst = () => { setBd(mk()); setOv(false); setWon(false); };
  const nc = ["transparent", "#4488ff", t.primary, "#ff5555", "#aa55ff", "#884400", "#44aaaa", t.text, t.grayL];
  return (<div style={{ textAlign: "center" }}><div style={{ color: t.primary, marginBottom: 10, fontSize: 13, letterSpacing: 2 }}>MINESWEEPER {won ? "WIN!" : ov ? "BOOM!" : ""}</div><div style={{ display: "inline-grid", gridTemplateColumns: `repeat(${CL}, 28px)`, gap: 1, background: t.gray + "20", border: `1px solid ${t.gray}50`, padding: 2 }}>{bd.map((rw, r) => rw.map((cl, c) => <button key={r + "-" + c} onClick={() => reveal(r, c)} onContextMenu={e => flag(e, r, c)} style={{ width: 28, height: 28, border: "none", background: cl.r ? (cl.m ? "#ff555520" : t.bg) : t.bg3, color: cl.r && cl.a > 0 ? nc[cl.a] : t.text, fontFamily: "'Courier New',monospace", fontSize: 12, fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>{cl.f && !cl.r ? "\u2691" : cl.r ? (cl.m ? "\u2731" : cl.a > 0 ? cl.a : "") : ""}</button>))}</div><div style={{ marginTop: 10 }}><button onClick={rst} style={{ padding: "5px 16px", background: t.primary + "15", border: `1px solid ${t.primary}`, color: t.primary, cursor: "pointer", fontFamily: "'Courier New',monospace", fontSize: 11 }}>New Game</button><div style={{ color: t.grayL, fontSize: 10, marginTop: 6 }}>Left: reveal / Right: flag</div></div></div>);
}

/* ============= WINDOW CONTENTS ============= */
function WAbout({ theme }) { const t = THEMES[theme]; return (<div><div style={{ color: t.primary, fontSize: 10, letterSpacing: 2, opacity: 0.4, marginBottom: 12 }}>// README.md</div><div style={{ color: t.primary, fontSize: 16, marginBottom: 16 }}>Building things that <em style={{ color: t.text, fontStyle: "italic" }}>actually work</em>.</div>{ABOUT.bio.map((p, i) => <p key={i} style={{ marginBottom: 12, opacity: 0.8, fontSize: 12 }}>{p}</p>)}<div style={{ marginTop: 20, borderTop: `1px solid ${t.gray}30`, paddingTop: 16 }}>{ABOUT.details.map(([k, v, link], i) => <div key={i} style={{ display: "flex", gap: 16, marginBottom: 6 }}><span style={{ color: t.primary, minWidth: 100, fontSize: 11 }}>{k}</span>{link ? <a href={link} target="_blank" rel="noreferrer" style={{ color: t.text, fontSize: 12, textDecoration: "none", borderBottom: `1px dashed ${t.gray}60` }}>{v}</a> : <span style={{ color: t.grayL, fontSize: 12 }}>{v}</span>}</div>)}</div></div>); }

function WExp({ theme }) { const t = THEMES[theme]; return (<div><div style={{ color: t.primary, fontSize: 10, letterSpacing: 2, opacity: 0.4, marginBottom: 16 }}>// work_log.txt</div>{EXP.map((j, i) => <div key={i} style={{ marginBottom: 24, paddingLeft: 14, borderLeft: `2px solid ${t.primary}30` }}><div style={{ color: t.grayL, fontSize: 11 }}>{j.date}</div><div style={{ color: t.primary, fontSize: 14, fontWeight: "bold", margin: "4px 0" }}>{j.role}</div><div style={{ color: t.grayL, fontSize: 11, marginBottom: 10 }}>{j.co}</div>{j.bl.map((b, k) => <div key={k} style={{ marginBottom: 4, paddingLeft: 14, position: "relative", opacity: 0.8, fontSize: 11 }}><span style={{ color: t.primary, position: "absolute", left: 0 }}>{"\u25b8"}</span>{b}</div>)}</div>)}</div>); }

function WProj({ theme }) { const t = THEMES[theme]; return (<div><div style={{ color: t.primary, fontSize: 10, letterSpacing: 2, opacity: 0.4, marginBottom: 16 }}>// git log</div>{PROJ.map((p, i) => <div key={i} style={{ marginBottom: 14, padding: 14, border: `1px solid ${p.feat ? t.primary + "40" : t.gray + "25"}`, background: p.feat ? t.primary + "06" : "transparent" }}><span style={{ fontSize: 9, padding: "2px 7px", border: `1px solid ${t.primary}50`, color: t.primary, letterSpacing: 1 }}>{p.badge}</span><div style={{ color: t.primary, fontSize: 13, fontWeight: "bold", marginTop: 6 }}>{p.name} <span style={{ color: t.grayL, fontWeight: "normal", fontSize: 11 }}>{p.sub}</span></div><p style={{ color: t.grayL, fontSize: 11, margin: "6px 0 8px", lineHeight: 1.5 }}>{p.desc}</p><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{p.tags.map((tg, j) => <span key={j} style={{ fontSize: 9, padding: "2px 6px", background: t.primary + "10", border: `1px solid ${t.primary}18`, color: t.primary }}>{tg}</span>)}</div>{p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: t.primary, fontSize: 11, display: "inline-block", marginTop: 8, textDecoration: "none" }}>{"\u2192"} View</a>}</div>)}</div>); }

function WSkl({ theme }) { const t = THEMES[theme]; return (<div><div style={{ color: t.primary, fontSize: 10, letterSpacing: 2, opacity: 0.4, marginBottom: 16 }}>// skills.json</div>{Object.entries(SKL).map(([g, items]) => <div key={g} style={{ marginBottom: 16 }}><div style={{ color: t.primary, fontSize: 12, fontWeight: "bold", marginBottom: 8, paddingBottom: 4, borderBottom: `1px solid ${t.primary}20` }}>{g}</div><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{items.map((s, i) => <span key={i} style={{ fontSize: 10, padding: "3px 8px", background: t.primary + "10", border: `1px solid ${t.primary}18`, color: t.text }}>{s}</span>)}</div></div>)}</div>); }

function WCert({ theme }) { const t = THEMES[theme]; return (<div><div style={{ color: t.primary, fontSize: 10, letterSpacing: 2, opacity: 0.4, marginBottom: 16 }}>// credentials.md</div>{CERTS.map((c, i) => <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, padding: 10, border: `1px solid ${t.gray}25` }}><span style={{ fontSize: 18 }}>{c.ic}</span><div><div style={{ color: t.grayL, fontSize: 10 }}>{c.iss}</div><div style={{ color: t.primary, fontSize: 12, fontWeight: "bold" }}>{c.name}</div><div style={{ color: t.grayL, fontSize: 10 }}>{c.date}</div></div></div>)}<div style={{ marginTop: 16, padding: 10, background: t.primary + "08", borderLeft: `3px solid ${t.primary}` }}>{"\uD83C\uDFC6"} <strong style={{ color: t.primary }}>Honor's List</strong> {"\u2014"} Fall 2023, Spring 2024, Fall 2024</div></div>); }

function WContact({ theme }) { const t = THEMES[theme]; return (<div><div style={{ color: t.primary, fontSize: 15, marginBottom: 8 }}>Let's build something <em style={{ color: t.text, fontStyle: "italic" }}>worth shipping</em>.</div><p style={{ opacity: 0.6, marginBottom: 18, fontSize: 12 }}>Available for freelance, collaborations, opportunities.</p>{LINKS.map((l, i) => <a key={i} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, marginBottom: 6, border: `1px solid ${t.gray}30`, textDecoration: "none", color: t.text }}><span style={{ color: t.primary, fontSize: 15, width: 22, textAlign: "center" }}>{l.ic}</span><div><div style={{ fontSize: 9, color: t.grayL }}>{l.lb}</div><div style={{ fontSize: 12 }}>{l.val}</div></div></a>)}</div>); }

function WGuest({ theme, entries, onAdd }) { const t = THEMES[theme]; const [nm, setNm] = useState(""); const [mg, setMg] = useState(""); const sub = () => { if (nm.trim() && mg.trim()) { onAdd({ nm: nm.trim(), mg: mg.trim(), tm: new Date().toLocaleString() }); setNm(""); setMg(""); } }; return (<div><div style={{ color: t.primary, fontSize: 10, letterSpacing: 2, opacity: 0.4, marginBottom: 12 }}>// guestbook.log</div><input value={nm} onChange={e => setNm(e.target.value)} placeholder="Your name..." style={{ width: "100%", padding: 8, marginBottom: 6, background: t.bg, border: `1px solid ${t.gray}50`, color: t.text, fontFamily: "'Courier New',monospace", fontSize: 12, outline: "none" }} /><textarea value={mg} onChange={e => setMg(e.target.value)} placeholder="Leave a message..." rows={3} style={{ width: "100%", padding: 8, marginBottom: 8, background: t.bg, border: `1px solid ${t.gray}50`, color: t.text, fontFamily: "'Courier New',monospace", fontSize: 12, outline: "none", resize: "vertical" }} /><button onClick={sub} style={{ padding: "6px 18px", background: t.primary + "15", border: `1px solid ${t.primary}`, color: t.primary, cursor: "pointer", fontFamily: "'Courier New',monospace", fontSize: 11, marginBottom: 16 }}>Sign</button>{entries.length === 0 && <div style={{ opacity: 0.3, fontSize: 12 }}>No entries yet. Be the first!</div>}{entries.map((e, i) => <div key={i} style={{ padding: 10, marginBottom: 6, borderLeft: `2px solid ${t.primary}30`, background: t.primary + "04" }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ color: t.primary, fontWeight: "bold", fontSize: 11 }}>{e.nm}</span><span style={{ color: t.grayL, fontSize: 9 }}>{e.tm}</span></div><div style={{ fontSize: 11, opacity: 0.8 }}>{e.mg}</div></div>)}</div>); }

function WSet({ theme, setTheme }) { const t = THEMES[theme]; return (<div><div style={{ color: t.primary, fontSize: 10, letterSpacing: 2, opacity: 0.4, marginBottom: 16 }}>// settings.conf</div><div style={{ color: t.primary, marginBottom: 12, fontSize: 14 }}>Terminal Theme</div>{Object.entries(THEMES).map(([k, v]) => <button key={k} onClick={() => setTheme(k)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 14px", marginBottom: 6, background: theme === k ? v.primary + "15" : "transparent", border: `1px solid ${theme === k ? v.primary + "60" : t.gray + "30"}`, cursor: "pointer", color: t.text, fontFamily: "'Courier New',monospace", fontSize: 12, textAlign: "left" }}><span style={{ width: 14, height: 14, background: v.primary, display: "inline-block" }} /><span>{v.name}</span>{theme === k && <span style={{ marginLeft: "auto", color: v.primary, fontSize: 10 }}>{"\u25cf"} ACTIVE</span>}</button>)}</div>); }

/* ============= SCROLL MODE ============= */
function ScrollView({ theme, setTheme, onSwitch }) {
  const t = THEMES[theme];
  const [vis, setVis] = useState(new Set());
  useEffect(() => { const obs = new IntersectionObserver(es => { es.forEach(e => { if (e.isIntersecting) setVis(v => new Set([...v, e.target.dataset.s])); }); }, { threshold: 0.15 }); document.querySelectorAll("[data-s]").forEach(el => obs.observe(el)); return () => obs.disconnect(); }, []);
  const v = (id) => vis.has(id);
  const an = (id, dl = 0) => ({ opacity: v(id) ? 1 : 0, transform: v(id) ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.6s ease ${dl}s, transform 0.6s ease ${dl}s` });

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: "'Courier New',monospace", fontSize: 14, lineHeight: 1.7, minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: `${t.bg}ee`, borderBottom: `1px solid ${t.primary}15`, backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span style={{ color: t.primary, fontSize: 16, fontWeight: "bold", letterSpacing: 3, textShadow: `0 0 10px ${t.glow}` }}>GK</span><span style={{ color: t.grayL, fontSize: 11 }}>Georges El Khayat</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {["about", "experience", "projects", "skills", "certs", "contact"].map(s => <a key={s} href={"#s-" + s} style={{ color: t.grayL, textDecoration: "none", fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>{s}</a>)}
          <button onClick={onSwitch} style={{ padding: "4px 12px", background: t.primary + "15", border: `1px solid ${t.primary}60`, color: t.primary, cursor: "pointer", fontFamily: "'Courier New',monospace", fontSize: 10, letterSpacing: 1 }}>{"\u25a0"} OS MODE</button>
          <select value={theme} onChange={e => setTheme(e.target.value)} style={{ background: t.bg2, border: `1px solid ${t.gray}50`, color: t.primary, fontFamily: "'Courier New',monospace", fontSize: 10, padding: "4px 8px", cursor: "pointer", outline: "none" }}>{Object.entries(THEMES).map(([k, vl]) => <option key={k} value={k}>{vl.name}</option>)}</select>
        </div>
      </nav>

      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 60px 80px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${t.glowS} 0%, transparent 50%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 900 }}>
          <div style={{ color: t.grayL, fontSize: 13, letterSpacing: 3, marginBottom: 16, animation: "hF 0.8s ease 0.2s both" }}><span style={{ color: t.primary }}>$</span> whoami</div>
          <h1 style={{ fontSize: "clamp(40px,7vw,72px)", fontWeight: "bold", letterSpacing: -1, lineHeight: 1.1, marginBottom: 20, animation: "hF 0.8s ease 0.4s both" }}><span style={{ color: t.text }}>Georges</span><br /><span style={{ color: t.primary, textShadow: `0 0 30px ${t.glow}` }}>El Khayat</span></h1>
          <div style={{ display: "flex", gap: 12, marginBottom: 24, animation: "hF 0.8s ease 0.6s both" }}>{["Dev", "AI", "CS @ AUST"].map(tg => <span key={tg} style={{ padding: "4px 14px", border: `1px solid ${t.primary}50`, color: t.primary, fontSize: 12, letterSpacing: 1 }}>{tg}</span>)}</div>
          <p style={{ maxWidth: 550, color: t.grayL, fontSize: 14, lineHeight: 1.8, animation: "hF 0.8s ease 0.8s both" }}>Computer Science student, AI data trainer, and full-stack builder. Turning complex problems into clean systems.</p>
          <div style={{ display: "flex", gap: 16, marginTop: 32, animation: "hF 0.8s ease 1s both" }}>
            <a href="#s-projects" style={{ padding: "10px 28px", background: t.primary, color: t.bg, textDecoration: "none", fontFamily: "'Courier New',monospace", fontSize: 13, fontWeight: "bold", letterSpacing: 1, boxShadow: `0 0 20px ${t.glow}` }}>View Projects</a>
            <a href="#s-contact" style={{ padding: "10px 28px", border: `1px solid ${t.primary}60`, color: t.primary, textDecoration: "none", fontFamily: "'Courier New',monospace", fontSize: 13, letterSpacing: 1 }}>Contact</a>
          </div>
          <div style={{ display: "flex", gap: 40, marginTop: 50, animation: "hF 0.8s ease 1.2s both" }}>{[["2x", "Expo Winner"], ["6x", "Certifications"], ["3x", "Honor's List"]].map(([n, l]) => <div key={l}><div style={{ color: t.primary, fontSize: 28, fontWeight: "bold", textShadow: `0 0 15px ${t.glow}` }}>{n}</div><div style={{ color: t.grayL, fontSize: 11, letterSpacing: 1 }}>{l}</div></div>)}</div>
        </div>
      </section>

      {/* About */}
      <section id="s-about" data-s="about" style={{ padding: "80px 60px", maxWidth: 900, margin: "0 auto" }}>
        <div style={an("about")}><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}><div style={{ color: t.primary, fontSize: 12, letterSpacing: 3 }}>01 // About</div><div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${t.primary}40, transparent)` }} /></div></div>
        <div style={{ ...an("about", 0.15), display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 40 }}>
          <div><h3 style={{ color: t.primary, fontSize: 18, marginBottom: 16 }}>Building things that <em style={{ color: t.text, fontStyle: "italic" }}>actually work</em>.</h3>{ABOUT.bio.map((p, i) => <p key={i} style={{ marginBottom: 12, color: t.grayL, fontSize: 13 }}>{p}</p>)}</div>
          <div style={{ borderLeft: `1px solid ${t.gray}30`, paddingLeft: 30 }}>{ABOUT.details.map(([k, vl, link], i) => <div key={i} style={{ marginBottom: 10 }}><div style={{ color: t.primary, fontSize: 10, letterSpacing: 1, marginBottom: 2 }}>{k}</div>{link ? <a href={link} target="_blank" rel="noreferrer" style={{ color: t.text, fontSize: 12, textDecoration: "none", borderBottom: `1px solid ${t.gray}40` }}>{vl}</a> : <div style={{ color: t.grayL, fontSize: 12 }}>{vl}</div>}</div>)}</div>
        </div>
      </section>

      {/* Experience */}
      <section id="s-experience" data-s="exp" style={{ padding: "80px 60px", maxWidth: 900, margin: "0 auto" }}>
        <div style={an("exp")}><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}><div style={{ color: t.primary, fontSize: 12, letterSpacing: 3 }}>02 // Experience</div><div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${t.primary}40, transparent)` }} /></div></div>
        {EXP.map((j, i) => <div key={i} style={{ ...an("exp", 0.1 * (i + 1)), marginBottom: 32, paddingLeft: 20, borderLeft: `2px solid ${t.primary}30`, position: "relative" }}><div style={{ position: "absolute", left: -5, top: 6, width: 8, height: 8, background: t.primary, boxShadow: `0 0 8px ${t.glow}` }} /><div style={{ color: t.grayL, fontSize: 11 }}>{j.date}</div><div style={{ color: t.primary, fontSize: 16, fontWeight: "bold", margin: "4px 0" }}>{j.role}</div><div style={{ color: t.grayL, fontSize: 12, marginBottom: 10 }}>{j.co}</div>{j.bl.map((b, k) => <div key={k} style={{ marginBottom: 4, paddingLeft: 14, position: "relative", color: t.grayL, fontSize: 12 }}><span style={{ color: t.primary, position: "absolute", left: 0 }}>{"\u25b8"}</span>{b}</div>)}</div>)}
      </section>

      {/* Projects */}
      <section id="s-projects" data-s="proj" style={{ padding: "80px 60px", maxWidth: 900, margin: "0 auto" }}>
        <div style={an("proj")}><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}><div style={{ color: t.primary, fontSize: 12, letterSpacing: 3 }}>03 // Projects</div><div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${t.primary}40, transparent)` }} /></div></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{PROJ.map((p, i) => <div key={i} style={{ ...an("proj", 0.08 * (i + 1)), padding: 20, border: `1px solid ${p.feat ? t.primary + "50" : t.gray + "30"}`, background: p.feat ? t.primary + "06" : "transparent", gridColumn: p.feat ? "1 / -1" : "auto", position: "relative", overflow: "hidden" }}>{p.feat && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${t.primary}, transparent)` }} />}<span style={{ fontSize: 10, padding: "2px 8px", border: `1px solid ${t.primary}60`, color: t.primary, letterSpacing: 1 }}>{p.badge}</span><div style={{ color: t.primary, fontSize: 15, fontWeight: "bold", marginTop: 8 }}>{p.name}</div><div style={{ color: t.grayL, fontSize: 11, marginBottom: 8 }}>{p.sub}</div><p style={{ color: t.grayL, fontSize: 12, marginBottom: 12, lineHeight: 1.6 }}>{p.desc}</p><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{p.tags.map((tg, j) => <span key={j} style={{ fontSize: 10, padding: "2px 8px", background: t.primary + "10", border: `1px solid ${t.primary}20`, color: t.primary }}>{tg}</span>)}</div>{p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: t.primary, fontSize: 12, display: "inline-block", marginTop: 10, textDecoration: "none", borderBottom: `1px solid ${t.primary}40` }}>{"\u2192"} View</a>}</div>)}</div>
      </section>

      {/* Skills */}
      <section id="s-skills" data-s="skl" style={{ padding: "80px 60px", maxWidth: 900, margin: "0 auto" }}>
        <div style={an("skl")}><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}><div style={{ color: t.primary, fontSize: 12, letterSpacing: 3 }}>04 // Skills</div><div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${t.primary}40, transparent)` }} /></div></div>
        <div style={{ ...an("skl", 0.15), display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>{Object.entries(SKL).map(([g, items]) => <div key={g}><div style={{ color: t.primary, fontSize: 13, fontWeight: "bold", marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${t.primary}25` }}>{g}</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{items.map((s, i) => <span key={i} style={{ fontSize: 11, padding: "4px 10px", background: t.primary + "10", border: `1px solid ${t.primary}18`, color: t.text }}>{s}</span>)}</div></div>)}</div>
      </section>

      {/* Certs */}
      <section id="s-certs" data-s="crt" style={{ padding: "80px 60px", maxWidth: 900, margin: "0 auto" }}>
        <div style={an("crt")}><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}><div style={{ color: t.primary, fontSize: 12, letterSpacing: 3 }}>05 // Certifications</div><div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${t.primary}40, transparent)` }} /></div></div>
        <div style={{ ...an("crt", 0.15), display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>{CERTS.map((c, i) => <div key={i} style={{ padding: 16, border: `1px solid ${t.gray}30` }}><div style={{ fontSize: 20, marginBottom: 6 }}>{c.ic}</div><div style={{ color: t.grayL, fontSize: 10 }}>{c.iss}</div><div style={{ color: t.primary, fontSize: 12, fontWeight: "bold", margin: "4px 0" }}>{c.name}</div><div style={{ color: t.grayL, fontSize: 10 }}>{c.date}</div></div>)}</div>
      </section>

      {/* Contact */}
      <section id="s-contact" data-s="cnt" style={{ padding: "80px 60px 120px", maxWidth: 900, margin: "0 auto" }}>
        <div style={an("cnt")}><div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}><div style={{ color: t.primary, fontSize: 12, letterSpacing: 3 }}>06 // Contact</div><div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${t.primary}40, transparent)` }} /></div></div>
        <div style={{ ...an("cnt", 0.15), display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div><h3 style={{ color: t.primary, fontSize: 18, marginBottom: 8 }}>Let's build something <em style={{ color: t.text, fontStyle: "italic" }}>worth shipping</em>.</h3><p style={{ color: t.grayL, fontSize: 13, marginBottom: 24 }}>Available for freelance, collaborations, opportunities.</p>{LINKS.map((l, i) => <a key={i} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, padding: 12, marginBottom: 8, border: `1px solid ${t.gray}30`, textDecoration: "none", color: t.text }}><span style={{ color: t.primary, fontSize: 16, width: 24, textAlign: "center" }}>{l.ic}</span><div><div style={{ fontSize: 10, color: t.grayL }}>{l.lb}</div><div style={{ fontSize: 12 }}>{l.val}</div></div></a>)}</div>
          <div style={{ padding: 20, background: t.bg2, border: `1px solid ${t.gray}30` }}><div style={{ display: "flex", gap: 6, marginBottom: 12 }}>{["#ff5f57", "#febc2e", "#28c840"].map((c, i) => <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}<span style={{ color: t.grayL, fontSize: 10, marginLeft: 8 }}>bash</span></div><div style={{ fontSize: 12, color: t.grayL }}><div><span style={{ color: t.primary }}>$ </span>cat about.txt</div><div><span style={{ color: t.primary }}>name:</span>     Georges El Khayat</div><div><span style={{ color: t.primary }}>role:</span>     Dev / AI / Builder</div><div><span style={{ color: t.primary }}>status:</span>   open to work</div><br /><div><span style={{ color: t.primary }}>$ </span>ping georgekhayat</div><div style={{ color: t.primary }}>Reply: response_time=fast</div><div style={{ color: t.primary }}>Reply: available=true</div></div></div>
        </div>
      </section>

      <footer style={{ padding: "20px 60px", borderTop: `1px solid ${t.gray}20`, textAlign: "center", color: t.grayL, fontSize: 11 }}>Built by Georges El Khayat {"\u00b7"} <span style={{ color: t.primary }}>TwoFoundersLab</span> {"\u00b7"} 2025</footer>
    </div>
  );
}

/* ============= DESKTOP MODE ============= */
const WD = { about: { t: "README.md", ic: "\uD83D\uDCC4", w: 540, h: 400 }, experience: { t: "work_log.txt", ic: "\uD83D\uDCBC", w: 540, h: 430 }, projects: { t: "git log", ic: "\uD83D\uDCC1", w: 580, h: 460 }, skills: { t: "skills.json", ic: "\u26A1", w: 500, h: 400 }, certs: { t: "credentials.md", ic: "\uD83D\uDCDC", w: 480, h: 430 }, contact: { t: "ping.sh", ic: "\uD83D\uDCE1", w: 440, h: 400 }, terminal: { t: "bash", ic: "\u25B6", w: 580, h: 370 }, guestbook: { t: "guestbook.log", ic: "\uD83D\uDCDD", w: 460, h: 410 }, settings: { t: "settings.conf", ic: "\u2699", w: 380, h: 320 }, snake: { t: "Snake", ic: "\uD83D\uDC0D", w: 330, h: 400 }, matrix: { t: "Matrix", ic: "\uD83D\uDFE2", w: 440, h: 360 }, typing: { t: "Typing", ic: "\u2328", w: 500, h: 360 }, minesweeper: { t: "Minesweeper", ic: "\uD83D\uDCA3", w: 320, h: 380 } };

const DI = [["about", "About Me", "\uD83D\uDCC4"], ["experience", "Experience", "\uD83D\uDCBC"], ["projects", "Projects", "\uD83D\uDCC1"], ["skills", "Skills", "\u26A1"], ["certs", "Certs", "\uD83D\uDCDC"], ["contact", "Contact", "\uD83D\uDCE1"], ["terminal", "Terminal", "\u25B6"], ["guestbook", "Guestbook", "\uD83D\uDCDD"], ["settings", "Settings", "\u2699"], null, ["snake", "Snake", "\uD83D\uDC0D"], ["matrix", "Matrix", "\uD83D\uDFE2"], ["typing", "Typing", "\u2328"], ["minesweeper", "Mines", "\uD83D\uDCA3"]];

function Desktop({ theme, setTheme, onSwitch }) {
  const t = THEMES[theme];
  const [wins, setWins] = useState([]);
  const [nz, setNz] = useState(100);
  const [sm, setSm] = useState(false);
  const [ge, setGe] = useState([]);
  const [clk, setClk] = useState(new Date());
  const [ki, setKi] = useState(0);
  const [egg, setEgg] = useState(false);

  useEffect(() => { const iv = setInterval(() => setClk(new Date()), 1000); return () => clearInterval(iv); }, []);
  const ks = useMemo(() => [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], []);
  useEffect(() => { const h = (e) => { if (e.keyCode === ks[ki]) { const n = ki + 1; if (n === ks.length) { setEgg(true); setKi(0); setTimeout(() => setEgg(false), 4000); } else setKi(n); } else setKi(0); }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [ki, ks]);

  const openWin = useCallback((id, closeId) => {
    if (closeId) { setWins(w => w.filter(x => x.id !== closeId)); return; }
    if (!id) return;
    setWins(prev => {
      const ex = prev.find(w => w.id === id);
      if (ex) return prev.map(w => w.id === id ? { ...w, min: false, zIndex: nz } : w);
      const d = WD[id]; if (!d) return prev;
      return [...prev, { id, ...d, x: 80 + (prev.length % 5) * 35, y: 50 + (prev.length % 5) * 35, zIndex: nz, min: false }];
    });
    setNz(z => z + 1);
  }, [nz]);

  const closeW = useCallback(id => setWins(w => w.filter(x => x.id !== id)), []);
  const minW = useCallback(id => setWins(w => w.map(x => x.id === id ? { ...x, min: true } : x)), []);
  const focW = useCallback(id => { setWins(w => w.map(x => x.id === id ? { ...x, zIndex: nz } : x)); setNz(z => z + 1); }, [nz]);
  const dragW = useCallback((id, x, y) => setWins(w => w.map(v => v.id === id ? { ...v, x: Math.max(0, x), y: Math.max(0, y) } : v)), []);
  const actId = wins.length > 0 ? wins.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id : null;

  const rc = (w) => {
    const p = { theme };
    switch (w.id) {
      case "about": return <WAbout {...p} />;
      case "experience": return <WExp {...p} />;
      case "projects": return <WProj {...p} />;
      case "skills": return <WSkl {...p} />;
      case "certs": return <WCert {...p} />;
      case "contact": return <WContact {...p} />;
      case "terminal": return <Term theme={theme} openWin={openWin} setTheme={setTheme} />;
      case "guestbook": return <WGuest theme={theme} entries={ge} onAdd={e => setGe(p => [e, ...p])} />;
      case "settings": return <WSet theme={theme} setTheme={setTheme} />;
      case "snake": return <Snake {...p} />;
      case "matrix": return <Matrix {...p} />;
      case "typing": return <Typing {...p} />;
      case "minesweeper": return <Mines {...p} />;
      default: return null;
    }
  };

  const mi = [["about", "\uD83D\uDCC4 About Me"], ["experience", "\uD83D\uDCBC Experience"], ["projects", "\uD83D\uDCC1 Projects"], ["skills", "\u26A1 Skills"], ["certs", "\uD83D\uDCDC Certs"], ["contact", "\uD83D\uDCE1 Contact"], null, ["terminal", "\u25B6 Terminal"], ["guestbook", "\uD83D\uDCDD Guestbook"], ["settings", "\u2699 Settings"], null, ["snake", "\uD83D\uDC0D Snake"], ["matrix", "\uD83D\uDFE2 Matrix"], ["typing", "\u2328 Typing"], ["minesweeper", "\uD83D\uDCA3 Minesweeper"]];

  return (
    <div style={{ position: "fixed", inset: 0, background: t.bg, fontFamily: "'Courier New',monospace", overflow: "hidden", color: t.text }} onClick={() => sm && setSm(false)}>
      <Particles theme={theme} />
      <div style={{ position: "fixed", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.05) 2px,rgba(0,0,0,0.05) 4px)", pointerEvents: "none", zIndex: 9999 }} />
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)", pointerEvents: "none", zIndex: 9998 }} />

      {egg && <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.88)", zIndex: 10000, animation: "gFade 0.3s ease" }}><div style={{ textAlign: "center" }}><div style={{ fontSize: 60, marginBottom: 16 }}>{"\uD83C\uDFAE"}</div><div style={{ color: t.primary, fontSize: 22, fontWeight: "bold", letterSpacing: 6, textShadow: `0 0 30px ${t.glowS}` }}>KONAMI CODE</div><div style={{ color: t.grayL, fontSize: 13, marginTop: 8 }}>Secret found. George approves.</div></div></div>}

      <div style={{ position: "absolute", bottom: 55, right: 20, color: t.primary, fontSize: 11, opacity: 0.1, letterSpacing: 3, pointerEvents: "none", zIndex: 1 }}>GeorgeOS v1.0</div>

      <div style={{ position: "absolute", top: 16, left: 16, display: "grid", gridTemplateColumns: "repeat(2, 80px)", gap: 4, zIndex: 10 }}>
        {DI.map((icon, idx) => icon ? <button key={icon[0]} onDoubleClick={() => { openWin(icon[0]); setSm(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 4px", background: "transparent", border: "1px solid transparent", color: t.text, cursor: "pointer", fontFamily: "'Courier New',monospace", fontSize: 10, textAlign: "center", borderRadius: 2 }} title={"Double-click: " + icon[1]}><span style={{ fontSize: 26, filter: `drop-shadow(0 0 4px ${t.glow})` }}>{icon[2]}</span><span style={{ textShadow: `0 1px 4px ${t.bg}` }}>{icon[1]}</span></button> : <div key={idx} />)}
      </div>

      {wins.map(w => <Win key={w.id} id={w.id} title={w.t} icon={w.ic} x={w.x} y={w.y} w={w.w} h={w.h} zIndex={w.zIndex} active={w.id === actId} min={w.min} onFocus={focW} onClose={closeW} onMin={minW} onDrag={dragW} theme={theme}>{rc(w)}</Win>)}

      {sm && <div style={{ position: "fixed", bottom: 42, left: 0, width: 270, background: `${t.bg2}f5`, border: `1px solid ${t.primary}35`, boxShadow: `0 -8px 40px ${t.glow}`, backdropFilter: "blur(12px)", zIndex: 9990, maxHeight: "70vh", overflow: "auto" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "16px 18px", borderBottom: `1px solid ${t.primary}20`, background: `linear-gradient(180deg, ${t.primary}10, transparent)` }}><div style={{ color: t.primary, fontSize: 18, fontWeight: "bold", letterSpacing: 4, textShadow: `0 0 15px ${t.glow}` }}>GK<span style={{ opacity: 0.3, fontWeight: "normal" }}> OS</span></div><div style={{ color: t.grayL, fontSize: 10, marginTop: 4 }}>Georges El Khayat</div></div>
        {mi.map((item, i) => item === null ? <div key={i} style={{ borderBottom: `1px solid ${t.gray}20`, margin: "4px 0" }} /> : <button key={item[0]} onClick={() => { openWin(item[0]); setSm(false); }} style={{ display: "block", width: "100%", padding: "9px 18px", background: "transparent", border: "none", color: t.text, fontFamily: "'Courier New',monospace", fontSize: 12, cursor: "pointer", textAlign: "left" }}>{item[1]}</button>)}
        <div style={{ borderTop: `1px solid ${t.gray}20`, padding: "8px 18px" }}><button onClick={onSwitch} style={{ width: "100%", padding: 8, background: t.primary + "10", border: `1px solid ${t.primary}40`, color: t.primary, cursor: "pointer", fontFamily: "'Courier New',monospace", fontSize: 11, letterSpacing: 1 }}>{"\u21CB"} SCROLL MODE</button></div>
      </div>}

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 40, background: `${t.bg2}f0`, borderTop: `1px solid ${t.primary}20`, display: "flex", alignItems: "center", zIndex: 9980, paddingLeft: 4, paddingRight: 14, backdropFilter: "blur(8px)" }}>
        <button onClick={e => { e.stopPropagation(); setSm(o => !o); }} style={{ padding: "5px 16px", height: 32, background: sm ? t.primary + "20" : "transparent", border: `1px solid ${sm ? t.primary + "60" : t.gray + "40"}`, color: t.primary, fontFamily: "'Courier New',monospace", fontSize: 12, fontWeight: "bold", cursor: "pointer", letterSpacing: 3, marginRight: 8, textShadow: `0 0 8px ${t.glow}` }}>{"\u25a0"} GK</button>
        <div style={{ width: 1, height: 22, background: t.gray + "30", marginRight: 8 }} />
        <button onClick={onSwitch} style={{ padding: "4px 10px", height: 28, background: "transparent", border: `1px solid ${t.gray}30`, color: t.grayL, fontFamily: "'Courier New',monospace", fontSize: 10, cursor: "pointer", marginRight: 8 }}>{"\u21CB"} Scroll</button>
        <div style={{ width: 1, height: 22, background: t.gray + "30", marginRight: 8 }} />
        <div style={{ flex: 1, display: "flex", gap: 4, overflow: "auto" }}>
          {wins.map(w => <button key={w.id} onClick={() => { if (w.min) openWin(w.id); else if (w.id === actId) minW(w.id); else focW(w.id); }} style={{ padding: "4px 10px", height: 28, background: w.id === actId && !w.min ? t.primary + "18" : "transparent", border: `1px solid ${w.id === actId && !w.min ? t.primary + "50" : t.gray + "20"}`, color: w.min ? t.grayL : t.text, fontFamily: "'Courier New',monospace", fontSize: 10, cursor: "pointer", whiteSpace: "nowrap", maxWidth: 130, overflow: "hidden", textOverflow: "ellipsis", opacity: w.min ? 0.4 : 1, boxShadow: w.id === actId && !w.min ? `0 0 8px ${t.glow}` : "none" }}>{w.ic} {w.id}</button>)}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: t.grayL, fontSize: 11 }}>
          <span style={{ cursor: "pointer", color: t.dim, fontSize: 10 }} onClick={() => openWin("settings")}>{"\u25C9"} {THEMES[theme].name}</span>
          <span>{clk.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>
    </div>
  );
}

/* ============= MAIN APP ============= */
export default function GeorgeOS() {
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState("green");
  const [mode, setMode] = useState("os");
  const t = THEMES[theme];
  const onBoot = useCallback(() => setBooting(false), []);

  if (booting) return <Boot onDone={onBoot} theme={theme} />;

  return (
    <div>
      {mode === "os" ? (
        <Desktop theme={theme} setTheme={setTheme} onSwitch={() => setMode("scroll")} />
      ) : (
        <>
          <Particles theme={theme} />
          <div style={{ position: "fixed", inset: 0, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)", pointerEvents: "none", zIndex: 9999 }} />
          <ScrollView theme={theme} setTheme={setTheme} onSwitch={() => setMode("os")} />
        </>
      )}
      <style>{`
        @keyframes gFade { from { opacity:0; transform:scale(0.95) } to { opacity:1; transform:scale(1) } }
        @keyframes hF { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
        @keyframes blink { 50% { opacity: 0 } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${t.bg}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${t.bg}; }
        ::-webkit-scrollbar-thumb { background: ${t.gray}60; }
        ::selection { background: ${t.primary}35; color: ${t.text}; }
      `}</style>
    </div>
  );
}
