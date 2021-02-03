const mongoose = require("mongoose");

// Create Profile Schema- obj w/ all fields we need
const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // we make reference to the user model since each profile is related to a user
    ref: "user"
  },
  location: {
    type: String
  },
  gender: {
    type: String,
    required: true
  },
  interests: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);