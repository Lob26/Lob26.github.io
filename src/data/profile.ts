// Single source of truth for the portfolio content.
// Every user-facing string is bilingual via BilingualText.

export interface BilingualText {
  en: string
  es: string
}

export interface ProfileLinks {
  email: string
  phone: string
  linkedin: string
  github: string
  resume: string
}

export interface Pillar {
  label: BilingualText
  value: BilingualText
  detail: BilingualText
}

export interface LanguageEntry {
  name: BilingualText
  level: BilingualText
  proficiency: 'native' | 'c2' | 'c1' | 'b2' | 'b1' | 'a2' | 'a1'
  detail: BilingualText
}

export interface Profile {
  name: string
  title: BilingualText
  subtitle: BilingualText
  location: BilingualText
  tagline: BilingualText
  bio: BilingualText
  links: ProfileLinks
  linkedinVanity: string
  githubVanity: string
  pillars: Pillar[]
  languages: LanguageEntry[]
  philosophy: BilingualText
  philosophyQuote: BilingualText
}

export interface ExperienceHighlight {
  label: BilingualText
  metric?: string
  detail: BilingualText
  stakeholders?: BilingualText
}

export interface ExperienceEntry {
  company: string
  role: BilingualText
  seniority: BilingualText
  level: 1 | 2 | 3
  period: BilingualText
  location: BilingualText
  summary: BilingualText
  highlights: ExperienceHighlight[]
}

export interface Project {
  title: BilingualText
  description: BilingualText
  humanProblem?: BilingualText
  technicalSolution?: BilingualText
  stakeholders?: BilingualText
  metric?: { value: string; label: BilingualText }
  tags: string[]
  link: string | null
}

export interface SkillGroup {
  group: BilingualText
  items: string[]
  emphasis?: 'business' | 'language' | 'technical'
  caption?: BilingualText
}

export interface EducationEntry {
  school: string
  degree: BilingualText
  period: BilingualText
  location: BilingualText
  courseworkLabel: BilingualText
  highlights: string[]
}

