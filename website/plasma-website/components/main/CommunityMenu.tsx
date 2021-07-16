import type { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { link, linkHover } from '@sberdevices/plasma-tokens-b2c';

import { List, Item, Link } from './Menu';
import type { MenuProps, MenuItem } from './Menu';

export interface CommunityMenuProps extends MenuProps {
    items: Array<MenuItem & { contentLeft?: ReactNode }>;
}

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    color: ${link};

    &:hover {
        color: ${linkHover};
    }
`;
const StyledContent = styled.span`
    margin-right: 0.5rem;
`;

export const CommunityMenu: FC<CommunityMenuProps> = ({ items, style, className }) => (
    <nav style={style} className={className}>
        <List>
            {items.map((item, i) => (
                <Item key={`item:${i}`}>
                    <StyledLink as="a" href={item.href}>
                        {item.contentLeft && <StyledContent>{item.contentLeft}</StyledContent>}
                        {item.title}
                    </StyledLink>
                </Item>
            ))}
        </List>
    </nav>
);
