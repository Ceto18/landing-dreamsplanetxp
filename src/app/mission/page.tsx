import MissionsPageClient from "@/components/pages/mission/content/MissionsPageClient"

export const dynamic = 'force-dynamic'
export const revalidate = 0


export const metadata = {
    title: 'Misiones | DreamsPlanetXP',
    description:
        'Explora nuestras misiones y experiencias premium alrededor del mundo.',
}

export default function MissionsPage() {
    return <MissionsPageClient />
}