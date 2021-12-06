import { getBannerPadId, getVideoPadId } from "./padId";

describe("padId.js", () => {
    test.each([
        ["COMPANION", "579439671", "579439681"],
        ["SBERBOX", "579438197", "579434839"],
        ["STARGATE", "579439665", "579439675"],
        ["SATELLITE", "579439667", "579439677"],
        ["TV", "579439669", "579439679"],
        ["TV_HUAWEI", "579439669", "579439679"],
        ["SAMSUNG_TV", "579439669", "579439679"],
        ["SBER_RU_WEB", "579439685", "579439687"],
        ["SBOL", "579439673", "579439683"],
        ["WEB", "579439673", "579439683"],
        ["TEST", "441753614", "579443336"],
    ])("%s - banner pad_id is %s and video pad_id is %s", (surfaceName, bannerPadId, videoPadId) => {
        expect(getBannerPadId(surfaceName)).toBe(bannerPadId);
        expect(getVideoPadId(surfaceName)).toBe(videoPadId);
    });
});
