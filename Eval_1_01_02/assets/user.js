$(document).ready(() => {
  addUserList();
});

function addUserList() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  console.log(userList);
  if (userList) {
    userList.forEach((user) => {
      let tr = ` <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.birthday}</td>
        <td>${user.age}</td>
        <td>edit </td>
      </tr>
    `;
      $("table tbody").append(tr);
    });
  }
}

$("a").addClass("text-white p-1  ");

$("#links div")
  .addClass("pt-2 pb-1 m-1 rounded")
  .hover(
    function () {
      $(this).addClass("bg-dark text-light");
    },
    function () {
      $(this).removeClass("bg-dark text-light");
    }
  );

let userName = $("#userName");
let userEmail = $("#userEmail");
let userPassword = $("#userPassword");
let userDate = $("#userDate");

$("#addBtn").click(() => {
  if (validate()) {
    addUserToLocalStorage();
  } else {
    alert("Please Provide Valid input ");
    console.log("no");
  }
});
function addUserToLocalStorage() {
  let userList = JSON.parse(localStorage.getItem("userList"));
  userAge = 2024 - userDate.val().split("-")[0];
  user = {
    name: userName.val(),
    email: userEmail.val(),
    password: userPassword.val(),
    birthday: userDate.val(),
    age: userAge,
  };

  if (userList) {
    userList = [...userList, user];

    localStorage.setItem("userList", JSON.stringify(userList));
  } else {
    localStorage.setItem("userList", JSON.stringify([user]));
  }
  clearForm();
  location.reload();
}

function clearForm() {
  userDate.val("");
  userEmail.val("");
  userName.val("");
  userPassword.val("");
}

function validate() {
  let bool = true;
  bool = validateName() && bool;
  bool = validateEmail() && bool;
  bool = validatePass() && bool;
  bool = validateDate() && bool;
  return bool;
}

function validateName() {
  let name = userName.val();

  let bool = true;

  if (name === "") {
    userName.addClass("border-danger");

    bool = false;
  } else if (/\d/.test(name)) {
    userName.addClass("border-danger");

    bool = false;
  } else if (!/\w{2}/.test(name)) {
    userName.addClass("border-danger");

    bool = false;
  } else {
    userName.removeClass("border-danger");
  }

  return bool;
}

function validateEmail() {
  let email = userEmail.val();

  let bool = true;
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (email === "") {
    userEmail.addClass("border-danger");

    bool = false;
  } else if (!regex.test(email)) {
    userEmail.addClass("border-danger");

    bool = false;
  } else {
    userEmail.removeClass("border-danger");
  }

  return bool;
}

function validatePass() {
  let pass = userPassword.val();

  let bool = true;
  let regex = /\w{8}/;

  if (pass === "") {
    userPassword.addClass("border-danger");

    bool = false;
  } else if (!regex.test(pass)) {
    userPassword.addClass("border-danger");

    bool = false;
  } else {
    userPassword.removeClass("border-danger");
  }

  return bool;
}

function validateDate() {
  let date = userDate.val();

  let bool = true;

  if (date === "") {
    userDate.addClass("border-danger");

    bool = false;
  } else {
    userDate.removeClass("border-danger");
  }

  return bool;
}
