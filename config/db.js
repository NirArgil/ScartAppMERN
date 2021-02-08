// Connect to the database
const config = require("config");
const mongoose = require("mongoose");

let db = config.get("MongoURI");

if(process.env.DB_URL) {
  db = process.env.DB_URL;
}

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    console.log("MongoDB Connection established...");
  } catch (err) {
    console.log(err.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;