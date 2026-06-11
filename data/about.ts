import { CheckCircle, Compass, Globe2, HeartHandshake, Leaf, ShieldCheck, Sparkles, Trophy } from 'lucide-react'

export type AboutValue = {
    title: string
    description: string
    icon: typeof Sparkles
}

export type AboutStat = {
    value: string
    label: string
}

export type TimelineItem = {
    id: number
    year: string
    title: string
    description: string
    image: string
}

export const aboutValues: AboutValue[] = [
    {
        title: 'Autenticidad',
        description: 'Experiencias genuinas diseñadas para conectar con la cultura local.',
        icon: Sparkles,
    },
    {
        title: 'Excelencia',
        description: 'Atención al detalle en cada aspecto de tu viaje.',
        icon: CheckCircle,
    },
    {
        title: 'Seguridad',
        description: 'Tu bienestar es nuestra prioridad número uno.',
        icon: ShieldCheck,
    },
    {
        title: 'Sostenibilidad',
        description: 'Viajamos responsablemente con respeto al planeta.',
        icon: Leaf,
    },
]

export const aboutStats: AboutStat[] = [
    {
        value: '500+',
        label: 'Viajeros Felices',
    },
    {
        value: '6',
        label: 'Destinos Premium',
    },
    {
        value: '4.9',
        label: 'Calificación Promedio',
    },
    {
        value: '5',
        label: 'Años de Experiencia',
    },
]

export const aboutTimeline: TimelineItem[] = [
    {
        id: 1,
        year: 'Inicio',
        title: 'Nace la visión',
        description:
            'DreamsPlanetXP nace con la idea de crear viajes diferentes, más humanos, auténticos y memorables.',
        image: '/images/about/timeline-1.jpg',
    },
    {
        id: 2,
        year: 'Etapa 1',
        title: 'Primeras misiones',
        description:
            'Diseñamos experiencias seleccionadas en destinos especiales, priorizando seguridad, cultura y conexión.',
        image: '/images/about/timeline-2.jpg',
    },
    {
        id: 3,
        year: 'Etapa 2',
        title: 'Comunidad viajera',
        description:
            'Más viajeros se suman a nuestras misiones, compartiendo momentos, aprendizajes y nuevas formas de explorar.',
        image: '/images/about/timeline-3.jpg',
    },
    {
        id: 4,
        year: 'Hoy',
        title: 'Experiencias premium',
        description:
            'Consolidamos una propuesta de viajes premium con acompañamiento, planificación y detalles cuidadosamente pensados.',
        image: '/images/about/timeline-4.jpg',
    },
    {
        id: 5,
        year: 'Futuro',
        title: 'Nuevos destinos',
        description:
            'Seguimos expandiendo nuestras misiones hacia nuevos países, culturas y experiencias transformadoras.',
        image: '/images/about/timeline-5.jpg',
    },
]

export const aboutPillars = [
    {
        title: 'Diseño de experiencias',
        description:
            'Cada viaje se construye pensando en el ritmo, la emoción y los momentos clave del viajero.',
        icon: Compass,
    },
    {
        title: 'Conexión cultural',
        description:
            'Buscamos que cada destino se viva desde su esencia, su gente, su historia y sus tradiciones.',
        icon: Globe2,
    },
    {
        title: 'Acompañamiento humano',
        description:
            'Nuestro equipo acompaña cada misión para que el viajero se sienta seguro, guiado y respaldado.',
        icon: HeartHandshake,
    },
    {
        title: 'Calidad constante',
        description:
            'Cuidamos cada detalle para mantener una experiencia organizada, confiable y memorable.',
        icon: Trophy,
    },
]