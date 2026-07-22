// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import { ArrowLeft, ArrowRight } from 'lucide-react'
// import { FadeUp } from '@/components/animations/fade-up'
// import { AnimatedCard } from '@/components/animations/animated-card'
// import { SectionHeader } from '@/components/animations/section-header'
// import { aboutPillars, aboutStats, aboutTimeline, aboutValues } from '@/data/about'

// export function AboutPageContent() {
//     return (
//         <main className="min-h-screen text-foreground">
//             {/* Hero */}
//             <section className="relative overflow-hidden pt-32 pb-16">
//                 <div className="absolute top-24 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
//                 <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

//                 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <FadeUp>
//                         <Link
//                             href="/"
//                             className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-8 no-underline"
//                         >
//                             <ArrowLeft className="w-4 h-4" />
//                             Volver al inicio
//                         </Link>
//                     </FadeUp>

//                     <SectionHeader
//                         title="Quiénes Somos"
//                         description="Creamos experiencias de viaje premium para personas que buscan descubrir el mundo con seguridad, autenticidad y propósito."
//                     />

//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
//                         {aboutStats.map((stat, idx) => (
//                             <AnimatedCard
//                                 key={stat.label}
//                                 delay={0.12 + idx * 0.06}
//                                 className="rounded-2xl border border-border/60 bg-card/40 p-5 text-center glass-effect"
//                             >
//                                 <p className="text-3xl font-bold text-accent">
//                                     {stat.value}
//                                 </p>

//                                 <p className="mt-2 text-sm text-muted-foreground">
//                                     {stat.label}
//                                 </p>
//                             </AnimatedCard>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* About description */}
//             <section className="relative py-16 bg-secondary/30 overflow-hidden">
//                 <div className="absolute top-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48" />
//                 <div className="absolute bottom-20 right-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -mr-48" />

//                 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//                         <FadeUp delay={0.1}>
//                             <div className="space-y-6">
//                                 <div className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
//                                     Nuestra esencia
//                                 </div>

//                                 <h2 className="text-3xl md:text-4xl font-bold text-foreground">
//                                     Viajes diseñados para convertirse en recuerdos.
//                                 </h2>

//                                 <div className="space-y-5 text-muted-foreground leading-relaxed">
//                                     <p>
//                                         DreamsPlanetXP es más que una agencia de viajes.
//                                         Somos creadores de experiencias pensadas para conectar
//                                         con culturas, personas y destinos de una forma más auténtica.
//                                     </p>

//                                     <p>
//                                         Cada misión nace desde una planificación cuidadosa:
//                                         seleccionamos destinos, momentos, rutas y actividades que
//                                         permitan vivir el viaje con tranquilidad, emoción y seguridad.
//                                     </p>

//                                     <p>
//                                         Nuestro propósito es que cada viajero regrese con algo más
//                                         que fotografías: historias, aprendizajes y recuerdos que
//                                         permanezcan en el tiempo.
//                                     </p>
//                                 </div>
//                             </div>
//                         </FadeUp>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                             {aboutPillars.map((pillar, idx) => {
//                                 const Icon = pillar.icon

//                                 return (
//                                     <AnimatedCard
//                                         key={pillar.title}
//                                         delay={0.16 + idx * 0.06}
//                                         className="rounded-2xl border border-border/60 bg-card/40 p-6 glass-effect hover:border-accent/60 hover:bg-card/70 transition-all"
//                                     >
//                                         <div className="w-12 h-12 rounded-2xl border border-accent/30 bg-accent/10 flex items-center justify-center mb-5">
//                                             <Icon className="w-5 h-5 text-accent" />
//                                         </div>

//                                         <h3 className="font-bold text-foreground mb-2">
//                                             {pillar.title}
//                                         </h3>

//                                         <p className="text-sm text-muted-foreground leading-relaxed">
//                                             {pillar.description}
//                                         </p>
//                                     </AnimatedCard>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Timeline tipo camino */}
//             <section className="relative py-20 overflow-hidden">
//                 <div className="absolute top-20 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48" />
//                 <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

//                 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <SectionHeader
//                         title="Nuestra Cronología"
//                         description="Un camino de experiencias, aprendizajes y momentos que han construido la esencia de DreamsPlanetXP."
//                     />

