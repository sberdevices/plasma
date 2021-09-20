import React from 'react';
import styled from 'styled-components';
import throttle from 'lodash.throttle';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';
import { Row } from '@sberdevices/plasma-ui';

import { Header } from '../../components/Header/Header';
import { useSpatNavBetweenTargets } from '../../hooks/useSpatNav';
import { useVoiceNavigationWithSpatNav } from '../../hooks/useVoiceNavigation';
import { scroll } from '../../utils/scroll';
import { FullScreenBackground } from '../ItemPage/components/FullScreenBackground/FullScreenBackground';

import { GridEntity, GridPageState } from './types';
import { GridCard, GridCardProps } from './components/GridCard';

interface GridPageProps {
    state: GridPageState;
    header?: HeaderProps;
    onItemShow?: (val: GridEntity) => void;
    onScrollBottom?: () => void;
    children?(props: GridCardProps & { key: string }): JSX.Element;
}

const scrollToWithOffset = (offset: number) => {
    const targetOffset = offset <= 250 ? 0 : offset - 250;

    scroll({
        element: window,
        startPosition: window.scrollY,
        offset: targetOffset - window.scrollY,
        duration: 300,
        axis: 'y',
    });
};

const ContentSection = styled.section`
    margin-top: 1.5rem;
`;

export const GridPage: React.FC<GridPageProps> = ({ state, header, onItemShow, onScrollBottom, children }) => {
    const { items, background } = state;

    const list = React.useMemo(
        () =>
            items.map((child, index) => ({
                ...child,
                onClick: () => onItemShow?.(child),
                onKeyDown: ({ key }: React.KeyboardEvent) => key === 'Enter' && onItemShow?.(child),
                url: child.image.src,
                order: index + 1,
                uuid: child.id,
            })),
        [items, onItemShow],
    );

    useVoiceNavigationWithSpatNav({ axis: 'y', main: true });
    useSpatNavBetweenTargets<HTMLElement>('y', ({ offsetTop }) => scrollToWithOffset(offsetTop));

    // Необходимо сбросить первоночально установленную точку, чтобы старт навигации был с сфокусированного элемента
    React.useEffect(() => {
        // eslint-disable-next-line no-underscore-dangle
        window.__spatialNavigation__?.setStartingPoint();
    }, []);

    React.useEffect(() => {
        if (!onScrollBottom) {
            return;
        }
        const onScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                onScrollBottom();
            }
        };
        const throttledScroll = throttle(onScroll, 100);
        window.addEventListener('scroll', throttledScroll, { capture: false, passive: true });
        return () => window.removeEventListener('scroll', throttledScroll);
    }, [onScrollBottom]);

    return (
        <>
            {header && <Header {...header} />}

            {background && <FullScreenBackground src={background.src} />}

            <ContentSection>
                <Row>
                    {list.map((item) => {
                        if (children) {
                            return children({ key: item.uuid, ...item });
                        }

                        return <GridCard key={item.uuid} {...item} />;
                    })}
                </Row>
            </ContentSection>
        </>
    );
};

export default GridPage;