const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: {
        type: String,
        require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
