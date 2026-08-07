import path from "path";

const startFunc = ({ inTargetPath, inFileNameStory }) => {
    const fileNamesJson = inFileNameStory;

    const localJsPath = path.join(inTargetPath, fileNamesJson?.fileName);

    return localJsPath;
};

export default startFunc;