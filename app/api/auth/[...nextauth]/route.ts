import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

// Extend the built-in session type
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"]
  }
}

// This is just for testing - in production you'd use a real database
const users = new Map<string, { id: string; email: string; password: string }>();

// Function to register a new user
export async function registerUser(email: string, password: string) {
  console.log('Attempting to register user:', email);
  console.log('Current users:', Array.from(users.entries()));
  
  if (users.has(email)) {
    console.log('User already exists:', email);
    throw new Error('User already exists');
  }
  
  const id = Math.random().toString(36).substring(2);
  users.set(email, { id, email, password });
  
  console.log('User registered successfully:', email);
  console.log('Updated users:', Array.from(users.entries()));
  
  return { id, email };
}

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        try {
          const { email, password } = UserSchema.parse(credentials);
          
          console.log('Attempting to authenticate:', email);
          console.log('Available users:', Array.from(users.entries()));
          
          const user = users.get(email);
          
          if (!user) {
            console.log('User not found:', email);
            return null;
          }
          
          if (user.password !== password) {
            console.log('Password mismatch for:', email);
            return null;
          }
          
          console.log('Authentication successful for:', email);
          return {
            id: user.id,
            email: user.email,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };