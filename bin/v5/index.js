import {
    fileNamesJson as fromNpm,
    outputStructureJson as getOutputStructureJson
} from "pattern-collector-base-files";

import checkFile from "./checkFile.js";
import returnPath from "./returnPath.js";

export default (inTargetPath) => {
    const fileType = "fromRoutesJsEnd";
    const fileNamesJson = fromNpm();

    const localFileNameStory = fileNamesJson[fileType];
    const localJsPath = returnPath({ inFileNameStory: localFileNameStory, inTargetPath });
    const outputStructureJson = getOutputStructureJson();

    if (!checkFile(localJsPath)) {
        outputStructureJson.KTF = false;
        outputStructureJson.KReason = `file not found : ${localJsPath}`;

        return outputStructureJson;
    };

    outputStructureJson.KTF = true;
    outputStructureJson.KReason = `file found : ${localJsPath}`;

    return outputStructureJson;
};