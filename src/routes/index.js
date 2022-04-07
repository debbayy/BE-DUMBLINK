const express = require("express");

const router = express.Router();

const { auth } = require("../middlewares/auth");

//requere user

//auth
const { register, login } = require("../controllers/auth");
router.post("/register", register);
router.post("/login", login);

//user
const { getUsers } = require("../controllers/user");
router.get("users", getUsers);

//route grouplink
const {
  addGrouplink,
  getGrouplinks,
  getGrouplink,
  updateGrouplink,
  deleteGrouplink,
} = require("../controllers/grouplink");
router.post("/grouplink", auth, addGrouplink);
router.get("/grouplinks", getGrouplinks);
router.get("/grouplink/:id", getGrouplink);
router.patch("/grouplink/:id", updateGrouplink);
router.delete("/grouplink/:id", deleteGrouplink);

//route links
const { addlinks, getLinks } = require("../controllers/links");
router.post("/link", auth, addlinks);
router.get("/links", getLinks);

module.exports = router;
