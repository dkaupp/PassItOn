import clien from "./client";

const endPoint = "/categories";

const get = () => clien.get(endPoint);

export default {
  get,
};
