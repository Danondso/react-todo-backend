import TaskService from '../../services/task.service';

export class TasksController {
  saveTask(req, res) {
    if (req.body == null || Object.keys(req.body).length === 0)
      return res.status(400).json({
        message: 'Body was empty.',
      });

    TaskService.saveTask(req.body)
      .then(result => {
        return res
          .status(200)
          .json({
            data: result,
          })
          .end();
      })
      .catch(err => {
        return res.status(500).json({
          message: err,
        });
      });
  }

  updateTask(req, res) {
    if (req.body == null || Object.keys(req.body).length === 0)
      return res.status(400).json({
        message: 'Body was empty.',
      });

    TaskService.updateTask(req.body)
      .then(() => {
        return res.status(204).end();
      })
      .catch(error => {
        return res.status(500).json({
          message: error,
        });
      });
  }

  deleteTask(req, res) {
    console.log(req.params.id);
    TaskService.deleteTask()
      .then(() => {
        return res.status(204).end();
      })
      .catch(error => {
        return res.status(500).json({
          message: error,
        });
      });
  }
}

export default new TasksController();
