 import prisma from "../DB/db.config.js";
 import bcrypt from "bcrypt"
 const expiresAt = new Date();
expiresAt.setHours(expiresAt.getHours() + 1)

// register
export const register = async(req,res)=>{
    const {email,password} = req.body
    const foundUser= await prisma.user.findUnique({
        where:{
            email
        }
    })
    if (foundUser) {
        return res.status(400).json({msg:"User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const createUser= await prisma.user.create({
        data:{
            email,
            role:"USER",
            userSecret:{
                create:{
                    password:hashedPassword,
                    otp:"1234",
                    expiresAt: expiresAt.toISOString(),

                }
            } 

        },
        include:{
            userSecret:true
        }
    })
    return res.status(200).json({createUser})
}