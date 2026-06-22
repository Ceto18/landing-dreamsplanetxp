import {
    Map,
    Hotel,
    Sparkles,
    ShieldCheck,
    Users,
    Camera,
} from 'lucide-react'

export const missions = [
    { id: 1, slug: 'vietnam', name: 'Vietnam', image: '/mission-morocco.jpg', description: 'Ha Long Bay', pdfUrl: '/pdf/vietnam.pdf' },
    { id: 2, slug: 'tailandia', name: 'Tailandia', image: '/mission-morocco.jpg', description: 'Playas Exóticas', pdfUrl: '/pdf/thailand.pdf' },
    { id: 3, slug: 'marruecos', name: 'Marruecos', image: '/mission-morocco.jpg', description: 'Desierto Mágico', pdfUrl: '/pdf/morocco.pdf' },
    { id: 4, slug: 'japon', name: 'Japón', image: '/mission-morocco.jpg', description: 'Tierra del Sol', pdfUrl: '/pdf/japan.pdf' },
    { id: 5, slug: 'nepal', name: 'Nepal', image: '/mission-morocco.jpg', description:'Himalayás', pdfUrl: '/pdf/nepal.pdf' },
    { id: 6, slug: 'sorpresa', name: 'Misión', image: '/mission-morocco.jpg', description: 'Sorpresa', pdfUrl: '/pdf/sorpresa.pdf', isSurprise: true },
]

export const benefits = [
    { title: 'Guías Especializados', description: 'Acompañamiento experto durante cada etapa del viaje.', icon: Map },
    { title: 'Hospedaje Premium', description: 'Estadías cómodas, seleccionadas por ubicación y calidad.', icon: Hotel },
    { title: 'Experiencias Auténticas', description: 'Actividades reales que conectan con la cultura local.', icon: Sparkles },
    { title: 'Seguridad Garantizada', description: 'Rutas planificadas y soporte constante durante la misión.', icon: ShieldCheck },
    { title: 'Grupos Reducidos', description: 'Viajes más cercanos, personalizados y mejor organizados.', icon: Users },
    { title: 'Memorias Inmortales', description: 'Momentos únicos diseñados para quedarse contigo.', icon: Camera },
]