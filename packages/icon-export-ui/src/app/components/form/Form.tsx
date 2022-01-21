import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { ParagraphText1, TextField, Select } from '@sberdevices/plasma-web';

import { StyledCommitMessage, StyledForm, StyledInput } from './Form.style';

export interface FormPayload {
    category: string;
    iconName: string;
    commitType: string;
    commitMessage: string;
    pullRequestHeader: string;
}

export interface SelectItem {
    value: string;
    label: string;
}

const categoryList: SelectItem[] = [
    { value: 'navigation', label: 'Navigation' },
    { value: 'universal', label: 'Universal' },
    { value: 'action', label: 'Action' },
    { value: 'alert', label: 'Alert' },
    { value: 'av', label: 'Av' },
    { value: 'connection', label: 'Connection' },
    { value: 'hardware', label: 'Hardware' },
    { value: 'communication', label: 'Communication' },
    { value: 'files', label: 'Files' },
    { value: 'map', label: 'Map' },
    { value: 'other', label: 'Other' },
    { value: 'logo', label: 'Logo' },
];

const commitTypeList: SelectItem[] = [
    { label: 'feat', value: 'feat' },
    { label: 'fix', value: 'fix' },
];

/**
 * Элементы формы для ввода данных.
 */
export const Form: FC = () => {
    const [state, setState] = useState<FormPayload>({
        category: 'navigation',
        iconName: 'IconName',
        commitType: 'feat',
        commitMessage: 'Add icon `IconName`',
        pullRequestHeader: 'feat(plasma-icons): Add icon `IconName`',
    });

    const onSubmit = useCallback(() => {
        // eslint-disable-next-line no-restricted-globals
        parent.postMessage({ pluginMessage: { type: 'export-icon', payload: { ...state } } }, '*');
    }, [state]);

    const onChangeSelect = useCallback(
        (name: string) => (value: string) => {
            setState((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        },
        [],
    );

    const onChangeTextField = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }, []);

    return (
        <StyledForm id="form" onSubmit={onSubmit}>
            <StyledInput>
                <ParagraphText1>Repository</ParagraphText1>
                <TextField readOnly value="sberdevices/plasma" />
            </StyledInput>
            <StyledInput>
                <ParagraphText1>Icon name</ParagraphText1>
                <TextField name="iconName" value={state.iconName} onChange={onChangeTextField} />
            </StyledInput>
            <StyledInput>
                <ParagraphText1>Category</ParagraphText1>
                <Select value={state.category} onChange={onChangeSelect('category')} items={categoryList} />
            </StyledInput>
            <StyledInput>
                <ParagraphText1>Commit message</ParagraphText1>
                <StyledCommitMessage>
                    <Select value={state.commitType} onChange={onChangeSelect('commitType')} items={commitTypeList} />
                    <TextField name="commitMessage" value={state.commitMessage} onChange={onChangeTextField} />
                </StyledCommitMessage>
            </StyledInput>
            <StyledInput>
                <ParagraphText1>Pull Request header</ParagraphText1>
                <TextField name="pullRequestHeader" value={state.pullRequestHeader} onChange={onChangeTextField} />
            </StyledInput>
        </StyledForm>
    );
};
