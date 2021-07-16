import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { store } from '../store';
import { GlobalStyleContainer, HeaderContainer, Main } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Plasma Icons</title>
            </Head>
            <Provider store={store}>
                <HeaderContainer />
                <Main>
                    <Component {...pageProps} />
                </Main>
                <GlobalStyleContainer />
            </Provider>
        </>
    );
}
export default MyApp;
