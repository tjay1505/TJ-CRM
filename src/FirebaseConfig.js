import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCW9adVm_mBK3_tQCDSIes2GSVxmiKkgCg",
    authDomain: "tj-crm-816cf.firebaseapp.com",
    projectId: "tj-crm-816cf",
    storageBucket: "tj-crm-816cf.appspot.com",
    messagingSenderId: "762585319562",
    appId: "1:762585319562:web:1b974b1457616e6abbc573"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}