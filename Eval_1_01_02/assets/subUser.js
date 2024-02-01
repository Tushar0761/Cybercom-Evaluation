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
