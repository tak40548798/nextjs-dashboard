import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  secret: '',
  callbacks: {
    authorized({ auth, request: { nextUrl } }): any {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true; // 把沒有認證的使用整重新定向到 login page
        }
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [Credentials({})],
} satisfies NextAuthConfig;
