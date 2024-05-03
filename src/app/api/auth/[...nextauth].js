import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.GitHub({
            clientId: process.env.GITH,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        // Add other authentication providers as needed
    ],
});
