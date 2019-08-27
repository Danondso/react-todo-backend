import mongoose from 'mongoose';

var TaskSchema = new mongoose.Schema(
  {
    project: {
      type: String,
      required: false,
      trim: true,
    },
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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

export default TaskSchema;
