import bcrypt from 'bcryptjs'
import userModel from '../../DB/model/user.model.js';



export const Admin = async()=>{
   
        const  userName="Fatma";
        const email="tomafhf@gmail.com";
        const role="Admin";
        const password="159951FfSs";
        const hashPassword=bcrypt.hashSync(password,parseInt( process.env.SALTROUND));
        const confirmEmail=true;
        const Admins=await userModel.find({role:"Admin"})
   
        if(Admins.length>0){
           console.log("There is Admin")
        }else{
           const newAdmin = await userModel({
               email,
               password:hashPassword,
               role,
               confirmEmail,
               userName
           })

           await newAdmin.save()
           console.log("Admin Added Done")
        
       
       
    } 
}