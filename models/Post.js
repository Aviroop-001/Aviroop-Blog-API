const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    author: {
      type: String,
      required: true,
    },
    categories: {
        type: [String],
        required: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
