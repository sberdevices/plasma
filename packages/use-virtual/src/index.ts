/**
 * хуки отличаются по параметрам:
 * 1. скролл + использование клавиатуры
 * 2. только использование клавиатуры
 * 3. размер элементов не известен до рендера
 */
// 1. скролл + клавиатура + размер элементов известен
import { useVirtual } from './useVirtual';
// 2. клавиатура + размер элементов известен
import { useVirtualKeyboard } from './useVirtualKeyboard';
// 3. скролл + клавиатура + размер элементов не известен
import { useVirtualDynamic } from './useVirtualDynamic';
// 4. TODO клавиатура + размер элементов НЕ известен
// import { useVirtualDynamicKeyboard } from './useVirtualDynamicKeyboard';
// smoothScroll для использования с разными хуками
import { useVerySmoothWindowScroll } from './VerySmoothScroll';
// скролл + клавиатура + размер элементов НЕ известен + smoothScroll - как пример
import { useVirtualDynamicSmoothScroll } from './useVirtualDynamicSmoothScroll';
// скролл + клавиатура + размер элементов известен + smoothScroll - как пример
import { useVirtualSmoothScroll } from './useVirtualSmoothScroll';

export {
    useVirtual,
    useVirtualKeyboard,
    useVirtualDynamic,
    // useVirtualDynamicKeyboard, TODO
    useVirtualSmoothScroll,
    useVirtualDynamicSmoothScroll,
    useVerySmoothWindowScroll,
};
