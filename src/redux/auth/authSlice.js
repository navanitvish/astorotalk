// // src/redux/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   user: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login(state, action) {
//       state.isAuthenticated = true;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//       state.user = action.payload; // Save user details (e.g., email)
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;


// // src/redux/authSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null,
// };

// // Retrieve user and token from localStorage on initial load
// const savedUser = JSON.parse(localStorage.getItem("user"));
// const savedToken = localStorage.getItem("token");

// if (savedUser && savedToken) {
//   initialState.isAuthenticated = true;
//   initialState.user = savedUser;
//   initialState.token = savedToken;
// }

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login(state, action) {
//       const { user, token } = action.payload; // Expecting user and token from action
//       state.isAuthenticated = true;
//       state.user = user;
//       state.token = token;

//       // Save user and token to localStorage
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;

//       // Clear user and token from localStorage
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Retrieve user and token from localStorage on initial load
const savedUser = localStorage.getItem("user");
const savedToken = localStorage.getItem("token");

// Only parse valid JSON strings
if (savedUser && savedUser !== "undefined" && savedToken) {
  initialState.isAuthenticated = true;
  initialState.user = JSON.parse(savedUser);
  initialState.token = savedToken;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, token } = action.payload; // Expecting user and token from action
      state.isAuthenticated = true;
      state.user = user?.email;
      state.token = token;

      // Save user and token to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      // Clear user and token from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
