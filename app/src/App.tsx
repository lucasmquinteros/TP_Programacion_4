import Home from "./pages/home.jsx";
import SignUp from "./pages/signup.jsx";
import SignIn from "./pages/signin.jsx";
import Page404 from "./pages/page404.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route } from "wouter";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
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

        <Route>
          <Page404 />
        </Route>
      </Switch>
    </QueryClientProvider>
  );
}
