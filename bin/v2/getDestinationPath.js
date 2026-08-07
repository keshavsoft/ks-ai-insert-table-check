import path from "path";

const getDestinationPath = (toPath, folderName) => {
    return path.join(toPath, folderName);
};

export default getDestinationPath;
