function getGithubInfo(user) {
    // Creating an instance of XMLHttpRequest class and send a GET request using it.
    $.ajax({
        type: "GET", 
        dataType: 'json',
        url: `https://api.github.com/users/${user}`,
    }).done(function (data) { // This callback will execute on success of api
        showUser(data); // Calling ShowUser function with the response
    }).fail(function (data) { // This callback will execute on failure of api
        noSuchUser(username); // Calling noSuchUser function with username as parameter
    });
}

function showUser(user) {
    //Setting the contents of the div '#profile' with the user content
    // name user.name
    // id user.id
    // Picture user.avatar_url
    // link user.html_url 
    // Number of repos user.public_repos
    $('.errorMessage').hide(); // Hiding the Error Message
    //
    $('#loginName').html(`<span>Name of the User :</span> ${user.name}`);
    $('#userId').html(`<span>ID of the User :</span> ${user.id}`);
    $('.avatar').html(`<img class="img img-fluid" src=${user.avatar_url} />`);
    $('#link').html(`<span>Link to the user's account :</span><a href="${user.html_url}" target="_blank">Click Here</a>`);
    $('.information').html(`<span>Number of Repos :</span> ${user.public_repos}`);
    $('#profile').show(); // Showing the Profile div
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    // No User Found
    $('#profile').hide(); // Hiding the profile div
    $('.errorMessage').html(`No user found with UserName "${username}"`);
    $('.errorMessage').show(); // Showing the Error message
}

$(document).ready(function () {
    $(".test").css("background-image", "url(./bg1.jpg)");
    $("#submit").click(function () {  
        //get what the user enters
        username = $('#username').val();
        //reset the text typed in the input
        $('#username').val("");
        //get the user's information and store the respsonse
        getGithubInfo(username);
    });
});
