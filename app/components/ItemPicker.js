import React from "react";
import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";

function ItemPicker() {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={this.state.language}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({ language: itemValue })
        }
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ItemPicker;
