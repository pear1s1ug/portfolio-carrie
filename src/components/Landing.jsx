import { useState, useEffect, useRef } from 'react'
import portrait from '../assets/pixel/portrait.png'
import nightScene from '../assets/pixel/night-scene.png'

/* ═══════════════════════════════════════════════════════════
   Enlaces externos
   ═══════════════════════════════════════════════════════════ */
const GITHUB_URL = 'https://github.com/pear1s1ug'
const LINKEDIN_URL = 'https://www.linkedin.com/in/carla-prado-a37baa345/'
const ART_URL = 'https://www.instagram.com/mauve.aphelion'

/* ═══════════════════════════════════════════════════════════
   Estilos del sistema visual (paleta, ventanas, pixel art)
   ═══════════════════════════════════════════════════════════ */
const STYLES = `
:root {
  --bg: #100e17; --bg2: #15121f; --panel: #1a1628; --panel2: #221d36;
  --line: #3b3260; --line-soft: #262040;
  --ink: #efe9fb; --ink2: #bdb3d9; --ink3: #968bb8;
  --lilac: #c4b0f5; --pink: #ee7fb5; --plum: #8c3c65;
  --display: 'Archivo', 'Arial Black', system-ui, sans-serif;
  --pixel: 'Silkscreen', 'Fira Code', monospace;
  --mono: 'Fira Code', Consolas, monospace;
}
html { scroll-behavior: smooth; background: var(--bg); }
body { background: var(--bg); color: var(--ink2); font-family: 'Archivo', system-ui, sans-serif; }
::selection { background: var(--pink); color: var(--bg); }
:focus-visible { outline: 2px dashed var(--pink); outline-offset: 3px; }
section[id] { scroll-margin-top: 0; }

.t-ink { color: var(--ink); } .t-ink2 { color: var(--ink2); } .t-ink3 { color: var(--ink3); }
.t-pink { color: var(--pink); } .t-lilac { color: var(--lilac); }
.display { font-family: var(--display); font-stretch: 125%; font-weight: 800; color: var(--ink); text-transform: uppercase; line-height: .95; letter-spacing: -0.01em; }
.display-soft { font-family: var(--display); font-stretch: 112%; font-weight: 700; color: var(--ink); line-height: 1.15; }
.pixel { font-family: var(--pixel); text-transform: uppercase; letter-spacing: .04em; }
.mono { font-family: var(--mono); }
.crisp { image-rendering: crisp-edges; image-rendering: pixelated; }
.kicker { font-family: var(--pixel); text-transform: uppercase; color: var(--pink); font-size: .78rem; letter-spacing: .06em; }

.skip { position: fixed; left: 1rem; top: -4rem; z-index: 100; background: var(--lilac); color: var(--bg); padding: .6rem 1rem; font-family: var(--pixel); }
.skip:focus { top: 1rem; }

.dots { background-image: radial-gradient(var(--line-soft) 1px, transparent 1.5px); background-size: 22px 22px; }
.star { position: absolute; background: var(--lilac); }

/* Ventanas con marcas de esquina */
.win { position: relative; background: var(--panel); border: 1px solid var(--line); }
.win-bar { display: flex; align-items: center; gap: .6rem; padding: .5rem .8rem; background: var(--panel2); border-bottom: 1px solid var(--line); }
.win-title { min-width: 0; font-family: var(--pixel); font-size: .72rem; color: var(--lilac); letter-spacing: .04em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.win-btn { width: 11px; height: 11px; border: 1px solid var(--ink3); flex: none; }
.ticks::after {
  content: ''; position: absolute; inset: -6px; pointer-events: none; --c: var(--lilac);
  background:
    linear-gradient(var(--c), var(--c)) top left / 12px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) top left / 1px 12px no-repeat,
    linear-gradient(var(--c), var(--c)) top right / 12px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) top right / 1px 12px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom left / 12px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom left / 1px 12px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / 12px 1px no-repeat,
    linear-gradient(var(--c), var(--c)) bottom right / 1px 12px no-repeat;
}
.lift { transition: transform .2s ease, border-color .2s ease; }
.lift:hover { transform: translateY(-3px); border-color: var(--lilac); }
.scan::after { content: ''; position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(to bottom, rgba(16,14,23,.3) 0 1px, transparent 1px 3px); }

/* Botones con sombra pixelada */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: .6rem; font-family: var(--pixel); font-size: .8rem; letter-spacing: .04em; text-transform: uppercase; padding: .85rem 1.3rem; border: 1px solid var(--lilac); color: var(--ink); background: var(--bg); box-shadow: 4px 4px 0 var(--plum); transition: transform .15s ease, box-shadow .15s ease, background-color .15s ease; }
.btn:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 var(--plum); }
.btn:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 var(--plum); }
.btn-primary { background: var(--lilac); color: var(--bg); }
.btn-icon { padding: .75rem; }
.chip { font-family: var(--mono); font-size: .74rem; line-height: 1.4; padding: .25rem .6rem; border: 1px solid var(--line); background: var(--bg2); color: var(--ink); }
.arrow-link { display: inline-flex; align-items: center; gap: .45rem; font-family: var(--pixel); font-size: .74rem; text-transform: uppercase; letter-spacing: .04em; color: var(--lilac); }
.arrow-link:hover { color: var(--pink); }
.arrow-link span { transition: transform .15s ease; }
.arrow-link:hover span { transform: translateX(3px); }

/* Caja de diálogo estilo RPG */
.dlg { border: 2px solid var(--ink); background: rgba(16,14,23,.94); box-shadow: inset 0 0 0 3px var(--bg), inset 0 0 0 4px var(--line); }
.choice { font-family: var(--pixel); font-size: .78rem; text-transform: uppercase; color: var(--ink); }
.choice::before { content: '▶'; display: inline-block; width: 1.1em; color: var(--pink); opacity: 0; transition: opacity .12s; }
.choice:hover::before, .choice:focus-visible::before { opacity: 1; }
.choice:hover { color: var(--pink); }
.caret { display: inline-block; width: .55em; height: 1em; margin-left: 2px; background: var(--pink); vertical-align: -0.15em; animation: blink 1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }

.outline-word { color: transparent; -webkit-text-stroke: 1px var(--line); }

/* Artículos */
.prose p { margin: 0 0 1.2rem; line-height: 1.8; }
.prose h2 { font-family: var(--display); font-stretch: 112%; font-weight: 700; color: var(--ink); font-size: 1.4rem; line-height: 1.25; margin: 2.75rem 0 1rem; }
.prose ul { margin: 0 0 1.4rem; list-style: none; padding: 0; }
.prose li { position: relative; padding-left: 1.4rem; margin-bottom: .65rem; line-height: 1.75; }
.prose li::before { content: ''; position: absolute; left: .25rem; top: .72em; width: 6px; height: 6px; background: var(--pink); }
.prose code { font-family: var(--mono); font-size: .86em; color: var(--lilac); background: var(--panel2); padding: .1em .35em; }
.prose strong { color: var(--ink); font-weight: 600; }
.codeblock { margin: 0 0 1.6rem; }
.codeblock pre { overflow-x: auto; padding: 1rem 1.15rem; font-family: var(--mono); font-size: .82rem; line-height: 1.65; color: #e6def7; }
.codeblock .cm { color: var(--ink3); font-style: italic; }

/* Menú de proyectos */
.proj-tab { display: flex; align-items: center; gap: .75rem; width: 100%; padding: .7rem .9rem .7rem .6rem; text-align: left; border: 1px solid var(--line-soft); background: var(--panel); cursor: pointer; transition: border-color .15s, background-color .15s, box-shadow .15s, transform .15s; }
.proj-tab:hover { border-color: var(--line); background: var(--panel2); }
.proj-tab .mark { width: .9em; flex: none; font-size: .7rem; color: var(--pink); opacity: 0; }
.proj-tab.is-active { border-color: var(--lilac); background: var(--panel2); box-shadow: 4px 4px 0 var(--plum); transform: translate(-2px, -2px); }
.proj-tab.is-active .mark { opacity: 1; }
.fade-in { animation: rise .35s ease-out both; }

/* Tarjeta Manjaro: verde y teal sobre fondo oscuro */
.manjaro { position: relative; background: #0d1813; border: 1px solid #1f4a35; box-shadow: 4px 4px 0 #1abc9c33; }
.bash { background: #08100c; border: 1px solid #1f4a35; }
.bash-bar { display: flex; align-items: center; justify-content: space-between; padding: .3rem .6rem; background: #12261b; border-bottom: 1px solid #1f4a35; font-family: var(--pixel); font-size: .64rem; color: #35bf5c; text-transform: lowercase; }
.bash-btn { width: 8px; height: 8px; border: 1px solid #2f6b4c; }
.bash .caret { background: #1abc9c; }

@keyframes rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
.rise { animation: rise .6s ease-out both; }
.d1 { animation-delay: .08s; } .d2 { animation-delay: .16s; } .d3 { animation-delay: .24s; } .d4 { animation-delay: .32s; }
@keyframes ghost-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
@keyframes ghost-walk { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.walker-idle { animation: ghost-float 1.8s ease-in-out infinite; }
.walker-walking { animation: ghost-walk .3s steps(2) infinite; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
}
`

/* ═══════════════════════════════════════════════════════════
   Pixel art: sprites dibujados como cuadrículas de caracteres
   ═══════════════════════════════════════════════════════════ */
const PALETTE = {
    k: '#100e17', w: '#efe9fb', l: '#c4b0f5', p: '#ee7fb5',
    m: '#8c3c65', d: '#3d2a5c', b: '#2f3761',
    g: '#35bf5c', t: '#1abc9c', n: '#0f1f18',
}

