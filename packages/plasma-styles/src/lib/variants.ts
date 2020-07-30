export const combinate = (a: any[], b: any[]) => {
    const variants = [];

    for (const i of a) {
        for (const j of b) {
            variants.push([i, j]);
        }
    }

    return variants;
};
