import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LogoutButton from "../../components/LogoutButton";
import { useSelector } from "react-redux";
import { nameSelector } from "../../redux/auth/authSelectors";
import firebase from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const username = useSelector(nameSelector);
  const createPost = async () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, username });
    setComment("");
  };

  const getAllPosts = async () => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      <LogoutButton />

      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={{ fontSize: 16, marginBottom: 5 }}>
                {item.username}
              </Text>
              <Text style={{ fontSize: 16 }}>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <KeyboardAvoidingView
        keyboardVerticalOffset={95}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Comment..."
            style={styles.input}
            onChangeText={setComment}
            value={comment}
          />
          <TouchableOpacity
            disabled={!comment}
            onPress={createPost}
            style={styles.comment_btn}
          >
            <AntDesign name="arrowup" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
  },

  inputContainer: {
    marginHorizontal: 16,
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",
    fontSize: 16,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  comment_btn: {
    position: "absolute",
    borderRadius: 30,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    right: 5,
    top: 8,
  },
  commentContainer: {
    borderRadius: 6,
    backgroundColor: "#F6F6F6",
    padding: 16,
    marginBottom: 24,
  },
});

export default CommentsScreen;
