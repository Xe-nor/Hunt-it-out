const firebaseConfig = {
  apiKey: "AIzaSyAsb9QNKWqahW1VuM27UwkczaOFkMBkNqU",
  authDomain: "huntitout-512fe.firebaseapp.com",
  databaseURL:
    "https://huntitout-512fe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "huntitout-512fe",
  storageBucket: "huntitout-512fe.appspot.com",
  messagingSenderId: "123120591497",
  appId: "1:123120591497:web:b8f7351512ce7c9bff5c58",
  measurementId: "G-PV9FD53Y4B",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();
// Set up our register function
function register() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  full_name = document.getElementById("full_name").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password are not proper!");
    return;
    // Don't continue running the code
  }
  if (validate_field(full_name) == false) {
    alert("Name is not proper");
    return;
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // DOne
      alert("User Created! You can login now.");
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}
// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  if (email === "admin@example.com" && password === "admin") {
    // Redirect to special page for special users
    window.location.href = "/dashboard.html";
  }

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert("Email or Password are not proper!");
    return;
  }
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;
      window.location.href = "index.html";
      // Add this user to Firebase Database
      var database_ref = database.ref();
      // Create User data
      var user_data = {
        last_login: Date.now(),
      };
      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);
      var userId = user.uid;
      var userRef = firebase.database().ref("users/" + userId);
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}
// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    // existing and future Auth states are now persisted in the current
    // session only. Closing the browser would clear any existing state even
    // if a user forgets to sign out.
    console.log("User persistence set successfully.");
  })
  .catch((error) => {
    console.error("Error setting user persistence: ", error);
  });
//
var authDiv = document.getElementById("loginn");
var startbtn = document.getElementById("start");
var logoutbtn = document.getElementById("logout");
firebase.auth().onAuthStateChanged(function (user) {
  // User is signed in,
  if (user) {
    startbtn.addEventListener("click", function () {
      window.location.href = "/game.html";
    });
    logoutbtn.addEventListener("click", function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          alert("User Logged out successfully.");
        })
        .catch((error) => {
          // An error happened.
          console.error(error);
        });
    });
    firebase
      .database()
      .ref("users/" + user.uid)
      .once("value")
      .then(function (snapshot) {
        var userData = snapshot.val();
        if (userData && userData.full_name) {
          authDiv.innerHTML = "Welcome, " + userData.full_name;
        } else {
          authDiv.innerHTML = "Welcome!";
        }
      });
    // User is not signed in,
  } else {
    logoutbtn.style.display = "none";
    authDiv.innerHTML =
      ' <a href="#" id="loginn" class="#">Login/Register<span></span></a>';

    authDiv.addEventListener("click", function () {
      window.location.href = "/register.html";
    });
    startbtn.addEventListener("click", function () {
      alert("You need to Login first.");
    });
  }
});
