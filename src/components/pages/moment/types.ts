export interface Photo {
    id: string
    slug?: string
    destination: string
    title: string
    image: string
    place: string
    experience: string
    gallery: string[]

    description?: string
    moment?: string
    emotion?: string
    recommendation?: string

    missionSlug?: string
    firstExperienceSlug?: string | null
}