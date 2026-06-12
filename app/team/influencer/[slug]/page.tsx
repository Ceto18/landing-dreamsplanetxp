import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { teamData } from '@/data/team'
import { notFound } from 'next/navigation'
import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'
import { User, Globe, Briefcase, Book, Star } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: { slug: string } | Promise<{ slug: string }>
}

export default async function InfluencerDetail({ params }: Props) {
  const { slug } = params instanceof Promise ? await params : params
  const member = teamData.find(m => m.slug === slug && m.role === 'Influencer')
  if (!member) return notFound()

  const infoItems = [
    { label: 'Rol', value: member.role, icon: User },
    { label: 'Especialidad', value: member.specialty || 'No especificada', icon: Globe },
    { label: 'Experiencia', value: member.experience || 'No especificada', icon: Briefcase },
    { label: 'Idiomas', value: member.languages?.join(', ') || 'No especificados', icon: Book },
  ]

  return (
    <>
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="relative flex flex-col lg:flex-row items-center gap-8 max-w-7xl mx-auto px-4 py-16 mt-24">
        <FadeUp>
          <img
            src={member.image}
            alt={member.name}
            className="w-64 h-64 rounded-xl shadow-lg object-cover"
          />
        </FadeUp>
        <FadeUp delay={0.08}>
          <div>
            <h1 className="text-4xl font-bold mb-2">{member.name}</h1>
            <p className="text-lg text-muted-foreground">{member.role}</p>
            {member.specialty && <p className="text-sm text-muted-foreground mt-1">{member.specialty}</p>}
          </div>
        </FadeUp>
      </section>

      {/* Info Cards */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <AnimatedCard
                key={item.label}
                delay={idx * 0.08}
                className="rounded-2xl border border-border/60 bg-card/50 p-6 glass-effect hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                    {item.label}
                  </p>
                </div>
                <p className="text-base font-bold text-foreground">{item.value}</p>
              </AnimatedCard>
            )
          })}
        </div>
      </section>

      {/* Biografía */}
      <section className="py-14 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <h2 className="text-3xl font-bold mb-4 text-center">Biografía</h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-center">
            {member.bio || 'No hay biografía disponible para este influencer.'}
          </p>
        </FadeUp>
      </section>

      {/* Misiones */}
      {member.missions && member.missions.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-3xl font-bold mb-10 text-center">Misiones realizadas</h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {member.missions.map((mission, idx) => (
              <AnimatedCard
                key={idx}
                delay={idx * 0.08}
                className="rounded-2xl overflow-hidden border border-border/50 bg-card/50 p-0 glass-effect hover:shadow-lg transition-all"
              >
                <img
                  src={mission.image}
                  alt={mission.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{mission.title}</h3>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>
      )}

      {/* Galería de fotos */}
      {member.photos && member.photos.length > 0 && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-3xl font-bold mb-10 text-center">Galería de fotos</h2>
          </FadeUp>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {member.photos.map((photo, idx) => (
              <AnimatedCard
                key={idx}
                delay={idx * 0.08}
                className="rounded-2xl overflow-hidden border border-border/50 bg-card/50 p-0 glass-effect hover:shadow-lg transition-all"
              >
                <img
                  src={photo}
                  alt={`Foto ${idx + 1}`}
                  className="w-full h-48 object-cover"
                />
              </AnimatedCard>
            ))}
          </div>
        </section>
      )}

      {/* CTA de reserva */}
      <section className="py-20 bg-secondary/30 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="rounded-3xl border border-border/60 bg-card/50 glass-effect p-8 sm:p-12 shadow-2xl hover:shadow-xl transition-all">
              <div className="flex justify-center mb-5">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">¡Reserva tu experiencia!</h2>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed mb-8">
                Participa en las misiones y descubre cómo colaborar con {member.name}.
              </p>
              <Link
                href="/reservation"
                className="btn-gold inline-flex items-center justify-center gap-2 no-underline"
              >
                Reservar ahora
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  )
}