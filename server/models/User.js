import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { token } from "morgan";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username must be at most 20 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    validate: {
      validator: function (email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    validate: {
      validator: function (name) {
        return /^[a-zA-Z]+$/.test(name);
      },
      message: "{VALUE} is not a valid first name!",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    validate: {
      validator: function (name) {
        return /^[a-zA-Z]+$/.test(name);
      },
      message: "{VALUE} is not a valid last name!",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Confirm Password is required"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: `Passwords are not the same!`,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin", "superadmin", "agent"],
    default: "user",
  },
  validTokenDate: {
    type: Date,
    default: new Date(),
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Password hashing
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.checkPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000);
    return JWTTimestamp < changedTimestamp; // false means NOT changed
  }
};

userSchema.methods.isTokenLatest = function (tokenDate) {
  if (!this.validTokenDate) return false;
  const tokenTimestamp = Math.floor(this.validTokenDate.getTime() / 1000);

  return tokenDate < tokenTimestamp; // true means NOT latest
};

export default mongoose.model("User", userSchema);
