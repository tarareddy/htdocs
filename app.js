
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

//a different import statement
//import { getDatabase, ref, set, onValue, child, get } from "/firebase/database";
const db = getDatabase();



  

var namebox = document.getElementById("input-name");

var emailbox = document.getElementById("email");


function insert_data(namep, emailp){
  set(ref(db, 'users/'), {
    email: emailp,
    name: namep
  });
}

//a function to read the data with the promise
function readData(){
  return new Promise((resolve, reject) => {
    const readData_db = ref(getDatabase());
    get(child(readData_db, 'users/')).then((snapshot)=> {
      if(snapshot.exists() == true){
      //console.log(typeof JSON.parse(snapshot.val()));
        console.log(snapshot.val());
        resolve(snapshot.val());
    }else{
      reject("no data was found");
    }
  }).catch((error) => {
    reject(error);
  });

  });
  
}

//function to create a new user
function createData(){
  
  const createREF = ref(db, 'users');

  var nameVal = document.getElementById("input-name").value
  console.log(nameVal)
  
  var emailVal = document.getElementById("email").value
  console.log(emailVal)

  const newUser = push(createREF);
  set(newUser, {
    email: emailVal,
    name: nameVal,
  }).then(() => {
    console.log("new user created");
  }).catch((error) => {
    console.log("create error: ", error);
  });
  
}

//a function to delete the data
function deleteAllData(){
  var nameVal = document.getElementById("input-name").value
  console.log(nameVal)
  
  var emailVal = document.getElementById("email").value
  console.log(emailVal)
  
  const usersList = ref(db, 'users/');

  remove(usersList).then(() => {
    console.log("data was deleted");
  }).catch((error) => {
    console.log("deleteData error: ", error);
  });
}

//function to delete specific user
function deleteData(){
  var nameVal = document.getElementById("input-name").value
  console.log(nameVal)
  
  
  const usersList = ref(db, 'users/');
  get(usersList).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const userProfile = childSnapshot.val();
      if(userProfile.name == nameVal){
        remove(childSnapshot.ref).then(() =>{
          console.log("user data deleted.");
        }).catch((error) => {
          console.error("error deleting user data: ",error);
        });
      }
    });
  }).catch((error) => {
    console.error("error finding the user", error);
  });
  
}



//new with prromise?
function submit_clicked() {
  var name_field = document.getElementById("input-name").value
  console.log(name_field)
  

var email_field = document.getElementById("email").value
console.log(email_field)

insert_data(name_field, email_field);
var usernameData = readData();


readData().then(usernameData => {
  document.getElementById('readData').innerHTML = JSON.stringify(usernameData);
}).catch(error => {
  console.error("submit_click Error readData(): ", error);
});
}


  // event listener for submit
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('submit').addEventListener('click', submit_clicked);
});

//event handler for deleting all data button

document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('deleteAllData').addEventListener('click', deleteAllData);
});

//event handler for specific deleting
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('deleteData').addEventListener('click', deleteData);
});


//event handler for newUser button
document.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById('createData').addEventListener('click', createData);
});
 

