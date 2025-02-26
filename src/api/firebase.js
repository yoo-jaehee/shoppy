import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASEURL,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

//✅ auth(인증 정보)의 상태가 바뀔 때 마다 callback 함수 실행
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

//✅ Firebase의 onAuthStateChanged 함수는 로그인 상태가 변경될 때마다 실행됨.
//✅ callback이라는 함수를 인자로 받음.
//✅ onAuthStateChanged가 로그인 상태가 변경될 때 사용자 정보(user)를 callback(user)에 전달하여 실행.
