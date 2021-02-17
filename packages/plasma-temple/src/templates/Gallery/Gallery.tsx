import React from 'react';
import styled from 'styled-components';
import { CardBadge, CardBody1, CardMedia, CardBody, CardContent, Card } from '@sberdevices/ui/components/Card';
import { Carousel, CarouselCol, CarouselGridWrapper } from '@sberdevices/ui/components/Carousel';
import { Row } from '@sberdevices/ui/components/Grid';
import { isSberPortal } from '@sberdevices/ui/utils';
import { Headline3, Caption } from '@sberdevices/ui/components/Typography';
import { overlay, primary } from '@sberdevices/plasma-tokens';
import { IconClock } from '@sberdevices/plasma-icons/Icons/IconClock';

import { useAssistantState } from '../../hooks/useAssistantState';
import { setPositionAction } from '../../store/actions';
import { PageProps, GalleryViewPayload, GalleryItemViewPayload, Screen } from '../../types';
import { useActiveElementClick } from '../../hooks/useSpatNav';
import { Header } from '../../components/Header/Header';

const StyledCardIndex = styled(CardBadge)`
    position: absolute;
    top: 16px;
    left: 16px;
`;

const StyledCardContent = styled(CardContent)`
    display: flex;
    flex: 1;
    flex-direction: column;

    min-height: 200px;
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

const StyledRow = styled(Row)`
    padding: 1rem 0;
    box-sizing: border-box;
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

export const Gallery: React.FC<PageProps<GalleryViewPayload>> = ({
    data,
    stateRef,
    position,
    dispatch,
    header,
    sendData,
}) => {
    const onFocusHandler = React.useCallback(
        (index: number) => {
            dispatch(setPositionAction({ position: index }));
        },
        [dispatch]
    );

    const onClickHandler = React.useCallback(
        (item: GalleryItemViewPayload) => {
            sendData({
                name: 'REQUEST_DATA',
                action: {
                    action_id: 'ITEM/SHOW',
                    parameters: { id: item.id },
                },
            });
        },
        [sendData]
    );

    useActiveElementClick();

    useAssistantState(stateRef, {
        screen: Screen.gallery,
        item_selector: {
            items: data.items.map((item) => ({
                title: item.label,
                number: Number(item.position),
                id: item.id,
                action: {
                    type: 'ITEM/SHOW',
                    payload: { id: item.id },
                },
            })),
        },
    });

    React.useLayoutEffect(() => {
        if (sendData) {
            sendData({
                action: {
                    action_id: 'PAGE_LOADED',
                },
            });
        }
    }, [sendData]);

    const galleryItems: React.ReactChild[] = React.useMemo(() => {
        return data.items.map(
            (item, index): React.ReactChild => {
                const imageSrc = Array.isArray(item.image.src) ? item.image.src[0] : item.image.src;

                return (
                    <CarouselCol sizeXL={3} sizeL={2} sizeM={2}>
                        <Card
                            focused={position === index}
                            tabIndex={0}
                            onClick={() => onClickHandler(item)}
                            onFocus={() => onFocusHandler(index)}
                        >
                            <CardBody>
                                <CardMedia src={imageSrc} ratio={item.image.ratio ?? '1:1'}>
                                    {item.position && (
                                        <StyledCardIndex view="index" size="l" circled text={String(item.position)} />
                                    )}
                                    {typeof item.tag === 'string' && (
                                        <StyledTag view="secondary" size="s" text={item.tag} />
                                    )}
                                </CardMedia>
                                <StyledCardContent>
                                    <CardBody1 lines={2}>{item.label}</CardBody1>
                                    <StyledAdditionalContent>
                                        {item.time != null && <Time time={item.time} />}
                                    </StyledAdditionalContent>
                                </StyledCardContent>
                            </CardBody>
                        </Card>
                    </CarouselCol>
                );
            },
        );
    }, [data.items, onClickHandler, onFocusHandler, position]);

    return (
        <>
            <Header title={header.title} logo={header.logo} />
            {data && (
                <>
                    {isSberPortal() ? null : <Headline3>{data.title}</Headline3>}
                    <CarouselGridWrapper>
                        <Carousel as={StyledRow} axis="x" index={position} detectActive={false} animatedScrollByIndex>
                            {galleryItems}
                        </Carousel>
                    </CarouselGridWrapper>
                </>
            )}
        </>
    );
};

export default Gallery;
