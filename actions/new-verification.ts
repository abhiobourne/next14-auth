"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import email from "next-auth/providers/email";


export const newVerification = async (token : string) => {
    const exisitngToken = await getVerificationTokenByToken(token);

    if(!exisitngToken){
        return {error: "Token does not exist!"};
    }

    const hasExpired = new Date(exisitngToken.expires) < new Date();

    if(hasExpired) {
        return { error: "Token is expired!"};
    }
    const exisitingUser = await getUserByEmail(exisitngToken.email);

    if(!exisitingUser) {
        return {error: "Email does not exist!"}
    }
    await db.user.update({
        where: {
            id: exisitingUser.id,
        },
        data: {
            emailVerified: new Date(),
            email: exisitingUser.email,
        }
    });

    return { success: "Email verified!"}
}