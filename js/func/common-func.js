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

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

function invertColor2(hex){
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }

    var r = parseInt(hex.slice(0, 2), 16);
    var g = parseInt(hex.slice(2, 4), 16);
    var b = parseInt(hex.slice(4, 6), 16);
    
    var result = null ; 

    if ( r > 200 && g > 200 && b > 200 ) {
        result = '#000000'
    } else {
        result = '#ffffff'
    }

    return result ; 
}

var messageSeqStatic = 0 ; 

function alertMessage(str,method){
    if ( method == undefined || method == null ) {
        method = "INFO";
    }
    messageSeqStatic += 1 ;
    var messageSeq = messageSeqStatic ; 

    method = method.toUpperCase();
    
    var target = $('#message-div');
    var id = 'message-div-item-' + messageSeq ; 

    var div = $('<div></div>')
    div.attr('id',id);
    div.css('width',"200px");
    div.css('display',"none");
    div.css('border-radius','10px 0px 0px 10px')
    div.css('padding','10px')
    div.css('margin-top','10px')
    div.css('border','1px solid #ffffff')
    
    var img = '' ;

    if ( method == "INFO" ){
        img = '<img src="./assets/info.png" width="25px" height="25px" style="margin:3px;margin-right:10px;"/>'
        div.css('background-color','rgb(71, 158, 185)')    
    } else if ( method == "SUCC" ){
        img = '<img src="./assets/check_2.png" width="25px" height="25px" style="margin:3px;margin-right:10px;"/>'
        div.css('background-color','rgb(87, 162, 113)')    
    } else if ( method == "FAIL" ) {
        img = '<img src="./assets/fail.png" width="25px" height="25px" style="margin:3px;margin-right:10px;"/>'
        div.css('background-color','rgb(191, 100, 100)')    
    } 

    div.append(img);
    div.append(str);

    target.prepend(div);

    var item = $('#'+id);
    setTimeout(function(){
        item.slideDown(600)
    },100)
    
    setTimeout(function(){
        item.fadeOut(3000)
    },3000)
    setTimeout(function(){
        item.remove()
    },10000)
}

function confirmMessage(str){
    var result = false ; 

    if ( dialog == undefined || dialog == null ) {
        result = confirm(str);
    } else {
        dialog.showMessageBox(str, optionsMessage).then(function(res){
            if(res.response == 1){
                result = true ; 
            } else {
                result = false ;
            }
        });
    }
    
    return result ; 
}