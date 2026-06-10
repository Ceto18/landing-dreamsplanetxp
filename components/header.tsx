'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navigation = [
    { name: 'Misiones', href: '#misiones' },
    { name: 'Momentos', href: '#momentos' },
    { name: 'Equipo', href: '#equipo' },
    { name: 'Reseñas', href: '#resenas' },
    { name: 'Quiénes Somos', href: '#quienes-somos' },
    { name: 'Contacto', href: '#contacto' },
]

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('')
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        handleScroll()

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleNavClick = (href: string) => {
        setActiveLink(href)
        setIsOpen(false)
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'bg-background/85 backdrop-blur-md border-b border-border/40 shadow-sm'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="relative w-14 h-14 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center overflow-hidden group-hover:bg-accent/30 transition-all duration-300">
                            <Image
                                src="/logodreams.png"
                                alt="DreamsPlanetXP"
                                fill
                                className="object-contain p-1"
                                priority
                            />
                        </div>

                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold tracking-tight text-foreground">
                                Dreams
                                <span className="text-accent">PlanetXP</span>
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Experiencias Premium
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-10">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => handleNavClick(item.href)}
                                className={`relative text-base font-semibold transition-colors duration-300 ${
                                    activeLink === item.href
                                        ? 'text-accent'
                                        : 'text-muted-foreground hover:text-foreground'
                                } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 ${
                                    activeLink === item.href
                                        ? 'after:w-full'
                                        : 'hover:after:w-full'
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button + Mobile Menu */}
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
                            className="lg:hidden p-2 text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                            aria-label="Abrir menú"
                        >
                            {isOpen ? (
                                <X className="w-7 h-7" />
                            ) : (
                                <Menu className="w-7 h-7" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <nav className="lg:hidden bg-background/95 backdrop-blur-md border border-border/40 rounded-b-xl overflow-hidden shadow-lg">
                        <div className="px-4 py-5 space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => handleNavClick(item.href)}
                                    className={`block px-4 py-3.5 rounded-lg text-base font-medium transition-all duration-300 border-l-2 ${
                                        activeLink === item.href
                                            ? 'bg-accent/15 text-accent border-accent'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <Link
                                href="#contacto"
                                onClick={() => handleNavClick('#contacto')}
                                className="block w-full px-4 py-3.5 text-base font-semibold text-center bg-accent text-background rounded-lg hover:opacity-90 transition-all mt-4"
                            >
                                Reservar ahora
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    )
}