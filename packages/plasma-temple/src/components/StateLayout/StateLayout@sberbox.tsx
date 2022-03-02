import React from 'react';
import styled from 'styled-components';
import { Headline1, Headline3 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { StateLayout as CommonStateLayout } from './StateLayout@common';
import { StateLayoutCommonProps } from './types';

const StyledTextWrapper = styled.div`
    margin-bottom: 2rem;
`;

const StyledText = styled(Headline3)`
    margin-top: 1rem;
    hyphens: none;
    color: ${secondary};
`;

const StyledImageWrapper = styled.div`
    margin-left: auto;
    width: 656px;
`;

export const StateLayoutSberBox: React.FC<StateLayoutCommonProps> = (props) => (
    <CommonStateLayout
        {...props}
        platformComponents={{
            Headline: Headline1,
            Text: StyledText,
            TextWrapper: StyledTextWrapper,
            ImageContainer: StyledImageWrapper,
        }}
    />
);
