import { ValidationResult } from './types';

/**
 * Метод валидация по-умолчанию, принимающая список поддерживаемых расширений через запятую
 * и возвращает результат проверки
 * @param {FileList | null} files выбранный файл
 * @param {string | undefined} accept поддерживаемые форматы, например, `.mp3,.wav`
 * @returns {ValidationResult} объект, имеющий необязательные поля `message, status, data`
 */
export const defaultValidate = (files: FileList | null, accept?: string): ValidationResult => {
    if (!files?.length) {
        return {
            message: 'Загрузите файл',
            status: 'error',
            data: null,
        };
    }

    const file = files[0];

    if (!accept) {
        return {
            data: file,
        };
    }

    const dotRegexp = /\./g;
    const allowedFormats = accept.replace(/\s/g, '').replace(dotRegexp, '\\.').split(',');
    const fileTypeRegexp = new RegExp(`${allowedFormats.join('|')}$`, 'i');

    if (!fileTypeRegexp.test(file.name)) {
        return {
            message: `Неверный формат файла. Используйте ${accept.replace(dotRegexp, '')}-формат`,
            status: 'error',
            data: null,
        };
    }

    return {
        data: file,
    };
};
