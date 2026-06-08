'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'

const destinations = ['Marruecos', 'Vietnam', 'Tailandia', 'Japón', 'Nepal', 'Sorpresa']

const momentosData = {
    Marruecos: Array.from({ length: 8 }, (_, i) => ({
        id: `marr-${i}`,
        title: 'Momento en el Riad',
        description: 'Una noche mágica en el corazón de la Medina de Fez',
        image: '/mission-morocco.png',
        travelDetails: '4 días en Fez y Marrakech',
        extraPhotos: Array.from({ length: 3 }, (_, j) => `/mission-morocco.png`),
    })),
    Vietnam: Array.from({ length: 8 }, (_, i) => ({
        id: `viet-${i}`,
        title: 'Bahía de Ha Long',
        description: 'Navegando entre las formaciones de piedra más hermosas del mundo',
        image: '/mission-vietnam.png',
        travelDetails: '5 días en Ha Long Bay y Hanoi',
        extraPhotos: Array.from({ length: 3 }, (_, j) => `/mission-vietnam.png`),
    })),
    Tailandia: Array.from({ length: 8 }, (_, i) => ({
        id: `thai-${i}`,
        title: 'Playas de Krabi',
        description: 'Atardeceres espectaculares sobre aguas turquesas',
        image: '/mission-thailand.png',
        travelDetails: '4 días en Krabi y Phi Phi Islands',
        extraPhotos: Array.from({ length: 3 }, (_, j) => `/mission-thailand.png`),
    })),
    Japón: Array.from({ length: 8 }, (_, i) => ({
        id: `jap-${i}`,
        title: 'Monte Fuji',
        description: 'La majestuosa montaña sagrada de Japón',
        image: '/mission-japan.png',
        travelDetails: '6 días en Tokyo y Hakone',
        extraPhotos: Array.from({ length: 3 }, (_, j) => `/mission-japan.png`),
    })),
    Nepal: Array.from({ length: 8 }, (_, i) => ({
        id: `nep-${i}`,
        title: 'Himalayas',
        description: 'Aventura en la montaña más grande del mundo',
        image: '/mission-nepal.png',
        travelDetails: '7 días en trekking con vistas al Everest',
        extraPhotos: Array.from({ length: 3 }, (_, j) => `/mission-nepal.png`),
    })),
    Sorpresa: Array.from({ length: 8 }, (_, i) => ({
        id: `surp-${i}`,
        title: 'Destino Sorpresa',
        description: 'Descubre el destino cuando llegues',
        image: '/mission-vietnam.png',
        travelDetails: 'Aventura sorpresa diseñada para ti',
        extraPhotos: Array.from({ length: 3 }, (_, j) => `/mission-vietnam.png`),
    })),
}

interface Momento {
    id: string
    title: string
    description: string
    image: string
    travelDetails: string
    extraPhotos: string[]
}

export function Moment() {
    const [activeTab, setActiveTab] = useState('Marruecos')
    const [selectedMomento, setSelectedMomento] = useState<Momento | null>(null)

    const currentMomentos = momentosData[activeTab as keyof typeof momentosData]

    return (
        <section id="moment" className="py-20 bg-secondary/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-6">
                    <h2 className="text-5xl font-bold leading-tight tracking-tight text-foreground">MOMENTOS CAPTURADOS</h2>
                    <p className="text-lg text-muted-foreground">Cada momento cuenta una historia única de nuestros viajeros</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-12 justify-center">
                    {destinations.map((dest) => (
                        <button
                            key={dest}
                            onClick={() => setActiveTab(dest)}
                            className={`px-6 py-2 rounded-full font-semibold transition-all ${activeTab === dest
                                    ? 'bg-accent text-primary'
                                    : 'bg-secondary text-foreground hover:border-accent border border-transparent'
                                }`}
                        >
                            {dest}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {currentMomentos.map((momento) => (
                        <div
                            key={momento.id}
                            className="group relative h-64 rounded-lg overflow-hidden cursor-pointer"
                            onClick={() => setSelectedMomento(momento)}
                        >
                            <Image
                                src={momento.image}
                                alt={momento.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 translate-y-full group-hover:translate-y-0 transition-transform">
                                <h3 className="font-semibold text-foreground">{momento.title}</h3>
                                <p className="text-sm text-foreground/70">{momento.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <button className="px-8 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent/10 transition-colors">
                        Ver más momentos
                    </button>
                </div>
            </div>

            {/* Modal */}
            {selectedMomento && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl overflow-auto">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedMomento(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur rounded-full hover:bg-background transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Modal Content */}
                        <div className="space-y-6 p-6 md:p-8">
                            {/* Main Image */}
                            <div className="relative h-96 rounded-lg overflow-hidden">
                                <Image
                                    src={selectedMomento.image}
                                    alt={selectedMomento.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold">{selectedMomento.title}</h2>
                                <p className="text-lg text-foreground/70">{selectedMomento.description}</p>
                            </div>

                            {/* Extra Photos */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-foreground">Más momentos de esta experiencia</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {selectedMomento.extraPhotos.map((photo, idx) => (
                                        <div key={idx} className="relative h-32 rounded-lg overflow-hidden">
                                            <Image
                                                src={photo}
                                                alt={`Extra ${idx}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Travel Details */}
                            <div className="p-4 rounded-lg bg-secondary/50 border border-accent/30">
                                <p className="text-sm text-foreground/60 mb-2">Detalles de Viaje</p>
                                <p className="text-foreground font-semibold">{selectedMomento.travelDetails}</p>
                            </div>

                            {/* Action Button */}
                            <button className="w-full px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors">
                                Explorar Misión
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
