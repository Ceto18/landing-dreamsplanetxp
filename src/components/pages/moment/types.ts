export interface Photo {
    id: string
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
}