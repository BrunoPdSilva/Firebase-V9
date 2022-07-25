import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzXdXjcgzFAclRBhTJ49OjpGUUSgIiDpc",
  authDomain: "fir-v9-87a71.firebaseapp.com",
  projectId: "fir-v9-87a71",
  storageBucket: "fir-v9-87a71.appspot.com",
  messagingSenderId: "383939013875",
  appId: "1:383939013875:web:57a5219f4d1e3d4a595b86",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db, 'books');

getDocs(colRef)
  .then(snapshot => {
    let books = [];
    snapshot.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books);
  })
  .catch(err => console.log(err));