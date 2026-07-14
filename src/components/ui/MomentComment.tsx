// 'use client'

// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react'
// import {
//   ArrowRight,
//   LoaderCircle,
//   Star,
//   Upload,
//   Video,
//   X,
// } from 'lucide-react'

// import { AnimatedCard } from '@/components/animations/animated-card'
// import { FadeUp } from '@/components/animations/fade-up'

// import {
//   missionService,
//   type MomentReview,
// } from '@/services/missionService'

// type Props = {
//   slug: string
// }

// const MAX_RATING = 5

// export function MomentComments({ slug }: Props) {
//   const videoInputRef = useRef<HTMLInputElement>(null)

//   const [reviews, setReviews] = useState<MomentReview[]>([])

//   const [name, setName] = useState('')
//   const [comment, setComment] = useState('')
//   const [rating, setRating] = useState(5)
//   const [videoFile, setVideoFile] = useState<File | null>(null)

//   const [loadingReviews, setLoadingReviews] = useState(true)
//   const [submitting, setSubmitting] = useState(false)

//   const [reviewsError, setReviewsError] = useState<string | null>(
//     null
//   )

//   const [formError, setFormError] = useState<string | null>(null)
//   const [successMessage, setSuccessMessage] = useState<
//     string | null
//   >(null)

//   const videoPreviewUrl = useMemo(() => {
//     if (!videoFile) {
//       return null
//     }

//     return URL.createObjectURL(videoFile)
//   }, [videoFile])

//   useEffect(() => {
//     return () => {
//       if (videoPreviewUrl) {
//         URL.revokeObjectURL(videoPreviewUrl)
//       }
//     }
//   }, [videoPreviewUrl])

//   const loadReviews = useCallback(async () => {
//     if (!slug) {
//       setReviews([])
//       setLoadingReviews(false)
//       return
//     }

//     setLoadingReviews(true)
//     setReviewsError(null)

//     try {
//       const response =
//         await missionService.getMomentReviews(slug, {
//           page: 1,
//           per_page: 10,
//         })

//       setReviews(
//         Array.isArray(response?.data)
//           ? response.data
//           : []
//       )
//     } catch (error) {
//       console.error(
//         `Error obteniendo reseñas del momento ${slug}:`,
//         error
//       )

//       setReviews([])
//       setReviewsError(
//         'No se pudieron cargar los comentarios.'
//       )
//     } finally {
//       setLoadingReviews(false)
//     }
//   }, [slug])

//   useEffect(() => {
//     void loadReviews()
//   }, [loadReviews])

//   const clearVideo = () => {
//     setVideoFile(null)

//     if (videoInputRef.current) {
//       videoInputRef.current.value = ''
//     }
//   }

//   const handleVideoChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const selectedFile = event.target.files?.[0] ?? null

//     setFormError(null)
//     setSuccessMessage(null)

//     if (!selectedFile) {
//       setVideoFile(null)
//       return
//     }

//     if (!selectedFile.type.startsWith('video/')) {
//       setFormError(
//         'El archivo seleccionado debe ser un video.'
//       )

//       event.target.value = ''
//       setVideoFile(null)
//       return
//     }

//     setVideoFile(selectedFile)
//   }

//   const handleSubmit = async (
//     event: React.FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault()

//     const cleanName = name.trim()
//     const cleanComment = comment.trim()

//     setFormError(null)
//     setSuccessMessage(null)

//     if (!cleanName) {
//       setFormError('Ingresa tu nombre.')
//       return
//     }

//     if (!cleanComment) {
//       setFormError('Ingresa tu comentario.')
//       return
//     }

//     if (rating < 1 || rating > MAX_RATING) {
//       setFormError(
//         'Selecciona una calificación entre 1 y 5.'
//       )
//       return
//     }

//     try {
//       setSubmitting(true)

//       const response =
//         await missionService.createMomentReview(slug, {
//           name: cleanName,
//           comment: cleanComment,
//           rating,
//           video: videoFile,
//         })

//       setName('')
//       setComment('')
//       setRating(5)
//       clearVideo()

//       setSuccessMessage(
//         response?.message ||
//         'Tu reseña fue enviada y está pendiente de aprobación.'
//       )

