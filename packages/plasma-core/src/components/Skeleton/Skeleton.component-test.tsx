import React from 'react';
import styled from 'styled-components';
import {
    mount,
    CypressTestDecorator,
    getComponent,
    PadMe,
    SpaceMe,
    withNoAnimation,
} from '@sberdevices/plasma-cy-utils';
import { typography } from '@sberdevices/plasma-tokens';

import { radiuses } from '../..';

const textSizes = Object.keys(typography);
const roundnessKeys = Object.keys(radiuses).map((r) => Number(r));

describe('plasma-core: Skeleton', () => {
    describe('LineSkeleton', () => {
        const LineSkeleton = getComponent('LineSkeleton');
        const Line = withNoAnimation(LineSkeleton);

        it('simple', () => {
            mount(
                <CypressTestDecorator>
                    <Line />
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });

        it('_size', () => {
            mount(
                <CypressTestDecorator>
                    {textSizes.map((size) => (
                        <Line key={size} size={size} />
                    ))}
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });

        it('_roundness', () => {
            mount(
                <CypressTestDecorator>
                    {roundnessKeys.map((roundness) => (
                        <Line key={roundness} roundness={roundness} />
                    ))}
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });
    });

    describe('RectSkeleton', () => {
        const RectSkeleton = getComponent('RectSkeleton');
        const Rect = withNoAnimation(RectSkeleton);

        it('simple', () => {
            mount(
                <CypressTestDecorator>
                    <Rect width="12rem" height="8rem" />
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });

        it('_size', () => {
            mount(
                <CypressTestDecorator>
                    <Rect width="12rem" height="8rem" />
                    <SpaceMe />
                    <Rect width={128} height={128} />
                    <SpaceMe />
                    <Rect height="8rem" />
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });

        it('_roundness', () => {
            mount(
                <CypressTestDecorator>
                    {roundnessKeys.map((roundness) => (
                        <>
                            <Rect key={roundness} width="12rem" height="2rem" roundness={roundness} />
                            <PadMe key={roundness} />
                        </>
                    ))}
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });
    });

    describe('TextSkeleton', () => {
        const TextSkeleton = getComponent('TextSkeleton');
        const Text = withNoAnimation(TextSkeleton);

        it('simple', () => {
            mount(
                <CypressTestDecorator>
                    <Text />
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });

        it('__lines', () => {
            mount(
                <CypressTestDecorator>
                    <Text lines={0} />
                    <Text lines={1} />
                    <Text lines={2} />
                    <Text lines={3} />
                    <Text lines={4} />
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });
        it('__lines:20', () => {
            mount(
                <CypressTestDecorator>
                    <Text lines={20} />
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });

        it('_size', () => {
            mount(
                <CypressTestDecorator>
                    {textSizes.map((size) => (
                        <Text key={size} size={size} />
                    ))}
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });

        it('_roundness', () => {
            mount(
                <CypressTestDecorator>
                    {roundnessKeys.map((roundness) => (
                        <>
                            <Text key={roundness} roundness={roundness} />
                            <PadMe key={roundness} />
                        </>
                    ))}
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });

        it(':width', () => {
            mount(
                <CypressTestDecorator>
                    <Text lines={3} width={50} />
                    <Text lines={3} width="2rem" />
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });
    });

    describe('withSkeleton', () => {
        const withSkeleton = getComponent('withSkeleton');
        const Button = getComponent('Button');
        const Btn = withNoAnimation(withSkeleton(Button));

        it('simple', () => {
            mount(
                <CypressTestDecorator>
                    <Btn view="primary" text="Loading" skeleton />
                    <PadMe />
                    <Btn view="primary" text="Done" />
                </CypressTestDecorator>,
            );
            cy.matchImageSnapshot();
        });
    });
});
