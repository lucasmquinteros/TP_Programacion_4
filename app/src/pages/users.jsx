import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useAuthStore } from "../store/auth-store";
import { useLocation } from "wouter";
import { getUsers } from "../services/auth";
import Header from "../components/header";
import Footer from "../components/footer";
import UserCard from "../components/user-card";

export default function Users() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/sign-in", { replace: true });
      return;
    }

    if (!user.roles?.includes("Admin")) {
      setLocation("/", { replace: true });
    }
  }, [user, setLocation]);

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  console.log(users);

  return (
    <>
      <Header />
      <main>
        {users?.map((u) => (
          <UserCard key={u.id} user={u} />
        ))}
      </main>
      <Footer />
    </>
  );
}
