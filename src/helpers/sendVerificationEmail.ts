 import { resend } from "../lib/resend";
import VerificationEmail from "../../email/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    Verifycode:string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Mystery message | verification code',
            react: VerificationEmail({username, otp: Verifycode}),
          });
      
        return {Success: true, message: "verification email send successfully"}
    } catch (emailError) {
        console.error("Error sending verification email",emailError);
        return {Success: false, message: "Failed to send verification email"}
        
    }
}