import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import { Root } from './Root'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const TestedComponent = jest.fn(({ header: { title } }) => <div>{title}</div>);

describe('Testing Root Component', () => {
    let rootContainer: HTMLDivElement | null;
    beforeEach(() => {
        rootContainer = document.createElement('div');
        document.body.appendChild(rootContainer);
    });

    afterEach(() => {
        const container = rootContainer as NonNullable<HTMLDivElement>;

        unmountComponentAtNode(container);
        document.body.removeChild(container);
        rootContainer = null;
    });

    it('mount', () => {
        const componentProps = {
            dispatch: () => {},
            sendData: () => {},
            step: 0,
            stateRef: {
                current: {
                    item_selector: {
                        items: [],
                    },
                },
            },
            position: 0,
            data: [],
            header: {
                title: 'Title',
            },
        };

        act(() => {
            render(<Root theme="eva" Component={TestedComponent} {...componentProps} />, rootContainer);
        });

        expect(rootContainer?.textContent).toEqual('Title');

        expect(TestedComponent).toBeCalledTimes(1);
    });
});
