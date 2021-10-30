import { useState, useCallback } from 'react';
import Head from 'next/head';

import { Header, Main, SearchForm, IconsList, Panel, IconForm } from '../components/roster';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const onSearchInput = useCallback((e) => setSearchQuery(e.currentTarget.value), [setSearchQuery]);
    const onItemClick = useCallback(() => setIsPanelOpen(true), [setIsPanelOpen]);
    const onPanelClose = useCallback(() => setIsPanelOpen(false), [setIsPanelOpen]);

    return (
        <>
            <Head>
                <title>Plasma Icons</title>
            </Head>
            <Header />
            <Main>
                <SearchForm onInput={onSearchInput} />
                <IconsList searchQuery={searchQuery} onItemClick={onItemClick} />
                <Panel isOpen={isPanelOpen} onClose={onPanelClose}>
                    <IconForm />
                </Panel>
            </Main>
        </>
    );
}
