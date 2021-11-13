import { get, getAll, getFirstChild } from "../../xml";

const getLinearCreative = (ad) => {
    const adTypeElement = getFirstChild(ad);
    const creativesElement = adTypeElement && get(adTypeElement, "creatives");
    const hasLinear = (creative) => get(creative, "linear");

    return (creativesElement && getAll(creativesElement).find(hasLinear)) || null;
};

export default getLinearCreative;
