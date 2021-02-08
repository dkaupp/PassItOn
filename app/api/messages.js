import client from "./client.js";

const endPoint = "/messages";

const send = (message, listingId, targetUserId) =>
  client.post(endPoint, { message, listingId, targetUserId });

const get = () => client.get(endPoint);

const deleteMessage = (id) => client.delete(`${endPoint}/${id}`);

const update = (id) => client.put(`${endPoint}/${id}`);

export default {
  deleteMessage,
  get,
  send,
  update,
};
