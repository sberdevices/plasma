import React from 'react';
import styled from 'styled-components';

import { LooneyTunes } from './LooneyTunes';

const StyledLooneyTunesContainer = styled.div`
    width: 100%;
    height: 500px;

    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    color: rgba(255, 255, 255, 0.7);
`;

export default {
    title: 'LooneyTunes',
    decorators: [
        (Story) => (
            <div style={{ fontSize: '16px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Default = () => (
    <StyledLooneyTunesContainer>
        <LooneyTunes size={100} maxSize={500} circles={2}>
            CONTENT
        </LooneyTunes>
    </StyledLooneyTunesContainer>
);
