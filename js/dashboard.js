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
const database = firebase.database().ref("users");
database.on("value", gotData);

function gotData(data) {
  var users = data.val();
  var keys = Object.keys(users);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var name = users[key].full_name;
    var email = users[key].email;
    var score = users[key].score;

    // Add the data to a table row
    var row = document.createElement("tr");
    var nameCell = document.createElement("td");
    var emailCell = document.createElement("td");
    var scoreCell = document.createElement("td");

    nameCell.innerText = name;
    emailCell.innerText = email;
    scoreCell.innerText = score;

    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(scoreCell);

    var tbody = document.getElementById("tbody1");
    tbody.appendChild(row);
  }
}


