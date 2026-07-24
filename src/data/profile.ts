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

/** The post-launch story: what the systems do once I stop touching them. */
export interface Durability {
  heading: BilingualText
  items: BilingualText[]
  note: BilingualText
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
  durability: Durability
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
    en: 'Core Logic Lead · Production Ownership',
    es: 'Líder de Lógica Central · Responsable en producción',
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
      'Owner of the three engines a high-growth Fintech × Proptech business runs on — property valuation, client screening and contract generation — ' +
      'and of how they behave in production. Cut operational wait times by up to 96%, caught and repelled a live attack on production, ' +
      'and bridged backend systems (Python, Go, Ruby) with CRM ecosystems (Salesforce). ' +
      'Sole engineer on every core engine I have built: I grow by taking on harder systems, not larger teams. ' +
      'Fluent across English and Spanish with Legal, Commercial and Operations.',
    es:
      'Responsable de los tres motores sobre los que opera una empresa Fintech × Proptech de alto crecimiento —valoración de inmuebles, evaluación de clientes y generación de contratos— ' +
      'y de cómo se comportan en producción. Reduje tiempos operativos hasta en un 96 %, detecté y repelí un ataque en vivo sobre producción, ' +
      'y conecté sistemas backend (Python, Go, Ruby) con ecosistemas CRM (Salesforce). ' +
      'Único ingeniero en cada motor central que he construido: crezco asumiendo sistemas más difíciles, no equipos más grandes. ' +
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
  durability: {
    heading: {
      en: 'Systems that stopped needing me',
      es: 'Sistemas que dejaron de necesitarme',
    },
    items: [
      {
        en: 'Credentialing code still running with minimal maintenance two years after launch.',
        es: 'Código de credenciales que sigue corriendo con mantenimiento mínimo dos años después del lanzamiento.',
      },
      {
        en: 'A contract engine issuing every contract the company signs, while sitting in maintenance.',
        es: 'Un motor que emite todos los contratos que firma la compañía, mientras está en mantenimiento.',
      },
      {
        en: 'A backend posture that has held as attack volume grew.',
        es: 'Una postura de backend que ha aguantado mientras crecía el volumen de ataques.',
      },
    ],
    note: {
      en: 'I measure the work by what it does after I stop touching it.',
      es: 'Mido el trabajo por lo que hace después de que dejo de tocarlo.',
    },
  },
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Duppla',
    role: {
      en: 'Software Engineer — Core Logic Lead',
      es: 'Ingeniero de Software — Líder de Lógica Central',
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
        'Translator between engineering and the commercial, legal and operations teams — and the engineer who then builds what the conversation agreed on. ' +
        'My weeks move between code, architecture decisions, and the conversations that make those decisions land.',
      es:
        'Traductor entre ingeniería y los equipos comercial, legal y de operaciones —y el ingeniero que después construye lo que se acordó en esa conversación. ' +
        'Mis semanas se mueven entre código, decisiones de arquitectura y las conversaciones que hacen que esas decisiones aterricen.',
    },
    highlights: [
      {
        label: {
          en: 'Core Product Ownership',
          es: 'Propiedad del producto central',
        },
        metric: '96%',
        stakeholders: { en: 'Commercial · Operations', es: 'Comercial · Operaciones' },
        detail: {
          en:
            'Rebuilt the Real Estate Evaluator over four iterations: full backend automation, then a human-in-the-loop review layer, then a migration off Retool once low-code became the constraint rather than the shortcut, then an end-to-end pass over back and front. Analyst time per property went 90 minutes to 15 to 10 to 4 on the happy path. The engine sustains 1,100 automated evaluations a day, and the 3 minutes an automated run still takes is 90 seconds of a third-party data provider, not our code.',
          es:
            'Reconstruí el Evaluador Inmobiliario en cuatro iteraciones: primero la automatización completa del backend, después una capa de revisión con humano en el ciclo, después la migración fuera de Retool cuando el low-code pasó de atajo a restricción, y finalmente una pasada de punta a punta sobre back y front. El tiempo del analista por inmueble pasó de 90 minutos a 15, a 10 y a 4 en el camino feliz. El motor sostiene 1.100 evaluaciones automáticas al día, y de los 3 minutos que aún tarda una corrida automática, 90 segundos son de un proveedor de datos externo, no de nuestro código.',
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
            'Months before it mattered I had added a deliberately small detector — two heuristic buckets: HTTP exceptions carrying known attack signatures, and sources accumulating failed requests. When a bot exposed our full API surface and attacks hit billing and reporting within minutes, that cheap signal is what caught it live. I shipped endpoint-level defenses in real time and hardened the backend into a posture that has since repelled 100% of subsequent attempts — attack volume has kept growing, the success rate has stayed at zero.',
          es:
            'Meses antes de que importara había agregado un detector deliberadamente pequeño: dos buckets heurísticos —excepciones HTTP con firmas de ataque conocidas, y orígenes que acumulan peticiones fallidas. Cuando un bot expuso toda nuestra superficie de API y en minutos empezaron los ataques contra cobranza y reportes, esa señal barata fue la que lo detectó en vivo. Desplegué defensas a nivel de endpoint en tiempo real y endurecí el backend en una postura que desde entonces ha repelido el 100 % de los intentos posteriores: el volumen sigue subiendo, la tasa de éxito sigue en cero.',
        },
      },
      {
        label: {
          en: 'Contract Automation',
          es: 'Automatización de contratos',
        },
        metric: '90%',
        stakeholders: {
          en: 'Legal · Commercial · Operations',
          es: 'Legal · Comercial · Operaciones',
        },
        detail: {
          en:
            'Sole designer and owner of the contract generation engine — unowned work I picked up after making the case for it — now the only path through which the company issues contracts. I modelled the legal document as validated data instead of a text template: typed placeholders and validation rules refuse an incomplete contract before it reaches a lawyer. Review errors down 90%, request-to-approval turnaround down 40%. Load-tested to roughly fifteen times current daily volume in a single hour, where the ceiling is the document provider\'s rate limit rather than the pipeline — sized for two orders of magnitude of growth, not for today.',
          es:
            'Diseñé y soy el único responsable del motor de generación de contratos —trabajo sin dueño que asumí después de argumentar su urgencia— y hoy es la única vía por la que la compañía emite contratos. Modelé el documento legal como datos validados en vez de una plantilla de texto: los placeholders tipados y las reglas de validación rechazan un contrato incompleto antes de que llegue a un abogado. 90 % menos errores de revisión y 40 % menos tiempo entre solicitud y aprobación. Probado bajo carga a unas quince veces el volumen diario actual en una sola hora, donde el techo es el límite de peticiones del proveedor del documento y no el pipeline: dimensionado para dos órdenes de magnitud de crecimiento, no para hoy.',
        },
      },
      {
        label: {
          en: 'Salesforce Bridge',
          es: 'Puente con Salesforce',
        },
        stakeholders: { en: 'Commercial · RevOps', es: 'Comercial · RevOps' },
        detail: {
          en:
            'Not a Salesforce engineer — the engineer on the other side of the seam. I know the org\'s data model, SOQL/SOSL, Apex and the REST surface well enough to be the one proposing the schema and optimisation changes, and I contribute the integration side: data cleansing, shared utilities, and keeping CRM records consistent enough for the revenue team to trust them.',
          es:
            'No soy ingeniero de Salesforce: soy el ingeniero del otro lado de la costura. Conozco el modelo de datos de la org, SOQL/SOSL, Apex y la superficie REST lo suficiente como para ser quien propone los cambios de esquema y de optimización, y aporto el lado de la integración: limpieza de datos, utilidades compartidas y mantener los registros del CRM lo bastante consistentes como para que el equipo de ingresos confíe en ellos.',
        },
      },
      {
        label: {
          en: 'Engineering Leverage',
          es: 'Palanca de ingeniería',
        },
        metric: '30%',
        stakeholders: { en: 'Engineering', es: 'Ingeniería' },
        detail: {
          en:
            'Built AWS and Slack wrappers now used by the whole team — four engineers, every backend — so nobody hand-rolls a client per service. 30% of technical debt gone, and the next engineer spends their first day shipping rather than decoding. The front-end architecture I designed for contract generation became the pattern the evaluator rebuild was based on, and I audit code I do not own and take the reliability defects I find there.',
          es:
            'Construí wrappers de AWS y Slack que hoy usa todo el equipo —cuatro ingenieros, todos los backends— para que nadie arme un cliente por servicio. 30 % de deuda técnica menos, y el siguiente ingeniero dedica su primer día a entregar, no a descifrar. La arquitectura de front que diseñé para la generación de contratos se convirtió en el patrón sobre el que se reconstruyó el evaluador, y audito código que no es mío y me hago cargo de los defectos de confiabilidad que encuentro ahí.',
        },
      },
      {
        label: {
          en: 'Technical Foresight',
          es: 'Anticipación técnica',
        },
        stakeholders: { en: 'Engineering · Leadership', es: 'Ingeniería · Dirección' },
        detail: {
          en:
            'When AI-generated internal front-ends started appearing, I argued at the third one that the pattern outruns ownership faster than anyone expects, and that the cost arrives later as risk nobody has scoped. The trajectory played out on the timeline I described. I also made the case that a design guide alone cannot steer generated code — without machine-readable context an agent builds a generic product, not yours. I raise this class of problem before it becomes a ticket.',
          es:
            'Cuando empezaron a aparecer fronts internos generados con IA, argumenté en el tercero que el patrón le gana a la propiedad más rápido de lo que cualquiera espera, y que el costo llega después como riesgo que nadie ha dimensionado. La trayectoria se dio en el plazo que describí. También sostuve que una guía de diseño no alcanza para dirigir código generado: sin contexto legible por máquina, un agente construye un producto genérico, no el tuyo. Levanto esta clase de problema antes de que se convierta en un ticket.',
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
            'Given one line of direction — "get this under 10 minutes" — I traced the commercial call flow to find which data actually gated a decision, then rebuilt the Client Evaluator backend around it instead of pre-warming everything. Thirty minutes of manual work collapsed into 3, and the service has since absorbed a 1,500-evaluation day against a normal load of 170 without failing.',
          es:
            'Con una sola línea de dirección —«baja esto de 10 minutos»— rastreé el flujo de llamadas comerciales para encontrar qué datos realmente condicionaban la decisión, y reconstruí el backend del Evaluador de Clientes alrededor de eso en vez de pre-cargar todo. Treinta minutos de trabajo manual se convirtieron en 3, y desde entonces el servicio absorbió un día de 1.500 evaluaciones contra una carga normal de 170 sin fallar.',
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
        'Commercial analysts waited 90 minutes for each property evaluation — long enough for a client to cool off and a negotiation to stall. I noticed the wait, asked about it, and was invited onto the project.',
      es:
        'Los analistas comerciales esperaban 90 minutos por cada evaluación de inmueble: suficiente para que un cliente se enfriara y una negociación se frenara. Noté la espera, pregunté por ella y me invitaron al proyecto.',
    },
    technicalSolution: {
      en:
        'Four iterations, each answering the constraint the last one exposed. Full backend automation first; then a human-in-the-loop review layer on Retool; then a migration into our own intranet once low-code turned into a fixed-size box that could not absorb the requests coming in; then an end-to-end pass over back and front — events, caching, vectorised scoring — once building the contract engine taught me where the remaining time was hiding. Analyst time went 90 minutes to 15 to 10 to 4 on the happy path, 7 on a normal one. The engine sustains 1,100 automated evaluations a day and 100 human reviews per evaluator; an automated run is 3 minutes, 90 seconds of which belongs to a third-party data provider.',
      es:
        'Cuatro iteraciones, cada una respondiendo a la restricción que reveló la anterior. Primero la automatización completa del backend; después una capa de revisión con humano en el ciclo sobre Retool; después la migración a nuestra propia intranet cuando el low-code se volvió una caja de tamaño fijo incapaz de absorber los requerimientos que llegaban; y finalmente una pasada de punta a punta sobre back y front —eventos, caché, scoring vectorizado— cuando construir el motor de contratos me enseñó dónde se escondía el tiempo restante. El tiempo del analista pasó de 90 minutos a 15, a 10 y a 4 en el camino feliz, 7 en uno normal. El motor sostiene 1.100 evaluaciones automáticas al día y 100 revisiones humanas por evaluador; una corrida automática toma 3 minutos, de los cuales 90 segundos son de un proveedor de datos externo.',
    },
    stakeholders: { en: 'Commercial · Operations', es: 'Comercial · Operaciones' },
    metric: {
      value: '96%',
      label: {
        en: 'less analyst time · 90 → 4 min',
        es: 'menos tiempo del analista · 90 → 4 min',
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
        'Origination sat on every prospect for 30 minutes of manual screening. Good leads went cold in the queue while unfit ones still ate the same half-hour before they could be discarded. The brief was one sentence: get it under 10 minutes.',
      es:
        'Originación se quedaba media hora con cada prospecto haciendo filtros manuales. Los buenos leads se enfriaban en la cola y los que no calificaban consumían el mismo tiempo antes de poder descartarse. El encargo fue una sola frase: bájalo de 10 minutos.',
    },
    technicalSolution: {
      en:
        'I traced the commercial call flow first to find which data actually gated a decision, because the naive answer — pre-warm everything — breaks on the leads that reach the stage with fields missing. Full backend rewrite around that finding: new data model, leaner queries, asynchronous scoring. The cycle dropped from 30 minutes to 3, and the service has since absorbed a 1,500-evaluation day against a normal load of 170 without failing — if the top of the funnel widens, the engine is already there.',
      es:
        'Primero rastreé el flujo de llamadas comerciales para encontrar qué datos condicionaban realmente la decisión, porque la respuesta ingenua —pre-cargar todo— se rompe con los leads que llegan a esa etapa con campos faltantes. Reescritura completa del backend alrededor de ese hallazgo: nuevo modelo de datos, consultas más livianas y scoring asíncrono. El ciclo cayó de 30 a 3 minutos, y desde entonces el servicio absorbió un día de 1.500 evaluaciones contra una carga normal de 170 sin fallar: si la boca del embudo se ensancha, el motor ya está listo.',
    },
    stakeholders: { en: 'Commercial · Origination', es: 'Comercial · Originación' },
    metric: {
      value: '90%',
      label: {
        en: 'faster cycle · 30 → 3 min',
        es: 'más rápido · 30 → 3 min',
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
      en: 'The single system of record for every contract the company issues — designed, built and deployed end-to-end as the sole engineer.',
      es: 'El sistema único por el que la compañía emite todos sus contratos: diseñado, construido y desplegado de punta a punta como único ingeniero.',
    },
    humanProblem: {
      en:
        'Contract review was the bottleneck the whole business ran through: three separate teams all sent requests, and every contract was hand-crafted from templates riddled with typo-prone patterns and half-filled variable slots. An earlier "automation" had only put the data on one low-code page — no generation, no validation, and covering part of the flow — and was painful enough to work on that even small fixes stalled. Nobody owned it. I made the case for the urgency, got no takers, and picked it up.',
      es:
        'La revisión de contratos era el cuello de botella por el que pasaba todo el negocio: tres equipos distintos enviaban solicitudes, y cada contrato salía a mano desde plantillas plagadas de patrones propensos a erratas y variables a medio llenar. Un intento previo de «automatización» solo había puesto los datos en una página low-code —sin generación, sin validación y cubriendo apenas parte del flujo— y era tan doloroso de trabajar que hasta los arreglos pequeños se frenaban. Nadie era dueño de eso. Argumenté la urgencia, no hubo voluntarios, y lo asumí.',
    },
    technicalSolution: {
      en:
        'Audited the business process and the data flow before writing anything, then built the real automation from scratch as the sole engineer. Every template rebuilt around typed placeholders, with a validation layer in front of generation so an incomplete or inconsistent contract is refused at the boundary rather than caught at a lawyer\'s desk. It now issues 100% of the company\'s contracts — versioned, validated, auditable — with review errors down 90% and request-to-approval turnaround down 40%. Load-tested in one hour to roughly fifteen times a normal day\'s volume, bounded by the document provider\'s rate limit rather than by the pipeline: sized for two orders of magnitude of growth, not for today. Stable enough since launch to sit in maintenance, owned by one engineer.',
      es:
        'Audité el proceso de negocio y el flujo de datos antes de escribir una línea, y construí la automatización real desde cero como único ingeniero. Cada plantilla reconstruida alrededor de placeholders tipados, con una capa de validación delante de la generación para que un contrato incompleto o inconsistente se rechace en la frontera y no se descubra en el escritorio de un abogado. Hoy emite el 100 % de los contratos de la compañía —versionados, validados y auditables— con 90 % menos errores de revisión y 40 % menos tiempo entre solicitud y aprobación. Probado bajo carga en una hora a unas quince veces el volumen de un día normal, limitado por el rate limit del proveedor del documento y no por el pipeline: dimensionado para dos órdenes de magnitud de crecimiento, no para hoy. Lo bastante estable desde el lanzamiento para estar en mantenimiento, a cargo de un solo ingeniero.',
    },
    stakeholders: {
      en: 'Legal · Commercial · Operations',
      es: 'Legal · Comercial · Operaciones',
    },
    metric: {
      value: '90%',
      label: {
        en: 'fewer review errors',
        es: 'menos errores de revisión',
      },
    },
    tags: ['Automation', 'Data Modeling', 'Legal-Tech'],
    link: null,
  },
  {
    title: {
      en: 'Live Attack Defense',
      es: 'Defensa en Vivo ante Ataques',
    },
    description: {
      en: 'A cheap detector built months before it mattered caught a live API-exposure attack; I defended and hardened the backend end-to-end.',
      es: 'Un detector barato construido meses antes de que importara atrapó en vivo un ataque que expuso la superficie de la API; defendí y endurecí el backend de extremo a extremo.',
    },
    humanProblem: {
      en:
        'A bot slipped in a crafted request that revealed our full API surface. Within minutes, attacks flooded the billing and reporting endpoints — the kind of hit that moves real money.',
      es:
        'Un bot coló una petición armada que reveló toda la superficie de nuestra API. En minutos empezaron los ataques contra los endpoints de cobranza y reportes: justo los que mueven dinero real.',
    },
    technicalSolution: {
      en:
        'Months earlier, in my seventh month, I had added a deliberately small detector: raise on error, then sort into two heuristic buckets — HTTP exceptions carrying known attack signatures, and sources accumulating failed requests. It was not a rich feature, and it did not need to be; it is what caught the attack live. I shipped endpoint-level defenses on the targeted routes before they could execute and hardened the backend into a posture that has repelled every subsequent attempt as attack volume has grown.',
      es:
        'Meses antes, en mi séptimo mes, había agregado un detector deliberadamente pequeño: levantar el error y clasificarlo en dos buckets heurísticos —excepciones HTTP con firmas de ataque conocidas, y orígenes que acumulan peticiones fallidas. No era una funcionalidad sofisticada, y no necesitaba serlo: fue lo que detectó el ataque en vivo. Desplegué defensas a nivel de endpoint sobre las rutas comprometidas antes de que pudieran ejecutarse y endurecí el backend en una postura que ha repelido cada intento posterior a medida que el volumen de ataques ha crecido.',
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
    items: [
      'Salesforce (Apex, REST)',
      'Slack',
      'RabbitMQ',
      'REST APIs',
      'Custom AWS / Slack wrappers',
    ],
  },
  {
    group: { en: 'Databases & Data', es: 'Bases de datos y datos' },
    emphasis: 'technical',
    items: ['PostgreSQL', 'BigQuery', 'SOQL / SOSL'],
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
