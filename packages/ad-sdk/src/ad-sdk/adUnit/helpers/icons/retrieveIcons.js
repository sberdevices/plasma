import { getIcons } from "../../../vastSelectors";
import getResource from "../resources/getResource";

const UNKNOWN = "UNKNOWN";
const uniqBy = (array, uniqValue) => {
    const seen = {};

    return array.filter((item) => {
        const key = uniqValue(item);

        if (seen.hasOwnProperty(key)) {
            return false;
        }

        seen[key] = true;

        return true;
    });
};

const uniqByResource = (icons) => uniqBy(icons, getResource);

const groupIconsByProgram = (icons) =>
    icons.reduce((accumulator, icon) => {
        const { program = UNKNOWN } = icon;

        if (!accumulator[program]) {
            accumulator[program] = [];
        }

        accumulator[program].push(icon);

        return accumulator;
    }, {});

const sortIconByBestPxratio = (icons) => {
    const devicePixelRatio = window.devicePixelRatio || 0;

    const compareTo = (iconA, iconB) => {
        const deltaA = Math.abs(devicePixelRatio - (iconA.pxratio || 0));
        const deltaB = Math.abs(devicePixelRatio - (iconB.pxratio || 0));

        return deltaA - deltaB;
    };

    return icons.slice(0).sort(compareTo);
};

const chooseByPxRatio = (icons) => {
    if (icons.length === 1) {
        return icons[0];
    }

    return sortIconByBestPxratio(icons)[0];
};

const chooseIcons = (icons) => {
    const byProgram = groupIconsByProgram(icons);
    const programs = Object.keys(byProgram);

    return programs.reduce((accumulator, program) => {
        if (program === UNKNOWN) {
            return [...accumulator, ...byProgram[UNKNOWN]];
        }

        return [...accumulator, chooseByPxRatio(byProgram[program])];
    }, []);
};

const retrieveIcons = (vastChain) => {
    const ads = vastChain.map(({ ad }) => ad);
    const icons = ads.reduce((accumulator, ad) => [...accumulator, ...(getIcons(ad) || [])], []);

    if (icons.length > 0) {
        const uniqIcons = uniqByResource(icons);

        return chooseIcons(uniqIcons);
    }

    return null;
};

export default retrieveIcons;
