export interface SelectItem {
    value: string;
    label: string;
}

export interface FormPayload {
    category: string;
    iconName: string;
    iconSize?: number;
    commitType: string;
    commitMessage: string;
    pullRequestHeader: string;
}

export interface IconPayload {
    size: number;
}

export interface FilesPayloadRequest
    extends Omit<FormPayload, 'iconSize'>,
        Omit<FilesPayloadResponse, 'iconAsset' | 'iconComponent'> {}

export interface FilesPayloadResponse {
    iconAsset: string;
    iconComponent: string;
    indexSource: string;
    iconSource: string;
}

export type MessageType = 'export-start' | 'create-pr-done' | 'cancel' | 'update-size' | 'export-done';

export interface UIMessage<T> {
    type: MessageType;
    payload: T;
}

export interface PluginMessage<T> {
    pluginMessage: UIMessage<T>;
}
