/**
 * Function composition.
 */
export function compose<R>(...funcs: Function[]) {
    return (initialValue: R) => funcs.reduceRight((result, func) => func(result), initialValue);
}
