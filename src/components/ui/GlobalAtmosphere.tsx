const particles = [
  // ESQUINA SUPERIOR IZQUIERDA (DENSO)
  { top: '8%', left: '5%', color: '#ffffff', size: 4, opacity: 0.9 },
  { top: '12%', left: '12%', color: '#d4a24c', size: 3, opacity: 0.85 },
  { top: '18%', left: '18%', color: '#ffffff', size: 2, opacity: 0.8 },
  { top: '22%', left: '8%', color: '#ffffff', size: 2, opacity: 0.7 },

  // ESQUINA SUPERIOR DERECHA
  { top: '10%', left: '85%', color: '#ffffff', size: 4, opacity: 0.9 },
  { top: '15%', left: '92%', color: '#d4a24c', size: 3, opacity: 0.85 },
  { top: '22%', left: '88%', color: '#ffffff', size: 2, opacity: 0.8 },
  { top: '28%', left: '96%', color: '#ffffff', size: 2, opacity: 0.7 },

  // ESQUINA INFERIOR IZQUIERDA
  { top: '78%', left: '6%', color: '#ffffff', size: 4, opacity: 0.9 },
  { top: '85%', left: '12%', color: '#d4a24c', size: 3, opacity: 0.85 },
  { top: '90%', left: '18%', color: '#ffffff', size: 2, opacity: 0.8 },
  { top: '82%', left: '22%', color: '#ffffff', size: 2, opacity: 0.7 },

  // ESQUINA INFERIOR DERECHA
  { top: '78%', left: '88%', color: '#ffffff', size: 4, opacity: 0.9 },
  { top: '85%', left: '92%', color: '#d4a24c', size: 3, opacity: 0.85 },
  { top: '90%', left: '86%', color: '#ffffff', size: 2, opacity: 0.8 },
  { top: '82%', left: '96%', color: '#ffffff', size: 2, opacity: 0.7 },

  // 🌌 TRANSICIÓN LATERAL SUAVE (NO CENTRO)
  { top: '40%', left: '5%', color: '#ffffff', size: 2, opacity: 0.5 },
  { top: '55%', left: '10%', color: '#d4a24c', size: 2, opacity: 0.5 },

  { top: '40%', left: '90%', color: '#ffffff', size: 2, opacity: 0.5 },
  { top: '55%', left: '95%', color: '#d4a24c', size: 2, opacity: 0.5 },
]

export function GlobalAtmosphere() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#141414_0%,#050505_55%,#000000_100%)]" />

      <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] -translate-x-1/2 -translate-y-1/2 bg-[#b17f40]/6 blur-[200px] rounded-full" />

      <svg className="absolute inset-0 w-full h-full opacity-[0.35]" viewBox="0 0 1440 900" fill="none">

        <path
          d="M0 240 C 300 120, 600 340, 900 220 C 1200 140, 1350 260, 1440 180"
          stroke="#d4a24c"
          strokeWidth="1.4"
        />

        <path
          d="M0 320 C 350 200, 650 380, 1000 260 C 1250 180, 1350 320, 1440 260"
          stroke="#ffffff"
          strokeWidth="0.7"
          opacity="0.8"
        />

        <path
          d="M0 480 C 320 380, 720 580, 1100 460 C 1250 420, 1350 500, 1440 460"
          stroke="#b17f40"
          strokeWidth="0.6"
          opacity="0.7"
        />

        <path
          d="M0 680 C 320 560, 720 760, 1100 680 C 1250 640, 1350 720, 1440 690"
          stroke="#ffffff"
          strokeWidth="0.4"
          opacity="0.5"
        />

      </svg>

      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: `
            radial-gradient(#ffffff 1.2px, transparent 1.2px),
            radial-gradient(#d4a24c 1px, transparent 1px)
          `,
          backgroundSize: '70px 70px, 140px 140px',
          backgroundPosition: '0 0, 35px 35px',
        }}
      />

      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              opacity: p.opacity,
              boxShadow:
                p.color === '#d4a24c'
                  ? '0 0 12px rgba(212,162,76,0.6)'
                  : '0 0 10px rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25" />

    </div>
  )
}