// 'use client'

// import Link from 'next/link'
// import { Star } from 'lucide-react'
// import { AnimatedCard } from '@/components/animations/animated-card'
// import { Review } from '@/data/reviews'

// type Props = {
//     reviews: Review[]
// }

// export function RelatedReviews({ reviews }: Props) {
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {reviews.map((item, idx) => (
//                 <AnimatedCard
//                     key={item.id}
//                     delay={0.12 + idx * 0.06}
//                     className="group h-full rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg glass-effect hover:border-accent/60 hover:bg-card/70 transition-all"
//                 >
//                     <Link
//                         href={`/review/${item.slug}`}
//                         className="block h-full no-underline"
//                     >
//                         <div className="flex items-center gap-1 mb-5">
//                             {Array.from({ length: item.rating }).map((_, i) => (
//                                 <Star
//                                     key={i}
//                                     className="w-4 h-4 fill-accent text-accent"
//                                 />
//                             ))}
//                         </div>

//                         <p className="text-lg text-foreground leading-relaxed italic mb-6">
//                             &quot;{item.quote}&quot;
//                         </p>

//                         <div className="border-t border-border/60 pt-5">
//                             <p className="font-semibold text-foreground">
//                                 {item.traveler}
//                             </p>

//                             <p className="mt-1 text-sm text-muted-foreground">
//                                 Misión {item.mission}
//                             </p>
//                         </div>
//                     </Link>
//                 </AnimatedCard>
//             ))}
//         </div>
//     )
// }