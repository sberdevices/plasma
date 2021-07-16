import type { AppProps } from 'next/app';
import Head from 'next/head';

import { GlobalStyle } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Дизайн-система Сбера</title>
            </Head>
            <Component {...pageProps} />
            <GlobalStyle />
        </>
    );
}
export default MyApp;
