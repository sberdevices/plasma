const getResource = ({ staticResource, htmlResource, iFrameResource } = {}) =>
    staticResource || htmlResource || iFrameResource;

export default getResource;
