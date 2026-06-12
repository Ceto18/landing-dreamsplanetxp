// components/ui/MomentComments.tsx
'use client'

import { useState } from 'react'
import { AnimatedCard } from '@/components/animations/animated-card'
import { FadeUp } from '@/components/animations/fade-up'
import { ArrowRight, Video } from 'lucide-react'

// Simulación de comentarios existentes
const dummyReviews = [
  { user: 'Ana García', comment: 'Una experiencia increíble, totalmente recomendable!', video: null },
  { user: 'Carlos Pérez', comment: 'Me encantó la organización y los guías fueron excelentes.', video: null },
  { user: 'Lucía Fernández', comment: 'Hermosos paisajes y actividades muy divertidas.', video: null },
  { user: 'Javier Torres', comment: 'Una aventura que nunca olvidaré, todo perfecto.', video: null },
]

export function MomentComments() {
  const [reviews, setReviews] = useState(dummyReviews)
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !comment) return

    const newReview = {
      user: name,
      comment,
      video: videoFile ? URL.createObjectURL(videoFile) : null,
    }

    setReviews([newReview, ...reviews])
    setName('')
    setComment('')
    setVideoFile(null)
  }

  return (
    <section className="mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <FadeUp>
        <h3 className="text-2xl font-bold text-foreground mb-6">Comentarios</h3>
      </FadeUp>

      {/* Lista de comentarios */}
      <div className="space-y-4 mb-8">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <AnimatedCard
              key={idx}
              delay={idx * 0.08}
              className="rounded-3xl border border-border/60 bg-card/50 p-6 hover:shadow-lg transition-all relative"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-semibold">
                  {review.user.charAt(0)}
                </div>
                <p className="font-semibold text-foreground">{review.user}</p>
              </div>
              <p className="text-muted-foreground text-base mb-2">{review.comment}</p>

              {/* Video en comentario */}
              {review.video && (
                <video
                  src={review.video}
                  controls
                  className="w-full rounded-lg mt-2 max-h-60 object-cover border border-border/50"
                />
              )}
            </AnimatedCard>
          ))
        ) : (
          <p className="text-muted-foreground italic">No hay comentarios aún.</p>
        )}
      </div>

      {/* Formulario para agregar comentario + video */}
      <FadeUp>
        <AnimatedCard className="rounded-3xl border border-border/60 bg-card/50 p-6 shadow-2xl space-y-4">
          <h4 className="text-lg font-bold text-foreground mb-4">Escribe un comentario</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Tu nombre"
              className="w-full px-4 py-3 rounded-lg bg-background/30 border border-border focus:border-accent focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Tu comentario..."
              className="w-full px-4 py-3 rounded-lg bg-background/30 border border-border focus:border-accent focus:outline-none resize-none"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
            />

            {/* Nueva caja de video más visual */}
            <div
              className="w-full border-2 border-dashed border-accent/50 rounded-lg p-6 text-center cursor-pointer hover:bg-accent/10 transition-colors relative"
              onClick={() => document.getElementById('videoInput')?.click()}
            >
              <Video className="w-10 h-10 mx-auto text-accent mb-2" />
              <p className="text-muted-foreground">Haz click aquí o arrastra tu video (opcional, max 30s)</p>
              <input
                type="file"
                id="videoInput"
                accept="video/*"
                onChange={(e) => e.target.files && setVideoFile(e.target.files[0])}
                className="hidden"
              />
            </div>

            {/* Previsualización del video */}
            {videoFile && (
              <video
                src={URL.createObjectURL(videoFile)}
                controls
                className="w-full rounded-lg mt-2 max-h-60 object-cover border border-border/50"
              />
            )}

            <button
              type="submit"
              className="btn-gold inline-flex items-center justify-center gap-2 w-full"
            >
              Publicar comentario
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </AnimatedCard>
      </FadeUp>
    </section>
  )
}