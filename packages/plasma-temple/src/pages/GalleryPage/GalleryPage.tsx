import React from 'react';
import styled from 'styled-components';
import { CarouselGridWrapper, CarouselItem, Container } from '@sberdevices/plasma-ui';

import { useRemoteHandlers } from '../../hooks/useRemoteHandlers';
import { useGetMutableValue } from '../../hooks/useGetMutableValue';
import { Header } from '../../components/Header/Header';
import { ComponentPropsWithHeader } from '../../components/Header/types';
import { GalleryCardParams, GalleryCardProps } from '../../components/GalleryCard/types';
import { AnyObject } from '../../types';
import { GalleryWithNavigation } from '../../components/Gallery/Gallery';
import { GalleryProps } from '../../components/Gallery/types';
import { useRegistry } from '../../hooks/useRegistry';

import { GalleryPageState } from './types';

const ActiveGalleryContext = React.createContext(0);

interface GalleryPageProps<T extends AnyObject = AnyObject> extends ComponentPropsWithHeader {
    state: GalleryPageState<T>;
    changeState: (state: GalleryPageState<T>) => void;
    onCardClick: (card: GalleryCardParams<T>) => void;
    galleryCard?: React.ComponentType<GalleryCardProps<T>>;
}

interface StyledSectionWrapperProps {
    withSpacing: boolean;
}

const StyledCarouselGridWrapper = styled(CarouselGridWrapper)`
    height: 100vh;
`;

const StyledSectionWrapper = styled(CarouselItem)<StyledSectionWrapperProps>`
    scroll-snap-align: start;
    scroll-snap-stop: always;
    ${({ withSpacing }) => withSpacing && { paddingTop: '0.25rem' }}
`;

const StyledFixedHeader = styled(Container)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
`;

const StyledTitleWrapper = styled.div`
    padding-bottom: 0.875rem;
`;

const StyledSectionTitleWrapper = styled.div<{ active: boolean }>`
    padding-bottom: 28px;
    padding-top: 72px;
    transition: transform 0.15s linear;
    transform: translateX(${(props) => (props.active ? '3rem' : undefined)});
`;

interface FocusableGalleryProps {
    index: number;
    title?: string;
    activeCardIndex?: number;
    isMultiple?: boolean;
}

const FocusableGallery: React.FC<FocusableGalleryProps & GalleryProps> = ({
    index,
    title,
    activeCardIndex = -1,
    isMultiple = false,
    ...props
}) => {
    const { FocusableGalleryTitle } = useRegistry();
    const activeIndex = React.useContext(ActiveGalleryContext);
    const isActive = index === activeIndex;
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (isActive) {
            ref.current?.focus();
        } else {
            ref.current?.blur();
        }
    }, [isActive]);

    const titleToRender = React.useMemo(() => {
        if (!title) {
            return null;
        }

        if (isMultiple) {
            return (
                <StyledSectionTitleWrapper active={isActive}>
                    <FocusableGalleryTitle>{title}</FocusableGalleryTitle>
                </StyledSectionTitleWrapper>
            );
        }

        return (
            <StyledTitleWrapper>
                <FocusableGalleryTitle>{title}</FocusableGalleryTitle>
            </StyledTitleWrapper>
        );
    }, [isActive, isMultiple, title]);

    return (
        <StyledSectionWrapper data-cy={`gallery-${index}`} scrollSnapAlign="start" withSpacing={titleToRender === null}>
            {titleToRender}
            <GalleryWithNavigation {...props} activeIndex={activeCardIndex} ref={ref} />
        </StyledSectionWrapper>
    );
};

export interface GalleryPageControl {
    changeActiveGallery: (index: number) => void;
}

export const GalleryPage = React.forwardRef<GalleryPageControl, GalleryPageProps<AnyObject>>(
    ({ state, header, changeState, onCardClick, galleryCard }, ref): React.ReactElement => {
        const { gallery, activeGalleryIndex } = state;
        const galleries = React.useMemo(() => (Array.isArray(gallery) ? gallery : [{ id: 'id', ...gallery }]), [
            gallery,
        ]);

        const isMultipleGalleries = galleries.length > 1;
        const { Carousel } = useRegistry();

        const [galleryIndex, changeGallery] = useRemoteHandlers({
            initialIndex: activeGalleryIndex,
            axis: 'y',
            min: 0,
            max: galleries.length - 1,
            repeat: false,
        });

        const getState = useGetMutableValue(state);
        const getGalleryIndex = useGetMutableValue(galleryIndex);

        const changeActiveCard = React.useCallback(
            (index: number) => {
                const currentState = getState();
                const currentGalleryIndex = getGalleryIndex();
                if (!Array.isArray(currentState.gallery)) {
                    changeState({
                        ...currentState,
                        gallery: { ...currentState.gallery, activeCardIndex: index },
                    });
                } else {
                    const galleryList = currentState.gallery.slice();
                    galleryList[currentGalleryIndex] = {
                        ...currentState.gallery[currentGalleryIndex],
                        activeCardIndex: index,
                    };

                    changeState({
                        ...currentState,
                        gallery: galleryList,
                        activeGalleryIndex: currentGalleryIndex, // меняем индекс активной галлерии в стейте
                    });
                }
            },
            [changeState, getGalleryIndex, getState],
        );

        React.useImperativeHandle(
            ref,
            (): GalleryPageControl => ({
                changeActiveGallery: (index) => changeGallery(index),
            }),
        );

        const handleItemClick = React.useCallback<(card: Parameters<typeof onCardClick>[0], index: number) => void>(
            (card, index) => {
                changeActiveCard(index);
                onCardClick(card);
            },
            [changeActiveCard, onCardClick],
        );

        const innerCarousels = React.useMemo(() => {
            return galleries.map((galleryData, index) => (
                <FocusableGallery
                    key={galleryData.id}
                    isMultiple={isMultipleGalleries}
                    index={index}
                    items={galleryData.items}
                    title={galleryData.title}
                    activeCardIndex={galleryData.activeCardIndex}
                    onItemFocus={() => changeGallery(index)}
                    onItemClick={handleItemClick}
                    Component={galleryCard}
                />
            ));
        }, [changeGallery, galleries, galleryCard, handleItemClick, isMultipleGalleries]);

        const headerToRender = React.useMemo(() => {
            return isMultipleGalleries ? (
                <StyledFixedHeader>
                    <Header {...header} title="" />
                </StyledFixedHeader>
            ) : (
                <Header {...header} />
            );
        }, [header, isMultipleGalleries]);

        return (
            <ActiveGalleryContext.Provider value={galleryIndex}>
                {headerToRender}
                <StyledCarouselGridWrapper>
                    <Carousel axis="y" index={galleryIndex} onIndexChange={changeGallery}>
                        {innerCarousels}
                    </Carousel>
                </StyledCarouselGridWrapper>
            </ActiveGalleryContext.Provider>
        );
    },
) as <T extends AnyObject = AnyObject>(
    props: GalleryPageProps<T> & { ref?: React.Ref<GalleryPageControl> },
) => React.ReactElement;

export default GalleryPage;
