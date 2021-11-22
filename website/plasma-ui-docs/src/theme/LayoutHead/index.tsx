import React from 'react';
import { GlobalStyle } from '@sberdevices/plasma-docs-ui';
import useThemeContext from '@theme/hooks/useThemeContext';
import BaseLayoutHead from '@docusaurus/theme-classic/lib-next/theme/LayoutHead';

export default function LayoutHead(props: any) {
    // We can't use this context outside the Layout https://docusaurus.io/docs/api/themes/configuration#usethemecontext
    const { isDarkTheme } = useThemeContext();

    return (
        <>
            {/* There is no other way to reuse basic layout */}
            <BaseLayoutHead {...props} />
            <GlobalStyle theme={isDarkTheme ? 'dark' : 'light'} />
        </>
    );
}
