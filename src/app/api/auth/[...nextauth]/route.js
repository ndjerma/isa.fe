import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {post} from "@/core/httpClient";
import {jwtDecode} from "jwt-decode";


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "Text", placeholder: "Email" },
                password: {label: "Password", type: "Password"},
            },
            async authorize(credentials, req) {
                const res = await post("/auth/login", {
                        email: credentials?.email,
                        password: credentials?.password,
                });

                console.log(res);

                if(res && res.data){
                    return res.data;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
       async jwt({token, user, trigger, session}){
           if(trigger === "update"){
               return { ...token, ...session.user };
           }
           return {...token, ...user};
       },

        async session({ session, token }) {
           session.user = token;
           session.decoded = jwtDecode(session.user.token)
           return session;
        },
    },
    // pages: {
    //     signIn: "/[...nextauth]/login",
    // },
});

export {handler as GET, handler as POST};