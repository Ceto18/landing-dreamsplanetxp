'use client'

import { useEffect, useState } from 'react'

interface CountdownProps {
  departureDate: string
}

interface TimeLeft {
  días: number
  horas: number
  minutos: number
  segundos: number
}

export function Countdown({ departureDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    días: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const calculateTimeLeft = () => {
      const targetDate = new Date(departureDate).getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          días: Math.floor(difference / (1000 * 60 * 60 * 24)),
          horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutos: Math.floor((difference / 1000 / 60) % 60),
          segundos: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [departureDate])

  if (!mounted) {
    return (
      <div className="grid grid-cols-4 gap-2 my-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-gold/5 border border-gold/20 rounded-lg p-3 text-center"
          >
            <div className="text-2xl font-bold text-gold">0</div>
            <div className="text-xs text-muted-text mt-1">--</div>
          </div>
        ))}
      </div>
    )
  }

  const units = [
    { label: 'días', value: timeLeft.días },
    { label: 'horas', value: timeLeft.horas },
    { label: 'minutos', value: timeLeft.minutos },
    { label: 'segundos', value: timeLeft.segundos },
  ]

  return (
    <div className="grid grid-cols-4 gap-2 my-6">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="bg-gold/10 border border-gold/30 rounded-lg p-3 text-center hover:border-gold/50 transition-colors"
        >
          <div className="text-2xl font-bold text-gold">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-text mt-1 uppercase tracking-wider">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  )
}
