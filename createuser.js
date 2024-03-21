  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAJjys42HRwkqsZ0PntNDaojMXFC2aYdR4",
    authDomain: "project-3dac5.firebaseapp.com",
    projectId: "project-3dac5",
    storageBucket: "project-3dac5.appspot.com",
    messagingSenderId: "119362021036",
    appId: "1:119362021036:web:c2de170586dc4b5cc2e109",
    measurementId: "G-MTQ82D76PX",
    databaseURL: "https://project-3dac5-default-rtdb.firebaseio.com",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
import { getDatabase,get, ref, set, child, push, update, remove} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const db = getDatabase();




//function to create a new user
function createData(){
  
    const createREF = ref(db, 'users');
  
    var nameVal = document.getElementById("user-name").value
    console.log(nameVal)

    var passwordVal = document.getElementById("user-password").value
   
    var ageVal = document.getElementById("user-age").value
    console.log(ageVal)

    var locationVal = document.getElementById("user-location").value
    console.log(locationVal)

    var fieldVal = document.getElementById("user-field").value
    console.log(fieldVal)
    
    var emailVal = document.getElementById("user-email").value
    console.log(emailVal)
  
    const newUser = push(createREF);
    set(newUser, {
      name: nameVal,
      password: passwordVal,
      age: ageVal,
      location: locationVal,
      field: fieldVal,
      email: emailVal

    }).then(() => {
      console.log("new user created");
    }).catch((error) => {
      console.log("create error: ", error);
    });
    
}

  //event handler for newUser button
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('createData').addEventListener('click', createData);
  });