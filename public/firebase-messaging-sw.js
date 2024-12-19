importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyDDL_kwBc56b1PvRqqqaQw2Bg8TCypl_-Q",
    authDomain: "acc-somsomparty.firebaseapp.com",
    projectId: "acc-somsomparty",
    storageBucket: "acc-somsomparty.firebasestorage.app",
    messagingSenderId: "887876576526",
    appId: "1:887876576526:web:e2ffa1b67c355e846d235f",
    measurementId: "G-MG80YEML17"
})

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신', payload);
    
    const notificationTitle = payload.notification?.title || "Default Title";
    const notificationOptions = {
        body: payload.notification?.body || "Default body",
        icon: payload.notification?.icon || '/firebase-logo.png',
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });