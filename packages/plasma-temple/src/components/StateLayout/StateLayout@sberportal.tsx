import React from 'react';
import styled from 'styled-components';
import { Headline2, Body1 } from '@sberdevices/plasma-core';
import { secondary } from '@sberdevices/plasma-tokens';

import { StateLayout as CommonStateLayout } from './StateLayout@common';
import { StateLayoutCommonProps } from './types';

const StyledTextWrapper = styled.div`
    margin-bottom: 0.75rem;
`;

const StyledText = styled(Body1)`
    margin-top: 0.75rem;
    margin-bottom: 1rem;
    color: ${secondary};
`;

const StyledImageWrapper = styled.div`
    margin-left: auto;
    width: 408px;
`;

export const StateLayout: React.FC<StateLayoutCommonProps> = (props) => (
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
