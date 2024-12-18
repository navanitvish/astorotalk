// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDiTYtILkMhkT0I_rfN7JWsEWL3mhfvDHs",
  authDomain: "astro-bfbcf.firebaseapp.com",
  projectId: "astro-bfbcf",
  storageBucket: "astro-bfbcf.firebasestorage.app",
  messagingSenderId: "390658726423",
  appId: "1:390658726423:web:ed3160598a87b75ef01a52",
  measurementId: "G-7RTQE8PDMF",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' // Add your icon path
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});