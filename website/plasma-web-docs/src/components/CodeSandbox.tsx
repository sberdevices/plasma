import React, { FC } from 'react';
import { CodeSandbox as CodeSandboxView } from '@sberdevices/plasma-docs-ui';
import IconExternalLink from '@theme/IconExternalLink';
import styled from 'styled-components';

import packageJson from '../../package.json';

const StyledText = styled.span`
    margin-left: 6px;
`;

const sberdevicesDependencies = Object.entries(packageJson.dependencies)
    .filter(([key]) => key.startsWith('@sberdevices') && !key.includes('plasma-docs-ui'))
    .reduce((acc: Record<string, string>, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});

const indexSource = `import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { light } from "@sberdevices/plasma-tokens-b2b/themes";
import { b2b } from '@sberdevices/plasma-tokens-b2b/typo';

import { App } from "./App";
import "./style.css";

const StyledPreview = styled.div\`
    \${light[":root"]};
    \${b2b[":root"]};

    padding: 1rem; 

    > div { 
        display: flex; 
        gap: 1rem; 
    }
\`
    
ReactDOM.render(
    <StyledPreview>
        <App />
    </StyledPreview>,
    document.getElementById("root")
);`;

export const CodeSandbox: FC<{ source: string }> = ({ source }) => {
    return (
        <CodeSandboxView
            source={source}
            content={
                <>
                    <IconExternalLink />
                    <StyledText>Open in CodeSandbox</StyledText>
                </>
            }
            sandboxName="plasma-web-example"
            dependencies={sberdevicesDependencies}
            indexSource={indexSource}
        />
    );
};
