import api from "./axios";
import { toast } from "sonner";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateTodoPayload = {
  title: string;
  description?: string;
  completed?: boolean;
};

export type UpdateTodoPayload = {
  title?: string;
  description?: string;
  completed?: boolean;
};

export async function getTodos() {
  try {
    const response = await api.get("/student/tasks");
    return response.data;
  } catch (error: any) {
    console.log("Get todos error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while fetching todos."
    );
  }
}

export async function getTodo(id: string) {
  try {
    const response = await api.get(`/student/tasks/${id}`);
    return response.data;
  } catch (error: any) {
    console.log("Get todo error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while fetching the todo."
    );
  }
}

export async function createTodo(payload: CreateTodoPayload) {
  try {
    const response = await api.post("/student/tasks", payload);
    return response.data;
  } catch (error: any) {
    console.log("Create todo error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while creating the todo."
    );
  }
}

export async function updateTodo(id: string, payload: UpdateTodoPayload) {
  try {
    const response = await api.put(`/student/tasks/${id}`, payload);
    return response.data;
  } catch (error: any) {
    console.log("Update todo error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while updating the todo."
    );
  }
}

export async function deleteTodo(id: string) {
  try {
    const response = await api.delete(`/student/tasks/${id}`);
    return response.data;
  } catch (error: any) {
    console.log("Delete todo error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while deleting the todo."
    );
  }
}
