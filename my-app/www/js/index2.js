ip = 'ec2-54-84-193-64.compute-1.amazonaws.com/www/';
//ip = '172.20.71.97';
currentUser = "";
homepageCategory = "all";
editpost_id = "";
//  SIGNUP

$(document).on('pagebeforeshow', '#register', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $(document).off('click', '#submit_signup').on('click', '#submit_signup', function() { 
            var x = $('#email_signup').val();
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
        // catch the form's submit event
            if($('#username_signup').val().length > 0 && $('#password_signup').val().length > 0 && $('#email_signup').val().length > 0){
                if (atpos>=1 && dotpos>=atpos+2 && dotpos+2<x.length){
                    if ($('#password_signup').val() == $('#confirmpassword_signup').val()){

                // Send data to server through the ajax call
                // action is functionality we want to call and outputJSON is our data

                        $.ajax({url: 'http://' + ip + '/phploginsession/signup.php',

                            //data: {action : 'login', formData : $('#check-user').serialize()},

                            data: {username: $('#username_signup').val(), password: $('#password_signup').val(), email: $('#email_signup').val()},
                            type: 'post',                   
                            async: 'true',

                                                    dataType: 'text',
                            beforeSend: function() {
                                // This callback function will trigger before data is sent
                                //$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                            },
                            complete: function() {
                                // This callback function will trigger on data sent/received complete
                                //$.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                            },
                            success: function (data, textStatus, xhr) {
                                alert(data);
   
                                $('#username_signup').val("");
                                $('#password_signup').val("");
                                $('#email_signup').val("");
                                $('#confirmpassword_signup').val("");
                                $.mobile.changePage("#login");
                                
                            },
                            error: function (xhr, status, error) {
                                // This callback function will trigger on unsuccessful action                
                                alert(error);
                            }
                        });

                        } else {
                            alert('Enter same password in Confirm Password');
                        } 

                    } else {
                        alert('Please enter a valid Email address');
                    }  

            } else {
                alert('Please fill all the fields');
            }           
            return false; // cancel original event to prevent form submitting
        });    
});

//  LOGIN

$(document).on('pagebeforeshow', '#login', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $(document).off('click', '#submit_login').on('click', '#submit_login', function() { 
        // catch the form's submit event
            if($('#username_login').val().length > 0 && $('#password_login').val().length > 0){
                    $.ajax({url: 'http://' + ip + '/phploginsession/signin.php',
                        data: {username: $('#username_login').val(), password: $('#password_login').val()},
                        type: 'post',                   
                        async: 'true',

                                                dataType: 'json',
                        beforeSend: function() {
                         },
                        complete: function() {
                            
                        },
                        success: function (data, textStatus, xhr) {
                            if(data["0"]==$('#username_login').val()) {
                                alert('Login Successful');
                                currentUser = data;
                                $.mobile.changePage("#home"); 
                                $('#username_login').val("");
                                $('#password_login').val("");                        
                            } else {
                                alert('Wrong Username/Password');

                            }
                        },
                        error: function (xhr, status, error) {
                            alert("Could not connect to server");
                        }
                    });   

            } else {
                alert('Please fill all necessary fields');
            }           
            return false; // cancel original event to prevent form submitting
        });    
});

//CURRENT USER
// $(document).on('pagebeforeshow', '#profile', function(){ 
// });

//POSTING ITEM

// $(document).on('pagebeforeshow', '#liberum', function(){ 
//         $.support.cors = true;
//         $.mobile.allowCrossDomainPages = true;
//         $(document).on('click', '#post_submit', function() { 
//         // catch the form's submit event
//             if($('#post_name').val().length > 0 && $('#post_description').val().length > 0 && $('#post_category').val().length > 0){
//                    $.getScript("js/phonegap.js", function(){

//                        // Here you can use anything you defined in the loaded script
//                         navigator.camera.getPicture(uploadPhoto,
//                                                     function(message) { alert('get picture failed'); },
//                                                     { quality: 50, 
//                                                     destinationType: navigator.camera.DestinationType.FILE_URI
//                                                     }
//                                                     );

//                     });
//             } else {
//                 alert('Please fill all necessary fields');
//             }           
//             return false; // cancel original event to prevent form submitting
//         });    
// });

//LOGOUT

