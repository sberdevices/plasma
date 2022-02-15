import React, { FC } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import usePrismTheme from '@theme/hooks/usePrismTheme';
import useThemeContext from '@theme/hooks/useThemeContext';
import { PlaygroundPreview } from '@sberdevices/plasma-docs-ui';
import { light, dark } from '@sberdevices/plasma-tokens-b2b/themes';
import Translate from '@docusaurus/Translate';
import clsx from 'clsx';

import { CodeSandbox } from '../../components';

import styles from './styles.module.css';

const lightTheme = light[':root'];
const darkTheme = dark[':root'];
const StyledPreview = styled(PlaygroundPreview)<{ theme?: 'light' | 'dark' }>`
    ${({ theme = 'light' }) => (theme === 'light' ? lightTheme : darkTheme)}
`;

const StyledWrap = styled.div`
    width: fit-content;
    position: absolute;
    right: 8px;
    top: 8px;
`;

const StyledPlayground = styled.div`
    position: relative;
`;

const getSourceWithoutImports = (source: string) => {
    const regexp = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
    return source
        .replace(regexp, '')
        .replace(/export/g, '')
        .trimStart();
};

const Header: FC = ({ children }) => {
    return <div className={clsx(styles.playgroundHeader)}>{children}</div>;
};

const ResultWithHeader: FC = () => {
    const { isDarkTheme } = useThemeContext();

    return (
        <>
            <Header>
                <Translate id="theme.Playground.result" description="The result label of the live codeblocks">
                    Result
                </Translate>
            </Header>
            <LivePreview Component={StyledPreview} theme={isDarkTheme ? 'dark' : 'light'} />
            <LiveError />
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

type PlaygroundProps = {
    transformCode: (code: string) => string;
    children: string;
} & { [key: string]: boolean | string | number };

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
                code={isBrowser ? getSourceWithoutImports(children).replace(/\n$/, '') : ''}
                transformCode={transformCode || ((code) => `${code};`)}
                theme={prismTheme}
                {...props}
            >
                <StyledPlayground>
                    {playgroundPosition === 'top' ? (
                        <>
                            {!props['no-execute'] && <ResultWithHeader />}
                            <EditorWithHeader />
                        </>
                    ) : (
                        <>
                            <EditorWithHeader />
                            {!props['no-execute'] && <ResultWithHeader />}
                        </>
                    )}
                    <StyledWrap>
                        <CodeSandbox source={children} />
                    </StyledWrap>
                </StyledPlayground>
            </LiveProvider>
        </div>
    );
};

export default Playground;
