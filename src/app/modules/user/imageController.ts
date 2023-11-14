/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from "express";
import cloudinary from "../../../config/cloudinary";
import upload from "../../middlewares/multer";
const router = express.Router();

router.post("/", upload.single("image"), function (req, res) {
  // @ts-ignore
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }

    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  });
});

export const imageRoute = router;

// const createUser = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const userData: IUser = req.body;

//     if (req.file) {
//       // @ts-ignore
//       cloudinary.uploader.upload(req.file?.path, async function (err, result) {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({
//             success: false,
//             message: "Error uploading image",
//           });
//         }
//         if (!result) {
//           throw new ApiError(
//             httpStatus.BAD_REQUEST,
//             "Error creating user in controller"
//           );
//         }
//         userData.profileImage = result.secure_url;

//         const userAllData = await userService.createUser(userData);
//         if (!userAllData) {
//           throw new ApiError(
//             httpStatus.BAD_REQUEST,
//             "Error creating user in controller"
//           );
//         }

//         sendResponse<IResponse>(res, {
//           statusCode: httpStatus.OK,
//           success: true,
//           message: "User created successfully!",
//           data: userAllData,
//         });
//       });
//     } else {
//       const result = await userService.createUser(userData);

//       if (!result) {
//         throw new ApiError(
//           httpStatus.BAD_REQUEST,
//           "This error for controller get null"
//         );
//       }

//       sendResponse<IResponse>(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "User created successfully!",
//         data: result,
//       });
//     }
//   }
// );
