import { createFolder } from "./createFolder.js";

const copyTemplate = (source, destination) => {
    const response = createFolder({ source, destination });

    return response?.KTF || false;
};

export default copyTemplate;
