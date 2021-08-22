import React, { FC } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styled from 'styled-components';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Container, Headline1, Headline4, Button } from '@sberdevices/plasma-web';

const StyledHero = styled.div`
    text-align: center;
    background: #edf3ff;
`;
const StyledContainer = styled(Container)`
    padding-top: 3rem;
    padding-bottom: 3rem;
`;

export const HomepageHeader: FC = () => {
    const mainLink = useBaseUrl('/docs/ui/intro');
    const { siteConfig } = useDocusaurusContext();

    return (
        <StyledHero>
            <StyledContainer>
                <Headline1 mb="8x">{siteConfig.title}</Headline1>
                <Headline4 mb="8x">{siteConfig.tagline}</Headline4>
                <div>
                    <Button forwardedAs="a" view="primary" href={mainLink}>
                        Начать работу
                    </Button>
                </div>
            </StyledContainer>
        </StyledHero>
    );
};
