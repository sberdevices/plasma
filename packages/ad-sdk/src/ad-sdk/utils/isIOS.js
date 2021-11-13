/* eslint-disable filenames/match-regex */
const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export default isIOS;
