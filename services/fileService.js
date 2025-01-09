import * as uuid from "uuid";
import path from "path";

import { fileURLToPath } from "url";

class FileService {
    async saveImg(img) {
        try {
            const fileName = uuid.v4() + ".jpg";
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            await img.mv(path.resolve(__dirname, "..", "static", fileName));
            return fileName;
        } catch (e) {
            return null;
        }
    }
}

export default new FileService();