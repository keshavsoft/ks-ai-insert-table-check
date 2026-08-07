import { fileNamesJson as fromNpm } from "pattern-collector-base-files";

import checkFile from "./checkFile.js";
import returnPath from "./returnPath.js";

export default (inTargetPath) => {
    const fileType = "fromRoutesJsEnd";
    const fileNamesJson = fromNpm();

    const localFileNameStory = fileNamesJson[fileType];
    const localJsPath = returnPath({ inFileNameStory: localFileNameStory, inTargetPath });

    if (!checkFile(localJsPath)) {
        return {
            KTF: false,
            KReason: `file not found : ${localJsPath}`
        };
    };

    return {
        KTF: true,
        KReason: `file found : ${localJsPath}`
    };
};