/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useLayoutEffect } from 'react';
import { render, screen } from '@testing-library/react';

import {
    useVirtual,
    useVirtualKeyboard,
    // useVirtualDynamic,
    // useVirtualDynamicKeyboard,
    // useVirtualDynamicSmoothScroll,
    useVirtualSmoothScroll,
} from '../src';
import { VisibleRange } from '../src/types';

const VISIBLE_LIMIT = 3;
const ELEMENT_SIZE = 300;
const LIST_LENGTH = 200;

const estimateSize = () => ELEMENT_SIZE;
const Virtual = ({
    itemCount,
    height,
    width,
    useVirtualMock = useVirtual,
    horizontal,
    paddingStart,
    paddingEnd,
    limit,
    initialCurrentIndex,
    initialRange,
}: {
    itemCount: number;
    height?: number;
    width?: number;
    useVirtualMock?: typeof useVirtual | typeof useVirtualKeyboard;
    horizontal?: boolean;
    paddingStart?: number;
    paddingEnd?: number;
    limit?: number;
    initialCurrentIndex?: number;
    initialRange?: VisibleRange;
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
        itemCount,
        parentRef,
        estimateSize,
        horizontal,
        paddingStart,
        paddingEnd,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        limit,
        initialCurrentIndex,
        initialRange,
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
describe.each([useVirtualKeyboard, useVirtual, useVirtualSmoothScroll])('%p', (hook) => {
    let hookMock: jest.Mock;
    let virtualResult: Record<string, unknown>;
    const isVirtualKeyboard = hook.name === 'useVirtualKeyboard';
    const limit = isVirtualKeyboard ? VISIBLE_LIMIT : undefined;
    const updateHookMock = () => {
        hookMock = jest.fn((props) => hook(props));
    };

    describe('basic features', () => {
        let rerender: ReturnType<typeof render>['rerender'];

        beforeAll(() => {
            hookMock = jest.fn((props) => hook(props));
            rerender = render(
                <Virtual
                    itemCount={LIST_LENGTH}
                    width={ELEMENT_SIZE * VISIBLE_LIMIT}
                    useVirtualMock={hookMock}
                    limit={limit}
                    horizontal
                />,
            ).rerender;
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

        test('Should support itemCount increment', () => {
            hookMock = jest.fn((props) => hook(props));
            const newItemCount = LIST_LENGTH + 10;
            rerender(<Virtual itemCount={newItemCount} useVirtualMock={hookMock} />);
            virtualResult = hookMock.mock.results[0].value;
            expect(virtualResult).toHaveProperty('totalSize', newItemCount * ELEMENT_SIZE);
        });
    });

    test('Should support vertical view', () => {
        render(
            <Virtual
                itemCount={LIST_LENGTH}
                height={ELEMENT_SIZE * VISIBLE_LIMIT}
                useVirtualMock={hookMock}
                limit={limit}
            />,
        );
        expect(screen.getAllByText(/Row/).length).toEqual(VISIBLE_LIMIT);
    });

    test('Should support paddingStart and paddingEnd', () => {
        const paddingStart = 100;
        const paddingEnd = 200;
        updateHookMock();
        render(
            <Virtual
                itemCount={VISIBLE_LIMIT}
                width={ELEMENT_SIZE * VISIBLE_LIMIT}
                useVirtualMock={hookMock}
                paddingStart={paddingStart}
                paddingEnd={paddingEnd}
                limit={limit}
                horizontal
            />,
        );
        virtualResult = hookMock.mock.results[0].value;
        expect(screen.queryByText(`Row=0 Start=${paddingStart} Size=${ELEMENT_SIZE}`)).toBeInTheDocument();
        expect(virtualResult).toHaveProperty('totalSize', VISIBLE_LIMIT * ELEMENT_SIZE + paddingStart + paddingEnd);
    });

    test('Should support initialCurrentIndex', () => {
        const initialCurrentIndex = 5;
        updateHookMock();
        render(
            <Virtual
                itemCount={VISIBLE_LIMIT}
                width={ELEMENT_SIZE * VISIBLE_LIMIT}
                useVirtualMock={hookMock}
                initialCurrentIndex={initialCurrentIndex}
                limit={limit}
                horizontal
            />,
        );
        virtualResult = hookMock.mock.results[0].value;
        expect(virtualResult).toHaveProperty('currentIndex', initialCurrentIndex);
    });

    test('Should support initialRange', () => {
        const initialRange = {
            start: 5,
            end: 7,
        };
        updateHookMock();
        render(
            <Virtual
                itemCount={initialRange.end + 10}
                width={ELEMENT_SIZE * VISIBLE_LIMIT}
                useVirtualMock={hookMock}
                initialRange={initialRange}
                horizontal
                limit={limit}
            />,
        );
        expect(screen.queryByText(/Row=4/)).not.toBeInTheDocument;
        expect(screen.queryByText(/Row=5/)).toBeInTheDocument();
        expect(screen.queryByText(/Row=6/)).toBeInTheDocument();
        expect(screen.queryByText(/Row=7/)).toBeInTheDocument();
        expect(screen.queryByText(/Row=8/)).not.toBeInTheDocument();
    });
});
