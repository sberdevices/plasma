import styled, { css } from 'styled-components';

import { link, linkHover, linkActive, linkVisited, linkVisitedHover, linkVisitedActive } from '../../tokens';

const views = {
    primary: {
        default: link,
        hover: linkHover,
        active: linkActive,
        visited: linkVisited,
        visitedHover: linkVisitedHover,
        visitedActive: linkVisitedActive,
    },
};

export interface LinkProps {
    /**
     * Вид компонента.
     */
    view?: keyof typeof views;
}

const interactionCss = (color: string) => css`
    color: ${color};

    &::before {
        opacity: 1;
    }
`;

/**
 * Ссылка.
 */
export const Link = styled.a<LinkProps & { $isHover?: boolean; $isPressed?: boolean; $isVisited?: boolean }>`
    position: relative;
    text-decoration: none;
    transition: color 0.15s ease-in;

    &::before {
        content: '';

        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;

        border-bottom: 1px solid;

        opacity: 0.4;
        transition: opacity 0.15s ease-in;
    }

    ${({ view = 'primary', $isHover, $isPressed, $isVisited }) => css`
        color: ${views[view].default};

        &:hover {
            ${interactionCss(views[view].hover)}
        }
        &:active {
            ${interactionCss(views[view].active)}
        }

        &:visited {
            color: ${views[view].visited};
        }
        &:visited:hover {
            ${interactionCss(views[view].visitedHover)}
        }
        &:visited:active {
            ${interactionCss(views[view].visitedActive)}
        }

        ${$isHover && interactionCss(views[view].hover)}
        ${$isPressed && interactionCss(views[view].active)}

        ${
            $isVisited &&
            css`
                color: ${views[view].visited};
            `
        }
        ${$isVisited && $isHover && interactionCss(views[view].visitedHover)}
        ${$isVisited && $isPressed && interactionCss(views[view].visitedActive)}
    `};
`;
