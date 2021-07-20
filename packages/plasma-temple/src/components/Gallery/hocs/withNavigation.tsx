import React from 'react';
import styled from 'styled-components';

import { useVoiceNavigation, useRemoteHandlers } from '../../../hooks';
import { useFocusedState } from '../../../hooks/useFocusedState';
import { GalleryProps, GalleryWithNavigationProps, WithNavigationProps } from '../types';

export const GalleryIndexContext = React.createContext(0);

const StyledFocusableContainer = styled.div`
    outline: none;
`;

export const withNavigation = (
    Component: React.ComponentType<GalleryProps>,
): React.ForwardRefExoticComponent<GalleryWithNavigationProps> =>
    React.forwardRef<HTMLDivElement, WithNavigationProps & GalleryProps>(
        ({ axis = 'x', activeIndex = -1, ...props }, ref) => {
            const containerRef = React.useRef<HTMLDivElement>(null);

            React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement, []);

            const galleryInFocus = useFocusedState(containerRef);

            const maxIndex = props.items ? props.items.length - 1 : 0;

            const [currentCardIndex, setCurrentCardIndex] = useRemoteHandlers({
                initialIndex: activeIndex,
                axis,
                min: 0,
                max: maxIndex,
                disable: !galleryInFocus,
                repeat: false,
            });

            useVoiceNavigation({
                axis,
                index: currentCardIndex,
                setIndex: setCurrentCardIndex,
                maxIndex,
                disabled: !galleryInFocus,
            });

            const handleEnter = React.useCallback(
                (e: KeyboardEvent) => {
                    if (galleryInFocus && props.items && e.key.toLowerCase() === 'enter') {
                        const currentCard = props.items[currentCardIndex];

                        if (!currentCard) {
                            return;
                        }

                        props.onItemClick?.(currentCard, currentCardIndex);
                    }
                },
                [galleryInFocus, props, currentCardIndex],
            );

            React.useEffect(() => {
                window.addEventListener('keydown', handleEnter);

                return () => {
                    window.removeEventListener('keydown', handleEnter);
                };
            }, [handleEnter]);

            return (
                <StyledFocusableContainer tabIndex={0} ref={containerRef}>
                    <GalleryIndexContext.Provider value={galleryInFocus ? currentCardIndex : -1}>
                        <Component {...props} />
                    </GalleryIndexContext.Provider>
                </StyledFocusableContainer>
            );
        },
    );
