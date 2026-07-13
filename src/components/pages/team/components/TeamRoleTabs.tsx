'use client'

import { FadeUp } from '@/components/animations/fade-up'

import type { RoleTab } from '../Team'

type Props = {
    roles: readonly RoleTab[]
    activeRole: RoleTab
    onRoleChange: (role: RoleTab) => void
}

export function TeamRoleTabs({
    roles,
    activeRole,
    onRoleChange,
}: Props) {
    return (
        <FadeUp delay={0.22} className="mb-14 flex justify-center">
            <div className="flex flex-wrap justify-center gap-3">
                {roles.map((role) => {
                    const isActive = activeRole === role

                    return (
                        <button
                            key={role}
                            type="button"
                            onClick={() => onRoleChange(role)}
                            aria-pressed={isActive}
                            className={`rounded-full border px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                                isActive
                                    ? 'border-accent/60 bg-accent/15 text-accent'
                                    : 'border-border/60 bg-card/40 text-muted-foreground hover:border-accent/50 hover:bg-accent/10 hover:text-foreground'
                            }`}
                        >
                            {role}
                        </button>
                    )
                })}
            </div>
        </FadeUp>
    )
}
