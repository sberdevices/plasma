import { FC, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Footnote1, Footnote2 } from '@sberdevices/plasma-web';
import { IconRoot, IconSize } from '@sberdevices/plasma-icons';
import { surfaceLiquid01, surfaceLiquid02, secondary, white } from '@sberdevices/plasma-tokens-web';
import { link, linkHover } from '@sberdevices/plasma-web/tokens';
import { applyNoSelect, applyEllipsis } from '@sberdevices/plasma-web/mixins';

import { Data } from '../types';

import { Grid } from './Grid';

interface IconsListProps {
    activeItemName?: string;
    items: Data;
    size: IconSize;
    onItemClick?: (name: string) => void;
}

const StyledFootnote2 = styled(Footnote2)`
    margin: 2rem 0 1rem;
    color: ${secondary};
`;
const StyledCard = styled.div<{ isActive?: boolean }>`
    ${applyNoSelect};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    padding: 1rem;
    background: ${surfaceLiquid01};
    border-radius: 1rem;

    cursor: pointer;

    &:hover {
        background: ${surfaceLiquid02};
    }

    ${({ isActive }) =>
        isActive &&
        css`
            background: ${link};
            color: ${white};

            &:hover {
                background: ${linkHover};
            }
        `}
`;
const StyledIconName = styled(Footnote1)`
    ${applyEllipsis};

    margin-top: 0.5rem;
    width: 100%;
`;

export const IconsList: FC<IconsListProps> = ({ items, size, activeItemName, onItemClick }) => {
    return (
        <>
            {items.map((group) => (
                <Fragment key={group.name}>
                    <StyledFootnote2 as="h4">{group.name}</StyledFootnote2>
                    <Grid>
                        {group.items.map(({ name, component: Component }) => (
                            <StyledCard
                                key={name}
                                isActive={name === activeItemName}
                                title={name}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onItemClick?.(name);
                                }}
                            >
                                <IconRoot size={size} icon={Component} color="inherit" />
                                <StyledIconName>{name}</StyledIconName>
                            </StyledCard>
                        ))}
                    </Grid>
                </Fragment>
            ))}
        </>
    );
};
