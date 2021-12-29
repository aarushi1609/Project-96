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
  
function logout()
{
      localStorage.removeItem("Roomname");
      localStorage.removeItem("Username");
      window.location = "index.html";
}

room_name = localStorage.getItem("Roomname");
user_name = localStorage.getItem("Username");

function send() {
  msg = document.getElementById("message_input").value;
  firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
  })
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
              childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                    firebase_message_id = childKey;
                    message_data = childData;
                    //Start code
                    console.log(firebase_message_id);
                    console.log(message_data);
                    name = message_data["name"];
                    message = message_data["message"];
                    likes = message_data["like"];

                    name_tag = "<h4>" + name + "  <img class= 'user_tick' src= 'tick.png'</h4>";
                    message_content = "<h4 class='message_h4'>" + message + "</h4>";
                    like_button = "<button class='btn btn-primary button_like btn-sm' id='" + firebase_message_id + "' value=" + likes + " onclick='updateLikes(this.id);'>";
                    like_button_content = "Likes: " + likes + "</span></button><hr>"
                    row = name_tag + message_content + like_button + like_button_content;
                    document.getElementById("output").innerHTML += row;
                    //End code
              }
        });
  });
}
getData();

function updateLikes(id) {
      console.log("click on the like button" + id);
      likes_now = document.getElementById(id).value;
      updated_likes = Number(likes_now) + 1;
      firebase.database().ref(room_name).child(id).update({
            like: updated_likes
      });
      console.log("likes -" + updated_likes)
}



