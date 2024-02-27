const express = require('express');
const { getUser,addUser, updateUser,deleteUser} = require('../controller/user.controller');

const router = express.Router();

router.route("/getUser").get(getUser);
router.route("/addUser").post(addUser);
router.route("/updateUser/:id").put(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);

module.exports = router;