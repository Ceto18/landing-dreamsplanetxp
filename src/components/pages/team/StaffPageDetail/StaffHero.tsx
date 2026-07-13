import { FadeUp } from '@/components/animations/fade-up'

import type { TeamPersonDetail } from '@/services/teamService'

type Props = {
    member: TeamPersonDetail
    roleLabel: string
}

export function StaffHero({
    member,
    roleLabel,
}: Props) {
    return (
        <section className="relative pb-20 pt-36">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

            <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-accent/[0.03] blur-3xl" />

            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:px-8">
                <FadeUp>
                    <div className="relative">
                        <div className="absolute inset-0 rounded-3xl bg-accent/20 blur-3xl" />

                        <div className="relative h-72 w-72 overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-2xl sm:h-80 sm:w-80">
                            {member.photo_url ? (
                                <img
                                    src={member.photo_url}
                                    alt={member.fullname}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                                    Sin fotografía disponible
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
                        </div>
                    </div>
                </FadeUp>

                <FadeUp delay={0.08}>
                    <div className="max-w-2xl text-center lg:text-left">
                        <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                            {roleLabel}
                        </span>

                        <h1 className="mt-5 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
                            {member.fullname}
                        </h1>

                        {member.specialty && (
                            <p className="mt-4 text-xl font-semibold text-accent">
                                {member.specialty}
                            </p>
                        )}

                        {member.bio && (
                            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                                {member.bio}
                            </p>
                        )}
                    </div>
                </FadeUp>
            </div>
        </section>
    )
}