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

const styledPreview = `
import { gradient } from '@sberdevices/plasma-tokens';
import { darkSber } from '@sberdevices/plasma-tokens/themes';

const StyledPreview = styled.div\`
    \${darkSber[":root"]};
    height: 100%;
    background-image: \${gradient};

    padding: 1rem; 
    > div { 
        display: flex; 
        gap: 1rem; 
    }
\``;

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
            sandboxName="plasma-ui-example"
            dependencies={sberdevicesDependencies}
            styledPreview={styledPreview}
        />
    );
};
