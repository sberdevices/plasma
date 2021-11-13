import getContentDocument from "./getContentDocument";
import getOrigin from "./getOrigin";
import supportsSrcdoc from "./supportsSrcdoc";

const iframeContent = (id, targetOrigin) => `<!DOCTYPE html>
<html>
  <head><meta charset='UTF-8'></head>
  <body style='margin:0;padding:0'>
  <script type='text/javascript'>window.parent.postMessage('${id}_ready', '${targetOrigin}');</script>
  </body>
</html>`;

const createBaseIframe = () => {
    const iframe = document.createElement("IFRAME");

    iframe.sandbox = "allow-forms allow-popups allow-scripts allow-same-origin";
    iframe.loading = "eager";
    iframe.style.margin = "0";
    iframe.style.padding = "0";
    iframe.style.border = "none";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.position = "absolute";

    return iframe;
};

const createIframe = (placeholder, id) =>
    new Promise((resolve, reject) => {
        const content = iframeContent(id, getOrigin());
        let iframe;

        /*
    NOTE: favor about:blank instead of srcdoc because some browsers
  */
        try {
            iframe = createBaseIframe();
            iframe.src = "about:blank";
            placeholder.appendChild(iframe);
            getContentDocument(iframe).write(content);
        } catch (error) {
            placeholder.removeChild(iframe);

            if (supportsSrcdoc()) {
                iframe = createBaseIframe();
                iframe.src = "about:srcdoc";
                iframe.srcdoc = content;
                placeholder.appendChild(iframe);
            } else {
                reject(error);
            }
        }

        const handleMessage = ({ data }) => {
            /* istanbul ignore else */
            if (data === `${id}_ready`) {
                window.removeEventListener("message", handleMessage);
                resolve(iframe);
            }
        };

        window.addEventListener("message", handleMessage, false);
    });

export default createIframe;
