import React, { FC, HTMLAttributes, useMemo } from 'react';
import { getParameters } from 'codesandbox/lib/api/define';
import styled from 'styled-components';

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

const index = `import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./style.css";

ReactDOM.render(<App />, document.getElementById("root"))`;

const StyledIframe = styled.iframe`
    width: 100%;
    height: 500px;
    border: 0;
    overflow: hidden;
`;

export interface CodeSandboxProps extends HTMLAttributes<HTMLIFrameElement> {
    source: string;
    packageName: string;
}

export const CodeSandbox: FC<CodeSandboxProps> = ({ source, packageName }) => {
    const parameters = useMemo(
        () =>
            getParameters({
                files: {
                    'package.json': {
                        isBinary: false,
                        // eslint-disable-next-line
                        // @ts-ignore
                        content: {
                            name: packageName,
                            dependencies: {
                                react: '17.0.1',
                                'react-dom': '17.0.1',
                                'styled-components': '^5.3.1',
                                '@sberdevices/plasma-web': '1.54.3',
                                '@sberdevices/plasma-icons': '1.48.2',
                                '@sberdevices/plasma-tokens-web': '1.13.1',
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
        [source, packageName],
    );

    const query = new URLSearchParams({
        theme: 'light',
        module: '/App.js',
    }).toString();

    const urlParameters = new URLSearchParams({
        parameters,
        query,
        embed: '1',
    }).toString();

    return (
        <StyledIframe
            src={`https://codesandbox.io/api/v1/sandboxes/define?${urlParameters}`}
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
    );
};
