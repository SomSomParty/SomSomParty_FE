import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

//Firebase Config values imported from .env file
const firebaseConfig = {
  apiKey: "AIzaSyDDL_kwBc56b1PvRqqqaQw2Bg8TCypl_-Q",
  authDomain: "acc-somsomparty.firebaseapp.com",
  projectId: "acc-somsomparty",
  storageBucket: "acc-somsomparty.firebasestorage.app",
  messagingSenderId: "887876576526",
  appId: "1:887876576526:web:e2ffa1b67c355e846d235f",
  measurementId: "G-MG80YEML17"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(firebaseApp);

export function requestPermission() {
  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        navigator.serviceWorker
          .register("./firebase-messaging-sw.js")
          .then((registration) => {
            console.log("Service Worker 등록 완료:", registration);
            const messaging = getMessaging();
            getToken(messaging, {
              vapidKey: process.env.REACT_APP_VAPID_KEY,
              serviceWorkerRegistration: registration,
            })
              .then((token) => {
                console.log(`푸시 토큰 발급 완료: ${token}`);
              })
              .catch((error) => {
                console.error("푸시 토큰 가져오는 중 에러 발생:", error.message);
              });
          })
          .catch((error) => {
            console.error("Service Worker 등록 중 에러 발생:", error.message);
          });
      } else {
        console.warn("푸시 권한이 거부되었습니다.");
      }
    })
    .catch((error) => {
      console.error("Notification 권한 요청 중 에러 발생:", error.message);
    });
}