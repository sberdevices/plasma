import React from 'react';
import styled, { css } from 'styled-components';
import { backgroundPrimary } from '@sberdevices/plasma-tokens';

import { Button } from '../Button';
import { Body1, Body3, Headline4 } from '../Typography';

import { NotificationType, ViewNotification } from './types';

const backgrounds = {
    default: 'linear-gradient(265.83deg, #00B9F4 2.1%, #00E833 97.93%)',
    warning: 'linear-gradient(252.54deg, rgba(244, 0, 161, 0) 4.44%, #dc283a 95.58%)',
    info: backgroundPrimary,
};

const StyledRoot = styled.div<{ type: NotificationType; verticalPadding: number }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-radius: 1.25rem;
    width: 100%;
    max-width: 35.5rem;

    ${({ verticalPadding }) => css`
        padding: ${verticalPadding}rem 1.25rem;
    `};

    ${({ type }) => css`
        background: ${backgrounds[type]};
    `};
`;

const NotificationImage = styled.img`
    width: 2.75rem;
    height: 2.75rem;
    margin-right: 0.75rem;
    border-radius: 50%;
    overflow: hidden;
`;

const LabelIcon = styled.img`
    display: inline-block;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.375rem;
    margin-right: 0.5rem;
    overflow: hidden;
`;

const ContentLeft = styled.div`
    display: flex;
`;

const SubTitle = styled.div`
    display: flex;
`;

const TextContentLeft = styled.div<{ reverseTitles: boolean; spacing: number }>`
    display: flex;
    justify-content: center;

    ${({ reverseTitles, spacing }) =>
        reverseTitles
            ? css`
                  flex-direction: column-reverse;
                  & > :last-child {
                      margin-bottom: ${spacing}rem;
                  }
              `
            : css`
                  flex-direction: column;
                  & > :first-child {
                      margin-bottom: ${spacing}rem;
                  }
              `}
`;

const ContentRight = styled.div`
    display: flex;
    justify-content: flex-end;
`;

type NotificationProps = ViewNotification & {
    contentLeft?: React.ReactNode;
    contentRight?: React.ReactNode;
};

export const Notification: React.FC<NotificationProps> = ({
    type = 'default',
    titleType = 'normal',
    title,
    subTitle,
    actions,
    contentLeft,
    contentRight,
    reverseTitles = false,
    textSpacing,
    imageSrc,
    labelSrc,
}) => {
    // При наличии headline title + subTitle дефолтный spacing === 4
    const spacing = textSpacing || (titleType === 'headline' && subTitle ? 4 : 0);
    const rootVerticalPadding = 20 - spacing / 2 - (titleType === 'headline' || imageSrc ? 2 : 0);

    // eslint-disable-next-line no-nested-ternary
    const TitleComp = titleType === 'headline' ? Headline4 : titleType === 'normal' ? Body3 : Body1;
    return (
        <StyledRoot type={type} verticalPadding={rootVerticalPadding / 16}>
            {contentLeft || (
                <ContentLeft>
                    {imageSrc && <NotificationImage src={imageSrc} alt="image" />}
                    <TextContentLeft spacing={spacing / 16} reverseTitles={reverseTitles}>
                        <TitleComp>{title}</TitleComp>
                        <SubTitle>
                            {labelSrc && <LabelIcon src={labelSrc} alt="label" />}
                            <Body1 style={{ opacity: 0.56 }}>{subTitle}</Body1>
                        </SubTitle>
                    </TextContentLeft>
                </ContentLeft>
            )}
            {contentRight ||
                (actions && (
                    <ContentRight>
                        {actions.map(({ name, action, view }) => (
                            <Button
                                key={name}
                                size="s"
                                view={view}
                                onClick={action}
                                style={{ width: '8.125rem', marginLeft: '1rem' }}
                            >
                                {name}
                            </Button>
                        ))}
                    </ContentRight>
                ))}
        </StyledRoot>
    );
};

/* type Props = {
    type?: NotificationType;
    title?: string;
    subTitle?: string;
    titleType?: 'normal' | 'headline' | 'thin';
    textSpacing?: number;
    timeout?: number;
    reverseTitles?: boolean;
    imageSrc?: string;
    labelSrc?: string;
    actions?: {
        name: string;
        action: () => void;
        view?: 'checked' | 'primary' | 'secondary' | 'warning' | 'critical' | 'clear';
    }[];
    contentLeft?: React.ReactNode;
    contentRight?: React.ReactNode;
};

// TODO разобраться, почему не работает с основного компонента

export const DoczNotificationProps: React.FC<Props> = () => null; */
