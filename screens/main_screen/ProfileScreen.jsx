import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import firebase from "../../firebase/config";
import LogoutButton from "../../components/LogoutButton";
import {
  idSelector,
  nameSelector,
  profileImgSelector,
} from "../../redux/auth/authSelectors";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userId = useSelector(idSelector);
  const username = useSelector(nameSelector);
  const profileImg = useSelector(profileImgSelector);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await firebase
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.image}
        source={require("../../images/background.png")}
      >
        <View style={styles.container}>
          <Image source={{ uri: profileImg }} style={styles.profile_picture} />
          <Text
            style={{
              marginTop: 80,
              fontFamily: "Roboto-regular",
              fontWeight: "500",
              fontSize: 30,
              marginBottom: 33,
              alignSelf: "center",
            }}
          >
            {username}
          </Text>
          <LogoutButton />
          <FlatList
            data={userPosts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 25 }}>
                <Image
                  style={{ width: "100%", height: 300 }}
                  source={{ uri: item.photo }}
                />
                <Text
                  style={{
                    fontFamily: "Roboto-regular",
                    fontSize: 18,
                    marginBottom: 5,
                    marginTop: 5,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  profile_picture: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    left: "50%",
    top: -60,
    transform: [{ translateX: -60 }],
  },
});

export default ProfileScreen;
