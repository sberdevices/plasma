import React from 'react';
import styled from 'styled-components';
import { Badge } from '@sberdevices/plasma-ui/components/Badge';

import {
    ShowcasePanel,
    ShowcaseDashedBorder,
    ShowcaseSectionName,
    IconPlaceholder,
    UIStoryDecorator,
    InContainerDecorator,
} from '../../helpers';

export default {
    title: 'Showcase/Device',
    decorators: [UIStoryDecorator, InContainerDecorator],
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

const Row = styled.div`
    display: flex;
    align-items: center;
`;

const Showcase: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <ShowcasePanel {...props}>
        <ShowcaseDashedBorder style={{ width: '3.375rem', marginRight: 80 }}>
            <Row>
                <Badge circled text="#" size="s" view="primary" style={{ marginRight: 20 }} />
                <Badge circled text="11" size="s" view="primary" />
            </Row>
        </ShowcaseDashedBorder>
        <Badge text="42:18" size="s" view="secondary" style={{ marginRight: 80 }} />
        <ShowcaseDashedBorder style={{ width: '3.375rem', marginRight: 80 }}>
            <Row>
                <Badge circled text="1" size="l" view="secondary" style={{ marginRight: 20 }} />
                <Badge circled text="1" size="s" view="secondary" />
            </Row>
        </ShowcaseDashedBorder>
        <ShowcaseDashedBorder style={{ width: '9rem' }}>
            <Row>
                <Badge view="primary" text="Badge" size="l" style={{ marginRight: 20 }} />
                <Badge view="primary" text="Badge" size="l" contentLeft={<IconPlaceholder size="xs" />} />
            </Row>
        </ShowcaseDashedBorder>
    </ShowcasePanel>
);

export const Badges = () => (
    <>
        <ShowcaseSectionName title="Badges" subTitle="Небольшие бирки для ячеек и карточек" />
        <Showcase style={{ maxWidth: '46rem' }} />
    </>
);
