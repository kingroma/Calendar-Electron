var prefixServerUrl = 'http://127.0.0.1:8080/calendar/api'

function get(suffixUrl,data,successCallback,failCallback,alwaysCallback){
    var url = prefixServerUrl + suffixUrl ; 

    $.ajax(
        { 
            type: "GET", 
            url: url, 
            headers: {
                "Authorization":"userToken " + userToken
            },
            data: data, 
            async: false ,
            dataType: 'json' ,
            contentType:'application/json'
        }
    ).done(
        function(json) {
            if ( successCallback != undefined && successCallback != null ) {
                successCallback(json);
            }
        }
    ).fail(
        function(xhr, status, errorThrown) { 
            if ( failCallback != undefined && failCallback != null ) {
                failCallback(errorThrown);
            }
        }
    ).always(
        function(){
            if ( alwaysCallback != undefined && alwaysCallback != null ){
                alwaysCallback()
            }
        }
    )

    
    ;
}

function post(suffixUrl,data,successCallback,failCallback,alwaysCallback){
    var url = prefixServerUrl + suffixUrl ; 

    $.ajax(
        { 
            type: "POST", 
            url: url, 
            headers: {
                "Authorization":"userToken " + userToken
            },
            data: data, 
            async: false ,
            dataType: 'json' ,
            contentType:'application/json'
        }
    ).done(
        function(json) {
            if ( successCallback != undefined && successCallback != null ) {
                successCallback(json);
            }
        }
    ).fail(
        function(xhr, status, errorThrown) { 
            if ( failCallback != undefined && failCallback != null ) {
                failCallback(errorThrown);
            }
        }
    ).always(
        function(){
            if ( alwaysCallback != undefined && alwaysCallback != null ){
                alwaysCallback()
            }
        }
    )

    
    ;
}