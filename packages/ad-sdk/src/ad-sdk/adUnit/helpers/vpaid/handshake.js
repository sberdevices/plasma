import { handshakeVersion } from "./api";

const major = (version) => {
    const parts = version.split(".");

    return parseInt(parts[0], 10);
};

const isSupported = (supportedVersion, creativeVersion) => {
    const creativeMajorNum = major(creativeVersion);

    if (creativeMajorNum < 1) {
        return false;
    }

    return creativeMajorNum <= major(supportedVersion);
};

const handshake = (creative, supportedVersion) => {
    const creativeVersion = creative[handshakeVersion](supportedVersion);

    if (!isSupported(supportedVersion, creativeVersion)) {
        throw new Error(`Creative Version '${creativeVersion}' not supported`);
    }

    return creativeVersion;
};

export default handshake;
