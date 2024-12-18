import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/languageSlice';
import authReducer from './auth/authSlice';
// import fcmReducer from "./Fcm/fcmSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // fcm: fcmReducer,
    language: languageReducer,
  },
});

export default store;
