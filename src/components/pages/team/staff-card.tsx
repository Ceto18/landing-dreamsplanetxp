// 'use client'

// import Link from 'next/link'
// import { AnimatedCard } from '@/components/animations/animated-card'
// import { FadeUp } from '@/components/animations/fade-up'

// export interface StaffCardProps {
//   staff: {
//     slug: string
//     name: string
//     image: string
//     role: string
//     bio?: string
//     experience?: string
//     languages?: string[]
//   }
// }

// export function StaffCard({ staff }: StaffCardProps) {
//   return (
//     <FadeUp>
//       <Link href={`/team/staff/${staff.slug}`} className="no-underline">
//         <AnimatedCard className="group space-y-4 rounded-2xl border border-border/60 bg-card/40 p-6 shadow-lg hover:border-accent/60 hover:bg-card/70 hover:shadow-2xl transition-all duration-500">
//           <div className="relative h-48 overflow-hidden rounded-xl border border-border/50">
//             <img
//               src={staff.image}
//               alt={staff.name}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
//             <div className="absolute bottom-3 left-3 rounded-full border border-accent/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
//               {staff.role}
//             </div>
//           </div>
//           <div className="space-y-2">
//             <h3 className="text-lg font-bold text-foreground">{staff.name}</h3>
//             {staff.bio && <p className="text-sm text-accent">{staff.bio}</p>}
//             {staff.experience && <p className="text-xs text-muted-foreground">Experiencia: {staff.experience}</p>}
//             {staff.languages && <p className="text-xs text-muted-foreground">Idiomas: {staff.languages.join(', ')}</p>}
//           </div>
//         </AnimatedCard>
//       </Link>
//     </FadeUp>
//   )
// }