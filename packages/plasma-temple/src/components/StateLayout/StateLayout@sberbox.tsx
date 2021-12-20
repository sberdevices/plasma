import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import { Headline1, Headline3 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { GetStyledComponentProps } from '../../types';

import { StateLayout as CommonStateLayout } from './StateLayout@common';
import { StateLayoutCommonProps } from './types';

type StyledComponentProps = GetStyledComponentProps<typeof Headline3>;
type StyledTextNode = StyledComponent<'div', any, StyledComponentProps, never>;

const StyledTextWrapper = styled.div`
    margin-bottom: 2rem;
`;

const StyledText: StyledTextNode = styled(Headline3)`
    margin-top: 1rem;
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
