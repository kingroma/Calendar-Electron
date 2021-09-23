var userSeq = null ; 
var userToken = null ; 

$(document).ready(function(){
    initLoginFunc();
})

function initLoginFunc(){
    console.log("initLoginFunc")
    if ( userSeq == null || userToken == null ) {
        openLoginView();
    }
}

function openLoginView(){
    openWhiteBack();
    // $('#login-div').css("display","flex")
    $('#login-div').fadeIn(500)
}

function closeLoginView(){
    closeWhiteBack();
    // $('#login-div').css("display","flex")
    $('#login-div').fadeOut(500)
}

function login(){
    var email = $('#email').val();
    var password= $('#password').val();

    if ( email == undefined || email == null || email == '' ) {
        alert('email is empty');
        return ; 
    }

    if ( password == undefined || password == null || password == '' ) {
        alert('password is empty');
        return ; 
    }

    var data = JSON.stringify(
        {
            "userEmail":email , 
            "userPw": password
        }
    )

    $('#login-error-div').html('');

    post(
        '/user/login',
        data,
        function(data){
            console.log('success',data)
            if ( data != undefined && data != null && 
                data.result != undefined && data.result != null && 
                data.status != undefined && data.status == 200 ){

            } else {
                var message = '';

                if ( data != undefined && data != null && 
                    data.message != undefined && data.message != null){
                        message += data.message;
                }

                if ( message == '' ) {
                    message = 'error'
                }

                $('#login-error-div').html(message);
            }
            
        } , 
        function(e){
            // console.log('error',e)
            alert('error',e);
        }

    );
    
}