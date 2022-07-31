const router = require("express").Router();
const jwt_decode = require("jwt-decode");

const Task = require("../../models/task.model");

router.get("/", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    const userId = jwt_decode(accessToken).sub;

    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.json(newTask);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put("/:taskId", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    const userId = jwt_decode(accessToken).sub;
    const taskEdit = await Task.findOneAndUpdate(
      { _id: req.params.taskId, userId },
      req.body,
      {
        new: true,
      }
    );
    res.json(taskEdit);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete("/:taskId", async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    const userId = jwt_decode(accessToken).sub;

    // const task = await Task.findByIdAndDelete(req.params.taskId);
    const task = await Task.findOneAndRemove({
      _id: req.params.taskId,
      userId,
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
