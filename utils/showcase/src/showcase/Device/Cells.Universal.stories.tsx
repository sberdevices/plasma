import React from 'react';
import styled from 'styled-components';
import { primary, tertiary } from '@sberdevices/plasma-tokens';
import { CellDisclosure, CellIcon, CellListItem, CellRight } from '@sberdevices/plasma-ui/components/Cell';
import {
    TextBox,
    TextBoxBiggerTitle,
    TextBoxLabel,
    TextBoxTitle,
    TextBoxSubTitle,
    TextBoxCaption,
} from '@sberdevices/plasma-ui/components/TextBox';
import { Stepper, StepperButton, StepperRoot, StepperValue } from '@sberdevices/plasma-ui/components/Stepper';

import {
    ShowcasePanel,
    ShowcaseDashedBorder,
    ShowcaseSectionName,
    IconPlaceholder,
    UIStoryDecorator,
} from '../../helpers';

export default {
    title: 'Showcase/Device/Cells',
    decorators: [UIStoryDecorator],
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

const StyledPanel = styled(ShowcasePanel)`
    width: 22.5rem;
    flex-direction: column;
`;
const HeightBox = styled.div<{ h: number }>`
    height: ${({ h = 0 }) => h}px;
`;

const variantsSimple = [
    <CellListItem
        content={<TextBox title="Title" />}
        contentRight={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        contentRight={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" />}
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
        contentRight={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
        contentRight={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem content={<TextBox title="Title" />} />,
    <CellListItem content={<TextBox title="Title" subTitle="SubTitle" />} />,
    <CellListItem
        content={<TextBox title="Title" />}
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
    />,
];

const variantsSimpleWithoutBorder = [
    <CellListItem
        content={<TextBox title="Title" />}
        contentRight={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        contentRight={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" />}
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
        contentRight={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
        contentRight={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem content={<TextBox title="Title" />} />,
    <CellListItem content={<TextBox title="Title" subTitle="SubTitle" />} />,
    <CellListItem
        content={<TextBox title="Title" />}
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
    />,
];

const variantsComplex = [
    <CellListItem
        content={
            <TextBox>
                <TextBoxTitle>Title</TextBoxTitle>
                <TextBoxSubTitle>SubTitle</TextBoxSubTitle>
                <TextBoxCaption>Caption</TextBoxCaption>
                <TextBoxCaption>Status</TextBoxCaption>
            </TextBox>
        }
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
        alignLeft="top"
        alignRight="top"
        contentRight={<TextBox title="Detail" subTitle="Info" />}
    />,
    <CellListItem
        content={
            <TextBox>
                <TextBoxTitle>Title</TextBoxTitle>
                <TextBoxSubTitle>SubTitle</TextBoxSubTitle>
                <TextBoxCaption>Caption</TextBoxCaption>
                <TextBoxCaption>Status</TextBoxCaption>
            </TextBox>
        }
        contentRight={<TextBox title="Detail" subTitle="Info" />}
        alignRight="top"
    />,
    <CellListItem
        content={
            <TextBox>
                <TextBoxTitle>Title</TextBoxTitle>
                <TextBoxSubTitle>SubTitle</TextBoxSubTitle>
                <TextBoxCaption>Caption</TextBoxCaption>
            </TextBox>
        }
        contentLeft={<CellIcon as="img" src="./images/320_320_12.jpg" alt="avocado" />}
        alignRight="top"
        contentRight={<TextBox title="Detail" subTitle="Info" />}
    />,
    <CellListItem
        content={
            <TextBox>
                <TextBoxTitle>Title</TextBoxTitle>
                <TextBoxSubTitle>SubTitle</TextBoxSubTitle>
                <TextBoxCaption>Caption</TextBoxCaption>
            </TextBox>
        }
        alignRight="top"
        contentRight={<TextBox title="Detail" subTitle="Info" />}
    />,
];

export const Universal = () => (
    <>
        <ShowcaseSectionName title="Simple" subTitle="Ячейки с небольшим набором полей" />
        <StyledPanel>
            {variantsSimple.map((variant, i) => (
                <React.Fragment key={i}>{variant}</React.Fragment>
            ))}
            {variantsSimpleWithoutBorder.map((variant, i) => (
                <div key={`10${String(i)}`} style={{ marginBottom: 20 }}>
                    {variant}
                </div>
            ))}
        </StyledPanel>
        <ShowcaseSectionName title="Complex" subTitle="Ячейки с большим набором полей" />
        <StyledPanel>
            {variantsComplex.map((variant, i) => (
                <React.Fragment key={i}>{variant}</React.Fragment>
            ))}
            {variantsComplex.map((variant, i) => (
                <div key={`10${String(i)}`} style={{ marginBottom: 20 }}>
                    {variant}
                </div>
            ))}
        </StyledPanel>
        <ShowcaseSectionName title="TextBox" subTitle="Текстовый блок, используемый в ячейках" />
        <StyledPanel>
            <ShowcaseDashedBorder>
                <TextBox title="Title" />
                <HeightBox h={20} />
                <TextBox title="Title" subTitle="SubTitle" />
                <HeightBox h={20} />
            </ShowcaseDashedBorder>
            <HeightBox h={24} />
            <ShowcaseDashedBorder>
                <TextBox>
                    <TextBoxSubTitle color={primary}>Long text</TextBoxSubTitle>
                </TextBox>
                <HeightBox h={24} />
                <TextBox>
                    <TextBoxSubTitle color={primary}>Long text</TextBoxSubTitle>
                    <TextBoxSubTitle color={tertiary}>Description</TextBoxSubTitle>
                </TextBox>
            </ShowcaseDashedBorder>
            <HeightBox h={24} />
            <ShowcaseDashedBorder>
                <TextBox title="Title" subTitle="SubTitle" />
                <HeightBox h={20} />
                <TextBox label="Label" title="Title" />
                <HeightBox h={20} />
                <TextBox title="Headline" subTitle="SubTitle" size="l" />
                <HeightBox h={20} />
                <TextBox title="Headline" label="Label" size="l" />
                <HeightBox h={20} />
                <TextBox>
                    <TextBoxBiggerTitle>Value</TextBoxBiggerTitle>
                    <TextBoxSubTitle>SubTitle</TextBoxSubTitle>
                </TextBox>
                <HeightBox h={20} />
                <TextBox>
                    <TextBoxLabel>Label</TextBoxLabel>
                    <TextBoxBiggerTitle>Value</TextBoxBiggerTitle>
                </TextBox>
            </ShowcaseDashedBorder>
            <HeightBox h={24} />
            <ShowcaseDashedBorder>
                <TextBox title="Title" subTitle="SubTitle" caption="Caption" />
                <HeightBox h={20} />
                <TextBox title="Title" subTitle="SubTitle" label="Label" />
            </ShowcaseDashedBorder>
        </StyledPanel>
        <ShowcaseSectionName title="Right" subTitle="Правая часть ячейки, обычно это блок действий или информации" />
        <StyledPanel>
            <ShowcaseDashedBorder>
                <CellRight align="center">
                    <TextBox title="Detail" />
                </CellRight>
                <HeightBox h={20} />
                <CellRight align="center">
                    <TextBox title="Detail" />
                    <CellDisclosure />
                </CellRight>
                <HeightBox h={20} />
                <CellRight align="center">
                    <TextBox title="Detail" subTitle="Info" />
                </CellRight>
                <HeightBox h={20} />
                <CellRight align="center">
                    <TextBox title="Detail" subTitle="Info" />
                    <CellDisclosure />
                </CellRight>
            </ShowcaseDashedBorder>
            <HeightBox h={40} />
            <ShowcaseDashedBorder>
                <CellRight align="center">
                    <IconPlaceholder />
                </CellRight>
                <HeightBox h={20} />
                <CellRight align="center">
                    <IconPlaceholder />
                    <div style={{ width: 16 }} />
                    <IconPlaceholder />
                </CellRight>
            </ShowcaseDashedBorder>
            <HeightBox h={40} />
            <ShowcaseDashedBorder>
                <CellRight align="center">
                    <CellDisclosure />
                </CellRight>
            </ShowcaseDashedBorder>
            <HeightBox h={40} />
            <ShowcaseDashedBorder>
                <CellRight align="center">
                    <Stepper value={2} onChange={() => undefined} />
                </CellRight>
                <HeightBox h={20} />
                <CellRight align="center">
                    <StepperRoot>
                        <StepperButton view="critical" icon={<IconPlaceholder size="xs" />} onClick={() => undefined} />
                        <StepperValue value={0} />
                        <StepperButton icon={<IconPlaceholder size="xs" />} onClick={() => undefined} />
                    </StepperRoot>
                </CellRight>
                <HeightBox h={20} />
                <CellRight align="center">
                    <Stepper max={3} value={3} onChange={() => undefined} />
                </CellRight>
            </ShowcaseDashedBorder>
        </StyledPanel>
        <ShowcaseSectionName title="Icon" subTitle="Размерный ряд иконок для ячеек" />
        <StyledPanel>
            <ShowcaseDashedBorder>
                <CellIcon size="s" as="img" src="./images/320_320_12.jpg" alt="avocado" />
                <div style={{ display: 'inline-block', width: 1 }} />
                <CellIcon size="m" as="img" src="./images/320_320_12.jpg" alt="avocado" />
                <div style={{ display: 'inline-block', width: 1 }} />
                <CellIcon size="l" as="img" src="./images/320_320_12.jpg" alt="avocado" />
            </ShowcaseDashedBorder>
        </StyledPanel>
    </>
);
