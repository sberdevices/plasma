import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { select } from '@storybook/addon-knobs';

import Typo from '../components/Typo';
import Color from '../components/Color';
import {
    colorTextPrimary,
    colorBackgroundColor,
    colorBackgroundDefault,
    colorBasePrimary,
    colorBaseSecondary,
    colorBaseWarning,
    colorBaseCritical,
    colorBaseChecked,
    colorBaseFocus,
    colorTextTertiary,
    colorTextSecondary,
    colorTextWarning,
    colorTextCritical,
} from '../components/Color/tokens';
import ThemeSber from '../components/Theme/_dark/Theme_dark_sber';
import ThemeEva from '../components/Theme/_dark/Theme_dark_eva';
import ThemeJoy from '../components/Theme/_dark/Theme_dark_joy';
import { Display1, Display2, Display3 } from '../components/Display';
import { Headline1, Headline2, Headline3, Headline4 } from '../components/Headline';
import { Body1, Body2, Body3 } from '../components/Body';
import { ParagraphText1, ParagraphText2 } from '../components/Paragraph';
import { Footnote1, Footnote2 } from '../components/Footnote';
import { Button1, Button2 } from '../components/Button';
import { Caption } from '../components/Caption';
import { Underline } from '../components/Underline';

export default {
    title: 'PlasmaStyles',
};

const DocumentStyle = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html {
        height: 100vh;
    }

    /* stylelint-disable-next-line selector-nested-pattern */
    body {
        color: ${colorTextPrimary};
        background: ${colorBackgroundDefault};
        background-color: ${colorBackgroundColor};
        margin: 0;
    }
`;

const StyledColorsSection = styled.div`
    padding: 20px 0;
`;

const StyledPlate = styled.div`
    display: inline-block;

    padding: 20px 40px;

    vertical-align: top;
`;

const StyledHr = styled.hr`
    margin-bottom: 10px;

    opacity: 0.1;
`;

interface ColorsSectionProps {
    title: string;
}

const ColorsSection: React.FC<ColorsSectionProps> = ({ title, children }) => (
    <StyledColorsSection>
        <Headline3>{title}</Headline3>
        <StyledHr />

        {children}
    </StyledColorsSection>
);

const ColorDemo = styled.div`
    display: inline-block;

    width: 36px;
    height: 36px;
    margin-right: 20px;

    border-radius: 8px;
`;

const FocusDemo = styled.div`
    width: 100px;
    height: 45px;

    border: 4px solid ${colorBaseFocus};
    border-radius: 8px;
    background-color: ${colorBackgroundDefault};
`;

const BasePrimary = styled(ColorDemo)`
    background-color: ${colorBasePrimary};
`;

const BaseSecondary = styled(ColorDemo)`
    background-color: ${colorBaseSecondary};
`;

const BaseWarning = styled(ColorDemo)`
    background-color: ${colorBaseWarning};
`;

const BaseCritical = styled(ColorDemo)`
    background-color: ${colorBaseCritical};
`;

const BaseChecked = styled(ColorDemo)`
    background-color: ${colorBaseChecked};
`;

const TextPrimary = styled(ColorDemo)`
    background-color: ${colorTextPrimary};
`;

const TextSecondary = styled(ColorDemo)`
    background-color: ${colorTextSecondary};
`;

const TextTertiary = styled(ColorDemo)`
    background-color: ${colorTextTertiary};
`;

const TextWarning = styled(ColorDemo)`
    background-color: ${colorTextWarning};
`;

const TextCritical = styled(ColorDemo)`
    background-color: ${colorTextCritical};
`;

export const Default = () => {
    const theme = select('Theme', ['sber', 'eva', 'joy'], 'sber');
    const mapThemeOnComponent = {
        sber: ThemeSber,
        eva: ThemeEva,
        joy: ThemeJoy,
    };
    const Theme = mapThemeOnComponent[theme];

    return (
        <>
            <Typo />
            <Color />
            <Theme />
            <DocumentStyle />

            <StyledPlate>
                <Headline2>Типографика</Headline2>
                <StyledHr />

                <Display1>Display 1</Display1>
                <Display2>Display 2</Display2>
                <Display3>Display 3</Display3>

                <Headline1>Headline 1</Headline1>
                <Headline2>Headline 2</Headline2>
                <Headline3>Headline 3</Headline3>
                <Headline4>Headline 4</Headline4>

                <Body1>Body 1</Body1>
                <Body2>Body 2</Body2>
                <Body3>Body 3</Body3>

                <ParagraphText1>Paragraph Text 1</ParagraphText1>
                <ParagraphText2>Paragraph Text 2</ParagraphText2>

                <Footnote1>Footnote 1</Footnote1>
                <Footnote2>Footnote 2</Footnote2>

                <Button1>Button 1</Button1>
                <Button2>Button 2</Button2>

                <Caption>Caption</Caption>

                <Underline>Underline</Underline>
            </StyledPlate>
            <StyledPlate>
                <Headline2>Цвета</Headline2>
                <StyledHr />

                <ColorsSection title="Фокус">
                    <FocusDemo />
                </ColorsSection>

                <ColorsSection title="База">
                    <BasePrimary />
                    <BaseSecondary />
                    <BaseWarning />
                    <BaseCritical />
                    <BaseChecked />
                </ColorsSection>

                <ColorsSection title="Текст">
                    <TextPrimary />
                    <TextSecondary />
                    <TextTertiary />
                    <TextWarning />
                    <TextCritical />
                </ColorsSection>
            </StyledPlate>
        </>
    );
};
