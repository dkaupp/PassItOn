import client from "./client.js";

const register = (pushtoken) => {
  client.post("/expoPushTokens", { token: pushtoken.data });
};

export default { register };
