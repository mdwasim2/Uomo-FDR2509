import { getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyA0JdINYVJcHuDSHcdr2xCT3CbZZcpMv4Q",
  authDomain: "uomo-ecommerce-93805.firebaseapp.com",
  projectId: "uomo-ecommerce-93805",
  storageBucket: "uomo-ecommerce-93805.firebasestorage.app",
  messagingSenderId: "266938767258",
  appId: "1:266938767258:web:e7b078ae427f897bf80c23"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)

export {auth, db}