//                     <div className="relative mt-20">
//                         {/* Línea central desktop */}
//                         <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-accent/50 to-transparent" />

//                         {/* Línea móvil */}
//                         <div className="lg:hidden absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent" />

//                         <div className="space-y-16 lg:space-y-24">
//                             {aboutTimeline.map((item, idx) => {
//                                 const isLeft = idx % 2 === 0

//                                 return (
//                                     <AnimatedCard
//                                         key={item.id}
//                                         delay={0.12 + idx * 0.08}
//                                         className="relative"
//                                     >
//                                         {/* Punto central desktop */}
//                                         <div className="hidden lg:flex absolute left-1/2 top-10 z-20 -translate-x-1/2">
//                                             <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/50 shadow-xl">
//                                                 <div className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
//                                                 <div className="relative h-5 w-5 rounded-full bg-accent" />
//                                             </div>
//                                         </div>

//                                         {/* Punto móvil */}
//                                         <div className="lg:hidden absolute left-0 top-8 z-20">
//                                             <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-accent/50 shadow-xl">
//                                                 <div className="absolute inset-0 rounded-full bg-accent/20 blur-md" />
//                                                 <div className="relative h-4 w-4 rounded-full bg-accent" />
//                                             </div>
//                                         </div>

//                                         <div
//                                             className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center pl-14 lg:pl-0 ${
//                                                 isLeft ? '' : 'lg:[&>*:first-child]:order-2'
//                                             }`}
//                                         >
//                                             {/* Imagen */}
//                                             <div className={isLeft ? 'lg:pr-12' : 'lg:pl-12'}>
//                                                 <div className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 shadow-xl glass-effect">
//                                                     <div className="relative h-64 sm:h-80">
//                                                         <Image
//                                                             src={item.image}
//                                                             alt={item.title}
//                                                             fill
//                                                             className="object-cover transition-transform duration-700 group-hover:scale-105"
//                                                             sizes="(max-width: 1024px) 100vw, 50vw"
//                                                         />

//                                                         <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

//                                                         <div className="absolute bottom-5 left-5 rounded-full border border-accent/30 px-4 py-2 text-sm font-semibold text-accent backdrop-blur-md">
//                                                             {item.year}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                             {/* Texto */}
//                                             <div className={isLeft ? 'lg:pl-12' : 'lg:pr-12'}>
//                                                 <div className="relative rounded-3xl border border-border/60 bg-card/40 p-7 md:p-8 shadow-lg glass-effect hover:border-accent/60 hover:bg-card/70 transition-all">
//                                                     {/* Conector desktop */}
//                                                     <div
//                                                         className={`hidden lg:block absolute top-14 h-px w-14 bg-gradient-to-r ${
//                                                             isLeft
//                                                                 ? 'left-[-3.5rem] from-accent/70 to-transparent'
//                                                                 : 'right-[-3.5rem] from-transparent to-accent/70'
//                                                         }`}
//                                                     />

//                                                     <div className="mb-5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
//                                                         {item.year}
//                                                     </div>

//                                                     <h3 className="text-2xl md:text-3xl font-bold text-foreground">
//                                                         {item.title}
//                                                     </h3>

//                                                     <p className="mt-4 text-muted-foreground leading-relaxed">
//                                                         {item.description}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </AnimatedCard>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Values */}
//             <section className="relative py-20 bg-secondary/30 overflow-hidden">
//                 <div className="absolute bottom-20 left-0 w-96 h-96 bg-accent/[0.03] rounded-full blur-3xl -ml-48" />

//                 <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <SectionHeader
//                         title="Nuestros Valores"
//                         description="Principios que guían cada experiencia, cada destino y cada detalle del viaje."
//                     />

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                         {aboutValues.map((value, idx) => {
//                             const Icon = value.icon

//                             return (
//                                 <AnimatedCard
//                                     key={value.title}
//                                     delay={0.12 + idx * 0.06}
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

//                     <FadeUp delay={0.22}>
//                         <div className="mt-14 flex justify-center">
//                             <Link
//                                 href="/mission"
//                                 className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-accent text-background font-semibold hover:bg-accent/90 transition-all duration-300 no-underline group"
//                             >
//                                 Ver nuestras misiones
//                                 <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
//                             </Link>
//                         </div>
//                     </FadeUp>
//                 </div>
//             </section>
//         </main>
//     )
// }