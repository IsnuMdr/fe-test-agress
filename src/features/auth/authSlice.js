import { createSlice } from "@reduxjs/toolkit";
import { userData } from "../../data/dummy-data";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoggedIn: false,
    errorMsg: "",
  },
  reducers: {
    getUserLoggedIn: (state) => {
      const auth = JSON.parse(localStorage.getItem("auth"));

      if (auth) {
        state.user = auth.user;
        state.isLoggedIn = true;
      } else {
        state.user = null;
        state.isLoggedIn = false;
      }
    },
    login: (state, action) => {
      const userIsExist = userData.find(
        (user) => user.email === action.payload.email
      );

      if (userIsExist) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: action.payload,
            isLoggedIn: true,
          })
        );

        state.user = action.payload;
        state.isLoggedIn = true;
        state.errorMsg = "";
      } else {
        state.user = null;
        state.isLoggedIn = false;
        state.errorMsg = "Login failed. Please try again!";
      }
    },
    logout: (state) => {
      localStorage.removeItem("auth");

      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { getUserLoggedIn, login, logout } = authSlice.actions;

export default authSlice.reducer;
