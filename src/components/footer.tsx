'use client'

import { motion } from 'motion/react'
import { FadeUp } from '@/components/animations/fade-up'

const socialLinks = [
    {
        name: 'Facebook',
        href: '#',
        icon: '/icons/facebook.svg',
    },
    {
        name: 'Instagram',
        href: '#',
        icon: '/icons/instagram.svg',
    },
    {
        name: 'YouTube',
        href: '#',
        icon: '/icons/youtube.svg',
    },
    {
        name: 'LinkedIn',
        href: '#',
        icon: '/icons/world-www.svg',
    },
]

const whatsappContacts = [
    {
        label: '+34 640 72 36 03',
        href: 'https://wa.me/34640723603',
    },
    {
        label: '+34 640 23 96 96',
        href: 'https://wa.me/34640239696',
    },
]

const emails = [
    'reservas@dreamsplanetxp.com',
    'info@dreamsplanetxp.com',
    'saiko@dreamsplanet.com',
]

export function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <FadeUp delay={0.05}>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">
                                <span className="text-accent">Dreams</span>
                                <span className="text-foreground">PlanetXP</span>
                            </h3>

                            <p className="text-muted-foreground text-sm">
                                Transformando viajes en experiencias memorables.
                            </p>

                            <div className="flex gap-4 pt-2">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        whileHover={{ y: -4, scale: 1.06 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
                                    >
                                        <span
                                            className="block w-5 h-5 bg-current"
                                            style={{
                                                WebkitMaskImage: `url(${social.icon})`,
                                                maskImage: `url(${social.icon})`,
                                                WebkitMaskRepeat: 'no-repeat',
                                                maskRepeat: 'no-repeat',
                                                WebkitMaskSize: 'contain',
                                                maskSize: 'contain',
                                                WebkitMaskPosition: 'center',
                                                maskPosition: 'center',
                                            }}
                                        />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </FadeUp>

                    {/* Quick Links */}
                    <FadeUp delay={0.12}>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Enlaces Rápidos
                            </h4>

                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#misiones"
                                        className="text-muted-foreground hover:text-accent transition-colors"
                                    >
                                        Misiones
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#momentos"
                                        className="text-muted-foreground hover:text-accent transition-colors"
                                    >
                                        Momentos
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#equipo"
                                        className="text-muted-foreground hover:text-accent transition-colors"
                                    >
                                        Equipo
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#contacto"
                                        className="text-muted-foreground hover:text-accent transition-colors"
                                    >
                                        Contacto
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </FadeUp>

                    {/* Company */}
                    <FadeUp delay={0.19}>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Empresa
                            </h4>

                            <ul className="space-y-2 text-sm">
                                <li>
                                    <a
                                        href="#quienes-somos"
                                        className="text-muted-foreground hover:text-accent transition-colors"
                                    >
                                        Sobre Nosotros
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="/aviso-legal"
                                        className="text-muted-foreground hover:text-accent transition-colors"
                                    >
                                        Aviso Legal
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="/politica-de-privacidad"
                                        className="text-muted-foreground hover:text-accent transition-colors"
                                    >
                                        Política de Privacidad
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="/condiciones-generales"
                                        className="text-muted-foreground hover:text-accent transition-colors"
                                    >
                                        Condiciones Generales
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </FadeUp>

                    {/* Contact */}
                    <FadeUp delay={0.26}>
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">
                                Contactos
                            </h4>

                            <div className="space-y-4 text-sm">
                                <div className="space-y-2">
                                    <p className="font-medium text-foreground">
                                        WhatsApp
                                    </p>

                                    <ul className="space-y-2">
                                        {whatsappContacts.map((contact) => (
                                            <li key={contact.href}>
                                                <a
                                                    href={contact.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-muted-foreground hover:text-accent transition-colors"
                                                >
                                                    {contact.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <p className="font-medium text-foreground">
                                        Correos
                                    </p>

                                    <ul className="space-y-2">
                                        {emails.map((email) => (
                                            <li key={email}>
                                                <a
                                                    href={`mailto:${email}`}
                                                    className="text-muted-foreground hover:text-accent transition-colors break-all"
                                                >
                                                    {email}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </FadeUp>
                </div>

                {/* Divider */}
                <FadeUp delay={0.32}>
                    <div className="h-px bg-accent/20 my-8" />
                </FadeUp>

                {/* Bottom */}
                <FadeUp delay={0.38}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground text-center md:text-left">
                        <p>
                            &copy; 2026 DreamsPlanetXP. Todos los derechos reservados.
                        </p>

                        <p>Diseñado con pasión para viajeros apasionados</p>
                    </div>
                </FadeUp>
            </div>
        </footer>
    )
}