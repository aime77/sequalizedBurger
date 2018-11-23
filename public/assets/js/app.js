$(function(){

$(".change-devoured").on("click", function (event){
  let id = $(this).data("id");
  let newStatus = $(this).data("devour");
  console.log(newStatus);

  let newDev = {
    devoured: newStatus
  };

  $.ajax("/api/burgers/" + id, {
    type: "PUT",
    data: newDev
  }).then(
    () =>{
      console.log("changed devoured to", newDev);
      location.reload();
    }
  );
});

  $(".create-form").on("submit", function (event) {
    event.preventDefault();
    var test=$("#bNew").val().trim();
    console.log(test);
    let regex = /^[a-zA-Z\s]+$/;
    if ($(`#bNew`).val().trim() === ""|| !regex.test($("#bNew").val())) {
      $("#modalPopUp").text("You have to enter a valid name before submitting!");
      return true;
    }
  
    let newBurger = {
      burger_name: $("#bNew").val().trim(),

    };

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(()=> {
      console.log("created new burger");
      location.reload();
    }
    );
  });
});