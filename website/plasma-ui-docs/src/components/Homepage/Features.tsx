import React, { FC } from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from '@sberdevices/plasma-web';

import { HomepageFeature } from './Feature';

const services = [
    {
        title: 'Plasma UI',
        // eslint-disable-next-line global-require
        Svg: require('../../../static/img/undraw_docusaurus_mountain.svg').default,
        links: [
            { to: '/docs/', text: 'Документация' },
            { to: '/ui-storybook/', text: 'Storybook', external: true },
        ],
    },
    {
        title: 'Plasma Web',
        // eslint-disable-next-line global-require
        Svg: require('../../../static/img/undraw_docusaurus_tree.svg').default,
        links: [
            { to: '/web/', text: 'Документация', external: true },
            { to: '/web-storybook/', text: 'Storybook', external: true },
        ],
    },
    {
        title: 'Иконки',
        // eslint-disable-next-line global-require
        Svg: require('../../../static/img/undraw_docusaurus_react.svg').default,
        links: [{ to: 'https://plasma.sberdevices.ru/icons', text: 'Devices', external: true }],
    },
];

const StyledFeaturesSection = styled.section`
    padding: 2rem 0;
`;

export const HomepageFeatures: FC = () => {
    return (
        <StyledFeaturesSection>
            <Container>
                <Row>
                    {services.map((props, idx) => (
                        <Col key={idx} size={4}>
                            <HomepageFeature {...props} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </StyledFeaturesSection>
    );
};
