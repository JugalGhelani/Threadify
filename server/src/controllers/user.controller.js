import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .select("-password")
      .select("-updatedAt");

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Signup User
const signupUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in Signup: ", error.message);
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in Login User: ", error.message);
  }
};

// Logout User
const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in Logout User: ", error.message);
  }
};

// Follow-Unfollow User
const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      res.status(400).json({ error: "You cannnot follow/unfollow yourself" });
    }

    if (!userToModify || !currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // Unfollow User
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // Follow
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in FollowUnfollow User: ", error.message);
  }
};

// Update User
const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { profilePic } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    console.log("URL ID:", req.params.id);
console.log("TOKEN USER ID:", req.user._id.toString());
console.log("BODY:", req.body);
    if (req.params.id !== userId.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile." });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // if (profilePic && profilePic !== user.profilePic) {
    //   // if (user.profilePic) {
    //   //   await cloudinary.uploader.destroy(
    //   //     user.profilePic.split("/").pop().split(".")[0],
    //   //   );
    //   // }
    //   console.log("PROFILE PIC TYPE:", typeof profilePic);
    //   console.log("PROFILE PIC PREVIEW:", profilePic?.substring?.(0, 100));
    //   const uploadedResponse = await cloudinary.uploader.upload(profilePic);
    //   profilePic = uploadedResponse.secure_url;
    // }

    // if (profilePic && profilePic !== user.profilePic) {
    //   try {
    //     const uploadedResponse = await cloudinary.uploader.upload(profilePic);

    //     console.log("UPLOAD SUCCESS");
    //     console.log(uploadedResponse.secure_url);

    //     profilePic = uploadedResponse.secure_url;
    //   } catch (err) {
    //     console.log("FULL CLOUDINARY ERROR:");
    //     console.dir(err, { depth: null });
    //     throw err;
    //   }
    // }

    // if (profilePic && profilePic !== user.profilePic) {
    //   console.log("UPLOADING NEW IMAGE");
    //   console.log("IMAGE LENGTH:", profilePic.length);
    //   const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
    //     folder: "threadify_profiles",
    //   });

    //   profilePic = uploadedResponse.secure_url;
    // }

    if (profilePic && profilePic !== user.profilePic) {
      try {
        console.log("UPLOADING NEW IMAGE");
        console.log("IMAGE LENGTH:", profilePic.length);

        const uploadedResponse = await cloudinary.uploader.upload(profilePic, {
          folder: "threadify_profiles",
        });

        console.log("UPLOAD SUCCESS");
        console.log(uploadedResponse);

        profilePic = uploadedResponse.secure_url;
      } catch (err) {
        console.log("========= CLOUDINARY ERROR =========");

        console.log("message:", err.message);
        console.log("http_code:", err.http_code);

        if (err.error) {
          console.log("cloudinary error:", err.error);
        }

        console.log(err);

        throw err;
      }
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;

    user = await user.save();
    res.status(200).json({ message: "Profile updated succesfully", user });
  } catch (error) {
    console.error("========== UPDATE USER ERROR ==========");
    console.error(error);
    console.error("======================================");

    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnfollowUser,
  updateUser,
  getUserProfile,
};
