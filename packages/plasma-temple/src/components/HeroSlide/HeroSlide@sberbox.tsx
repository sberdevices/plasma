import React from 'react';
import styled from 'styled-components';
import { Body1, Button, ButtonProps, Headline2 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { HeroSlide as CommonSlide, HeroSlideProps } from './HeroSlide';

const StyledTitle = styled(Headline2)`
    margin-bottom: 1.375rem;
`;

const StyledSuggestText = styled(Body1)`
    margin-bottom: 0.75rem;
    color: ${secondary};
`;

const StyledSlide = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 840px;

    box-sizing: border-box;

    padding: 248px var(--plasma-grid-margin) 4 rem;
`;

const BoxButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
    <Button {...props} view="primary" size="m" ref={ref} />
));

export const HeroSlide: React.FC<HeroSlideProps> = (props) => (
    <CommonSlide
        platformComponents={{
            Title: StyledTitle,
            Suggest: StyledSuggestText,
            Button: BoxButton,
            Wrapper: StyledSlide,
        }}
        {...props}
    />
);
