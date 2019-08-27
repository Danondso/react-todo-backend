import TaskService from '../../services/task.service';

export class TasksController {
  saveTask(req, res) {
    if (req.body == null || Object.keys(req.body).length === 0)
      return res.status(400).json({
        message: 'Body was empty.',
      });

    TaskService.saveTask()
      .then(result => {
        return res
          .status(200)
          .json({
            message: result,
          })
          .end();
      })
      .catch(err => {
        return res.status(500).json({
          message: err,
        });
      });
  }
}

export default new TasksController();
