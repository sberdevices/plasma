import React from 'react';
import styled from 'styled-components';
import { Headline2, Body1 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { StateLayout as CommonStateLayout } from './StateLayout@common';
import { StateLayoutCommonProps } from './types';

const StyledTextWrapper = styled.div`
    margin-bottom: 1.5rem;
`;

const StyledText = styled(Body1)`
    margin-top: 0.75rem;
    hyphens: none;
    color: ${secondary};
`;

const StyledImageWrapper = styled.div`
    margin-left: auto;
    width: 408px;
`;

export const StateLayoutSberPortal: React.FC<StateLayoutCommonProps> = (props) => (
    <CommonStateLayout
        {...props}
        platformComponents={{
            Headline: Headline2,
            TextWrapper: StyledTextWrapper,
            Text: StyledText,
            ImageContainer: StyledImageWrapper,
        }}
    />
);
