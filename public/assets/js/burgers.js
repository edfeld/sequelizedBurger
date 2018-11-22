// Make sure we wait to attach our handlers until the DOM is fully loaded.
// Capture the "devour it!" button click to perform an update

// let isShowCustomerDiv = false;
$(function () {
  console.log("==========> running burgers.js $function()");
  $("#create-customer-div").hide();
  getCustomers();

  // The devour click function
  $(".change-devoured").on("click", function (event) {
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
      function () {
        console.log("changed devoured to", newState);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // "create a new burger" listener. 
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("#burg val: ", $("#burg").val());
    if ($("#burg").val().trim() !== "") {
      // 
      // Devoured is set to 0 as the default.  
      console.log("customer select value: ", $("#customer-sel").val())
      var newBurger = {
        burger_name: $("#burg").val().trim(),
        devoured: 0,
        customerid: $("#customer-sel").val()
      };
  
      // Send the POST request. Create a new burger.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function () {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    }

  });

  // Create a new customer.  This section is hidden at some points. 
  $(".create-customer-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    console.log("customer Name input: ", $("#customer").val().trim());
    if ($("#customer").val().trim() !== "") {
      $("#create-customer-div").hide();
      // create newCustomer object
      var newCustomer = {
        name: $("#customer").val().trim()
      };
      
      console.log("++++++++++ NewCustomer: ", newCustomer);

      // Send the POST request. Create a new burger.
      $.ajax("/api/customers", {
        type: "POST",
        data: newCustomer
      }).then(
        function () {
          console.log("created new customer");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    }
  });

  // If the customer is changed to "Add a Customer",  diplay the customer div. 
  $("#customer-sel").change( function () {
    console.log("============== #customer: ", $("#customer-sel :selected").text().trim());
    if ($("#customer-sel :selected").text().trim() === "Add a Customer") {
      $("#create-customer-div").show();
      $("#create-burger-div").hide();
    }
  });

});

// Get the customers function
function getCustomers() {
  console.log("=================> running getCustomers()")
  $.get("api/customers", renderCustomersList);
}

// Loop the arrCustomers array and append each element to the dropdown list
function renderCustomersList(arrCustomers) {
  rowsToAdd= [];
  if (!arrCustomers.length) {
    rowsToAdd.push(createCustomerRow({id: -1, name: "Add a Customer"}));
  } else {
    let selectCustomers = $("#customer-sel");
    for (var i = 0; i < arrCustomers.length; i++) {
      rowsToAdd.push(createCustomerRow(arrCustomers[i]));
      console.log("customer item: ", arrCustomers[i]);
      
    }
    rowsToAdd.push(createCustomerRow({id: -1, name: "Add a Customer"}));
    selectCustomers.empty();
    console.log("rowsToAdd: ", rowsToAdd);
    console.log("selectCustomers: ", selectCustomers);
    selectCustomers.append(rowsToAdd);
  }
}

function createCustomerRow(customer) {
  var listOption = $("<option>");
    listOption.attr("value", customer.id);
    listOption.text(customer.name);
    return listOption;
}

// function createNewCustomer (strCustomer) {
//   var listOption = $("<option>");
//     listOption.attr("value", -1);
//     listOption.text(customer.name);
//     return listOption;
// }
