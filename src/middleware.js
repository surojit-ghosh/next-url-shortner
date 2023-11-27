// import { withAuth } from "next-auth/middleware";

// export default withAuth(
//     {
//         callbacks: {
//             authorized: async ({ token, req }) => !!token
//         }
//     }
// );
export { default } from 'next-auth/middleware';

export const config = { matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)' };