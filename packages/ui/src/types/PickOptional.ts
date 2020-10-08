/**
 * Действует как стандартный Pick, но пикает все опционально.
 */
export type PickOptional<T, K extends keyof T> = Partial<Pick<T, K>>;
