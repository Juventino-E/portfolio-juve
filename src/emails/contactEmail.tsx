    import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
    } from '@react-email/components';
    import tailwindConfig from '../../tailwind.config';

    interface ContactEmailProps {
    userFirstname: string;
    texts: {
        preview: string;
        greeting: string;
        intro: string;
        commitment: string;
        closing: string;
        signature: string;
        role: string;
        button: string;
        footer: string;
    };
    lang: 'es' | 'en';
    }

    const baseUrl = import.meta.env.PUBLIC_SITE_URL || "https://github.com/Juventino-E";

    export const ContactEmail = ({
    userFirstname,
    texts,
    lang
    }: ContactEmailProps) => (
    <Html lang={lang}>
        <Head />
        <Tailwind config={tailwindConfig}>
        <Body className="bg-white font-sans">
            <Preview>{texts.preview}</Preview>
            
            <Container className="mx-auto py-8 px-4 max-w-[600px]">
            {/* Header con tu nombre/logo */}
            <Section className="text-center mb-8">
                <Text className="text-3xl font-bold text-[#FF6B35] m-0">
                JE
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                {texts.role}
                </Text>
            </Section>

            {/* Contenido del email */}
            <Text className="text-base leading-6 text-gray-800">
                {texts.greeting} {userFirstname},
            </Text>
            
            <Text className="text-base leading-6 text-gray-800">
                {texts.intro}
            </Text>

            <Text className="text-base leading-6 text-gray-800">
                {texts.commitment}
            </Text>

            {/* Botón CTA */}
            <Section className="text-center my-8">
                <Button
                className="bg-[#FF6B35] rounded-lg text-white text-base font-semibold no-underline px-6 py-3 inline-block"
                //   href={lang === 'es' ? baseUrl : `${baseUrl}/en`}
                        href={lang === 'es' ? baseUrl : `${baseUrl}`}

                >
                {texts.button}
                </Button>
            </Section>

            {/* Despedida */}
            <Text className="text-base leading-6 text-gray-800">
                {texts.closing},
            </Text>
            
            <Text className="text-base leading-6 text-gray-800 font-semibold">
                {texts.signature}
            </Text>
            
            {/* Footer */}
            <Hr className="border-gray-300 my-6" />
            
            <Text className="text-xs text-gray-500 text-center">
                {texts.footer}
            </Text>
            
            {/* Enlaces sociales opcionales */}
            <Section className="text-center mt-4">
                <Text className="text-xs text-gray-500">
                <a href="https://github.com/Juventino-E" className="text-[#FF6B35] no-underline mx-2">
                    GitHub
                </a>
                |
                <a href="https://linkedin.com/in/juventino-eduardo-martinez-hernandez" className="text-[#FF6B35] no-underline mx-2">
                    LinkedIn
                </a>
                </Text>
            </Section>
            </Container>
        </Body>
        </Tailwind>
    </Html>
    );

    ContactEmail.PreviewProps = {
    userFirstname: 'Juve',
    texts: {
        preview: 'Gracias por contactarme',
        greeting: 'Hola',
        intro: 'Gracias por ponerte en contacto conmigo. He recibido tu mensaje y te responderé lo antes posible.',
        commitment: 'Me comprometo a responder en un plazo máximo de 24-72 horas.',
        closing: 'Saludos cordiales',
        signature: 'Juventino Eduardo Martínez Hernández',
        role: 'Desarrollador Full Stack',
        button: 'Visitar mi Portfolio',
        footer: 'Querétaro, México'
    },
    lang: 'es'
    } as ContactEmailProps;

    export default ContactEmail;