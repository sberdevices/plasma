const getOrigin = () => {
    const location = window.location;

    /* istanbul ignore else */
    if (location.origin) {
        return location.origin;
    } else {
        return location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
    }
};

export default getOrigin;
