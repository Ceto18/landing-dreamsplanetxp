export interface TeamMember {
  id: number
  slug: string
  name: string
  role: 'Influencer' | 'Coordinador' | 'Colaborador' | 'Guía'
  experience?: string
  languages?: string[]
  specialty?: string
  bio?: string
  image: string
  missions?: { title: string; image: string }[]
  photos?: string[]
  destination: string
}

export const teamData: TeamMember[] = [
  // INFLUENCERS MARRUECOS
  {
    id: 1,
    slug: 'sofia-marchal',
    name: 'Sofio Marchal',
    role: 'Influencer',
    experience: '8 años',
    languages: ['Francés', 'Inglés', 'Español'],
    specialty: 'Travel content',
    bio: 'Sofia es una viajera apasionada que comparte experiencias únicas alrededor del mundo.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    destination: 'Marruecos',
    missions: [
      { title: 'Misión Amazonas', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop' },
      { title: 'Misión Desierto', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=400&fit=crop' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=400&h=400&fit=crop',
    ],
  },
  {
    id: 2,
    slug: 'marcus-rivera',
    name: 'Marcus Rivera',
    role: 'Influencer',
    experience: '9 años',
    languages: ['Inglés', 'Español', 'Francés'],
    specialty: 'Adventure vlogging',
    bio: 'Marcus documenta aventuras extremas y rutas poco conocidas para su audiencia global.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    destination: 'Marruecos',
    missions: [
      { title: 'Ruta del Atlas', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop' },
      { title: 'Safari Desierto', image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=600&h=400&fit=crop' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
    ],
  },
  // COORDINADORES MARRUECOS
  {
    id: 3,
    slug: 'hassan-al-mansouri',
    name: 'Hassan Al-Mansouri',
    role: 'Coordinador',
    experience: '12 años',
    languages: ['Árabe', 'Francés', 'Inglés', 'Español'],
    specialty: 'Expediciones en desierto',
    image: 'https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=400&h=400&fit=crop',
    destination: 'Marruecos',
  },
  {
    id: 4,
    slug: 'fatima-zara',
    name: 'Fatima Zara',
    role: 'Coordinador',
    experience: '8 años',
    languages: ['Árabe', 'Francés', 'Inglés'],
    specialty: 'Cultura Marroquí',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
    destination: 'Marruecos',
  },
  // COLABORADOR
  {
    id: 5,
    slug: 'leila-tazi',
    name: 'Leila Tazi',
    role: 'Colaborador',
    experience: '6 años',
    languages: ['Árabe', 'Francés', 'Inglés'],
    specialty: 'Gastronomía local',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    destination: 'Marruecos',
  },
  // INFLUENCERS VIETNAM
  {
    id: 20,
    slug: 'linh-pham',
    name: 'Linh Pham',
    role: 'Influencer',
    experience: '11 años',
    languages: ['Vietnamita', 'Inglés', 'Francés'],
    specialty: 'Travel content',
    bio: 'Linh comparte experiencias de aventura y cultura en Vietnam.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    destination: 'Vietnam',
    missions: [
      { title: 'Cultura Mekong', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
    ],
  },
  {
    id: 21,
    slug: 'hoa-nguyen',
    name: 'Hoa Nguyen',
    role: 'Influencer',
    experience: '9 años',
    languages: ['Vietnamita', 'Inglés'],
    specialty: 'Travel & Food',
    bio: 'Hoa muestra la cultura local y gastronomía de Vietnam.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
    destination: 'Vietnam',
    missions: [
      { title: 'Crucero Halong', image: 'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=600&h=400&fit=crop' },
    ],
    photos: [
      'https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
    ],
  },
]