import { convertSurfaceName } from "./convertSurfaceName";

const bannerPadIds = {
    sberBox: "579438197",
    sberPortal: "579439665",
    sberTop: "579439667",
    saluteTV: "579439669",
    saluteApp: "579439671",
    sbol: "579439673",
    web: "579439685",
    test: "441753614",
};

export function getBannerPadId(surface) {
    const surfaceName = convertSurfaceName(surface);
    return bannerPadIds[surfaceName];
}

const videoPadIds = {
    sberBox: "579434839",
    sberPortal: "579439675",
    sberTop: "579439677",
    saluteTV: "579439679",
    saluteApp: "579439681",
    sbol: "579439683",
    web: "579439687",
    test: "579443336",
};

export function getVideoPadId(surface) {
    const surfaceName = convertSurfaceName(surface);
    return videoPadIds[surfaceName];
}
