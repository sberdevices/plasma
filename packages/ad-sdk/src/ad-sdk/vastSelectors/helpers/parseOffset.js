import parseTime from "./parseTime";

const isPercentage = (offset) => {
    const percentageRegex = /^\d+(\.\d+)?%$/g;

    return percentageRegex.test(offset);
};

const parseOffset = (offset) => {
    if (isPercentage(offset)) {
        return offset;
    }

    return parseTime(offset);
};

export default parseOffset;
