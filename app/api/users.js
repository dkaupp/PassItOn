import client from "./client.js";

const endpoint = "/user";

const register = (userInfo) => client.post("/users", userInfo);

const getUser = (id) => client.get(`${endpoint}/${id}`);

const getLoggedUser = () => client.get(`${endpoint}`);

const addUserPhoto = (image, onUploadProgress) => {
  const data = new FormData();

  data.append("image", {
    name: "image" + Date.now().toString(),
    type: "image/jpeg",
    uri: image.image,
  });

  return client.patch(`${endpoint}/photo`, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const updateUserEmail = (email) => client.patch(`${endpoint}/email`, { email });

const updateUserPassword = (password) =>
  client.patch(`${endpoint}/password`, { password });

const updateUserLocation = (location) =>
  client.patch(`${endpoint}/location`, { location });

export default {
  addUserPhoto,
  getLoggedUser,
  getUser,
  register,
  updateUserEmail,
  updateUserPassword,
  updateUserLocation,
};
