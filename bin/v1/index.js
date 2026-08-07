
import fixAnyJs from "express-fix-any-js";

import getSourcePath from "./getSourcePath.js";
import getDestinationPath from "./getDestinationPath.js";
import copyTemplate from "./copyTemplate.js";

export default (toPath, tableName) => {
    let fromRakaPoka;
    // const fileType = discover(toPath);
    const fileType = "fromRoutesJsEnd";
    const alterArray = [
        { "key": "<TABLE_NAME>", "value": tableName }
    ];

    const source = getSourcePath({ inFileType: fileType });
    const destination = getDestinationPath(toPath, tableName);

    const isTemplateCopied = copyTemplate(source, destination);

    if (isTemplateCopied) {
        fromRakaPoka = fixAnyJs({
            inTargetPath: toPath, alterArray,
            inFileType: fileType,
            inValue: tableName, OutValue: tableName
        });
    };

    return { fromRakaPoka };
};