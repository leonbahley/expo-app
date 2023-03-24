import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import LogoutButton from "../../components/LogoutButton";
import firebase from "../../firebase/config";
import { EvilIcons, Entypo } from "@expo/vector-icons";

export default function DefaultPostsScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await firebase
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    console.log("posts", posts);
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <LogoutButton />
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
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
            <View style={styles.wrapper}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("comments", { postId: item.id })
                }
              >
                <EvilIcons name="comment" size={30} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "baseline" }}
                onPress={() =>
                  navigation.navigate("map", { location: item.location })
                }
              >
                <Entypo name="location-pin" size={30} color="black" />
                <Text style={styles.location_text}>
                  {item.city ? item.city : "see cords"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    marginHorizontal: 5,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location_text: {
    textDecorationLine: "underline",
    fontSize: 18,
    fontFamily: "Roboto-regular",
  },
});