const SPRITES = {
    ghost: [
        '...kkkkkk...',
        '.kkwwwwwwkk.',
        'kwwwwwwwwwwk',
        'kwwkwwwwkwwk',
        'kwwkwwwwkwwk',
        'kwpwwwwwwpwk',
        'kwwwwkkwwwwk',
        'kwwwwwwwwwwk',
        'kwwwwwwwwwwk',
        'kwwkkwwkkwwk',
        'kkk..kk..kkk',
    ],
    spark: [
        '...l...',
        '...l...',
        '..lwl..',
        'llwwwll',
        '..lwl..',
        '...l...',
        '...l...',
    ],
    envelope: [
        'kkkkkkkkkkkkkk',
        'klkllllllllklk',
        'kllkllllllkllk',
        'klllkllllklllk',
        'kllllkppkllllk',
        'klllkwkkwklllk',
        'kllkwwwwwwkllk',
        'klkwwwwwwwwklk',
        'kkwwwwwwwwwwkk',
        'kkkkkkkkkkkkkk',
    ],
    calendar: [
        '..kk....kk....',
        'kkkkkkkkkkkkkk',
        'kppppppppppppk',
        'kkkkkkkkkkkkkk',
        'kwwwwwwwwwwwwk',
        'kwllwllwllwllk',
        'kwllwllwllwllk',
        'kwwwwwwwwwwwwk',
        'kwllwppwllwllk',
        'kwllwppwllwllk',
        'kwwwwwwwwwwwwk',
        'kwllwllwllwwwk',
        'kwllwllwllwwwk',
        'kkkkkkkkkkkkkk',
    ],
    browser: [
        'kkkkkkkkkkkkkk',
        'kmpmlmwmmmmmmk',
        'kkkkkkkkkkkkkk',
        'kddddddddddddk',
        'kdlllllldddddk',
        'kddddddddddddk',
        'kdllldddpppddk',
        'kdllldddpppddk',
        'kddddddddddddk',
        'kdlllllllllddk',
        'kddddddddddddk',
        'kkkkkkkkkkkkkk',
    ],
    cupcake: [
        '......kk......',
        '.....kppk.....',
        '....kkkkkk....',
        '..kkwwwwwwkk..',
        '.kwwwwlwwwwwk.',
        'kwwlwwwwwwlwwk',
        'kwwwwwwlwwwwwk',
        'kkkkkkkkkkkkkk',
        '.kmpmpmpmpmpk.',
        '.kmpmpmpmpmpk.',
        '..kmpmpmpmpk..',
        '..kmpmpmpmpk..',
        '...kkkkkkkk...',
    ],
    manjaro: [
        'kkkkkkkkkkkkkkkkkkkkkk',
        'kddddddddddddddddddddk',
        'kdkkkkkkkkkkkkkkkkkkdk',
        'kdknnnnnnnnnnnnnnnnkdk',
        'kdknnngggggg.gggnnnkdk',
        'kdknnngggggg.gggnnnkdk',
        'kdknnnggg....gggnnnkdk',
        'kdknnnggg.tt.gggnnnkdk',
        'kdknnnggg.tt.gggnnnkdk',
        'kdknnnggg.tt.gggnnnkdk',
        'kdknnnggg.tt.gggnnnkdk',
        'kdknnnggg.tt.gggnnnkdk',
        'kdknnnnnnnnnnnnnnnnkdk',
        'kdknntnnnnnnnnnnnnnkdk',
        'kdknnntnttttnnnnnnnkdk',
        'kdknntnnnnnnnnnnnnnkdk',
        'kdknnnnnnnnnnnnnnnnkdk',
        'kdkkkkkkkkkkkkkkkkkkdk',
        'kddddddddddddddddgtddk',
        'kkkkkkkkkkkkkkkkkkkkkk',
        '........kddddk........',
        '.....kkkkkkkkkkkk.....',
    ],
    frame: [
        'kkkkkkkkkkkk',
        'kllllllllllk',
        'kldddddwddlk',
        'klddddddddlk',
        'kldddpddddlk',
        'kldddmddddlk',
        'klddmmmddmlk',
        'kldmmmmmmmlk',
        'kllllllllllk',
        'kkkkkkkkkkkk',
    ],
    gamepad: [
        '..kkkkkkkkkkkk..',
        '.kllllllllllllk.',
        'kllkllllllllpllk',
        'klkkkllllllplplk',
        'kllkllllllllpllk',
        'kllllllkkllllllk',
        'kllllk....kllllk',
        '.kllk......kllk.',
        '..kk........kk..',
    ],
}

function Sprite({ name, className = '' }) {
    const rows = SPRITES[name]
    const rects = []
    rows.forEach((row, y) => {
        let x = 0
        while (x < row.length) {
            const c = row[x]
            let run = 1
            while (row[x + run] === c) run++
            if (c !== '.') rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={PALETTE[c]} />)
            x += run
        }
    })
    return (
        <svg viewBox={`0 0 ${rows[0].length} ${rows.length}`} shapeRendering="crispEdges" className={className} aria-hidden="true" focusable="false">
            {rects}
        </svg>
    )
}

/* Cielo de fondo: estrellas cuadradas en posiciones fijas */
function seeded(seed) {
    let x = seed
    return () => {
        x = (x * 9301 + 49297) % 233280
        return x / 233280
    }
}

const STARS = (() => {
    const r = seeded(7)
    return Array.from({ length: 34 }, (_, i) => ({
        id: i,
        top: r() * 100,
        left: r() * 100,
        size: r() < 0.85 ? 2 : 3,
        opacity: 0.15 + r() * 0.3,
    }))
})()

function StarField() {
    return STARS.map((s) => (
        <span key={s.id} className="star" style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, opacity: s.opacity }} />
    ))
}

/* ═══════════════════════════════════════════════════════════
   Habilidades técnicas (contenido original, sin cambios)
   ═══════════════════════════════════════════════════════════ */
const STACK_META = [
    { id: 'frontend', dot: 'bg-[#7cc4ff]', items: ['HTML', 'CSS', 'React.js', 'Tailwind CSS', 'Bootstrap Framework', 'Java Swing'] },
    { id: 'backend', dot: 'bg-[#e46f9f]', items: ['Java', 'Java + Springboot', 'JavaScript', 'Node.js', 'Express.js', 'VB.NET', 'Python', 'Kotlin'] },
    { id: 'database', dot: 'bg-[#8b6fd6]', items: ['MySQL', 'MariaDB', 'PL/SQL', 'SQLite', 'MongoDB'] },
]

const GENERAL_META = [
    {
        id: 'security', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'cloud', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.1 9.06 4 4 0 0 0 7 18z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'pm', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.6" />
                <path d="M9 10h6M9 13.5h6M9 17h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'branching', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <line x1="6" y1="3" x2="6" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M18 9a9 9 0 0 1-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'testing', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'linux', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M6.5 9l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15h5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'architecture', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="9.5" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <rect x="3" y="16" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <rect x="16" y="16" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 8v4M12 12H5.5v4M12 12h6.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'analytics', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        )
    },
]

/* ═══════════════════════════════════════════════════════════
   Proyectos (verificados en github.com/pear1s1ug)
   ═══════════════════════════════════════════════════════════ */
const PROJECTS = [
    {
        id: 'nexus-gaming',
        sprite: 'envelope',
        name: 'Nexus Gaming',
        slug: 'desCloudNative',
        tech: ['Java 17', 'Spring Boot 4', 'Spring Security', 'OAuth 2.0 / JWT', 'Microsoft Entra ID', 'RabbitMQ', 'React', 'MSAL', 'Docker Compose'],
        links: [{ kind: 'repo', href: `${GITHUB_URL}/desCloudNative` }],
        en: {
            context: 'Team course project · Cloud Native Development · 2026',
            description: 'Microservices backend for a video game store: separate Spring Boot services for login (a backend-for-frontend), users, products, notifications and RabbitMQ administration, with a React storefront that signs in through Microsoft Entra ID.',
            purpose: 'Practise what a cloud-native system needs beyond CRUD: delegated authentication, asynchronous events and explicit failure handling.',
            highlights: [
                'The BFF validates Entra ID tokens (signature via JWKS, issuer, audience) and maps scopes and app roles to Spring Security authorities.',
                'The React client signs in with MSAL using the Authorization Code flow with PKCE.',
                'RabbitMQ topology with direct and topic exchanges, per-queue TTL, a dead-letter exchange and one DLQ per queue.',
                'Consumers use manual ACK with bounded retries; security tests cover JWT validation and protected routes.',
            ],
        },
        es: {
            context: 'Proyecto de equipo · Desarrollo Cloud Native · 2026',
            description: 'Backend de microservicios para una tienda de videojuegos: servicios Spring Boot separados para login (un backend-for-frontend), usuarios, productos, notificaciones y administración de RabbitMQ, con una tienda en React que inicia sesión mediante Microsoft Entra ID.',
            purpose: 'Practicar lo que un sistema cloud native necesita más allá del CRUD: autenticación delegada, eventos asíncronos y manejo explícito de fallos.',
            highlights: [
                'El BFF valida los tokens de Entra ID (firma vía JWKS, issuer y audience) y transforma scopes y app roles en authorities de Spring Security.',
                'El cliente React inicia sesión con MSAL usando Authorization Code Flow con PKCE.',
                'Topología RabbitMQ con exchanges direct y topic, TTL por cola, dead-letter exchange y una DLQ por cola.',
                'Los consumidores usan ACK manual con reintentos acotados; hay tests de seguridad para la validación del JWT y las rutas protegidas.',
            ],
        },
    },
    {
        id: 'nexusmatch',
        sprite: 'calendar',
        name: 'NexusMatch',
        slug: 'NexusMatch',
        tech: ['Python', 'FastAPI', 'Pydantic', 'PuLP', 'NetworkX', 'python-louvain'],
        links: [{ kind: 'repo', href: `${GITHUB_URL}/NexusMatch` }],
        en: {
            context: 'Personal project · 2026',
            description: 'A FastAPI service that builds class timetables in three phases: it generates valid sections, scores how well each one fits each student, and assigns students with an optimisation model.',
            purpose: 'Replace first-come-first-served enrollment with an assignment that respects capacity rules and keeps every student above a satisfaction threshold.',
            highlights: [
                'Phase 1 combines teacher availability and room constraints (type, computers, capacity) into candidate sections.',
                'Phase 2 computes weighted preference scores and groups students who want to study together with a NetworkX graph and Louvain communities.',
                'Phase 3 solves an integer linear program with PuLP/CBC and checks feasibility before calling the solver.',
            ],
        },
        es: {
            context: 'Proyecto personal · 2026',
            description: 'Un servicio FastAPI que arma horarios en tres fases: genera secciones válidas, calcula qué tan bien se ajusta cada una a cada alumno y asigna a los alumnos con un modelo de optimización.',
            purpose: 'Reemplazar la inscripción por orden de llegada por una asignación que respete los cupos y mantenga a cada alumno sobre un umbral de satisfacción.',
            highlights: [
                'La fase 1 combina la disponibilidad docente y las restricciones de sala (tipo, computadores, capacidad) en secciones candidatas.',
                'La fase 2 calcula puntajes ponderados de preferencia y agrupa a quienes quieren estudiar juntos con un grafo de NetworkX y comunidades de Louvain.',
                'La fase 3 resuelve un modelo de programación lineal entera con PuLP/CBC y verifica la factibilidad antes de llamar al solver.',
            ],
        },
    },
    {
        id: 'nexus-materia',
        sprite: 'browser',
        name: 'Nexus Materia',
        slug: 'TallerAplicadoProgramacionFrontend',
        tech: ['React 19', 'React Router 7', 'Tailwind CSS', 'Vite'],
        links: [
            { kind: 'demo', href: 'https://taller-aplicado-programacion-fronte.vercel.app' },
            { kind: 'repo', href: `${GITHUB_URL}/TallerAplicadoProgramacionFrontend` },
        ],
        en: {
            context: 'Course project · Applied Programming Workshop · 2026',
            description: 'Front end for a student enrollment flow: sign in, choose subjects and sections, review the timetable and modify the enrollment. It runs on mock data, without a backend.',
            purpose: 'Prototype the student-facing side of enrollment before connecting it to a scheduling service.',
            highlights: [
                'Enrollment state shared across screens with React Context.',
                'Nested student routes protected by a session guard with React Router 7.',
                'Timetable view built from the selected sections.',
            ],
        },
        es: {
            context: 'Proyecto de asignatura · Taller Aplicado de Programación · 2026',
            description: 'Frontend para el flujo de inscripción de un alumno: iniciar sesión, elegir asignaturas y secciones, revisar el horario y modificar la inscripción. Funciona con datos de prueba, sin backend.',
            purpose: 'Prototipar el lado del alumno en la inscripción antes de conectarlo a un servicio de horarios.',
            highlights: [
                'Estado de la inscripción compartido entre pantallas con React Context.',
                'Rutas anidadas del alumno protegidas por una verificación de sesión con React Router 7.',
                'Vista de horario construida a partir de las secciones elegidas.',
            ],
        },
    },
    {
        id: 'hazellab',
        sprite: 'cupcake',
        name: 'HazelLab',
        slug: 'HazelLabFront · HazelLabBack',
        tech: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'JPA', 'MySQL', 'Swagger', 'React', 'Axios', 'Vitest'],
        links: [
            { kind: 'front', href: `${GITHUB_URL}/HazelLabFront` },
            { kind: 'back', href: `${GITHUB_URL}/HazelLabBack` },
        ],
        en: {
            context: 'Team course project · Full Stack Development II · 2025',
            description: 'Full-stack e-commerce for a baking-supplies store, with a customer storefront and an admin dashboard.',
            purpose: 'Build a complete store end to end: catalogue, cart, checkout and the back office that manages it.',
            highlights: [
                'REST API in Spring Boot with JPA and MySQL, a JWT authentication filter and OpenAPI docs in Swagger UI.',
                'Cart, checkout and receipt generation, plus a blog and a regions/communes catalogue.',
                'Admin area for products, customers and sales, with advanced filters; component tests with Vitest and React Testing Library.',
            ],
        },
        es: {
            context: 'Proyecto de equipo · Desarrollo Fullstack II · 2025',
            description: 'E-commerce fullstack para una tienda de insumos de pastelería, con tienda para clientes y panel de administración.',
            purpose: 'Construir una tienda completa de punta a punta: catálogo, carrito, compra y el back office que la administra.',
            highlights: [
                'API REST en Spring Boot con JPA y MySQL, filtro de autenticación JWT y documentación OpenAPI en Swagger UI.',
                'Carrito, checkout y generación de boletas, además de blog y catálogo de regiones y comunas.',
                'Panel de administración de productos, clientes y ventas con filtros avanzados; tests de componentes con Vitest y React Testing Library.',
            ],
        },
    },
    {
        id: 'luditest',
        sprite: 'gamepad',
        name: 'LudiTest',
        slug: 'LudiTestMobile',
        tech: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Coroutines', 'Kotlinx Serialization', 'DataStore'],
        links: [{ kind: 'repo', href: `${GITHUB_URL}/LudiTestMobile` }],
        en: {
            context: 'Team course project · Mobile App Development · 2025',
            description: 'An Android quiz that estimates a DISC personality profile and recommends 2025 video games in genres that suit it.',
            purpose: 'Turn a personality questionnaire into personalised, saveable recommendations.',
            highlights: [
                'An extra tie-breaker question when two profiles score the same.',
                'Favourites and “to play” lists, with answers saved to the user profile in DataStore.',
                'MVVM architecture with Jetpack Compose and Compose Navigation.',
            ],
        },
        es: {
            context: 'Proyecto de equipo · Desarrollo de Aplicaciones Móviles · 2025',
            description: 'Un quiz para Android que estima un perfil de personalidad DISC y recomienda videojuegos de 2025 en géneros afines a ese perfil.',
            purpose: 'Convertir un cuestionario de personalidad en recomendaciones personalizadas que se pueden guardar.',
            highlights: [
                'Pregunta extra de desempate cuando dos perfiles obtienen el mismo puntaje.',
                'Listas de favoritos y “por jugar”, con las respuestas guardadas en el perfil mediante DataStore.',
                'Arquitectura MVVM con Jetpack Compose y Compose Navigation.',
            ],
        },
    },
]

