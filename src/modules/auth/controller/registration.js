import userModel from "../../../../DB/model/user.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../../services/email.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { asyncHandler } from "../../../services/errorHandling.js";

 export const signUp=asyncHandler(async(req,res,next)=>{
   
        const {userName,email,password}=req.body;
        const user= await userModel.findOne({email}).select('email')
        if(user){
          return next(new Error ('Email Exist'),{cause:409})
         
        }else{
    const hash = bcrypt.hashSync(password,parseInt(process.env.SALTROUND))
    const newUser=await userModel({userName,email,password:hash})
    const token= jwt.sign({id:newUser._id},process.env.emailToken,{expiresIn:60*60})
    const RFtoken= jwt.sign({id:newUser._id},process.env.emailToken)
    const message=`<a href ='${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}'> confirm Email </a> <br>
    <a href ='${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/requestToken/${RFtoken}'> request token </a>

    `
    const info = await sendEmail(email,'confirm Email',message)

    
    if (info?.accepted?.length) {
        const savedUser= await newUser.save()
        return  res.status(201).json({message:"Done",savedUser:savedUser._id})
    } else {
     return   next(new Error ('email Rejected'),{cause:400})

    }
        }
    } 
   
 )
 
 export const confirmEmail= asyncHandler(async(req,res,next)=>{
    
        const{token}=req.params;
        const decoded=jwt.verify(token,process.env.emailToken)
        if(!decoded?.id){
            
            return    next (new Error('In-valid token Payload'),{cause:400})
          
        }
        else{
            const user=await userModel.updateOne({_id:decoded.id,confirmEmail:false},{confirmEmail:true})
            return res.status(200).redirect('https://www.facebook.com/')
        }

       
 })
    
export const login=asyncHandler(async(req,res,next)=>{
        
            const {email,password}=req.body;
            const user= await userModel.findOne({email})
            if(!user){
                return   next(new Error('Email not Exist'),{cause:400})
                
            }else{
               if (!user.confirmEmail) {
                return  next(new Error('Confirm Email First'),{cause:404})

            
               } else {
                if (user.blocked) {
                    return  next(new Error('Block Account'),{cause:404})


               } else {
                const match = bcrypt.compareSync(password,user.password)
                if(!match){
                    return next(new Error('In-valid Password'),{cause:400})
                    
            
                }else{
                    const token= jwt.sign({id:user._id,isLoggedIn:true},process.env.emailToken,{expiresIn:60*60*24})
                    return  res.status(200).json({message:"Done",token})  }
               }
              
               }
       
        
        
            }
       
       
     })
export const refreshToken=asyncHandler(async(req,res,next)=>{
    const{token}=req.params;
    const decoded=jwt.verify(token,process.env.emailToken)
    if(!decoded?.id){
        return   next(new Error ("In-valid token"),{cause:400})
  
    }else{
        const user = await userModel.findById(decoded.id)
        if(user.confirmEmail){
            return    next(new Error ("Already Confirmed"),{cause:400})
           
        }else{
    const token= jwt.sign({id:user._id},process.env.emailToken,{expiresIn:60*2})
    const message=`<a href ='${req.protocol}://${req.headers.host}${process.env.BASEURL}/auth/confirmEmail/${token}'> confirm Email </a>`

            const info = await sendEmail(user.email,'confirm Email',message)
            return res.status(200).json({message:"Done"})
        }
    }
})
export const sendCode =asyncHandler(async(req,res)=>{
    const{email}=req.body;
    const user = await userModel.findOne({email}).select('email blocked deleted')
    if (user?.blocked||user?.deleted) {
        return   next(new Error ("Can't Send code to non register or blocked account"),{cause:400})
        
     
    } else {
        const code=nanoid()
        await userModel.updateOne({id:user._id},{code})
        sendEmail(user.email,'forget Password',`<h1> plz use this code ${code} to reset your password</h1>`)
        return  res.status(200).json({message:"Done"})
    }
})
export const forgetPassword=asyncHandler(async(req,res,next)=>{
    const{email,code ,password}=req.body;
    const user = await userModel.findOne({email})
    if(!user){
        
        return    next(new Error ("Not Register"),{cause:400})

    }else{
        if(user.code!=code || code==null){
            return    next(new Error ("In-valid Code"),{cause:400})
        }else{
            const hashPassword=  bcrypt.hashSync(password,parseInt(process.env.SALTROUND))
            await userModel.updateOne({_id:user._id},{password:hashPassword, code:null})
            return    res.status.json({message:"Done"})
        }
    }
})