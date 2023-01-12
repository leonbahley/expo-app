import { createSlice } from "@reduxjs/toolkit";
import { authRegister, authLogin, authSignout } from "./authOperations";

const initState = {
  userId: null,
  name: "",
  profileImg: "",
  isRefreshing: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      name: payload.name,
      profileImg: payload.profileImg,
    }),
    setIsRefreshing: (state, { payload }) => ({
      ...state,
      isRefreshing: payload,
    }),
  },
  extraReducers: {
    [authRegister.fulfilled](state, action) {
      state.userId = action.payload.uid;
      state.name = action.payload.displayName;
    },
    [authLogin.fulfilled](state, action) {
      state.userId = action.payload.uid;
      state.name = action.payload.displayName;
    },
    [authSignout.fulfilled](state, action) {
      state.userId = null;
      state.name = "";
      state.isRefreshing = false;
    },
  },
});

export const { updateUserProfile, setIsRefreshing } = authSlice.actions;
