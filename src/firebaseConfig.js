import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCv-fALhCkmsD8ZKsMpJsWV2ZNJPJxWBvs",
  authDomain: "vue-3-2022-624ab.firebaseapp.com",
  projectId: "vue-3-2022-624ab",
  storageBucket: "vue-3-2022-624ab.appspot.com",
  messagingSenderId: "194807269089",
  appId: "1:194807269089:web:d723a730bb7aa6dc45d9a0"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { auth, db, storage };