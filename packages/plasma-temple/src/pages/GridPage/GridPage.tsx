import React from 'react';
import { HeaderProps } from '@sberdevices/plasma-ui/components/Header/Header';
import { Row } from '@sberdevices/plasma-ui';

import { Header } from '../../components/Header/Header';
import { useSpatNav } from '../../hooks/useSpatNav';
import { useVoiceNavigationWithSpatNav } from '../../hooks/useVoiceNavigation';
import { scroll } from '../../utils/scroll';
import { FullScreenBackground } from '../ItemPage/components/FullScreenBackground/FullScreenBackground';
import { Section } from '../ItemPage/components/Section/Section';

import { GridPageState } from './types';
import { GridCard, GridCardProps } from './components/GridCard';

interface GridPageProps {
    state: GridPageState;
    header?: HeaderProps;
    onItemShow: (id: string) => void;
    children?(props: GridCardProps & { key: string }): JSX.Element;
}

const scrollToWithOffset = (offset: number) => {
    const targetOffset = offset <= 0 ? offset : offset - 100;

    scroll({
        element: window,
        startPosition: window.scrollY,
        offset: targetOffset - window.scrollY,
        duration: 300,
        axis: 'y',
    });
};

export const GridPage: React.FC<GridPageProps> = ({ state, header, onItemShow, children }) => {
    const { items, background } = state;

    const list = React.useMemo(
        () =>
            items.map((child, index) => ({
                ...child,
                onClick: () => onItemShow(child.id),
                onKeyDown: ({ key }: React.KeyboardEvent) => key === 'Enter' && onItemShow(child.id),
                url: child.image.src,
                order: index + 1,
                uuid: child.id,
            })),
        [items, onItemShow],
    );

    useVoiceNavigationWithSpatNav({ axis: 'y', main: true });
    useSpatNav<HTMLElement>(({ offsetTop }) => scrollToWithOffset(offsetTop));

    // Необходимо сбросить первоночально установленную точку, чтобы старт навигации был с сфокусированного элемента
    React.useEffect(() => {
        // eslint-disable-next-line no-underscore-dangle
        window.__spatialNavigation__?.setStartingPoint();
    }, []);

    return (
        <>
            {header && <Header {...header} />}

            {background && <FullScreenBackground src={background.src} />}

            <Section>
                <Row>
                    {list.map((item) => {
                        if (children) {
                            return children({ key: item.uuid, ...item });
                        }

                        return <GridCard key={item.uuid} {...item} />;
                    })}
                </Row>
            </Section>
        </>
    );
};

export default GridPage;
