import { ROBO_COMMENT } from '../constants';

/**
 * Создает дескриптор на файл с определенным именем и контентом.
 * @private
 */
export const generateFile = (name: string, content: string | object) => {
    if (typeof content !== 'string') {
        content = JSON.stringify(content, null, 4);
    }
    return {
        file: `${name}.ts`,
        content: `${ROBO_COMMENT}export const ${name} = ${content};\n`,
    };
};
