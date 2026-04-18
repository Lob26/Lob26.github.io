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
}

export interface ExperienceHighlight {
  label: BilingualText
  metric?: string
  detail: BilingualText
}

export interface ExperienceEntry {
  company: string
  role: BilingualText
  period: BilingualText
  location: BilingualText
  summary: BilingualText
  highlights: ExperienceHighlight[]
}

export interface Project {
  title: BilingualText
  description: BilingualText
  tags: string[]
  link: string | null
}

export interface SkillGroup {
  group: BilingualText
  items: string[]
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
    en: 'Software Developer',
    es: 'Desarrollador de Software',
  },
  subtitle: {
    en: 'SRE & Core Logic Lead',
    es: 'Líder de SRE y Lógica Central',
  },
  location: {
    en: 'Bogotá D.C., Colombia',
    es: 'Bogotá D.C., Colombia',
  },
  tagline: {
    en: 'Fintech × Proptech · Backend systems · Reliability engineering',
    es: 'Fintech × Proptech · Sistemas backend · Ingeniería de confiabilidad',
  },
  bio: {
    en:
      'Software Developer with nearly 2 years of experience in high-growth Fintech/Proptech environments. ' +
      'Technical lead for core business engines and infrastructure reliability. ' +
      'Bridges complex backend logic (Python, Go, Ruby) with CRM ecosystems (Salesforce). ' +
      'Proven track record of reducing operational downtime and optimizing system performance by up to 90%. ' +
      'Focused on SRE principles, security architecture, and delivering scalable product features.',
    es:
      'Desarrollador de Software con casi 2 años de experiencia en entornos Fintech/Proptech de alto crecimiento. ' +
      'Líder técnico de motores de negocio centrales y de la confiabilidad de la infraestructura. ' +
      'Conecta lógica backend compleja (Python, Go, Ruby) con ecosistemas CRM (Salesforce). ' +
      'Historial comprobado de reducción de tiempos de inactividad y optimización del rendimiento de sistemas hasta en un 90 %. ' +
      'Enfocado en principios de SRE, arquitectura de seguridad y entrega de funcionalidades de producto escalables.',
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
}

