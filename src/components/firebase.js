// firebase-config.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDiTYtILkMhkT0I_rfN7JWsEWL3mhfvDHs",
  authDomain: "astro-bfbcf.firebaseapp.com",
  projectId: "astro-bfbcf",
  storageBucket: "astro-bfbcf.firebasestorage.app",
  messagingSenderId: "390658726423",
  appId: "1:390658726423:web:ed3160598a87b75ef01a52",
  measurementId: "G-7RTQE8PDMF",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    // Check if notification permission is already denied
    if (Notification.permission === 'denied') {
      console.warn('Notifications are blocked. Please enable them in your browser settings.');
      return null;
    }

    // Register service worker first
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Service Worker registered:', registration);
    }

    const permission = await Notification.requestPermission();
    console.log('Permission status:', permission);

    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: "BAL2m3tn1-nXOm1dp6dxiq2adOrxr3IirpJnjqyoV27NWIqveMSTcMhww3DWVWeUSdlC2SOW3A3BOBDuOglCns0",
      });
      console.log("FCM Token:", token);
      localStorage.setItem("FCM Token", token);
      return token;
    } else {
      console.warn(`Permission status: ${permission}`);
      return null;
    }
  } catch (error) {
    console.error("Error in notification setup:", error);
    return null;
  }
};

export const onForegroundMessage = (callback) => {
  return onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);
    callback(payload);
  });
};