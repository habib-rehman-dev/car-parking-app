import mongoose from "mongoose";
import bcrypt from "bcryptjs";

let UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Please Enter the Email Address"],
      match: [/^\S+@\S+\.\S+$/, "Please Enter Valid Email Address"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password Must be 8 characters lengthy"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});
UserSchema.methods.matchpassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

let User = mongoose.model("User", UserSchema);

export default User;
