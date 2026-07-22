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
        value: '3',
        label: '3 viajeros',
    },
    {
        value: '4',
        label: '4 viajeros',
    },
    {
        value: '5',
        label: '5 viajeros',
    },
    {
        value: '6',
        label: '6 viajeros',
    },
    {
        value: '7',
        label: '7 viajeros',
    },
    {
        value: '8',
        label: '8 viajeros',
    },
    {
        value: '9',
        label: '9 viajeros',
    },
    {
        value: '10',
        label: '10 viajeros',
    },
    {
        value: '11',
        label: '11 viajeros',
    },
]

export type ContactFormData = {
    nombre: string
    email: string
    telefono: string
    mision: string
    experiencia: string
    viajeros: string
    mensaje: string
}

export const initialContactFormData: ContactFormData = {
    nombre: '',
    email: '',
    telefono: '',
    mision: '',
    experiencia: '',
    viajeros: '',
    mensaje: '',
}