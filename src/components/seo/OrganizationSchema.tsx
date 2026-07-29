export function OrganizationSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': 'https://dreamsplanetxp.es/#organization',
    name: 'DREAMSPLANETXP',
    alternateName: 'DreamsPlanetXP',
    url: 'https://dreamsplanetxp.es/',
    logo: 'https://dreamsplanetxp.es/logodreams.png',
    description:
      'Experiencias de viaje premium, misiones exclusivas y viajes personalizados.',
    sameAs: [
      'https://www.instagram.com/dreamsplanetxp/',
      'https://www.youtube.com/@DreamsPlanetXP',
      'https://www.tiktok.com/@dreamsplanetxp',
      'https://www.facebook.com/p/Dreamsplanetxp-61588127097434/',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
      }}
    />
  )
}