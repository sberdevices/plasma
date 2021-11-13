const supported = "srcdoc" in document.createElement("iframe");
const supportsSrcdoc = () => supported;

export default supportsSrcdoc;
