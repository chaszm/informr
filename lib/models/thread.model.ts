import mongoose from "mongoose"

const threadSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    //logs when post was created
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    //thread replies
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
})

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema)

export default Thread