$(document).on('pagebeforeshow', '#settings', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $(document).off('click', '#logout').on('click', '#logout', function() { 
                $.ajax({url: 'http://' + ip + '/phploginsession/logout.php',
                    data: {},
                    type: 'post',                   
                    async: 'true',

                                            dataType: 'text',
                    beforeSend: function() {
                     },
                    complete: function() {
                        
                    },
                    success: function (data, textStatus, xhr) {
                        alert(data);
                        $.mobile.changePage("#login");
                        currentUser = "";                         

                    },
                    error: function (xhr, status, error) {
                        alert(status);
                    }
                });   
        
            return false; // cancel original event to prevent form submitting
        });    
});

//HOME PAGE POSTS

$(document).on('pagebeforeshow', '#home', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.ajax({url: 'http://' + ip + '/phploginsession/display.php',
            data: {category:homepageCategory},
            type: 'post',                   
            async: 'true',

                                    dataType: 'json',
            beforeSend: function() {
            },
            complete: function() {
                
            },
            success: function (data, textStatus, xhr) {
                    var content = '';
                    var currentId = currentUser['user_id'];
                    $.each(data, function(){
                        if (this.user_id != currentId){
                            //content += '<div><a href="#" data-role="button" data-inline="true" data-mini="true">avatar </a>';
                            content += '<center>';
                            content += '<div class="cropped" data-post_id="' + this.post_id + '" data-image_url="http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + this.image_path + '" onclick="showImage(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + this.image_path + '\')"></div></div>';
                            content += '</center>';
                            //content += '<a href="#basic" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Item Title</a>';
                            content += '<div class="ui-grid-b">';
                            content += '<div class="ui-block-a"><a href="mailto:' + this.email + '?subject=Liberum%20Item%20' + this.post_id + '&body=Hello ' + this.user +',%0D%0A I am interested in the item (' + this.name + ') you displayed on Liberum!%0D%0A%0D%0A' + currentUser['username'] + '" data-user_id="' + currentId + '" data-post_id="' + this.post_id + '" onclick="want(this);" data-role="button" data-icon="check" data-mini="true">Want</a></div>';
                            content += '<div class="ui-block-b"><a href="#description' + this.post_id + '" data-rel="popup" data-theme="b" data-role="button" data-mini="true">Details</a></div>';
                            content += '<div data-role="popup" id="description' + this.post_id + '" data-overlay-theme="b"><a href="#description' + this.post_id + '" data-rel="back" data-role="button" data-icon="delete" data-theme="b" data-iconpos="notext" class="ui-btn-left">Close</a><br><p class="desc"><b>Item Title:</b> ' + this.name + ' <br><b>Category: </b><h7 class="allcaps2">' + this.category +'</h7><br><b>Description:</b><i><h7 class="description1"> ' + this.description + '</h7></i>';                        
                            content += '</p><br><p class="desc2">Posted By<br><a href="#" data-role="button" data-inline="false" data-user_id="' + this.user_id + '" data-username="' + this.user + '" onclick="otherUsers(this);" data-mini="true">' + this.user + '</a></p></div>';
                            content += '<div class="ui-block-c">';
                            content += '<a href="#" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true" data-post_id="' + this.post_id + '" onclick="showComment(this);">Comment</a>';
                            content += '</div></div><br><hr color="D0D0D0"><br>';
                        }
                    })
                    $('#sortedBy').html('Sorted by: <h7 class="allcaps"><b>' + homepageCategory + '</b></h7>');
                    $('#homepage').html(content);
                    $('#homepage').trigger("create");

            },
            error: function (xhr, status, error) {
                alert(status);
            }
        });             
            return false; // cancel original event to prevent form submitting
          
});

//CURRENT USER PROFILE PAGE

