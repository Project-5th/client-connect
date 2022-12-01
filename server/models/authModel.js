const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    googleid: String,
    name: String,
    email: String,
    photo: String,
    posts: [{ type: mongoose.Schema.ObjectId, ref: "Post" }],
  },
  {
    timestamps: true,
  }
);

authSchema.pre(/^find/, function (next) {
  this.populate("posts");

  next();
});

const authuser = mongoose.model("authUser", authSchema);

module.exports = authuser;
