import React from "react";
import { StyleSheet } from "react-native";

import Text from "./Text";

function SuccessMessage({ success, error, visible }) {
  if (!visible || !success || error === true) return null;

  return <Text style={styles.success}>{success}</Text>;
}

const styles = StyleSheet.create({
  success: { color: "green", textAlign: "center" },
});

export default SuccessMessage;