/* ═══════════════════════════════════════════════════════════
   Blog: fragmentos de código tomados de los repositorios
   ═══════════════════════════════════════════════════════════ */
const CODE = {
    index: `# (student, section) -> score, for O(1) lookups
scores_dict = {
    (s.idAlumno, s.idSeccion): s.score
    for s in request.scores
}

# sections grouped by subject, for the per-subject constraints
secciones_por_asignatura = {}
for sec in request.secciones:
    secciones_por_asignatura.setdefault(sec.idAsignatura, []).append(sec.idSeccion)`,
    variables: `prob = pulp.LpProblem("NexusMatch", pulp.LpMaximize)

# c[a, s] = 1 if student a is assigned to section s
c = pulp.LpVariable.dicts("c", [(a, s) for a in alumnos for s in secciones], cat="Binary")

# y[s] = 1 if section s opens
y = pulp.LpVariable.dicts("y", secciones, cat="Binary")`,
    objective: `prob += pulp.lpSum(
    scores_dict.get((a, s), 0.0) * c[(a, s)]
    for a in alumnos
    for s in secciones
)`,
    r1: `# R1: exactly one section per subject for each student
for alumno in alumnos:
    for idAsignatura, secs in secciones_por_asignatura.items():
        prob += pulp.lpSum(c[(alumno, s)] for s in secs) == 1`,
    r2: `# R2: no section goes over its maximum
for sec_info in request.secciones:
    prob += pulp.lpSum(c[(a, sec_info.idSeccion)] for a in alumnos) <= sec_info.cupoMaximo`,
    r3: `# R3: an open section needs cupoMinimo students; a closed one gets nobody
for sec_info in request.secciones:
    s = sec_info.idSeccion
    prob += pulp.lpSum(c[(a, s)] for a in alumnos) >= sec_info.cupoMinimo * y[s]
    for a in alumnos:
        prob += c[(a, s)] <= y[s]`,
    r4: `# R4: each student's score in each subject must be >= theta
for alumno in alumnos:
    for idAsignatura, secs in secciones_por_asignatura.items():
        prob += (
            pulp.lpSum(scores_dict.get((alumno, s), 0.0) * c[(alumno, s)] for s in secs)
            >= request.theta * pulp.lpSum(c[(alumno, s)] for s in secs)
        )`,
    feasibility: `sin_opcion = verificar_factibilidad(
    alumnos, secciones, secciones_por_asignatura, scores_dict, request.theta
)
if sin_opcion:
    return Fase3Response(
        asignaciones=[],
        alumnosBajoTheta=sin_opcion,
        exitoso=False,
        mensaje=f"{len(sin_opcion)} alumnos no pueden alcanzar theta con la oferta disponible.",
        # ...
    )`,
    solve: `# run CBC silently; timeLimit keeps large instances from hanging the server
prob.solve(pulp.PULP_CBC_CMD(msg=0, timeLimit=60))

if pulp.LpStatus[prob.status] != "Optimal":
    return Fase3Response(
        exitoso=False,
        mensaje=f"El solver termino con estado: {pulp.LpStatus[prob.status]}.",
        # ...
    )`,
}

