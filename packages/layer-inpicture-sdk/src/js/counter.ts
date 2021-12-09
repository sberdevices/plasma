interface Instance {
    getCount: () => number;
}

let instance: Instance;
let count = 0;

export const counter = () => {
    const increaseCount = () => {
        count++;
    };

    if (!instance) {
        instance = {
            getCount: () => {
                increaseCount();

                return count;
            },
        };
    }

    return instance;
};
