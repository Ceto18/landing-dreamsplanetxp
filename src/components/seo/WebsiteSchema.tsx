export function WebsiteSchema() {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'DREAMSPLANETXP',
        alternateName: [
            'DreamsPlanetXP',
            'Dreams Planet XP',
        ],
        url: 'https://dreamsplanetxp.es/',
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