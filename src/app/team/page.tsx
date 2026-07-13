import TeamPageClient from "@/components/pages/team/components/TeamPageClient"


export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
    title: 'Nuestro Equipo | DreamsPlanetXP',
    description:
        'Conoce a los influencers, coordinadores y colaboradores que forman parte de nuestras misiones.',
}

export default function TeamPage() {
    return <TeamPageClient />
}
