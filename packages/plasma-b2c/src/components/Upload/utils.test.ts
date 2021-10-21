import { defaultValidate } from './utils';

const files = ([
    {
        name: 'video.mkv',
    },
] as unknown) as FileList;

describe('Upload utils', () => {
    describe('defaultValidate', () => {
        it('Should return result with status error', () => {
            expect(defaultValidate(null)).toEqual({
                message: 'Загрузите файл',
                status: 'error',
                data: null,
            });
        });

        it('Should return result with file name', () => {
            expect(defaultValidate(files)).toEqual({ data: { name: 'video.mkv' } });
        });

        it('Should return result with file name by accept format', () => {
            expect(defaultValidate(files, '.mkv')).toEqual({ data: { name: 'video.mkv' } });
        });

        it('Should return result with file name by accepts format', () => {
            expect(defaultValidate(files, '.avi, .mkv')).toEqual({ data: { name: 'video.mkv' } });
        });

        it('Should return result with status error and message with accept format', () => {
            expect(defaultValidate(files, '.avi')).toEqual({
                data: null,
                message: 'Неверный формат файла. Используйте avi-формат',
                status: 'error',
            });
        });
    });
});
