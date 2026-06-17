// // testCloudinary.js
// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// try {
//   const result = await cloudinary.uploader.upload(
//     "https://res.cloudinary.com/demo/image/upload/sample.jpg"
//   );

//   console.log(result.secure_url);
// } catch (err) {
//   console.log(err);
// }


// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// try {
//   const result = await cloudinary.uploader.upload(
//     "https://res.cloudinary.com/demo/image/upload/sample.jpg"
//   );

//   console.log("SUCCESS");
//   console.log(result.secure_url);
// } catch (err) {
//   console.log("FULL ERROR:");
//   console.dir(err, { depth: null });
// }

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("CONFIG:");
console.log(cloudinary.config());

try {
  const result = await cloudinary.uploader.upload(
  "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  {
    resource_type: "image",
  }
);
console.log("*******RESULT********")
console.log(result);
} catch (err) {
  console.log("PING ERROR:");
  console.dir(err, { depth: null });
}