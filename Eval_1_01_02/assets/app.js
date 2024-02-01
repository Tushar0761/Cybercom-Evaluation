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
  } else {
    let admin = JSON.parse(localStorage.getItem("admin"));
    if (admin.pass === pass && admin.email === email) {
      localStorage.setItem("currentLogin", JSON.stringify(email));
      window.location.href = "pages/Dashboard.html";
    } else {
      alert("Id and Password didnt match");
    }
  }
});

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