const ARTICLES = [
    {
        slug: 'ai-and-handmade-art',
        date: '2026-10-21',
        tags: ['AI', 'Art', 'Opinion'],
        en: {
            title: 'In an age of AI, what makes art human?',
            summary: 'I use AI every day at work and never when I draw. Some thoughts on why, on what artists are right to worry about, and on whether handmade work might come to mean more, not less.',
            blocks: [
                ['p', 'I use AI a lot. At work and in my studies it’s part of how I write code, look things up, make sense of an unfamiliar library or get unstuck on a problem. I don’t feel conflicted about that: in a professional context it’s a tool, and a genuinely useful one.'],
                ['p', 'When I draw, though, I don’t use it at all. It isn’t a rule I set out to follow — it’s more that the two activities are for different things. I’ve been trying to put into words why that line feels so natural to me, and what it might say about where art is heading.'],
                ['h', 'Two different kinds of work'],
                ['p', 'In software, the result is what matters most. If a tool helps me reach working, readable code sooner, the time I save goes into the parts that need more thought. Nobody using an application cares whether a function was typed by hand.'],
                ['p', 'Drawing doesn’t work that way for me. The point isn’t only to end up with an image; it’s the time spent making it — the decisions, the corrections, the lines I’d draw differently next time. If something else did that part, I’d have an image, but I wouldn’t have drawn anything. The process is the reason I do it.'],
                ['p', 'So the distinction isn’t that AI is good in one place and bad in another. It’s that the same tool means something different depending on why you’re doing the work in the first place.'],
                ['h', 'The concerns are real'],
                ['p', 'It would be easy to stop there and call it a personal preference, but the bigger conversation isn’t about hobbies. AI-generated images are already being used commercially, and I have mixed feelings about that.'],
                ['p', 'Artists who worry about this aren’t being dramatic. Many of these systems were trained on work made by people who were never asked. Illustration, concept art and design are livelihoods, and when a client can get something “good enough” for a fraction of the cost, the pressure lands on the people who spent years learning the craft. Those concerns deserve to be taken seriously, not answered with “that’s progress”.'],
                ['p', 'Working in technology doesn’t make me neutral here. If anything, it makes me more aware that tools aren’t built in a vacuum, and that who benefits from them is a choice, not a law of nature.'],
                ['h', 'Another technological shift'],
                ['p', 'At the same time, it’s hard not to see this as one more of the big shifts that keep reshaping how things get made. Each of them changed what was cheap and what was rare.'],
                ['p', 'That’s the part I find interesting. When something becomes abundant, what stays scarce tends to become more noticeable. If generated images end up everywhere — in ads, feeds and stock libraries — then work that clearly came from a person, with their time and their hand in it, might start to stand out more rather than less.'],
                ['h', 'What a person brings to a piece'],
                ['p', 'If that happens, the value probably won’t be in competing with AI on its own terms: speed, volume, polish. That’s a race a person isn’t built to win, and I don’t think artists should have to run it. What a person can offer is different:'],
                ['ul', [
                    '**Visible decisions.** Why this composition, this colour, this thing left out. Choices carry a point of view.',
                    '**Imperfection.** A wobbly line or an uneven texture is evidence that someone was there.',
                    '**Experience.** People draw from what they’ve lived, noticed and cared about, and it shows.',
                    '**Time.** Knowing that something took hours — or years of practice — changes how we look at it.',
                ]],
                ['p', 'Some artists already lean into this by sharing sketches, process videos and work in progress. Showing how something was made becomes part of the work, and it’s exactly the part that can’t be generated.'],
                ['h', 'What I’m not sure about'],
                ['p', 'I don’t want to make this sound neater than it is. A renewed appreciation for handmade art, if it comes, won’t automatically pay anyone’s rent. It might be valued by a smaller audience while commercial work keeps shrinking. And it isn’t fair to put the whole burden on artists to “differentiate” themselves from systems built partly on their own work.'],
                ['p', 'So this isn’t a prediction, and it isn’t a solution. It’s a possibility I find hopeful: that the more generated content surrounds us, the clearer it becomes what a person adds.'],
                ['h', 'Where that leaves me'],
                ['p', 'I’ll keep using AI at work, where it helps me do my job better. And I’ll keep drawing by hand, because there the slow part is the part I want. Holding both of those at once doesn’t feel contradictory to me. It feels like taking seriously both what the technology can do and what it can’t replace.'],
            ],
        },
        es: {
            title: 'En la era de la IA, ¿qué hace humano al arte?',
            summary: 'Uso IA todos los días en el trabajo y nunca cuando dibujo. Algunas ideas sobre por qué, sobre lo que con razón preocupa a los artistas y sobre si lo hecho a mano podría llegar a valer más, no menos.',
            blocks: [
                ['p', 'Uso mucho la IA. En el trabajo y en la universidad es parte de cómo escribo código, busco información, entiendo una librería que no conozco o salgo de un problema en el que me trabé. No siento un conflicto con eso: en un contexto profesional es una herramienta, y una realmente útil.'],
                ['p', 'Cuando dibujo, en cambio, no la uso para nada. No es una regla que me haya propuesto; es más bien que las dos actividades sirven para cosas distintas. He intentado poner en palabras por qué esa línea me parece tan natural y qué podría decir sobre hacia dónde va el arte.'],
                ['h', 'Dos tipos de trabajo distintos'],
                ['p', 'En el software, lo que más importa es el resultado. Si una herramienta me ayuda a llegar antes a un código que funciona y se entiende, el tiempo que ahorro va a las partes que necesitan más reflexión. A nadie que use una aplicación le importa si una función se escribió a mano.'],
                ['p', 'Dibujar no funciona así para mí. El objetivo no es solo terminar con una imagen, sino el tiempo que paso haciéndola: las decisiones, las correcciones, las líneas que la próxima vez haría distinto. Si otra cosa hiciera esa parte, tendría una imagen, pero no habría dibujado nada. El proceso es la razón por la que lo hago.'],
                ['p', 'Entonces la distinción no es que la IA sea buena en un lugar y mala en otro. Es que la misma herramienta significa algo distinto según por qué estás haciendo el trabajo.'],
                ['h', 'Las preocupaciones son reales'],
                ['p', 'Sería fácil quedarse ahí y llamarlo una preferencia personal, pero la conversación más grande no es sobre pasatiempos. Las imágenes generadas con IA ya se usan comercialmente, y tengo sentimientos encontrados al respecto.'],
                ['p', 'Los artistas a quienes esto les preocupa no están exagerando. Muchos de estos sistemas se entrenaron con obras de personas a las que nunca se les preguntó. La ilustración, el arte conceptual y el diseño son formas de ganarse la vida, y cuando un cliente puede conseguir algo “suficientemente bueno” por una fracción del costo, la presión cae sobre quienes pasaron años aprendiendo el oficio. Esas preocupaciones merecen tomarse en serio, no responderse con “así es el progreso”.'],
                ['p', 'Trabajar en tecnología no me vuelve neutral en esto. Si acaso, me hace más consciente de que las herramientas no se construyen en el vacío y de que quién se beneficia de ellas es una decisión, no una ley de la naturaleza.'],
                ['h', 'Otro cambio tecnológico'],
                ['p', 'Al mismo tiempo, cuesta no verlo como uno más de los grandes cambios que siguen transformando cómo se hacen las cosas. Cada uno de ellos cambió qué era barato y qué era escaso.'],
                ['p', 'Esa es la parte que me parece interesante. Cuando algo se vuelve abundante, lo que sigue siendo escaso tiende a notarse más. Si las imágenes generadas terminan en todas partes (en avisos, redes y bancos de imágenes), el trabajo que claramente viene de una persona, con su tiempo y su mano, podría empezar a destacar más en vez de menos.'],
                ['h', 'Lo que una persona le aporta a una obra'],
                ['p', 'Si eso pasa, el valor probablemente no estará en competir con la IA en su propio terreno: velocidad, volumen, pulido. Esa es una carrera que una persona no está hecha para ganar, y no creo que los artistas deban tener que correrla. Lo que una persona puede ofrecer es otra cosa:'],
                ['ul', [
                    '**Decisiones visibles.** Por qué esta composición, este color, esto que se dejó fuera. Las decisiones llevan un punto de vista.',
                    '**Imperfección.** Una línea temblorosa o una textura dispareja son evidencia de que alguien estuvo ahí.',
                    '**Experiencia.** Las personas dibujan a partir de lo que han vivido, observado y querido, y eso se nota.',
                    '**Tiempo.** Saber que algo tomó horas, o años de práctica, cambia cómo lo miramos.',
                ]],
                ['p', 'Algunos artistas ya apuestan por esto compartiendo bocetos, videos del proceso y trabajos en curso. Mostrar cómo se hizo algo pasa a ser parte de la obra, y es justamente la parte que no se puede generar.'],
                ['h', 'Lo que no tengo claro'],
                ['p', 'No quiero que esto suene más ordenado de lo que es. Una nueva valoración del arte hecho a mano, si llega, no va a pagarle el arriendo a nadie automáticamente. Podría valorarla un público más pequeño mientras el trabajo comercial sigue reduciéndose. Y no es justo poner toda la carga en los artistas para que se “diferencien” de sistemas construidos en parte con su propio trabajo.'],
                ['p', 'Así que esto no es una predicción, ni una solución. Es una posibilidad que me da esperanza: que mientras más contenido generado nos rodee, más claro quede lo que aporta una persona.'],
                ['h', 'Dónde quedo yo'],
                ['p', 'Voy a seguir usando IA en el trabajo, donde me ayuda a hacerlo mejor. Y voy a seguir dibujando a mano, porque ahí la parte lenta es la que quiero. Sostener ambas cosas a la vez no me parece contradictorio. Me parece tomarse en serio tanto lo que la tecnología puede hacer como lo que no puede reemplazar.'],
            ],
        },
    },
    {
        slug: 'assigning-sections-integer-linear-programming',
        date: '2026-10-14',
        repo: `${GITHUB_URL}/NexusMatch`,
        tags: ['Python', 'PuLP', 'Optimisation'],
        en: {
            title: 'Assigning students to class sections with integer linear programming',
            summary: 'How NexusMatch turns enrollment into an optimisation problem with PuLP: binary decisions, capacity and minimum-enrollment rules, and a trick that keeps every student above a satisfaction threshold.',
            blocks: [
                ['p', 'Assigning students to sections looks like a sorting problem until you add the real rules: each section has a maximum capacity, a section with too few students shouldn’t open at all, and nobody should end up with a timetable they can’t live with. Greedy approaches such as first come, first served satisfy the early students and leave everyone else with whatever is left.'],
                ['p', 'NexusMatch is a FastAPI service I built that splits the problem into three phases. Phase 1 generates the possible sections from teacher availability and rooms. Phase 2 scores how well each section suits each student and groups students who want to study together using Louvain community detection. Phase 3 — the subject of this article — makes the final assignment with an **integer linear programming** (ILP) model, written with PuLP and solved by CBC.'],
                ['h', 'The inputs'],
                ['p', 'By the time phase 3 runs, the work of judging preferences is done. It receives the students, the candidate sections with their minimum and maximum enrollment, a score between 0 and 1 for every (student, section) pair, and a threshold `theta`: the lowest score any student should get in any subject. The first step is to index that data so the model can be built quickly:'],
                ['code', 'python', CODE.index],
                ['h', 'Decision variables'],
                ['p', 'An ILP model is described by its decisions. This one has two families of binary variables: `c[a, s]` is 1 when student `a` is assigned to section `s`, and `y[s]` is 1 when section `s` opens at all.'],
                ['code', 'python', CODE.variables],
                ['h', 'The objective: maximise total satisfaction'],
                ['p', 'Each assignment contributes its score, so the solver favours assignments that students like — across the whole group at once, not one student at a time.'],
                ['code', 'python', CODE.objective],
                ['h', 'Four rules as four constraints'],
                ['p', '**R1 — one section per subject.** Within each subject, exactly one of a student’s `c` variables can be 1.'],
                ['code', 'python', CODE.r1],
                ['p', '**R2 — capacity.** The number of students in a section can’t exceed its maximum.'],
                ['code', 'python', CODE.r2],
                ['p', '**R3 — minimum enrollment, linked to opening.** If a section opens (`y = 1`) it needs at least `cupoMinimo` students; if it doesn’t (`y = 0`), nobody can be assigned to it. The inequality `c[a, s] <= y[s]` is the standard way to tie an assignment to an on/off decision.'],
                ['code', 'python', CODE.r3],
                ['p', '**R4 — the satisfaction floor.** The rule in plain words is “the section each student gets in a subject has a score of at least θ”. Because exactly one `c` per subject equals 1 (R1), that score is simply `sum(score × c)` over the subject’s sections. Writing the right-hand side as `theta × sum(c)` — which is just `theta`, since the sum is 1 — keeps every term linear, which is what the solver needs.'],
                ['code', 'python', CODE.r4],
                ['h', 'Failing fast, before the solver'],
                ['p', 'If some student has no section above θ in some subject, the model is infeasible whatever the solver does. Instead of letting CBC discover that, the endpoint checks it first and returns the affected students — a far more useful answer than a bare “Infeasible”.'],
                ['code', 'python', CODE.feasibility],
                ['p', 'The solver call itself has a 60-second limit, so a large instance can’t hang the API, and any status other than `Optimal` is reported back instead of returning a partial result.'],
                ['code', 'python', CODE.solve],
                ['h', 'Why a model instead of a greedy algorithm'],
                ['ul', [
                    '**A global view.** The solver can give one student a slightly worse section if that gives several others a much better one — something a first-come rule can’t do.',
                    '**Declarative rules.** Each institutional rule is one constraint. Adding a new rule means adding a constraint, not rewriting an algorithm.',
                    '**A guarantee.** When the status is `Optimal`, no other assignment that respects the rules has a higher total score.',
                    '**A cost to keep in mind.** Integer programming is NP-hard in general. One programme’s enrollment is a small instance, but the time limit exists because that can change.',
                ]],
                ['p', 'One thread is deliberately left open: phase 3 already indexes the Louvain clusters from phase 2 (“available for future use”, as the code says) but doesn’t constrain on them yet. Keeping friends together would be one more constraint — or one more term in the objective.'],
                ['h', 'Takeaway'],
                ['p', 'When a problem has a clear goal and a list of rules that must never be broken, write it down as a model before writing an algorithm: a binary variable for each decision, an on/off variable for anything that may or may not exist, a linear constraint for each rule — and a feasibility check up front, so the error message helps the person who has to read it.'],
            ],
        },
        es: {
            title: 'Asignar alumnos a secciones con programación lineal entera',
            summary: 'Cómo NexusMatch convierte la inscripción en un problema de optimización con PuLP: decisiones binarias, reglas de cupo máximo y mínimo, y un truco para que cada alumno quede sobre un umbral de satisfacción.',
            blocks: [
                ['p', 'Asignar alumnos a secciones parece un problema de ordenamiento hasta que agregas las reglas reales: cada sección tiene un cupo máximo, una sección con muy pocos alumnos no debería abrirse y nadie debería terminar con un horario imposible. Los enfoques voraces, como “el primero que llega elige”, dejan conformes a los primeros y al resto con lo que sobra.'],
                ['p', 'NexusMatch es un servicio FastAPI que construí y que divide el problema en tres fases. La fase 1 genera las secciones posibles a partir de la disponibilidad docente y las salas. La fase 2 calcula qué tan bien se ajusta cada sección a cada alumno y agrupa a quienes quieren estudiar juntos con detección de comunidades de Louvain. La fase 3, tema de este artículo, hace la asignación final con un modelo de **programación lineal entera** (ILP), escrito con PuLP y resuelto con CBC.'],
                ['h', 'Las entradas'],
                ['p', 'Cuando corre la fase 3, el trabajo de evaluar preferencias ya está hecho. Recibe los alumnos, las secciones candidatas con su cupo mínimo y máximo, un puntaje entre 0 y 1 para cada par (alumno, sección) y un umbral `theta`: el puntaje mínimo que cualquier alumno debería obtener en cualquier asignatura. El primer paso es indexar esos datos para construir el modelo rápido:'],
                ['code', 'python', CODE.index],
                ['h', 'Variables de decisión'],
                ['p', 'Un modelo ILP se describe por sus decisiones. Este tiene dos familias de variables binarias: `c[a, s]` vale 1 cuando el alumno `a` queda en la sección `s`, e `y[s]` vale 1 cuando la sección `s` se abre.'],
                ['code', 'python', CODE.variables],
                ['h', 'El objetivo: maximizar la satisfacción total'],
                ['p', 'Cada asignación aporta su puntaje, así que el solver prefiere las asignaciones que a los alumnos les gustan, considerando a todo el grupo a la vez y no a un alumno por turno.'],
                ['code', 'python', CODE.objective],
                ['h', 'Cuatro reglas, cuatro restricciones'],
                ['p', '**R1: una sección por asignatura.** Dentro de cada asignatura, exactamente una de las variables `c` de un alumno puede valer 1.'],
                ['code', 'python', CODE.r1],
                ['p', '**R2: cupo máximo.** La cantidad de alumnos en una sección no puede superar su máximo.'],
                ['code', 'python', CODE.r2],
                ['p', '**R3: cupo mínimo, ligado a la apertura.** Si una sección se abre (`y = 1`) necesita al menos `cupoMinimo` alumnos; si no se abre (`y = 0`), nadie puede quedar en ella. La desigualdad `c[a, s] <= y[s]` es la forma estándar de amarrar una asignación a una decisión de encendido/apagado.'],
                ['code', 'python', CODE.r3],
                ['p', '**R4: el piso de satisfacción.** En palabras, la regla es “la sección que recibe cada alumno en una asignatura tiene un puntaje de al menos θ”. Como en cada asignatura exactamente una `c` vale 1 (R1), ese puntaje es simplemente `sum(puntaje × c)` sobre las secciones de la asignatura. Escribir el lado derecho como `theta × sum(c)` (que es solo `theta`, porque la suma vale 1) mantiene todos los términos lineales, que es lo que el solver necesita.'],
                ['code', 'python', CODE.r4],
                ['h', 'Fallar rápido, antes del solver'],
                ['p', 'Si algún alumno no tiene ninguna sección sobre θ en alguna asignatura, el modelo es infactible haga lo que haga el solver. En vez de dejar que CBC lo descubra, el endpoint lo verifica antes y devuelve los alumnos afectados, una respuesta mucho más útil que un simple “Infeasible”.'],
                ['code', 'python', CODE.feasibility],
                ['p', 'La llamada al solver tiene además un límite de 60 segundos, para que una instancia grande no cuelgue la API, y cualquier estado distinto de `Optimal` se informa en vez de devolver un resultado parcial.'],
                ['code', 'python', CODE.solve],
                ['h', 'Por qué un modelo y no un algoritmo voraz'],
                ['ul', [
                    '**Visión global.** El solver puede darle a un alumno una sección un poco peor si eso les da a varios otros una mucho mejor, algo que una regla de orden de llegada no puede hacer.',
                    '**Reglas declarativas.** Cada regla institucional es una restricción. Agregar una regla nueva es agregar una restricción, no reescribir un algoritmo.',
                    '**Una garantía.** Cuando el estado es `Optimal`, ninguna otra asignación que respete las reglas tiene un puntaje total mayor.',
                    '**Un costo a considerar.** La programación entera es NP-difícil en general. La inscripción de una carrera es una instancia pequeña, pero el límite de tiempo existe porque eso puede cambiar.',
                ]],
                ['p', 'Queda un hilo abierto a propósito: la fase 3 ya indexa los clusters de Louvain de la fase 2 (“disponible para uso futuro”, dice el código), pero todavía no los usa como restricción. Mantener juntos a los amigos sería una restricción más, o un término más en el objetivo.'],
                ['h', 'Conclusión'],
                ['p', 'Cuando un problema tiene un objetivo claro y una lista de reglas que nunca deben romperse, escríbelo como modelo antes de escribir un algoritmo: una variable binaria por cada decisión, una variable de encendido/apagado para todo lo que puede existir o no, una restricción lineal por cada regla, y una verificación de factibilidad al principio, para que el mensaje de error le sirva a quien lo tenga que leer.'],
            ],
        },
    },
]

