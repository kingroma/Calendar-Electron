var ONE_DAY = 1000 * 3600 * 24 ;
var SUNDAY_COLOR = 'rgb(255, 96, 96)' ; // '#aa0000';
var SATURDAY_COLOR = 'rgb(97, 134, 200)';

var holidayMap = new Map();
var current = new Date();

var clickYyyy = null ; 
var clickMm = null ; 
var clickDd = null ; 

var currentUserTasks = null ; 
var currentTaskObj = null ; 
var currentTaskSeqObj = new Map(); 

$(document).ready(function(){
    // var today = new Date();
    // renderCalendar(current.getFullYear(), current.getMonth() + 1)
    renderCalendar()

    $(window).resize(function(){
        checkCalendarCellHeight();
        $('#task-list-info-menu').css('display',"none");
    })

    $('#task-list').on('contextmenu', function(event) {
        
        var target = $(event.target);
        
        if ( target.hasClass('task-list-item-task-name') == true ) {
            var taskSeq = target.attr("taskSeq") ; 

            var obj = currentTaskSeqObj.get(parseInt(taskSeq));
            $('#task-list-info-menu').css('left',event.pageX);
            $('#task-list-info-menu').css('top',event.pageY);

            $('#task-list-info-menu').css('display','block')
            $('#task-list-info-menu').css('z-index','100')

            currentTaskObj = obj ; 
        }

        return false;
    });
});

function clearCalendar(){
    $('.calendar-cell').empty()
}

function renderCalendar(yyyy,mm){
    openLoading();
    clearCalendar();
    calendarCellAnimation();

    if ( yyyy == undefined || mm == undefined ){
        yyyy = current.getFullYear(); 
        mm = current.getMonth() + 1;
    }

    getHolidayYyyy(yyyy);

    var list = getCalendarList ( yyyy,mm ) ; 
    var userTasks = getUserTaskYyyyMm(yyyy,mm);
    currentUserTasks = userTasks ; 
    
    // if ( userTasks != null && userTasks.size > 0 ) {
    //     console.log(yyyy,mm,userTasks);
    // }
    
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
        
        var calendaCellHeadTaskCount = $('<div></div>')
        calendaCellHeadTaskCount.css("position","absolute")
        calendaCellHeadTaskCount.attr("id","calendar-cell-head-task-count-"+obj.yyyyMMdd)
        calendaCellHeadTaskCount.css('padding-left',"3px");
        
        head.append(calendaCellHeadTaskCount)

        if ( obj.day == 0 ){
            head.css("background-color",SUNDAY_COLOR);
        }
    
        else if ( obj.day == 6 ){
            head.css("background-color",SATURDAY_COLOR);
        }

        else {
            head.css("background-color","#555555");
        }

        if ( holiday != undefined && holiday != null ){
            head.css("background-color",SUNDAY_COLOR);
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
        body.addClass('calendar-cell-body')
        body.attr('id','calendar-cell-body-' + obj.yyyyMMdd)
        body.attr('yyyymmdd',obj.yyyyMMdd);
        // console.log('userTasks',userTasks.get(obj.yyyyMMdd));
        
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
        calendarCellBodySetting();
    },100)

    clearTasks();
    closeLoading();
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

function checkCalendarCellHeight(inputYyyymmdd){
    $('.calendar-cell').each(function(){
        var height = $(this).height() 

        $(this).find('div[class=calendar-cell-hidden-temp]').remove();

        var cells = $(this).children();
        var yyyymmdd = cells.attr('yyyymmdd');
        var isTarget = true ; 

        if ( inputYyyymmdd == undefined || inputYyyymmdd == null ) {

        } else if ( inputYyyymmdd != yyyymmdd ) {
            isTarget = false ; 
        }

        for ( var i = 0 ; i < cells.length ; i ++ ) {
            var cell = cells[i];
            $(cell).css("display","block");
        }
        
        if ( false && isTarget && height > 30 ) {    
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

                                holidayMap.set(yyyy,{})
                            }
                        }
                    }
                } , 
                function(e){
                    console.error(e)
                    // alertMessage('get hloiday data error',e);
                    closeLoading();
                }
            )
            closeLoading();
        }
    }
    
}

