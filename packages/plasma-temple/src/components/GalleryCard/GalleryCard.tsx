import React from 'react';
import styled, { css } from 'styled-components';
import { Card, CardBody, CardMedia, CardBody1, CardBadge, CardContent, Caption } from '@sberdevices/plasma-ui';
import { IconClock } from '@sberdevices/plasma-icons';
import { overlay, primary } from '@sberdevices/plasma-tokens';
import { mediaQuery } from '@sberdevices/plasma-ui/utils';

import { GalleryCardParams as GalleryCardType } from '../../pages/GalleryPage/types';
import { AnyObject } from '../../types';
import { getMediaObjectSrc } from '../../utils/getMediaObjectSrc';

export interface GalleryCardProps<T extends AnyObject = AnyObject> {
    card: GalleryCardType<T>;
    index: number;
    onClick: <T1 extends T>(cardProps: T1, index: number) => void;
    onFocus?: () => void;
    focused?: boolean;
    tabIndex?: number;
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

const StyledCard = styled(Card)`
    width: 392px;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            width: 332px;
        `,
    )}
`;

const GalleryCardComponent = <T extends AnyObject = AnyObject>({
    card,
    focused,
    index,
    tabIndex = -1,
    onClick,
    onFocus,
}: GalleryCardProps<T>): React.ReactElement => {
    const handleClick = React.useCallback(() => onClick(card, index), [card, index, onClick]);

    return (
        <StyledCard
            focused={focused}
            tabIndex={tabIndex}
            onClick={handleClick}
            onFocus={onFocus}
            data-cy={`gallery-card-${index}`}
        >
            <CardBody>
                <CardMedia
                    base="div"
                    src={getMediaObjectSrc(card.image)}
                    ratio={card.image.ratio ?? '1 / 1'}
                    data-cy="gallery-card-media"
                >
                    {card.position && (
                        <StyledCardIndex view="secondary" size="l" circled text={String(card.position)} />
                    )}
                    {typeof card.tag === 'string' && <StyledTag view="secondary" size="s" text={card.tag} />}
                </CardMedia>
                <StyledCardContent>
                    <CardBody1 lines={2}>{card.label}</CardBody1>
                    <StyledAdditionalContent>{card.time != null && <Time time={card.time} />}</StyledAdditionalContent>
                </StyledCardContent>
            </CardBody>
        </StyledCard>
    );
};

export const GalleryCard = React.memo(GalleryCardComponent);
