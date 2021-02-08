import { createRef } from "react";

const navigationRef = createRef();

const navigate = (name, params) => {
  if (!navigationRef.current) return null;
  navigationRef.current.navigate(name, params);
};

export default {
  navigationRef,
  navigate,
};
