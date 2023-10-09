import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: import.meta.env.GOOGLE_ID,
            clientSecret: import.meta.env.GOOGLE_SECRET,
            fetchBasicProfile: true
        }),
    ],
    session: {
        strategy: 'jwt',
    },
};
export default NextAuth(authOptions);