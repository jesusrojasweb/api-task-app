const router = require("express").Router();

router.use("/tasks", require("./task.route"));

module.exports = router;
