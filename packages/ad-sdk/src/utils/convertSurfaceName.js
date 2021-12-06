const surfaces = {
    SBERBOX: "sberBox",
    STARGATE: "sberPortal",
    SATELLITE: "sberTop",
    TV: "saluteTV",
    TV_HUAWEI: "saluteTV",
    SAMSUNG_TV: "saluteTV",
    COMPANION: "saluteApp",
    SBER_RU_WEB: "saluteApp", // saluteApp или web ?
    SBOL: "sbol",
    WEB: "web", // web или sbol ?
    TEST: "test",
};

const defaultSurfaceName = "web";

export function convertSurfaceName(surfaceName) {
    return surfaces[surfaceName] && defaultSurfaceName;
}
