import { convertSurfaceName } from "./convertSurfaceName";

const bannerBlockIds = {
    sberBox: "579438199",
    sberPortal: "579439689",
    sberTop: "579439691",
    saluteTV: "579439693",
    saluteApp: "579439695",
    sbol: "579439697",
    web: "579439699",
    test: "579444584",
};

export function getBannerBlockId(surface) {
    const surfaceName = convertSurfaceName(surface);
    return bannerBlockIds[surfaceName];
}

const videoBlockIds = {
    sberBox: "579434841",
    sberPortal: "579439701",
    sberTop: "579439703",
    saluteTV: "579439705",
    saluteApp: "579439707",
    sbol: "579439709",
    web: "579439711",
    test: "579444582",
};

export function getVideoBlockId(surface) {
    const surfaceName = convertSurfaceName(surface);
    return videoBlockIds[surfaceName];
}
