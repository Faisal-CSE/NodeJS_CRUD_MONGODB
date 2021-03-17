//Add User Information
$("#add_user").submit(function (event){
    var strName = $("#name").val().trim();
    if(strName == ""){
        alert("Please enter your name.Your name is required to create account.");
        $("#name").focus();
        return false;
    }
    alert("New User added successfully.");
});


//Update User Information
$("#update_user").submit(function (event){
    event.preventDefault();

    var unindex_array = $(this).serializeArray();
    var data = {};
    $.map(unindex_array, function(n,i){
        data[n["name"]] = n["value"];
    });

    //console.log(unindex_array);
    //console.log(data);
    
    // var strName = $("#name").val().trim();
    // if(strName == ""){
    //     alert("Please enter your name.Your name is required to create account.");
    //     $("#name").focus();
    //     return false;
    // }

    var request = {
        "url" : `http://127.0.0.1:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Information updated successfully.");
    });

});

//Delete User Information
if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-uID")

        var request = {
            "url" : `http://127.0.0.1:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

