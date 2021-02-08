import React, { createContext, useEffect } from "react";

import usersApi from "../../api/users";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const {
    data: userProfile,
    error,
    loading,
    request: loadUserProfile,
  } = useApi(usersApi.getLoggedUser);

  useEffect(() => {
    loadUserProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        loadUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
