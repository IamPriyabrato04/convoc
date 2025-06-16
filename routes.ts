/**
 * an array of routes that are accessible to all users
 * These routes do not require authentication.
 * @types {string[]}
 */
export const publicRoute = ["/",];

/**
 * an array of routes that are used for authentication
 * These routes will redirect loggedin users to /dashboard.
 * @types {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password"
];

/**
 * The prefix for api auth routes
 * this routes will redirect logged in users to the /dashboard
 * @types {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect route after login
 * This route will be used to redirect users after successful login.
 * @types {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
