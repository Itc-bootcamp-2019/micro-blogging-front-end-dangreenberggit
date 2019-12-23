import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
     
     
var firebaseConfig = {
    apiKey: "AIzaSyDobQzZ8MiqfG64-WLQ_F_6_XfcT26WrVE",
    authDomain: "kvetch-app.firebaseapp.com",
    databaseURL: "https://kvetch-app.firebaseio.com",
    projectId: "kvetch-app",
    storageBucket: "kvetch-app.appspot.com",
    messagingSenderId: "647540830399",
    appId: "1:647540830399:web:a67056e83d5c9c943d560a",
    measurementId: "G-B1NBG1LY08"
};
     
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;