$(document).on('pagebeforeshow', '#profile', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $('#current_user button').html(currentUser['username']);
        $.ajax({url: 'http://' + ip + '/phploginsession/profile.php',
            data: {user_id:currentUser['user_id']},
            type: 'post',                   
            async: 'true',

                                    dataType: 'json',
            beforeSend: function() {
            },
            complete: function() {
                
            },
            success: function (data, textStatus, xhr) {
                    var content = '';
                    var i;
                    if (data.length%3 == 0){
                        for (i = 0; i < (data.length); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[i].post_id + '" onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[i+1].post_id + '" onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped" data-post_id="' + data[i+2].post_id + '"onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';

                        }
                    } else if (data.length%3 == 1){
                        for (i = 0; i < (data.length-1); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[i].post_id + '" onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[i+1].post_id + '"onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped" data-post_id="' + data[i+2].post_id + '"onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';
                                          
                        }
                        content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[data.length-1].post_id + '" onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-1].image_path + '\')"></div></div></div>';

                    } else {
                        for (i = 0; i < (data.length-2); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[i].post_id + '" onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[i+1].post_id + '" onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped" data-post_id="' + data[i+2].post_id + '"" onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';
                                          
                        }
                        content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[data.length-2].post_id + '" onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-2].image_path + '\')"></div></div></div>';
                        content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[data.length-1].post_id + '" onclick="showPost(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-1].image_path + '\')"></div></div></div>';

                    } 

                    $('#profilegrid').html(content);
                    $('#profilegrid').trigger("create");

            },
            error: function (xhr, status, error) {
                alert(status);
            }
        });             
            return false; // cancel original event to prevent form submitting
          
});


//DELETE CURRENT USER
$(document).off('click', '#delete_account').on('click', '#delete_account', function(){
    if ($('#update_currentpassword').val() == currentUser['password']){
        var r=confirm("Are you sure you want to Delete your account?");
        if (r==true){ 
                $.support.cors = true;
                $.mobile.allowCrossDomainPages = true;
                $.ajax({url: 'http://' + ip + '/phploginsession/delete_user.php',
                    data: {user_id:currentUser['user_id']},
                    type: 'post',                   
                    async: 'true',

                                            dataType: 'json',
                    beforeSend: function() {
                    },
                    complete: function() {
                        
                    },
                    success: function (data, textStatus, xhr) {
                        $.mobile.changePage("#login");
                    },
                    error: function (xhr, status, error) {
                        $.mobile.changePage("#login");
                    }
                });
                alert("Account Deleted"); 
          }
        else {
            
          }

    } else {
        alert("Enter your correct current password");
    } 
            
            return false; // cancel original event to prevent form submitting
          
});


//OTHER USER PROFILE
function otherUsers(user){
        var user_id = user.getAttribute("data-user_id");
        var username = user.getAttribute("data-username");
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.ajax({url: 'http://' + ip + '/phploginsession/profile.php',
            data: {user_id:user_id},
            type: 'post',                   
            async: 'true',

                                    dataType: 'json',
            beforeSend: function() {
            },
            complete: function() {
                
            },
            success: function (data, textStatus, xhr) {
                    var content = '';
                    var i;
                    if (data.length%3 == 0){
                        for (i = 0; i < (data.length); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[i].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[i+1].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped" data-post_id="' + data[i+2].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';

                        }
                    } else if (data.length%3 == 1){
                        for (i = 0; i < (data.length-1); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[i].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[i+1].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped" data-post_id="' + data[i+2].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';
                                           
                        }
                        content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[data.length-1].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-1].image_path + '\')"></div></div></div>';

                    } else {
                        for (i = 0; i < (data.length-2); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[i].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[i+1].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped" data-post_id="' + data[i+2].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';
                                           
                        }
                        content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[data.length-2].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-2].image_path + '\')"></div></div></div>';
                        content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[data.length-1].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-1].image_path + '\')"></div></div></div>';

                    } 

                    $('#otherprofilegrid').html(content);
                    $('#other_user button').html(username);
                    $('#otherprofilegrid').trigger("create");
                    $.mobile.changePage("#others_profile");

            },
            error: function (xhr, status, error) {
                alert(status);
            }
        });             
            return false; // cancel original event to prevent form submitting

}

//CHANGING CATEGORY
$(document).on('click', '#category_select_submit', function(){ 
    homepageCategory = $('#category_form').val();
    $.mobile.changePage("#home");          
});


