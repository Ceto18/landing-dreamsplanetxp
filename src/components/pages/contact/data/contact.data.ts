export const travelerOptions = [
    {
        value: '1',
        label: '1 viajero',
    },
    {
        value: '2',
        label: '2 viajeros',
    },
    {
        value: '3-5',
        label: '3-5 viajeros',
    },
    {
        value: '6-10',
        label: '6-10 viajeros',
    },
    {
        value: '11+',
        label: '11+ viajeros',
    },
]

export type ContactFormData = {
    nombre: string
    email: string
    telefono: string
    mision: string
    viajeros: string
    mensaje: string
}

export const initialContactFormData: ContactFormData = {
    nombre: '',
    email: '',
    telefono: '',
    mision: '',
    viajeros: '',
    mensaje: '',
}