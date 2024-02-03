$("#panel");

$(document).ready(() => {
  if (!checkAdmin()) {
    return;
  }

  $("#Panel").html(panel);
  addClass();
  $("#logout").click(logoutHandler);
  loadUserName();
});

function checkAdmin() {
  let currentUser = getLocalStorage("currentLogin");
  if (!currentUser) {
    $("body").html(
      `<center>
      <h1>Please Login First</h1>
      <a href='../login.html'>Login</a>
      </center>`
    );
    return false;
  }

  if (!currentUser.isAdmin) {
    $("body").html("<center><h1>Only Admin can access this page</h1></center>");

    return false;
  }
  return true;
}

function loadUserName() {
  let currentUser = getLocalStorage("currentLogin");

  $("#userName").text(currentUser.user.name);
}

let panel = `<h3 id="hello">Hello <span id="userName"></span></h3>
        <div id="links">
        <a href="./Dashboard.html">
        <div>
            Dashboard
            </div>
            </a>
            <a href="./User.html">
            <div>
            Users
            </div>
            </a>
            <a href="./UserSession.html">
          <div>
            Login Sessions
            </div>
            </a>
            <a id="logout" href="#" >
          <div id="abc">
            Logout
            </div>
            </a>
            
        </div>`;

function logoutHandler() {
  console.log("logout");
  let currentLogin = getLocalStorage("currentLogin");
  setLocalStorage("currentLogin", "{}");
  window.location.href = "../login.html";
}

function addClass() {
  $("a").addClass("text-dark pt-2 pb-1 m-1");

  $("#links div")
    .addClass("rounded p-3")
    .hover(
      function () {
        $(this).addClass("bg-dark text-light");
      },
      function () {
        $(this).removeClass("bg-dark text-light");
      }
    );
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || null;
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
