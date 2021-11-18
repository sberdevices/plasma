import React, { FC, HTMLAttributes, useMemo } from 'react';
import { getParameters } from 'codesandbox/lib/api/define';
import styled from 'styled-components';
import qs from 'qs';

const getIndexStyle = (styledPreview?: string) => `import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { App } from "./App";
import "./style.css";

${
    styledPreview?.includes('StyledPreview')
        ? styledPreview
        : `const StyledPreview = styled.div\`
            padding: 1rem; 
            > div { 
                display: flex; 
                gap: 1rem; 
            }
        \``
}

ReactDOM.render(
  <StyledPreview>
    <App />
  </StyledPreview>,
  document.getElementById("root")
);`;

const style = `@import "https://cdn-app.sberdevices.ru/shared-static/0.0.0/styles/SBSansText.0.1.0.css";

body {
  font-family: "SB Sans Text", system-ui, -apple-system, Segoe UI,
  Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont,
  "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji",
  "Segoe UI Emoji", "Segoe UI Symbol";
}`;

const html = `<body>
  <div id="root"></div>
</body>
`;

const StyledLink = styled.a`
    && {
        display: block;
        border-radius: 6px;
        padding: 6px 10px;

        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        background-color: var(--ifm-link-color);
    }
`;

export interface CodeSandboxProps extends HTMLAttributes<HTMLIFrameElement> {
    /**
     * Исходный код сниппета
     */
    source: string;
    /**
     * Имя песочницы
     */
    sandboxName: string;
    /**
     * Стиль обёртки для сниппета, где StyledPreview - стилизованный div
     *
     * @example
     *
     * const StyledPreview = styled.div${'`height: 100%; ${darkSber[":root"]};background-image: ${gradient};`'}
     *
     */
    styledPreview?: string;
    /**
     * Зависимости для сниппета
     */
    dependencies?: {
        [key: string]: string;
    };
    /**
     * Контент для кнопки
     */
    content?: string | JSX.Element;
}

export const CodeSandbox: FC<CodeSandboxProps> = ({ source, sandboxName, dependencies, styledPreview, content }) => {
    const index = useMemo(() => getIndexStyle(styledPreview), [styledPreview]);

    const parameters = useMemo(
        () =>
            getParameters({
                files: {
                    'package.json': {
                        isBinary: false,
                        // eslint-disable-next-line
                        // @ts-ignore
                        content: {
                            name: sandboxName,
                            dependencies: {
                                react: '17.0.1',
                                'react-dom': '17.0.1',
                                'styled-components': '^5.3.1',
                                ...dependencies,
                            },
                        },
                    },
                    'src/index.js': {
                        isBinary: false,
                        content: index,
                    },
                    'src/App.js': {
                        isBinary: false,
                        content: source,
                    },
                    'src/style.css': {
                        isBinary: false,
                        content: style,
                    },
                    'public/index.html': {
                        isBinary: false,
                        content: html,
                    },
                },
            }),
        [source, sandboxName, dependencies],
    );

    const query = qs.stringify({
        theme: 'dark',
        module: 'src/App.js',
    });

    const urlParameters = qs.stringify({
        parameters,
        query,
    });

    return (
        <StyledLink
            href={`https://codesandbox.io/api/v1/sandboxes/define?${urlParameters}`}
            target="_blank"
            rel="noopener noreferrer"
        >
            {content}
        </StyledLink>
    );
};