function openCalendarAddModal(){
    var yyyy = clickYyyy ; 
    var mm = clickMm ; 
    var dd = clickDd ; 

    var yyyymmdd = '' ; 

    if ( yyyy != null && mm != null && dd != null ) {
        yyyymmdd = yyyy + '-' + mm + '-' + dd ;
    }

    $('#saveTaskDs').val(yyyymmdd);
    $('#saveTaskName').val('');
    $('#saveTaskText').val('');
    $('#saveTaskSeq').val('');
    $('#saveTaskBgc').val('#ffffff')
    $('#saveTaskBgcText').val('#ffffff')

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
    
    if ( clickYyyy == yyyy && clickMm == mm && clickDd == dd ) {

    } else {
        clearTasks();

        clickYyyy = yyyy ; 
        clickMm = mm ; 
        clickDd = dd ; 
    
        $('#task-head-info').css("display","none")
        $('#task-head-info').html(yyyy + '-' + mm + '-' + dd )
        $('#task-head-info').fadeIn(200)

        taskListSetting();
    }
    
    event.preventDefault();
    event.stopPropagation();
}

function clickTask(d,event){

    event.preventDefault();
    event.stopPropagation();
}

function taskSaveUI() {
    var check = /20[0-9][0-9]-[0-9][0-9]-[0-9][0-9]/ ; 

    var saveTaskSeq = $('#saveTaskSeq').val() ;
    var saveTaskDs = $('#saveTaskDs').val();
    var saveTaskName = $('#saveTaskName').val();
    var saveTaskText = $('#saveTaskText').val();
    var saveTaskBgc = $('#saveTaskBgc').val();

    if ( saveTaskDs == undefined || saveTaskDs == null || 
        saveTaskDs.length != 10 || saveTaskDs.match(check) == null ) {
        alertMessage('is not valid begin','FAIL')
        return ; 
    }

    if ( saveTaskName == undefined || saveTaskName == null ||
        saveTaskName == '' ) {
        alertMessage('is not valid title','FAIL')
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
            "taskText":saveTaskText,
            "taskBgc":saveTaskBgc
        }
    ) 

    openLoading();
    
    // var bodyTarget = $('#calendar-cell-body-' + saveTaskDs );
    // bodyTarget.append('<div>asdf</div>')
    // addTaskAfter(saveTaskDs);

    post(
        '/calendar/user/task/save',
        data,
        function(data){
            if ( data != undefined && data != null && 
                data.result != undefined && data.result != null && 
                data.status != undefined && data.status == 200 ){
                // 성공
                var result = data.result ; 
                alertMessage('저장하였습니다','SUCC');
                if ( saveTaskSeq == null ) {
                    $('#task-list').append(taskListSettingItem(result));
                    // autosize($('.task-list-item-detail-textarea'));
                } else {
                    changeTaskListItem(result);
                }
                currentUserTasks = getUserTaskYyyyMm(clickYyyy,clickMm)
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

                alertMessage(message,'FAIL');
            }
            closeLoading();
        } , 
        function(e){
            alertMessage('add task error','FAIL');
            closeCalendarAddModal();
            closeLoading();
        }
    )
    calendarCellBodySetting(saveTaskDs);

    var tempYyyymmdd = clickYyyy + '' + '' + clickMm + '' + clickDd  ; 
    if ( saveTaskDs != tempYyyymmdd ) {
        $('#task-list-item-'+saveTaskSeq).fadeOut(300);
        calendarCellBodySetting(tempYyyymmdd);
    }
}

