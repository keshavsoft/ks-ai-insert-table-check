import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getSourcePath = ({ inFileType }) => {

    return path.join(__dirname, "..", "template", inFileType);

};

export default getSourcePath;
