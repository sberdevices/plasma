import React from 'react';
import styled from 'styled-components';
import { Headline2, Headline3, ParagraphText1 } from '@sberdevices/plasma-ui';
import { DeviceFamily } from '@sberdevices/plasma-temple';
import { detectDevice } from '@sberdevices/plasma-ui/utils';

const mapDeviceToSectionTitle: Record<DeviceFamily, React.FC> = {
    sberBox: Headline2,
    sberPortal: Headline3,
    mobile: Headline3,
};

const StyledContainer = styled.div`
    margin-bottom: 48px;
    outline: none;
`;

const StyledTitle = styled(mapDeviceToSectionTitle[detectDevice()])`
    margin-bottom: 24px;
`;

export const Section: React.FC<{ title?: string; tabIndex?: number }> = ({ title, tabIndex, children }) => {
    return (
        <StyledContainer tabIndex={tabIndex}>
            {title && <StyledTitle>{title}</StyledTitle>}
            <ParagraphText1>{children}</ParagraphText1>
        </StyledContainer>
    );
};
