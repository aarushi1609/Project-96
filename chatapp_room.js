//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
  apiKey: "AIzaSyD0vjJIZBRk8I4zovt8acCvCt7VLzOweAo",
  authDomain: "let-s-chat-58d8c.firebaseapp.com",
  databaseURL: "https://let-s-chat-58d8c-default-rtdb.firebaseio.com",
  projectId: "let-s-chat-58d8c",
  storageBucket: "let-s-chat-58d8c.appspot.com",
  messagingSenderId: "978682044648",
  appId: "1:978682044648:web:0c46bc1ee49b6faf1c695d",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("Username");
document.getElementById("welcome").innerHTML = "Welcome " + username + "!";

function addRoom() {
  room_name = document.getElementById("add_room_input").value;
  localStorage.setItem("roomname", room_name);
  firebase.database().ref("/").child(room_name).update({
    purpose: "adding room name"
  });
  window.location = "kwitter_page.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      Room_names = childKey;
      //Start code 
      console.log("room name - ", Room_names);
      row = "<div class='room_name' id='" + Room_names + "' onclick='changePage(this.id);' >" + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      //End code
    });
  });
}
getData();

function changePage(name) {
  console.log("done");
  localStorage.setItem("roomname", name);
  window.location = "chatapp_page.html";
}

function logout()
{
      localStorage.removeItem("Roomname");
      localStorage.removeItem("Username");
      window.location = "index.html";
}

