import config from "../services/config";
import { createSlice } from "@reduxjs/toolkit";

const api = config.USER_API_URL;

let users = [
  {
    id: 1,
    name: "Alice Admin",
    email: "alice.admin@example.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    name: "Bob User",
    email: "bob.user@example.com",
    password: "123456",
    role: "user",
  },
  {
    id: 3,
    name: "Charlie Moderator",
    email: "charlie.moderator@example.com",
    password: "123456",
    role: "moderator",
  },
];

const userFromStorage = JSON.parse(localStorage.getItem("users"));
const tokenFromStroage = localStorage.getItem("token");

const initialState = {
  users: userFromStorage || users,
  user: JSON.parse(localStorage.getItem("user")),
  token: tokenFromStroage || null,
  isAuthenticated: !!tokenFromStroage,
};
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const newUser = {
        id: Date.now(),
        ...action.payload,
        role: action.payload.role || "user",
      };
      console.log(newUser);
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      console.log(user);
      state.token = token;
      state.user = user;

      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logOut: (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      (localStorage.removeItem("user"), localStorage.removeItem("token"));
    },
  },
});

export const { logOut, loginSuccess, registerUser } = userSlice.actions;

export default userSlice.reducer;
