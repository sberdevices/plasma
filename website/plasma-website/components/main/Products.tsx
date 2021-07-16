import type { FC } from 'react';
import styled, { css } from 'styled-components';
import { H2, BodyL, TextS } from '@sberdevices/plasma-b2c';
import { whitePrimary, whiteSecondary, whiteTertiary, accent, dark02 } from '@sberdevices/plasma-tokens-b2c';

import { Badge } from '../Badge';

interface ProductsProps {
    items: Array<{
        title: string;
        description: string;
        links?: Array<{ text: string; href?: string; soon?: boolean }>;
        soon?: boolean;
    }>;
    children?: never;
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    gap: calc(var(--plasma-grid-gutter) * 2);
    width: 44.25rem;
`;
const Item = styled.div`
    position: relative;
`;
const Card = styled.div<{ $disabled?: boolean }>`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    height: 12.875rem;
    padding: 1.25rem 1.5rem;

    background-color: ${dark02};
    color: ${whitePrimary};
    border-radius: 1rem;

    ${({ $disabled }) =>
        $disabled &&
        css`
            opacity: 0.4;
        `}
`;
const Title = styled(H2)`
    color: ${whitePrimary};
`;
const Description = styled(TextS)`
    color: ${whiteSecondary};
`;
const Soon = styled(BodyL)`
    margin-top: auto;
    text-align: center;
    color: ${whitePrimary};
`;
const SoonEffect = styled.div`
    position: absolute;
    left: 0.75rem;
    right: 0.75rem;
    bottom: 0.875rem;
    height: 2rem;
    background: linear-gradient(89.83deg, #5e94ff 0%, #43dbfa 100%);
    filter: blur(40px);
    border-radius: 16px;
`;
const LinkList = styled.ul`
    margin: 0;
    margin-top: auto;
    padding: 0;
    list-style: none;
`;
const LinkItem = styled(BodyL)`
    display: inline-flex;
    align-items: center;
    color: ${whiteTertiary};

    ${Badge} {
        font-weight: normal;
    }
`;
const LinkTitle = styled.a`
    color: ${whitePrimary};
    text-decoration: none;

    &:hover {
        color: ${accent};
        text-decoration: none;
    }
`;

export const Products: FC<ProductsProps> = ({ items }) => (
    <Grid>
        {items.map((item, i) => (
            <Item key={`item:${i}`}>
                <Card $disabled={item.soon}>
                    <Title mb="2x">{item.title}</Title>
                    <Description>{item.description}</Description>
                    {item.soon && <Soon>скоро</Soon>}
                    {item.links && item.links.length && (
                        <LinkList>
                            {item.links.map((link, j) => (
                                <LinkItem key={`link:${i}${j}`} mt="6x" mr="12x">
                                    {!link.soon ? (
                                        <LinkTitle href={link.href}>{link.text}</LinkTitle>
                                    ) : (
                                        <>
                                            <span>{link.text}</span>
                                            <Badge text="скоро" />
                                        </>
                                    )}
                                </LinkItem>
                            ))}
                        </LinkList>
                    )}
                </Card>
                {item.soon && <SoonEffect />}
            </Item>
        ))}
    </Grid>
);
