import React from 'react';
import styled, { css } from 'styled-components';
import { Footnote1, Footnote2 } from '@sberdevices/plasma-ui';
import { secondary } from '@sberdevices/plasma-tokens';

import { Description } from '../../../types';
import { useWindowInnerWidth } from '../../../hooks/useWindowInnerWidth';

import { ProductDescriptionProps } from './types';

const applyEllipsis = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledDescriptionItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const StyledDescriptionItemContainer = styled.div`
    margin-bottom: 0.75rem;
`;

const StyledTitle = styled(Footnote1)<{ singleLine?: boolean; upperCase?: boolean }>`
    color: ${secondary};

    ${({ upperCase }) =>
        upperCase &&
        css`
            &::first-letter {
                text-transform: uppercase;
            }
        `}

    ${({ singleLine }) =>
        singleLine &&
        css`
            ${applyEllipsis}
            max-width: 70%;
        `}
`;

const StyledSpace = styled.div`
    flex: 1;
    border: 0.5px dashed rgba(255, 255, 255, 0.56);
    height: 0;
    margin: 0 4px 4px;
    min-width: 1rem;
`;

const StyledContent = styled(Footnote2)<{ singleLine?: boolean }>`
    ${({ singleLine }) =>
        singleLine &&
        css`
            ${applyEllipsis}
            max-width: 70%;
        `}
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

const padLines = (lines: string[], length: number): (undefined | string)[] => {
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

const SingleLineDescriptionItem: React.FC<ProductDescriptionProps['items'][number]> = ({ title, content }) => (
    <StyledDescriptionItemContainer>
        <StyledDescriptionItem key={title}>
            <StyledTitle singleLine upperCase>
                {title}
            </StyledTitle>
            {content && <StyledSpace />}
            <StyledContent singleLine>{content}</StyledContent>
        </StyledDescriptionItem>
    </StyledDescriptionItemContainer>
);

const MultiLineDescriptionItem: React.FC<Description> = ({ title, content }) => {
    const width = useWindowInnerWidth();
    const { leftCut: titleCut, rightCut: contentCut } = getCutLinesParams(title, content, width ?? 0);

    const titleLines = getLines(title, titleCut);
    const contentLines = getLines(content, contentCut);
    const groupedLines = groupLines(titleLines, contentLines);

    return (
        <>
            {groupedLines.map(({ leftLine, rightLine }, index) => (
                <StyledDescriptionItem key={leftLine}>
                    <StyledTitle upperCase={leftLine === titleLines[0]}>{leftLine}</StyledTitle>
                    {index === groupedLines.length - 1 && rightLine && <StyledSpace />}
                    <StyledContent>{rightLine}</StyledContent>
                </StyledDescriptionItem>
            ))}
        </>
    );
};

export const ProductDescriptionMobile: React.FC<ProductDescriptionProps> = ({ className, items }) => {
    return (
        <div className={className}>
            {items.map(({ title, content }) => (
                <StyledDescriptionItemContainer key={title}>
                    {typeof content === 'string' ? (
                        <MultiLineDescriptionItem title={title} content={content} />
                    ) : (
                        <SingleLineDescriptionItem title={title} content={content} />
                    )}
                </StyledDescriptionItemContainer>
            ))}
        </div>
    );
};
