var mouseX = 0 ; 
var mouseY = 0 ; 
var windowWidth = 0 ;
var windowHeight = 0 ; 

$(document).ready(function(){
    initUi();
})

function initUi(){
    console.log('initUi')
    $(window).on('mousemove',function(e){
        mouseX = e.pageX ;
        mouseY = e.pageY ;
    });

    $(window).resize(function(){
        windowWidth = $(window).width() ; 
        windowHeight = $(window).height() ;
    })   
}

function changeMenu(num){
    if ( num == 0 ) {
        $('#main-calendar').css("display",'flex')
        $('#main-task').css("display",'none')
        $('#main-memo').css("display",'none')
        $('#main-tree').css("display",'none')
    } else if ( num == 1 ) {
        $('#main-calendar').css("display",'none')
        $('#main-task').css("display",'flex')
        $('#main-memo').css("display",'none')
        $('#main-tree').css("display",'none')
    } else if ( num == 2 ) {
        $('#main-calendar').css("display",'none')
        $('#main-task').css("display",'none')
        $('#main-memo').css("display",'flex')
        $('#main-tree').css("display",'none')
    } else if ( num == 3 ) {
        $('#main-calendar').css("display",'none')
        $('#main-task').css("display",'none')
        $('#main-memo').css("display",'none')
        $('#main-tree').css("display",'flex')
    }
}


function openWhiteBack(){
    // $('#white-back').css("display","block");
    $('#white-back').fadeIn(500);
}

function closeWhiteBack(){
    // $('#white-back').css("display","none");
    $('#white-back').fadeOut(400);
}