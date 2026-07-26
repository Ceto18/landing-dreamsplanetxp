'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

const navigation = [
    { name: 'Misiones', href: '#misiones' },
    { name: 'Momentos', href: '#momentos' },
    { name: 'Equipo', href: '#equipo' },
    { name: 'Quiénes Somos', href: '#quienes-somos' },
    { name: 'Contacto', href: '#contacto' },
]

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('')
    const [isScrolled, setIsScrolled] = useState(false)

    const router = useRouter()
    const pathname = usePathname()

    const isHome = pathname === '/'

    // scroll detection (solo para desktop hero behavior)
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // lock scroll when drawer open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    const handleNavClick = (href: string) => {
        setActiveLink(href)
        setIsOpen(false)

        if (href.startsWith('#')) {
            if (pathname !== '/') {
                router.push('/' + href)
            } else {
                const el = document.querySelector(href)
                if (el) el.scrollIntoView({ behavior: 'smooth' })
            }
        } else {
            router.push(href)
        }
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10 shadow-sm
            ${
                isHome && !isScrolled
                    ? 'lg:bg-transparent bg-[#0b0b0b]'
                    : 'bg-[#0b0b0b]'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative w-14 h-14 overflow-hidden">
                            <Image
                                src="/logodreams.png"
                                alt="DreamsPlanetXP"
                                fill
                                className="object-contain p-1"
                                priority
                            />
                        </div>

                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold text-foreground">
                                Dreams<span className="text-accent">Planetxp</span>
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Experiencias Premium
                            </p>
                        </div>
                    </Link>

                    {/* NAV DESKTOP */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navigation.map((item) => {
                            const isActive = activeLink === item.href

                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavClick(item.href)}
                                    className={`relative text-base font-semibold transition-colors duration-300 ${
                                        isActive
                                            ? 'text-accent'
                                            : 'text-muted-foreground hover:text-foreground'
                                    } group`}
                                >
                                    {item.name}

                                    <span
                                        className={`absolute left-0 -bottom-1 h-[2px] bg-accent transition-all duration-300 ${
                                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                        }`}
                                    />
                                </button>
                            )
                        })}
                    </nav>

                    {/* CTA + MOBILE */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="#contacto"
                            onClick={() => handleNavClick('#contacto')}
                            className="hidden sm:inline-flex px-6 py-2.5 text-base font-semibold bg-accent text-background rounded-lg hover:opacity-90 transition-all duration-300"
                        >
                            Reservar ahora
                        </Link>

                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 text-foreground"
                        >
                            {isOpen ? (
                                <X className="w-7 h-7" />
                            ) : (
                                <Menu className="w-7 h-7" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/80"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-[80%] max-w-sm z-50
                bg-[#0b0b0b] border-l border-white/10 shadow-2xl
                transform transition-transform duration-300 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between px-6 h-24 border-b border-white/10">
                    <span className="font-bold text-white">Menú</span>

                    <button onClick={() => setIsOpen(false)}>
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>

                <nav className="px-6 py-6 space-y-2">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleNavClick(item.href)}
                            className="block w-full text-left py-3 text-gray-300 hover:text-white transition"
                        >
                            {item.name}
                        </button>
                    ))}

                    <button
                        onClick={() => handleNavClick('#contacto')}
                        className="w-full mt-6 px-4 py-3 bg-accent text-black rounded-lg"
                    >
                        Reservar ahora
                    </button>
                </nav>
            </div>
        </header>
    )
}