//ADDING WANTS
function want(post){
        var user_id = post.getAttribute("data-user_id");
        var post_id = post.getAttribute("data-post_id");
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.ajax({url: 'http://' + ip + '/phploginsession/want.php',
            data: {user_id:user_id,post_id:post_id},
            type: 'post',                   
            async: 'true',

                                    dataType: 'json',
            beforeSend: function() {
            },
            complete: function() {
                
            },
            success: function (data, textStatus, xhr) {

            },
            error: function (xhr, status, error) {
                    var user_id = post.getAttribute("data-user_id");
                    var post_id = post.getAttribute("data-post_id");
                    $.support.cors = true;
                    $.mobile.allowCrossDomainPages = true;
                    $.ajax({url: 'http://' + ip + '/phploginsession/blank.php',
                        data: {},
                        type: 'post',                   
                        async: 'true',

                                                dataType: 'json',
                        beforeSend: function() {
                        },
                        complete: function() {
                            
                        },
                        success: function (data, textStatus, xhr) {

                        },
                        error: function (xhr, status, error) {

                        }
                    });  


                }
                
        });  
            return false; // cancel original event to prevent form submitting

}

//UPDATE USER

$(document).on('pagebeforeshow', '#settings', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $('#update_email').val(currentUser['email']);
        $(document).off('click', '#update_user').on('click', '#update_user', function() { 
            var x = $('#update_email').val();
            var atpos = x.indexOf("@");
            var dotpos = x.lastIndexOf(".");
        // catch the form's submit event
            if($('#update_currentpassword').val().length > 0 && $('#update_email').val().length > 0 && $('#update_newpassword').val().length > 0){
                if (atpos>=1 && dotpos>=atpos+2 && dotpos+2<x.length){
                    if ($('#update_newpassword').val() == $('#update_confirmnewpassword').val()){
                        if ($('#update_currentpassword').val() == currentUser['password']){

                // Send data to server through the ajax call
                // action is functionality we want to call and outputJSON is our data

                            $.ajax({url: 'http://' + ip + '/phploginsession/edit_profile.php',

                                //data: {action : 'login', formData : $('#check-user').serialize()},

                                data: {password: $('#update_newpassword').val(), email: $('#update_email').val(), user_id: currentUser['user_id']},
                                type: 'post',                   
                                async: 'true',

                                                        dataType: 'json',
                                beforeSend: function() {
                                    // This callback function will trigger before data is sent
                                    //$.mobile.showPageLoadingMsg(true); // This will show ajax spinner
                                },
                                complete: function() {
                                    // This callback function will trigger on data sent/received complete
                                    //$.mobile.hidePageLoadingMsg(); // This will hide ajax spinner
                                },
                                success: function (data, textStatus, xhr) {
                                    currentUser = data;
                                    alert("updated");
                                    $.mobile.changePage("#profile");
                                    $('#update_email').val("");
                                    $('#update_newpassword').val("");
                                    $('#update_currentpassword').val("");
                                    $('#update_confirmnewpassword').val("");
                                },
                                error: function (xhr, status, error) {
                                    // This callback function will trigger on unsuccessful action                
                                    alert(error);
                                }
                            });
                            } else {
                                alert('Enter correct current password');
                            }

                        } else {
                            alert('Enter same password in Confirm Password');
                        } 

                    } else {
                        alert('Please enter a valid Email address');
                    }  

            } else {
                alert('Please fill all the fields');
            }              
            return false; // cancel original event to prevent form submitting
        });    
});

//SHOW IMAGE

function showImage(post){
        var image_url = post.getAttribute("data-image_url");
        var post_id = post.getAttribute("data-post_id");
        $('#image').html("<img class=\"cropped\" src=\"" + image_url + "\">");
        $.mobile.changePage("#image");


}

//SHOW POST
function showPost(post){
        var content = '';
        var post_id = post.getAttribute("data-post_id");
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.ajax({url: 'http://' + ip + '/phploginsession/display_post.php',
            data: {post_id:post_id},
            type: 'post',                   
            async: 'true',

                                    dataType: 'json',
            beforeSend: function() {
            },
            complete: function() {
                
            },
            success: function (data, textStatus, xhr) {

                content += '<center><img class="cropped" src="http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data.image_path + '"></center>';
                content += '<div class="ui-grid-a">';
                content += '<div class="ui-block-b"><a href="#comment" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true" data-post_id="' + post_id + '" onclick="showComment(this);">Comment</a></div></div>';
                content += '<p id="description' + data.post_id + '"><p class="desc2"><b>Item Title:</b> ' + data.name + ' <br><b>Category:</b> ' + data.category +'<br><b>Description:</b><i> ' + data.description + '</i></p>';
                content += '<div class="ui-grid-a"><div class="ui-block-a"><a href="#edititem" data-role="button" data-mini"true" data-post_id="' + data.post_id + '" data-description="' + data.description + '" data-category="' + data.category + '" data-name="' + data.name + '" onclick="editItemFill(this);">Edit</a></div><div class="ui-block-b"><a href="#delete" data-role="button" data-icon="delete" data-theme="b" data-mini"true" data-post_id="' + post_id + '" onclick="deletePost(this);">Delete</a></div></div>';

                $('#userItem').html(content);
                $('#userItem').trigger("create");
                $.mobile.changePage("#itempage");



            },
            error: function (xhr, status, error) {
                     


            }
                
        });  
            return false; // cancel original event to prevent form submitting


}


