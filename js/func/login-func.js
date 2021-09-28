var userSeq = 1000000000 ; 
// userSeq = null ; 
var userToken = 'nMd0vvKG9N41JZBoX44bcllC72vBlN' ; 
// userToken = null ; 

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
    var errorDiv = $('#login-error-div');
    var email = $('#email').val();
    var password= $('#password').val();

    if ( email == undefined || email == null || email == '' ) {
        // alert('email is empty');
        errorDiv.html('email is empty')
        return ; 
    }

    if ( password == undefined || password == null || password == '' ) {
        // alert('password is empty');
        errorDiv.html('password is empty');
        return ; 
    }

    var data = JSON.stringify(
        {
            "userEmail":email , 
            "userPw": password
        }
    )

    $('#login-error-div').html('');
    openLoading();
    post(
        '/user/login',
        data,
        function(data){
            console.log('success',data)
            if ( data != undefined && data != null && 
                data.result != undefined && data.result != null && 
                data.status != undefined && data.status == 200 ){
                // 성공
                var result = data.result ; 
                userSeq = result.userSeq ; 
                userToken = result.userToken ; 
                closeLoginView();

                renderCalendar();
            } else {
                var message = '';
				
				if ( data != undefined && data != null ) {
					if ( data.status != undefined && data.status != null ) {
						if ( data.status == 300 ) {
							message = "아이디 에러";
						} else if ( data.status == 800 ) {
							message = "패스워드 에러"
						}
					} else if ( data.message != undefined && data.message != null){
		            	message += data.message;
		        	}
				}

                if ( message == '' ) {
                    message = 'error'
                }

                errorDiv.html(message);
            }
            closeLoading();
            
        } , 
        function(e){
            // console.log('error',e)
            alertMessage('error','FAIL');
            closeLoading();
        }

    );
    
    
}