export const profile: Profile = {
  name: 'Pedro Luis Lobato Barros',
  title: {
    en: 'Software Engineer',
    es: 'Ingeniero de Software',
  },
  subtitle: {
    en: 'SRE & Core Logic Lead',
    es: 'Líder de SRE y Lógica Central',
  },
  location: {
    en: 'Bogotá D.C., Colombia · Remote-first · EN / ES',
    es: 'Bogotá D.C., Colombia · Remoto-first · EN / ES',
  },
  tagline: {
    en: 'Fintech × Proptech · Backend systems · Cross-functional leadership',
    es: 'Fintech × Proptech · Sistemas backend · Liderazgo transversal',
  },
  bio: {
    en:
      'Software engineer with nearly two years in high-growth Fintech and Proptech. ' +
      'Track record of cutting operational wait times by up to 90%, defending production under live attack, ' +
      'and bridging backend systems (Python, Go, Ruby) with CRM ecosystems (Salesforce). ' +
      'Fluent across English and Spanish with Legal, Commercial and Operations.',
    es:
      'Ingeniero de software con casi dos años en entornos Fintech y Proptech de alto crecimiento. ' +
      'Historial comprobado reduciendo tiempos operativos hasta en un 90 %, defendiendo producción bajo ataque en vivo, ' +
      'y conectando sistemas backend (Python, Go, Ruby) con ecosistemas CRM (Salesforce). ' +
      'Fluidez entre inglés y español con Legal, Comercial y Operaciones.',
  },
  links: {
    email: 'pedro.lobato2610@gmail.com',
    phone: '+57 318 507 9105',
    linkedin: 'https://www.linkedin.com/in/lobaton2610',
    github: 'https://github.com/Lob26',
    resume: './Pedro_Lobato_CV.pdf',
  },
  linkedinVanity: 'lobaton2610',
  githubVanity: 'Lob26',
  pillars: [
    {
      label: { en: 'Role', es: 'Rol' },
      value: { en: 'Core Logic Lead', es: 'Líder de Lógica Central' },
      detail: {
        en: 'Owner of the engines behind real-estate pricing, client screening and contract generation.',
        es: 'Responsable de los motores de precios inmobiliarios, evaluación de clientes y generación de contratos.',
      },
    },
    {
      label: { en: 'Education', es: 'Formación' },
      value: { en: 'Universidad de los Andes', es: 'Universidad de los Andes' },
      detail: {
        en: 'B.S. Systems & Computing Engineering — Colombia\'s top engineering program.',
        es: 'Ingeniería de Sistemas y Computación — el programa de ingeniería más destacado de Colombia.',
      },
    },
  ],
  languages: [
    {
      name: { en: 'English', es: 'Inglés' },
      level: { en: 'C1 · Advanced', es: 'C1 · Avanzado' },
      proficiency: 'c1',
      detail: {
        en: 'Working language. Remote engineering, product conversations, written technical docs.',
        es: 'Idioma de trabajo. Ingeniería remota, conversaciones de producto y documentación técnica escrita.',
      },
    },
    {
      name: { en: 'Spanish', es: 'Español' },
      level: { en: 'Native', es: 'Nativo' },
      proficiency: 'native',
      detail: {
        en: 'Mother tongue. Stakeholder workshops with Legal, Commercial and Operations in LatAm.',
        es: 'Lengua materna. Talleres con Legal, Comercial y Operaciones en LatAm.',
      },
    },
  ],
  philosophy: {
    en:
      'My favourite part of engineering is the handshake — the moment a database refactor becomes an analyst\'s shorter afternoon, ' +
      'or a contract template becomes a lawyer\'s smoother Monday. I optimise for that handshake first, and for the server second.',
    es:
      'Mi parte favorita de la ingeniería es el apretón de manos: el momento en que un refactor de base de datos se convierte en una tarde más corta para una analista, ' +
      'o una plantilla de contrato en un lunes más amable para un abogado. Optimizo primero ese apretón de manos, y después el servidor.',
  },
  philosophyQuote: {
    en: 'I build bridges between data-driven systems and human-centric needs.',
    es: 'Construyo puentes entre sistemas guiados por datos y necesidades humanas.',
  },
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Duppla',
    role: {
      en: 'Software Engineer — SRE & Core Logic Lead',
      es: 'Ingeniero de Software — Líder de SRE y Lógica Central',
    },
    seniority: {
      en: 'Technical ownership · Cross-functional lead',
      es: 'Responsabilidad técnica · Liderazgo transversal',
    },
    level: 3,
    period: {
      en: 'August 2024 — Present',
      es: 'Agosto 2024 — Actualidad',
    },
    location: {
      en: 'Bogotá, Colombia · Hybrid',
      es: 'Bogotá, Colombia · Híbrido',
    },
    summary: {
      en:
        'I own the core business engines and the reliability practice, and I sit as a translator between engineering and the commercial, legal and operations teams. ' +
        'My weeks move between code, architecture decisions, and the conversations that make those decisions land.',
      es:
        'Soy responsable de los motores centrales de negocio y de la práctica de confiabilidad, y actúo como traductor entre ingeniería y los equipos comercial, legal y de operaciones. ' +
        'Mis semanas se mueven entre código, decisiones de arquitectura y las conversaciones que hacen que esas decisiones aterricen.',
    },
    highlights: [
      {
        label: {
          en: 'Core Product Ownership',
          es: 'Propiedad del producto central',
        },
        metric: '83%',
        stakeholders: { en: 'Commercial · Operations', es: 'Comercial · Operaciones' },
        detail: {
          en:
            'Partnered with the Operations and Commercial teams to redesign the Real Estate Evaluator — cutting their 90-minute wait down to 15. That 83% gave analysts back most of an afternoon to talk to clients instead of refreshing a screen.',
          es:
            'En equipo con Operaciones y Comercial rediseñé el Evaluador Inmobiliario: de 90 a 15 minutos por evaluación. Ese 83 % le devolvió a los analistas casi toda una tarde para hablar con clientes, no para mirar una pantalla cargando.',
        },
      },
      {
        label: {
          en: 'Live Attack Defense',
          es: 'Defensa en vivo ante ataques',
        },
        metric: '100%',
        stakeholders: { en: 'Engineering · Leadership', es: 'Ingeniería · Dirección' },
        detail: {
          en:
            'A bot slipped in a crafted request that exposed our full API surface and attacks on billing and reporting endpoints followed within minutes. I caught it live through the observability I had designed, shipped defenses on the targeted routes in real time, and hardened the backend into a posture that has since repelled 100% of subsequent attempts — attack volume has kept growing, the success rate has stayed at zero.',
          es:
            'Un bot coló una petición que reveló toda nuestra superficie de API y, en minutos, empezaron los ataques contra los endpoints de cobranza y reportes. Lo detecté en vivo gracias al sistema de observabilidad que yo había diseñado, desplegué defensas sobre los endpoints comprometidos en tiempo real, y endurecí el backend en una postura que ha repelido el 100 % de los intentos posteriores: el volumen de ataques sigue subiendo, la tasa de éxito sigue en cero.',
        },
      },
      {
        label: {
          en: 'Contract Automation',
          es: 'Automatización de contratos',
        },
        stakeholders: { en: 'Legal · Product', es: 'Legal · Producto' },
        detail: {
          en:
            'Leading a contract generation engine co-designed with Legal, removing the manual drafting that used to gate every new deal during Series A prep.',
          es:
            'Lidero un motor de generación de contratos co-diseñado con Legal, retirando el borrado manual que bloqueaba cada nuevo negocio durante la preparación de Serie A.',
        },
      },
      {
        label: {
          en: 'Salesforce Integration',
          es: 'Integración con Salesforce',
        },
        stakeholders: { en: 'Commercial · RevOps', es: 'Comercial · RevOps' },
        detail: {
          en:
            'Acted as bridge engineer between backend services and the commercial platform, stabilising CRM data and giving the revenue team a source of truth they could act on.',
          es:
            'Actué como ingeniero puente entre los servicios backend y la plataforma comercial, estabilizando los datos del CRM y dándole al equipo de ingresos una fuente de verdad accionable.',
        },
      },
      {
        label: {
          en: 'Developer Experience',
          es: 'Experiencia de desarrollo',
        },
        metric: '30%',
        stakeholders: { en: 'Engineering', es: 'Ingeniería' },
        detail: {
          en:
            'Built AWS and Slack wrappers that standardised internal tooling and shaved 30% of technical debt — so the next engineer spends their first day shipping, not decoding.',
          es:
            'Construí wrappers de AWS y Slack que estandarizaron el tooling interno y retiraron un 30 % de deuda técnica, para que el siguiente ingeniero dedique su primer día a entregar, no a descifrar.',
        },
      },
    ],
  },
  {
    company: 'Duppla',
    role: {
      en: 'Software Development Intern',
      es: 'Practicante de Desarrollo de Software',
    },
    seniority: {
      en: 'First production ownership',
      es: 'Primera responsabilidad en producción',
    },
    level: 1,
    period: {
      en: 'June 2024 — August 2024',
      es: 'Junio 2024 — Agosto 2024',
    },
    location: {
      en: 'Bogotá, Colombia',
      es: 'Bogotá, Colombia',
    },
    summary: {
      en:
        'Joined the engineering team as an intern and took the early leap into production-grade work: backend services for customer assessment, and internal logistics on Slack.',
      es:
        'Entré al equipo de ingeniería como practicante y di el primer salto a trabajo productivo serio: servicios backend para evaluación de clientes y logística interna sobre Slack.',
    },
    highlights: [
      {
        label: {
          en: 'Business Process Migration',
          es: 'Migración de procesos de negocio',
        },
        metric: '90%',
        stakeholders: { en: 'Legal · Risk · Origination', es: 'Legal · Riesgo · Originación' },
        detail: {
          en:
            'Rebuilt the Client Evaluator backend in conversation with Legal, Risk and Origination — 30 minutes of manual work collapsed into 3. Ninety percent of the queue time went back to the people who actually weigh the hard cases.',
          es:
            'Reescribí el backend del Evaluador de Clientes conversando con Legal, Riesgo y Originación: 30 minutos de trabajo manual se convirtieron en 3. El 90 % del tiempo en cola volvió a las personas que realmente sopesan los casos difíciles.',
        },
      },
      {
        label: {
          en: 'Internal Logistics',
          es: 'Logística interna',
        },
        stakeholders: { en: 'People Ops', es: 'People Ops' },
        detail: {
          en:
            'Designed a Slack automation for attendance and office logistics that the whole HQ uses daily.',
          es:
            'Diseñé una automatización sobre Slack para asistencia y logística de oficina que toda la sede usa a diario.',
        },
      },
      {
        label: {
          en: 'Stability',
          es: 'Estabilidad',
        },
        stakeholders: { en: 'IT', es: 'TI' },
        detail: {
          en:
            'Shipped credentialing code still running with minimal maintenance two years on — the quiet kind of reliability.',
          es:
            'Entregué código de credenciales que dos años después sigue corriendo con mantenimiento mínimo: el tipo de confiabilidad silenciosa.',
        },
      },
    ],
  },
]

