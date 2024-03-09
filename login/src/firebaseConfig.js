import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA8rhkm47eRiouQPQBT-LxjzqfOwuly7Qs",
  authDomain: "clever-cortex-367111.firebaseapp.com",
  projectId: "clever-cortex-367111",
  storageBucket: "clever-cortex-367111.appspot.com",
  messagingSenderId: "588448514424",
  appId: "1:588448514424:web:5e61728f6bafa1d52b4e63"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp); // Obtener el módulo auth de Firebase

console.log('Firebase inicializado correctamente:', firebaseApp);
console.log('Módulo auth disponible:', auth);

export default firebaseApp;
export { auth }; // Exportar el módulo auth para su uso en otros archivos
