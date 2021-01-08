
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCEon_rveq-6kNMQM6pMz5ruanr_dhIydE",
    authDomain: "vue-full-course-1d8b4.firebaseapp.com",
    projectId: "vue-full-course-1d8b4",
    storageBucket: "vue-full-course-1d8b4.appspot.com",
    messagingSenderId: "795289315416",
    appId: "1:795289315416:web:94808d1f1b56e41ca2422d"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database();
export const chatsRef = db.ref("chats");

export default firebase;