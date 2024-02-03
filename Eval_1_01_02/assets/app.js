$(document).ready(() => {
  $("#error-email-login , #error-password-login ").hide();
});

$("#helpIcon").click(() => {
  $("#passwordHelp").fadeIn("fast");

  setTimeout(() => {
    $("#passwordHelp").fadeOut("slow");
  }, 4000);
});

$("#loginBtn").click(() => {
  let email = $("#LoginEmail").val();
  let pass = $("#LoginPassword").val();

  if (!validate(email, pass)) {
    return;
  }

  handleLogin(email, pass);
});

function handleLogin(email, pass) {
  let admin = JSON.parse(localStorage.getItem("admin"));
  let currentLogin = { user: {}, isAdmin: false };

  if (admin.pass === pass && admin.email === email) {
    currentLogin.user = admin;
    currentLogin.isAdmin = true;

    localStorage.setItem("currentLogin", JSON.stringify(currentLogin));

    window.location.href = "pages/Dashboard.html";
    return true;
  } else if (admin.email === email) {
    alert("Id and Password didnt match for admin");
  } else {
    let userList = JSON.parse(localStorage.getItem("userList"));

    let userfound = false;

    userList.forEach((user) => {
      if (user.email === email) {
        userfound = true;

        if (user.password === pass) {
          currentLogin.user = user;
          localStorage.setItem("currentLogin", JSON.stringify(currentLogin));

          window.location.href = "./pages/Sub-user.html";
        } else {
          alert("Wrong Password.");
        }
      }
    });

    if (!userfound) alert("No user found with this email.");
  }
}

function validate(email, pass) {
  let bool = true;

  if (!validateEmail(email)) {
    bool = false;
    $("#LoginEmail").addClass("border-danger");
    $("#error-email-login").slideDown();
  } else {
    $("#LoginEmail").removeClass("border-danger");
    $("#error-email-login").slideUp();
  }
  if (!validatePass(pass)) {
    bool = false;
    $("#error-password-login").slideDown();
    $("#LoginPassword").addClass("border-danger");
  } else {
    $("#error-password-login").slideUp();
    $("#LoginPassword").removeClass("border-danger");
  }
  return bool;
}

function validateEmail(email) {
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (regex.test(email)) {
    return true;
  }

  return false;
}

function validatePass(pass) {
  let regex = /\w{8}/;

  if (regex.test(pass)) {
    return true;
  }

  return false;
}
