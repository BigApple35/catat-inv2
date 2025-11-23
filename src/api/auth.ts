import api from "./axios";
import { toast } from "sonner"


export type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
    try {
      const response = await api.post("/auth/login", payload);
      const token = response.data.data.token;
      localStorage.setItem("token", token);
      const streak = await api.get("/student/daily-quiz/status")
      localStorage.setItem("streak", streak.data.data.streak)
      return response.data;
    } catch (error : any) {
      console.log("Login error:", error.response.data.meta.message);
      toast( error.response.data.meta.message ? error.response.data.meta.message : "An error occurred during login.");  
    }
}

export type SignUpPayload = {
  email: string;
  username: string;
  role: string;
  password_confirm : string;
  password: string;
};

export async function signup(payload: SignUpPayload) {
  try {
    const response = await api.post("/auth/register", payload);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error : any) {
    toast( error.response.data.meta.message ? error.response.data.meta.message : "An error occurred during signup.");
  }

}