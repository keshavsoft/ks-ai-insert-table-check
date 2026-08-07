import fs from "fs";

const startFunc = (inJsPath) => {
    try {
        if (!fs.existsSync(inJsPath)) return false;

        return true;
    } catch (error) {
        console.log("error : ", error);

        return false;
    };
};

export default startFunc;