import React  from 'react';
import styled from 'styled-components';
import { CarouselCol, Card, CardBody, CardMedia, CardBody1, CardBadge, CardContent, Caption } from '@sberdevices/ui';
import { IconClock } from '@sberdevices/plasma-icons';
import { overlay, primary } from '@sberdevices/plasma-tokens';
import { isSberBox } from '@sberdevices/ui/utils';
import { GalleryItemViewPayload } from '../../../..';

interface GalleryCardProps {
    card: GalleryItemViewPayload;
    position: number;
    index: number;
    imageSrc: string;
    onClick: (card: GalleryItemViewPayload) => void;
    onFocus: (index: number) => void;
}

const StyledCardIndex = styled(CardBadge)`
    position: absolute;
    top: 16px;
    left: 16px;
`;

const StyledTag = styled(CardBadge)`
    position: absolute;
    bottom: 16px;
    left: 16px;
    padding: 6px 14px;

    padding: 4px 12px;
    font-weight: 500;
    font-size: 20px;
    text-transform: none;
    line-height: 20px;

    border-radius: 12px;
    background-color: ${overlay};
    backdrop-filter: blur(10px);
`;

const StyledCardContent = styled(CardContent)`
    display: flex;
    flex: 1;
    flex-direction: column;

    min-height: 200px;
`;

const StyledAdditionalContent = styled.div`
    display: flex;
    align-items: center;

    margin-top: auto;

    opacity: 0.47;
    color: ${primary};
`;

const StyledCaption = styled(Caption)`
    margin-bottom: 0;
    margin-left: 4px;
`;

const Time: React.FC<{ time: string }> = ({ time }) => (
    <>
        <IconClock size="xs" />
        <StyledCaption>{time}</StyledCaption>
    </>
);

export const GalleryCard: React.FC<GalleryCardProps> = ({card, position, index, imageSrc, onClick, onFocus }) => {
    const cardRef = React.useRef<HTMLDivElement | null>(null);

    React.useLayoutEffect(() => {
        if (position === index && isSberBox()) {
            cardRef.current?.focus({ preventScroll: true });
        }
    }, [position, index]);

    const handleClick = React.useCallback(() => onClick(card), [card, onClick]);
    const handleFocus = React.useCallback(() => onFocus(index), [index, onFocus]);

    return (
        <CarouselCol sizeXL={3} sizeL={2} sizeM={2}>
            <Card
                focused={position === index}
                tabIndex={0}
                onClick={handleClick}
                onFocus={handleFocus}
                data-cy={`gallery-card-${index}`}
                ref={cardRef}
            >
                <CardBody>
                    <CardMedia src={imageSrc} ratio={card.image.ratio ?? '1 / 1'} data-cy="gallery-card-media" >
                        {card.position && (
                            <StyledCardIndex view="index" size="l" circled text={String(card.position)} />
                        )}
                        {typeof card.tag === 'string' && (
                            <StyledTag view="secondary" size="s" text={card.tag} />
                        )}
                    </CardMedia>
                    <StyledCardContent>
                        <CardBody1 lines={2}>{card.label}</CardBody1>
                        <StyledAdditionalContent>
                            {card.time != null && <Time time={card.time} />}
                        </StyledAdditionalContent>
                    </StyledCardContent>
                </CardBody>
            </Card>
        </CarouselCol>
    );
};
