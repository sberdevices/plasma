import React from 'react';
import styled from 'styled-components';
import { Button, ButtonProps, Headline2 } from '@sberdevices/plasma-ui';

import { HeroSlide as CommonSlide, HeroSlideProps } from './HeroSlide';

const StyledSuggestText = () => null;

const StyledTitle = styled(Headline2)`
    margin-bottom: 1.125rem;
`;

const StyledSlide = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 560px;

    box-sizing: border-box;

    padding: 200px var(--plasma-grid-margin) 1.75rem;
`;

const PortalButton: React.FC<ButtonProps> = (props) => <Button {...props} view="primary" size="s" />;

export const HeroSlide: React.FC<HeroSlideProps> = (props) => (
    <CommonSlide
        platformComponents={{
            Title: StyledTitle,
            Suggest: StyledSuggestText,
            Button: PortalButton,
            Wrapper: StyledSlide,
        }}
        {...props}
    />
);
