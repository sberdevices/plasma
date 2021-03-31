import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardMedia, CardContent, CardParagraph1 } from '@sberdevices/ui/components/Card';
import { Cell, CellIcon } from '@sberdevices/ui/components/Cell';
import {
    TextBox,
    TextBoxBigTitle,
    TextBoxBiggerTitle,
    TextBoxTitle,
    TextBoxSubTitle,
} from '@sberdevices/ui/components/TextBox';

import { ShowcaseDashedBorder } from '../../../helpers';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

export function TextBoxImageCardShowcase() {
    return (
        <ShowcaseDashedBorder>
            <Container>
                <Card outlined scaleOnFocus>
                    <CardBody>
                        <CardMedia src="./images/180_320_9.jpg" placeholder="./images/180_320_9.jpg" ratio="9 / 16" />
                        <CardContent>
                            <TextBox>
                                <TextBoxBigTitle>Title</TextBoxBigTitle>
                                <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                            </TextBox>
                        </CardContent>
                    </CardBody>
                </Card>
                <Card outlined scaleOnFocus>
                    <CardBody>
                        <CardMedia src="./images/320_320_1.jpg" placeholder="./images/320_320_1.jpg" ratio="1 / 1" />
                        <CardContent>
                            <TextBox>
                                <TextBoxBigTitle>Title</TextBoxBigTitle>
                                <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                            </TextBox>
                        </CardContent>
                    </CardBody>
                </Card>
                <Card outlined scaleOnFocus>
                    <CardBody>
                        <CardMedia src="./images/180_320_9.jpg" placeholder="./images/180_320_9.jpg" ratio="16 / 9" />
                        <CardContent>
                            <TextBox>
                                <TextBoxBigTitle>Title</TextBoxBigTitle>
                                <TextBoxSubTitle>Subtitle</TextBoxSubTitle>
                            </TextBox>
                        </CardContent>
                    </CardBody>
                </Card>
            </Container>
        </ShowcaseDashedBorder>
    );
}
