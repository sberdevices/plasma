import { ValidationResult } from './types';

export const defaultValidate = (files: FileList | null, accept?: string): ValidationResult => {
    if (!files?.length) {
        return {
            message: 'Загрузите файл',
            status: 'error',
        };
    }

    const file = files[0];

    if (!accept) {
        return {
            data: file,
        };
    }

    const allowedFormats = accept.replace(/\s/g, '').replaceAll('.', '\\.').split(',');
    const fileTypeRegexp = new RegExp(`${allowedFormats.join('|')}$`, 'i');

    if (file && !fileTypeRegexp.test(file.name)) {
        return {
            message: `Неверный формат файла. Используйте ${accept.replaceAll('.', '')}-формат`,
            status: 'error',
        };
    }

    return {
        data: file,
    };
};