function getUserTaskYyyyMm(yyyy,mm){
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
                    
                    var map = new Map();
                    
                    for ( var i = 0 ; i < data.result.length ; i ++ ) {
                        var obj = data.result[i];

                        var list = map.get(obj.taskDs);

                        if ( list == undefined || list == null ) {
                            list = [] ; 
                        }

                        list.push(obj);
                        map.set(obj.taskDs,list);
                        currentTaskSeqObj.set(obj.taskSeq,obj);
                    }
                    result = map ; 
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

function clearTasks(){
    $('#task-head-info').html('')
    $('#task-list').empty();

    clickYyyy = null ; 
    clickMm = null ; 
    clickDd = null ; 
}

function taskListSetting() {
    var yyyy = clickYyyy ; 
    var mm = clickMm ; 
    var dd = clickDd ; 

    if ( currentUserTasks != null ) {
        var tasks = currentUserTasks.get(yyyy+''+mm+''+dd);
        var target = $('#task-list');
        if ( tasks != undefined && tasks != null ) {
            for ( var i = 0 ; i < tasks.length ; i ++ ) {
                var obj = tasks[i] ; 

                // mix-blend-mode: difference;
                target.append(taskListSettingItem(obj))
                currentTaskSeqObj.set(obj.taskSeq,obj)
                // autosize($('.task-list-item-detail-textarea'));
            }
        } 
    }   
}

function taskListSettingItem(obj){
    var backgroundColor = obj.taskBgc ; 
    if ( backgroundColor == undefined || backgroundColor == null || backgroundColor == '') {
        backgroundColor = '#ffffff';
    }
    
    var root = $('<div></div>');
    root.attr('id','task-list-item-' + obj.taskSeq);

    var taskItem = $('<div></div>');
    taskItem.addClass('flex-display')

    var divTaskName = $('<div></div>');
    divTaskName.addClass('flex-1')
    divTaskName.addClass('ellipsis')
    divTaskName.addClass('task-list-item-task-name');
    divTaskName.append(obj.taskName)
    divTaskName.attr('id','task-list-item-task-name-' + obj.taskSeq);
    divTaskName.attr('taskseq',obj.taskSeq);
    divTaskName.css("margin","5px");
    divTaskName.css("margin-right","10px")
    divTaskName.css("background-color",backgroundColor)
    divTaskName.css('mix-blend-mode','difference')
    divTaskName.css('color',invertColor2(backgroundColor))
    divTaskName.css('border-radius','5px')
    divTaskName.css('padding','3px')
    divTaskName.css("margin-top","8px");

    // divTaskName.attr('onclick','taskListItemClick(\''+JSON.stringify(obj)+'\')');
    divTaskName.click('on',function(event){
        // taskListItemClick(\''+JSON.stringify(obj)+'\')
        taskListItemClick(obj)
    })

    taskItem.append(divTaskName)
    
    var divtaskFinish = $('<div></div>')
    if ( obj.taskFinish == false || obj.taskFinish == undefined || obj.taskFinish == null ) {
        divtaskFinish.append('<img src="./assets/square.png" width="25px" height="25px" style="vertical-align:text-top;background-color:#777777;padding:5px;border-radius:10px;"/>')
    } else {
        divtaskFinish.append('<img src="./assets/check.png" width="25px" height="25px" style="vertical-align:text-top;background-color:inherit;padding:5px;border-radius:10px;"/>')
    }
    divtaskFinish.css("margin","5px");
    divtaskFinish.css('padding','3px')
    divtaskFinish.css("margin-bottom","0px");
    divtaskFinish.on('click',function(event){
        taskFinishClick(obj,this,event);
    })
    taskItem.append(divtaskFinish);

    var taskShow = $('<div></div>');
    if ( obj.taskShow == false || obj.taskShow == undefined || obj.taskShow == null ) {
        taskShow.append('<img src="./assets/star_empty.png" width="25px" height="25px" style="vertical-align:text-top;background-color:#777777;padding:5px;border-radius:10px;"/>')
    } else {
        taskShow.append('<img src="./assets/star.png" width="25px" height="25px" style="vertical-align:text-top;background-color:inherit;padding:5px;border-radius:10px;"/>')
    }
    taskShow.css("margin","5px");
    taskShow.css('padding','3px')
    taskShow.css("margin-bottom","0px");
    taskShow.on('click',function(event){
        taskShowClick(obj,this,event);
    })
    taskItem.append(taskShow)
    

    root.append(taskItem)

    var divTaskDetail = $('<div></div>');

    var divTaskDetailHead = $('<div></div>');

    // divTaskDetailHead.css("position","absolute");
    divTaskDetailHead.css("text-align","right")

    // var divTaskDetailSaveButtonA = $('<a></a>');
    // divTaskDetailSaveButtonA.addClass('pointer common-hover no-drag');
    // divTaskDetailSaveButtonA.append('update')
    // divTaskDetailSaveButtonA.attr("onclick","taskListItemUpdateClick()")
    // divTaskDetailSaveButtonA.css("padding","5px");
    // divTaskDetailSaveButtonA.css("margin","5px");
    // divTaskDetailSaveButtonA.css("border-radius","10px")

    // divTaskDetailHead.append(divTaskDetailSaveButtonA);

    divTaskDetail.append(divTaskDetailHead);

    var divTaskDetailText = obj.taskText ;
    
    if ( divTaskDetailText == undefined || divTaskDetailText == null || divTaskDetailText == '' ) {
        // divTaskDetailText = "EMPTY"
    }

    divTaskDetail.attr("id","task-list-item-info-"+obj.taskSeq)
    divTaskDetail.addClass("task-list-item-info");
    // divTaskDetail.append(divTaskDetailText)
    divTaskDetail.css("padding","5px");
    divTaskDetail.css("display","none")

    var divTaskDetailTextDiv = $('<div></div>');
    divTaskDetailTextDiv.append(
        '<div style="width:100%;color:white" id="task-list-item-task-text-' + obj.taskSeq + '" class="task-list-item-detail-textarea" readonly="readonly" >' + 
        divTaskDetailText.replaceAll('\n','<br />') + 
        '</div>'
    );
    divTaskDetailTextDiv.css("border","1px solid #666666");
    divTaskDetailTextDiv.css("border-radius","5px");
    divTaskDetailTextDiv.css("margin-top","3px");
    divTaskDetailTextDiv.css("padding","5px")

    divTaskDetail.append(divTaskDetailTextDiv);

    root.append(divTaskDetail)
    root.css('display',"none");
    root.fadeIn(500);

    return root ; 
}

function taskListItemClick(obj){
    if ( obj == undefined || obj == null ) {

    } else { 
        // obj = JSON.parse(obj);
        if ( $('#task-list-item-info-'+obj.taskSeq).css("display") == "none" ) {
            currentTaskObj = obj ; 

            $('.task-list-item-info').slideUp(100);
            $('#task-list-item-info-'+obj.taskSeq).slideDown(100);
            // autosize($('.task-list-item-detail-textarea'));
        } else if ($('#task-list-item-info-'+obj.taskSeq).css("display") == "block") {
            $('#task-list-item-info-'+obj.taskSeq).slideUp(100);
        }
    } 
    
}

function taskListItemUpdateClick(){
    $('#task-list-info-menu').css('display',"none")
    var obj = currentTaskObj ; 

    $('#saveTaskDs').val(
        obj.taskDs.substr(0,4) + '-' + 
        obj.taskDs.substr(4,2) + '-' + 
        obj.taskDs.substr(6,2)
    );

    $('#saveTaskName').val(obj.taskName);
    $('#saveTaskText').val(obj.taskText);
    $('#saveTaskSeq').val(obj.taskSeq);
    $('#saveTaskBgc').val(obj.taskBgc)
    $('#saveTaskBgcText').val(obj.taskBgc)

    $('#calendar-add-modal').slideDown(300);
}


function changeTaskListItem(obj){
    // task-list-item-task-text-    
    // task-list-item-task-name-
    var divTaskName = $('#task-list-item-task-name-' + obj.taskSeq);
    var backgroundColor = obj.taskBgc ; 
    if ( backgroundColor == undefined || backgroundColor == null || backgroundColor == '') {
        backgroundColor = '#ffffff';
    }
    divTaskName.css("background-color",backgroundColor)
    divTaskName.css('mix-blend-mode','difference')
    divTaskName.css('color',invertColor2(backgroundColor))
    divTaskName.empty();
    divTaskName.append(obj.taskName)

    var divTaskText = $('#task-list-item-task-text-' + obj.taskSeq); 
    divTaskText.empty();
    divTaskText.append(obj.taskText.replaceAll('\n','<br />'));
}

function taskListItemDeleteClick(){
    var obj = currentTaskObj; 

    if ( obj != undefined && obj != null ) { 
        openLoading();

        var data = JSON.stringify(obj);

        post(
            '/calendar/user/task/delete',
            data,
            function(data){
                if ( data != undefined && data != null && 
                    data.result != undefined && data.result != null && 
                    data.status != undefined && data.status == 200 ){
                    // 성공
                    var result = data.result ; 
                    // console.log(result);
                    $('#task-list-item-'+result.taskSeq).fadeOut(300);
                    currentUserTasks = getUserTaskYyyyMm(clickYyyy,clickMm)
                    calendarCellBodySetting(clickYyyy + '' + clickMm + '' + clickDd);
                    alertMessage('삭제완료','SUCC')
                } else {
                    var message = '';
                    
                    if ( data != undefined && data != null ) {
                        if ( data.message != undefined && data.message != null){
                            message += data.message;
                        }
                    }
    
                    if ( message == '' ) {
                        message = 'delete task error'
                    }
    
                    alertMessage(message,'FAIL');
                }
                closeLoading();
            } , 
            function(e){
                alertMessage('delete task error','FAIL');
                closeLoading();
            }
        )

        closeLoading();
    }
}

function calendarCellBodySetting(intputYyyymmdd){
    var calendarCellBodies = $('.calendar-cell-body'); 

    var targets = [] ; 

    for ( var i = 0 ; i < calendarCellBodies.length ; i ++) {
        var body = $(calendarCellBodies[i]);
        var yyyymmdd = body.attr('yyyymmdd');

        if ( intputYyyymmdd == undefined || intputYyyymmdd == null ) {
            targets.push(body);
        } else if ( intputYyyymmdd == yyyymmdd ) {
            targets.push(body);
        }      
    }

    for ( var i = 0 ; i < targets.length ; i ++) {
        var body = $(targets[i]);
        var yyyymmdd = body.attr('yyyymmdd');
        body.empty();

        var userTasks = currentUserTasks.get(yyyymmdd);
        var calendarCellHeadTaskCount =  $('#calendar-cell-head-task-count-'+yyyymmdd);
        calendarCellHeadTaskCount.empty();
        
        if ( userTasks != undefined && userTasks != null && userTasks.length > 0 ) {
            calendarCellHeadTaskCount.append(
                '<span style="font-size:1.2em">' + userTasks.length + '</span>');
            calendarCellHeadTaskCount.append(
                '<img width="20px" height="20px" src="./assets/task_head_count.png" style="vertical-align:text-top"/>'
                )
            calendarCellHeadTaskCount.css("margin-top",'-3px')
            calendarCellHeadTaskCount.css("padding-left",'4px')
            calendarCellHeadTaskCount.css("color",'white')

            for ( var j = 0 ; j < userTasks.length ; j ++ ){
                var userTask = userTasks[j]

                if ( true == userTask.taskShow ){
                    var div = $('<div></div>')
                    div.css('background-color',userTask.taskBgc);
                    div.css('color',invertColor2(userTask.taskBgc))
                    div.css('padding',"1px")
                    div.css('margin-bottom',"3px")
                    div.css('border-radius','1px')
                    div.append(userTask.taskName)
                    body.append(div)
                }
                
                checkCalendarCellHeight(userTask.taskDs)
            }
        }
        
    }
}

function taskShowClick(obj,div,event){
    obj = currentTaskSeqObj.get(obj.taskSeq);
    var div = $(div);
    var img = div.find('img');
    var taskShow = obj.taskShow ;

    if ( taskShow == undefined || taskShow == null || taskShow == false ) {
        img.attr('src','./assets/star.png')    
        img.css('background-color','inherit')    
        taskShow = true ; 
    } else {
        img.attr('src','./assets/star_empty.png')    
        img.css('background-color','#777777')    
        taskShow = false ; 
    }

    var data = JSON.stringify(
        {
            "taskSeq":obj.taskSeq ,
            "taskShow":taskShow
        }
    );

    post(
        '/calendar/user/task/save',
        data 
    )
    
    currentUserTasks = getUserTaskYyyyMm(clickYyyy,clickMm) ; 
    calendarCellBodySetting(obj.taskDs);
}

function taskFinishClick(obj,div,event){
    obj = currentTaskSeqObj.get(obj.taskSeq);
    var div = $(div);
    var img = div.find('img');
    var taskFinish = obj.taskFinish ; 
    
    if ( taskFinish == undefined || taskFinish == null || taskFinish == false ) {
        img.attr('src','./assets/check.png')    
        img.css('background-color','inherit')    
        taskFinish = true ; 
    } else {
        img.attr('src','./assets/square.png')    
        img.css('background-color','#777777')    
        taskFinish = false ; 
    }

    var data = JSON.stringify(
        {
            "taskSeq":obj.taskSeq ,
            "taskFinish":taskFinish
        }
    );

    post(
        '/calendar/user/task/save',
        data 
    )

    currentUserTasks = getUserTaskYyyyMm(clickYyyy,clickMm) ; 
    calendarCellBodySetting(obj.taskDs);
}