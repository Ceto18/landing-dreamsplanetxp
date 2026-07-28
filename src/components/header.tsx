'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { companyService } from '@/services/companyService'

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
    const [companyImage, setCompanyImage] = useState<string | null>(null)

    const router = useRouter()
    const pathname = usePathname()

    const isHome = pathname === '/'

    useEffect(() => {
        const loadCompanyImage = async () => {
            try {
                const image = await companyService.getCompanyImage()
                setCompanyImage(image)
            } catch (error) {
                console.error(
                    'Error al cargar la imagen de la empresa:',
                    error,
                )
            }
        }

        loadCompanyImage()
    }, [])

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
            const element = document.querySelector(hash)

            element?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }, 100)

        return () => {
            window.clearTimeout(timeout)
        }
    }, [isHome])

    const handleNavClick = (href: string) => {
        setIsOpen(false)

        if (!href.startsWith('#')) {
            setActiveLink('')
            router.push(href)
            return
        }

        setActiveLink(href)

        /*
         * Si estamos en otra página, navegamos al inicio
         * incluyendo solamente un hash.
         *
         * Resultado: /#contacto
         */
        if (pathname !== '/') {
            router.push(`/${href}`)
            return
        }

        /*
         * Si ya estamos en el inicio, actualizamos la URL
         * y desplazamos hacia la sección.
         */
        const element = document.querySelector(href)

        if (!element) return

        window.history.replaceState(
            null,
            '',
            `${window.location.pathname}${href}`,
        )

        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <header
            className={`fixed top-0 right-0 left-0 z-50 border-b border-white/10 shadow-sm transition-all duration-300 ${isHome && !isScrolled
                    ? 'bg-[#0b0b0b] lg:bg-transparent'
                    : 'bg-[#0b0b0b]'
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-24 items-center justify-between">
                    {/* LOGO */}
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
                                <span className="text-accent">
                                    Planetxp
                                </span>
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Experiencias Premium
                            </p>
                        </div>
                    </Link>

                    {/* NAVEGACIÓN DE ESCRITORIO */}
                    <nav className="hidden items-center gap-10 lg:flex">
                        {navigation.map((item) => {
                            const isActive =
                                activeLink === item.href

                            return (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={() =>
                                        handleNavClick(item.href)
                                    }
                                    className={`group relative text-base font-semibold transition-colors duration-300 ${isActive
                                            ? 'text-accent'
                                            : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {item.name}

                                    <span
                                        className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300 ${isActive
                                                ? 'w-full'
                                                : 'w-0 group-hover:w-full'
                                            }`}
                                    />
                                </button>
                            )
                        })}
                    </nav>

                    {/* CTA Y BOTÓN MÓVIL */}
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() =>
                                handleNavClick('#contacto')
                            }
                            className="hidden rounded-lg bg-accent px-6 py-2.5 text-base font-semibold text-background transition-all duration-300 hover:opacity-90 sm:inline-flex"
                        >
                            Reservar ahora
                        </button>

                        <button
                            type="button"
                            aria-label={
                                isOpen
                                    ? 'Cerrar menú'
                                    : 'Abrir menú'
                            }
                            onClick={() =>
                                setIsOpen((previous) => !previous)
                            }
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

            {/* FONDO DEL MENÚ MÓVIL */}
            {isOpen && (
                <button
                    type="button"
                    aria-label="Cerrar menú"
                    className="fixed inset-0 z-40 bg-black/80"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* MENÚ MÓVIL */}
            <div
                className={`fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm transform border-l border-white/10 bg-[#0b0b0b] shadow-2xl transition-transform duration-300 ${isOpen
                        ? 'translate-x-0'
                        : 'translate-x-full'
                    }`}
            >
                <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
                    <span className="font-bold text-white">
                        Menú
                    </span>

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
                        const isActive =
                            activeLink === item.href

                        return (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() =>
                                    handleNavClick(item.href)
                                }
                                className={`block w-full py-3 text-left transition ${isActive
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
                        onClick={() =>
                            handleNavClick('#contacto')
                        }
                        className="mt-6 w-full rounded-lg bg-accent px-4 py-3 font-semibold text-black"
                    >
                        Reservar ahora
                    </button>
                </nav>
            </div>
        </header>
    )
}