export const projects: Project[] = [
  {
    title: {
      en: 'Real Estate Evaluation Engine',
      es: 'Motor de Evaluación Inmobiliaria',
    },
    description: {
      en: 'Core business tool rebuilt from low-code into a maintainable intranet, reshaping the evaluator\'s day.',
      es: 'Herramienta central del negocio, reconstruida desde low-code hacia una intranet mantenible, reorganizando el día del evaluador.',
    },
    humanProblem: {
      en:
        'Commercial analysts waited 90 minutes for each property evaluation — long enough for a client to cool off and a negotiation to stall.',
      es:
        'Los analistas comerciales esperaban 90 minutos por cada evaluación de inmueble: suficiente para que un cliente se enfriara y una negociación se frenara.',
    },
    technicalSolution: {
      en:
        'Migrated the engine out of Retool into a custom intranet, tightened the pricing logic and automated the upstream data flows so analysts see a result in 15 minutes.',
      es:
        'Migré el motor desde Retool a una intranet propia, ajusté la lógica de valoración y automaticé los flujos de datos aguas arriba para que el analista reciba el resultado en 15 minutos.',
    },
    stakeholders: { en: 'Commercial · Operations', es: 'Comercial · Operaciones' },
    metric: {
      value: '83%',
      label: {
        en: 'less waiting per evaluation (90 → 15 min)',
        es: 'menos espera por evaluación (90 → 15 min)',
      },
    },
    tags: ['Python', 'Internal Tooling', 'Proptech'],
    link: null,
  },
  {
    title: {
      en: 'Business Client Evaluator',
      es: 'Evaluador de Clientes de Negocio',
    },
    description: {
      en: 'Customer screening backend rebuilt from scratch — fast, decisive rejection so the commercial team only sees viable leads.',
      es: 'Backend de evaluación de clientes reconstruido desde cero: descarte rápido y contundente para que el equipo comercial solo vea prospectos viables.',
    },
    humanProblem: {
      en:
        'Origination sat on every prospect for 30 minutes of manual screening. Good leads went cold in the queue while unfit ones still ate the same half-hour before they could be discarded.',
      es:
        'Originación se quedaba media hora con cada prospecto haciendo filtros manuales. Los buenos leads se enfriaban en la cola y los que no calificaban consumían el mismo tiempo antes de poder descartarse.',
    },
    technicalSolution: {
      en:
        'Full backend rewrite — new data model, leaner queries and asynchronous scoring. The evaluation cycle dropped from 30 minutes to 3, freeing the team to act on signal instead of grinding through noise.',
      es:
        'Reescritura completa del backend: nuevo modelo de datos, consultas más livianas y scoring asíncrono. El ciclo de evaluación cayó de 30 a 3 minutos y el equipo pasó a actuar sobre señal, no sobre ruido.',
    },
    stakeholders: { en: 'Commercial · Origination', es: 'Comercial · Originación' },
    metric: {
      value: '90%',
      label: {
        en: 'faster cycle — time returned to the team (30 → 3 min)',
        es: 'más rápido: tiempo devuelto al equipo (30 → 3 min)',
      },
    },
    tags: ['Python', 'Backend', 'Performance'],
    link: null,
  },
  {
    title: {
      en: 'Contract Automation Engine',
      es: 'Motor de Automatización de Contratos',
    },
    description: {
      en: 'Template refresh plus a generation-and-review pipeline that removes typos, drift and lost versions from the legal flow.',
      es: 'Renovación de plantillas más un pipeline de generación y revisión que elimina typos, inconsistencias y versiones perdidas del flujo legal.',
    },
    humanProblem: {
      en:
        'Every contract was hand-crafted from manual templates riddled with typo-prone patterns and half-filled variable slots. The team burned hours per deal, lost traceability between versions, and shipped errors that slipped past review.',
      es:
        'Cada contrato salía a mano desde plantillas manuales plagadas de patrones propensos a erratas y variables a medio llenar. El equipo perdía horas por operación, se quedaba sin trazabilidad entre versiones y dejaba pasar errores que ni la revisión detectaba.',
    },
    technicalSolution: {
      en:
        'Rebuilt the templates from scratch to remove error-prone variable patterns, then wired a generation-and-review pipeline that pulls each business opportunity\'s data automatically — every contract is now versioned, validated, and auditable end-to-end.',
      es:
        'Reconstruí las plantillas desde cero para eliminar los patrones de variables propensos a error y conecté un pipeline de generación y revisión que extrae los datos de cada oportunidad de negocio automáticamente: cada contrato queda versionado, validado y auditable de extremo a extremo.',
    },
    stakeholders: { en: 'Legal · Product', es: 'Legal · Producto' },
    tags: ['Automation', 'DX', 'Legal-Tech'],
    link: null,
  },
  {
    title: {
      en: 'Live Attack Defense',
      es: 'Defensa en Vivo ante Ataques',
    },
    description: {
      en: 'Detected a live API-exposure attack through the observability I had designed, then defended and hardened the backend end-to-end.',
      es: 'Detecté en vivo un ataque que expuso la superficie de la API gracias a la observabilidad que yo había diseñado, y después defendí y endurecí el backend de extremo a extremo.',
    },
    humanProblem: {
      en:
        'A bot slipped in a crafted request that revealed our full API surface. Within minutes, attacks flooded the billing and reporting endpoints — the kind of hit that moves real money.',
      es:
        'Un bot coló una petición armada que reveló toda la superficie de nuestra API. En minutos empezaron los ataques contra los endpoints de cobranza y reportes: justo los que mueven dinero real.',
    },
    technicalSolution: {
      en:
        'Caught the attack live through the observability I had designed, shipped endpoint-level defenses on the targeted routes before they could execute, and hardened the backend into a posture that has repelled every subsequent attempt as attack volume has grown.',
      es:
        'Detecté el ataque en vivo gracias a la observabilidad que yo había diseñado, desplegué defensas a nivel de endpoint sobre las rutas comprometidas antes de que pudieran ejecutarse, y endurecí el backend en una postura que ha repelido cada intento posterior a medida que el volumen de ataques ha crecido.',
    },
    stakeholders: { en: 'Engineering · Leadership', es: 'Ingeniería · Dirección' },
    metric: {
      value: '100%',
      label: {
        en: 'subsequent attacks repelled',
        es: 'ataques posteriores repelidos',
      },
    },
    tags: ['Security', 'Observability', 'Incident Response'],
    link: null,
  },
  {
    title: {
      en: 'Fullstack Spring / Angular App',
      es: 'Aplicación Fullstack Spring / Angular',
    },
    description: {
      en: 'Public academic project combining a Spring Boot backend with an Angular frontend.',
      es: 'Proyecto académico público que combina un backend en Spring Boot con un frontend en Angular.',
    },
    tags: ['Spring Boot', 'Angular', 'Java'],
    link: 'https://github.com/Lob26/ISIS2603_CulturasGastronomicas_Back',
  },
  {
    title: {
      en: 'JDO Data Persistence Project',
      es: 'Proyecto de Persistencia de Datos con JDO',
    },
    description: {
      en: 'Academic exploration of Java Data Objects for object-relational persistence patterns.',
      es: 'Exploración académica de Java Data Objects para patrones de persistencia objeto-relacional.',
    },
    tags: ['Java', 'JDO', 'Persistence'],
    link: 'https://github.com/Lob26/ISIS2304_Alohandes',
  },
]

