var ONE_DAY = 1000 * 3600 * 24 ;
var SUNDAY_COLOR = 'rgb(255, 96, 96)' ; // '#aa0000';
var SATURDAY_COLOR = 'rgb(97, 134, 200)';

var holidayMap = new Map();
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

    getHolidayYyyy(yyyy);

    var list = getCalendarList ( yyyy,mm ) ; 
    var userTasks = getUserTaskYyyyMm(yyyy,mm);

    $('#calendar-year').empty().append(yyyy+'년')
    $('#calendar-month').empty().append(mm+'월')

    for ( var i = 0 ; i < 42 ; i ++ ){
        var target = $('#calendar-cell-' + i) ;
        target.css("border","1px solid #999999")
        target.css("border-radius","10px 10px 0px 0px")
        target.css("margin","5px")

        var obj = list[i];
        var holiday = holidayMap.get(obj.yyyyMMdd) ;

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

        else if ( holiday != undefined && holiday != null ){
            head.css("background-color",SUNDAY_COLOR);
        }

        else {
            head.css("background-color","#555555");
        }

        if ( obj.isToday == true ) {
            head.css("border-bottom","3px solid white")
            head.css("color","#abcdef")
        }

        head.append(obj.d);

        if ( holiday != undefined && holiday != null ) {
            head.append("&nbsp;&nbsp;<b>" + holiday.holidayName + "</b>")
        }

        target.append(head);

        // body 
        var body = $('<div></div>');
        // body.attr('id','calendar-cell-body-' + obj.yyyyMMdd)
        
        // clickTask

        target.append(body);

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

        $(this).find('div[class=calendar-cell-hidden-temp]').remove();

        var cells = $(this).children();
        for ( var i = 0 ; i < cells.length ; i ++ ) {
            var cell = cells[i];
            $(cell).css("display","block");
        }

        if ( height > 30 ) {
            // $(this).find('div[class=calendar-cell-hidden-temp]').remove();
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
            
            console.log(heightSum)
            if ( cutLine > 0 ){
                console.log(cutLine)
                for ( var i = 0 ; i < cells.length ; i ++ ) {
                    console.log(i,cutLine);
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
        } else {
            // var cells = $(this).find('div');
            for ( var i = 0 ; i < cells.length ; i ++ ) {
                var cell = cells[i];
                $(cell).css("display","block");
            }
        } 
    })
}

function getHolidayYyyy(yyyy){
    yyyy = '' + yyyy ; 
    
    var url ='/calendar/holiday/search/' + yyyy + '/list'
    if ( yyyy == undefined || yyyy == null || yyyy.length != 4 ) {
        console.error("yyyy is not valid")
        return ; 
    } else {
        if ( holidayMap.get(yyyy) != null && holidayMap.get(yyyy) != undefined ) {
            return ; 
        } else {
            openLoading();
            get(
                url,
                null,
                function(data){
                    if ( data != undefined && data != null ) {
                        if ( data.status != undefined && data.status != null ) {
                            if ( data.status == 200 && data.result != undefined && data.result != null ) {
                                
                                for ( var i = 0 ; i < data.result.length ; i ++ ) {
                                    var result = data.result[i] ; 
                                    // console.log(result);
                                    var yyyymmdd = result.holidayDs.substr(0,8);
                                    var holidaySeq = result.holidaySeq ; 
                                    var holidayName = result.holidayName ; 
                                    holidayMap.set(
                                        yyyymmdd,
                                        {
                                            "holidaySeq":holidaySeq,
                                            "holidayName":holidayName
                                        }
                                    )
                                }
                            }
                        }
                    }
                } , 
                function(e){
                    console.error(e)
                    // alert('get hloiday data error',e);
                    closeLoading();
                }
            )
            closeLoading();
        }
    }
    
}

function openCalendarAddModal(){
    $('#calendar-add-modal').slideDown(300);
}

function closeCalendarAddModal(){
    $('#calendar-add-modal').slideUp(300);
}