function readingMinutes(blocks) {
    const words = blocks.reduce((n, [type, a, b]) => {
        const text = type === 'ul' ? a.join(' ') : type === 'code' ? b : a
        return n + text.split(/\s+/).length
    }, 0)
    return Math.max(1, Math.round(words / 200))
}

/* ═══════════════════════════════════════════════════════════
   Contenido traducible
   ═══════════════════════════════════════════════════════════ */
const CONTENT = {
    en: {
        skip: 'Skip to content',
        nav: { about: 'About', skills: 'Skills', projects: 'Projects', blog: 'Blog', contact: 'Contact' },
        menu: 'Menu',
        langSwitch: 'Cambiar a español',
        hero: {
            kicker: 'Software developer · Santiago, Chile',
            lead: 'I build Java and Spring Boot backends and the React interfaces on top of them — with extra attention to the parts that tend to break: authentication, messaging and tests.',
            meta: 'Junior developer at RockTruck · 3rd-year Software Engineering student at Duoc UC',
            primary: 'View projects',
            portraitAlt: 'Pixel-art portrait of Carla Prado',
            speaker: 'Carla',
            line: 'Hi! Where would you like to start?',
            skipHint: 'Click to skip',
            quick: 'Quick links',
            choices: { about: 'About me', blog: 'Blog', contact: 'Contact' },
        },
        about: {
            kicker: 'Profile',
            title: 'About me',
            intro: 'I have a background in art and graphic design, so I care about how an interface reads, not only whether it works. Most of my projects lean towards the backend — Java, Spring Boot and relational databases — and an elective in cybersecurity got me working with Wireshark and Kali Linux. Outside work and class, I draw by hand.',
            art: 'See my artwork',
            artNote: 'Hand-drawn illustration · Instagram',
            experienceTitle: 'Experience',
            experience: [
                { role: 'Junior Software Developer (Trainee)', org: 'RockTruck', type: 'Internship contract', period: 'Jan 2026 — Present', note: 'Building corporate software for a logistics company.' },
                { role: 'Administrative Assistant', org: 'Preuniversitario UC', type: 'Temporary', period: '2023 — 2024' },
                { role: 'Earlier roles', org: 'Bata (stock associate), KFC and Telepizza (kitchen assistant)', period: '2015 — 2019' },
            ],
            educationTitle: 'Education',
            education: [
                { degree: 'Computer Engineering, Software Development track', school: 'Duoc UC', period: '2024 — 2027 (expected)', note: '3rd year. Current courses cover cloud-native development, DevOps, and software security and quality.' },
                { degree: 'Analista Programador (Programmer Analyst)', school: 'Duoc UC', period: '2024 — 2026', note: 'Grade average 6.5 / 7.0.' },
            ],
            certsTitle: 'Certifications',
            certs: [
                { name: 'Phishing: Correos Trampa', issuer: 'EMGUS SpA', date: 'Jul 2026' },
                { name: 'Cyber Security Foundation Professional Certificate (CSFPC)', issuer: 'CertiProf', date: 'Dec 2025' },
                { name: 'DevOps Essentials Professional Certification (DEPC)', issuer: 'CertiProf', date: 'Nov 2025' },
                { name: 'Scrum Master Professional Certification (SMPC)', issuer: 'CertiProf', date: 'Nov 2025' },
                { name: 'Python Essentials 1', issuer: 'Cisco', date: 'Jun 2024' },
            ],
        },
        stackSection: {
            kicker: 'Know-how',
            title: 'Tech Stack',
            subtitle: 'Languages, frameworks and databases I work with.',
            categories: { frontend: 'Frontend', backend: 'Backend', database: 'Database' },
        },
        generalSection: {
            kicker: 'Beyond code',
            title: 'Practices',
            subtitle: 'Knowledge that supports healthy, maintainable projects.',
        },
        general: [
            { title: 'Cybersecurity', text: 'Common vulnerabilities and secure-coding habits.' },
            { title: 'Cloud', text: 'AWS and Azure for hosting and deployments.' },
            { title: 'Project Management', text: 'Requirements gathering, Scrum and Kanban in Jira or Trello.' },
            { title: 'Branching Strategies', text: 'Git Flow, trunk-based development and feature branches.' },
            { title: 'Testing', text: 'Unit and integration tests to ship changes with confidence.' },
            { title: 'Linux', text: 'Manjaro as a daily system. Comfortable in the terminal.' },
            { title: 'Software Architecture', text: 'Layered and microservice designs with clear API contracts.' },
            { title: 'Analytics', text: 'Turning data into charts that support decisions.' },
        ],
        projects: {
            kicker: 'Portfolio',
            title: 'Selected work',
            subtitle: 'Pick a project to see what it does and what makes it interesting.',
            list: 'Projects',
            why: 'Why',
            highlights: 'Highlights',
            links: { repo: 'Repository', demo: 'Live demo', front: 'Frontend repo', back: 'Backend repo' },
            more: 'More on GitHub',
        },
        blog: {
            kicker: 'Blog',
            title: 'Writing',
            subtitle: 'A personal take on AI and art, and a technical deep dive into one of my projects.',
            read: 'Read article',
            minutes: (n) => `${n} min read`,
            back: 'Back to blog',
            source: 'Source code',
            next: 'Next article',
        },
        contact: {
            kicker: 'Contact',
            title: 'Get in touch',
            subtitle: 'Open to junior developer roles in Gran Santiago, on-site or hybrid.',
            links: {
                github: ['GitHub', 'Code and course projects'],
                linkedin: ['LinkedIn', 'Experience and education'],
                art: ['Artwork', 'Hand-drawn illustration on Instagram'],
            },
            manjaro: ['Manjaro Linux', 'My everyday system · bash'],
        },
        footer: {
            walkerHint: 'Click the path to move the ghost.',
            walkerLabel: 'Move the ghost',
            top: 'Back to top',
        },
        dateLocale: 'en-GB',
    },
    es: {
        skip: 'Saltar al contenido',
        nav: { about: 'Sobre mí', skills: 'Habilidades', projects: 'Proyectos', blog: 'Blog', contact: 'Contacto' },
        menu: 'Menú',
        langSwitch: 'Switch to English',
        hero: {
            kicker: 'Desarrolladora de software · Santiago, Chile',
            lead: 'Construyo backends con Java y Spring Boot y las interfaces en React que los usan, con especial atención a lo que suele fallar: autenticación, mensajería y pruebas.',
            meta: 'Desarrolladora junior en RockTruck · 3.er año de Ingeniería en Informática en Duoc UC',
            primary: 'Ver proyectos',
            portraitAlt: 'Retrato en pixel art de Carla Prado',
            speaker: 'Carla',
            line: '¡Hola! ¿Por dónde quieres empezar?',
            skipHint: 'Haz clic para saltar',
            quick: 'Accesos rápidos',
            choices: { about: 'Sobre mí', blog: 'Blog', contact: 'Contacto' },
        },
        about: {
            kicker: 'Perfil',
            title: 'Sobre mí',
            intro: 'Tengo formación en arte y diseño gráfico, así que me importa cómo se lee una interfaz, no solo que funcione. La mayoría de mis proyectos se inclinan hacia el backend (Java, Spring Boot y bases de datos relacionales), y un electivo de ciberseguridad me llevó a trabajar con Wireshark y Kali Linux. Fuera del trabajo y la universidad, dibujo a mano.',
            art: 'Ver mis ilustraciones',
            artNote: 'Ilustración hecha a mano · Instagram',
            experienceTitle: 'Experiencia',
            experience: [
                { role: 'Desarrolladora de Software Junior (Trainee)', org: 'RockTruck', type: 'Contrato de práctica', period: 'ene. 2026 — Actualidad', note: 'Creando software corporativo para una empresa de logística.' },
                { role: 'Auxiliar administrativa', org: 'Preuniversitario UC', type: 'Temporal', period: '2023 — 2024' },
                { role: 'Trabajos anteriores', org: 'Bata (reponedora), KFC y Telepizza (ayudante de cocina)', period: '2015 — 2019' },
            ],
            educationTitle: 'Educación',
            education: [
                { degree: 'Ingeniería en Informática, mención Desarrollo de Software', school: 'Duoc UC', period: '2024 — 2027 (en curso)', note: '3.er año. Los ramos actuales abordan desarrollo cloud native, DevOps, y seguridad y calidad del software.' },
                { degree: 'Analista Programador', school: 'Duoc UC', period: '2024 — 2026', note: 'Promedio de notas 6,5 / 7,0.' },
            ],
            certsTitle: 'Certificaciones',
            certs: [
                { name: 'Phishing: Correos Trampa', issuer: 'EMGUS SpA', date: 'jul. 2026' },
                { name: 'Cyber Security Foundation Professional Certificate (CSFPC)', issuer: 'CertiProf', date: 'dic. 2025' },
                { name: 'DevOps Essentials Professional Certification (DEPC)', issuer: 'CertiProf', date: 'nov. 2025' },
                { name: 'Scrum Master Professional Certification (SMPC)', issuer: 'CertiProf', date: 'nov. 2025' },
                { name: 'Python Essentials 1', issuer: 'Cisco', date: 'jun. 2024' },
            ],
        },
        stackSection: {
            kicker: 'Know-how',
            title: 'Stack Tecnológico',
            subtitle: 'Lenguajes, frameworks y bases de datos con los que trabajo.',
            categories: { frontend: 'Frontend', backend: 'Backend', database: 'Base de Datos' },
        },
        generalSection: {
            kicker: 'Más allá del código',
            title: 'Prácticas',
            subtitle: 'Conocimientos que sostienen proyectos sanos y mantenibles.',
        },
        general: [
            { title: 'Ciberseguridad', text: 'Vulnerabilidades comunes y hábitos de código seguro.' },
            { title: 'Nube', text: 'AWS y Azure para hosting y despliegues.' },
            { title: 'Gestión de Proyectos', text: 'Levantamiento de requisitos, Scrum y Kanban en Jira o Trello.' },
            { title: 'Branching Strategies', text: 'Git Flow, trunk-based development y feature branches.' },
            { title: 'Testing', text: 'Pruebas unitarias y de integración para publicar cambios con confianza.' },
            { title: 'Linux', text: 'Manjaro como sistema diario. Cómoda en la terminal.' },
            { title: 'Arquitectura de Software', text: 'Diseños por capas y microservicios con contratos de API claros.' },
            { title: 'Analytics', text: 'Convertir datos en gráficos que apoyan la toma de decisiones.' },
        ],
        projects: {
            kicker: 'Portafolio',
            title: 'Trabajo seleccionado',
            subtitle: 'Elige un proyecto para ver qué hace y qué lo hace interesante.',
            list: 'Proyectos',
            why: 'Para qué',
            highlights: 'Lo destacado',
            links: { repo: 'Repositorio', demo: 'Demo en vivo', front: 'Repo frontend', back: 'Repo backend' },
            more: 'Más en GitHub',
        },
        blog: {
            kicker: 'Blog',
            title: 'Escritos',
            subtitle: 'Una mirada personal sobre la IA y el arte, y un análisis técnico de uno de mis proyectos.',
            read: 'Leer artículo',
            minutes: (n) => `${n} min de lectura`,
            back: 'Volver al blog',
            source: 'Código fuente',
            next: 'Siguiente artículo',
        },
        contact: {
            kicker: 'Contacto',
            title: 'Conversemos',
            subtitle: 'Abierta a roles de desarrolladora junior en Gran Santiago, presencial o híbrido.',
            links: {
                github: ['GitHub', 'Código y proyectos de la carrera'],
                linkedin: ['LinkedIn', 'Experiencia y formación'],
                art: ['Ilustración', 'Dibujo a mano, en Instagram'],
            },
            manjaro: ['Manjaro Linux', 'Mi sistema de uso diario · bash'],
        },
        footer: {
            walkerHint: 'Haz clic en el camino para mover al fantasma.',
            walkerLabel: 'Mover al fantasma',
            top: 'Volver arriba',
        },
        dateLocale: 'es-CL',
    },
}

