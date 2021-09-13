import React, { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import usePrismTheme from '@theme/hooks/usePrismTheme';
import { PlaygroundPreview } from '@sberdevices/plasma-docs-ui';
import { light } from '@sberdevices/plasma-tokens-web/themes';

import styles from './styles.module.css';

const lightTheme = light[':root'];
const StyledPreview = styled(PlaygroundPreview)`
    ${lightTheme}
`;

const ResultWithHeader: FC = () => {
    return (
        <>
            <LivePreview Component={StyledPreview} />
            <LiveError />
        </>
    );
};

interface PlaygroundProps {
    transformCode: (code: string) => string;
    children: string;
}

const Playground: FC<PlaygroundProps> = ({ children, transformCode, ...props }) => {
    const isBrowser = useIsBrowser();
    const {
        siteConfig: {
            themeConfig: {
                liveCodeBlock: { playgroundPosition },
            },
        },
    } = useDocusaurusContext();
    const prismTheme = usePrismTheme();

    return (
        <div className={styles.playgroundContainer}>
            <LiveProvider
                key={isBrowser}
                code={isBrowser ? children.replace(/\n$/, '') : ''}
                transformCode={transformCode || ((code) => `${code};`)}
                theme={prismTheme}
                {...props}
            >
                {playgroundPosition === 'top' ? (
                    <>
                        <ResultWithHeader />
                        <LiveEditor className={styles.playgroundEditor} />
                    </>
                ) : (
                    <>
                        <LiveEditor className={styles.playgroundEditor} />
                        <ResultWithHeader />
                    </>
                )}
            </LiveProvider>
        </div>
    );
};

export default Playground;
