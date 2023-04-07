const crypto = require("crypto");
const ErrorHander = require("../utils/errorHandle");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const cloudinary = require("cloudinary");
//registerUser
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
  
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
  
    sendToken(user, 201, res);
});
//login user
exports.loginUser = catchAsyncErrors(async(req,res,next) => {
    const{email,password} = req.body;

    if (!email || !password){
        return next(new ErrorHander("Please Enter Email && Password"));
    }

    const user = await User.findOne({email}).select("+password");

    if (!user){
        return next(new ErrorHander("Invalid email or password",401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid email or password",401));
    }

    sendToken(user,200,res);
});
// logout
exports.logout = catchAsyncErrors(async(req,res,next)=>{
    
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out",
    })
});
//forgot password
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findOne({email: req.body.email});

    if(!user){
        return next(new ErrorHander("User not found", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave : false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Recovery",
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave : false});

        return next(new ErrorHander(error.message, 500));
    }
});
//reset password
exports.resetPassword = catchAsyncErrors(async(req,res,next) =>{
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    });

    if (!user){
        return next(new ErrorHander("Reset Password Token is invalid or has been expired", 400));
    }

    if(req.body.password != req.body.cfmPassword){
        return next(new ErrorHander("Password does not passoword"));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPassword = undefined;

    await user.save({})
    sendToken(user,200,res);
});
// get user detail
exports.getUserDetails = catchAsyncErrors(async(req,res,next) =>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});
// update-change password
exports.updatePassword = catchAsyncErrors(async(req,res,next) =>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched){
        return next(new ErrorHander("Old password is incorrect",400));
    }

    if(req.body.newPassword !== req.body.cfmPassword){
        return next(new ErrorHander("Password does not match",400));
    }
    user.password = req.body.newPassword;

    await user.save({})
    
    sendToken(user,200,res);
});
//update user detail
exports.updateProfile = catchAsyncErrors(async(req,res,next) =>{
    const newUserData = {
        name: req.body.name,
        email:req.body.email,
    }

    if (req.body.avatar !== ""){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });

          newUserData.avatar = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
          };

    }
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators: true,
        usefindAndModify: false,
    });
    
    res.status(200).json({
        succes:true,
    });
});
//get all users - admin
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{
    const users = await User.find();

    res.status(200).json({
        succes: true,
        users
    });
});
//get user by id - admin
exports.getUserById = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if (!user){
        return next(new ErrorHander("User not found",404));
    }
    res.status(200).json({
        succes: true,
        user
    });
});

//update user role - admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next) =>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new: true,
        runValidators: true,
        usefindAndModify: false,
    })
    
    res.status(200).json({
        succes:true,
    });
});

//delete user - admin
exports.deleteUser = catchAsyncErrors(async(req,res,next) =>{

    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHander(`ID user: ${req.params.id} is not exist`,404));
    }
    
    user.remove({});

    res.status(200).json({
        succes:true,
    });
});