import React, { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import usePrismTheme from '@theme/hooks/usePrismTheme';
import { gradient } from '@sberdevices/plasma-tokens';
import { darkSber } from '@sberdevices/plasma-tokens/themes';

import styles from './styles.module.css';

const darkSberTheme = darkSber[':root'];

const StyledPreview = styled.div`
    ${darkSberTheme}

    padding: 1rem;
    background-image: ${gradient};
`;

const Header: FC = ({ children }) => {
    return <div className={clsx(styles.playgroundHeader)}>{children}</div>;
};

const ResultWithHeader: FC = () => {
    return (
        <>
            <Header>
                <Translate id="theme.Playground.result" description="The result label of the live codeblocks">
                    Result
                </Translate>
            </Header>
            <StyledPreview>
                <LivePreview />
                <LiveError />
            </StyledPreview>
        </>
    );
};

const EditorWithHeader: FC = () => {
    return (
        <>
            <Header>
                <Translate id="theme.Playground.liveEditor" description="The live editor label of the live codeblocks">
                    Live Editor
                </Translate>
            </Header>
            <LiveEditor className={styles.playgroundEditor} />
        </>
    );
};

interface PlaygroundProps {
    transformCode: (code: string) => string;
    children: string;
}

const Playground: FC<PlaygroundProps> = ({ children, transformCode, ...props }) => {
    const {
        isClient,
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
                key={isClient}
                code={isClient ? children.replace(/\n$/, '') : ''}
                transformCode={transformCode || ((code) => `${code};`)}
                theme={prismTheme}
                {...props}
            >
                {playgroundPosition === 'top' ? (
                    <>
                        <ResultWithHeader />
                        <EditorWithHeader />
                    </>
                ) : (
                    <>
                        <EditorWithHeader />
                        <ResultWithHeader />
                    </>
                )}
            </LiveProvider>
        </div>
    );
};

export default Playground;
