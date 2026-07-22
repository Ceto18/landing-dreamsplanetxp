// import Link from 'next/link'
// import { ArrowRight } from 'lucide-react'
// import { FadeUp } from '@/components/animations/fade-up'
// import { AnimatedCard } from '@/components/animations/animated-card'
// import { SectionHeader } from '@/components/animations/section-header'
// import { aboutStats, aboutValues } from '@/data/about'

// export function About() {
//     return (
//         <section
//             id="quienes-somos"
//             className="relative py-24 overflow-hidden"
//         >
//             {/* Background decoration */}
//             <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
//             <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

//             <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Section Header */}
//                 <SectionHeader
//                     title="Quiénes Somos"
//                     description="Somos creadores de experiencias de viaje premium, diseñadas para conectar con culturas, destinos y momentos que se quedan contigo."
//                 />

//                 {/* Main Content */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
//                     <div className="space-y-8">
//                         <div className="space-y-6 text-muted-foreground leading-relaxed">
//                             <FadeUp delay={0.1}>
//                                 <p className="text-lg">
//                                     DreamsPlanetXP es más que una agencia de viajes. Somos artesanos de experiencias,
//                                     creadores de recuerdos que perduran para toda la vida.
//                                 </p>
//                             </FadeUp>

//                             <FadeUp delay={0.18}>
//                                 <p className="text-lg">
//                                     Nacimos con la visión de transformar la forma en que las personas viajan,
//                                     enfocándonos en la calidad, la autenticidad y la conexión humana.
//                                 </p>
//                             </FadeUp>

//                             <FadeUp delay={0.26}>
//                                 <p className="text-lg">
//                                     Cada misión es cuidadosamente diseñada por nuestro equipo de expertos,
//                                     considerando cada detalle para garantizar una experiencia inolvidable.
//                                 </p>
//                             </FadeUp>
//                         </div>

//                         <FadeUp delay={0.34}>
//                             <Link
//                                 href="/about"
//                                 className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent/90 transition-all duration-300 no-underline group"
//                             >
//                                 Conocer más
//                                 <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//                             </Link>
//                         </FadeUp>
//                     </div>

//                     {/* Stats */}
//                     <div className="grid grid-cols-2 gap-6">
//                         {aboutStats.map((stat, idx) => (
//                             <AnimatedCard
//                                 key={stat.label}
//                                 delay={idx * 0.08}
//                                 className="relative overflow-hidden p-8 rounded-2xl border border-border/60 bg-card/50 glass-effect space-y-3 shadow-lg hover:border-accent/60 hover:bg-card/70 hover:shadow-xl transition-all duration-500 group"
//                             >
//                                 <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                                 <p className="relative z-10 text-4xl font-bold text-accent">
//                                     {stat.value}
//                                 </p>

//                                 <p className="relative z-10 text-sm font-medium text-muted-foreground">
//                                     {stat.label}
//                                 </p>
//                             </AnimatedCard>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Divider */}
//                 <FadeUp delay={0.1}>
//                     <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent my-16" />
//                 </FadeUp>

//                 {/* Values */}
//                 <div className="space-y-12">
//                     {/* Values Header */}
//                     <div className="mb-12 space-y-6 text-center">
//                         <FadeUp>
//                             <h3 className="text-5xl sm:text-6xl font-bold text-foreground">
//                                 Nuestros Valores
//                             </h3>
//                         </FadeUp>

//                         <FadeUp delay={0.1}>
//                             <div className="flex justify-center">
//                                 <div className="w-20 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />
//                             </div>
//                         </FadeUp>

//                         <FadeUp delay={0.2}>
//                             <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//                                 Principios que guían cada experiencia, cada destino y cada detalle del viaje.
//                             </p>
//                         </FadeUp>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {aboutValues.map((value, idx) => {
//                             const Icon = value.icon

//                             return (
//                                 <AnimatedCard
//                                     key={value.title}
//                                     delay={idx * 0.08}
//                                     className="relative overflow-hidden p-7 rounded-2xl border border-border/60 bg-card/40 hover:border-accent/60 hover:bg-card/70 glass-effect transition-all duration-500 space-y-5 shadow-lg hover:shadow-xl group"
//                                 >
//                                     <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                                     <div className="relative z-10 w-14 h-14 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-all duration-300">
//                                         <Icon className="w-6 h-6 text-accent group-hover:text-background transition-colors duration-300" />
//                                     </div>

//                                     <div className="relative z-10 space-y-2">
//                                         <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
//                                             {value.title}
//                                         </h4>

//                                         <p className="text-sm text-muted-foreground leading-relaxed">
//                                             {value.description}
//                                         </p>
//                                     </div>
//                                 </AnimatedCard>
//                             )
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }