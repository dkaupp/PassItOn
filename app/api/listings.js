import { DrawerActions } from "@react-navigation/native";
import client from "./client";

const endpoint = "/listings";

const getMyListings = (id) => client.get(`${endpoint}/${id}`);

const getListings = () => client.get(endpoint);

const getImage = (id) => client.get(`${endpoint}/images/${id}`);

const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category._id);
  data.append("description", listing.description);
  data.append("location", listing.location);

  listing.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    });
  });

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const editListing = (listing, listingId, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category._id);
  data.append("description", listing.description);
  data.append("location", listing.location);

  listing.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    });
  });

  return client.put(`${endpoint}/${listingId}`, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

const deleteListing = (listingId) => client.delete(`${endpoint}/${listingId}`);

export default {
  addListing,
  editListing,
  deleteListing,
  getImage,
  getListings,
  getMyListings,
};
