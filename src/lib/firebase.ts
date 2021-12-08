import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

//import { seedDatabase } from '../seed';

//Configurações do Firebase
//!!!Configurações pessoais!!!
const config = {
    apiKey: "AIzaSyAlkZIImji_HRWZxRcIPF-2a7TFPguCLaA",
    authDomain: "instagram-clone-c575b.firebaseapp.com",
    projectId: "instagram-clone-c575b",
    storageBucket: "instagram-clone-c575b.appspot.com",
    messagingSenderId: "24682977988",
    appId: "1:24682977988:web:49a9288d5e4d19873ac791"
};

//Criação de uma instância do Firebase
const firebase = Firebase.initializeApp(config);
//Usado para operações de set e update
const { FieldValue } = Firebase.firestore;

//Chamada do seed para preencher a base de dados
//Deve ser exucutado uma única vez
//seedDatabase(firebase);

export { firebase, FieldValue };