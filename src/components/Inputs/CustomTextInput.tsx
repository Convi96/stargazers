import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { colors } from "../../utilities/colors";

interface CustomTextInputProps extends TextInputProps {
  labelText?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  const { labelText } = props;

  return (
    <View style={styles.container}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}
      <TextInput
        {...props}
        style={[styles.input, props.style]}
        value={props.value}
        testID={props.testID}
        placeholderTextColor={"rgba(255,255,255,0.5)"}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: "white",
    fontFamily: "MonaSans-SemiBold",
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    fontFamily: "MonaSans-Regular",
    color: "white",
    fontWeight: "bold",
    backgroundColor: colors.inputBackground,
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
  },
});

export default CustomTextInput;