function showPost2(post){ //for non owners
        var content = '';
        var post_id = post.getAttribute("data-post_id");
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.ajax({url: 'http://' + ip + '/phploginsession/display_post.php',
            data: {post_id:post_id},
            type: 'post',                   
            async: 'true',

                                    dataType: 'json',
            beforeSend: function() {
            },
            complete: function() {
                
            },
            success: function (data, textStatus, xhr) {

                content += '<center><img class="cropped" src="http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data.image_path + '"></center>';
                content += '<div class="ui-grid-a">';
                content += '<div class="ui-block-b"><a href="#comment" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true" data-post_id="' + post_id + '" onclick="showComment(this);">Comment</a></div></div>';
                content += '<p id="description' + data.post_id + '"><b>Item Title:</b> ' + data.name + ' <br><b>Category:</b> ' + data.category +'<br><b>Description:</b><br><i>' + data.description + '</i><br></p>';

                $('#userItem').html(content);
                $('#userItem').trigger("create");
                $.mobile.changePage("#itempage");



            },
            error: function (xhr, status, error) {
                     


            }
                
        });  
            return false; // cancel original event to prevent form submitting


}

//DISPLAY WANTS
$(document).on('pagebeforeshow', '#profile2', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $('#current_user button').html(currentUser['username']);
        $.ajax({url: 'http://' + ip + '/phploginsession/display_wants.php',
            data: {user_id:currentUser['user_id']},
            type: 'post',                   
            async: 'true',

                                    dataType: 'json',
            beforeSend: function() {
            },
            complete: function() {
                
            },
            success: function (data, textStatus, xhr) {
                    var content = '';
                    var i;
                    if (data.length%3 == 0){
                        for (i = 0; i < (data.length); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[i].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[i+1].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped" data-post_id="' + data[i+2].post_id + '"onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';

                        }
                    } else if (data.length%3 == 1){
                        for (i = 0; i < (data.length-1); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[i].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[i+1].post_id + '"onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped" data-post_id="' + data[i+2].post_id + '"onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';
                                          
                        }
                        content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[data.length-1].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-1].image_path + '\')"></div></div></div>';

                    } else {
                        for (i = 0; i < (data.length-2); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[i].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[i+1].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped" data-post_id="' + data[i+2].post_id + '"" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';
                                          
                        }
                        content += '<div class="ui-block-a"><div class="cropped" data-post_id="' + data[data.length-2].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-2].image_path + '\')"></div></div></div>';
                        content += '<div class="ui-block-b"><div class="cropped" data-post_id="' + data[data.length-1].post_id + '" onclick="showPost2(this);"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-1].image_path + '\')"></div></div></div>';

                    } 
                    $('#wanteditems').html(content);
                    $('#wanteditems').trigger("create");

            },
            error: function (xhr, status, error) {
                alert(status);
            }
        });             
            return false; // cancel original event to prevent form submitting
          
});

//DELETE POST
function deletePost(post){
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        post_id = post.getAttribute("data-post_id");
        var r=confirm("Are you sure you want to Delete your post?");
        if (r==true){ 
                $.support.cors = true;
                $.mobile.allowCrossDomainPages = true;
                $.ajax({url: 'http://' + ip + '/upload/delete_post.php',
                    data: {post_id:post_id},
                    type: 'post',                   
                    async: 'true',

                                            dataType: 'text',
                    beforeSend: function() {
                    },
                    complete: function() {
                        
                    },
                    success: function (data, textStatus, xhr) {
                        $.mobile.changePage("#profile");
                        alert("Post Deleted"); 

                    },
                    error: function (xhr, status, error) {
                        alert(status);
                    }
                });
          }
        else {
            
          }

            
            return false; // cancel original event to prevent form submitting
          
}


