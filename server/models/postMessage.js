import mongoose from "mongoose";
import { nanoid } from "nanoid";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  commentsInfo: {
    postComment: [
      {
        _id: {
          type: String,
          default: () => nanoid(10),
        },
        commenterId: { type: String },
        commenterName: { type: String },
        comment: { type: String },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
