import { Fragment, useMemo, useContext } from 'react';
import type { FC } from 'react';
import styled, { css } from 'styled-components';
import { Headline4, Footnote1, applyNoSelect, applyEllipsis } from '@sberdevices/plasma-b2c';
import { IconRoot, iconSectionsSet } from '@sberdevices/plasma-icons';
import { surfaceLiquid01, surfaceLiquid02, secondary, white } from '@sberdevices/plasma-tokens-b2c';
import { link, linkHover } from '@sberdevices/plasma-b2c/tokens';

import { Context, setWizardItem } from '../../store';
import type { Data, Item } from '../../types';

import { Grid } from './Grid';

export interface IconsListProps {
    searchQuery?: string;
    /**
     * Обработчик клика по айтему.
     */
    onItemClick?: React.HTMLAttributes<HTMLElement>['onClick'];
}

const StyledHeadline4 = styled(Headline4).attrs(() => ({ as: 'h4', mt: '8x', mb: '6x' }))`
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
const StyledIconName = styled(Footnote1).attrs(() => ({ mt: '4x' }))`
    ${applyEllipsis};
    width: 100%;
`;

const size = 's';
const icons = Object.entries(iconSectionsSet).reduce((acc, [groupName, group]) => {
    acc.push({
        name: groupName,
        items: Object.entries(group).reduce((a, [iconName, component]) => {
            a.push({ name: iconName, component });

            return a;
        }, [] as Item[]),
    });

    return acc;
}, [] as Data);

export const IconsList: FC<IconsListProps> = ({ searchQuery, onItemClick }) => {
    const { state, dispatch } = useContext(Context);

    const items = useMemo(() => {
        if (!searchQuery) {
            return icons;
        }
        const regExp = new RegExp(searchQuery);
        return icons
            .map((group) => ({ ...group, items: group.items.filter((item) => item.name.search(regExp) !== -1) }))
            .filter((group) => group.items.length);
    }, [searchQuery]);

    if (!items.length) {
        return <StyledHeadline4>Nothing found</StyledHeadline4>;
    }

    return (
        <>
            {items.map((group) => (
                <Fragment key={group.name}>
                    <StyledHeadline4>{group.name}</StyledHeadline4>
                    <Grid>
                        {group.items.map(({ name, component: Component }) => (
                            <StyledCard
                                key={name}
                                isActive={name === state.wizardItemName}
                                title={name}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onItemClick?.(event);
                                    dispatch(setWizardItem('icon', name));
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
