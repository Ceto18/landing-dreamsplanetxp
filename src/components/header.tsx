'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { companyService } from '@/services/companyService'

const navigation = [
    { name: 'Misiones', href: '#missions' },
    { name: 'Momentos', href: '#moments' },
    { name: 'Equipo', href: '#team' },
    { name: 'Quiénes somos', href: '#about' },
    { name: 'Reseñas', href: '#review' },
    { name: 'Contacto', href: '#contact' },
]

export function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeLink, setActiveLink] = useState('')
    const [isScrolled, setIsScrolled] = useState(false)
    const [companyImage, setCompanyImage] = useState<string | null>(null)

    const pathname = usePathname()
    const router = useRouter()
    const isHome = pathname === '/'

    useEffect(() => {
        let mounted = true

        const loadImage = async () => {
            try {
                const image = await companyService.getCompanyImage()

                if (mounted) {
                    setCompanyImage(image)
                }
            } catch (error) {
                console.error('Error al cargar el logo:', error)
            }
        }

        void loadImage()

        return () => {
            mounted = false
        }
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : ''

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    useEffect(() => {
        if (!isHome) {
            setActiveLink('')
            return
        }

        const hash = window.location.hash

        if (!hash) {
            setActiveLink('')
            return
        }

        setActiveLink(hash)

        const timeout = window.setTimeout(() => {
            document.querySelector(hash)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }, 100)

        return () => window.clearTimeout(timeout)
    }, [isHome])

    const isActive = (href: string) => {
        if (href.startsWith('#')) {
            return isHome && activeLink === href
        }

        return pathname === href || pathname.startsWith(`${href}/`)
    }

    const handleNavClick = (href: string) => {
        setIsOpen(false)

        if (!href.startsWith('#')) {
            setActiveLink('')
            router.push(href)
            return
        }

        setActiveLink(href)

        if (!isHome) {
            router.push(`/${href}`)
            return
        }

        const element = document.querySelector(href)

        if (!element) return

        window.history.replaceState(null, '', `/${href}`)

        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 shadow-sm transition-all duration-300 ${isHome && !isScrolled
                    ? 'bg-[#0b0b0b] lg:bg-transparent'
                    : 'bg-[#0b0b0b]'
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-24 items-center justify-between">
                    <Link
                        href="/"
                        onClick={() => {
                            setActiveLink('')
                            setIsOpen(false)
                        }}
                        className="group flex items-center gap-4"
                    >
                        <div className="relative h-14 w-14 overflow-hidden">
                            {companyImage && (
                                <Image
                                    src={companyImage}
                                    alt="DreamsPlanetXP"
                                    fill
                                    sizes="56px"
                                    className="object-contain p-1"
                                    priority
                                />
                            )}
                        </div>

                        <div className="hidden sm:block">
                            <h1 className="text-lg font-bold text-foreground">
                                Dreams
                                <span className="text-accent">PlanetXP</span>
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Experiencias Premium
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-10 lg:flex">
                        {navigation.map((item) => {
                            const active = isActive(item.href)

                            return (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={() => handleNavClick(item.href)}
                                    className={`group relative text-base font-semibold transition-colors ${active
                                            ? 'text-accent'
                                            : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {item.name}

                                    <span
                                        className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all ${active
                                                ? 'w-full'
                                                : 'w-0 group-hover:w-full'
                                            }`}
                                    />
                                </button>
                            )
                        })}
                    </nav>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => handleNavClick('#contact')}
                            className="hidden rounded-lg bg-accent px-6 py-2.5 text-base font-semibold text-background transition hover:opacity-90 sm:inline-flex"
                        >
                            Reservar ahora
                        </button>

                        <button
                            type="button"
                            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                            onClick={() => setIsOpen((value) => !value)}
                            className="p-2 text-foreground lg:hidden"
                        >
                            {isOpen ? (
                                <X className="h-7 w-7" />
                            ) : (
                                <Menu className="h-7 w-7" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <button
                    type="button"
                    aria-label="Cerrar menú"
                    className="fixed inset-0 z-40 bg-black/80"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed right-0 top-0 z-50 h-full w-[80%] max-w-sm border-l border-white/10 bg-[#0b0b0b] shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
                    <span className="font-bold text-white">Menú</span>

                    <button
                        type="button"
                        aria-label="Cerrar menú"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-6 w-6 text-white" />
                    </button>
                </div>

                <nav className="space-y-2 px-6 py-6">
                    {navigation.map((item) => {
                        const active = isActive(item.href)

                        return (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => handleNavClick(item.href)}
                                className={`block w-full py-3 text-left transition ${active
                                        ? 'text-accent'
                                        : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                {item.name}
                            </button>
                        )
                    })}

                    <button
                        type="button"
                        onClick={() => handleNavClick('#contact')}
                        className="mt-6 w-full rounded-lg bg-accent px-4 py-3 font-semibold text-black"
                    >
                        Reservar ahora
                    </button>
                </nav>
            </div>
        </header>
    )
}