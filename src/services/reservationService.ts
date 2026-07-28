import { api } from './api'

export type CreateReservationPayload = {
    experience_slug: string
    full_name: string
    email: string
    phone: string
    message: string
    passengers: string
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
                {
                    ...payload,
                    passengers: String(
                        payload.passengers
                    ),
                }
            )

        return response.data
    },
}