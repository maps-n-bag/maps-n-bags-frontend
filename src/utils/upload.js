import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

/**
 * Upload one or more files via the backend storage endpoint.
 * @param {File[]} files  - Array of File objects (max 10, 10 MB each)
 * @param {string} folder - Subfolder name e.g. "plans", "profiles", "reviews", "blog-images"
 * @returns {Promise<string[]>} Permanent public URLs in the same order as the files array
 */
export async function uploadFiles(files, folder = "general") {
  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  formData.append("folder", folder);
  const { data } = await axios.post(`${baseURL}upload`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.urls;
}