export const skills: SkillGroup[] = [
  {
    group: { en: 'Business Capabilities', es: 'Capacidades de Negocio' },
    emphasis: 'business',
    caption: {
      en: 'How I show up beyond the code.',
      es: 'Cómo aporto más allá del código.',
    },
    items: [
      'Stakeholder Management',
      'Cross-functional Leadership',
      'Technical Ownership',
      'Requirement Translation',
      'Incident Response',
    ],
  },
  {
    group: { en: 'Programming Languages', es: 'Lenguajes de programación' },
    emphasis: 'technical',
    items: ['Python', 'Go', 'Ruby', 'TypeScript', 'Solidity', 'JavaScript', 'SQL'],
  },
  {
    group: { en: 'Spoken languages', es: 'Idiomas' },
    emphasis: 'technical',
    items: ['English · C1', 'Spanish · Native'],
  },
  {
    group: { en: 'Backend & Integrations', es: 'Backend e integraciones' },
    emphasis: 'technical',
    items: ['Salesforce', 'Slack', 'RabbitMQ', 'REST APIs', 'Custom AWS / Slack wrappers'],
  },
  {
    group: { en: 'Databases', es: 'Bases de datos' },
    emphasis: 'technical',
    items: ['PostgreSQL', 'MySQL'],
  },
  {
    group: { en: 'DevOps & Cloud', es: 'DevOps y Nube' },
    emphasis: 'technical',
    items: ['AWS', 'GCP', 'Docker', 'CI/CD', 'GitHub Actions'],
  },
  {
    group: { en: 'Practices', es: 'Prácticas' },
    emphasis: 'technical',
    items: [
      'SRE principles',
      'Security architecture',
      'System design',
      'Code review',
    ],
  },
]

