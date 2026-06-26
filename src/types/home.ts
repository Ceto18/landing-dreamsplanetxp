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
    active?: boolean
    image_url: string | null
}

/* ======================================================
   HOME MOMENTS
   Endpoint:
   /api/v1/public/home

   Estructura real actual del API:
   moments.countries[]
   moments.data[]
   moments.data[].moments[]
====================================================== */

export type HomeMomentItem = {
    title: string
    slug: string
    image: string
}

export type HomeMomentCountry = {
    country: string
    moments: HomeMomentItem[]
}

export type HomeMoments = {
    countries: string[]
    data: HomeMomentCountry[]
}

export type HomeData = {
    hero: HomeHero
    next_departure: HomeNextDeparture | null
    missions: HomeMission[]
    moments: HomeMoments
}

export type HomeResponse = {
    success: boolean
    message: string
    data: HomeData
}

/* ======================================================
   EXPERIENCE DETAIL
   Endpoint:
   /api/v1/public/missions/experiences/{slug}
====================================================== */

export type ExperienceImage = {
    name: string
    image: string
}

export type ExperienceItinerary = {
    day: string
    order: number
    title: string
    description: string
}

export type ExperienceMission = {
    name: string
    country: string
    image: string | null
}

export type MissionExperienceDetail = {
    name: string
    slug: string
    subtitle: string
    short_description: string
    long_description: string
    release_date: string
    days: number
    nights: number
    raiting: string
    investment: number
    number_seats: number
    seats_used: number
    file: string | null
    mission: ExperienceMission
    images: ExperienceImage[]
    features: string[]
    itineraries: ExperienceItinerary[]
}

export type MissionExperienceDetailResponse = {
    success: boolean
    message: string
    data: MissionExperienceDetail
}