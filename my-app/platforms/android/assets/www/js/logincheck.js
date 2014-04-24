ip = 'ec2-54-84-193-64.compute-1.amazonaws.com/www/';
//ip = '172.20.71.97';
currentUser = "";
homepageCategory = "all";
count = 0;
//  SIGNUP

$(document).on('pagebeforeshow', '#register', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $(document).on('click', '#submit_signup', function() { 
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
                            success: function (result) {
                                alert("registered")
                                if(result.status) {
                                    $.mobile.changePage("#login");                         
                                } else {
                                    $.mobile.changePage("#login");                         

                                }
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
        $(document).on('click', '#submit_login', function() { 
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
        $(document).on('click', '#logout', function() { 
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
                            content += '<div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + this.image_path + '\')"></div></div>';
                            content += '</center>';
                            //content += '<a href="#basic" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Item Title</a>';
                            content += '<div class="ui-grid-b">';
                            content += '<div class="ui-block-a"><a href="mailto:' + this.email + '?subject=Liberum%20Item%20' + this.post_id + '&body=Hello ' + this.user +',%0D%0A I am interested in the item (' + this.name + ') you displayed on Liberum!%0D%0A%0D%0A' + currentUser['username'] + '" data-user_id="' + currentId + '" data-post_id="' + this.post_id + '" onclick="want(this);" data-role="button" data-icon="check" data-mini="true">Want</a></div>';
                            content += '<div class="ui-block-b"><a href="#description' + this.post_id + '" data-rel="popup" data-theme="b" data-role="button" data-mini="true">Details</a></div>';
                            content += '<div data-role="popup" id="description' + this.post_id + '" data-overlay-theme="b"><a href="#description' + this.post_id + '" data-rel="back" data-role="button" data-icon="delete" data-theme="b" data-iconpos="notext" class="ui-btn-left">Close</a><br><p class="desc"><b>Item Title:</b> ' + this.name + ' <br><b>Category:</b> ' + this.category +'<br><b>Description:</b><br><i>' + this.description + '</i><br>';                        
                            content += '</p><br><br><br><p class="desc2">Posted By<br><a href="#" data-role="button" data-inline="false" data-user_id="' + this.user_id + '" data-username="' + this.user + '" onclick="otherUsers(this);" data-mini="true">' + this.user + '</a></p></div>';
                            content += '<div class="ui-block-c">';
                            content += '<a href="#comment" id="comment" data-role="button" data-icon="arrow-r" data-iconpos="right" data-mini="true">Comment</a>';
                            content += '</div></div><br><hr color="D0D0D0"><br>';
                        }
                    })
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
                            content += '<div class="ui-block-a"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';

                        }
                    } else if (data.length%3 == 1){
                        for (i = 0; i < (data.length-1); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';
                                           
                        }
                        content += '<div class="ui-block-a"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-1].image_path + '\')"></div></div></div>';

                    } else {
                        for (i = 0; i < (data.length-2); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';
                                           
                        }
                        content += '<div class="ui-block-a"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-2].image_path + '\')"></div></div></div>';
                        content += '<div class="ui-block-b"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-1].image_path + '\')"></div></div></div>';

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
$(document).on('click', '#delete_account', function(){ 
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
                            content += '<div class="ui-block-a"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';

                        }
                    } else if (data.length%3 == 1){
                        for (i = 0; i < (data.length-1); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';
                                           
                        }
                        content += '<div class="ui-block-a"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-1].image_path + '\')"></div></div></div>';

                    } else {
                        for (i = 0; i < (data.length-2); i += 3){
                            content += '<div class="ui-block-a"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-b"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+1].image_path + '\')"></div></div></div>';
                            content += '<div class="ui-block-c"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[i+2].image_path + '\')"></div></div></div>';
                                           
                        }
                        content += '<div class="ui-block-a"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-2].image_path + '\')"></div></div></div>';
                        content += '<div class="ui-block-b"><div class="cropped"><div class="imgcropped" style="background-image: url(\'http://ec2-54-84-193-64.compute-1.amazonaws.com/www/upload/' + data[data.length-1].image_path + '\')"></div></div></div>';

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
        $(document).on('click', '#update_user', function() { 
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


function onDeviceReady() {

    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto,
                                function(message) { alert('get picture failed'); },
                                { quality: 50, 
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType : Camera.PictureSourceType.CAMERA
                            });

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

