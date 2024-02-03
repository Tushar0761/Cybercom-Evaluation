let adminName = $("#registraion-name");
let adminEmail = $("#registraion-email");
let adminPassword = $("#registraion-password");
let confirmPassword = $("#registraion-confirmPassword");
let formCity = $("#registraion-city");
let formState = $("#registraion-state");

let tnc = $("#tnc");

let adminNameErr = $("#error-registration-name");
let adminEmailErr = $("#error-registration-email");
let adminPasswordErr = $("#error-registration-password");
let confirmPasswordErr = $("#error-registration-confirmPassword");
let formCityErr = $("#error-registration-city");
let formStateErr = $("#error-registration-state");

$(document).ready(() => {
  addOptions();
});

$("#registerBtn").click(() => {
  if (validate()) {
    if (!tnc.is(":checked")) {
      alert("Please Accept the Terms and Conditions");

      return;
    }
    if (registerAdmin()) {
      clearForm();

      alert("Admin registered, You can now login");
    }
  }
});

function clearForm() {
  adminName.val("");
  adminEmail.val("");
  adminPassword.val("");
  formCity.val("");
  formState.val("");
  confirmPassword.val("");
}

function registerAdmin() {
  let admin = {
    name: adminName.val(),
    email: adminEmail.val(),
    pass: adminPassword.val(),
    city: formCity.val(),
    state: formState.val(),
  };

  let pastAdmin = localStorage.getItem("admin");
  if (!pastAdmin) {
    localStorage.setItem("admin", JSON.stringify(admin));
  } else {
    alert("admin already exists");
    return false;
  }
  return true;
}

function validate() {
  let bool = true;
  bool = validateName() && bool;
  bool = validateCity() && bool;
  bool = validateEmail() && bool;
  bool = validatePass() && bool;
  bool = validatePassCon() && bool;
  bool = validateState() && bool;
  return bool;
}

function validateName() {
  let name = adminName.val();

  let bool = true;

  if (name === "") {
    adminName.addClass("border-danger");
    adminNameErr.text("This field is required").slideDown();

    bool = false;
  } else if (/\d/.test(name)) {
    adminName.addClass("border-danger");
    adminNameErr.text("Can not contains Numbers").slideDown();

    bool = false;
  } else if (!/\w{2}/.test(name)) {
    adminName.addClass("border-danger");
    adminNameErr.text("Should be at least 2 Characters long").slideDown();

    bool = false;
  } else {
    adminName.removeClass("border-danger");
    adminNameErr.slideUp();
  }

  return bool;
}

function validateEmail() {
  let email = adminEmail.val();

  let bool = true;
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (email === "") {
    adminEmail.addClass("border-danger");
    adminEmailErr.text("This field is required").slideDown();

    bool = false;
  } else if (!regex.test(email)) {
    adminEmail.addClass("border-danger");
    adminEmailErr.text("Enter Valid Email").slideDown();

    bool = false;
  } else {
    adminEmail.removeClass("border-danger");
    adminEmailErr.slideUp();
  }

  return bool;
}

function validatePass() {
  let pass = adminPassword.val();

  let bool = true;
  let regex = /\w{8}/;

  if (pass === "") {
    adminPassword.addClass("border-danger");
    adminPasswordErr.text("This field is required").slideDown();

    bool = false;
  } else if (!regex.test(pass)) {
    adminPassword.addClass("border-danger");
    adminPasswordErr.text("Enter Valid password").slideDown();

    bool = false;
  } else {
    adminPassword.removeClass("border-danger");
    adminPasswordErr.slideUp();
  }

  return bool;
}

function validatePassCon() {
  let pass = adminPassword.val();
  let conPass = confirmPassword.val();
  let bool = true;

  if (conPass === "") {
    confirmPassword.addClass("border-danger");
    confirmPasswordErr.text("This field is required").slideDown();

    bool = false;
  } else if (conPass !== pass) {
    confirmPassword.addClass("border-danger");
    confirmPasswordErr.text("Password Didnt Match").slideDown();

    bool = false;
  } else {
    confirmPassword.removeClass("border-danger");
    confirmPasswordErr.slideUp();
  }

  return bool;
}

function validateCity() {
  let bool = true;

  if (formCity.val() === "") {
    formCity.addClass("border-danger");
    formCityErr.slideDown();
    bool = false;
  } else {
    formCity.removeClass("border-danger");
    formCityErr.slideUp();
  }

  return bool;
}

function validateState() {
  let bool = true;

  if (formState.val() === "") {
    formState.addClass("border-danger");
    formStateErr.slideDown();
    bool = false;
  } else {
    formState.removeClass("border-danger");
    formStateErr.slideUp();
  }

  return bool;
}

function addOptions() {
  addCityOptions();
  addStateOptions();
}

function addCityOptions() {
  let cities = [
    "Ahmedabad",
    "Amreli district",
    "Anand",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Dahod",
    "The Dangs",
    "Gandhinagar",
    "Jamnagar",
    "Junagadh",
    "Kutch",
    "Kheda",
    "Mehsana",
    "Narmada",
    "Navsari",
    "Patan",
    "Panchmahal",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surendranagar",
    "Surat",
    "Vyara",
    "Vadodara",
    "Valsad",
  ];
  cities.forEach((s) => {
    let opt = document.createElement("option");
    opt.text = s;
    formCity.append(opt);
  });
}

function addStateOptions() {
  let state = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttarakhand",
    "Uttar Pradesh",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Lakshadweep",
    "Puducherry",
  ];
  state.forEach((s) => {
    let opt = document.createElement("option");
    opt.text = s;
    formState.append(opt);
  });
}
