import { notFound } from 'next/navigation'

import { teamService } from '@/services/teamService'
import { StaffDetailContent } from '@/components/pages/team/StaffPageDetail/StaffDetailContent'

interface Props {
    params: Promise<{
        slug: string
    }>

    searchParams: Promise<{
        role?: string
    }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata({ params }: Props) {
    const { slug } = await params

    try {
        const member =
            await teamService.getPersonBySlug(slug)

        return {
            title: `${member.fullname} | DreamsPlanetXP`,
            description:
                member.bio ||
                `Conoce la experiencia y trayectoria de ${member.fullname}.`,
        }
    } catch {
        return {
            title: 'Perfil no encontrado | DreamsPlanetXP',
            description:
                'No se pudo encontrar la información de este miembro del equipo.',
        }
    }
}

export default async function StaffDetailPage({
    params,
    searchParams,
}: Props) {
    const { slug } = await params
    const { role } = await searchParams

    try {
        const [member, imagesResponse] =
            await Promise.all([
                teamService.getPersonBySlug(slug),
                teamService.getPersonImages(
                    slug,
                    1,
                    20
                ),
            ])

        return (
            <StaffDetailContent
                member={member}
                images={imagesResponse.data}
                role={role}
            />
        )
    } catch (error) {
        console.error(
            `Error cargando el perfil staff ${slug}:`,
            error
        )

        notFound()
    }
}