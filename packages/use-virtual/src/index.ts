/**
 * хуки отличаются по параметрам:
 * 1. скролл
 * 2. использование клавиатуры
 * 3. размер элементов не известен до рендера
 */
// 1. скролл + клавиатура + размер элементов известен
import { useVirtual } from './useVirtual';
// 2. клавиатура + размер элементов известен
import { useVirtualKeyboard } from './useVirtualKeyboard';
// 3. скролл + размер элементов известен
import { useVirtualScroll } from './useVirtualScroll';
// 4. скролл + клавиатура + размер элементов не известен
import { useVirtualDynamic } from './useVirtualDynamic';
// 5. TODO скролл + размер элементов НЕ известен
// import { useVirtualDynamicKeyboard } from './useVirtualDynamicKeyboard';
// 6. скролл + размер элементов НЕ известен
import { useVirtualDynamicScroll } from './useVirtualDynamicScroll';
// smoothScroll для использования с разными хуками
import { useVerySmoothWindowScroll } from './VerySmoothScroll';
// скролл + клавиатура + размер элементов НЕ известен + smoothScroll - как пример
import { useVirtualDynamicSmoothScroll } from './useVirtualDynamicSmoothScroll';
// скролл + клавиатура + размер элементов известен + smoothScroll - как пример
import { useVirtualSmoothScroll } from './useVirtualSmoothScroll';

export {
    useVirtual,
    useVirtualKeyboard,
    useVirtualScroll,
    useVirtualDynamic,
    useVirtualDynamicScroll,
    useVirtualSmoothScroll,
    useVirtualDynamicSmoothScroll,
    useVerySmoothWindowScroll,
};
