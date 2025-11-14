import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";
import { lazy, Suspense, useEffect } from "react";
import { useAuthStore } from "./store/auth-store.js";
import { checkAuth, signOut } from "./services/auth.js";
import { LoadingSpinner } from "./components/loading-spinner.jsx";

const Home = lazy(() => import("./pages/home.jsx"));
const Page404 = lazy(() => import("./pages/page404.jsx"));
const SignIn = lazy(() => import("./pages/signin.jsx"));
const SignUp = lazy(() => import("./pages/signup.jsx"));
const Reservations = lazy(() => import("./pages/reservations.jsx"));
const UserReservations = lazy(() => import("./pages/user-reservations.jsx"));
const Admin = lazy(() => import("./pages/admin.jsx"));
const Users = lazy(() => import("./pages/users.jsx"));

const queryClient = new QueryClient();

export default function App() {
  const { logout } = useAuthStore();
  useEffect(() => {
    checkAuth().then((ok) => {
      if (!ok) {
        logout();
        signOut();
      }
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="sign-in">
            <SignIn />
          </Route>
          <Route path="sign-up">
            <SignUp />
          </Route>
          <Route path="reservations">
            <Reservations />
          </Route>
          <Route path="user-reservations">
            <UserReservations />
          </Route>
          <Route path="admin">
            <Admin />
          </Route>
          <Route path="users">
            <Users />
          </Route>

          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Suspense>
    </QueryClientProvider>
  );
}
