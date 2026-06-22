'use client'

import { useEffect, useState } from 'react'

interface CountdownProps {
    departureDate: string
}

interface TimeLeft {
    días: number
    horas: number
    minutos: number
}

const initialTimeLeft: TimeLeft = {
    días: 0,
    horas: 0,
    minutos: 0,
}

function calculateTimeLeft(departureDate: string): TimeLeft {
    const targetDate = new Date(`${departureDate}T00:00:00`).getTime()
    const now = new Date().getTime()
    const difference = targetDate - now

    if (difference <= 0) {
        return initialTimeLeft
    }

    return {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / (1000 * 60)) % 60),
    }
}

export function Countdown({ departureDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        setTimeLeft(calculateTimeLeft(departureDate))

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(departureDate))
        }, 60000)

        return () => clearInterval(timer)
    }, [departureDate])

    if (!mounted) {
        return (
            <div className="grid grid-cols-3 gap-2 my-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-accent/5 border border-accent/20 rounded-lg p-3 text-center"
                    >
                        <div className="text-2xl font-bold text-accent">00</div>
                        <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                            --
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const units = [
        { label: 'días', value: timeLeft.días },
        { label: 'horas', value: timeLeft.horas },
        { label: 'minutos', value: timeLeft.minutos },
    ]

    return (
        <div className="grid grid-cols-3 gap-2 my-6">
            {units.map((unit) => (
                <div
                    key={unit.label}
                    className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-center hover:border-accent/50 transition-colors"
                >
                    <div className="text-2xl font-bold text-accent tabular-nums">
                        {String(unit.value).padStart(2, '0')}
                    </div>

                    <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                        {unit.label}
                    </div>
                </div>
            ))}
        </div>
    )
}