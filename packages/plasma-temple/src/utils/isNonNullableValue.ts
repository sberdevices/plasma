export function isNonNullableValue<T>(value: T, deep = false): value is NonNullable<T> {
    if (!deep) {
        return value != null;
    }

    // а тут не нужно строгое равенство?
    return Object.values(value).every((v) => v != null);
}
