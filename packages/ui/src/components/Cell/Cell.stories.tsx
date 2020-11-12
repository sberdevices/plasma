import React from 'react';
import styled from 'styled-components';
import { text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { accent, footnote1 } from '@sberdevices/plasma-tokens';

import { Footnote1, Headline1 } from '../Typography';
import { Default as Stepper } from '../Stepper/Stepper.stories';
import { Container, Col } from '../Grid';
import { TextBox, Title, SubTitle, Label, Caption } from '../TextBox';

import { Cell, CellIcon, CellSize } from './Cell';
import { Disclosure } from './CellDisclosure';
import { CellListItem as ListItem } from './CellListItem';

export default {
    title: 'Cell',
    component: Cell,
    decorators: [
        (Story) => (
            <div style={{ paddingTop: '40px' }}>
                <Story />
            </div>
        ),
    ],
};

const Example = styled.div`
    position: relative;
    border: 1px dotted ${({ color }) => color || accent};

    font-size: ${footnote1.fontSize};

    margin: 1.5em 0;
`;

export const Default = () => {
    const title = text('title', 'Hello World of Plasma');
    const subTitle = text('subTitle', 'Use with wisdom');

    return (
        <Container>
            <Col size={4}>
                <Example>
                    <Cell
                        onClick={action('cell clicked')}
                        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
                        content={<TextBox title={title} subTitle={subTitle} />}
                    />
                </Example>
            </Col>
        </Container>
    );
};

const Variation = styled(Footnote1)`
    position: absolute;
    top: -1.5em;
    left: 0;

    color: ${accent};
`;

export const IconSize = () => {
    const size = select('size', ['xs', 's', 'm', 'l', 'xl', 'xxl'], 'm');
    const title = text('title', 'Hello World of Plasma');
    const subTitle = text('subTitle', 'Use with wisdom');

    return (
        <Container>
            <Col size={4}>
                <Example>
                    <Variation>{`CellIcon Size:${size}`}</Variation>
                    <Cell
                        left={<CellIcon size={size} as="img" src="./images/avocado.png" alt="avocado" />}
                        content={
                            <TextBox>
                                <Title>{title}</Title>
                                <SubTitle>{subTitle}</SubTitle>
                            </TextBox>
                        }
                    />
                </Example>
            </Col>
        </Container>
    );
};

export const Content = () => {
    const size = select('size', ['xs', 's', 'm', 'l', 'xl', 'xxl'] as Array<CellSize>, 'm');

    const left = <CellIcon size={size} as="img" src="./images/avocado.png" alt="avocado" />;
    const right = <TextBox title="Details" />;

    return (
        <Container>
            <Col size={6}>
                <Example>
                    <Variation>Content: Title + SubTitle</Variation>
                    <Cell
                        left={left}
                        content={
                            <TextBox>
                                <Title>Hello World of Plasma</Title>
                                <SubTitle>+7 (495) 500-55-50</SubTitle>
                            </TextBox>
                        }
                        right={right}
                    />
                </Example>
            </Col>
            <Col size={6}>
                <Example>
                    <Variation>Content: Header</Variation>
                    <Cell
                        left={left}
                        content={
                            <TextBox>
                                <Headline1>Very much</Headline1>
                            </TextBox>
                        }
                        right={right}
                    />
                </Example>
            </Col>
        </Container>
    );
};

export const Right = () => {
    const size = select('size', ['xs', 's', 'm', 'l', 'xl', 'xxl'] as Array<CellSize>, 'm');
    const title = text('title', 'Details');
    const subTitle = text('subTitle', 'info');

    const left = <CellIcon size={size} as="img" src="./images/avocado.png" alt="avocado" />;
    const content = (
        <TextBox>
            <Title>Hello World of Plasma</Title>
            <SubTitle>Use with wisdom</SubTitle>
        </TextBox>
    );

    return (
        <Container>
            <Col size={6}>
                <Example>
                    <Variation>Right: Title</Variation>
                    <Cell left={left} content={content} right={<TextBox title={title} />} />
                </Example>
            </Col>
            <Col size={6}>
                <Example>
                    <Variation>Right: Title + SubTitle</Variation>
                    <Cell left={left} content={content} right={<TextBox title={title} subTitle={subTitle} />} />
                </Example>
            </Col>
            <Col size={6}>
                <Example>
                    <Variation>Right: Title + SubTitle + Icon</Variation>
                    <Cell
                        left={left}
                        content={content}
                        right={
                            <>
                                <TextBox title={title} subTitle={subTitle} />
                                <CellIcon size="s" as="img" src="./images/avocado.png" alt="avocado" />
                            </>
                        }
                    />
                </Example>
            </Col>
            <Col size={6}>
                <Example>
                    <Variation>Right: Stepper</Variation>
                    <Cell left={left} content={content} right={<Stepper />} />
                </Example>
            </Col>
        </Container>
    );
};

export const Align = () => {
    const alignLeft = select('alignLeft', ['top', 'center', 'bottom'], 'center');
    const alignRight = select('alignRight', ['top', 'center'], 'center');
    const size = select('size', ['xs', 's', 'm', 'l', 'xl', 'xxl'] as Array<CellSize>, 'm');
    const title = text('title', 'Details');
    const subTitle = text('subTitle', 'info');

    const left = <CellIcon size={size} as="img" src="./images/avocado.png" alt="avocado" />;
    const content = (
        <TextBox>
            <Label>Label</Label>
            <Title>Hello World of Plasma</Title>
            <SubTitle>Use with wisdom</SubTitle>
            <Caption color={accent}>Скидка 42%</Caption>
        </TextBox>
    );

    return (
        <Container>
            <Col size={6}>
                <Example>
                    <Variation>Align: Title</Variation>
                    <Cell
                        alignLeft={alignLeft}
                        alignRight={alignRight}
                        left={left}
                        content={content}
                        right={<TextBox title={title} />}
                    />
                </Example>
            </Col>
            <Col size={6}>
                <Example>
                    <Variation>Align: Title + SubTitle</Variation>
                    <Cell
                        alignLeft={alignLeft}
                        alignRight={alignRight}
                        left={left}
                        content={content}
                        right={<TextBox title={title} subTitle={subTitle} />}
                    />
                </Example>
            </Col>
            <Col size={6}>
                <Example>
                    <Variation>Align: Title + SubTitle + Icon</Variation>
                    <Cell
                        alignLeft={alignLeft}
                        alignRight={alignRight}
                        left={left}
                        content={content}
                        right={
                            <TextBox>
                                <CellIcon size="xs" as="img" src="./images/avocado.png" alt="avocado" />
                                <Title>{title}</Title>
                                <SubTitle>{subTitle}</SubTitle>
                            </TextBox>
                        }
                    />
                </Example>
            </Col>
        </Container>
    );
};

export const CellListItem = () => {
    const size = select('size', ['xs', 's', 'm', 'l', 'xl', 'xxl'] as Array<CellSize>, 'm');

    const left = <CellIcon size={size} as="img" src="./images/avocado.png" alt="avocado" />;

    return (
        <Container>
            <Col size={6}>
                <Example color="rgba(0,0,0,0)">
                    <Variation>With Disclosure</Variation>
                    <ListItem
                        onClick={action('cell clicked')}
                        left={left}
                        content={
                            <TextBox>
                                <Title>Hello World of Plasma</Title>
                                <SubTitle>+7 (495) 500-55-50</SubTitle>
                            </TextBox>
                        }
                        right={<Disclosure onClick={action('disclosure clicked')} />}
                    />
                    <ListItem
                        onClick={action('cell clicked')}
                        left={left}
                        content={
                            <TextBox>
                                <Title>Hello World of Plasma</Title>
                                <SubTitle>+7 (495) 500-55-50</SubTitle>
                            </TextBox>
                        }
                        right={<Disclosure onClick={action('disclosure clicked')} />}
                    />
                    <ListItem
                        onClick={action('cell clicked')}
                        left={left}
                        content={
                            <TextBox>
                                <Title>Hello World of Plasma</Title>
                                <SubTitle>+7 (495) 500-55-50</SubTitle>
                            </TextBox>
                        }
                        right={<Disclosure onClick={action('disclosure clicked')} />}
                    />
                </Example>
            </Col>
            <Col size={6}>
                <Example>
                    <Variation>With Disclosure + Title</Variation>
                    <ListItem
                        left={left}
                        content={
                            <TextBox>
                                <Headline1>Very much</Headline1>
                            </TextBox>
                        }
                        right={
                            <>
                                <TextBox title="Details" />
                                <Disclosure />
                            </>
                        }
                    />
                </Example>
            </Col>
        </Container>
    );
};
