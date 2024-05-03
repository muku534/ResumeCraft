import NextAuth from "next-auth";
import options from "./options"; // Change import statement

const handler = NextAuth(options);

export const GET = handler;
export const POST = handler;
