import { getBannerBlockId, getVideoBlockId } from "./blockId";

describe("blockId.js", () => {
    test.each([
        ["COMPANION", "579439695", "579439707"],
        ["SBERBOX", "579438199", "579434841"],
        ["STARGATE", "579439689", "579439701"],
        ["SATELLITE", "579439691", "579439703"],
        ["TV", "579439693", "579439705"],
        ["TV_HUAWEI", "579439693", "579439705"],
        ["SAMSUNG_TV", "579439693", "579439705"],
        ["SBER_RU_WEB", "579439699", "579439711"],
        ["SBOL", "579439697", "579439709"],
        ["WEB", "579439697", "579439709"],
        ["TEST", "579444584", "579444582"],
    ])("%s - banner block_id is %s and video block_id is %s", (surfaceName, bannerBlockId, videoBlockId) => {
        expect(getBannerBlockId(surfaceName)).toBe(bannerBlockId);
        expect(getVideoBlockId(surfaceName)).toBe(videoBlockId);
    });
});
