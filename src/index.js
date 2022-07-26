import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, 
  doc, onSnapshot, query, where, orderBy, serverTimestamp, getDoc, updateDoc } from "firebase/firestore";

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
const auth = getAuth();
const colRef = collection(db, 'books');

// Filtrando dados
const q = query(colRef, orderBy("createdAt"));

/* // Buscando documentos
getDocs(colRef)
.then(snapshot => {
  let books = [];
  snapshot.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  });
  console.log(books);
})
.catch(err => console.log(err)); */

// Buscar um único documento
const docRef = doc(db, 'books', 'MU1ASkKKmpG2lNzh0Bw4');
onSnapshot(docRef, (doc) => console.log(doc.data(), doc.id))

// Documentos em tempo real
onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.forEach(doc => {
    books.push({ ...doc.data(), id: doc.id })
  });
  console.log(books);
});

// Adicionando documentos
const addBookForm = document.querySelector('.add');

addBookForm.addEventListener('submit', e => {
  e.preventDefault();

  addDoc(colRef, { title: addBookForm.title.value, author: addBookForm.author.value, createdAt: serverTimestamp() })
    .then(() => { addBookForm.reset() })
});

// Deletando documentos
const deleteBookForm = document.querySelector('.delete');

deleteBookForm.addEventListener('submit', e => {
  e.preventDefault();

  const docRef = doc(db, 'books', deleteBookForm.id.value);
  deleteDoc(docRef).then(() => { deleteBookForm.reset() });
});

// Atualizando um documento
const updateForm = document.querySelector('.update');
updateForm.addEventListener('submit', e => {
  e.preventDefault();

  const docRef = doc(db, 'books', updateForm.id.value);
  updateDoc(docRef, { title: 'Título atualizado' })
    .then(() => updateForm.reset())

});

// Cadastrando usuários
const signupForm = document.querySelector('.signup');
signupForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(credential => {
      console.log('Usuário criado:', credential.user)
    })
    .catch(err => console.log(err.message));

})

// Entrando com um usuário e saindo
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => console.log('O usuário saiu'))
})

const loginForm = document.querySelector('.login');
loginForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((credential) => console.log('Usuário logado', credential.user))
    .catch(err => console.error(err.message))

});