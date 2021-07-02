import React from 'react';
import styled from 'styled-components';
import { Col, Row } from '@sberdevices/plasma-ui';
import { isSberBox } from '@sberdevices/plasma-ui/utils';

import { FullScreenBackground } from '../FullScreenBackground/FullScreenBackground';
import { useFocusOnMount } from '../../hooks/useFocusOnMount';
import { UnifiedComponentProps } from '../../registry/types';

export interface HeroSlideProps {
    src: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    title: string;
    buttonText: string;
    onFocus: React.FocusEventHandler<HTMLButtonElement>;
    onBlur: React.FocusEventHandler<HTMLButtonElement>;
}

const StyledRow = styled(Row)`
    position: relative;
    z-index: 1;
`;

export const HeroSlide: React.FC<UnifiedComponentProps<HeroSlideProps, 'Title' | 'Suggest' | 'Button' | 'Wrapper'>> = ({
    title,
    buttonText,
    src,
    onClick,
    onFocus,
    onBlur,
    platformComponents,
    children,
}) => {
    const { Title, Suggest, Button, Wrapper } = platformComponents;
    const mountRef = React.useRef<HTMLButtonElement>(null);
    useFocusOnMount(mountRef, { delay: 100 });

    return (
        <Wrapper>
            <StyledRow>
                <Col sizeXL={6} sizeM={4}>
                    <Suggest>Попробуйте спросить</Suggest>
                    <Title>{title}</Title>
                    <Button onClick={onClick} onFocus={onFocus} onBlur={onBlur} ref={isSberBox() ? mountRef : null}>
                        {buttonText}
                    </Button>
                </Col>
            </StyledRow>
            {children}
            <FullScreenBackground src={src} />
        </Wrapper>
    );
};
