$(document).ready(() => {
  addClass();
  loadUserName();
  $("#logout").click(logoutHandler);
  checkBirthday();
});

function logoutHandler() {
  console.log("logout");
  let currentLogin = getLocalStorage("currentLogin");
  setLocalStorage("currentLogin", "{}");
  window.location.href = "../login.html";
}

function loadUserName() {
  let currentUser = getLocalStorage("currentLogin");

  $("#userName").text(currentUser.user.name.toUpperCase());
}

function checkBirthday() {
  let currentUser = getLocalStorage("currentLogin");

  let today = new Date();
  let date = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  let month =
    today.getMonth() < 10
      ? "0" + Number(Number(today.getMonth()) + 1)
      : Number(today.getMonth()) + 1;

  let fullDate = today.getFullYear() + "-" + month + "-" + date;

  if (currentUser.user.birthday === fullDate) {
    $("#birthdayMSG").text("Happy Birthday");
  }
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
