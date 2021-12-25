// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVbaCnM_p-xWuG_L7r2wifORkxb4SzhtU",
  authDomain: "college-erp-8c72a.firebaseapp.com",
  projectId: "college-erp-8c72a",
  storageBucket: "college-erp-8c72a.appspot.com",
  messagingSenderId: "1068861931043",
  appId: "1:1068861931043:web:6c3e49993dd3d04aea3b96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase storage
const storage = getStorage(app);

// export functions for files and images
const imagesRef = ref(storage, 'profile');
const filesRef = ref(storage, 'files');

export { imagesRef, filesRef };