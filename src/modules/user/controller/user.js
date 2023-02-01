import bcrypt from 'bcryptjs'
import {  findById, findOne, findOneAndUpdate, updateOne } from '../../../../DB/DBMethods.js';
import userModel from '../../../../DB/model/user.model.js';
import { asyncHandler } from '../../../services/errorHandling.js';

export const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await userModel.findById(req.user._id);
  const match = bcrypt.compareSync(oldPassword, user.password);
  if (!match) {
    return  res.json({ message: "In-valid logIn password" });
  } else {
    const hash = bcrypt.hashSync(newPassword, parseInt(process.env.SALTROUND));
    await userModel.updateOne({ _id: user._id }, { password: hash });
    return  res.json({ message: "DONE" });
  }
});

export const softDeleteAccount =asyncHandler( async (req, res,next) => {

      const { _id } = req.user;
      const user_check = await findOneAndUpdate({model:userModel,filter:{_id,role:"User",deleted:false,blocked:false},data:{deleted: true} ,options:{new:true}})

      if (!user_check) {
        return    next(new Error(' This account is already marked as deleted or blocked from the admin side  ',{cause:400}))
       
      } else {
        return  res
          .status(200)
          .json({ message: "your account is marked as deleted successfully" });
      }
    } 
)

export const blockAccount = asyncHandler(async (req, res, next) => {
  const userRole = req.user.role;

  if (userRole === "Admin") {
    const { _id } = req.body;
    const userCheck = findOne({
      model: userModel,
      filter: { _id, deleted: false, blocked: false, role: "User" },
    });

    if (userCheck) {
      await updateOne({
        model: userModel,
        filter: { _id },
        data: { blocked: true },
      });

      return  res.status(200).json({ message: "Done" });
    } else {
      return  next(new Error("This user not exist Or Already blocked", { cause: 401 }));
    }
  }
});

export const getUserById = asyncHandler(async (req, res, next) => {
  let {id} = req.params
  let user = await findById({model:userModel,filter:id})
  if (!user) {
    next( new Error("invalid category", {cause:404}))
  } else {
      res.status(200).json({ message: "Done", user });

  }

});