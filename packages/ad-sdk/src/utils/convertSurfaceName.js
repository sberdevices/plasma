const surfaces = {
    SBERBOX: "sberBox",
    STARGATE: "sberPortal",
    SATELLITE: "sberTop",
    TV: "saluteTV",
    TV_HUAWEI: "saluteTV",
    SAMSUNG_TV: "saluteTV",
    COMPANION: "saluteApp",
    SBERZVUK: "saluteApp",
    SBER_RU_WEB: "web",
    SBOL: "sbol",
    WEB: "sbol",
    TEST: "test",
};

const defaultSurfaceName = "sberBox";

export function convertSurfaceName(surfaceName) {
    return surfaces[surfaceName] || defaultSurfaceName;
}
