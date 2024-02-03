$(document).ready(() => {
  addUserList();
});

function addUserList() {
  let userList = JSON.parse(localStorage.getItem("userList"));

  $("table tbody").text("");

  if (userList) {
    userList.forEach((user) => {
      let tr = ` <tr id="${user.email}">
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.birthday}</td>
        <td>${user.age}</td>
        <td>${addButton(user.email)}</td>
      </tr>
    `;
      $("table tbody").append(tr);
    });
  }
}

function editUser(id) {
  let userList = getLocalStorage("userList");

  let currentUser = userList.filter(function (user) {
    if (user.email === id) {
      return user;
    }
  });

  userName.val(currentUser[0].name);
  userEmail.val(currentUser[0].email).attr("disabled", true);
  userPassword.val(currentUser[0].password);
  userDate.val(currentUser[0].birthday);

  $("#addBtn")
    .unbind("click")
    .text("Update User")
    .click(function () {
      updateBtnClickEvent(id);
    });
}

/* function getUser(id) {
  let userList = getLocalStorage("userList");

  let result = false;

  if (userList !== null) {
    userList.find((user) => {
      if (user.email == id) {
        console.log(user.email == id);
        console.log("found");
        result = user;
        return;
      }
    });
    alert("User is not present.");
  } else {
    alert("There is no user data.");
  }
  return result;
}
 */

function deleteUser(id) {
  let userList = getLocalStorage("userList");
  for (let i = 0; i < userList.length; i++) {
    if (id == userList[i].email) {
      if (confirm(`Are you sure to delete product ${userList[i].name} ?`)) {
        userList.splice(i, 1);
      } else {
        return;
      }
    }
  }
  setLocalStorage("userList", userList);

  addUserList();
}

let userName = $("#userName");
let userEmail = $("#userEmail");
let userPassword = $("#userPassword");
let userDate = $("#userDate");

$("#addBtn").click(addBtnClickEvent);

function updateBtnClickEvent(id) {
  let userList = getLocalStorage("userList");

  userList.forEach(function (user) {
    if (user.email === id) {
      user.name = userName.val();
      user.birthday = userDate.val();
      user.password = userPassword.val();
      user.age = 2024 - userDate.val().split("-")[0];
    }
  });

  userEmail.attr("disabled", false);

  $("#addBtn").unbind("click").text("Add").click(addBtnClickEvent);

  clearForm();

  addUserList();

  setLocalStorage("userList", userList);
}

function addBtnClickEvent() {
  if (validate()) {
    if (isUserPresent()) {
      alert("Email is already present.");
      return;
    }

    addUserToLocalStorage();
  } else {
    alert("Please Provide Valid input ");
  }
}

function isUserPresent() {
  let currentEmail = userEmail.val();
  let userList = getLocalStorage("userList") || [];

  let bool = false;

  userList.forEach((user) => {
    if (user.email === currentEmail) {
      console.log("email exist");
      bool = true;
    }
  });
  return bool;
}

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
  addUserList();
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

function addButton(id) {
  return `
  <btn class="btn btn-success m-1" onclick="editUser('${id}')">Edit</btn>
  <btn class="btn m-1 btn-danger" onclick="deleteUser('${id}')">Delete</btn>`;
}
