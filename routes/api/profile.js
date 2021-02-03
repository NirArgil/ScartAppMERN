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


//---------------USER PROFILE START---------------\\

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

//-------------------USER PROFILE END-----------------\\

//--------------PROFILE EXPERIENCE START---------------\\

// @route    PUT api/profile/experience
// @desc     Add Profile Experience
// @access   Private
// router.put(
//   "/experience",
//   [
//     auth,
//     [
//       check("title", "Title is required")
//         .not()
//         .isEmpty(),
//       check("company", "Company is required")
//         .not()
//         .isEmpty(),
//       check("from", "From date is required")
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array()
//       });
//     }

//     const {
//       title,
//       company,
//       location,
//       from,
//       to,
//       current,
//       description
//     } = req.body;

//     const newExp = {
//       title,
//       company,
//       location,
//       from,
//       to,
//       current,
//       description
//     };

//     try {
//       const profile = await Profile.findOne({
//         user: req.user.id
//       });

//       profile.experience.unshift(newExp);

//       await profile.save();

//       res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete Experience from Profile
// @access   Private
// router.delete("/experience/:exp_id", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       user: req.user.id
//     });

//     // Get the Remove Index
//     const removeIndex = profile.experience
//       .map(item => item.id)
//       .indexOf(req.params.exp_id);

//     profile.experience.splice(removeIndex, 1);

//     await profile.save();

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error!");
//   }
// });

//--------------PROFILE EXPERIENCE END---------------\\

//--------------PROFILE EDUCATION START---------------\\

// @route    PUT api/profile/education
// @desc     Add Profile Education
// @access   Private
// router.put(
//   "/education",
//   [
//     auth,
//     [
//       check("school", "School is required")
//         .not()
//         .isEmpty(),
//       check("degree", "Degree is required")
//         .not()
//         .isEmpty(),
//       check("from", "From is required")
//         .not()
//         .isEmpty(),
//       check("fieldofstudy", "Field of study date is required")
//         .not()
//         .isEmpty()
//     ]
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array()
//       });
//     };

//     const {
//       school,
//       degree,
//       fieldofstudy,
//       from,
//       to,
//       current,
//       description
//     } = req.body;

//     const newEdu = {
//       school,
//       degree,
//       fieldofstudy,
//       from,
//       to,
//       current,
//       description
//     };

//     try {
//       const profile = await Profile.findOne({
//         user: req.user.id
//       });

//       profile.education.unshift(newEdu);

//       await profile.save();

//       res.json(profile);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server Error");
//     }
//   }
// );

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete Education from Profile
// @access   Private
// router.delete("/education/:edu_id", auth, async (req, res) => {
//   try {
//     const profile = await Profile.findOne({
//       user: req.user.id
//     });

//     // Get the Remove Index
//     const removeIndex = profile.education
//       .map(item => item.id)
//       .indexOf(req.params.edu_id);

//     profile.education.splice(removeIndex, 1);

//     await profile.save();

//     res.json(profile);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error!");
//   }
// });

//--------------PROFILE EDUCATION END---------------\\

//------------PROFILE GITHUB REPOS START-------------\\

// @route    GET api/profile/github/:username
// @desc     Get User Repos from Github
// @access   Public
// router.get("/github/:username", (req, res) => {
//   try {
//     const options = {
//       uri: `https://api.github.com/users/${
//         req.params.username
//       }/repos?per_page=5&sort=created:asc&client_id=${config.get(
//         "githubClientId"
//       )}&client_secret=${config.get("githubSecret")}`,
//       method: "GET",
//       headers: {
//         "user-agent": "node.js"
//       }
//     };

//     request(options, (error, response, body) => {
//       if (error) console.error(error);

//       if (response.statusCode !== 200) {
//         return res.status(400).json({ msg: "No Github profile found!" });
//       }

//       res.json(JSON.parse(body));
//     });

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error!");
//   }
// });

//------------PROFILE GITHUB REPOS END-------------\\

module.exports = router;