import React from 'react';
import { mount, CypressTestDecorator, getComponent, PadMe } from '@sberdevices/plasma-cy-utils';

describe('plasma-b2c: AudioPlayer', () => {
    const AudioPlayer = getComponent('AudioPlayer');

    const item = {
        name: 'Kavinsky - Nightcall',
        duration: 128,
        isPlaying: false,
        isSelected: false,
    };

    it('simple', () => {
        mount(
            <CypressTestDecorator>
                <AudioPlayer
                    title={item.name}
                    duration={item.duration}
                    isPlaying={item.isPlaying}
                    isSelected={item.isSelected}
                />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_isPlaying', () => {
        mount(
            <CypressTestDecorator>
                <AudioPlayer title={item.name} duration={item.duration} isSelected={item.isSelected} />
                <PadMe />
                <AudioPlayer title={item.name} duration={item.duration} isSelected={item.isSelected} isPlaying />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });

    it('_isSelected', () => {
        mount(
            <CypressTestDecorator>
                <AudioPlayer title={item.name} duration={item.duration} isPlaying={item.isPlaying} />
                <PadMe />
                <AudioPlayer title={item.name} duration={item.duration} isPlaying={item.isPlaying} isSelected />
            </CypressTestDecorator>,
        );
        cy.matchImageSnapshot();
    });
});
