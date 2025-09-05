import bcrypt from 'bcryptjs'
import userModel from '../../DB/model/user.model.js';



export const Admin = async()=>{
   
        const userName = process.env.ADMIN_USERNAME || "admin";
        const email = process.env.ADMIN_EMAIL || "admin@example.com";
        const role = "Admin";
        const password = process.env.ADMIN_PASSWORD || "defaultPassword123";
        const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
        const confirmEmail = true;
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