import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
    title: 'Política de Privacidad | DreamsPlanetXP',
    description:
        'Política de privacidad, protección de datos y cookies de DREAMS LOW COST SL - DREAMSPLANETXP',
}

export default function PoliticaPrivacidadPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen text-foreground bg-background">
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -ml-48 -mt-48" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/[0.04] rounded-full blur-3xl -mr-48" />

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 max-w-5xl">
                            <span className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent mb-5">
                                Protección de datos
                            </span>

                            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                                Política de Privacidad
                            </h1>

                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-4xl">
                                Política de Privacidad y Protección de Datos de
                                DREAMS LOW COST SL, operando bajo la marca
                                DREAMSPLANETXP.
                            </p>
                        </div>

                        <article className="rounded-3xl border border-border bg-card/60 backdrop-blur-sm p-6 md:p-10 lg:p-12 shadow-sm">
                            <div className="mx-auto max-w-5xl space-y-12 text-muted-foreground leading-8 text-sm md:text-base">
                                {/* RESUMEN */}
                                <section className="space-y-6">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Política de Privacidad y Protección de Datos
                                    </h2>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <InfoBox
                                            title="Responsable"
                                            content="DREAMS LOW COST SL. NIF: B56510720"
                                        />

                                        <InfoBox
                                            title="Contacto"
                                            content="SAN GERARDO, 10 BIS LOCAL, MADRID, C.P. 28035"
                                        />

                                        <div className="rounded-2xl border border-border bg-background/60 p-5">
                                            <h3 className="font-semibold text-foreground mb-2">
                                                Correo electrónico
                                            </h3>

                                            <a
                                                href="mailto:vuelos@dreamsplanetxp.com"
                                                className="text-accent hover:underline break-all"
                                            >
                                                vuelos@dreamsplanetxp.com
                                            </a>
                                        </div>

                                        <InfoBox
                                            title="Finalidades"
                                            content="Consultas Website: Respuesta a consultas recibidas a través del formulario electrónico de la web."
                                        />

                                        <InfoBox
                                            title="Legitimación"
                                            content="Consultas Website: Consentimiento explícito del interesado."
                                        />

                                        <InfoBox
                                            title="Conservación"
                                            content="Consultas Website: Durante un plazo de 1 año a partir de la última confirmación de interés."
                                        />

                                        <InfoBox
                                            title="Destinatarios"
                                            content="No cedemos sus datos a terceros."
                                        />

                                        <InfoBox
                                            title="Transferencias internacionales"
                                            content="No realizamos transferencias internacionales de sus datos."
                                        />

                                        <InfoBox
                                            title="Procedencia"
                                            content="Consultas Website y Contactos web: El propio interesado o su representante legal."
                                        />

                                        <div className="md:col-span-2">
                                            <InfoBox
                                                title="Derechos"
                                                content="Usted tiene derecho a acceder a sus datos, rectificarlos, suprimirlos, limitar u oponerse a su tratamiento, a su portabilidad, a retirar su consentimiento y a presentar reclamaciones ante la Autoridad de Control, Agencia Española de Protección de Datos."
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* DETALLES */}
                                <section className="space-y-8">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Detalles de nuestra Política de Privacidad
                                    </h2>

                                    <LegalSection title="Información general">
                                        <p>
                                            La presente “Política de Privacidad y
                                            Protección de Datos” tiene como finalidad dar
                                            condiciones que rigen la recogida y
                                            tratamiento de sus datos personales por parte
                                            de nuestra entidad DREAMS LOW COST SL, para
                                            velar por los derechos fundamentales, su
                                            honor y libertades, en cumplimiento de las
                                            normativas vigentes que regulan la Protección
                                            de Datos personales según la Unión Europea y
                                            el Estado Miembro español.
                                        </p>

                                        <p>
                                            En conformidad con dichas normativas,
                                            necesitamos disponer de su autorización y
                                            consentimiento para la recogida y el
                                            tratamiento de sus datos personales.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Responsable del tratamiento">
                                        <p className="font-medium text-foreground">
                                            ¿Quién recaba y trata sus datos?
                                        </p>

                                        <p>
                                            El responsable del Tratamiento de Datos es
                                            DREAMS LOW COST SL.
                                        </p>

                                        <p className="font-medium text-foreground">
                                            ¿Cómo puede contactar con nosotros?
                                        </p>

                                        <p>
                                            Puede contactarnos en la siguiente dirección:
                                            SAN GERARDO, 10 BIS LOCAL, 28035 MADRID; o
                                            mediante el correo electrónico{' '}
                                            <a
                                                href="mailto:vuelos@dreamsplanetxp.com"
                                                className="text-accent hover:underline"
                                            >
                                                vuelos@dreamsplanetxp.com
                                            </a>
                                            .
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Medidas de seguridad">
                                        <p className="font-medium text-foreground">
                                            ¿Qué hacemos para garantizar la privacidad de
                                            sus datos?
                                        </p>

                                        <p>
                                            Nuestra entidad adopta las medidas
                                            organizativas y técnicas necesarias para
                                            garantizar la seguridad y la privacidad de sus
                                            datos, dependiendo del estado de la
                                            tecnología, la naturaleza de los datos
                                            almacenados y los riesgos a que están
                                            expuestos.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Finalidad del tratamiento">
                                        <p className="font-medium text-foreground">
                                            ¿Para qué queremos tratar sus datos?
                                        </p>

                                        <p>
                                            Necesitamos su autorización y consentimiento
                                            para recabar y tratar sus datos personales,
                                            para responder a consultas recibidas a través
                                            del formulario electrónico de la web.
                                        </p>

                                        <p className="font-medium text-foreground">
                                            ¿Durante cuánto tiempo conservamos sus datos?
                                        </p>

                                        <p>
                                            Utilizamos sus datos durante el tiempo
                                            estrictamente necesario para cumplir las
                                            finalidades indicadas anteriormente, con un
                                            plazo de conservación de 1 año a partir de la
                                            última confirmación de interés.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Legitimación del tratamiento">
                                        <p className="font-medium text-foreground">
                                            ¿Por qué tratamos sus datos?
                                        </p>

                                        <p>
                                            La recogida y el tratamiento de sus datos está
                                            legitimado siempre por una o varias bases
                                            jurídicas, detalladas en la política de
                                            privacidad.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Destinatarios de sus datos">
                                        <p className="font-medium text-foreground">
                                            ¿A quiénes cedemos sus datos dentro de la
                                            Unión Europea?
                                        </p>

                                        <p>
                                            No realizamos cesiones de sus datos a terceras
                                            personas ni entidades, salvo obligación legal.
                                        </p>

                                        <p className="font-medium text-foreground">
                                            ¿Realizamos Transferencias Internacionales de
                                            sus datos fuera de la Unión Europea?
                                        </p>

                                        <p>
                                            No realizamos transferencias internacionales
                                            de sus datos.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Procedencia y tipos de datos tratados">
                                        <p className="font-medium text-foreground">
                                            ¿De dónde hemos obtenido sus datos?
                                        </p>

                                        <p>
                                            Sus datos pueden haber sido obtenidos a través
                                            del propio interesado o su representante
                                            legal.
                                        </p>

                                        <p className="font-medium text-foreground">
                                            ¿Qué tipos de datos suyos hemos recabado y
                                            tratamos?
                                        </p>

                                        <p>
                                            Recabamos datos identificativos como Nombre y
                                            Apellidos, Dirección electrónica y Teléfono.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Derechos de los interesados">
                                        <p className="font-medium text-foreground">
                                            ¿Cuáles son los derechos que le amparan?
                                        </p>

                                        <p>
                                            Usted tiene derecho a ejercer una serie de
                                            derechos en relación con el uso que le damos a
                                            sus datos, detallados en la política de
                                            privacidad.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Consentimiento y aceptación">
                                        <p>
                                            La aceptación del presente documento indica que
                                            usted entiende y acepta todas las cláusulas de
                                            nuestra política de privacidad, por lo que
                                            autoriza la recogida y el tratamiento de sus
                                            datos personales en estos términos.
                                        </p>

                                        <p>
                                            Esta aceptación se realiza mediante la
                                            activación de la casilla de verificación de
                                            “Lectura y Aceptación” de nuestra Política de
                                            Privacidad.
                                        </p>
                                    </LegalSection>
                                </section>

                                {/* COOKIES */}
                                <section className="space-y-8">
                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                                        Política de Cookies
                                    </h2>

                                    <LegalSection title="Información legal">
                                        <p>
                                            En cumplimiento con lo establecido en la Ley
                                            34/2002 de 11 de Julio, de Servicios de la
                                            Sociedad de la Información y el Comercio
                                            Electrónico, LSSICE, se informa de los
                                            siguientes aspectos legales:
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Propiedad del sitio web">
                                        <ul className="list-disc pl-6 space-y-1">
                                            <li>Responsable: DREAMS LOW COST SL</li>
                                            <li>
                                                Dirección: SAN GERARDO, 10 BIS LOCAL,
                                                28035 MADRID
                                            </li>
                                        </ul>
                                    </LegalSection>

                                    <LegalSection title="Fines del tratamiento">
                                        <p>
                                            El pasajero da su consentimiento para
                                            almacenar las cookies y otras técnicas de
                                            rastreo para mejorar su experiencia de
                                            navegación en nuestra web, para mostrarle
                                            contenidos personalizados y anuncios
                                            adecuados, para analizar el tráfico en nuestra
                                            web y para comprender de dónde llegan nuestros
                                            visitantes.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Destinatarios y plazo">
                                        <p>
                                            Los datos obtenidos son utilizados
                                            exclusivamente por uso interno de DREAMS LOW
                                            COST SL y mantenidos por una duración máxima de
                                            1 año.
                                        </p>

                                        <p>
                                            El pasajero tiene derecho a solicitar al
                                            responsable del tratamiento el acceso a los
                                            datos personales relativos al interesado, y su
                                            rectificación o supresión, o la limitación de
                                            su tratamiento, o a oponerse al tratamiento,
                                            así como el derecho a la portabilidad de los
                                            datos.
                                        </p>

                                        <p>
                                            También tiene derecho a retirar el
                                            consentimiento en cualquier momento, sin que
                                            ello afecte a la licitud del tratamiento
                                            basado en el consentimiento previo a su
                                            retirada, así como el derecho a presentar una
                                            reclamación ante una autoridad de control.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Información y terminologías">
                                        <p>
                                            Las cookies son archivos pequeños que las
                                            páginas web almacenan en el navegador del
                                            usuario para mejorar la experiencia de
                                            navegación.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Servicios de terceros">
                                        <p>
                                            Adicionalmente, DREAMS LOW COST SL tiene
                                            presencia en portales y servicios de terceros
                                            para los que deberán consultarse las políticas
                                            proporcionadas por los mismos.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Aceptación de la Política de Cookies">
                                        <p>
                                            DREAMS LOW COST SL muestra información sobre
                                            su Política de Cookies en la parte inferior de
                                            cualquier página del sitio web.
                                        </p>
                                    </LegalSection>

                                    <LegalSection title="Cómo modificar la configuración de las cookies">
                                        <p>
                                            Usted puede restringir, bloquear o borrar las
                                            cookies de DREAMS LOW COST SL o cualquier otra
                                            página web, utilizando su navegador. En cada
                                            navegador la operativa es diferente, la función
                                            de “Ayuda” le mostrará cómo hacerlo.
                                        </p>

                                        <p>
                                            Además, también puede gestionar el almacén de
                                            cookies en su navegador a través de
                                            herramientas como Ghostery y Your online
                                            choices.
                                        </p>

                                        <ul className="space-y-2 break-all">
                                            <li>
                                                <strong className="text-foreground">
                                                    Internet Explorer:
                                                </strong>{' '}
                                                <a
                                                    href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies#ie="
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-accent hover:underline"
                                                >
                                                    https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies#ie=
                                                </a>
                                            </li>

                                            <li>
                                                <strong className="text-foreground">
                                                    FireFox:
                                                </strong>{' '}
                                                <a
                                                    href="https://support.mozilla.org/es/kb/Borrar%20cookies"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-accent hover:underline"
                                                >
                                                    https://support.mozilla.org/es/kb/Borrar%20cookies
                                                </a>
                                            </li>

                                            <li>
                                                <strong className="text-foreground">
                                                    Chrome:
                                                </strong>{' '}
                                                <a
                                                    href="https://support.google.com/chrome/answer/95647?hl=es"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-accent hover:underline"
                                                >
                                                    https://support.google.com/chrome/answer/95647?hl=es
                                                </a>
                                            </li>

                                            <li>
                                                <strong className="text-foreground">
                                                    Safari:
                                                </strong>{' '}
                                                <a
                                                    href="https://www.apple.com/es/privacy/use-of-cookies/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-accent hover:underline"
                                                >
                                                    https://www.apple.com/es/privacy/use-of-cookies/
                                                </a>
                                            </li>

                                            <li>
                                                <strong className="text-foreground">
                                                    Ghostery:
                                                </strong>{' '}
                                                <a
                                                    href="https://www.ghostery.com/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-accent hover:underline"
                                                >
                                                    https://www.ghostery.com/
                                                </a>
                                            </li>

                                            <li>
                                                <strong className="text-foreground">
                                                    Your online choices:
                                                </strong>{' '}
                                                <a
                                                    href="https://www.youronlinechoices.com/es/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-accent hover:underline"
                                                >
                                                    https://www.youronlinechoices.com/es/
                                                </a>
                                            </li>
                                        </ul>
                                    </LegalSection>
                                </section>
                            </div>
                        </article>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    )
}

type InfoBoxProps = {
    title: string
    content: string
}

function InfoBox({ title, content }: InfoBoxProps) {
    return (
        <div className="rounded-2xl border border-border bg-background/60 p-5">
            <h3 className="font-semibold text-foreground mb-2">{title}</h3>
            <p>{content}</p>
        </div>
    )
}

type LegalSectionProps = {
    title: string
    children: React.ReactNode
}

function LegalSection({ title, children }: LegalSectionProps) {
    return (
        <section className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                {title}
            </h3>

            <div className="space-y-4">{children}</div>
        </section>
    )
}