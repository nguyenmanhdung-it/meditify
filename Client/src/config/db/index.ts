const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/education_dev", {});
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
}

export { connect };

