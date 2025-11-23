import api from "./axios";
import { toast } from "sonner";

// Types ----------------------------------------

export type Material = {
  id: number;
  title: string;
  fileUrl: string; // backend probably returns a URL
  package_id: number;
  created_at: string;
};

export type UploadMaterialPayload = {
  title: string;
  file: File;
  package_id: number;
};

// API Functions --------------------------------

export async function uploadFileToFolder(folderId: string, file: File, title?: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("package_id", String(folderId));
    const fileTitle = title ? title : file.name.replace(/\.[^/.]+$/, "") ; 

  formData.append("title", fileTitle);

  const response = await api.post(`/student/materials/pdf`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}

export async function uploadYoutubeLinkToFolder(folderId: string, url: string, title?: string) {
    const data = {
        package_id : parseInt(folderId),
        url,
        title: title ? title : "YouTube Material"
    }

  const response = await api.post(`/student/materials/youtube`, data, {
    // headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}



export async function uploadMaterial(payload: UploadMaterialPayload) {
  try {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("file", payload.file);
    formData.append("package_id", String(payload.package_id));

    const response = await api.post("/student/materials", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast("Material uploaded!");
    return response.data;
  } catch (error: any) {
    console.log("Upload material error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while uploading material."
    );
  }
}

export async function deleteMaterial(id: number | string) {
  try {
    const response = await api.delete(`/student/materials/${id}`);
    toast("Material deleted");
    return response.data;
  } catch (error: any) {
    console.log("Delete material error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while deleting the material."
    );
  }
}

export async function getMaterialsByFolder(packageId: number | string) {
  try {
    const response = await api.get(`/student/materials?package_id=${packageId}`);
    return response.data;
  } catch (error: any) {
    console.log("Get materials error:", error?.response?.data?.meta?.message);
    toast(
      error?.response?.data?.meta?.message
        ? error.response.data.meta.message
        : "An error occurred while fetching materials."
    );
  }
}
