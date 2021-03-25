import React from 'react';
import styled from 'styled-components';
import { primary, tertiary } from '@sberdevices/plasma-tokens';
import { IconPlus, IconSearch, IconCross } from '@sberdevices/plasma-icons';

import { CellDisclosure, CellIcon, CellListItem, CellRight } from '../../../components/Cell';
import {
    TextBox,
    TextBoxBiggerTitle,
    TextBoxLabel,
    TextBoxTitle,
    TextBoxSubTitle,
    TextBoxCaption,
} from '../../../components/TextBox';
import { Stepper, StepperButton, StepperRoot, StepperValue } from '../../../components/Stepper';
import { ShowcaseDashedBorder } from '../../../helpers';
import { SectionName } from '../../SectionName';
import { ThemeProvider } from '../../ThemeProvider';

export default {
    title: 'Showcase/Device/Cells',
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

const Container = styled.div`
    padding: 0 80px;
`;

const ContentWrapper = styled.div`
    display: flex;
    padding: 40px 80px;
`;

const HeightBox = styled.div<{ h: number }>`
    height: ${({ h = 0 }) => h}px;
`;

const variantsSimple = [
    <CellListItem
        content={<TextBox title="Title" />}
        right={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        right={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" />}
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
        right={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
        right={
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
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
    />,
];

const variantsSimpleWithoutBorder = [
    <CellListItem
        content={<TextBox title="Title" />}
        right={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        right={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" />}
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
        right={
            <>
                <TextBox title="Detail" />
                <CellDisclosure />
            </>
        }
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
        right={
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
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
    />,
    <CellListItem
        content={<TextBox title="Title" subTitle="SubTitle" />}
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
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
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
        alignLeft="top"
        alignRight="top"
        right={<TextBox title="Detail" subTitle="Info" />}
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
        right={<TextBox title="Detail" subTitle="Info" />}
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
        left={<CellIcon as="img" src="./images/avocado.png" alt="avocado" />}
        alignRight="top"
        right={<TextBox title="Detail" subTitle="Info" />}
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
        right={<TextBox title="Detail" subTitle="Info" />}
    />,
];

export const Universal = () => (
    <ThemeProvider>
        <SectionName title="Simple" description="Ячейки с небольшим набором полей" />
        <ContentWrapper>
            <ShowcaseDashedBorder style={{ padding: 20, width: 360 }}>
                {variantsSimple.map((variant, i) => (
                    <React.Fragment key={i}>{variant}</React.Fragment>
                ))}
                {variantsSimpleWithoutBorder.map((variant, i) => (
                    <div key={`10${String(i)}`} style={{ marginBottom: 20 }}>
                        {variant}
                    </div>
                ))}
            </ShowcaseDashedBorder>
        </ContentWrapper>
        <SectionName title="Complex" description="Ячейки с большим набором полей" />
        <ContentWrapper>
            <ShowcaseDashedBorder style={{ padding: 20, width: 360 }}>
                {variantsComplex.map((variant, i) => (
                    <React.Fragment key={i}>{variant}</React.Fragment>
                ))}
                {variantsComplex.map((variant, i) => (
                    <div key={`10${String(i)}`} style={{ marginBottom: 20 }}>
                        {variant}
                    </div>
                ))}
            </ShowcaseDashedBorder>
        </ContentWrapper>
        <SectionName title="TextBox" description="Текстовый блок, используемый в ячейках" />
        <ContentWrapper>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ paddingLeft: 20 }}>
                    <TextBox title="Title" />
                    <HeightBox h={20} />
                    <TextBox title="Title" subTitle="SubTitle" />
                    <HeightBox h={20} />
                </div>
                <ShowcaseDashedBorder style={{ padding: 20, width: 200 }}>
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
                <ShowcaseDashedBorder style={{ padding: 20, width: 200 }}>
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
                <ShowcaseDashedBorder style={{ padding: 20, width: 200 }}>
                    <TextBox title="Title" subTitle="SubTitle" caption="Caption" />
                    <HeightBox h={20} />
                    <TextBox title="Title" subTitle="SubTitle" label="Label" />
                </ShowcaseDashedBorder>
            </div>
        </ContentWrapper>
        <SectionName title="Right" description="Правая часть ячейки, обычно это блок действий или информации" />
        <ContentWrapper>
            <ShowcaseDashedBorder style={{ padding: 20, width: 108, marginRight: 20 }}>
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
            <ShowcaseDashedBorder style={{ padding: 20, width: 120, marginRight: 20 }}>
                <CellRight align="center">
                    <IconPlus />
                </CellRight>
                <HeightBox h={20} />
                <CellRight align="center">
                    <IconPlus />
                    <div style={{ width: 16 }} />
                    <IconSearch />
                </CellRight>
            </ShowcaseDashedBorder>
            <ShowcaseDashedBorder style={{ padding: 20, width: 64, marginRight: 20 }}>
                <CellRight align="center">
                    <CellDisclosure />
                </CellRight>
            </ShowcaseDashedBorder>
            <ShowcaseDashedBorder style={{ padding: 20, width: 108 }}>
                <CellRight align="center">
                    <Stepper value={2} onChange={() => undefined} />
                </CellRight>
                <HeightBox h={20} />
                <CellRight align="center">
                    <StepperRoot>
                        <StepperButton view="critical" icon={<IconCross />} onClick={() => undefined} />
                        <StepperValue value={0} />
                        <StepperButton icon={<IconPlus />} onClick={() => undefined} />
                    </StepperRoot>
                </CellRight>
                <HeightBox h={20} />
                <CellRight align="center">
                    <Stepper max={3} value={3} onChange={() => undefined} />
                </CellRight>
            </ShowcaseDashedBorder>
        </ContentWrapper>
        <SectionName title="Icon" description="Размерный ряд иконок для ячеек" />
        <ContentWrapper>
            <ShowcaseDashedBorder style={{ display: 'flex', alignItems: 'flex-start', width: 258, padding: 20 }}>
                <CellIcon size="s" as="img" src="./images/avocado.png" alt="avocado" />
                <div style={{ display: 'inline-block', width: 1 }} />
                <CellIcon size="m" as="img" src="./images/avocado.png" alt="avocado" />
                <div style={{ display: 'inline-block', width: 1 }} />
                <CellIcon size="l" as="img" src="./images/avocado.png" alt="avocado" />
            </ShowcaseDashedBorder>
        </ContentWrapper>
    </ThemeProvider>
);
