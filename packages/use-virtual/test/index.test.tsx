/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useLayoutEffect } from 'react';
import { render, screen } from '@testing-library/react';

import {
    useVirtualScroll,
    useVirtual,
    useVirtualKeyboard,
    // useVirtualDynamic,
    // useVirtualDynamicScroll,
    // useVirtualDynamicSmoothScroll,
    useVirtualSmoothScroll,
} from '../src';

const VISIBLE_LIMIT = 3;
const ELEMENT_SIZE = 300;
const LIST_LENGTH = 200;

const estimateSize = () => ELEMENT_SIZE;
const Virtual = ({
    size,
    height,
    width,
    useVirtualMock = useVirtualScroll,
    horizontal,
    paddingStart,
    paddingEnd,
    limit,
}: {
    size: number;
    height?: number;
    width?: number;
    useVirtualMock?: typeof useVirtualScroll | typeof useVirtualKeyboard;
    horizontal?: boolean;
    paddingStart?: number;
    paddingEnd?: number;
    limit?: number;
}) => {
    const parentRef = useRef<HTMLDivElement | null>(null);
    useLayoutEffect(() => {
        if (parentRef.current) {
            /**
             * jest-dom не поддерживает clientWidth/clientHeight
             * https://github.com/testing-library/react-testing-library/issues/353
             */
            jest.spyOn(parentRef.current, 'clientWidth', 'get').mockImplementation(() => width || 0);
            jest.spyOn(parentRef.current, 'clientHeight', 'get').mockImplementation(() => height || 0);
        }
    }, [width, height]);
    const { visibleItems, totalSize } = useVirtualMock({
        size,
        parentRef,
        estimateSize,
        horizontal,
        paddingStart,
        paddingEnd,
        // @ts-ignore
        limit,
    });

    return (
        <>
            <div
                ref={parentRef}
                style={{
                    height,
                    width,
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        height: `${totalSize}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {visibleItems.map(({ index, start, size: elementSize }) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                transform: `translateX(${start}px)`,
                                height: `${elementSize}px`,
                            }}
                        >
                            Row={index} Start={start} Size={elementSize}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

/**
 * TODO:
 * overscan
 * keyExtractor
 * useVirtualDynamic
 */
describe.each([useVirtualKeyboard, useVirtualScroll, useVirtual, useVirtualSmoothScroll])('%p', (hook) => {
    let hookMock: jest.Mock;
    let virtualResult: Record<string, unknown>;
    const isVirtualKeyboard = hook.name === 'useVirtualKeyboard';
    const limit = isVirtualKeyboard ? VISIBLE_LIMIT : undefined;

    beforeAll(() => {
        hookMock = jest.fn((props) => hook(props));
        render(
            <Virtual size={LIST_LENGTH} width={ELEMENT_SIZE * VISIBLE_LIMIT} useVirtualMock={hookMock} limit={limit} />,
        );
        virtualResult = hookMock.mock.results[0].value;
    });

    test('Should render only visible items', () => {
        expect(screen.getAllByText(/Row/).length).toEqual(VISIBLE_LIMIT);
    });

    test('Should call hook', () => {
        // повторный рендер после получения размера parentRef
        expect(hookMock).toHaveBeenCalledTimes(isVirtualKeyboard ? 1 : 2);
    });

    test('Should return the proper result', () => {
        const keys = ['visibleItems', 'totalSize', 'upIndex', 'downIndex', 'currentIndex'];

        if (!isVirtualKeyboard) {
            keys.push('scrollToIndex', 'isScrolling');
        }
        keys.forEach((key) => {
            expect(virtualResult).toHaveProperty(key);
        });
        expect(virtualResult).toHaveProperty('currentIndex', 0);
        expect(virtualResult).toHaveProperty('totalSize', LIST_LENGTH * ELEMENT_SIZE);
    });

    test('Should support vertical view', () => {
        render(
            <Virtual
                size={LIST_LENGTH}
                height={ELEMENT_SIZE * VISIBLE_LIMIT}
                useVirtualMock={hookMock}
                limit={limit}
                horizontal={false}
            />,
        );
        expect(screen.getAllByText(/Row/).length).toEqual(VISIBLE_LIMIT);
    });

    test('Should support paddingStart and paddingEnd', () => {
        const paddingStart = 100;
        const paddingEnd = 200;
        hookMock = jest.fn((props) => hook(props));
        render(
            <Virtual
                size={VISIBLE_LIMIT}
                width={ELEMENT_SIZE * VISIBLE_LIMIT}
                useVirtualMock={hookMock}
                paddingStart={paddingStart}
                paddingEnd={paddingEnd}
                limit={limit}
            />,
        );
        virtualResult = hookMock.mock.results[0].value;
        expect(screen.queryByText(`Row=0 Start=${paddingStart} Size=${ELEMENT_SIZE}`)).toBeInTheDocument();
        expect(virtualResult).toHaveProperty('totalSize', VISIBLE_LIMIT * ELEMENT_SIZE + paddingStart + paddingEnd);
    });
});
