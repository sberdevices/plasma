export const SUPPORTED_MIMETYPES = [
    "text/javascript",
    "text/javascript1.0",
    "text/javascript1.2",
    "text/javascript1.4",
    "text/jscript",
    "application/javascript",
    "application/x-javascript",
    "text/ecmascript",
    "text/ecmascript1.0",
    "text/ecmascript1.2",
    "text/ecmascript1.4",
    "text/livescript",
    "application/ecmascript",
    "application/x-ecmascript",
];

const isSupported = ({ type }) => SUPPORTED_MIMETYPES.some((mimetype) => mimetype === type);

export default isSupported;
