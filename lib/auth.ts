import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

// In-memory store for demo — replace with DB (Supabase/Prisma) in production
const usageStore: Record<string, { count: number; date: string; plan: string }> = {};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM || "hookgen@hookgen.ai",
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (session.user && token.sub) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
    jwt({ token }) {
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export function getUserUsage(userId: string) {
  const today = new Date().toISOString().split("T")[0];
  const usage = usageStore[userId];
  if (!usage || usage.date !== today) {
    usageStore[userId] = { count: 0, date: today, plan: "free" };
  }
  return usageStore[userId];
}

export function incrementUsage(userId: string): boolean {
  const usage = getUserUsage(userId);
  const limit = usage.plan === "free" ? 10 : Infinity;
  if (usage.count >= limit) return false;
  usageStore[userId].count++;
  return true;
}

// IP-based rate limiting for anonymous free tier
const ipUsageStore: Record<string, { count: number; date: string }> = {};

export function checkIpLimit(ip: string): boolean {
  const today = new Date().toISOString().split("T")[0];
  if (!ipUsageStore[ip] || ipUsageStore[ip].date !== today) {
    ipUsageStore[ip] = { count: 0, date: today };
  }
  const limit = 10;
  if (ipUsageStore[ip].count >= limit) return false;
  ipUsageStore[ip].count++;
  return true;
}
