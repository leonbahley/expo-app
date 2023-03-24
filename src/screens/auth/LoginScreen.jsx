import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";

import Input from "../../components/Input";

import { authLogin } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const initialCredentials = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [keyboardShown, setkeyboardShown] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();

  const handleKeyboardShown = (state) => {
    setkeyboardShown(state);
  };

  const handleSignIn = () => {
    Keyboard.dismiss();
    console.log("credentials", credentials);
    dispatch(authLogin(credentials));
  };

  const handleInputChange = (value) => {
    setCredentials((prev) => ({ ...prev, ...value }));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={styles.image}
          source={require("../../images/background.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
              }}
            >
              <View style={styles.signup_container}>
                <Text style={styles.reg_title}>Log in</Text>
                <View style={styles.reg_credentials}>
                  <Input
                    name="email"
                    placeholder="email"
                    handleKeyboardShown={handleKeyboardShown}
                    handleInputChange={handleInputChange}
                  />
                  <Input
                    name="password"
                    placeholder="password"
                    secureTextEntry={!passwordShown}
                    handleKeyboardShown={handleKeyboardShown}
                    handleInputChange={handleInputChange}
                  />
                  <TouchableOpacity
                    style={styles.password_btn}
                    onPress={() => setPasswordShown(true)}
                  >
                    <Text style={styles.password_btn_text}>Show password</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.reg_btn} onPress={handleSignIn}>
                  <Text style={styles.reg_btn_text}>Sign in</Text>
                </TouchableOpacity>

                <Text
                  style={styles.sign_in_link_text}
                  onPress={() => navigation.navigate("Register")}
                >
                  Do not have an account? Sign up
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  signup_container: {
    height: 549,
    marginHorizontal: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  reg_title: {
    fontFamily: "Roboto-regular",
    fontSize: 30,
    textAlign: "center",
    marginTop: 92,
  },
  reg_credentials: {
    marginHorizontal: 16,
    marginTop: 32,
  },
  reg_btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginHorizontal: 16,
    height: 51,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  reg_btn_text: {
    fontFamily: "Roboto-regular",
    color: "#fff",
    fontSize: 16,
  },
  sign_in_link_text: {
    fontFamily: "Roboto-regular",
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  password_btn: {
    marginHorizontal: 90,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
  },
  password_btn_text: {
    fontSize: 18,
    textAlign: "center",
  },
});
