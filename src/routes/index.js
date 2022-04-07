const express = require("express");

const router = express.Router();

const { register, login } = require("../controllers/auth");

const { addGrouplink } = require("../controllers/grouplink");

const { addlinks } = require("../controllers/links");

const { auth } = require("../middlewares/auth");

//requere user
const { getUsers } = require("../controllers/user");

//auth
router.post("/register", register);
router.post("/login", login);

//user
router.get("users", getUsers);

//route grouplink
router.post("/grouplink", auth, addGrouplink);

//route links
router.post("/link", auth, addlinks);

module.exports = router;
