import React, { FC } from 'react';
import { mount, CypressTestDecorator, getComponent } from '@sberdevices/plasma-cy-utils';

describe('plasma-core: Typography', () => {
    const Body1 = getComponent('Body1');
    const Body2 = getComponent('Body2');
    const Button1 = getComponent('Button1');
    const Button2 = getComponent('Button2');
    const Caption = getComponent('Caption');
    const Footnote1 = getComponent('Footnote1');
    const Footnote2 = getComponent('Footnote2');
    const Headline1 = getComponent('Headline1');
    const Headline2 = getComponent('Headline2');
    const Headline3 = getComponent('Headline3');
    const Headline4 = getComponent('Headline4');
    const ParagraphText1 = getComponent('ParagraphText1');
    const ParagraphText2 = getComponent('ParagraphText2');
    const Underline = getComponent('Underline');

    it('Typography', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Body1>Hello Body 1</Body1>
                <Body2>Hello Body 2</Body2>
                <Button1>Hello Button 1</Button1>
                <Button2>Hello Button 2</Button2>
                <Caption>Hello Caption</Caption>
                <Footnote1>Hello Footnote 1</Footnote1>
                <Footnote2>Hello Footnote 2</Footnote2>
                <Headline1>Hello Headline 1</Headline1>
                <Headline2>Hello Headline 2</Headline2>
                <Headline3>Hello Headline 3</Headline3>
                <Headline4>Hello Headline 4</Headline4>
                <ParagraphText1>Hello ParagraphText 1</ParagraphText1>
                <ParagraphText2>Hello ParagraphText 2</ParagraphText2>
                <Underline>Hello Underline</Underline>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    const Container: FC = ({ children }) => <div style={{ width: '50px' }}>{children}</div>;

    it('Typography with breakWord', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Container>
                    <Body1 breakWord>Hello Body 1</Body1>
                    <Button1 breakWord>Hello Button 1</Button1>
                    <Caption breakWord>Hello Caption</Caption>
                    <Footnote1 breakWord>Hello Footnote 1</Footnote1>
                    <Headline1 breakWord>Hello Headline 1</Headline1>
                    <ParagraphText1 breakWord>Hello ParagraphText 1</ParagraphText1>
                    <Underline breakWord>Hello Underline</Underline>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });

    it('Typography without breakWord', () => {
        mount(
            <CypressTestDecorator>
                <style>{`
                    body {
                        font-family: "SB Sans Text", sans-serif;
                    }
                `}</style>
                <Container>
                    <Body1 breakWord={false}>Hello Body 1</Body1>
                    <Button1 breakWord={false}>Hello Button 1</Button1>
                    <Caption breakWord={false}>Hello Caption</Caption>
                    <Footnote1 breakWord={false}>Hello Footnote 1</Footnote1>
                    <Headline1 breakWord={false}>Hello Headline 1</Headline1>
                    <ParagraphText1 breakWord={false}>Hello ParagraphText 1</ParagraphText1>
                    <Underline breakWord={false}>Hello Underline</Underline>
                </Container>
            </CypressTestDecorator>,
        );

        cy.matchImageSnapshot();
    });
});
