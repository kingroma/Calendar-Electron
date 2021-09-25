var taskDivInterval = null ; 

$(document).ready(function(){
    initCalendarUi();
});

function initCalendarUi() {
    console.log('initCalendarUi')
    $(window).on('mouseup',function(){
        stopCalendarUi();
    });

    $('#task-bar').on('mousedown',function(){
        $('html').addClass('no-drag')
        $('html').css("cursor",'e-resize')
        
        startTaskDivClick()
    })

    setDatePicker($('#saveTaskDs'));
}

function stopCalendarUi(){
    $('html').removeClass('no-drag');
    $('html').css("cursor",'default')
    clearInterval(taskDivInterval);
    taskDivInterval = null ; 
}

function startTaskDivClick(){
    if ( taskDivInterval == null ) {
        taskDivInterval = setInterval(function(){
            // var windowWidth = $(window).width();
            var windowWidth = $('body').width();
            var targetX = mouseX ; 
            var width = windowWidth - targetX - 5; 

            // var maxWidth = windowWidth / 3 ; 
            var maxWidth = 333 ; 
            
            if ( 50 < width && width < maxWidth ){
                $('#task-div').css('width',width+'px')
            } else if ( 50 > width ) {
                $('#task-div').css('width',50+'px')
            } else if ( width > maxWidth ){
                $('#task-div').css('width',maxWidth+'px')
            }
        }, 10)
    }
}