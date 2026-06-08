export function About() {
  const values = [
    {
      title: 'Autenticidad',
      description: 'Experiencias genuinas diseñadas para conectar con la cultura local',
    },
    {
      title: 'Excelencia',
      description: 'Atención al detalle en cada aspecto de tu viaje',
    },
    {
      title: 'Seguridad',
      description: 'Tu bienestar es nuestra prioridad número uno',
    },
    {
      title: 'Sostenibilidad',
      description: 'Viajamos responsablemente con respeto al planeta',
    },
  ]

  return (
    <section id="quienes-somos" className="py-28 bg-background-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold leading-tight tracking-tight text-foreground">Quiénes Somos</h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Dreams Planetap es más que una agencia de viajes. Somos artesanos de experiencias,
                creadores de recuerdos que perduran para toda la vida.
              </p>
              <p className="text-lg">
                Nacimos con la visión de transformar la forma en que las personas viajan, enfocándonos
                en la calidad, la autenticidad y la conexión humana.
              </p>
              <p className="text-lg">
                Cada misión es cuidadosamente diseñada por nuestro equipo de expertos, considerando
                cada detalle para garantizar una experiencia inolvidable.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 rounded-xl border border-border bg-card/60 glass-effect space-y-3 shadow-lg">
              <p className="text-4xl font-bold text-accent">500+</p>
              <p className="text-sm font-medium text-muted-foreground">Viajeros Felices</p>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card/60 glass-effect space-y-3 shadow-lg">
              <p className="text-4xl font-bold text-accent">6</p>
              <p className="text-sm font-medium text-muted-foreground">Destinos Premium</p>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card/60 glass-effect space-y-3 shadow-lg">
              <p className="text-4xl font-bold text-accent">4.9</p>
              <p className="text-sm font-medium text-muted-foreground">Calificación Promedio</p>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card/60 glass-effect space-y-3 shadow-lg">
              <p className="text-4xl font-bold text-accent">5</p>
              <p className="text-sm font-medium text-muted-foreground">Años de Experiencia</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="space-y-12">
          <h3 className="text-4xl font-bold text-center text-foreground">Nuestros Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl border border-border hover:border-accent/60 bg-card/50 hover:bg-card/70 glass-effect transition-all duration-500 space-y-4 shadow-lg hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
