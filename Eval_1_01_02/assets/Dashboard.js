$(document).ready(() => {
  loadUserCount();
});

function loadUserCount() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let teen = 0;
  let old = 0;
  let adult = 0;

  userList.forEach((user) => {
    if (user.age < 18) teen++;
    else if (user.age > 50) old++;
    else adult++;
  });

  $("#teen").text(teen);
  $("#old").text(old);
  $("#adult").text(adult);
}
