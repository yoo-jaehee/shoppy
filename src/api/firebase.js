import { initializeApp } from "firebase/app";
import { v4 as uuid } from "uuid";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, onValue, get, set, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIREBASE_DATABASEURL,
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

// auth(인증 정보)의 상태가 바뀔 때 마다 callback 함수 실행

//1. 사용자가 있는 경우(로그인 한 경우)
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;

    callback(updatedUser);
  });
}

//2. 사용자가 어드민 권한을 가지고 있는지 확인
//3. {...user, isAdmin: true/false}

async function adminUser(user) {
  return get(ref(database, "admins")).then((snapshot) => {
    if (snapshot.exists()) {
      const admins = snapshot.val();
      const isAdmin = admins.includes(user.uid);
      return { ...user, isAdmin };
    }
    return user;
  });
}

// Firebase의 onAuthStateChanged 함수는 로그인 상태가 변경될 때마다 실행됨.
// callback이라는 함수를 인자로 받음.
// onAuthStateChanged가 로그인 상태가 변경될 때 사용자 정보(user)를 callback(user)에 전달하여 실행.

export async function addNewProduct(product, imageURL) {
  const id = uuid();
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageURL,
    options: product.options.split(","),
  });
}

// 제품 모두 가져오기
export async function getProducts() {
  return get(ref(database, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val()); //snapshot이 객체로 가지고 있으니까 value들만 가지도 오는 것
    }
    return [];
  });
}

// 1. 특정한 사용자의 쇼핑카트를 읽어온다
export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}

//2. 특정한 사용자의 상품을 추가,업데이트 한다
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

//3. 특정한 사용자의 상품을 삭제한다.
export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
