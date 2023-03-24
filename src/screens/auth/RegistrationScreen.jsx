import { authRegister } from "../../redux/auth/authOperations";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
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
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

import Input from "../../components/Input";
import firebase from "../../firebase/config";

const initialCredentials = {
  name: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [keyboardShown, setkeyboardShown] = useState(false);
  const [credentials, setCredentials] = useState(initialCredentials);
  const [passwordShown, setPasswordShown] = useState(false);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const handleKeyboardShown = (state) => {
    setkeyboardShown(state);
  };

  const handleSignUp = () => {
    Keyboard.dismiss();
    console.log("credentials, image", credentials, image);
    dispatch(authRegister({ ...credentials, image }));
  };

  const handleInputChange = (value) => {
    setCredentials((prev) => ({ ...prev, ...value }));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      prepareProfileImage(result.assets[0].uri);
    }
  };

  const prepareProfileImage = async (img) => {
    const res = await fetch(img);
    const file = await res.blob();
    const uniquePostId = Date.now().toString();
    await firebase.storage().ref(`profileImage/${uniquePostId}`).put(file);
    const processedPhoto = await firebase
      .storage()
      .ref("profileImage")
      .child(uniquePostId)
      .getDownloadURL();
    // return processedPhoto;
    setImage(processedPhoto);
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
                <View style={styles.add_picture_container}>
                  <TouchableOpacity
                    style={styles.add_picture_btn}
                    onPress={pickImage}
                  >
                    <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                  </TouchableOpacity>
                  {image && (
                    <Image
                      style={styles.profile_picture}
                      source={{ uri: image }}
                    />
                  )}
                </View>
                <Text style={styles.reg_title}>Registration</Text>
                <View style={styles.reg_credentials}>
                  <Input
                    name="name"
                    placeholder="name"
                    handleKeyboardShown={handleKeyboardShown}
                    handleInputChange={handleInputChange}
                  />
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
                <TouchableOpacity style={styles.reg_btn} onPress={handleSignUp}>
                  <Text style={styles.reg_btn_text}>Sign up</Text>
                </TouchableOpacity>

                <Text
                  style={styles.sign_in_link_text}
                  onPress={() => navigation.navigate("Login")}
                >
                  Have an account? Sign in
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
    marginTop: 35,
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
  add_picture_container: {
    position: "absolute",
    top: 0,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    left: "50%",
    top: -60,
    transform: [{ translateX: -60 }],
  },
  add_picture_btn: {
    position: "absolute",
    right: -12,
    top: "70%",
  },
  profile_picture: {
    position: "absolute",
    width: 120,
    height: 120,
    top: 0,
    left: 0,
    borderRadius: 16,
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
