import { useState, useEffect, useRef } from 'react'
import portrait from '../assets/pixel/portrait.png'
import nightScene from '../assets/pixel/night-scene.png'

/* ═══════════════════════════════════════════════════════════
   Datos de contacto
   Solo se muestran los que tienen URL. Completa LinkedIn y
   correo cuando quieras publicarlos.
   ═══════════════════════════════════════════════════════════ */
const GITHUB_USER = 'pear1s1ug'
const GITHUB_URL = `https://github.com/${GITHUB_USER}`
const LINKEDIN_URL = null // p. ej. 'https://www.linkedin.com/in/tu-perfil'
const EMAIL = null // p. ej. 'tu-correo@dominio.cl'

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
section[id] { scroll-margin-top: 4.5rem; }

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
        featured: true,
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
    queues: `private Queue colaPrincipal(String nombre, String dlq) {
    return QueueBuilder.durable(nombre)
            .deadLetterExchange(props.exchanges().dlx())
            .deadLetterRoutingKey(dlq)
            .ttl((int) props.ttlMs())
            .build();
}

/** DLQ: durable, retained for app.messaging.dlq-ttl-ms (24 h) */
private Queue dlq(String nombre) {
    return QueueBuilder.durable(nombre)
            .ttl((int) props.dlqTtlMs())
            .build();
}`,
    listener: `spring:
  rabbitmq:
    listener:
      simple:
        acknowledge-mode: manual        # the code decides ACK / NACK
        prefetch: 1
        default-requeue-rejected: false # never requeue in a loop`,
    procesar: `public void procesar(Message mensaje, Channel channel, AccionProcesamiento accion) throws IOException {
    MessageProperties propiedades = mensaje.getMessageProperties();
    long deliveryTag = propiedades.getDeliveryTag();
    String cola = propiedades.getConsumerQueue();
    int intento = intentosPrevios(propiedades);

    try {
        accion.ejecutar();
        channel.basicAck(deliveryTag, false);
    } catch (MensajeInvalidoException e) {
        // permanent: retrying will never help
        channel.basicNack(deliveryTag, false, false);
    } catch (Exception e) {
        if (intento < maxReintentos) {
            propiedades.setHeader(HEADER_REINTENTOS, intento + 1);
            rabbitTemplate.send("", cola, mensaje);
            channel.basicAck(deliveryTag, false);
        } else {
            channel.basicNack(deliveryTag, false, false);
        }
    }
}`,
    consumer: `@RabbitListener(id = "bienvenida-listener", queues = "\${app.messaging.queues.notificaciones}")
public void recibir(UsuarioRegistradoEvent evento, Message mensaje, Channel channel) throws IOException {
    procesador.procesar(mensaje, channel, () -> {
        if (evento.email() == null || evento.email().isBlank()) {
            throw new MensajeInvalidoException("Usuario sin email: no se puede notificar");
        }
        if (evento.nombre() != null && evento.nombre().contains("#falla")) {
            throw new IllegalStateException("Simulación de falla del servidor de correo");
        }
        log.info("Correo de bienvenida enviado a {} ({})", evento.nombre(), evento.email());
    });
}`,
    monitor: `@Scheduled(fixedDelay = 30000, initialDelay = 30000)
public void revisarDlqs() {
    for (String dlq : dlqs) {
        QueueInformation info = amqpAdmin.getQueueInfo(dlq);
        if (info != null && info.getMessageCount() > 0) {
            log.warn("[ALERTA DLQ] {} tiene {} mensaje(s) sin procesar", dlq, info.getMessageCount());
        }
    }
}`,
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
        slug: 'rabbitmq-manual-ack-dead-letter-queues',
        date: '2026-10-20',
        repo: `${GITHUB_URL}/desCloudNative`,
        tags: ['RabbitMQ', 'Spring AMQP', 'Java'],
        en: {
            title: 'Retry without looping: manual ACKs and dead-letter queues in RabbitMQ',
            summary: 'How the Nexus Gaming notification service decides, message by message, whether to acknowledge, retry or set a failure aside — and why the defaults aren’t enough.',
            blocks: [
                ['p', 'In a system that communicates through a message broker, the interesting question isn’t how to send a message — it’s what happens when processing it fails. If the consumer acknowledges too early, the message is gone even though the work never happened. If it rejects and requeues blindly, a single malformed message can bounce between broker and consumer forever, burning CPU and blocking everything queued behind it.'],
                ['p', 'Nexus Gaming, a microservices project for the Cloud Native Development course, has a notification service that consumes three kinds of events from RabbitMQ: a user registered, an order was created, and a product changed. This article walks through how that service handles failure, using the project’s actual configuration and code.'],
                ['h', 'The topology: every queue knows where its failures go'],
                ['p', 'Each work queue is declared with two extra arguments: a **dead-letter exchange** and a **time-to-live**. Any message that is rejected without requeue, or that waits longer than the TTL, is re-routed by the broker to that exchange, which delivers it to a dedicated dead-letter queue (DLQ).'],
                ['code', 'java', CODE.queues],
                ['p', 'In the project the TTL is 30 seconds for work queues and 24 hours for DLQs (`ttl-ms: 30000`, `dlq-ttl-ms: 86400000`). The short TTL means an event nobody can process in time ends up somewhere visible instead of waiting silently; the long retention gives someone a day to inspect it. The resulting routes are:'],
                ['ul', [
                    '`nexus.direct` → `usuario.registrado` → `nexus.notificaciones.queue`',
                    '`nexus.direct` → `orden.creada` → `nexus.tickets.queue`',
                    '`nexus.topic` → `producto.#` → `nexus.inventario.queue`',
                    'Rejected or expired → `nexus.dlx` → the matching `*.dlq`',
                ]],
                ['h', 'Taking the decision away from the framework'],
                ['p', 'By default, Spring AMQP acknowledges automatically: if the listener method returns, the message is ACKed; if it throws, the message is rejected and — by default — requeued. That second part is the dangerous one. The service switches to manual acknowledgement and turns off requeue-on-reject:'],
                ['code', 'yaml', CODE.listener],
                ['p', '`prefetch: 1` makes the broker hand each consumer one message at a time, so a slow or failing message doesn’t hold a batch of others hostage. `default-requeue-rejected: false` is the safety net: if something escapes the code’s own handling — for example, a JSON payload that can’t be converted to the event type — the container rejects it without requeueing, and the dead-letter exchange takes it to the DLQ.'],
                ['h', 'One decision table, one class'],
                ['p', 'All three consumers delegate to a single helper, `ProcesadorConAck`, so the ACK/NACK policy lives in one place. Its rules, as documented in the class itself:'],
                ['ul', [
                    '**Processed successfully** → `basicAck`; the message is consumed.',
                    '**Invalid data** (`MensajeInvalidoException`) → `basicNack` without requeue; straight to the DLQ.',
                    '**Transient error, attempts left** → republish a copy with `x-reintentos + 1`, then `basicAck` the original.',
                    '**Transient error, attempts exhausted** → `basicNack` without requeue; to the DLQ.',
                ]],
                ['code', 'java', CODE.procesar],
                ['p', 'Two details make this work. The first is separating invalid errors from transient ones: a message without an email address will never succeed, so it goes straight to the DLQ instead of wasting three attempts. The second is that retries are counted in a custom header. RabbitMQ’s own requeue doesn’t carry a counter you can rely on, so the service publishes a copy back to the same queue with the counter incremented and only then acknowledges the original. The maximum comes from configuration (`max-reintentos: 3`).'],
                ['p', 'The copy goes through the default exchange (`""`) with the queue name as the routing key. That delivers it to exactly that queue; publishing it to the original exchange would also deliver it to every other queue bound with the same key, duplicating work elsewhere.'],
                ['h', 'What a consumer looks like'],
                ['code', 'java', CODE.consumer],
                ['p', 'The listener only states the business rule and which failures are permanent. The second check is a deliberate test hook: a name containing `#falla` simulates a mail-server outage, which makes it possible to watch a message go through its retries and land in the DLQ.'],
                ['h', 'Watching the DLQs'],
                ['p', 'A dead-letter queue nobody looks at is just a slower way to lose data. The service includes a scheduled `DlqMonitor` that checks every DLQ every 30 seconds and logs a warning when any of them has messages:'],
                ['code', 'java', CODE.monitor],
                ['h', 'Trade-offs worth knowing'],
                ['ul', [
                    '**Republish-then-ACK is not atomic.** If the consumer crashes between the two calls, the broker redelivers the original while the copy also exists, so the same event can be processed twice. Consumers should be idempotent, or record the IDs of events they have already handled.',
                    '**Immediate retries don’t wait.** Republishing straight away suits short glitches. For longer outages, a delay — such as a TTL-based wait queue — gives the downstream system time to recover.',
                    '**Retries change the order.** A retried message goes to the back of the queue, so events about the same entity can be processed out of order.',
                ]],
                ['h', 'Takeaway'],
                ['p', 'Decide explicitly what every failure means. Separate errors that will never succeed from errors that might, put a limit on retries, give every queue a dead-letter destination, and make sure someone notices when that destination fills up. The code involved is small — one helper class and a few lines of configuration — but it turns “the message disappeared” into “the message is in the DLQ, and here’s why”.'],
            ],
        },
        es: {
            title: 'Reintentar sin entrar en bucle: ACK manual y dead-letter queues en RabbitMQ',
            summary: 'Cómo el servicio de notificaciones de Nexus Gaming decide, mensaje a mensaje, si confirmar, reintentar o apartar un fallo, y por qué la configuración por defecto no basta.',
            blocks: [
                ['p', 'En un sistema que se comunica a través de un broker de mensajes, la pregunta interesante no es cómo enviar un mensaje, sino qué pasa cuando procesarlo falla. Si el consumidor confirma demasiado pronto, el mensaje desaparece aunque el trabajo nunca se hizo. Si lo rechaza y lo reencola a ciegas, un solo mensaje mal formado puede rebotar entre el broker y el consumidor para siempre, gastando CPU y bloqueando todo lo que viene detrás.'],
                ['p', 'Nexus Gaming, un proyecto de microservicios para la asignatura Desarrollo Cloud Native, tiene un servicio de notificaciones que consume tres tipos de eventos desde RabbitMQ: un usuario se registró, se creó una orden y cambió un producto. Este artículo recorre cómo ese servicio maneja los fallos, usando la configuración y el código reales del proyecto.'],
                ['h', 'La topología: cada cola sabe adónde van sus fallos'],
                ['p', 'Cada cola de trabajo se declara con dos argumentos extra: un **dead-letter exchange** y un **time-to-live**. Cualquier mensaje rechazado sin reencolar, o que espera más que el TTL, es redirigido por el broker a ese exchange, que lo entrega a una dead-letter queue (DLQ) dedicada.'],
                ['code', 'java', CODE.queues],
                ['p', 'En el proyecto el TTL es de 30 segundos para las colas de trabajo y de 24 horas para las DLQ (`ttl-ms: 30000`, `dlq-ttl-ms: 86400000`). El TTL corto hace que un evento que nadie alcanza a procesar termine en un lugar visible en vez de esperar en silencio; la retención larga deja un día para revisarlo. Las rutas resultantes son:'],
                ['ul', [
                    '`nexus.direct` → `usuario.registrado` → `nexus.notificaciones.queue`',
                    '`nexus.direct` → `orden.creada` → `nexus.tickets.queue`',
                    '`nexus.topic` → `producto.#` → `nexus.inventario.queue`',
                    'Rechazado o expirado → `nexus.dlx` → su `*.dlq` correspondiente',
                ]],
                ['h', 'Quitarle la decisión al framework'],
                ['p', 'Por defecto, Spring AMQP confirma automáticamente: si el método del listener termina, el mensaje recibe ACK; si lanza una excepción, se rechaza y, por defecto, se reencola. Esa segunda parte es la peligrosa. El servicio cambia a confirmación manual y desactiva el reencolado al rechazar:'],
                ['code', 'yaml', CODE.listener],
                ['p', '`prefetch: 1` hace que el broker entregue un mensaje a la vez a cada consumidor, así un mensaje lento o con error no retiene a un lote de otros. `default-requeue-rejected: false` es la red de seguridad: si algo escapa del manejo del propio código (por ejemplo, un JSON que no se puede convertir al tipo del evento), el contenedor lo rechaza sin reencolar y el dead-letter exchange lo lleva a la DLQ.'],
                ['h', 'Una tabla de decisiones, una clase'],
                ['p', 'Los tres consumidores delegan en un único helper, `ProcesadorConAck`, para que la política de ACK/NACK viva en un solo lugar. Sus reglas, tal como están documentadas en la clase:'],
                ['ul', [
                    '**Procesamiento exitoso** → `basicAck`; el mensaje se consume.',
                    '**Dato inválido** (`MensajeInvalidoException`) → `basicNack` sin reencolar; directo a la DLQ.',
                    '**Error transitorio con intentos disponibles** → se republica una copia con `x-reintentos + 1` y luego `basicAck` del original.',
                    '**Error transitorio con intentos agotados** → `basicNack` sin reencolar; a la DLQ.',
                ]],
                ['code', 'java', CODE.procesar],
                ['p', 'Dos detalles hacen que funcione. El primero es separar errores inválidos de errores transitorios: un mensaje sin correo nunca va a funcionar, así que va directo a la DLQ en vez de gastar tres intentos. El segundo es que los reintentos se cuentan en un header propio. El reencolado de RabbitMQ no trae un contador confiable, así que el servicio publica una copia en la misma cola con el contador incrementado y solo después confirma el original. El máximo viene de la configuración (`max-reintentos: 3`).'],
                ['p', 'La copia se publica a través del exchange por defecto (`""`) usando el nombre de la cola como routing key. Así llega exactamente a esa cola; publicarla en el exchange original la entregaría también a cualquier otra cola enlazada con la misma clave, duplicando trabajo en otra parte.'],
                ['h', 'Cómo se ve un consumidor'],
                ['code', 'java', CODE.consumer],
                ['p', 'El listener solo declara la regla de negocio y qué fallos son permanentes. La segunda verificación es un gancho de prueba intencional: un nombre que contiene `#falla` simula una caída del servidor de correo, lo que permite ver cómo un mensaje pasa por sus reintentos y termina en la DLQ.'],
                ['h', 'Vigilar las DLQ'],
                ['p', 'Una dead-letter queue que nadie revisa es solo una forma más lenta de perder datos. El servicio incluye un `DlqMonitor` programado que revisa todas las DLQ cada 30 segundos y registra una advertencia cuando alguna tiene mensajes:'],
                ['code', 'java', CODE.monitor],
                ['h', 'Compromisos que conviene conocer'],
                ['ul', [
                    '**Republicar y luego confirmar no es atómico.** Si el consumidor se cae entre ambas llamadas, el broker vuelve a entregar el original mientras la copia también existe, así que el mismo evento puede procesarse dos veces. Los consumidores deberían ser idempotentes o registrar los IDs de los eventos ya procesados.',
                    '**Los reintentos inmediatos no esperan.** Republicar al instante sirve para fallas breves. Para caídas más largas, un retardo (por ejemplo, una cola de espera con TTL) le da tiempo al sistema de destino para recuperarse.',
                    '**Los reintentos cambian el orden.** Un mensaje reintentado vuelve al final de la cola, así que los eventos de una misma entidad pueden procesarse desordenados.',
                ]],
                ['h', 'Conclusión'],
                ['p', 'Decide de forma explícita qué significa cada fallo. Separa los errores que nunca van a funcionar de los que podrían, pon un límite a los reintentos, dale a cada cola un destino de dead-letter y asegúrate de que alguien se entere cuando ese destino se llena. El código necesario es poco (una clase helper y unas líneas de configuración), pero transforma “el mensaje desapareció” en “el mensaje está en la DLQ, y esta es la razón”.'],
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
            secondary: 'Read the blog',
            portraitAlt: 'Pixel-art portrait of Carla Prado',
            status: 'Full-stack · Year 03',
            speaker: 'Carla',
            line: 'Hi! Right now I’m building corporate software at RockTruck while I finish my engineering degree. Where do you want to go?',
            skipHint: 'Click to skip',
            quick: 'Quick links',
            choices: { projects: 'Projects', blog: 'Blog', contact: 'Contact' },
        },
        about: {
            kicker: 'About',
            title: 'About me',
            paragraphs: [
                'I’m a developer based in Santiago, Chile. Since January 2026 I’ve been working as a junior software developer (trainee) at RockTruck, building corporate software for a logistics company, while I finish my Software Engineering degree at Duoc UC.',
                'My coursework and projects lean towards the backend: Spring Boot services secured with JWT and OAuth 2.0, message queues with RabbitMQ, relational databases, and the React frontends that sit on top of them. I also took an elective in cybersecurity, where I worked with Wireshark and Kali Linux. Manjaro Linux is my everyday system, which keeps me in the terminal and learning bash.',
                'Before code, I trained in art and graphic design (Illustrator, Photoshop, InDesign), so I care about how an interface reads — not only whether it works.',
            ],
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
        skills: { kicker: 'Skills' },
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
            kicker: 'Projects',
            title: 'Selected work',
            subtitle: 'Five projects from my GitHub, each showing a different part of how I work — from security and messaging to optimisation, interfaces and mobile.',
            why: 'Why',
            highlights: 'Highlights',
            links: { repo: 'Repository', demo: 'Live demo', front: 'Frontend repo', back: 'Backend repo' },
            more: 'More on GitHub',
        },
        blog: {
            kicker: 'Blog',
            title: 'Notes from my projects',
            subtitle: 'Technical decisions from my own repositories, explained with the real code.',
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
            echo: 'Hello',
            whoami: 'Carla Prado — software developer',
            location: 'Gran Santiago, Chile · on-site / hybrid',
            pending: 'LinkedIn and email coming soon — GitHub is the best place to find me for now.',
            labels: { github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' },
        },
        footer: {
            walkerHint: 'Click the path, or focus it and use ← →, to move the ghost.',
            walkerLabel: 'Move the ghost',
            built: 'Designed and built by Carla Prado with React, Tailwind CSS and Vite.',
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
            secondary: 'Leer el blog',
            portraitAlt: 'Retrato en pixel art de Carla Prado',
            status: 'Full-stack · Año 03',
            speaker: 'Carla',
            line: '¡Hola! Hoy desarrollo software corporativo en RockTruck mientras termino Ingeniería. ¿A dónde quieres ir?',
            skipHint: 'Haz clic para saltar',
            quick: 'Accesos rápidos',
            choices: { projects: 'Proyectos', blog: 'Blog', contact: 'Contacto' },
        },
        about: {
            kicker: 'Sobre mí',
            title: 'Sobre mí',
            paragraphs: [
                'Soy desarrolladora y vivo en Santiago de Chile. Desde enero de 2026 trabajo como desarrolladora de software junior (trainee) en RockTruck, creando software corporativo para una empresa de logística, mientras termino Ingeniería en Informática en Duoc UC.',
                'Mis ramos y proyectos se inclinan hacia el backend: servicios Spring Boot protegidos con JWT y OAuth 2.0, colas de mensajes con RabbitMQ, bases de datos relacionales y los frontends en React que se apoyan en ellos. También tomé un electivo de ciberseguridad, donde trabajé con Wireshark y Kali Linux. Manjaro Linux es mi sistema de uso diario, lo que me mantiene en la terminal y aprendiendo bash.',
                'Antes del código me formé en arte y diseño gráfico (Illustrator, Photoshop, InDesign), así que me importa cómo se lee una interfaz, no solo que funcione.',
            ],
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
        skills: { kicker: 'Habilidades' },
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
            kicker: 'Proyectos',
            title: 'Trabajo seleccionado',
            subtitle: 'Cinco proyectos de mi GitHub; cada uno muestra una parte distinta de cómo trabajo, desde seguridad y mensajería hasta optimización, interfaces y desarrollo móvil.',
            why: 'Para qué',
            highlights: 'Lo destacado',
            links: { repo: 'Repositorio', demo: 'Demo en vivo', front: 'Repo frontend', back: 'Repo backend' },
            more: 'Más en GitHub',
        },
        blog: {
            kicker: 'Blog',
            title: 'Notas de mis proyectos',
            subtitle: 'Decisiones técnicas de mis propios repositorios, explicadas con el código real.',
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
            echo: 'Hola',
            whoami: 'Carla Prado — desarrolladora de software',
            location: 'Gran Santiago, Chile · presencial / híbrido',
            pending: 'LinkedIn y correo, pronto. Por ahora, GitHub es el mejor lugar para encontrarme.',
            labels: { github: 'GitHub', linkedin: 'LinkedIn', email: 'Correo' },
        },
        footer: {
            walkerHint: 'Haz clic en el camino, o enfócalo y usa ← →, para mover al fantasma.',
            walkerLabel: 'Mover al fantasma',
            built: 'Diseñado y desarrollado por Carla Prado con React, Tailwind CSS y Vite.',
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
        <header className="mb-12 max-w-3xl">
            <p className="kicker flex items-center gap-2.5">
                <Sprite name="spark" className="h-3.5 w-3.5" />
                {num} // {kicker}
            </p>
            <h2 className="display mt-4 text-[clamp(2.1rem,5.5vw,3.6rem)]">{title}</h2>
            {subtitle && <p className="mt-5 max-w-2xl text-[1.04rem] leading-relaxed t-ink2">{subtitle}</p>}
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
    email: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3.5 6.5L12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
}

const CONTACT_LINKS = [
    { id: 'github', href: GITHUB_URL, text: `github.com/${GITHUB_USER}` },
    { id: 'linkedin', href: LINKEDIN_URL, text: LINKEDIN_URL?.replace(/^https?:\/\/(www\.)?/, '') },
    { id: 'email', href: EMAIL && `mailto:${EMAIL}`, text: EMAIL },
].filter((c) => c.href)

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
        const id = setTimeout(() => setCount((c) => c + 1), 26)
        return () => clearTimeout(id)
    }, [count, done])

    return (
        <p className="mono min-h-[4.9em] text-[0.86rem] leading-relaxed t-ink" onClick={() => setCount(text.length)} title={done ? undefined : hint}>
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
        <section id="top" className="dots relative overflow-hidden pb-20 pt-28 sm:pt-36">
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
                        <a href="#blog" className="btn">
                            {t.hero.secondary}
                        </a>
                        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn-icon" aria-label="GitHub">
                            {ICONS.github}
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
                            <a href="#projects" className="choice">{t.hero.choices.projects}</a>
                            <a href="#blog" className="choice">{t.hero.choices.blog}</a>
                            <a href="#contact" className="choice">{t.hero.choices.contact}</a>
                        </nav>
                    </div>
                    <p className="pixel mt-4 text-center text-[0.66rem] t-ink3">◆ {t.hero.status}</p>
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
        <section id="about" className="py-24">
            <Container>
                <SectionHeading num="01" kicker={a.kicker} title={a.title} />
                <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                        <div className="space-y-5 text-[1.04rem] leading-[1.8] t-ink2">
                            {a.paragraphs.map((p) => (
                                <p key={p.slice(0, 24)}>{p}</p>
                            ))}
                        </div>

                        <h3 className="pixel mt-14 text-[0.8rem] t-lilac">{a.experienceTitle}</h3>
                        <ol className="mt-6 border-l border-[var(--line)]">
                            {a.experience.map((e, i) => (
                                <li key={e.role} className="relative pb-8 pl-7 last:pb-0">
                                    <span aria-hidden="true" className={`absolute -left-[5px] top-1.5 h-[9px] w-[9px] ${i === 0 ? 'bg-[var(--pink)]' : 'border border-[var(--line)] bg-[var(--bg)]'}`} />
                                    <p className="mono text-[0.74rem] t-ink3">{e.period}</p>
                                    <h4 className="mt-1 text-[1.06rem] font-semibold t-ink">{e.role}</h4>
                                    <p className="mt-0.5 text-[0.95rem] t-ink2">
                                        <span className={i === 0 ? 't-pink' : undefined}>{e.org}</span>
                                        {e.type && <span className="t-ink3"> · {e.type}</span>}
                                    </p>
                                    {e.note && <p className="mt-2 text-[0.95rem] t-ink2">{e.note}</p>}
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="win ticks">
                            <WinBar title={`${a.educationTitle.toLowerCase()}.txt`} />
                            <ul className="divide-y divide-[var(--line-soft)]">
                                {a.education.map((ed) => (
                                    <li key={ed.degree} className="p-5">
                                        <p className="mono text-[0.74rem] t-ink3">{ed.period}</p>
                                        <h4 className="mt-1 font-semibold leading-snug t-ink">{ed.degree}</h4>
                                        <p className="mt-0.5 text-[0.92rem] t-pink">{ed.school}</p>
                                        <p className="mt-2 text-[0.92rem] leading-relaxed t-ink2">{ed.note}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="win ticks">
                            <WinBar title={`${a.certsTitle.toLowerCase()}.txt`} />
                            <ul className="divide-y divide-[var(--line-soft)]">
                                {a.certs.map((c) => (
                                    <li key={c.name} className="flex items-baseline justify-between gap-4 px-5 py-3.5">
                                        <span>
                                            <span className="block text-[0.94rem] leading-snug t-ink">{c.name}</span>
                                            <span className="text-[0.84rem] t-ink3">{c.issuer}</span>
                                        </span>
                                        <span className="mono shrink-0 text-[0.72rem] t-ink3">{c.date}</span>
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
        <section id="skills" className="border-y border-[var(--line-soft)] bg-[var(--bg2)] py-24">
            <Container>
                <SectionHeading num="02" kicker={`${t.skills.kicker} · ${t.stackSection.kicker}`} title={t.stackSection.title} subtitle={t.stackSection.subtitle} />

                <div className="grid gap-8 md:grid-cols-3">
                    {STACK_META.map((cat) => (
                        <div key={cat.id} className="win ticks">
                            <WinBar title={`${cat.id}.txt`} />
                            <div className="p-6">
                                <h3 className="mb-5 flex items-center gap-2.5 text-[1.05rem] font-semibold t-ink">
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

                <div className="mt-20">
                    <p className="kicker">{t.generalSection.kicker}</p>
                    <h3 className="display mt-3 text-[clamp(1.6rem,3.5vw,2.3rem)]">{t.generalSection.title}</h3>
                    <p className="mt-3 t-ink2">{t.generalSection.subtitle}</p>
                </div>
                <ul className="mt-10 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
                    {generalItems.map((g) => (
                        <li key={g.id} className="bg-[var(--panel)] p-6 transition-colors duration-200 hover:bg-[var(--panel2)]">
                            <div className="mb-4 t-lilac">{g.icon}</div>
                            <h4 className="mb-1.5 font-semibold t-ink">{g.title}</h4>
                            <p className="text-[0.9rem] leading-relaxed t-ink2">{g.text}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════
   Proyectos
   ═══════════════════════════════════════════════════════════ */
function ProjectCard({ project, t, lang }) {
    const c = project[lang]
    return (
        <article className={`win ticks lift flex min-w-0 flex-col ${project.featured ? 'lg:col-span-2' : ''}`}>
            <WinBar title={project.slug} />
            <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center border border-[var(--line)] bg-[var(--bg)]">
                        <Sprite name={project.sprite} className="h-10 w-10" />
                    </div>
                    <div>
                        <h3 className="display text-[clamp(1.35rem,3vw,1.7rem)]">{project.name}</h3>
                        <p className="pixel mt-2 text-[0.66rem] leading-relaxed t-ink3">{c.context}</p>
                    </div>
                </div>

                <div className={project.featured ? 'mt-6 grid gap-x-10 gap-y-6 lg:grid-cols-2' : 'mt-6'}>
                    <div>
                        <p className="leading-relaxed t-ink2">{c.description}</p>
                        <p className="mt-4 text-[0.94rem] leading-relaxed t-ink2">
                            <span className="pixel mr-2 text-[0.68rem] t-pink">{t.projects.why}:</span>
                            {c.purpose}
                        </p>
                    </div>
                    <div className={project.featured ? '' : 'mt-6'}>
                        <p className="pixel text-[0.68rem] t-lilac">{t.projects.highlights}</p>
                        <ul className="prose mt-3 text-[0.94rem]">
                            {c.highlights.map((h) => (
                                <li key={h}>{h}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Tech">
                    {project.tech.map((tech) => (
                        <li key={tech} className="chip">
                            {tech}
                        </li>
                    ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--line-soft)] pt-5">
                    {project.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="arrow-link">
                            {t.projects.links[l.kind]} <span aria-hidden="true">↗</span>
                        </a>
                    ))}
                </div>
            </div>
        </article>
    )
}

function Projects({ t, lang }) {
    return (
        <section id="projects" className="py-24">
            <Container>
                <SectionHeading num="03" kicker={t.projects.kicker} title={t.projects.title} subtitle={t.projects.subtitle} />
                <div className="grid gap-8 lg:grid-cols-2">
                    {PROJECTS.map((p) => (
                        <ProjectCard key={p.id} project={p} t={t} lang={lang} />
                    ))}
                </div>
                <div className="mt-12 flex justify-center">
                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn">
                        {ICONS.github} {t.projects.more}
                    </a>
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
        <section id="blog" className="border-y border-[var(--line-soft)] bg-[var(--bg2)] py-24">
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
                    <span aria-hidden="true">·</span>
                    <a href={article.repo} target="_blank" rel="noopener noreferrer" className="t-lilac underline decoration-dotted underline-offset-4 hover:text-[var(--pink)]">
                        {t.blog.source} ↗
                    </a>
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
function Contact({ t }) {
    const c = t.contact
    return (
        <section id="contact" className="relative overflow-hidden py-24">
            <div aria-hidden="true" className="pointer-events-none absolute -right-6 top-14 select-none text-right max-lg:hidden">
                {[0, 1].map((i) => (
                    <p key={i} className="display outline-word text-[7.5rem] leading-[0.85]" style={{ opacity: 1 - i * 0.45 }}>
                        {c.echo}
                    </p>
                ))}
            </div>
            <Container className="relative">
                <SectionHeading num="05" kicker={c.kicker} title={c.title} subtitle={c.subtitle} />
                <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="win ticks">
                        <WinBar title="carla@manjaro: ~" />
                        <div className="mono space-y-1 p-6 text-[0.86rem] leading-relaxed">
                            <p>
                                <span className="t-pink">carla@manjaro</span> <span className="t-lilac">~ $</span> <span className="t-ink">whoami</span>
                            </p>
                            <p className="t-ink2">{c.whoami}</p>
                            <p className="pt-3">
                                <span className="t-pink">carla@manjaro</span> <span className="t-lilac">~ $</span> <span className="t-ink">cat location.txt</span>
                            </p>
                            <p className="t-ink2">{c.location}</p>
                            <p className="pt-3">
                                <span className="t-pink">carla@manjaro</span> <span className="t-lilac">~ $</span> <span className="t-ink">ls ~/links</span>
                            </p>
                            {CONTACT_LINKS.map((l) => (
                                <p key={l.id}>
                                    <a href={l.href} target={l.id === 'email' ? undefined : '_blank'} rel="noopener noreferrer" className="t-lilac underline decoration-dotted underline-offset-4 hover:text-[var(--pink)]">
                                        {l.text}
                                    </a>
                                </p>
                            ))}
                            <p className="pt-3">
                                <span className="t-pink">carla@manjaro</span> <span className="t-lilac">~ $</span> <span className="caret" aria-hidden="true" />
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {CONTACT_LINKS.map((l, i) => (
                            <a
                                key={l.id}
                                href={l.href}
                                target={l.id === 'email' ? undefined : '_blank'}
                                rel="noopener noreferrer"
                                className={`btn justify-between ${i === 0 ? 'btn-primary' : ''}`}
                            >
                                <span className="flex items-center gap-3">
                                    {ICONS[l.id]} {c.labels[l.id]}
                                </span>
                                <span aria-hidden="true">↗</span>
                            </a>
                        ))}
                        {CONTACT_LINKS.length < 3 && <p className="mt-2 text-[0.92rem] leading-relaxed t-ink3">{c.pending}</p>}
                    </div>
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
            <div className="crisp relative h-[288px] bg-[var(--bg)] bg-[length:auto_288px] bg-bottom bg-repeat-x" style={{ backgroundImage: `url(${nightScene})` }}>
                <p className="pixel absolute inset-x-0 top-6 px-5 text-center text-[0.66rem] t-ink3">{t.footer.walkerHint}</p>
                <button type="button" onClick={handleClick} onKeyDown={handleKey} aria-label={t.footer.walkerLabel} className="absolute inset-x-0 bottom-0 h-[120px] w-full cursor-pointer">
                    <span className="absolute bottom-[18px] transition-[left] duration-500 ease-in-out" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
                        <span className={`block ${walking ? 'walker-walking' : 'walker-idle'}`}>
                            <span className="block" style={{ transform: facing === 'left' ? 'scaleX(-1)' : undefined }}>
                                <Sprite name="ghost" className="h-[33px] w-[36px]" />
                            </span>
                        </span>
                    </span>
                </button>
            </div>
            <div className="border-t border-[var(--line-soft)] bg-[var(--bg)]">
                <Container className="flex flex-col gap-4 py-8 text-[0.86rem] t-ink3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p>{t.footer.built}</p>
                        <p className="mono mt-1 text-[0.76rem]">© {new Date().getFullYear()} Carla Prado</p>
                    </div>
                    <a href="#top" className="arrow-link">
                        {t.footer.top} <span aria-hidden="true">↑</span>
                    </a>
                </Container>
            </div>
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
