import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  secret: '28ce05c6fc7aa4feb2661adbb98892b61a99cf0725928c14bdfed1ed70d88d84',
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
