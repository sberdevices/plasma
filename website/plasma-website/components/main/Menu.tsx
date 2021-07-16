import type { HTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { BodyL } from '@sberdevices/plasma-b2c';
import { primary, accent, tertiary } from '@sberdevices/plasma-tokens-b2c';

import { Badge } from '../Badge';
import { Link as BaseLink } from '../Link';

export type MenuItem = {
    title: string;
    href: string;
    soon?: boolean;
    external?: boolean;
};
export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
    items: Array<MenuItem>;
    children?: never;
}

export const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
`;
export const Item = styled(BodyL)`
    display: flex;
    align-items: center;

    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
`;
export const Link = styled(BaseLink)<{ $disabled?: boolean }>`
    color: ${primary};
    text-decoration: none;

    &:hover {
        color: ${accent};
        text-decoration: none;
    }
`;
const DisabledText = styled.span`
    color: ${tertiary};
    cursor: default;
`;

export const Menu: FC<MenuProps> = ({ items, style, className }) => (
    <nav style={style} className={className}>
        <List>
            {items.map((item, i) => (
                <Item key={`item:${i}`}>
                    {!item.soon ? (
                        <Link href={item.href} external={item.external}>
                            {item.title}
                        </Link>
                    ) : (
                        <>
                            <DisabledText>{item.title}</DisabledText>
                            <Badge text="скоро" />
                        </>
                    )}
                </Item>
            ))}
        </List>
    </nav>
);
