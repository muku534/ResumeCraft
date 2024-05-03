import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const options = {
    providers: [
        GithubProvider({
            clientId: process.env.GITH,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "Your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Your-awesome-password"
                }
            },
            async authorize(credentials) {
                const user = { id: "01", name: "Max", password: "nextauth" };
                if (credentials?.username === user.name && credentials.password === user.password) {
                    return Promise.resolve(user);
                } else {
                    return Promise.resolve(null);
                }
            }
        })
    ]
};

export default options;