//UPDATE ITEM
function editItemFill(post){
        var post_id = post.getAttribute("data-post_id");
        var description = post.getAttribute("data-description");
        var category = post.getAttribute("data-category");
        var name = post.getAttribute("data-name");


        $('#editpost_name').val(name);
        $('#editpost_description').val(description);
        $('#editpost_category').val(category);
        editpost_id = post_id;

}

$(document).on('click', '#editpost_submit', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.ajax({url: 'http://' + ip + '/phploginsession/edit_item.php',
            data: {post_id:editpost_id, description:$('#editpost_description').val(), name:$('#editpost_name').val(), category:$('#editpost_category').val()},
            type: 'post',                   
            async: 'true',

                                    dataType: 'text',
            beforeSend: function() {
            },
            complete: function() {
                
            },
            success: function (data, textStatus, xhr) {
                $.mobile.changePage("#profile");
                editpost_id="";
                alert("Post Edited"); 

            },
            error: function (xhr, status, error) {
                alert(status);
            }
        });
            
            return false;         
});

//SHOW COMMENTS FOR A POST

function showComment(post){
        var post_id = post.getAttribute("data-post_id");
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.ajax({url: 'http://' + ip + '/phploginsession/display_comment.php',
            data: {post_id:post_id},
            type: 'post',                   
            async: 'true',

                                    dataType: 'json',
            beforeSend: function() {
            },
            complete: function() {
                
            },
            success: function (data, textStatus, xhr) {
                    var content = '';
                    $.each(data, function(){
                        content += '<a href="#" data-role="button" data-icon="check" data-inline="true" data-mini="true" data-user_id="' + this.user_id + '" data-username="' + this.username + '" onclick="otherUsers(this);">' + this.username + '</a>';
                        content += '<p>' + this.comment + '</p>';
                        content += '<hr>';

                    })
                    $('#comments').html(content);
                    $('#comments').trigger("create");
                    $('#comment_button').html('<button type="submit" data-post_id="' + post_id + '" onclick="addComment(this);" data-theme="b">Add Comment</button>');
                    $('#comment_button').trigger("create");
                    $.mobile.changePage("#comment");

            },
            error: function (xhr, status, error) {
                alert(status);
            }
        });             
            return false; 

}

//ADD COMMENT
function addComment(post){
        var post_id = post.getAttribute("data-post_id");
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.ajax({url: 'http://' + ip + '/phploginsession/comment.php',
            data: {post_id:post_id, user_id:currentUser['user_id'], comment:$('#comment_text').val()},
            type: 'post',                   
            async: 'true',

                                    dataType: 'text',
            beforeSend: function() {
            },
            complete: function() {
                
            },
            success: function (data, textStatus, xhr) {
                alert("Comment Added");
                $('#comment_text').val("");
                $('#comment').trigger("create");
                $.mobile.changePage("#home");
                
                        
             },
            error: function (xhr, status, error) {
                alert(status);
            }
        });  
            return false; 
}


function onDeviceReady() {

    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto,
                                function(message) { alert('get picture failed'); },
                                { quality: 50, 
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType : Camera.PictureSourceType.CAMERA
                            });

}

function refreshPage(page) {
  $.mobile.changePage(
    page,
    {
      allowSamePageTransition : true,
      transition              : 'none',
      showLoadMsg             : false,
      reloadPage              : true,
      changeHash              : false
    }
  );
}

// function uploadPhoto(imageURI) {
//     var options = new FileUploadOptions();
//     options.fileKey="file";
//     options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
//     options.mimeType="image/jpeg";

//     var params = {};
//     params.value1 = "test";
//     params.value2 = "param";

//     options.params = params;
//     alert("uploaded");

//     var ft = new FileTransfer();

//     ft.upload(imageURI, encodeURI("http://" + ip + "/upload/upload_file.php"), win, fail, options);

// }

// function win(r) {
//     console.log("Code = " + r.responseCode);
//     console.log("Response = " + r.response);
//     console.log("Sent = " + r.bytesSent);
// }

// function fail(error) {
//     alert("An error has occurred: Code = " + error.code);
//     console.log("upload error source " + error.source);
//     console.log("upload error target " + error.target);
// }

