var ONE_DAY = 1000 * 3600 * 24 ;
var SUNDAY_COLOR = 'rgb(255, 96, 96)' ; // '#aa0000';
var SATURDAY_COLOR = 'rgb(97, 134, 200)';

var current = new Date();

$(document).ready(function(){
    // var today = new Date();
    // renderCalendar(current.getFullYear(), current.getMonth() + 1)
    renderCalendar()

    $(window).resize(function(){
        checkCalendarCellHeight();
    })
});

function clearCalendar(){
    $('.calendar-cell').empty()
}

function renderCalendar(yyyy,mm){
    clearCalendar();
    calendarCellAnimation();

    if ( yyyy == undefined || mm == undefined ){
        yyyy = current.getFullYear(); 
        mm = current.getMonth() + 1;
    }

    var list = getCalendarList ( yyyy,mm ) ; 

    $('#calendar-year').empty().append(yyyy+'년')
    $('#calendar-month').empty().append(mm+'월')

    for ( var i = 0 ; i < 42 ; i ++ ){
        var target = $('#calendar-cell-' + i) ;
        target.css("border","1px solid #999999")
        target.css("border-radius","10px 10px 0px 0px")
        target.css("margin","5px")

        var obj = list[i];

        if ( obj.thisMonth == false ) {
            target.css("opacity","0.3")
        } else {
            target.css("opacity","1")
        }

        var head = $('<div></div>');
        head.css("text-align","center")
        
        if ( obj.day == 0 ){
            head.css("background-color",SUNDAY_COLOR);
        }
    
        else if ( obj.day == 6 ){
            head.css("background-color",SATURDAY_COLOR);
        }

        else {
            head.css("background-color","#555555");
        }

        if ( obj.isToday == true ) {
            head.css("background-color","white")
            head.css("color","black")
        }

        head.append(obj.d);
        target.append(head);

        if ( obj.d >= 30 ) {
            for ( var j = 0 ; j < 10 ; j ++ ){
                var body = $('<div></div>');
                body.addClass('calendar-body-cell')
                target.append(body);
            }
        }

        target.attr("yyyymmdd",obj.yyyyMMdd);
        target.attr("yyyy",obj.yyyy)
        target.attr("dd",obj.dd)
        target.attr("d",obj.d)
        target.attr("day",obj.day)
        target.attr("istoday",obj.isToday)
        target.attr("mm",obj.mm)
        target.attr("m",obj.m)
        target.attr("thismonth",obj.thisMonth)
    } 

    setTimeout(function(){
        checkCalendarCellHeight();    
    },100)
}

/**
 * 일 0 월 1
 */
function getCalendarList(inputYYYY,inputMM){
    var today = new Date();

    inputMM = parseInt(inputMM);
    
    var start = new Date(inputYYYY, inputMM - 1) ; 
    var end = new Date(inputYYYY, inputMM, 0) ; 

    while ( start.getDay() != 0 ) {
        start = new Date(start.valueOf() - ONE_DAY);
    }

    while ( end.getDay() != 6 ){
        end = new Date(end.valueOf() + ONE_DAY);
    }

    var list = [] ;

    // while ( true ) {
    for ( var i = 0 ; i < 42 ; i ++ ) {
        var yyyy = start.getFullYear();
        var mm = start.getMonth() + 1 ; 
        var dd = start.getDate() ; 

        if ( dd < 10 ) {
            dd = '0' + dd ;
        }

        if ( mm < 10 ) {
            mm = '0' + mm 
        }

        yyyy = '' + yyyy ; 
        mm = '' + mm ;
        dd = '' + dd ;
        var m = parseInt(mm);
        var d = parseInt(dd); 

        list.push(
            {
                'yyyyMMdd': yyyy+mm+dd ,
                'yyyy':yyyy,
                'mm':mm ,
                'dd':dd ,
                'd':d,
                'm':m,
                'day':start.getDay(),
                'thisMonth':inputMM == m ? true : false ,
                'isToday':
                    start.getFullYear() == today.getFullYear() &&
                    start.getMonth() == today.getMonth() && 
                    start.getDate() == today.getDate() ? 
                    true : false 
            }
        );

        start = new Date(start.valueOf() + ONE_DAY);

        // if ( start.valueOf() > end.valueOf() ){ break; }
    }

    return list;
}

function today(){
    current = new Date();
    renderCalendar()
}

function nextMonth(){
    current = new Date(current.getFullYear(),current.getMonth()+1)   
    renderCalendar()
}

function prevMonth(){
    current = new Date(current.getFullYear(),current.getMonth()-1)   
    renderCalendar()
    
}

function calendarCellAnimation(){
    $('.calendar-cell').fadeOut(0);
    setTimeout(function(){
        $('.calendar-cell').fadeIn(100);
    },100)
}

function checkCalendarCellHeight(){
    $('.calendar-cell').each(function(){
        var height = $(this).height() 
        if ( height > 30 ) {
            $(this).find('div[class=calendar-cell-hidden-temp]').remove();

            var cells = $(this).find('div');

            var heightSum = 0 ; 
            var cutLine = 0 ;

            for ( var i = 0 ; i < cells.length ; i ++ ) {
                var cell = cells[i];

                heightSum += $(cell).height() ;
                if ( heightSum > height && cutLine == 0 ) {
                    cutLine = i - 1 ;
                }
            }
            
            if ( cutLine > 0 ){
                for ( var i = 0 ; i < cells.length ; i ++ ) {
                    var cell = cells[i];
                    if ( i < cutLine ) {
                        $(cell).css("display","block");
                    } else {
                        $(cell).css("display","none");
                    }
                }

                $(this).append(
                    '<div class="calendar-cell-hidden-temp">&nbsp;+&nbsp;' + 
                    ( cells.length - cutLine ) 
                    + '</div>'
                );
            }
            
        }
    })
}