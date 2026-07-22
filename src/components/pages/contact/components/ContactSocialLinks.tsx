'use client'

import {
    Globe,
    Heart,
    MessageSquare,
    Share2,
} from 'lucide-react'
import { motion } from 'motion/react'

import { FadeUp } from '@/components/animations/fade-up'

const socialLinks = [
    {
        label: 'Red social',
        href: '#',
        icon: Share2,
    },
    {
        label: 'Comunidad',
        href: '#',
        icon: Heart,
    },
    {
        label: 'Web',
        href: '#',
        icon: Globe,
    },
    {
        label: 'Mensaje',
        href: '#',
        icon: MessageSquare,
    },
]

export function ContactSocialLinks() {
    return (
        <FadeUp delay={0.5}>
            <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    Síguenos
                </p>

                <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => {
                        const Icon = social.icon

                        return (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                whileHover={{
                                    y: -4,
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                aria-label={social.label}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 text-accent transition-all duration-300 hover:border-accent hover:bg-accent/10"
                            >
                                <Icon className="h-5 w-5" />
                            </motion.a>
                        )
                    })}
                </div>
            </div>
        </FadeUp>
    )
}