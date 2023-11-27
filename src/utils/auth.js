import GoogleProvider from "next-auth/providers/google";
import connect from "./db.js";
import userModel from "@/models/user.js";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    // pages: {
    //     signIn: "/signIn"
    // },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider == "google") {
                await connect();
                try {
                    const existingUser = await userModel.findOne({ email: user.email });
                    if (!existingUser) {
                        const newUser = new userModel({
                            email: user.email,
                            name: user.name
                        });

                        await newUser.save();
                        return true;
                    };
                    return true;
                } catch (err) {
                    console.log("Error saving user", err);
                    return false;
                };
            };
            return true;
        }
    },
};