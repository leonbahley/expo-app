import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../firebase/config";
import { updateUserProfile, setIsRefreshing } from "./authSlice";

export const authRegister = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, image }) => {
    console.log("image", image);
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      const user = await firebase.auth().currentUser;
      await user.updateProfile({
        displayName: name,
        photoURL: image,
      });

      const { displayName, uid } = await firebase.auth().currentUser;

      return { displayName, uid };
    } catch (error) {
      alert(error.message);
    }
  }
);

export const authLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  }
);

export const authSignout = createAsyncThunk("auth/signout", async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    alert(error.message);
  }
});

export const authStateChangeUser = () => async (dispatch, getState) => {
  await dispatch(setIsRefreshing(true));
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        name: user.displayName,
        userId: user.uid,
        profileImg: user.photoURL,
      };
      console.log("user", user);

      dispatch(updateUserProfile(userUpdateProfile));
    }
    dispatch(setIsRefreshing(false));
  });
};
