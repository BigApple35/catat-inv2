import api from "./axios";
import { toast } from "sonner";

// Types ----------------------------------------

export type Folder = {
  id: number;
  title: string;
  colorIcon: string;
  user_id: number;
  created_at: string;
};

export type CreateFolderPayload = {
  title: string;
  color_icon: string; // backend uses snake_case
};

export type UpdateFolderPayload = {
  title?: string;
  color_icon?: string;
};

// API Functions --------------------------------

export async function getFolders() {
  try {
    const response = await api.get("/student/packages");
    return response.data;
  } catch (error: any) {
    console.log("Get folders error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while fetching folders."
    );
  }
}

export async function getFolder(id: string | number | undefined) {
  try {
    const response = await api.get(`/student/packages/${id}`);
    return response.data;
  } catch (error: any) {
    console.log("Get folder error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while fetching the folder."
    );
  }
}

export async function createFolder(payload: CreateFolderPayload) {
  try {
    const response = await api.post("/student/packages", payload);
    return response.data;
  } catch (error: any) {
    console.log("Create folder error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while creating the folder."
    );
  }
}

export async function updateFolder(
  id: string | number,
  payload: UpdateFolderPayload
) {
  try {
    const response = await api.put(`/student/packages/${id}`, payload);
    toast("Folder updated!");
    return response.data;
  } catch (error: any) {
    console.log("Update folder error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while updating the folder."
    );
  }
}

export async function deleteFolder(id: string | number) {
  try {
    const response = await api.delete(`/student/packages/${id}`);
    return response.data;
  } catch (error: any) {
    console.log("Delete folder error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while deleting the folder."
    );
  }
}
