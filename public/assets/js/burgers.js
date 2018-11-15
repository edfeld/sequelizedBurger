// Make sure we wait to attach our handlers until the DOM is fully loaded.
// Capture the "devour it!" button click to perform an update
$(function() {
    $(".change-devoured").on("click", function(event) {
      var id = $(this).data("id");
      console.log("id: ", id);
      var isDevoured = $(this).data("newstate");
        console.log("isDevoured: ", isDevoured);
      var newState = {
        devoured: isDevoured
      };
  
      // Send the PUT request.  It's an update call
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newState
      }).then(
        function() {
          console.log("changed devoured to", newState);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    // "create a new burger" listener. 
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      // Devoured is set to 0 as the default.  
      var newBurger = {
        burger_name: $("#burg").val().trim(),
        devoured: 0
      };
  
      // Send the POST request. Create a new burger.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
  });
  