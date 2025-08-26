import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim : true
    },

    description: {
      type: String,
      required: true,
      trim : true,
      lowercase : true,
      minlength : 10,
      maxLength : 1000
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required : true
    },
    category: {
      type: String,
    },

  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
