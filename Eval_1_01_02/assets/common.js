$("#panel");

$(document).ready(() => {
  $("#Panel").html(panel);
  addClass();
  $("#logout").click(logoutHandler);
});

let panel = `<h3 id="hello">Hello Tushar</h3>
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
