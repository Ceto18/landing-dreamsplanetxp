import { api } from './api'

export type CreateReservationPayload = {
    experience_slug: string
    full_name: string
    phone: string
    message: string
}

export type CreateReservationResponse = {
    success: boolean
    message: string
    data?: unknown
    errors?: Record<string, string[]>
}

export const reservationService = {
    async createReservation(
        payload: CreateReservationPayload
    ): Promise<CreateReservationResponse> {
        const response =
            await api.post<CreateReservationResponse>(
                '/public/reservations',
                payload
            )

        return response.data
    },
}