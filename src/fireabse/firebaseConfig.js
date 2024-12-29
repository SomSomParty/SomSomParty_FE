import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Firebase Config values
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
const firebaseApp = initializeApp(firebaseConfig);

// Messaging service
export const messaging = getMessaging(firebaseApp);

// Request permission and fetch FCM token
export const requestFirebaseToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const registration = await navigator.serviceWorker.register("./firebase-messaging-sw.js");
      console.log("Service Worker 등록 완료:", registration);

      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });

      console.log(`푸시 토큰 발급 완료: ${token}`);
      return token; // 반환된 푸시 토큰
    } else {
      console.warn("푸시 권한이 거부되었습니다.");
    }
  } catch (error) {
    console.error("푸시 토큰 요청 중 에러 발생:", error.message);
    throw new Error("푸시 토큰 요청 실패");
  }
};