function clickCellEvent(target,event){
    target = $(target);

    var yyyy = target.attr('yyyy');
    var mm = target.attr('mm');
    var dd = target.attr('dd');
    
    
    $('#saveTaskDs').val(yyyy + '-' + mm + '-' + dd);
    $('#saveTaskName').val('');
    $('#saveTaskText').val('');
    $('#saveTaskSeq').val('');

    openCalendarAddModal();

    event.preventDefault();
    event.stopPropagation();
}

function clickTask(d,event){
    console.log('body')

    event.preventDefault();
    event.stopPropagation();
}

function taskSaveUI() {
    var check = /20[0-9][0-9]-[0-9][0-9]-[0-9][0-9]/ ; 

    var saveTaskSeq = $('#saveTaskSeq').val() ;
    var saveTaskDs = $('#saveTaskDs').val();
    var saveTaskName = $('#saveTaskName').val();
    var saveTaskText = $('#saveTaskText').val();

    if ( saveTaskDs == undefined || saveTaskDs == null || 
        saveTaskDs.length != 10 || saveTaskDs.match(check) == null ) {
        alert('is not valid begin')
        return ; 
    }

    if ( saveTaskName == undefined || saveTaskName == null ||
        saveTaskName == '' ) {
        alert('is not valid title')
        return ; 
    }

    if ( saveTaskText == undefined || saveTaskText == null ) {
        saveTaskText = '' ;
    }

    if ( saveTaskSeq == undefined || saveTaskSeq == null || saveTaskSeq == '' ) {
        saveTaskSeq = null ; 
    }

    saveTaskDs = saveTaskDs.replaceAll('-','') ; 

    var data = JSON.stringify(
        {
            "taskSeq":saveTaskSeq,
            "taskDs":saveTaskDs,
            "taskName":saveTaskName,
            "taskText":saveTaskText
        }
    ) 

    console.log(data);

    openLoading();
    
    // var bodyTarget = $('#calendar-cell-body-' + saveTaskDs );
    // bodyTarget.append('<div>asdf</div>')
    addTaskAfter(saveTaskDs);

    post(
        '/calendar/user/task/save',
        data,
        function(data){
            console.log('success',data)
            if ( data != undefined && data != null && 
                data.result != undefined && data.result != null && 
                data.status != undefined && data.status == 200 ){
                // 성공
                var result = data.result ; 
                alert('저장하였습니다');
                closeCalendarAddModal();
            } else {
                var message = '';
				
				if ( data != undefined && data != null ) {
					if ( data.message != undefined && data.message != null){
		            	message += data.message;
		        	}
				}

                if ( message == '' ) {
                    message = 'add task error'
                }

                alert(message);
            }
            closeLoading();
        } , 
        function(e){
            // console.log('error',e)
            alert('add task error',e);
            closeCalendarAddModal();
            closeLoading();
        }
    )
}

function getUserTaskYyyyMm(yyyy,mm){
    console.log(yyyy,mm)
    var result = null ; 

    if ( yyyy == undefined || yyyy == null ) {
        
    } else if ( mm == undefined || mm == null ) {
        
    } else if ( userToken == null ) {

    } else {
        yyyy = '' + yyyy;
        mm = '' + mm ; 
        
        if ( mm.length == 1 ) {
            mm = '0' + mm;
        }

        var url = '/calendar/user/task/search/' + yyyy + '/' + mm + '/list';

        get(
            url,
            null , 
            function(data){
                if ( data != null && data != undefined && 
                    data.result != null && data.result != undefined && 
                    data.status != null && data.status == 200 ) {
                    
                    var list = data.result ; 
                    result = data.result ; 
                }
            } 
        )
    }

    return result ; 

}

function addTaskAfter(ds){
    var target = null ; 

    var list = $('.calendar-cell');

    if ( list != null && list.length > 0 ) {
        for ( var i = 0 ; i < list.length ; i ++ ) {
            var obj = $(list[i]) ; 

            var yyyymmdd = obj.attr('yyyymmdd');
            if ( yyyymmdd == ds ){
                target = obj ; 
            }
        }
    }

    if ( target != null ) {
        target.append('<div>' + ds + '</div>')
    }
}