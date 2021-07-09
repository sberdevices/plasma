import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DeviceThemeProvider, ToastProvider, Container } from '@sberdevices/plasma-ui';

import { GlobalStyle } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Demo Canvas App</title>
            </Head>
            <DeviceThemeProvider>
                <ToastProvider>
                    <Container>
                        <Component {...pageProps} />
                        <GlobalStyle />
                    </Container>
                </ToastProvider>
            </DeviceThemeProvider>
        </>
    );
}
export default MyApp;
