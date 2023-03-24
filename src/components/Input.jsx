import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export default function Input({
  name,
  placeholder,
  secureTextEntry = false,
  handleKeyboardShown,
  handleInputChange,
}) {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <TextInput
      onFocus={() => {
        setInputFocused(true);
        handleKeyboardShown(true);
      }}
      onBlur={() => {
        setInputFocused(false);
        handleKeyboardShown(false);
      }}
      style={
        !inputFocused
          ? { ...styles.reg_input, marginTop: 16 }
          : {
              ...styles.reg_input,
              marginTop: 16,
              borderColor: "#FF6C00",
            }
      }
      name={name}
      placeholder={placeholder}
      textAlign={"center"}
      secureTextEntry={secureTextEntry}
      onChangeText={(text) => handleInputChange({ [name]: text })}
    />
  );
}

const styles = StyleSheet.create({
  reg_input: {
    fontFamily: "Roboto-regular",
    height: 50,
    backgroundColor: "#f6f6f6",
    borderColor: "#EAEAEA",
    borderWidth: 1,
    borderRadius: 5,
    color: "#212121",
    fontSize: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
