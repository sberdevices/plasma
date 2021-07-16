import type { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Button, Headline4 } from '@sberdevices/plasma-web';
import { background } from '@sberdevices/plasma-tokens-web';
import { IconClose } from '@sberdevices/plasma-icons';

export interface PanelViewProps extends HTMLAttributes<HTMLDivElement> {
    heading: string;
    /**
     * Обработчик клика по кнопке "закрыть".
     */
    onClose?: React.HTMLAttributes<HTMLElement>['onClick'];
}

const StyledRoot = styled.section`
    width: 20rem;
    height: 100%;
    padding: 0 1.75rem 1.75rem;

    background: ${background};
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%), 0 4px 14px rgb(0 0 0 / 8%);
`;
const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;
    height: 3.75rem;
    margin-bottom: 1.75rem;
    border-bottom: 1px solid rgb(0 0 0 / 5%);
`;
const StyledHeadline4 = styled(Headline4)`
    margin: 0;
`;

export const PanelView: FC<PanelViewProps> = ({ heading, children, onClose }) => {
    return (
        <StyledRoot>
            <StyledHeader>
                <StyledHeadline4 as="h3">{heading}</StyledHeadline4>
                <Button onClick={onClose} view="clear" shiftRight contentLeft={<IconClose size="s" />} />
            </StyledHeader>
            {children}
        </StyledRoot>
    );
};
