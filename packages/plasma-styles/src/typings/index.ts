export interface DictionaryProperty {
    [key: string]: any;
    value: string;
    original: Record<string, string>;
    name: string;
    attributes: Record<string, string>;
    path: string[];
    comment?: string;
}

export type AllProperties = DictionaryProperty[];
export type CategoryProperties = Record<string, Record<string, DictionaryProperty>>;

export interface Dictionary {
    allProperties: AllProperties;
    properties: Record<string, CategoryProperties>;
}
