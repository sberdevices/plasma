import React from 'react';
import styled, { css } from 'styled-components';
import { mediaQuery } from '@sberdevices/plasma-ui';
import { footnote1, footnote2, paragraph1, paragraph2, secondary } from '@sberdevices/plasma-tokens';

import { useWindowInnerWidth } from '../../../../hooks/useWindowInnerWidth';

export interface DetailsItemProps {
    name: string;
    value?: string;
}

const StyledDetailsItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const StyledName = styled.div<{ upperCase?: boolean }>`
    color: ${secondary};
    ${footnote1}

    ${mediaQuery(
        'XL',
        2,
    )(css`
        ${paragraph1}
    `)}

    ${({ upperCase }) =>
        upperCase &&
        css`
            &::first-letter {
                text-transform: uppercase;
            }
        `}
`;

const StyledSpace = styled.div`
    flex: 1;
    border: 1px dashed rgba(255, 255, 255, 0.56);
    height: 0;
    margin: 0 4px 4px;
    min-width: 1rem;

    ${mediaQuery(
        'S',
        1,
    )(css`
        border-width: 0.5px;
    `)}
`;

const StyledValue = styled.div`
    ${footnote2}

    ${mediaQuery(
        'XL',
        2,
    )(css`
        ${paragraph2}
    `)}
`;

interface LineParams {
    maxSymbolsInLine: number;
    minDotsSpace: number;
    maxTextLength: number;
}

const defaultLineParams: LineParams = {
    maxSymbolsInLine: 34,
    minDotsSpace: 4,
    maxTextLength: 16,
};

const lineParamsMap: Record<string, LineParams> = {
    320: {
        maxSymbolsInLine: 30,
        minDotsSpace: 4,
        maxTextLength: 15,
    },
    1920: {
        maxSymbolsInLine: 34,
        minDotsSpace: 4,
        maxTextLength: 16,
    },
};

const getCutLinesParams = (leftText: string, rightText: string, width: number) => {
    const { maxSymbolsInLine, minDotsSpace, maxTextLength } = !width
        ? defaultLineParams
        : Object.entries(lineParamsMap).reduceRight((acc, [key, value]) => {
              const length = Number(key);
              return width <= length ? value : acc;
          }, defaultLineParams);

    const leftLength = leftText.length;
    const rightLength = rightText.length;

    if (leftLength + rightLength + minDotsSpace <= maxSymbolsInLine) {
        return {
            leftCut: leftLength,
            rightCut: rightLength,
        };
    }

    if (rightLength <= maxTextLength) {
        return {
            rightCut: rightLength,
            leftCut: maxSymbolsInLine - minDotsSpace - rightLength,
        };
    }

    return {
        rightCut: maxTextLength,
        leftCut: maxSymbolsInLine - minDotsSpace - maxTextLength,
    };
};

const getLines = (str: string, maxLengthRow: number) => {
    let lastIndex = 0;

    return str.split(' ').reduce((acc, item) => {
        lastIndex += item.length - 1;

        const lineIndex = Math.floor(lastIndex / maxLengthRow);

        if (!acc[lineIndex]) {
            acc[lineIndex] = item;
        } else {
            acc[lineIndex] = `${acc[lineIndex]} ${item}`;
        }

        return acc;
    }, [] as string[]);
};

const padLines = (lines: string[], length: number) => {
    if (lines.length < length) {
        return [...Array(length - lines.length), ...lines];
    }

    return lines;
};

const groupLines = (leftLines: string[], rightLines: string[]) => {
    const maxLines = Math.max(leftLines.length, rightLines.length);

    const leftPaddedLines = padLines(leftLines, maxLines);
    const rightPaddedLines = padLines(rightLines, maxLines);

    return leftPaddedLines.map((item, index) => ({
        leftLine: item,
        rightLine: rightPaddedLines[index],
    }));
};

export const ProductDetailsItem: React.FC<DetailsItemProps> = ({ name, value = '' }) => {
    const width = useWindowInnerWidth();

    const { leftCut: titleCut, rightCut: contentCut } = getCutLinesParams(name, value, width ?? 0);

    const titleLines = getLines(name, titleCut);
    const contentLines = getLines(value, contentCut);
    const groupedLines = groupLines(titleLines, contentLines);

    return (
        <>
            {groupedLines.map(({ leftLine, rightLine }, index) => (
                <StyledDetailsItemContainer key={leftLine}>
                    <StyledName upperCase={leftLine === titleLines[0]}>{leftLine}</StyledName>
                    {index === groupedLines.length - 1 && rightLine && <StyledSpace />}
                    <StyledValue>{rightLine}</StyledValue>
                </StyledDetailsItemContainer>
            ))}
        </>
    );
};
