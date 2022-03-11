import React from 'react';
import styled, { css } from 'styled-components';
import { Button, ButtonProps, mediaQuery } from '@sberdevices/plasma-ui';
import { IconPlay } from '@sberdevices/plasma-icons/Icons/IconPlay';

import { isSberBoxLike } from '../../../../utils/deviceFamily';
import { useFocusOnMount } from '../../../../hooks/useFocusOnMount';
import { ItemBackground } from '../../../../components/Item/ItemBackground/ItemBackground';
import { ItemMainSection as ItemMainSectionNew } from '../../../../components/Item/ItemMainSection/ItemMainSection';

interface ItemCellProps {
    title: React.ReactNode;
    content: React.ReactNode;
}
interface ItemMainSectionProps {
    title: string;
    subtitle: string;
    cover?: string;
    description?: ItemCellProps[];
    itemShowButtonText: string;
    onItemShow: () => void;
    additionalButons?: ButtonProps[];
}

const StyledItemMainSection = styled(ItemMainSectionNew)`
    margin-bottom: 2.5rem;

    ${mediaQuery(
        'M',
        2,
    )(css`
        margin-bottom: 2rem;
    `)}
`;

/** @deprecated */
export const ItemMainSection: React.FC<ItemMainSectionProps> = ({
    title,
    subtitle,
    description,
    itemShowButtonText,
    onItemShow,
    cover,
    additionalButons = [],
}) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    useFocusOnMount<HTMLButtonElement>(buttonRef, {
        delay: 250,
    });

    const renderButton = (props: ButtonProps, index: number) => (
        <Button key={`ItemMainSection-Button-${index}`} {...props} />
    );

    return (
        <>
            {cover && <ItemBackground src={cover} />}
            <StyledItemMainSection
                title={title}
                subtitle={subtitle}
                details={description}
                buttons={
                    <>
                        <Button
                            size="s"
                            onClick={onItemShow}
                            ref={buttonRef}
                            contentLeft={<IconPlay size="s" />}
                            outlined={isSberBoxLike()}
                            text={itemShowButtonText}
                        />
                        {additionalButons.map(renderButton)}
                    </>
                }
            />
        </>
    );
};
