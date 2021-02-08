import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";

import Button from "../components/Button";
import colors from "../config/colors";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={0}
      style={styles.background}
      source={require("../assets/background.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/icon-pass.png")}
        />
        <View style={styles.headingContainer}>
          <Image
            style={styles.heading}
            source={require("../assets/icon-pass.png")}
          />
          <Text style={styles.tagline}>ass it on - get </Text>
          <Image
            style={styles.heading}
            source={require("../assets/icon-pass.png")}
          />
          <Text style={styles.tagline}>aid </Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  tagline: {
    fontSize: 25,
    fontWeight: "600",
    paddingVertical: 20,
    color: colors.primary,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  heading: {
    height: 40,
    width: 40,
  },
});

export default WelcomeScreen;
