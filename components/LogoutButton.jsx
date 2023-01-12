import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { authSignout } from "../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const promptUser = () => {
    const title = "Do you want to log out?";
    const message = "";
    const buttons = [
      { text: "Cancel", type: "cancel" },
      {
        text: "Log out",
        onPress: () => {
          dispatch(authSignout());

          Alert.alert("You logged out");
        },
      },
    ];
    Alert.alert(title, message, buttons);
  };
  return (
    <TouchableOpacity
      style={styles.logout_btn}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
      onPress={promptUser}
    >
      <MaterialCommunityIcons name="logout" size={35} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logout_btn: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
