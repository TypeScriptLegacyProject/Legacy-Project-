"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthContext = createContext<any>(null);

export default function AuthProvider({ children }: any) {
  const router = useRouter();
  const [user, setUser] = useState<any>({});
  const [seller, setSeller] = useState<any>({});
  const [admin, setAdmin] = useState<any>({});
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedSeller = localStorage.getItem("seller");
    const storedAdmin = localStorage.getItem("admin");
    const storedToken = localStorage.getItem("token");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedSeller) setSeller(JSON.parse(storedSeller));
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
    if (storedToken) setToken(storedToken);
  }, []);

  const loginAction = async (data: any) => {
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", data);

      if (response.status === 200) {
        toast.success(response.data.message);

        if (response.data.seller) {
          setSeller(response.data.seller);
          localStorage.setItem("seller", JSON.stringify(response.data.seller));
          setToken(response.data.tokenSeller);
          localStorage.setItem("token", response.data.tokenSeller);
          router.push("/");
        } else if (response.data.admin) {
          setAdmin(response.data.admin);
          localStorage.setItem("admin", JSON.stringify(response.data.admin));
          setToken(response.data.tokenadmin);
          localStorage.setItem("token", response.data.tokenadmin);
          router.push("/admin");
        } else {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          router.push("/");
        }
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed!");
    }
  };

  const logOut = () => {
    setUser({});
    setSeller({});
    setAdmin({});
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("seller");
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, admin, seller, loginAction, logOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw  Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
