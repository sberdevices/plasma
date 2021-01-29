import React from 'react';
import styled from 'styled-components';
import { text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { accent, footnote1 } from '@sberdevices/plasma-tokens';

import { Footnote1, Headline1 } from '../Typography';
import { Default as Stepper } from '../Stepper/Stepper.stories';
import { Container, Row, Col } from '../Grid';
import { TextBox, TextBoxTitle, TextBoxSubTitle, TextBoxLabel, TextBoxCaption } from '../TextBox';

import { Cell, CellIcon, CellSize } from './Cell';
import { Disclosure } from './CellDisclosure';
import { CellListItem as ListItem } from './CellListItem';

export default {
    title: 'Content/Cell',
    component: Cell,
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
            <Row>
                <Col size={4}>
                    <Example>
                        <Cell
                            onClick={action('cell clicked')}
                            left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
                            content={<TextBox title={title} subTitle={subTitle} />}
                        />
                    </Example>
                </Col>
            </Row>
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
            <Row>
                <Col size={4}>
                    <Example>
                        <Variation>{`CellIcon Size:${size}`}</Variation>
                        <Cell
                            left={<CellIcon size={size} as="img" src="./images/avocado.png" alt="avocado" />}
                            content={
                                <TextBox>
                                    <TextBoxTitle>{title}</TextBoxTitle>
                                    <TextBoxSubTitle>{subTitle}</TextBoxSubTitle>
                                </TextBox>
                            }
                        />
                    </Example>
                </Col>
            </Row>
        </Container>
    );
};

export const Content = () => {
    const size = select('size', ['xs', 's', 'm', 'l', 'xl', 'xxl'] as Array<CellSize>, 'm');

    const left = <CellIcon size={size} as="img" src="./images/avocado.png" alt="avocado" />;
    const right = <TextBox title="Details" />;

    return (
        <Container>
            <Row>
                <Col size={6}>
                    <Example>
                        <Variation>Content: Title + SubTitle</Variation>
                        <Cell
                            left={left}
                            content={
                                <TextBox>
                                    <TextBoxTitle>Hello World of Plasma</TextBoxTitle>
                                    <TextBoxSubTitle>+7 (495) 500-55-50</TextBoxSubTitle>
                                </TextBox>
                            }
                            right={right}
                        />
                    </Example>
                </Col>
            </Row>
            <Row>
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
            </Row>
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
            <TextBoxTitle>Hello World of Plasma</TextBoxTitle>
            <TextBoxSubTitle>Use with wisdom</TextBoxSubTitle>
        </TextBox>
    );

    return (
        <Container>
            <Row>
                <Col size={6}>
                    <Example>
                        <Variation>Right: Title</Variation>
                        <Cell left={left} content={content} right={<TextBox title={title} />} />
                    </Example>
                </Col>
            </Row>
            <Row>
                <Col size={6}>
                    <Example>
                        <Variation>Right: Title + SubTitle</Variation>
                        <Cell left={left} content={content} right={<TextBox title={title} subTitle={subTitle} />} />
                    </Example>
                </Col>
            </Row>
            <Row>
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
            </Row>
            <Row>
                <Col size={6}>
                    <Example>
                        <Variation>Right: Stepper</Variation>
                        <Cell left={left} content={content} right={<Stepper />} />
                    </Example>
                </Col>
            </Row>
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
            <TextBoxLabel>Label</TextBoxLabel>
            <TextBoxTitle>Hello World of Plasma</TextBoxTitle>
            <TextBoxSubTitle>Use with wisdom</TextBoxSubTitle>
            <TextBoxCaption color={accent}>Скидка 42%</TextBoxCaption>
        </TextBox>
    );

    return (
        <Container>
            <Row>
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
            </Row>
            <Row>
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
            </Row>
            <Row>
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
                                    <TextBoxTitle>{title}</TextBoxTitle>
                                    <TextBoxSubTitle>{subTitle}</TextBoxSubTitle>
                                </TextBox>
                            }
                        />
                    </Example>
                </Col>
            </Row>
        </Container>
    );
};

export const CellListItem = () => {
    const size = select('size', ['xs', 's', 'm', 'l', 'xl', 'xxl'] as Array<CellSize>, 'm');

    const left = <CellIcon size={size} as="img" src="./images/avocado.png" alt="avocado" />;

    return (
        <Container>
            <Row>
                <Col size={6}>
                    <Example color="rgba(0,0,0,0)">
                        <Variation>With Disclosure</Variation>
                        <ListItem
                            onClick={action('cell clicked')}
                            left={left}
                            content={
                                <TextBox>
                                    <TextBoxTitle>Hello World of Plasma</TextBoxTitle>
                                    <TextBoxSubTitle>+7 (495) 500-55-50</TextBoxSubTitle>
                                </TextBox>
                            }
                            right={<Disclosure onClick={action('disclosure clicked')} />}
                        />
                        <ListItem
                            onClick={action('cell clicked')}
                            left={left}
                            content={
                                <TextBox>
                                    <TextBoxTitle>Hello World of Plasma</TextBoxTitle>
                                    <TextBoxSubTitle>+7 (495) 500-55-50</TextBoxSubTitle>
                                </TextBox>
                            }
                            right={<Disclosure onClick={action('disclosure clicked')} />}
                        />
                        <ListItem
                            onClick={action('cell clicked')}
                            left={left}
                            content={
                                <TextBox>
                                    <TextBoxTitle>Hello World of Plasma</TextBoxTitle>
                                    <TextBoxSubTitle>+7 (495) 500-55-50</TextBoxSubTitle>
                                </TextBox>
                            }
                            right={<Disclosure onClick={action('disclosure clicked')} />}
                        />
                    </Example>
                </Col>
            </Row>
            <Row>
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
            </Row>
        </Container>
    );
};
