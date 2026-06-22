import { Photo } from './types'

export const destinations = [
    'Marruecos',
    'Vietnam',
    'Tailandia',
    'Japón',
    'Nepal',
    'Sorpresa',
]

export const createPhotos = (
    destination: string,
    baseTitle: string,
    image: string,
    description: string,
    place: string,
    experience: string,
    emotion: string,
    recommendation: string,
    gallery: string[]
): Photo[] =>
    Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        destination,
        title: `${baseTitle} ${i + 1}`,
        image,
        description,
        place,
        experience,
        moment: 'Cualquier hora',
        emotion,
        recommendation,
        gallery,
    }))