import express from "express";
import { getKYC, getPresignURL, submitKYC, updateKYC } from "./controller";
const router = express.Router();
const auth = require("../../middleware/auth");
const roleAuth = require("../../middleware/role");

import multer from "multer";
import { accessAllowed } from "../../utils/permision";
const upload = multer({ dest: "uploads/" });

router.post(
  "/kyc",
  auth,
  roleAuth(accessAllowed.USER_ONLY),
  upload.single("document"),
  submitKYC
);
router.get("/kyc", auth, roleAuth(accessAllowed.ALL_USERS), getKYC);

router.patch("/kyc/:id", auth, roleAuth(accessAllowed.ADMIN_ONLY), updateKYC);

router.get("/kyc/generate-presigned-url", getPresignURL);

module.exports = router;
