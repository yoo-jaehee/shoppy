export async function uploadImage(file) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_APP_ClOUDINARY_PRESET);
}
