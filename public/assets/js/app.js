$(function(){

$(".change-devoured").on("click", function (event){
  let id = $(this).data("id");
  let newStatus = $(this).data("devour");

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
    var test=$("#eNew").val().trim();
    console.log(test);
    // let regex = /^[a-zA-Z\s]+$/;
    // if ($(`#eNew`).val().trim() === ""|| !regex.test($("#eNew").val())) {
    //   $("#modalPopUp").text("You have to enter a valid name before submitting!");
    //   return true;
    // }
  
    let newEmail = {
      email: $("#eNew").val().trim(),
    };
    console.log('test');
    $.ajax("/api/customer", {
      type: "POST",
      data: newEmail
    }).then(()=> {
      console.log("created new burger");
      location.reload();
    }
    );
  });
});