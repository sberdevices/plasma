import { useCallback } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { DeviceThemeProvider, ToastProvider, Container, Header, HeaderProps } from '@sberdevices/plasma-ui';

import { GlobalStyle } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const onBackClick = useCallback(() => router.back(), []);
    const headerProps = pageProps.back ? { back: true, onBackClick } : { minimize: true, onMinimizeClick: () => {} };

    return (
        <>
            <Head>
                <title>Demo Canvas App</title>
            </Head>
            <DeviceThemeProvider>
                <ToastProvider>
                    <Container>
                        <Header
                            title={pageProps.title}
                            subtitle={pageProps.subtitle}
                            {...(headerProps as HeaderProps)}
                        />
                        <Component {...pageProps} />
                        <GlobalStyle />
                    </Container>
                </ToastProvider>
            </DeviceThemeProvider>
        </>
    );
}

export default MyApp;
