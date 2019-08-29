import mongoose from 'mongoose';

let TaskSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    createdTime: {
      type: Date,
      required: true,
      trim: true,
    },
  },
  { collection: 'tasks' }
);

const TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel;