export const education: EducationEntry[] = [
  {
    school: 'Universidad de los Andes',
    degree: {
      en: 'B.S. in Systems and Computing Engineering',
      es: 'Ingeniería de Sistemas y Computación',
    },
    period: {
      en: '2020 — 2027 (Expected)',
      es: '2020 — 2027 (Previsto)',
    },
    location: {
      en: 'Bogotá, Colombia',
      es: 'Bogotá, Colombia',
    },
    courseworkLabel: {
      en: 'Relevant Coursework',
      es: 'Cursos relevantes',
    },
    highlights: [
      'Software Architecture',
      'Distributed Systems',
      'Cybersecurity',
      'Databases',
      'Cloud Computing',
    ],
  },
]

// Shared UI strings (section headings, CTAs, labels) — bilingual.
export const ui = {
  nav: {
    philosophy: { en: 'Philosophy', es: 'Filosofía' },
    experience: { en: 'Experience', es: 'Experiencia' },
    projects: { en: 'Impact', es: 'Impacto' },
    skills: { en: 'Skills', es: 'Habilidades' },
    education: { en: 'Education', es: 'Educación' },
    contact: { en: 'Contact', es: 'Contacto' },
  },
  skipToContent: { en: 'Skip to content', es: 'Saltar al contenido' },
  hero: {
    getInTouch: { en: 'Get in touch', es: 'Contáctame' },
    linkedin: { en: 'LinkedIn', es: 'LinkedIn' },
    github: { en: 'GitHub', es: 'GitHub' },
    resume: { en: 'Download CV', es: 'Descargar CV' },
    portraitAlt: { en: 'Portrait of', es: 'Retrato de' },
  },
  philosophy: {
    eyebrow: { en: 'Engineering philosophy', es: 'Filosofía de ingeniería' },
    heading: {
      en: 'Systems that hand off cleanly to the humans who use them.',
      es: 'Sistemas que se dan la mano con las personas que los usan.',
    },
  },
  experience: {
    eyebrow: { en: 'A path, not a list', es: 'Un camino, no una lista' },
    heading: {
      en: 'From intern to Core Logic Lead at Duppla',
      es: 'De practicante a Líder de Lógica Central en Duppla',
    },
    seniorityLabel: { en: 'Responsibility', es: 'Responsabilidad' },
    stakeholdersLabel: { en: 'Partners', es: 'Stakeholders' },
  },
  projects: {
    eyebrow: { en: 'Impact cards', es: 'Tarjetas de impacto' },
    heading: {
      en: 'Human problem, technical answer',
      es: 'Problema humano, respuesta técnica',
    },
    humanProblem: { en: 'The human problem', es: 'El problema humano' },
    technicalSolution: { en: 'The technical answer', es: 'La respuesta técnica' },
    stakeholders: { en: 'Stakeholders', es: 'Stakeholders' },
  },
  skills: {
    eyebrow: { en: 'Capabilities', es: 'Capacidades' },
    heading: {
      en: 'What I bring to a team',
      es: 'Lo que aporto a un equipo',
    },
    businessCaption: {
      en: 'Business capabilities come first because most problems are human before they are technical.',
      es: 'Las capacidades de negocio van primero porque la mayoría de los problemas son humanos antes que técnicos.',
    },
  },
  education: {
    eyebrow: { en: 'Academic foundation', es: 'Cimiento académico' },
    heading: { en: 'Education', es: 'Educación' },
  },
  contact: {
    eyebrow: { en: "Let's talk", es: 'Hablemos' },
    heading: { en: 'Contact', es: 'Contacto' },
    blurb: {
      en: 'Open to conversations about backend systems, reliability, and teams that talk to each other across languages.',
      es: 'Abierto a conversaciones sobre sistemas backend, confiabilidad y equipos que se entienden entre idiomas.',
    },
    emailLabel: { en: 'Email', es: 'Correo' },
    phoneLabel: { en: 'Phone', es: 'Teléfono' },
    linkedinLabel: { en: 'LinkedIn', es: 'LinkedIn' },
    githubLabel: { en: 'GitHub', es: 'GitHub' },
  },
  footer: {
    builtWith: {
      en: 'Built with Vue 3, Vite, and Tailwind.',
      es: 'Construido con Vue 3, Vite y Tailwind.',
    },
  },
  toggles: {
    theme: {
      toLight: { en: 'Switch to light theme', es: 'Cambiar a tema claro' },
      toDark: { en: 'Switch to dark theme', es: 'Cambiar a tema oscuro' },
    },
    locale: {
      aria: { en: 'Switch language', es: 'Cambiar idioma' },
    },
  },
} as const
