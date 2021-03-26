/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, DependencyList } from 'react';
import { spatnavInstance } from 'core';

const emptyDependencyList: DependencyList = [];

function uninitSpatnav() {
    spatnavInstance.uninit();
}

function initSpatnav() {
    spatnavInstance.init();

    return uninitSpatnav;
}

/**
 * Инициализирует навигацию.
 *
 * Используется только один раз. Удобнее всего использовать в корневом компоненте.
 *
 * По умолчанию будет в фокусе первая добавленная секция
 */
export function useSpatnavInitialization(): void {
    useEffect(initSpatnav, emptyDependencyList);
}
