import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { nameSelector, idSelector } from "../../redux/auth/authSelectors";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";
import { AntDesign } from "@expo/vector-icons";
import LogoutButton from "../../components/LogoutButton";
import firebase from "../../firebase/config";

export default function CreateScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const username = useSelector(nameSelector);
  const userId = useSelector(idSelector);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      let locationRef = await Location.getCurrentPositionAsync({});
      setLocation(locationRef);
      const { longitude, latitude } = locationRef.coords;
      const city = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      setCity(city[0].city);
    })();
  }, []);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 100 }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    const picture = await camera.takePictureAsync();
    setPhoto(picture.uri);
  };

  const uploadPostToServer = async () => {
    try {
      await preparePost();
      navigation.navigate("posts");
      setPhoto(null);
      setDescription("");
    } catch (error) {
      alert(error.message);
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    await firebase.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await firebase
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();
    return processedPhoto;
  };

  const preparePost = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await firebase.firestore().collection("posts").add({
      photo,
      description,
      location: location.coords,
      userId,
      username,
      city,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <LogoutButton />
        <Camera style={styles.camera} ref={setCamera} type={CameraType.back}>
          <TouchableOpacity onPress={takePhoto} style={styles.camera_btn}>
            <AntDesign name="camerao" size={30} color="black" />
          </TouchableOpacity>
        </Camera>
        {photo && (
          <View style={styles.photo_preview}>
            <Image
              style={{ width: 200, height: 150 }}
              source={{ uri: photo }}
            />
          </View>
        )}
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              marginTop: 30,
              marginBottom: 5,
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <TextInput
              style={styles.descr_input}
              value={description}
              onChangeText={setDescription}
              placeholder="add description"
            />

            <TouchableOpacity
              disabled={!photo}
              onPress={uploadPostToServer}
              style={styles.add_post_btn}
            >
              <Text style={styles.add_post_text}>Add post</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  camera: {
    height: "40%",
    alignItems: "center",
    marginTop: 50,
    justifyContent: "flex-end",
  },
  camera_btn: {
    marginBottom: 10,
    borderRadius: 30,
    backgroundColor: "#ffffff77",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  photo_preview: {
    width: 200,
    height: 150,
    position: "absolute",
    top: 50,
    left: 0,
  },
  add_post_btn: {
    backgroundColor: "#FF6C00",
    marginHorizontal: 10,
    height: 51,
    borderRadius: 100,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  add_post_text: {
    color: "#fff",
    fontFamily: "Roboto-regular",
    fontSize: 16,
  },
  descr_input: {
    marginHorizontal: 16,
    height: 50,
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
});
