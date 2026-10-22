import heroImage from '../assets/me4.png'
import { useState, useRef, useEffect } from 'react'

const MONO = 'font-[family-name:Fira_Code,Consolas,monospace]'
/* Títulos con serif elegante, como el "Streamer Pack" de la referencia */
const DISPLAY = 'font-[family-name:Poppins,Segoe_UI,sans-serif]'

const BTN = `inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3 text-[0.85rem] font-semibold transition duration-200 hover:-translate-y-0.5 ${MONO}`

const LINK = `inline-flex items-center gap-1.5 text-[0.8rem] font-medium transition-opacity duration-200 hover:opacity-70 ${MONO}`

/* Tarjeta oscura con borde fino y brillo rosado al pasar el mouse (inspirado en las referencias) */
/* Panel plano en tono índigo */
const CARD =
    'relative rounded-2xl bg-[#231f5c]/55'
const CARD_HOVER =
    'transition-colors duration-200 hover:bg-[#231f5c]/85'


/* Destello de 4 puntas: decora los títulos de sección */
function Spark({ className = '' }) {
    return (
        <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2c.6 4.6 2.4 6.9 7 7.5v1c-4.6.6-6.4 2.9-7 7.5h-1c-.6-4.6-2.4-6.9-7-7.5v-1c4.6-.6 6.4-2.9 7-7.5h1z" />
        </svg>
    )
}

/* Cielo simple: algunas estrellas y destellos quietos (posiciones fijas) */
function seeded(seed) {
    let x = seed
    return () => {
        x = (x * 9301 + 49297) % 233280
        return x / 233280
    }
}

const STARS = (() => {
    const r = seeded(7)
    return Array.from({ length: 28 }, (_, i) => ({
        id: i,
        top: r() * 100,
        left: r() * 100,
        size: r() < 0.85 ? 1.5 : 2.5,
        delay: r() * 4,
        dur: 2.5 + r() * 3,
    }))
})()

const SPARKLES = (() => {
    const r = seeded(21)
    return Array.from({ length: 5 }, (_, i) => ({
        id: i,
        top: r() * 95,
        left: r() * 97,
        size: 7 + r() * 7,
        delay: r() * 5,
        color: ['#FBD7DE', '#b99be6', '#9fd3ff'][Math.floor(r() * 3)],
    }))
})()

function StarField() {
    return (
        <>
            {STARS.map((s) => (
                <span
                    key={s.id}
                    className="star absolute rounded-full bg-[#9fd3ff]"
                    style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size }}
                />
            ))}
            {SPARKLES.map((s) => (
                <span
                    key={s.id}
                    className="sparkle absolute"
                    style={{ top: `${s.top}%`, left: `${s.left}%`, color: s.color }}
                >
                    <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2c.6 4.6 2.4 6.9 7 7.5v1c-4.6.6-6.4 2.9-7 7.5h-1c-.6-4.6-2.4-6.9-7-7.5v-1c4.6-.6 6.4-2.9 7-7.5h1z" />
                    </svg>
                </span>
            ))}
        </>
    )
}

/* ═══════════════════════════════════════════════════════════
   Idioma
   ═══════════════════════════════════════════════════════════ */
function useLanguage(defaultLang = 'en') {
    const [lang, setLang] = useState(defaultLang)
    const toggle = () => setLang((l) => (l === 'en' ? 'es' : 'en'))
    return { lang, toggle }
}

/* ═══════════════════════════════════════════════════════════
   Router simple por hash: #/dev, #/design
   ═══════════════════════════════════════════════════════════ */
const PAGES = ['home', 'dev', 'design']

