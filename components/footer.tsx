import { Heart, Share2, MessageSquare, Globe } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-background-secondary/60 border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">
                            <span className="text-accent">Dreams</span>
                            <span className="text-foreground">Planetap</span>
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            Transformando viajes en experiencias memorables.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Enlaces Rápidos</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#misiones" className="text-muted-foreground hover:text-accent transition-colors">
                                    Misiones
                                </a>
                            </li>
                            <li>
                                <a href="#momentos" className="text-muted-foreground hover:text-accent transition-colors">
                                    Momentos
                                </a>
                            </li>
                            <li>
                                <a href="#equipo" className="text-muted-foreground hover:text-accent transition-colors">
                                    Equipo
                                </a>
                            </li>
                            <li>
                                <a href="#contacto" className="text-muted-foreground hover:text-accent transition-colors">
                                    Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Empresa</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="text-foreground/60 hover:text-accent transition-colors">
                                    Sobre Nosotros
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/60 hover:text-accent transition-colors">
                                    Condiciones
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/60 hover:text-accent transition-colors">
                                    Privacidad
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-foreground/60 hover:text-accent transition-colors">
                                    Sostenibilidad
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Síguenos</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                                <Heart className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                                <MessageSquare className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                                <Globe className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-accent/20 my-8" />

                {/* Bottom */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground/60">
                    <p>&copy; 2024 Dreams Planetap. Todos los derechos reservados.</p>
                    <p>Diseñado con 💛 para viajeros apasionados</p>
                </div>
            </div>
        </footer>
    )
}
