import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCC7md-jk2k1_wx_CyFTb6d0N4gJBLWIC0",
    authDomain: "todolist-14281.firebaseapp.com",
    databaseURL: "https://todolist-14281.firebaseio.com",
    projectId: "todolist-14281",
    storageBucket: "todolist-14281.appspot.com",
    messagingSenderId: "129506197423",
    appId: "1:129506197423:web:6ef8de3c2c4ea6ad2fb95a",
    measurementId: "G-RMWW2SQKWK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true});


export default firebase;