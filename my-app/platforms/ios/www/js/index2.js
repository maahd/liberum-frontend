ip = 'ec2-54-84-193-64.compute-1.amazonaws.com/www/';
//ip = '10.26.8.74';
currentUser = "";
//  SIGNUP

$(document).on('pagebeforeshow', '#register', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $(document).on('click', '#submit_signup', function() { 
        // catch the form's submit event
            if($('#username_signup').val().length > 0 && $('#password_signup').val().length > 0){
                // Send data to server through the ajax call
                // action is functionality we want to call and outputJSON is our data

                    $.ajax({url: 'http://' + ip + '/phploginsession/signup.php',

                        //data: {action : 'login', formData : $('#check-user').serialize()},

                        data: {username: $('#username_signup').val(), password: $('#password_signup').val(), id: $('#id').val(), email: $('#email_signup').val()},
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
                alert('Please fill all necessary fields');
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
                            if(data["1"]==$('#username_login').val()) {
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
$(document).on('pagebeforeshow', '#profile', function(){ 
    $('#current_user button').html(currentUser['username']);
});

//POSTING ITEM

$(document).on('pagebeforeshow', '#additem', function(){ 
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $(document).on('click', '#post_submit', function() { 
        // catch the form's submit event
            if($('#post_name').val().length > 0 && $('#post_description').val().length > 0 && $('#post_category').val().length > 0){
                    $.ajax({url: 'http://' + ip + '/upload/upload_file.php',
                        data: {current_user: currentUser['username'], post_name: $('#post_name').val(), post_description: $('#post_description').val(), post_category: $('#post_category').val()},
                        type: 'post',                   
                        async: 'true',

                                                dataType: 'text',
                        beforeSend: function() {
                         },
                        complete: function() {
                            
                        },
                        success: function (data, textStatus, xhr) {
                            // navigator.camera.getPicture(uploadPhoto,
                            //                             function(message) { alert('get picture failed'); },
                            //                             { quality: 50, 
                            //                             destinationType: navigator.camera.DestinationType.FILE_URI,
                            //                             }
                            //                             );
                            alert("Post submitted")
                        },
                        error: function (xhr, status, error) {
                            alert(status);
                        }
                    });   

            } else {
                alert('Please fill all necessary fields');
            }           
            return false; // cancel original event to prevent form submitting
        });    
});

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
            data: {},
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
                        //content += '<div><a href="#" data-role="button" data-inline="true" data-mini="true">avatar </a>';
                        content += '<a href="#" data-role="button" data-inline="true" data-mini="true">' + this.user + '</a>';
                        content += '<center>';
                        content += '<img src="img/bag.jpeg" width="100%" alt="">';
                        content += '</center>';
                        content += '<a href="#basic" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Item Title</a>';
                        content += '<div class="ui-grid-b">';
                        content += '<div class="ui-block-a">';
                        content += '<div data-role="popup" id="basic">';
                        content += 'I bought this item last month and have found no use for it, if anyone wants it please click on "want" and I will get back to you.';
                        content += '</div>';
                        content += '</div>';
                        content += '<div class="ui-block-b"></div>'; 
                        content += '<div class="ui-block-c">';
                        content += '<div data-role="controlgroup" data-type="horizontal" align="right">';
                        content += ' <a href="mailto:rmarri@qatar.cmu.edu?subject=Liberum&body=Hello, I am interested in the item you displayed on Liberum!" data-role="button" data-icon="check" data-inline="true" data-mini="true">Want</a>';
                        content += '<a href="#comment" data-role="button" data-icon="arrow-r" data-iconpos="right" data-inline="true" data-mini="true">Comment</a> </div>';
                        content += '<br></div><hr><br>';                   

                    //     content +='
                    //       <div>
                    //       <a href="#" data-role="button" data-inline="true" data-mini="true">avatar</a>
                    //       <a href="#" data-role="button" data-inline="true" data-mini="true">' + this.user + '</a>
                    //       <center>
                    //       <img src="img/bag.jpeg" width="100%" alt="">
                    //     </center>
                    //       <div data-role="controlgroup" data-type="horizontal" align="right">
                    //       <a href="mailto:rmarri@qatar.cmu.edu?subject=Liberum&body=Hello, I am interested in the item you displayed on Liberum!" data-role="button" data-icon="check" data-inline="true" data-mini="true">Want</a>
                    //       <a href="#comment" data-role="button" data-icon="arrow-r" data-iconpos="right" data-inline="true" data-mini="true">Comment</a> </div>
                    //       <br>
                    //       </div> 
                    //       ';

                        
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

function onDeviceReady() {

    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto,
                                function(message) { alert('get picture failed'); },
                                { quality: 50, 
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType : Camera.PictureSourceType.CAMERA
                            });

}

function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    alert("uploaded");

    var ft = new FileTransfer();

    ft.upload(imageURI, encodeURI("http://" + ip + "/upload/upload_file.php"), win, fail, options);

}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
