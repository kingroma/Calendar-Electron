var taskDivInterval = null ; 

$(document).ready(function(){
    initCalendarUi();
});

function initCalendarUi() {
    $(window).on('mouseup',function(){
        stopCalendarUi();
        $('#task-list-info-menu').css('display',"none");
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
            var maxWidth = 400 ; 
            var minWidth = 150 ;
            
            if ( minWidth < width && width < maxWidth ){
                $('#task-div').css('width',width+'px')
            } else if ( minWidth > width ) {
                $('#task-div').css('width',minWidth+'px')
            } else if ( width > maxWidth ){
                $('#task-div').css('width',maxWidth+'px')
            }
        }, 10)
    }
}