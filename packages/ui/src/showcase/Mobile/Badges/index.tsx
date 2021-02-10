import React from 'react';
import styled from 'styled-components';
import { IconSettings } from '@sberdevices/plasma-icons';

import { ShowcaseDashedBorder } from '../../../helpers';
import { Badge as BadgeComponent } from '../../../components/Badge';
import { Panel } from '../../Panel';

const Row = styled.div`
    display: flex;
    align-items: center;
`;

export const Badge: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => (
    <Panel {...props}>
        <ShowcaseDashedBorder style={{ width: '3.375rem', marginRight: 80 }}>
            <Row>
                <BadgeComponent circled text="#" size="s" view="primary" style={{ marginRight: 20 }} />
                <BadgeComponent circled text="11" size="s" view="primary" />
            </Row>
        </ShowcaseDashedBorder>
        <BadgeComponent text="42:18" size="s" view="index" style={{ marginRight: 80 }} />
        <ShowcaseDashedBorder style={{ width: '3.375rem', marginRight: 80 }}>
            <Row>
                <BadgeComponent circled text="1" size="l" view="index" style={{ marginRight: 20 }} />
                <BadgeComponent circled text="1" size="s" view="index" />
            </Row>
        </ShowcaseDashedBorder>
        <ShowcaseDashedBorder style={{ width: '9rem' }}>
            <Row>
                <BadgeComponent view="primary" text="Badge" size="l" style={{ marginRight: 20 }} />
                <BadgeComponent view="primary" text="Badge" size="l" contentLeft={<IconSettings size="xs" />} />
            </Row>
        </ShowcaseDashedBorder>
    </Panel>
);
