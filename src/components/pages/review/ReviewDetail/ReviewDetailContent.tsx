// 'use client'

// import { Header } from '@/components/header'
// import { Footer } from '@/components/footer'

// import { SectionHeader } from '@/components/animations/section-header'
// import { Review, getRelatedReviews } from '@/data/reviews'

// import { ReviewDetailHero } from './ReviewDetailHero'
// import { ReviewExperienceCard } from './ReviewExperienceCard'
// import { ReviewTravelerCard } from './ReviewTravelerCard'
// import { RelatedReviews } from './RelatedReviews'

// type Props = {
//     review: Review
// }

// export function ReviewDetailContent({ review }: Props) {
//     const relatedReviews = getRelatedReviews(review.slug)

//     return (
//         <>
//             {/* HEADER GLOBAL */}
//             <Header />

//             <main className="min-h-screen text-foreground">
//                 <ReviewDetailHero review={review} />

//                 {/* Detail */}
//                 <section className="relative py-16 bg-secondary/30 overflow-hidden">
//                     <div className="absolute top-20 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48" />

//                     <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
//                             <ReviewExperienceCard review={review} />

//                             <ReviewTravelerCard review={review} />
//                         </div>
//                     </div>
//                 </section>

//                 {/* Related */}
//                 <section className="relative py-16 overflow-hidden">
//                     <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <SectionHeader
//                             title="Más reseñas"
//                             description="Conoce otras experiencias de viajeros que fueron parte de nuestras misiones."
//                         />

//                         <RelatedReviews reviews={relatedReviews} />
//                     </div>
//                 </section>
//             </main>

//             {/* FOOTER GLOBAL */}
//             <Footer />
//         </>
//     )
// }