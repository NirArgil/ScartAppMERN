// Dependencies
const config = require("config");
const express = require("express");
// const request = require("request");

const router = express.Router();
const { check, validationResult } = require("express-validator");

// Import Directories
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
// const Post = require("../../models/Posts");


// @route  GET api/profile/me
// @desc   Get Current User's Profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user",
      ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({
        msg: "There is no profile for this user"
      });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/profile
// @desc   Create or Update User's Profile
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("gender", "Gender is required")
        .not()
        .isEmpty(),
      check("interests", "Interests is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    };

    const {      
      location,
      bio,
      gender,
      interests,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build Profile Object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (gender) profileFields.gender = gender;
    if (interests) {
      profileFields.interests = interests.split(",").map((interest) => interest.trim());
    };

    // Build Social Profiles Object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({
        user: req.user.id
      });

      if (profile) {
        // Update Profile
        profile = await Profile.findOneAndUpdate(
          {
            user: req.user.id
          },
          {
            $set: profileFields
          },
          {
            new: true
          }
        );

        return res.json(profile);
      };

      // Create Profile if none exists
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  }
);

// @route  GET api/profile
// @desc   Get All Profiles
// @access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate("user", ["name", "avatar"]);

    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// @route  GET api/profile/user/:user_id
// @desc   Get Profile by User ID
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id })
      .populate("user", ["name", "avatar"]);

    // Check if a Profile for the User Exists
    if (!profile)
      return res.status(400).json({
        msg: "Profile not found!"
      });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({
        msg: "Profile not found!"
      });
    }
    res.status(500).send("Server Error!");
  }
});

// @route  DELETE api/profile
// @desc   Delete Profile, User & Posts
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    // // Remove User Post(s)
    // await Post.deleteMany({ user: req.user.id });

    // Remove User Profile
    await Profile.findOneAndRemove({
      user: req.user.id
    });

    // Remove User Account
    await User.findOneAndRemove({
      _id: req.user.id
    });

    res.json({
      msg: "User Deleted!"
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;