const SECTION_IDS = ['about', 'skills', 'projects', 'blog', 'contact']

/* ═══════════════════════════════════════════════════════════
   Hooks
   ═══════════════════════════════════════════════════════════ */
function prefersReducedMotion() {
    return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function useLanguage() {
    const [lang, setLang] = useState(() => {
        try {
            const saved = localStorage.getItem('lang')
            if (saved === 'en' || saved === 'es') return saved
        } catch {
            /* almacenamiento no disponible */
        }
        return navigator.language?.startsWith('es') ? 'es' : 'en'
    })

    useEffect(() => {
        document.documentElement.lang = lang
        try {
            localStorage.setItem('lang', lang)
        } catch {
            /* almacenamiento no disponible */
        }
    }, [lang])

    const toggle = () => setLang((l) => (l === 'en' ? 'es' : 'en'))
    return { lang, toggle }
}

/* Router mínimo por hash: #/blog/<slug> abre un artículo; cualquier otro hash es la landing */
function readArticle() {
    const match = window.location.hash.match(/^#\/blog\/([\w-]+)/)
    return match && ARTICLES.some((a) => a.slug === match[1]) ? match[1] : null
}

function useArticleRoute() {
    const [slug, setSlug] = useState(readArticle)

    useEffect(() => {
        const onChange = () => setSlug(readArticle())
        window.addEventListener('hashchange', onChange)
        return () => window.removeEventListener('hashchange', onChange)
    }, [])

    return slug
}

function useActiveSection(enabled) {
    const [active, setActive] = useState(null)

    useEffect(() => {
        if (!enabled) return
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: '-45% 0px -50% 0px' },
        )
        SECTION_IDS.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [enabled])

    return enabled ? active : 'blog'
}

/* ═══════════════════════════════════════════════════════════
   Piezas pequeñas
   ═══════════════════════════════════════════════════════════ */

/* Cada sección ocupa una pantalla en tablet y escritorio; en móvil crece según su contenido.
   El padding superior deja espacio para la navbar fija. */
const SCREEN = 'flex flex-col justify-center pb-14 pt-24 md:min-h-svh'

function Container({ children, className = '' }) {
    return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
}

function WinBar({ title }) {
    return (
        <div className="win-bar">
            <span className="win-title flex-1">{title}</span>
            <span className="flex gap-1.5" aria-hidden="true">
                <span className="win-btn" />
                <span className="win-btn" />
                <span className="win-btn bg-[var(--plum)]" />
            </span>
        </div>
    )
}

function SectionHeading({ num, kicker, title, subtitle }) {
    return (
        <header className="mb-9 max-w-3xl">
            <p className="kicker flex items-center gap-2.5">
                <Sprite name="spark" className="h-3.5 w-3.5" />
                {num} // {kicker}
            </p>
            <h2 className="display mt-3 text-[clamp(1.9rem,4.2vw,3rem)]">{title}</h2>
            {subtitle && <p className="mt-3 max-w-2xl leading-relaxed t-ink2">{subtitle}</p>}
        </header>
    )
}

const ICONS = {
    github: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.51-3.5-.7-3.72-1.34-.13-.32-.68-1.34-1.16-1.6-.4-.22-.97-.76-.01-.77.9-.02 1.55.85 1.76 1.2 1.03 1.76 2.68 1.26 3.34.96.1-.76.4-1.26.73-1.55-2.55-.29-5.23-1.31-5.23-5.82 0-1.28.45-2.34 1.19-3.16-.12-.3-.52-1.52.11-3.15 0 0 .97-.32 3.18 1.2a10.7 10.7 0 0 1 5.79 0c2.2-1.52 3.17-1.2 3.17-1.2.64 1.63.24 2.85.12 3.15.74.82 1.19 1.87 1.19 3.16 0 4.52-2.69 5.53-5.25 5.82.42.37.78 1.09.78 2.2 0 1.59-.01 2.87-.01 3.26 0 .27.18.6.69.49A10.2 10.2 0 0 0 22 12.19C22 6.58 17.52 2 12 2z" />
        </svg>
    ),
    linkedin: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.5 8.75h3.9V21H3.5zM10 8.75h3.74v1.68h.05c.52-.94 1.8-1.93 3.7-1.93 3.96 0 4.69 2.5 4.69 5.76V21h-3.9v-6.13c0-1.46-.03-3.34-2.1-3.34-2.1 0-2.42 1.58-2.42 3.23V21H10z" />
        </svg>
    ),
    art: <Sprite name="frame" className="h-5 w-6" />,
}

const CONTACT_LINKS = [
    { id: 'github', href: GITHUB_URL, text: 'github.com/pear1s1ug' },
    { id: 'linkedin', href: LINKEDIN_URL, text: 'in/carla-prado' },
    { id: 'art', href: ART_URL, text: '@mauve.aphelion' },
]

/* Texto con `código` y **negrita** */
function Rich({ text }) {
    return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
        return part
    })
}

function CodeBlock({ lang, code }) {
    const comment = lang === 'java' ? /^\s*(\/\/|\/\*\*?|\*)/ : /^\s*#/
    return (
        <figure className="codeblock win">
            <WinBar title={lang} />
            <pre>
                <code>
                    {code.split('\n').map((line, i) => (
                        <span key={i} className={comment.test(line) ? 'cm' : undefined}>
                            {line}
                            {'\n'}
                        </span>
                    ))}
                </code>
            </pre>
        </figure>
    )
}

function formatDate(iso, locale) {
    return new Date(`${iso}T12:00:00`).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
}

function LanguageSwitch({ lang, onToggle, label }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label={label}
            className="relative flex h-8 w-[70px] shrink-0 cursor-pointer items-center border border-[var(--line)] bg-[var(--bg2)] px-[3px] transition-colors duration-200 hover:border-[var(--lilac)]"
        >
            <span className={`absolute top-[3px] h-[24px] w-[31px] bg-[var(--lilac)] transition-transform duration-200 ease-out ${lang === 'es' ? 'translate-x-[32px]' : 'translate-x-0'}`} />
            {['en', 'es'].map((l) => (
                <span key={l} className={`pixel relative z-10 flex-1 text-center text-[0.66rem] transition-colors duration-200 ${lang === l ? 'text-[var(--bg)]' : 't-ink3'}`}>
                    {l}
                </span>
            ))}
        </button>
    )
}

/* ═══════════════════════════════════════════════════════════
   Navbar
   ═══════════════════════════════════════════════════════════ */
