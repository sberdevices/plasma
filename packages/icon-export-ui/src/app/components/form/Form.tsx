import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { ParagraphText1, TextField, Select } from '@sberdevices/plasma-web';

import type {
    FilesPayloadResponse,
    FilesPayloadRequest,
    FormPayload,
    IconPayload,
    PluginMessage,
    SelectItem,
} from '../../../types';
import { getFilesSourceFromGH } from '../../controllers/githubFilesFetcher';

import { StyledCommitMessage, StyledForm, StyledInput } from './Form.style';

const categories: SelectItem[] = [
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

const commitTypes: SelectItem[] = [
    { label: 'feat', value: 'feat' },
    { label: 'fix', value: 'fix' },
];

const defaultState = {
    category: 'navigation',
    iconSize: 16,
    iconName: 'NameTest',
    commitType: 'feat',
    commitMessage: 'Add icon `IconNameTest`',
    pullRequestHeader: 'feat(plasma-icons): Add icon `IconNameTest`',
};

/**
 * Элементы формы для ввода данных.
 */
export const Form: FC = () => {
    const [state, setState] = useState<FormPayload>(defaultState);

    const onSubmit = useCallback(
        async (event: FormEvent) => {
            event.preventDefault();

            const [iconSource, indexSource] = await getFilesSourceFromGH('sberdevices', 'plasma', [
                'packages/plasma-icons/src/Icon.tsx',
                'packages/plasma-icons/src/index.ts',
            ]);

            const payload: PluginMessage<FilesPayloadRequest> = {
                pluginMessage: { type: 'export-start', payload: { ...state, iconSource, indexSource } },
            };
            // eslint-disable-next-line no-restricted-globals
            parent.postMessage(payload, '*');
        },
        [state],
    );

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
        event.persist();

        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }, []);

    useEffect(() => {
        const onMessage = async (event: MessageEvent<PluginMessage<FilesPayloadResponse | IconPayload>>) => {
            const { type, payload } = event.data.pluginMessage;

            if (type === 'update-size' && 'size' in payload) {
                setState((prevState) => ({
                    ...prevState,
                    iconSize: payload.size,
                }));
            }

            if (type === 'export-done' && !('size' in payload)) {
                // eslint-disable-next-line no-console
                console.log('payload', payload);
            }
        };

        window.addEventListener('message', onMessage);

        return () => {
            window.removeEventListener('message', onMessage);
        };
    }, []);

    return (
        <StyledForm id="form" onSubmit={onSubmit}>
            <StyledInput>
                <ParagraphText1>Repository</ParagraphText1>
                <TextField readOnly value="sberdevices/plasma" />
            </StyledInput>
            <StyledInput>
                <ParagraphText1>Icon size</ParagraphText1>
                <TextField readOnly value={state.iconSize} />
            </StyledInput>
            <StyledInput>
                <ParagraphText1>Icon name</ParagraphText1>
                <TextField name="iconName" value={state.iconName} onChange={onChangeTextField} />
            </StyledInput>
            <StyledInput>
                <ParagraphText1>Category</ParagraphText1>
                <Select value={state.category} onChange={onChangeSelect('category')} items={categories} />
            </StyledInput>
            <StyledInput>
                <ParagraphText1>Commit message</ParagraphText1>
                <StyledCommitMessage>
                    <Select value={state.commitType} onChange={onChangeSelect('commitType')} items={commitTypes} />
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
