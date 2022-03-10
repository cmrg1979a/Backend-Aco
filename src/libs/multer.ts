import { pathToArray } from "graphql/jsutils/Path";
import multer from "multer";
const uuid = require("uuid");
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname));
  },
});

export default multer({ storage });
