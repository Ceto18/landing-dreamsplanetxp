export type HomeHeroBackgroundImage = {
    name: string
    uuid: string
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

export type HomeVisibleMissionTab = {
    slug: string
    name: string
    country: string
}

export type HomeMission = {
    uuid?: string
    name: string
    slug: string
    label: string
    country: string
    active?: boolean
    image_url: string | null
    first_experience_slug: string | null
}

/* ======================================================
   HOME MOMENTS ANTIGUO / OPCIONAL
   Puede quedarse por compatibilidad, pero tu endpoint actual
   /api/v1/public/home ya no lo está enviando.
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

/* ======================================================
   HOME MISSION MOMENTS
   Endpoint:
   /api/v1/public/home/missions/moments/{missionSlug}
====================================================== */

export type HomeMissionMomentItem = {
    title: string
    slug: string
    image_url: string
}

export type HomeMissionMomentsData = {
    name: string
    slug: string
    country: string
    moments: HomeMissionMomentItem[]
}

export type HomeMissionMomentsResponse = {
    success: boolean
    message: string
    data: HomeMissionMomentsData
}

/* ======================================================
   HOME
   Endpoint:
   /api/v1/public/home
====================================================== */

export type HomeData = {
    hero: HomeHero
    next_departure: HomeNextDeparture | null
    visible_missions_tabs: HomeVisibleMissionTab[]
    missions: HomeMission[]

    // Opcional porque tu respuesta actual no lo trae.
    moments?: HomeMoments
}

export type HomeResponse = {
    success: boolean
    message: string
    data: HomeData
}

/* ======================================================
   MISSION EXPERIENCES LIST
   Endpoint:
   /api/v1/public/missions/{missionSlug}/experiences
====================================================== */

export type MissionExperienceImage = {
    image_url: string
    name: string
}

export type MissionExperience = {
    name: string
    slug: string
    short_description: string
    release_date: string
    number_seats: number
    seats_used: number
    available_seats: number
    days: number
    nights: number
    raiting: number
    investment: number
    features: string[]
    first_image: MissionExperienceImage | null
}

export type MissionExperiencesPaginationLink = {
    url: string | null
    label: string
    page: number | null
    active: boolean
}

export type MissionExperiencesPagination = {
    current_page: number
    data: MissionExperience[]
    first_page_url: string | null
    from: number | null
    last_page: number
    last_page_url: string | null
    links: MissionExperiencesPaginationLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export type MissionExperiencesResponse = {
    success: boolean
    message: string
    data: MissionExperiencesPagination
}

/* ======================================================
   MISSION MOMENTS LIST
   Endpoint:
   /api/v1/public/missions/{missionSlug}/moments
====================================================== */

export type MissionMomentImage = {
    name: string
    slug: string
    image_url: string
}

export type MissionMoment = {
    title: string
    description: string
    proverb: string
    place: string
    slug: string
    country: string
    first_image: MissionMomentImage | null
}

export type MissionMomentsPaginationLink = {
    url: string | null
    label: string
    page: number | null
    active: boolean
}

export type MissionMomentsPagination = {
    current_page: number
    data: MissionMoment[]
    first_page_url: string | null
    from: number | null
    last_page: number
    last_page_url: string | null
    links: MissionMomentsPaginationLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export type MissionMomentsResponse = {
    success: boolean
    message: string
    data: MissionMomentsPagination
}

/* ======================================================
   MOMENT DETAIL
   Endpoint:
   /api/v1/public/moments/{slug}
====================================================== */

export type MomentDetailImage = {
    name: string
    image_url: string
}

export type MomentDetail = {
    title: string
    slug: string
    description: string
    proverb: string
    place: string
    experience: string | null
    ideal: string
    sensation: string
    mission: string
    mission_experience: string
    experience_slug: string
    images: MomentDetailImage[]
}

export type MomentDetailResponse = {
    success: boolean
    message: string
    data: MomentDetail
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

/* ======================================================
   MISSION PEOPLE / TEAMS
   Endpoint:
   /api/v1/public/missions/{missionSlug}/people/{role}
====================================================== */

export type MissionTeamRole = string

export type MissionTeamPerson = {
    first_name: string
    last_name: string
    fullname: string
    slug: string
    experience: string | null
    specialty: string | null
    photo_url: string | null
    role: MissionTeamRole
    languages: string[]
}

export type MissionTeamPaginationLink = {
    url: string | null
    label: string
    page: number | null
    active: boolean
}

export type MissionTeamPagination = {
    current_page: number
    data: MissionTeamPerson[]
    first_page_url: string | null
    from: number | null
    last_page: number
    last_page_url: string | null
    links: MissionTeamPaginationLink[]
    next_page_url: string | null
    path: string
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number
}

export type MissionTeamResponse = {
    success: boolean
    message: string
    data: MissionTeamPagination
}

export type MissionTeamParams = {
    page?: number
    per_page?: number
}

/* ======================================================
   HOME REVIEWS
   Endpoint:
   /api/v1/public/home/reviews
====================================================== */

export type HomeReview = {
    name: string
    comment: string
    rating: number
    video_url: string | null
    mission_name: string | null
}

export type HomeReviewsResponse = {
    success: boolean
    message: string
    data: HomeReview[]
}

/* ======================================================
   COMPANY HOME
   Endpoint:
   /api/v1/public/company/home
====================================================== */

export type CompanyHome = {
    satisfied_travelers: number
    destinations_explored: number
    average_rating: number
    years_of_experience: number
    info: string
    subtitle: string
}

export type CompanyHomeResponse = {
    success: boolean
    message: string
    data: CompanyHome
}

/* ======================================================
   COMPANY HISTORY
   Endpoint:
   /api/v1/public/company/history
====================================================== */

export type CompanyTimeline = {
    stage: string
    image_url: string | null
    title: string
    description: string
    event_date: string
}

export type CompanyHistory = {
    satisfied_travelers: number
    destinations_explored: number
    average_rating: number
    years_of_experience: number
    info: string
    subtitle: string
    timelines: CompanyTimeline[]
}

export type CompanyHistoryResponse = {
    success: boolean
    message: string
    data: CompanyHistory
}

/* ======================================================
   SOCIAL NETWORK PROFILES
   Endpoint:
   /api/v1/public/social-network-profiles
====================================================== */

export type SocialNetworkProfile = {
    nickname: string
    label: string
    url: string
    social_network_name: string
    social_network_icon: string | null
}

export type SocialNetworkProfilesResponse = {
    success: boolean
    message: string
    data: SocialNetworkProfile[]
}