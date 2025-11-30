"use client";

import type { Auth } from "@/Types/Types";
import { AuthContext } from "./auth-context";
import { useState, type ReactNode } from "react";
import { queryClient } from "@/Provider/ReactQueryClientProvider";

const initialState = { user: null, accessToken: null, isLoading: true };

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Auth>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logOut = () => {
    setIsLoading(true);
    setAuth({
      user: null,
      accessToken: null,
      isLoading: false,
    });
    setIsLoading(false);
    queryClient.invalidateQueries({ queryKey: ["cartInfo"] })
    // router.push("/")
  };


  const authInfo = {
    logOut,
    auth,
    setAuth,
    setIsLoading,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
