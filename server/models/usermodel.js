const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Scheme = mongoose.Schema;

const userSchema = new Scheme(
  {
    username: { type: String, required: true },
    password: { type: String },
    email: { type: String, unique: true },

    profilepicture: { type: String, default: "default.png" },
    favoriteAnimes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "animes",
      },
    ],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.statics.validate = async function (
  password,
  email,
  username,
  isSignup
) {
  if (isSignup) {
    if (!email || !password || !username) {
      return "please fill in all the inputs";
    }
  }

  if (email) {
    const exists = await this.findOne({ email });

    if (exists) {
      return "email is already taken";
    }

    if (!validator.isEmail(email)) {
      return "invalid email";
    }
  }

  if (password) {
    if (!validator.isStrongPassword(password)) {
      return "password is not strong enough";
    }
  }
  return false;
};

userSchema.statics.signup = async function (password, email, username) {
  const error = await this.validate(password, email, username, true);
  if (error) {
    throw new Error(error);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ username, password: hashedPassword, email });

  return user;
};

userSchema.statics.updateDetails = async function (
  password,
  email,
  username,
  currentPassword,
  id
) {
  const error = await this.validate(password, email, username, false);
  if (error) {
    throw new Error(error);
  }
  if (!currentPassword) {
    throw new Error("current password does not match");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.findById({ _id: id });
  const auth = await bcrypt.compare(currentPassword, user.password);
  if (auth) {
    const updateUser = await this.updateOne(
      { _id: id },
      {
        password: hashedPassword,
        email,
        username,
      }
    );

    return updateUser;
  } else {
    throw new Error("password is not correct");
  }
};
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("please fill in all the inputs");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("wrong email");
  } else {
    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      throw new Error("wrong password");
    }
    return user;
  }
};
module.exports = mongoose.model("user", userSchema);
