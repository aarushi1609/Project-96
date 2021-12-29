function addUser()
{
    window.location = "chatapp_rooms.html";
    username = document.getElementById("username_input").value;
    localStorage.setItem("Username", username);
}