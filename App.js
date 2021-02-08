import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";

import authStorage from "./app/auth/storage";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/contex";
import AuthNavigator from "./app/navigation/AuthNavigator";
import logger from "./app/utility/logger";
import myTheme from "./app/navigation/navigationTheme";
import navigation from "./app/navigation/rootNavigation";
import OfflineNotice from "./app/components/OfflineNotice";

logger.start();

import { MessageContextProvider } from "./app/context/messages/context";
import { CategoriesContextProvider } from "./app/context/categories/context";
import { ListingsContextProvider } from "./app/context/listings/context";
import { UserContextProvider } from "./app/context/user/contex";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const restoreUser = async () => {
    const user = await authStorage.getUser();

    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)} />
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigation.navigationRef} theme={myTheme}>
        {user ? (
          <UserContextProvider>
            <MessageContextProvider>
              <ListingsContextProvider>
                <CategoriesContextProvider>
                  <AppNavigator />
                </CategoriesContextProvider>
              </ListingsContextProvider>
            </MessageContextProvider>
          </UserContextProvider>
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
