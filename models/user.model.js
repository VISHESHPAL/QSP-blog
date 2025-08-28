import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      select: false,
    },
    totalBlogs: {
      type: Number,
      required: true,
      default: 0,
    },
    blogs: [
      {
        blogId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Blog",
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  let salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

// schemaName.methods.methodName = function () {};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
