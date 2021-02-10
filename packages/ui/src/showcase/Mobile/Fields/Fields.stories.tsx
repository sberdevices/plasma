import React, { useState } from 'react';
import styled from 'styled-components';
import { IconSleep, IconEye } from '@sberdevices/plasma-icons';

import { TextField, FieldProps } from '../../../components/TextField/TextField';
import { Body1 } from '../../../components/Typography';
import { ShowcaseDashedBorder } from '../../../helpers';
import { SectionName } from '../../SectionName';
import { ThemeProvider } from '../../ThemeProvider';

export default {
    title: 'Showcase/Mobile',
    parameters: {
        chromatic: {
            disable: true,
        },
        docs: {
            page: null,
        },
    },
};

const Row = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const StatesCol = styled.div`
    padding-top: 38px;
    padding-right: 24px;
`;

const variants = [
    {
        value: '',
        title: 'Label',
        helperText: 'helperText',
    },
    {
        value: 'Title',
        title: 'Label',
        helperText: 'helperText',
    },
    {
        value: 'Title',
        title: 'Label',
        helperText: 'helperText',
    },
    {
        value: 'Title',
        title: 'Label',
        helperText: 'helperText',
        hasSuccess: true,
    },
    {
        value: 'Title',
        title: 'Label',
        helperText: 'helperText',
        hasError: true,
    },
    {
        value: 'Title',
        title: 'Label',
        helperText: 'helperText',
        disabled: true,
    },
];

const states = ['Empty', 'Focus', 'Filled', 'Success', 'Error', 'Disabled'];

const StatefulTextField: React.FC<FieldProps> = ({ value: initialValue, ...props }) => {
    const [value, setValue] = useState(initialValue);
    return <TextField {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Fields = () => {
    return (
        <ThemeProvider>
            <SectionName title="Field" description="Стандартное поле текстового ввода" />
            <Row>
                <StatesCol>
                    {states.map((state) => (
                        <Body1 key={state} style={{ marginBottom: 76 }}>
                            {state}
                        </Body1>
                    ))}
                    <div style={{ height: 40 }} />
                    {states.map((state) => (
                        <Body1 key={state} style={{ marginBottom: 76 }}>
                            {state}
                        </Body1>
                    ))}
                </StatesCol>
                <ShowcaseDashedBorder style={{ width: 720, padding: 20 }}>
                    {variants.map((variant, i) => (
                        <Row key={i}>
                            <StatefulTextField {...variant} style={{ marginRight: 40, flex: 1 }} />
                            <StatefulTextField {...variant} contentLeft={<IconSleep />} style={{ flex: 1 }} />
                        </Row>
                    ))}
                    <div style={{ height: 40 }} />
                    {variants.map((variant, i) => (
                        <Row key={i}>
                            <StatefulTextField
                                {...variant}
                                contentRight={<IconEye />}
                                style={{ marginRight: 40, flex: 1 }}
                            />
                            <StatefulTextField
                                {...variant}
                                contentLeft={<IconSleep />}
                                contentRight={<IconEye />}
                                style={{ flex: 1 }}
                            />
                        </Row>
                    ))}
                </ShowcaseDashedBorder>
            </Row>
        </ThemeProvider>
    );
};
