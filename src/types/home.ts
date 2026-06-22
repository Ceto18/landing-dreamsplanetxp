export type HomeHeroBackgroundImage = {
    name: string
    image_url: string
}

export type HomeHero = {
    title: string
    highlight_text: string
    description: string
    destinations_count: number
    travelers_count: number
    experiences_count: number
    continents_count: number
    images_background: HomeHeroBackgroundImage[]
}

export type HomeNextDeparture = {
    release_date: string
    name: string
    number_seats: number
    seats_used: number
    file_url: string | null
    mission: {
        name: string
        image_url: string | null
    }
}

export type HomeMission = {
    uuid?: string
    name: string
    slug?: string
    label: string
    country: string
    active: boolean
    image_url: string | null
}

export type HomeMomentExperience = {
    name: string
    slug: string
}

export type HomeMomentMission = {
    name: string
    slug: string
    image_url: string | null
    experiences: HomeMomentExperience[]
}

export type HomeMomentCountry = {
    country: string
    missions: HomeMomentMission[]
}

export type HomeMoments = {
    countries: string[]
    data: HomeMomentCountry[]
}

export type HomeData = {
    hero: HomeHero
    next_departure: HomeNextDeparture | null
    missions: HomeMission[]
    moments?: HomeMoments
}

export type HomeResponse = {
    success: boolean
    message: string
    data: HomeData
}