import createHtmlResource from "./createHtmlResource";
import createIframeResource from "./createIframeResource";
import createStaticResource from "./createStaticResource";

const createResource = (document, data) => {
    const { staticResource, htmlResource, iFrameResource } = data;

    if (Boolean(staticResource)) {
        return createStaticResource(staticResource, {
            data,
            document,
        });
    }

    if (Boolean(htmlResource)) {
        return createHtmlResource(htmlResource, {
            data,
            document,
        });
    }

    return createIframeResource(iFrameResource, {
        data,
        document,
    });
};

export default createResource;
