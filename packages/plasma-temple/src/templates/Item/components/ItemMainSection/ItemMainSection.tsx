import React from 'react';
import styled from 'styled-components';
import { IconPlay } from '@sberdevices/plasma-icons/Icons/IconPlay';
import { Cell, TextBox, TextBoxLabel, TextBoxTitle, Button } from '@sberdevices/ui';
import { isSberBox } from "@sberdevices/ui/utils";

import { FullScreenBackground } from "../FullScreenBackground/FullScreenBackground";
import { UnifiedComponentProps } from "../../../../registry/types";
import { useFocusOnMount } from '../../../../hooks/useFocusOnMount';

interface ItemCellProps {
    title: string;
    content: string;
}
export interface ItemMainSectionProps {
    title: string;
    subtitle: string;
    cover?: string;
    description?: ItemCellProps[];
    itemShowButtonText: string;
    onItemShow: () => void;
}

const StyledRow = styled.div`
    display: flex;
    align-items: flex-start;

    margin-bottom: 64px;
`;

const StyledTextBox = styled(Cell)`
    min-width: 200px;
    margin-left: 1rem;

    &:first-child {
        margin-left: 0;
    }
`;

const ItemCell: React.FC<ItemCellProps> = ({ title, content }) => (
    <StyledTextBox
        content={
            <TextBox>
                <TextBoxLabel>{title}</TextBoxLabel>
                <TextBoxTitle>{content}</TextBoxTitle>
            </TextBox>
        }
    />
);

export const ItemMainSection: React.FC<UnifiedComponentProps<ItemMainSectionProps>> = ({
    title,
    subtitle,
    description,
    itemShowButtonText,
    onItemShow,
    cover,
    platformComponents: { Container, Title, Subtitle },
}) => {
    const buttonRef = useFocusOnMount<HTMLButtonElement>();

    return (
        <Container withSpatNav>
            {cover && <FullScreenBackground src={cover} />}
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
            {description && (
                <StyledRow>
                    {description.map(
                        ({ title: descTitle, content }) =>
                            content && <ItemCell key={descTitle} title={descTitle} content={content} />,
                    )}
                </StyledRow>
            )}
            <Button
                size="s"
                onClick={onItemShow}
                ref={buttonRef}
                contentLeft={<IconPlay size="s" />}
                outlined={isSberBox()}
                text={itemShowButtonText}
            />
        </Container>
    );
};
