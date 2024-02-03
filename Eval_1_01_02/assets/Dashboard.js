$(document).ready(() => {
  loadUserCount();
});

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

function loadUserCount() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let teen = 0;
  let old = 0;
  let adult = 0;

  userList.forEach((user) => {
    if (user.age < 18) teen++;
    else if (user.age > 50) old++;
    else adult++;
    console.log(teen, old, adult);
  });

  $("#teen").text(teen);
  $("#old").text(old);
  $("#adult").text(adult);
}