function Navbar({ t, active, lang, toggleLang }) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (!open) return
        const onKey = (e) => e.key === 'Escape' && setOpen(false)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open])

    const linkClass = (id) =>
        `pixel relative px-3 py-2 text-[0.72rem] transition-colors duration-200 ${active === id ? 't-pink' : 't-ink2 hover:text-[var(--ink)]'}`

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line-soft)] bg-[#100e17]/90 backdrop-blur-sm">
            <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-5 sm:px-8">
                <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                    <Sprite name="ghost" className="h-6 w-6" />
                    <span className="pixel text-[0.8rem] t-ink">
                        carla<span className="t-pink">.</span>prado
                    </span>
                </a>

                <ul className="ml-auto hidden items-center md:flex">
                    {SECTION_IDS.map((id) => (
                        <li key={id}>
                            <a href={`#${id}`} className={linkClass(id)} aria-current={active === id ? 'true' : undefined}>
                                {t.nav[id]}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="ml-auto flex items-center gap-3 md:ml-3">
                    <LanguageSwitch lang={lang} onToggle={toggleLang} label={t.langSwitch} />
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        aria-label={t.menu}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[var(--line)] t-ink hover:border-[var(--lilac)] md:hidden"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                        </svg>
                    </button>
                </div>
            </nav>

            {open && (
                <ul id="mobile-menu" className="flex flex-col border-t border-[var(--line-soft)] px-5 py-3 md:hidden">
                    {SECTION_IDS.map((id) => (
                        <li key={id}>
                            <a href={`#${id}`} onClick={() => setOpen(false)} className={`${linkClass(id)} block py-3`}>
                                {t.nav[id]}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </header>
    )
}

/* ═══════════════════════════════════════════════════════════
   Hero
   ═══════════════════════════════════════════════════════════ */
function Typewriter({ text, hint }) {
    const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0))
    const done = count >= text.length

    useEffect(() => {
        if (done) return
        const id = setTimeout(() => setCount((c) => c + 1), 32)
        return () => clearTimeout(id)
    }, [count, done])

    return (
        <p className="mono min-h-[1.7em] text-[0.88rem] leading-relaxed t-ink" onClick={() => setCount(text.length)} title={done ? undefined : hint}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {text.slice(0, count)}
                {!done && <span className="caret" />}
            </span>
        </p>
    )
}

function Hero({ t, lang }) {
    return (
        <section id="top" className="dots relative flex min-h-svh flex-col justify-center overflow-hidden pb-14 pt-24">
            <Container className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                    <p className="kicker rise">▸ {t.hero.kicker}</p>
                    <h1 className="display rise d1 mt-6 text-[clamp(3rem,9vw,6.4rem)]">
                        Carla
                        <br />
                        <span className="t-lilac">Prado</span>
                    </h1>
                    <p className="rise d2 mt-8 max-w-xl text-[1.12rem] leading-relaxed t-ink2">{t.hero.lead}</p>
                    <p className="mono rise d2 mt-4 max-w-xl text-balance text-[0.8rem] leading-relaxed t-ink3">{t.hero.meta}</p>
                    <div className="rise d3 mt-10 flex flex-wrap items-center gap-4">
                        <a href="#projects" className="btn btn-primary">
                            {t.hero.primary} <span aria-hidden="true">→</span>
                        </a>
                        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-icon" aria-label="GitHub">
                            {ICONS.github}
                        </a>
                        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-icon" aria-label="LinkedIn">
                            {ICONS.linkedin}
                        </a>
                    </div>
                </div>

                <div className="rise d4 relative mx-auto w-full max-w-[360px] lg:mr-0">
                    <div className="win ticks">
                        <WinBar title="carla.png" />
                        <div className="scan relative flex justify-center bg-[#110e1a] px-4 pb-14 pt-5">
                            <img src={portrait} width={60} height={75} alt={t.hero.portraitAlt} className="crisp h-[300px] w-[240px] sm:h-[375px] sm:w-[300px]" />
                        </div>
                    </div>
                    <div className="dlg relative z-10 -mt-12 mx-3 px-5 pb-4 pt-3 sm:-mx-8">
                        <p className="pixel mb-2 text-[0.72rem] t-pink">{t.hero.speaker}</p>
                        <Typewriter key={lang} text={t.hero.line} hint={t.hero.skipHint} />
                        <nav aria-label={t.hero.quick} className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                            {Object.entries(t.hero.choices).map(([id, label]) => (
                                <a key={id} href={`#${id}`} className="choice">
                                    {label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </Container>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════
   Sobre mí
   ═══════════════════════════════════════════════════════════ */
function About({ t }) {
    const a = t.about
    return (
        <section id="about" className={SCREEN}>
            <Container>
                <SectionHeading num="01" kicker={a.kicker} title={a.title} />
                <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <p className="max-w-xl text-[1.06rem] leading-[1.8] t-ink2">{a.intro}</p>
                        <a href={ART_URL} target="_blank" rel="noopener noreferrer" className="win lift mt-6 inline-flex items-center gap-4 py-3 pl-3 pr-5">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-[var(--line)] bg-[var(--bg)]">
                                <Sprite name="frame" className="h-7 w-8" />
                            </span>
                            <span>
                                <span className="pixel block text-[0.72rem] t-pink">
                                    {a.art} <span aria-hidden="true">↗</span>
                                </span>
                                <span className="mt-1 block text-[0.88rem] t-ink3">{a.artNote}</span>
                            </span>
                        </a>

                        <h3 className="pixel mt-9 text-[0.78rem] t-lilac">{a.experienceTitle}</h3>
                        <ol className="mt-5 border-l border-[var(--line)]">
                            {a.experience.map((e, i) => (
                                <li key={e.role} className="relative pb-6 pl-7 last:pb-0">
                                    <span aria-hidden="true" className={`absolute -left-[5px] top-1.5 h-[9px] w-[9px] ${i === 0 ? 'bg-[var(--pink)]' : 'border border-[var(--line)] bg-[var(--bg)]'}`} />
                                    <p className="mono text-[0.72rem] t-ink3">{e.period}</p>
                                    <h4 className="mt-0.5 font-semibold t-ink">{e.role}</h4>
                                    <p className="text-[0.92rem] t-ink2">
                                        <span className={i === 0 ? 't-pink' : undefined}>{e.org}</span>
                                        {e.type && <span className="t-ink3"> · {e.type}</span>}
                                    </p>
                                    {e.note && <p className="mt-1 text-[0.92rem] t-ink2">{e.note}</p>}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="win ticks">
                            <WinBar title={`${a.educationTitle.toLowerCase()}.txt`} />
                            <ul className="divide-y divide-[var(--line-soft)]">
                                {a.education.map((ed) => (
                                    <li key={ed.degree} className="px-5 py-3.5">
                                        <p className="mono text-[0.72rem] t-ink3">{ed.period}</p>
                                        <h4 className="mt-0.5 font-semibold leading-snug t-ink">{ed.degree}</h4>
                                        <p className="text-[0.9rem] t-pink">{ed.school}</p>
                                        <p className="mt-1.5 text-[0.9rem] leading-relaxed t-ink2">{ed.note}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="win ticks">
                            <WinBar title={`${a.certsTitle.toLowerCase()}.txt`} />
                            <ul className="divide-y divide-[var(--line-soft)]">
                                {a.certs.map((c) => (
                                    <li key={c.name} className="flex items-baseline justify-between gap-4 px-5 py-2.5">
                                        <span className="text-[0.9rem] leading-snug t-ink">
                                            {c.name} <span className="t-ink3">· {c.issuer}</span>
                                        </span>
                                        <span className="mono shrink-0 text-[0.7rem] t-ink3">{c.date}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════
   Habilidades (contenido preservado, solo cambia la presentación)
   ═══════════════════════════════════════════════════════════ */
function Skills({ t }) {
    const generalItems = GENERAL_META.map((m, i) => ({ ...m, ...t.general[i] }))
    return (
        <section id="skills" className={`${SCREEN} border-y border-[var(--line-soft)] bg-[var(--bg2)]`}>
            <Container>
                <SectionHeading num="02" kicker={t.stackSection.kicker} title={t.stackSection.title} subtitle={t.stackSection.subtitle} />

                <div className="grid gap-7 md:grid-cols-3">
                    {STACK_META.map((cat) => (
                        <div key={cat.id} className="win ticks">
                            <WinBar title={`${cat.id}.txt`} />
                            <div className="p-5">
                                <h3 className="mb-4 flex items-center gap-2.5 font-semibold t-ink">
                                    <span aria-hidden="true" className={`h-2.5 w-2.5 ${cat.dot}`} />
                                    {t.stackSection.categories[cat.id]}
                                </h3>
                                <ul className="flex flex-wrap gap-2">
                                    {cat.items.map((item) => (
                                        <li key={item} className="chip">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <h3 className="display text-[clamp(1.35rem,2.6vw,1.75rem)]">{t.generalSection.title}</h3>
                    <p className="kicker">{t.generalSection.kicker}</p>
                    <p className="w-full t-ink2">{t.generalSection.subtitle}</p>
                </div>
                <ul className="mt-6 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
                    {generalItems.map((g) => (
                        <li key={g.id} className="bg-[var(--panel)] px-5 py-4 transition-colors duration-200 hover:bg-[var(--panel2)]">
                            <div className="mb-1.5 flex items-center gap-2.5">
                                <span className="t-lilac">{g.icon}</span>
                                <h4 className="font-semibold t-ink">{g.title}</h4>
                            </div>
                            <p className="text-[0.88rem] leading-relaxed t-ink2">{g.text}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════
   Proyectos: menú de selección + panel de detalle
   ═══════════════════════════════════════════════════════════ */
function Projects({ t, lang }) {
    const [selected, setSelected] = useState(0)
    const tabs = useRef([])
    const project = PROJECTS[selected]
    const c = project[lang]

    const onKeyDown = (e) => {
        const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
        if (!delta) return
        e.preventDefault()
        const next = (selected + delta + PROJECTS.length) % PROJECTS.length
        setSelected(next)
        tabs.current[next]?.focus()
    }

    return (
        <section id="projects" className={SCREEN}>
            <Container>
                <SectionHeading num="03" kicker={t.projects.kicker} title={t.projects.title} subtitle={t.projects.subtitle} />
                <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
                    <div role="tablist" aria-label={t.projects.list} aria-orientation="vertical" onKeyDown={onKeyDown} className="flex flex-col gap-2.5">
                        {PROJECTS.map((p, i) => (
                            <button
                                key={p.id}
                                ref={(el) => (tabs.current[i] = el)}
                                type="button"
                                role="tab"
                                id={`tab-${p.id}`}
                                aria-selected={i === selected}
                                aria-controls="project-panel"
                                tabIndex={i === selected ? 0 : -1}
                                onClick={() => setSelected(i)}
                                className={`proj-tab ${i === selected ? 'is-active' : ''}`}
                            >
                                <span className="mark" aria-hidden="true">▶</span>
                                <Sprite name={p.sprite} className="h-7 w-7 shrink-0" />
                                <span className="min-w-0">
                                    <span className="block font-semibold t-ink">{p.name}</span>
                                    <span className="block truncate text-[0.78rem] t-ink3">{p.tech.slice(0, 3).join(' · ')}</span>
                                </span>
                            </button>
                        ))}
                    </div>

                    <article id="project-panel" role="tabpanel" aria-labelledby={`tab-${project.id}`} className="win ticks min-w-0">
                        <WinBar title={project.slug} />
                        <div key={project.id} className="fade-in p-6 sm:p-7">
                            <h3 className="display text-[clamp(1.35rem,3vw,1.75rem)]">{project.name}</h3>
                            <p className="pixel mt-2 text-[0.66rem] leading-relaxed t-ink3">{c.context}</p>

                            <div className="mt-5 grid gap-x-9 gap-y-5 md:grid-cols-2">
                                <div>
                                    <p className="leading-relaxed t-ink2">{c.description}</p>
                                    <p className="mt-4 text-[0.93rem] leading-relaxed t-ink2">
                                        <span className="pixel mr-2 text-[0.66rem] t-pink">{t.projects.why}:</span>
                                        {c.purpose}
                                    </p>
                                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech">
                                        {project.tech.map((tech) => (
                                            <li key={tech} className="chip">
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="pixel text-[0.66rem] t-lilac">{t.projects.highlights}</p>
                                    <ul className="prose mt-3 text-[0.92rem]">
                                        {c.highlights.map((h) => (
                                            <li key={h}>{h}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--line-soft)] pt-4">
                                {project.links.map((l) => (
                                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="arrow-link">
                                        {t.projects.links[l.kind]} <span aria-hidden="true">↗</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </article>
                </div>
            </Container>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════
   Blog: listado y vista de artículo
   ═══════════════════════════════════════════════════════════ */
function Blog({ t, lang }) {
    return (
        <section id="blog" className={`${SCREEN} border-y border-[var(--line-soft)] bg-[var(--bg2)]`}>
            <Container>
                <SectionHeading num="04" kicker={t.blog.kicker} title={t.blog.title} subtitle={t.blog.subtitle} />
                <div className="grid gap-8 md:grid-cols-2">
                    {ARTICLES.map((article, i) => {
                        const c = article[lang]
                        return (
                            <article key={article.slug} className="win ticks lift group relative flex min-w-0 flex-col">
                                <WinBar title={`article_0${i + 1}.md`} />
                                <div className="flex flex-1 flex-col p-6 sm:p-7">
                                    <p className="mono text-[0.74rem] t-ink3">
                                        <time dateTime={article.date}>{formatDate(article.date, t.dateLocale)}</time> · {t.blog.minutes(readingMinutes(c.blocks))}
                                    </p>
                                    <h3 className="display-soft mt-3 text-[1.35rem]">
                                        <a href={`#/blog/${article.slug}`} className="after:absolute after:inset-0 group-hover:text-[var(--lilac)]">
                                            {c.title}
                                        </a>
                                    </h3>
                                    <p className="mt-4 leading-relaxed t-ink2">{c.summary}</p>
                                    <ul className="mt-auto flex flex-wrap gap-2 pt-6">
                                        {article.tags.map((tag) => (
                                            <li key={tag} className="chip">
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="arrow-link mt-6 border-t border-[var(--line-soft)] pt-5" aria-hidden="true">
                                        {t.blog.read} <span>→</span>
                                    </p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}

function ArticleView({ slug, t, lang }) {
    const index = ARTICLES.findIndex((a) => a.slug === slug)
    const article = ARTICLES[index]
    const next = ARTICLES[(index + 1) % ARTICLES.length]
    const c = article[lang]

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
    }, [slug])

    useEffect(() => {
        document.title = `${c.title} · Carla Prado`
        return () => {
            document.title = 'Carla Prado · Software Developer'
        }
    }, [c.title])

    return (
        <article className="mx-auto w-full max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-36">
            <a href="#blog" className="arrow-link">
                <span aria-hidden="true">←</span> {t.blog.back}
            </a>
            <header className="mt-10 border-b border-[var(--line)] pb-10">
                <ul className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                        <li key={tag} className="chip">
                            {tag}
                        </li>
                    ))}
                </ul>
                <h1 className="display-soft mt-6 text-[clamp(1.9rem,4.5vw,2.8rem)]">{c.title}</h1>
                <p className="mt-5 text-[1.08rem] leading-relaxed t-ink2">{c.summary}</p>
                <p className="mono mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[0.76rem] t-ink3">
                    <span>Carla Prado</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={article.date}>{formatDate(article.date, t.dateLocale)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{t.blog.minutes(readingMinutes(c.blocks))}</span>
                    {article.repo && (
                        <>
                            <span aria-hidden="true">·</span>
                            <a href={article.repo} target="_blank" rel="noopener noreferrer" className="t-lilac underline decoration-dotted underline-offset-4 hover:text-[var(--pink)]">
                                {t.blog.source} ↗
                            </a>
                        </>
                    )}
                </p>
            </header>

            <div className="prose mt-10 text-[1.02rem] t-ink2">
                {c.blocks.map(([type, a, b], i) => {
                    if (type === 'h') return <h2 key={i}>{a}</h2>
                    if (type === 'code') return <CodeBlock key={i} lang={a} code={b} />
                    if (type === 'ul')
                        return (
                            <ul key={i}>
                                {a.map((item) => (
                                    <li key={item}>
                                        <Rich text={item} />
                                    </li>
                                ))}
                            </ul>
                        )
                    return (
                        <p key={i}>
                            <Rich text={a} />
                        </p>
                    )
                })}
            </div>

            <footer className="mt-16 grid gap-6 border-t border-[var(--line)] pt-10 sm:grid-cols-[1fr_auto] sm:items-end">
                <a href={`#/blog/${next.slug}`} className="win ticks lift block p-5">
                    <span className="pixel text-[0.68rem] t-pink">{t.blog.next} →</span>
                    <span className="display-soft mt-2 block text-[1.1rem]">{next[lang].title}</span>
                </a>
                <a href="#blog" className="btn">
                    <span aria-hidden="true">←</span> {t.blog.back}
                </a>
            </footer>
        </article>
    )
}

/* ═══════════════════════════════════════════════════════════
   Contacto
   ═══════════════════════════════════════════════════════════ */

/* Terminal decorativa de la tarjeta Manjaro: comandos reales, sin usuario@host */
const BASH_LINES = [
    ['cmd', 'uname -o'],
    ['out', 'GNU/Linux'],
    ['cmd', 'echo $SHELL'],
    ['out', '/bin/bash'],
]

function Contact({ t }) {
    const c = t.contact
    return (
        <section id="contact" className={SCREEN}>
            <Container>
                <SectionHeading num="05" kicker={c.kicker} title={c.title} subtitle={c.subtitle} />
                <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_0.6fr]">
                    <ul className="flex flex-col gap-4">
                        {CONTACT_LINKS.map((l) => (
                            <li key={l.id}>
                                <a href={l.href} target="_blank" rel="noopener noreferrer" className="win lift flex items-center gap-4 p-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--line)] bg-[var(--bg)] t-lilac">{ICONS[l.id]}</span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block font-semibold t-ink">{c.links[l.id][0]}</span>
                                        <span className="block text-[0.88rem] t-ink3">{c.links[l.id][1]}</span>
                                    </span>
                                    <span className="mono hidden text-[0.78rem] t-lilac sm:inline">{l.text}</span>
                                    <span aria-hidden="true" className="t-pink">↗</span>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <figure className="manjaro mx-auto flex w-full max-w-[300px] flex-col items-center px-5 pb-5 pt-5">
                        <Sprite name="manjaro" className="h-[132px] w-[132px]" />
                        <figcaption className="mt-3 text-center">
                            <span className="pixel block text-[0.74rem] text-[#35bf5c]">{c.manjaro[0]}</span>
                            <span className="mono mt-1 block text-[0.74rem] text-[#7fcfae]">{c.manjaro[1]}</span>
                        </figcaption>
                        <div className="bash mt-4 w-full" aria-hidden="true">
                            <div className="bash-bar">
                                <span>bash</span>
                                <span className="flex gap-1">
                                    <span className="bash-btn" />
                                    <span className="bash-btn" />
                                    <span className="bash-btn bg-[#35bf5c]" />
                                </span>
                            </div>
                            <div className="mono px-3 py-2.5 text-[0.74rem] leading-[1.65]">
                                {BASH_LINES.map(([kind, text]) => (
                                    <p key={text} className={kind === 'cmd' ? 'text-[#e8f5ee]' : 'text-[#7fcfae]'}>
                                        {kind === 'cmd' && <span className="text-[#35bf5c]">$ </span>}
                                        {text}
                                    </p>
                                ))}
                                <p>
                                    <span className="text-[#35bf5c]">$ </span>
                                    <span className="caret" />
                                </p>
                            </div>
                        </div>
                    </figure>
                </div>
            </Container>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════
   Footer: escena nocturna con el fantasma caminante
   ═══════════════════════════════════════════════════════════ */
const WALKER_MIN = 4
const WALKER_MAX = 96
const WALKER_WALK_MS = 550

function useWalker() {
    const [pos, setPos] = useState(50)
    const [facing, setFacing] = useState('right')
    const [walking, setWalking] = useState(false)
    const timeoutRef = useRef(null)

    useEffect(() => () => clearTimeout(timeoutRef.current), [])

    const walkTo = (target) => {
        const clamped = Math.min(WALKER_MAX, Math.max(WALKER_MIN, target))
        setFacing(clamped >= pos ? 'right' : 'left')
        setPos(clamped)
        setWalking(true)
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setWalking(false), WALKER_WALK_MS)
    }

    return { pos, facing, walking, walkTo }
}

function Footer({ t }) {
    const { pos, facing, walking, walkTo } = useWalker()

    const handleClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        if (e.clientX) walkTo(((e.clientX - rect.left) / rect.width) * 100)
    }

    const handleKey = (e) => {
        if (e.key === 'ArrowLeft') walkTo(pos - 8)
        if (e.key === 'ArrowRight') walkTo(pos + 8)
    }

    return (
        <footer className="relative">
            <div className="crisp relative h-[192px] bg-[var(--bg)] bg-[length:auto_192px] bg-bottom bg-repeat-x" style={{ backgroundImage: `url(${nightScene})` }}>
                <p className="pixel absolute inset-x-0 top-4 px-5 text-center text-[0.64rem] t-ink3">{t.footer.walkerHint}</p>
                <button type="button" onClick={handleClick} onKeyDown={handleKey} aria-label={t.footer.walkerLabel} className="absolute inset-x-0 bottom-0 h-[90px] w-full cursor-pointer">
                    <span className="absolute bottom-[12px] transition-[left] duration-500 ease-in-out" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
                        <span className={`block ${walking ? 'walker-walking' : 'walker-idle'}`}>
                            <span className="block" style={{ transform: facing === 'left' ? 'scaleX(-1)' : undefined }}>
                                <Sprite name="ghost" className="h-[22px] w-[24px]" />
                            </span>
                        </span>
                    </span>
                </button>
            </div>
            <Container className="flex items-center justify-between gap-4 py-5">
                <p className="mono text-[0.76rem] t-ink3">© {new Date().getFullYear()} Carla Prado</p>
                <a href="#top" className="arrow-link">
                    {t.footer.top} <span aria-hidden="true">↑</span>
                </a>
            </Container>
        </footer>
    )
}

/* ═══════════════════════════════════════════════════════════
   Página
   ═══════════════════════════════════════════════════════════ */
export default function Landing() {
    const { lang, toggle } = useLanguage()
    const t = CONTENT[lang]
    const articleSlug = useArticleRoute()
    const active = useActiveSection(!articleSlug)

    /* Al volver de un artículo a una sección (#blog, #projects...), desplazarse hasta ella */
    useEffect(() => {
        if (articleSlug) return
        const id = window.location.hash.slice(1)
        if (id && !id.startsWith('/')) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
    }, [articleSlug])

    return (
        <div className="relative min-h-screen bg-[var(--bg)] leading-[1.6] antialiased">
            <style>{STYLES}</style>
            <a href="#main" className="skip">
                {t.skip}
            </a>

            <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
                <StarField />
            </div>

            <Navbar t={t} active={active} lang={lang} toggleLang={toggle} />

            <main id="main" className="relative">
                {articleSlug ? (
                    <ArticleView slug={articleSlug} t={t} lang={lang} />
                ) : (
                    <>
                        <Hero t={t} lang={lang} />
                        <About t={t} />
                        <Skills t={t} />
                        <Projects t={t} lang={lang} />
                        <Blog t={t} lang={lang} />
                        <Contact t={t} />
                    </>
                )}
            </main>

            <Footer t={t} />
        </div>
    )
}
