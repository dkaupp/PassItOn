import Contants from "expo-constants";

const settings = {
  // dev: {
  //   apiUrl: "http://192.168.0.7:9000/api",
  // },
  dev: {
    apiUrl: "https://pass-it-on-x.herokuapp.com/api",
  },
  staging: {
    apiUrl: "https://pass-it-on-x.herokuapp.com/api",
  },
  prod: {
    apiUrl: "https://pass-it-on-x.herokuapp.com/api",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Contants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
