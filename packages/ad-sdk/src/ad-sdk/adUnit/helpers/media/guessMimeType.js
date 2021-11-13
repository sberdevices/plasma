/* eslint-disable id-match*/
const guessMimeType = function (src) {
    const mimeMap = {
        "3gp": "video/3gpp",
        avi: "video/x-msvideo",
        flv: "video/x-flv",
        m3u8: "application/x-mpegURL",
        m4v: "video/mp4",
        mov: "video/quicktime",
        mp4: "video/mp4",
        mpd: "application/dash+xml",
        ogv: "video/ogg",
        ts: "video/MP2T",
        webm: "video/webm",
        wmv: "video/x-ms-wmv",
    };
    const match = src.match(/\.([^./?]+)(\?[^/]+)?$/i);
    const ext = match && match[1];

    return mimeMap[ext] || "video/" + ext;
};

export default guessMimeType;
