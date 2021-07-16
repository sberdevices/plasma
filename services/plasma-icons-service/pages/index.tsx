import { useState } from 'react';

import { PanelContainer, SearchForm, IconsListContainer, IconFormContainer } from '../components';

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <SearchForm onInput={(e) => setSearchQuery(e.currentTarget.value)} />
            <IconsListContainer searchQuery={searchQuery} />
            <PanelContainer>
                <IconFormContainer />
            </PanelContainer>
        </>
    );
}
