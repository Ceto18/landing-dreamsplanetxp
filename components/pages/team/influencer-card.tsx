'use client'

import Link from 'next/link'
import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'

export interface InfluencerCardProps {
  influencer: {
    slug: string
    name: string
    image: string
    role: string
    shortBio?: string
    missions?: { title: string; image: string }[]
  }
}

export function InfluencerCard({ influencer }: InfluencerCardProps) {
  return (
    <FadeUp>
      <Link href={`/team/influencer/${influencer.slug}`} className="no-underline">
        <AnimatedCard className="group space-y-4 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl transition-all duration-500">
          <div className="relative h-48 overflow-hidden rounded-xl border border-border/50">
            <img
              src={influencer.image}
              alt={influencer.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-3 left-3 rounded-full border border-accent/30 bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
              {influencer.role}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-foreground">{influencer.name}</h3>
            {influencer.shortBio && <p className="text-sm text-accent">{influencer.shortBio}</p>}
          </div>
        </AnimatedCard>
      </Link>
    </FadeUp>
  )
}