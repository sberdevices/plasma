import type { AppProps } from 'next/app';
import Head from 'next/head';
import { DeviceThemeProvider, Container } from '@sberdevices/plasma-ui';

import { GlobalStyle } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Demo Canvas App</title>
            </Head>
            <DeviceThemeProvider>
                <Container>
                    <Component {...pageProps} />
                    <GlobalStyle />
                </Container>
            </DeviceThemeProvider>
        </>
    );
}
export default MyApp;
