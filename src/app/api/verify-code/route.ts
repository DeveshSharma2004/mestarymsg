import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(request: Request) {
    await dbConnect()

    try {
        const {username, code} = await request.json()

        const decodedUsername = decodeURIComponent(username)
       const user =  await UserModel.findOne({
            username:decodedUsername
        })
        if (!user) {
            return Response.json({
                success: false,
                message: "user not found",
            },
            {status:500})
        }

        const isCodeValid = user.varifyCode === code
        const isCodeNotExpired = new Date(user.varifyCodeExpiry) > new Date() 

        if (isCodeValid && isCodeValid) {
            user.isVerified = true
            await user.save()

            return Response.json({
                success: true,
                message: "Account verified succcessfully",
            },
            {status:200})
        } else if (!isCodeNotExpired) {
            return Response.json({
                success: false,
                message: "Verification code has expired plase signup again to get a new code",
            },
            {status:400})
        } else {
            return Response.json({
                success: false,
                message: "Incorrect verification code",
            },
            {status:400})
        }


    } catch (error) {
        console.error("Error verifying user" , error)
        return Response.json({
            success: false,
            message: "Error verifying user",
        },
        {status:500})
    }
}