function readPage() {
    const page = window.location.hash.replace(/^#\/?/, '').split('/')[0]
    return PAGES.includes(page) ? page : 'home'
}

function usePage() {
    const [page, setPage] = useState(readPage)

    useEffect(() => {
        const onChange = () => {
            setPage(readPage())
            window.scrollTo({ top: 0 })
        }
        window.addEventListener('hashchange', onChange)
        return () => window.removeEventListener('hashchange', onChange)
    }, [])

    const go = (next) => {
        window.location.hash = next === 'home' ? '/' : `/${next}`
    }

    return [page, go]
}

/* ═══════════════════════════════════════════════════════════
   Datos que no cambian con el idioma
   ═══════════════════════════════════════════════════════════ */
const STACK_META = [
    { id: 'frontend', dot: 'bg-[#7cc4ff]', pill: 'border-[#7cc4ff]/45', items: ['HTML', 'CSS', 'React.js', 'Tailwind CSS', 'Bootstrap Framework', 'Java Swing'] },
    { id: 'backend', dot: 'bg-[#e46f9f]', pill: 'border-[#e46f9f]/45', items: ['Java', 'Java + Springboot', 'JavaScript', 'Node.js', 'Express.js', 'VB.NET', 'Python', 'Kotlin'] },
    { id: 'database', dot: 'bg-[#8b6fd6]', pill: 'border-[#8b6fd6]/50', items: ['MySQL', 'MariaDB', 'PL/SQL', 'SQLite', 'MongoDB'] },
]

const GENERAL_META = [
    {
        id: 'security', accent: 'text-[#e46f9f]', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'cloud', accent: 'text-[#7cc4ff]', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.1 9.06 4 4 0 0 0 7 18z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'pm', accent: 'text-[#b99be6]', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="12" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.6" />
                <path d="M9 10h6M9 13.5h6M9 17h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'branching', accent: 'text-[#e46f9f]', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <line x1="6" y1="3" x2="6" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="18" cy="6" r="3" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M18 9a9 9 0 0 1-9 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'testing', accent: 'text-[#7cc4ff]', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'linux', accent: 'text-[#8b6fd6]', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M6.5 9l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 15h5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        )
    },
    {
        id: 'architecture', accent: 'text-[#e46f9f]', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="9.5" y="3" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <rect x="3" y="16" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <rect x="16" y="16" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.6" />
                <path d="M12 8v4M12 12H5.5v4M12 12h6.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        id: 'analytics', accent: 'text-[#7cc4ff]', icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        )
    },
]

const EXPERIENCE_META = [{ year: '2023' }, { year: '2021' }, { year: '2019' }]

const PORTFOLIO_META = [
    { id: 'proj-1', tags: ['React', 'Tailwind'], image: 'https://picsum.photos/seed/portfolio-1/640/420' },
    { id: 'proj-2', tags: ['WordPress', 'Next.js'], image: 'https://picsum.photos/seed/portfolio-2/640/420' },
    { id: 'proj-3', tags: ['HTML', 'GSAP'], image: 'https://picsum.photos/seed/portfolio-3/640/420' },
]

const BLOG_META = [
    { id: 'post-1', image: 'https://picsum.photos/seed/blog-1/640/420' },
    { id: 'post-2', image: 'https://picsum.photos/seed/blog-2/640/420' },
    { id: 'post-3', image: 'https://picsum.photos/seed/blog-3/640/420' },
]

const DESIGN_META = [
    { id: 'design-1', tags: ['UI Kit'], image: 'https://picsum.photos/seed/design-1/640/420' },
    { id: 'design-2', tags: ['Mobile'], image: 'https://picsum.photos/seed/design-2/640/420' },
    { id: 'design-3', tags: ['Branding'], image: 'https://picsum.photos/seed/design-3/640/420' },
]

const SOCIAL_LINKS = [
    {
        id: 'github',
        label: 'GitHub',
        href: 'https://github.com/tu-usuario',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.58 2 12.19c0 4.49 2.87 8.3 6.84 9.64.5.1.68-.22.68-.49 0-.24-.01-1.03-.01-1.87-2.78.51-3.5-.7-3.72-1.34-.13-.32-.68-1.34-1.16-1.6-.4-.22-.97-.76-.01-.77.9-.02 1.55.85 1.76 1.2 1.03 1.76 2.68 1.26 3.34.96.1-.76.4-1.26.73-1.55-2.55-.29-5.23-1.31-5.23-5.82 0-1.28.45-2.34 1.19-3.16-.12-.3-.52-1.52.11-3.15 0 0 .97-.32 3.18 1.2a10.7 10.7 0 0 1 5.79 0c2.2-1.52 3.17-1.2 3.17-1.2.64 1.63.24 2.85.12 3.15.74.82 1.19 1.87 1.19 3.16 0 4.52-2.69 5.53-5.25 5.82.42.37.78 1.09.78 2.2 0 1.59-.01 2.87-.01 3.26 0 .27.18.6.69.49A10.2 10.2 0 0 0 22 12.19C22 6.58 17.52 2 12 2z" />
            </svg>
        ),
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/tu-usuario',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.5 8.75h3.9V21H3.5zM10 8.75h3.74v1.68h.05c.52-.94 1.8-1.93 3.7-1.93 3.96 0 4.69 2.5 4.69 5.76V21h-3.9v-6.13c0-1.46-.03-3.34-2.1-3.34-2.1 0-2.42 1.58-2.42 3.23V21H10z" />
            </svg>
        ),
    },
    {
        id: 'email',
        label: 'Email',
        href: 'mailto:tu-correo@example.com',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3.5 6.5L12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
]

/* ═══════════════════════════════════════════════════════════
   Contenido traducible (alineado por índice con los *_META)
   ═══════════════════════════════════════════════════════════ */
