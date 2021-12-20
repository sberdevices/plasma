import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import { Headline2, Body1 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { GetStyledComponentProps } from '../../types';

import { StateLayout as CommonStateLayout } from './StateLayout@common';
import { StateLayoutCommonProps } from './types';

type StyledComponentProps = GetStyledComponentProps<typeof Body1>;
type StyledTextNode = StyledComponent<'div', any, StyledComponentProps, never>;

const StyledTextWrapper = styled.div`
    margin-bottom: 2rem;
`;

const StyledText: StyledTextNode = styled(Body1)`
    margin-top: 0.75rem;
    margin-bottom: 1rem;
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