//       /*
//        * No agregamos la reseña manualmente al listado porque
//        * normalmente el backend la registra como "pending".
//        * Solo aparecerá cuando sea aprobada.
//        */
//       await loadReviews()
//     } catch (error) {
//       console.error(
//         `Error publicando reseña del momento ${slug}:`,
//         error
//       )

//       setFormError(
//         'No se pudo enviar tu reseña. Inténtalo nuevamente.'
//       )
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   return (
//     <section className="mx-auto mt-12 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
//       <FadeUp>
//         <div className="mb-8">
//           <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">
//             Experiencias de viajeros
//           </p>

//           <h3 className="mt-3 text-3xl font-bold text-foreground">
//             Comentarios
//           </h3>

//           <p className="mt-2 max-w-2xl text-muted-foreground">
//             Descubre lo que otros viajeros opinan sobre
//             esta experiencia.
//           </p>
//         </div>
//       </FadeUp>

//       <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
//         {/* LISTA DE COMENTARIOS */}
//         <div>
//           {loadingReviews ? (
//             <div className="flex min-h-48 items-center justify-center rounded-3xl border border-border/60 bg-card/30">
//               <LoaderCircle className="h-8 w-8 animate-spin text-accent" />
//             </div>
//           ) : reviewsError ? (
//             <div className="rounded-3xl border border-red-500/30 bg-red-500/5 p-6 text-center text-sm text-red-500">
//               {reviewsError}
//             </div>
//           ) : reviews.length > 0 ? (
//             <div className="space-y-4">
//               {reviews.map((review, index) => (
//                 <AnimatedCard
//                   key={`${review.name}-${review.comment}-${index}`}
//                   delay={index * 0.08}
//                   className="rounded-3xl border border-border/60 bg-card/50 p-6 transition-all hover:border-accent/30 hover:shadow-lg"
//                 >
//                   <div className="mb-4 flex items-start justify-between gap-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 font-bold uppercase text-accent">
//                         {review.name
//                           .charAt(0)
//                           .toUpperCase()}
//                       </div>

//                       <div>
//                         <p className="font-semibold text-foreground">
//                           {review.name}
//                         </p>

//                         <div className="mt-1 flex items-center gap-1">
//                           {Array.from({
//                             length: MAX_RATING,
//                           }).map((_, starIndex) => {
//                             const active =
//                               starIndex <
//                               review.rating

//                             return (
//                               <Star
//                                 key={starIndex}
//                                 className={`h-4 w-4 ${active
//                                     ? 'fill-accent text-accent'
//                                     : 'text-muted-foreground/30'
//                                   }`}
//                               />
//                             )
//                           })}
//                         </div>
//                       </div>
//                     </div>

//                     <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
//                       {review.rating}/5
//                     </span>
//                   </div>

//                   <p className="leading-relaxed text-muted-foreground">
//                     {review.comment}
//                   </p>

//                   {review.video_url && (
//                     <div className="mt-5 overflow-hidden rounded-2xl border border-border/60 bg-black">
//                       <video
//                         src={review.video_url}
//                         controls
//                         preload="metadata"
//                         playsInline
//                         className="max-h-[420px] w-full object-contain"
//                       >
//                         Tu navegador no puede reproducir este
//                         video.
//                       </video>
//                     </div>
//                   )}
//                 </AnimatedCard>
//               ))}
//             </div>
//           ) : (
//             <div className="rounded-3xl border border-dashed border-border/70 bg-card/30 px-6 py-14 text-center">
//               <Star className="mx-auto h-10 w-10 text-accent/60" />

//               <p className="mt-4 font-semibold text-foreground">
//                 Aún no hay comentarios
//               </p>

//               <p className="mt-2 text-sm text-muted-foreground">
//                 Sé la primera persona en compartir su experiencia.
//               </p>
//             </div>
//           )}
//         </div>

//         {/* FORMULARIO */}
//         <FadeUp delay={0.1}>
//           <AnimatedCard className="rounded-3xl border border-border/60 bg-card/50 p-6 shadow-2xl sm:p-8 lg:sticky lg:top-28">
//             <div className="mb-6">
//               <h4 className="text-xl font-bold text-foreground">
//                 Comparte tu experiencia
//               </h4>

//               <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
//                 Tu comentario será revisado antes de
//                 aparecer públicamente.
//               </p>
//             </div>

//             <form
//               onSubmit={handleSubmit}
//               className="space-y-5"
//             >
//               <div className="space-y-2">
//                 <label
//                   htmlFor="reviewName"
//                   className="text-sm font-semibold text-foreground"
//                 >
//                   Nombre
//                 </label>

//                 <input
//                   id="reviewName"
//                   type="text"
//                   placeholder="Escribe tu nombre"
//                   value={name}
//                   onChange={(event) =>
//                     setName(event.target.value)
//                   }
//                   disabled={submitting}
//                   className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <span className="text-sm font-semibold text-foreground">
//                   Calificación
//                 </span>

//                 <div className="flex items-center gap-2">
//                   {Array.from({
//                     length: MAX_RATING,
//                   }).map((_, index) => {
//                     const value = index + 1
//                     const active = value <= rating

//                     return (
//                       <button
//                         key={value}
//                         type="button"
//                         disabled={submitting}
//                         onClick={() =>
//                           setRating(value)
//                         }
//                         aria-label={`Calificar con ${value} estrellas`}
//                         className="rounded-lg p-1 transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60"
//                       >
//                         <Star
//                           className={`h-7 w-7 transition-colors ${active
//                               ? 'fill-accent text-accent'
//                               : 'text-muted-foreground/30 hover:text-accent/60'
//                             }`}
//                         />
//                       </button>
//                     )
//                   })}

//                   <span className="ml-2 text-sm font-semibold text-accent">
//                     {rating}/5
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="reviewComment"
//                   className="text-sm font-semibold text-foreground"
//                 >
//                   Comentario
//                 </label>

//                 <textarea
//                   id="reviewComment"
//                   placeholder="Cuéntanos cómo fue tu experiencia..."
//                   value={comment}
//                   onChange={(event) =>
//                     setComment(
//                       event.target.value
//                     )
//                   }
//                   disabled={submitting}
//                   rows={5}
//                   className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
//                   required
//                 />
//               </div>

//               <div className="space-y-3">
//                 <span className="text-sm font-semibold text-foreground">
//                   Video opcional
//                 </span>

//                 <button
//                   type="button"
//                   disabled={submitting}
//                   onClick={() =>
//                     videoInputRef.current?.click()
//                   }
//                   className="group flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-accent/40 bg-accent/[0.03] px-5 py-7 text-center transition hover:border-accent hover:bg-accent/10 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
//                     <Video className="h-6 w-6 text-accent" />
//                   </div>

//                   <p className="mt-3 text-sm font-semibold text-foreground">
//                     Selecciona un video
//                   </p>

//                   <p className="mt-1 text-xs text-muted-foreground">
//                     Haz clic para buscar un archivo
//                     en tu dispositivo.
//                   </p>
//                 </button>

//                 <input
//                   ref={videoInputRef}
//                   id="videoInput"
//                   type="file"
//                   accept="video/*"
//                   onChange={handleVideoChange}
//                   disabled={submitting}
//                   className="hidden"
//                 />

//                 {videoFile && videoPreviewUrl && (
//                   <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/50">
//                     <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
//                       <div className="flex min-w-0 items-center gap-2">
//                         <Upload className="h-4 w-4 shrink-0 text-accent" />

//                         <span className="truncate text-sm text-muted-foreground">
//                           {videoFile.name}
//                         </span>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={clearVideo}
//                         disabled={submitting}
//                         aria-label="Quitar video"
//                         className="rounded-lg p-1 text-muted-foreground transition hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed"
//                       >
//                         <X className="h-5 w-5" />
//                       </button>
//                     </div>

//                     <video
//                       src={videoPreviewUrl}
//                       controls
//                       className="max-h-72 w-full bg-black object-contain"
//                     />
//                   </div>
//                 )}
//               </div>

//               {formError && (
//                 <div className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-500">
//                   {formError}
//                 </div>
//               )}

//               {successMessage && (
//                 <div className="rounded-xl border border-green-500/30 bg-green-500/5 px-4 py-3 text-sm text-green-600">
//                   {successMessage}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="btn-gold inline-flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {submitting ? (
//                   <>
//                     <LoaderCircle className="h-5 w-5 animate-spin" />
//                     Enviando reseña...
//                   </>
//                 ) : (
//                   <>
//                     Publicar comentario
//                     <ArrowRight className="h-5 w-5" />
//                   </>
//                 )}
//               </button>
//             </form>
//           </AnimatedCard>
//         </FadeUp>
//       </div>
//     </section>
//   )
// }