const CONTENT = {
    en: {
        menu: { home: 'Home', dev: 'Dev', design: 'Design' },
        hero: {
            kicker: 'Carla Prado',
            titlePrefix: "Hi, I'm ",
            highlight: 'Carla',
            role: 'Full-stack Developer',
            bio: 'Chilean developer building corporate software for a logistics company. Duoc UC Programming graduate, currently studying Software Engineering.',
            bioNote: 'With a background in art and design, I care about how things look as much as how they work.',
            ownProfile: 'Portfolio',
            knowMore: 'Contact Me',
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
        workSection: {
            kicker: 'Career',
            title: 'Experience',
            subtitle: 'Where I have worked.',
        },
        experience: [
            { role: 'Frontend / WordPress Developer', company: 'Freelance', period: '2023 — Present', note: 'Custom themes and plugins, optimized for speed and accessibility.' },
            { role: 'Frontend Developer', company: 'Company X', period: '2021 — 2023', note: 'React interfaces and WordPress site maintenance.' },
            { role: 'Junior Web Developer', company: 'Company Y', period: '2019 — 2021', note: 'Markup, API integrations and production support.' },
        ],
        portfolioSection: {
            kicker: 'Work',
            title: 'Portfolio',
            subtitle: 'Selected recent projects.',
        },
        portfolio: [
            { title: 'Analytics Dashboard', text: 'Real-time sales metrics for an internal team.' },
            { title: 'Headless Store', text: 'WordPress backend with a fast, decoupled storefront.' },
            { title: 'Product Landing Page', text: 'Animated launch page with a waitlist form.' },
        ],
        blogSection: {
            kicker: 'Notes',
            title: 'Blog',
            subtitle: 'Short articles on what I am learning.',
        },
        blog: [
            { title: 'Faster WordPress Themes', text: 'Small changes that reduce load time without touching the design.', date: 'Aug 2026' },
            { title: 'Tailwind at Scale', text: 'Keeping CSS organized as the team grows.', date: 'Jul 2026' },
            { title: 'From REST to Headless', text: 'Lessons from decoupling a traditional site.', date: 'Jun 2026' },
        ],
        designSection: {
            kicker: 'Visual',
            title: 'Design',
            subtitle: 'Visual work shaped by my art background.',
        },
        design: [
            { title: 'UI System', text: 'Base components and color tokens for a SaaS product.' },
            { title: 'Mobile App', text: 'Visual exploration for a habit tracker.' },
            { title: 'Personal Branding', text: 'Logo and palette for a photography brand.' },
        ],
        links: {
            viewProject: 'View project',
            repository: 'Repository',
            readMore: 'Read more',
            viewBehance: 'View on Behance',
            caseStudy: 'Case study',
        },
        footerSection: {
            walkerHint: 'Click the track to move the ghost.',
        },
    },
    es: {
        menu: { home: 'Inicio', dev: 'Dev', design: 'Diseño' },
        hero: {
            kicker: 'Carla Prado',
            titlePrefix: 'Hola, soy ',
            highlight: 'Carla',
            role: 'Desarrolladora Full-stack',
            bio: 'Desarrolladora chilena creando software corporativo para una empresa de logística. Titulada de Programación en Duoc UC, actualmente estudiando Ingeniería en Software.',
            bioNote: 'Con formación en arte y diseño, me importa tanto cómo se ven las cosas como cómo funcionan.',
            ownProfile: 'Portafolio',
            knowMore: 'Contáctame',
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
        workSection: {
            kicker: 'Carrera',
            title: 'Experiencia',
            subtitle: 'Dónde he trabajado.',
        },
        experience: [
            { role: 'Frontend / WordPress Developer', company: 'Freelance', period: '2023 — Presente', note: 'Temas y plugins a medida, optimizados en velocidad y accesibilidad.' },
            { role: 'Frontend Developer', company: 'Empresa X', period: '2021 — 2023', note: 'Interfaces en React y mantención de sitios WordPress.' },
            { role: 'Junior Web Developer', company: 'Empresa Y', period: '2019 — 2021', note: 'Maquetación, integración de APIs y soporte a producción.' },
        ],
        portfolioSection: {
            kicker: 'Trabajo',
            title: 'Portafolio',
            subtitle: 'Proyectos recientes seleccionados.',
        },
        portfolio: [
            { title: 'Panel de Analytics', text: 'Métricas de ventas en tiempo real para un equipo interno.' },
            { title: 'Tienda Headless', text: 'WordPress como backend y un frontend desacoplado y rápido.' },
            { title: 'Landing de Producto', text: 'Página de lanzamiento animada con lista de espera.' },
        ],
        blogSection: {
            kicker: 'Notas',
            title: 'Blog',
            subtitle: 'Artículos breves sobre lo que voy aprendiendo.',
        },
        blog: [
            { title: 'Temas de WordPress más rápidos', text: 'Cambios pequeños que reducen el tiempo de carga sin tocar el diseño.', date: 'Ago 2026' },
            { title: 'Tailwind a gran escala', text: 'Mantener el CSS ordenado cuando el equipo crece.', date: 'Jul 2026' },
            { title: 'De REST a headless', text: 'Aprendizajes al desacoplar un sitio tradicional.', date: 'Jun 2026' },
        ],
        designSection: {
            kicker: 'Visual',
            title: 'Diseño',
            subtitle: 'Trabajo visual con base en mi formación artística.',
        },
        design: [
            { title: 'Sistema de UI', text: 'Componentes base y tokens de color para un producto SaaS.' },
            { title: 'App Móvil', text: 'Exploración visual para una app de hábitos.' },
            { title: 'Branding Personal', text: 'Logo y paleta para una marca de fotografía.' },
        ],
        links: {
            viewProject: 'Ver proyecto',
            repository: 'Repositorio',
            readMore: 'Leer más',
            viewBehance: 'Ver en Behance',
            caseStudy: 'Case study',
        },
        footerSection: {
            copyright: `© ${new Date().getFullYear()} Carla Prado. Todos los derechos reservados.`,
            walkerHint: 'Haz click en la pista para mover al fantasma.',
        },
    },
}

/* ═══════════════════════════════════════════════════════════
   Componentes pequeños
   ═══════════════════════════════════════════════════════════ */
function CardLink({ children, accent, href }) {
    return (
        <a href={href || '#'} target={href ? '_blank' : undefined} rel="noopener noreferrer" className={`${LINK} ${accent}`}>
            {children}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </a>
    )
}

function SectionHeading({ kicker, title, subtitle, accent = 'text-[#e46f9f]' }) {
    return (
        <div className="mb-14 text-center">
            <h2 className={`text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.15] text-[#FBD7DE] ${DISPLAY}`}>{title}</h2>
            {subtitle && <p className="mt-2 text-[0.95rem] text-[#a99bcf]">{subtitle}</p>}
        </div>
    )
}

function SocialButton({ s, size = 'h-11 w-11' }) {
    return (
        <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={`flex ${size} items-center justify-center rounded-full bg-[#231f5c]/80 text-[#d6c7ea] transition-colors duration-200 hover:bg-[#3a2a7a] hover:text-[#FBD7DE]`}
        >
            {s.icon}
        </a>
    )
}

/* Carrusel infinito */
function useCarousel(length) {
    const [offset, setOffset] = useState(0)
    const next = () => setOffset((o) => (o + 1) % length)
    const prev = () => setOffset((o) => (o - 1 + length) % length)
    return [offset, next, prev]
}

function rotateItems(items, offset) {
    return items.map((_, i) => items[(i + offset) % items.length])
}

function CarouselArrow({ direction, onClick, className = '' }) {
    const isLeft = direction === 'left'
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={isLeft ? 'Previous' : 'Next'}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#4a3a8a]/80 bg-[#1d1b4f]/70 text-[#e46f9f] transition duration-200 hover:-translate-y-0.5 hover:border-[#e46f9f]/60 ${className}`}
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d={isLeft ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )
}

/* Tarjetas tipo "certificado": título + dato en la esquina, pills de tags, links al pie.
   `corner` (opcional) devuelve el texto de la esquina superior derecha; `tags` las pills. */
function CardCarousel({ items, corner, renderLinks }) {
    const [offset, next, prev] = useCarousel(items.length)
    const rotated = rotateItems(items, offset)

    return (
        <>
            <div className="flex items-center gap-4">
                <CarouselArrow direction="left" onClick={prev} className="shrink-0 max-[640px]:hidden" />

                <div className="grid flex-1 grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
                    {rotated.map((item) => (
                        <article key={item.id} className={`p-3 ${CARD} ${CARD_HOVER}`}>
                            <img src={item.image} alt={item.title} className="h-44 w-full rounded-xl object-cover" />
                            <div className="px-3 pb-3 pt-5">
                                <div className="mb-2 flex items-start justify-between gap-3">
                                    <h3 className="text-[1.02rem] font-semibold text-[#FBD7DE]">{item.title}</h3>
                                    {corner && (
                                        <span className={`shrink-0 text-[0.85rem] font-semibold text-[#e46f9f] ${MONO}`}>
                                            {corner(item)}
                                        </span>
                                    )}
                                </div>
                                <p className="mb-4 text-[0.86rem] text-[#a99bcf]">{item.text}</p>
                                {item.tags && (
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {item.tags.map((tag) => (
                                            <span key={tag} className={`rounded-full border border-[#e46f9f]/35 bg-[#e46f9f]/8 px-2.5 py-0.5 text-[0.72rem] text-[#e46f9f] ${MONO}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-5">{renderLinks(item)}</div>
                            </div>
                        </article>
                    ))}
                </div>

                <CarouselArrow direction="right" onClick={next} className="shrink-0 max-[640px]:hidden" />
            </div>

            <div className="mt-6 hidden justify-center gap-3 max-[640px]:flex">
                <CarouselArrow direction="left" onClick={prev} />
                <CarouselArrow direction="right" onClick={next} />
            </div>
        </>
    )
}

/* Mini-juego del footer */
const WALKER_MIN = 8
const WALKER_MAX = 92
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

function WalkerFigure({ facing, walking }) {
    return (
        <div className={walking ? 'walker-walking' : 'walker-idle'} style={{ transform: facing === 'left' ? 'scaleX(-1)' : 'scaleX(1)' }}>
            <svg width="34" height="38" viewBox="0 0 36 40" fill="none" >
                <path
                    d="M18 3.5c7.3 0 11.2 5.6 11.2 12.3v15.4c0 .95-1.06 1.5-1.83.86l-2.37-1.98-2.37 1.98a1.4 1.4 0 0 1-1.79 0l-2.36-1.98-2.37 1.98a1.4 1.4 0 0 1-1.79 0l-2.37-1.98-2.36 1.98c-.77.64-1.83.09-1.83-.86V15.8c0-6.7 3.9-12.3 11.2-12.3z"
                    fill="#f3eefb"
                />
                <circle cx="13.6" cy="17.5" r="1.7" fill="#0f1033" />
                <circle cx="22.4" cy="17.5" r="1.7" fill="#0f1033" />
                <path d="M14.8 22.8c1.9 1.9 4.5 1.9 6.4 0" stroke="#0f1033" strokeWidth="1.3" strokeLinecap="round" />
                <ellipse cx="10.5" cy="19.5" rx="1.6" ry="1.1" fill="#e46f9f" opacity="0.7" />
                <ellipse cx="25.5" cy="19.5" rx="1.6" ry="1.1" fill="#e46f9f" opacity="0.7" />
            </svg>
        </div>
    )
}

/* Switch de idioma */
function LanguageSwitch({ lang, onToggle }) {
    return (
        <button
            type="button"
            onClick={onToggle}
            aria-label="Switch language / Cambiar idioma"
            className="relative flex h-8 w-[70px] shrink-0 cursor-pointer items-center rounded-full border border-[#4a3a8a] bg-[#0f1033]/70 px-1 transition-colors duration-200 hover:border-[#e46f9f]/60"
        >
            <span className={`absolute top-[3px] h-6 w-[31px] rounded-full bg-[#e46f9f] transition-transform duration-200 ease-out ${lang === 'es' ? 'translate-x-[32px]' : 'translate-x-0'}`} />
            {['en', 'es'].map((l) => (
                <span
                    key={l}
                    className={`relative z-10 flex-1 text-center text-[0.68rem] font-semibold uppercase tracking-wide transition-colors duration-200 ${MONO} ${lang === l ? 'text-[#0f1033]' : 'text-[#a99bcf]'}`}
                >
                    {l}
                </span>
            ))}
        </button>
    )
}

/* ═══════════════════════════════════════════════════════════
   Navbar flotante tipo píldora
   ═══════════════════════════════════════════════════════════ */
function Navbar({ t, page, go, lang, toggleLang }) {
    const [open, setOpen] = useState(false)
    const navigate = (p) => {
        setOpen(false)
        go(p)
    }
    const linkClass = (p) =>
        `relative cursor-pointer px-3 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${MONO} ${page === p
            ? 'text-[#e46f9f] after:absolute after:inset-x-3 after:-bottom-0.5 after:h-px after:bg-[#e46f9f]'
            : 'text-[#d6c7ea] hover:text-[#FBD7DE]'
        }`

    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-[#0f1033]/85 backdrop-blur-sm">
            <nav className="mx-auto flex h-16 w-full max-w-295 items-center gap-4 px-8 max-[900px]:px-6">
                <button type="button" onClick={() => navigate('home')} className={`cursor-pointer text-[0.95rem] font-semibold tracking-wide ${MONO}`}>
                    <span className="text-[#e46f9f]">PORT</span>
                    <span className="text-[#FBD7DE]">FOLIO</span>
                </button>

                <div className="ml-auto hidden items-center gap-1 md:flex">
                    {PAGES.map((p) => (
                        <button key={p} type="button" onClick={() => navigate(p)} className={linkClass(p)}>
                            {t.menu[p]}
                        </button>
                    ))}
                </div>

                <div className="ml-auto flex items-center gap-3 md:ml-2">
                    <LanguageSwitch lang={lang} onToggle={toggleLang} />
                    <button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        aria-label="Menu"
                        aria-expanded={open}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-[#FBD7DE] hover:bg-[#1d1b4f]/70 md:hidden"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </nav>

            {open && (
                <div className="flex flex-col gap-1 border-t border-[#4a3a8a]/60 px-6 py-3 md:hidden">
                    {PAGES.map((p) => (
                        <button key={p} type="button" onClick={() => navigate(p)} className={`${linkClass(p)} w-fit text-left`}>
                            {t.menu[p]}
                        </button>
                    ))}
                </div>
            )}
        </header>
    )
}

/* ═══════════════════════════════════════════════════════════
   Página: Home
   ═══════════════════════════════════════════════════════════ */
function HomePage({ t, go }) {
    const generalItems = GENERAL_META.map((m, i) => ({ ...m, ...t.general[i] }))

    return (
        <>
            {/* ───────── Hero: el texto va directo sobre la portada ───────── */}
            <section
                id="hero-section"
                className="relative flex min-h-screen min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(90deg,rgba(15,16,51,0.45)_0%,rgba(15,16,51,0.15)_45%,transparent_70%),linear-gradient(180deg,#1c1c1e_0%,#1b1b21_55%,#181a2b_100%)] px-8 pb-24 pt-32 max-[900px]:px-6 max-[900px]:pt-28"
            >
                {/* Estrellas quietas sobre el cielo azul noche de la portada */}
                <div aria-hidden className="pointer-events-none absolute inset-0">
                    <StarField />
                </div>

                {/* Colinas planas detrás de la foto */}
                <svg aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full" viewBox="0 0 1440 160" preserveAspectRatio="none">
                    <path d="M0 90 C 240 30 420 40 640 80 S 1080 130 1440 60 V160 H0z" fill="#3b2c7d" opacity="0.6" />
                    <path d="M0 108 C 200 70 380 75 600 100 S 1000 125 1440 85 V160 H0z" fill="#221c5e" />
                    <path d="M0 120 C 260 80 520 90 760 115 S 1200 140 1440 100 V160 H0z" fill="#0f1033" />
                </svg>

                {/* Foto nítida (sin opacidad), con un fundido corto a la izquierda y abajo hacia el color de la página */}
                <div id="hero-image" className="pointer-events-none absolute bottom-0 right-0 top-0 w-[46%] max-w-[860px] max-[900px]:w-full max-[900px]:max-w-none">
                    <img
                        id="hero-image-img"
                        src={heroImage}
                        alt=""
                        className="h-full w-full object-cover object-[center_25%] max-[900px]:opacity-30"
                        style={{
                            maskImage: 'linear-gradient(90deg, transparent 0%, black 32%), linear-gradient(0deg, transparent 0%, black 22%)',
                            maskComposite: 'intersect',
                            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 32%), linear-gradient(0deg, transparent 0%, black 22%)',
                            WebkitMaskComposite: 'source-in',
                        }}
                    />
                </div>

                <div id="hero-grid" className="relative z-10 mx-auto w-full max-w-295">
                    <div id="hero-content" className="flex max-w-140 flex-col max-[900px]:max-w-full">
                        <p id="hero-kicker" className="mb-3 text-[0.95rem] text-[#7cc4ff]">
                            {t.hero.kicker}
                        </p>
                        <h1 id="hero-title" className={`mb-3 text-[clamp(2.6rem,5vw,4rem)] font-bold leading-[1.08] text-[#FBD7DE] ${DISPLAY}`}>
                            <span>
                                {t.hero.titlePrefix}
                                <span id="hero-title-highlight" className="text-[#e46f9f]">
                                    {t.hero.highlight}
                                </span>
                            </span>
                        </h1>
                        <p id="hero-role" className="mb-6 text-[clamp(1.05rem,1.8vw,1.3rem)] font-medium text-[#9fd3ff]">
                            {t.hero.role}
                        </p>
                        <p id="hero-bio" className="mb-2 text-[1rem] text-[#d6c7ea]">
                            {t.hero.bio}
                        </p>
                        <p id="hero-bio-note" className="mb-9 text-[1rem] text-[#a99bcf]">
                            {t.hero.bioNote}
                        </p>

                        <div id="hero-actions" className="flex flex-wrap items-center gap-4">
                            <button
                                id="btn-own-profile"
                                type="button"
                                onClick={() => go('dev')}
                                className={`${BTN} bg-[#FBD7DE] text-[#0f1033] hover:bg-[#f6c4cf]`}
                            >
                                {t.hero.ownProfile}
                            </button>
                            <a
                                id="btn-know-more"
                                href={SOCIAL_LINKS.find((s) => s.id === 'email').href}
                                className={`${BTN} border border-[#FBD7DE]/30 text-[#FBD7DE] hover:bg-[#FBD7DE]/8`}
                            >
                                {t.hero.knowMore}
                            </a>
                            <div className="flex gap-2.5">
                                {SOCIAL_LINKS.map((s) => (
                                    <SocialButton key={s.id} s={s} size="h-10 w-10" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ───────── Tech Stack ───────── */}
            <section id="stack" className="pb-12 pt-24">
                <div className="mx-auto w-full max-w-295 px-8">
                    <SectionHeading kicker={t.stackSection.kicker} title={t.stackSection.title} subtitle={t.stackSection.subtitle} />

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
                        {STACK_META.map((cat) => (
                            <div key={cat.id} className={`px-7 py-7 ${CARD} ${CARD_HOVER}`}>
                                <h3 className="mb-5 flex items-center gap-2.5 text-[1rem] font-semibold text-[#FBD7DE]">
                                    <span className={`h-2 w-2 rounded-full ${cat.dot}`} />
                                    {t.stackSection.categories[cat.id]}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((item) => (
                                        <span key={item} className={`rounded-full border ${cat.pill} bg-[#0f1033]/60 px-3 py-1 text-[0.76rem] text-[#FBD7DE] ${MONO}`}>
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ───────── Conocimientos generales ───────── */}
            <section id="general-knowledge" className="py-24">
                <div className="mx-auto w-full max-w-295 px-8">
                    <SectionHeading kicker={t.generalSection.kicker} title={t.generalSection.title} subtitle={t.generalSection.subtitle} accent="text-[#b99be6]" />

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-10 gap-y-12">
                        {generalItems.map((g) => (
                            <div key={g.id}>
                                <div className={`mb-4 ${g.accent}`}>{g.icon}</div>
                                <h3 className="mb-1.5 text-[1.02rem] font-semibold text-[#FBD7DE]">{g.title}</h3>
                                <p className="text-[0.86rem] text-[#a99bcf]">{g.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    )
}

/* ═══════════════════════════════════════════════════════════
   Página: Dev
   ═══════════════════════════════════════════════════════════ */
function DevPage({ t }) {
    const experienceItems = EXPERIENCE_META.map((m, i) => ({ ...m, ...t.experience[i] }))
    const portfolioItems = PORTFOLIO_META.map((m, i) => ({ ...m, ...t.portfolio[i] }))
    const blogItems = BLOG_META.map((m, i) => ({ ...m, ...t.blog[i] }))

    return (
        <>
            {/* ───────── Experiencia: línea de tiempo con año en círculo ───────── */}
            <section id="work-experience" className="pb-24 pt-36">
                <div className="mx-auto w-full max-w-190 px-8">
                    <SectionHeading kicker={t.workSection.kicker} title={t.workSection.title} subtitle={t.workSection.subtitle} />

                    <ol className="relative flex flex-col gap-8">
                        <span aria-hidden className="absolute bottom-8 left-[27px] top-8 w-px bg-[#3a2a7a] max-[600px]:left-[23px]" />
                        {experienceItems.map((exp) => (
                            <li key={exp.role} className="relative flex items-start gap-6 max-[600px]:gap-4">
                                <span
                                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#3a2a7a] text-[0.8rem] font-bold text-[#FBD7DE] max-[600px]:h-12 max-[600px]:w-12 ${MONO}`}
                                >
                                    {exp.year}
                                </span>
                                <div className={`flex-1 px-6 py-5 ${CARD} ${CARD_HOVER}`}>
                                    <div className="mb-1 flex flex-wrap items-baseline justify-between gap-x-4">
                                        <h3 className="text-[1.05rem] font-semibold text-[#FBD7DE]">{exp.role}</h3>
                                        <span className={`text-[0.72rem] uppercase tracking-[0.06em] text-[#8a80b3] ${MONO}`}>{exp.period}</span>
                                    </div>
                                    <p className="mb-2 text-[0.88rem] text-[#e46f9f]">{exp.company}</p>
                                    <p className="text-[0.88rem] text-[#a99bcf]">{exp.note}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* ───────── Portfolio ───────── */}
            <section id="portfolio" className="py-24">
                <div className="mx-auto w-full max-w-295 px-8">
                    <SectionHeading kicker={t.portfolioSection.kicker} title={t.portfolioSection.title} subtitle={t.portfolioSection.subtitle} />
                    <CardCarousel
                        items={portfolioItems}
                        renderLinks={() => (
                            <>
                                <CardLink accent="text-[#e46f9f]">{t.links.viewProject}</CardLink>
                                <CardLink accent="text-[#d6c7ea]">{t.links.repository}</CardLink>
                            </>
                        )}
                    />
                </div>
            </section>

            {/* ───────── Blog ───────── */}
            <section id="blog" className="py-24">
                <div className="mx-auto w-full max-w-295 px-8">
                    <SectionHeading kicker={t.blogSection.kicker} title={t.blogSection.title} subtitle={t.blogSection.subtitle} accent="text-[#b99be6]" />
                    <CardCarousel
                        items={blogItems}
                        corner={(post) => post.date}
                        renderLinks={() => <CardLink accent="text-[#e46f9f]">{t.links.readMore}</CardLink>}
                    />
                </div>
            </section>
        </>
    )
}

/* ═══════════════════════════════════════════════════════════
   Página: Design
   ═══════════════════════════════════════════════════════════ */
function DesignPage({ t }) {
    const designItems = DESIGN_META.map((m, i) => ({ ...m, ...t.design[i] }))

    return (
        <section id="design" className="min-h-[80vh] pb-24 pt-36">
            <div className="mx-auto w-full max-w-295 px-8">
                <SectionHeading kicker={t.designSection.kicker} title={t.designSection.title} subtitle={t.designSection.subtitle} accent="text-[#b99be6]" />
                <CardCarousel
                    items={designItems}
                    renderLinks={() => (
                        <>
                            <CardLink accent="text-[#e46f9f]">{t.links.viewBehance}</CardLink>
                            <CardLink accent="text-[#d6c7ea]">{t.links.caseStudy}</CardLink>
                        </>
                    )}
                />
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════
   Footer (todas las páginas): fantasma + copyright
   ═══════════════════════════════════════════════════════════ */
function Footer({ t }) {
    const { pos, facing, walking, walkTo } = useWalker()

    const handleTrackClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        walkTo(((e.clientX - rect.left) / rect.width) * 100)
    }

    const handleTrackKey = (e) => {
        if (e.key === 'ArrowLeft') walkTo(pos - 10)
        if (e.key === 'ArrowRight') walkTo(pos + 10)
    }

    return (
        <footer className="relative bg-[#0b0c28] py-14 text-center">
            <div className="mx-auto w-full max-w-190 px-8">
                <div className="mx-auto mb-10 w-full max-w-100">
                    <p className={`mb-4 text-[0.75rem] text-[#8a80b3] ${MONO}`}>{t.footerSection.walkerHint}</p>
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={handleTrackClick}
                        onKeyDown={handleTrackKey}
                        className={`relative h-20 w-full cursor-pointer ${CARD} transition-colors duration-200 hover:border-[#FBD7DE]/45`}
                    >
                        <div className="absolute inset-x-4 bottom-3 h-px bg-[#4a3a8a]" />
                        <div className="absolute bottom-2.5 transition-[left] duration-500 ease-in-out" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
                            <WalkerFigure facing={facing} walking={walking} />
                        </div>
                    </div>
                </div>

                <p className={`text-[0.75rem] text-[#8a80b3] ${MONO}`}>{t.footerSection.copyright}</p>
            </div>
        </footer>
    )
}

export default function Landing() {
    const { lang, toggle } = useLanguage('en')
    const t = CONTENT[lang]
    const [page, go] = usePage()

    return (
        <div className="relative min-h-screen bg-[#0f1033] font-[Poppins,Segoe_UI,sans-serif] leading-[1.6] text-[#FBD7DE] antialiased">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap');
        @keyframes ghost-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes ghost-walk { 0%, 100% { transform: translateY(0) rotate(-5deg); } 50% { transform: translateY(-7px) rotate(5deg); } }
        .star { opacity: .45; }
        .sparkle { display: inline-block; opacity: .55; }
        .walker-idle { animation: ghost-float 1.8s ease-in-out infinite; }
        .walker-walking { animation: ghost-walk 0.32s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .walker-idle, .walker-walking { animation: none; } }
      `}</style>

            {/* Fondo: degradado índigo → ciruela con estrellas quietas */}
            <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[#0f1033]" />
                <StarField />
            </div>

            <Navbar t={t} page={page} go={go} lang={lang} toggleLang={toggle} />

            <main className="relative">
                {page === 'home' && <HomePage t={t} go={go} />}
                {page === 'dev' && <DevPage t={t} />}
                {page === 'design' && <DesignPage t={t} />}
            </main>

            <Footer t={t} />
        </div>
    )
}