export const experience: ExperienceEntry[] = [
  {
    company: 'Duppla',
    role: {
      en: 'Software Developer — SRE & Core Logic Lead',
      es: 'Desarrollador de Software — Líder de SRE y Lógica Central',
    },
    period: {
      en: 'August 2024 — Present',
      es: 'Agosto 2024 — Actualidad',
    },
    location: {
      en: 'Bogotá, Colombia',
      es: 'Bogotá, Colombia',
    },
    summary: {
      en:
        'Technical lead for the core business engines and infrastructure reliability. ' +
        'Own the SRE practice, security architecture, and the Salesforce integration layer that powers the commercial platform.',
      es:
        'Líder técnico de los motores de negocio centrales y de la confiabilidad de la infraestructura. ' +
        'Responsable de la práctica de SRE, la arquitectura de seguridad y la capa de integración con Salesforce que impulsa la plataforma comercial.',
    },
    highlights: [
      {
        label: {
          en: 'Core Product Ownership',
          es: 'Propiedad del producto central',
        },
        metric: '83%',
        detail: {
          en:
            'Architected the "Real Estate Evaluator" engine, reducing manual processing time by 83% (from 90 to 15 minutes) through logic optimization and automated data flows.',
          es:
            'Diseñé la arquitectura del motor «Evaluador Inmobiliario», reduciendo el tiempo de procesamiento manual en un 83 % (de 90 a 15 minutos) mediante optimización de la lógica y flujos de datos automatizados.',
        },
      },
      {
        label: {
          en: 'Security Architecture',
          es: 'Arquitectura de seguridad',
        },
        metric: '100%',
        detail: {
          en:
            'Designed and deployed a resilient corporate security framework post-incident, achieving 100% asset protection and zero recurring critical vulnerabilities.',
          es:
            'Diseñé y desplegué un marco de seguridad corporativo resiliente tras un incidente, logrando el 100 % de protección de activos y cero vulnerabilidades críticas recurrentes.',
        },
      },
      {
        label: {
          en: 'Contract Automation',
          es: 'Automatización de contratos',
        },
        detail: {
          en:
            'Currently leading the engineering of a high-stakes Contract Generation Engine, automating legal workflows and improving DX.',
          es:
            'Actualmente lidero la ingeniería de un motor de generación de contratos de alto impacto, automatizando los flujos legales y mejorando la experiencia de desarrollo.',
        },
      },
      {
        label: {
          en: 'Salesforce Integration',
          es: 'Integración con Salesforce',
        },
        detail: {
          en:
            'Optimized Salesforce CRM architecture and data synchronization, acting as a "Bridge Engineer" between core backend services and the commercial platform.',
          es:
            'Optimicé la arquitectura del CRM Salesforce y la sincronización de datos, actuando como «ingeniero puente» entre los servicios backend centrales y la plataforma comercial.',
        },
      },
      {
        label: {
          en: 'Infrastructure & Tools',
          es: 'Infraestructura y herramientas',
        },
        metric: '30%',
        detail: {
          en:
            'Developed custom wrappers for AWS and Slack integrations, standardizing internal tooling and reducing technical debt by 30% across the repository.',
          es:
            'Desarrollé wrappers personalizados para integraciones con AWS y Slack, estandarizando el tooling interno y reduciendo la deuda técnica en un 30 % en el repositorio.',
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
        'Joined the engineering team to ship backend services for customer assessment and internal logistics, delivering measurable production impact.',
      es:
        'Me uní al equipo de ingeniería para entregar servicios backend de evaluación de clientes y logística interna, con impacto medible en producción.',
    },
    highlights: [
      {
        label: {
          en: 'Business Process Migration',
          es: 'Migración de procesos de negocio',
        },
        metric: '90%',
        detail: {
          en:
            'Engineered the migration of the "Client Evaluator" backend, resulting in a 90% reduction in execution time (from 30 minutes to 3 minutes).',
          es:
            'Lideré la migración del backend del «Evaluador de Clientes», logrando una reducción del 90 % en el tiempo de ejecución (de 30 a 3 minutos).',
        },
      },
      {
        label: {
          en: 'Internal Logistics',
          es: 'Logística interna',
        },
        detail: {
          en:
            'Designed a Slack-based automation for attendance and office logistics.',
          es:
            'Diseñé una automatización sobre Slack para el control de asistencia y la logística de oficina.',
        },
      },
      {
        label: {
          en: 'Stability',
          es: 'Estabilidad',
        },
        detail: {
          en:
            'Delivered production-ready code for corporate credentialing systems that remain active with minimal maintenance 2 years post-launch.',
          es:
            'Entregué código listo para producción para sistemas de credenciales corporativas que siguen activos con mantenimiento mínimo 2 años después del lanzamiento.',
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
      en:
        'Lead technical owner. Migrated complex logic from Retool (low-code) to a custom-built intranet. 83% reduction in human processing time (90 → 15 min).',
      es:
        'Propietario técnico principal. Migré la lógica compleja desde Retool (low-code) a una intranet a medida. Reducción del 83 % en tiempo de procesamiento humano (90 → 15 min).',
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
      en:
        'Complete backend migration of customer assessment logic. 90% performance increase (30 → 3 min) via algorithmic optimization and DB refinement.',
      es:
        'Migración completa del backend de la lógica de evaluación de clientes. Aumento de rendimiento del 90 % (30 → 3 min) mediante optimización algorítmica y refinamiento de la base de datos.',
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
      en:
        'Scalable document generation to eliminate legal bottlenecks. Built during the company\'s Series A preparation.',
      es:
        'Generación de documentos escalable para eliminar cuellos de botella legales. Construido durante la preparación de la Serie A de la compañía.',
    },
    tags: ['Automation', 'DX', 'Legal-Tech'],
    link: null,
  },
  {
    title: {
      en: 'Security Framework 2.0',
      es: 'Marco de Seguridad 2.0',
    },
    description: {
      en:
        'Redesigned infra security layer for a fintech environment: encryption standards, access control, CI/CD safeguards, post-incident.',
      es:
        'Rediseño de la capa de seguridad de infraestructura para un entorno fintech: estándares de cifrado, control de acceso y salvaguardas en CI/CD, tras un incidente.',
    },
    tags: ['Security', 'CI/CD', 'Fintech'],
    link: null,
  },
  {
    title: {
      en: 'Fullstack Spring / Angular App',
      es: 'Aplicación Fullstack Spring / Angular',
    },
    description: {
      en:
        'Public academic project combining a Spring Boot backend with an Angular frontend. Available on GitHub.',
      es:
        'Proyecto académico público que combina un backend en Spring Boot con un frontend en Angular. Disponible en GitHub.',
    },
    tags: ['Spring Boot', 'Angular', 'Java'],
    link: 'https://github.com/Lob26',
  },
  {
    title: {
      en: 'JDO Data Persistence Project',
      es: 'Proyecto de Persistencia de Datos con JDO',
    },
    description: {
      en:
        'Academic exploration of Java Data Objects for object-relational persistence patterns. Available on GitHub.',
      es:
        'Exploración académica de Java Data Objects para patrones de persistencia objeto-relacional. Disponible en GitHub.',
    },
    tags: ['Java', 'JDO', 'Persistence'],
    link: 'https://github.com/Lob26',
  },
]

export const skills: SkillGroup[] = [
  {
    group: { en: 'Languages', es: 'Lenguajes' },
    items: ['Python', 'Go', 'Ruby', 'TypeScript', 'Solidity', 'JavaScript', 'SQL'],
  },
  {
    group: { en: 'Backend & Integrations', es: 'Backend e integraciones' },
    items: ['Salesforce', 'AWS SDK wrappers', 'Slack API', 'RabbitMQ', 'REST APIs'],
  },
  {
    group: { en: 'Databases', es: 'Bases de datos' },
    items: ['PostgreSQL', 'MySQL'],
  },
  {
    group: { en: 'DevOps & Cloud', es: 'DevOps y Nube' },
    items: ['AWS', 'Docker', 'CI/CD', 'GitHub Actions'],
  },
  {
    group: { en: 'Practices', es: 'Prácticas' },
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
    experience: { en: 'Experience', es: 'Experiencia' },
    projects: { en: 'Projects', es: 'Proyectos' },
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
  experience: {
    eyebrow: { en: 'Experience', es: 'Experiencia' },
    heading: {
      en: 'Shipping reliability at Duppla',
      es: 'Entregando confiabilidad en Duppla',
    },
  },
  projects: {
    eyebrow: { en: 'Selected work', es: 'Trabajo destacado' },
    heading: { en: 'Projects', es: 'Proyectos' },
  },
  skills: {
    eyebrow: { en: 'Toolbox', es: 'Herramientas' },
    heading: { en: 'Skills', es: 'Habilidades' },
  },
  education: {
    eyebrow: { en: 'Academic background', es: 'Formación académica' },
    heading: { en: 'Education', es: 'Educación' },
  },
  contact: {
    eyebrow: { en: "Let's talk", es: 'Hablemos' },
    heading: { en: 'Contact', es: 'Contacto' },
    blurb: {
      en: 'Open to conversations about backend systems, reliability, and fintech infrastructure.',
      es: 'Abierto a conversaciones sobre sistemas backend, confiabilidad e infraestructura fintech.',
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
