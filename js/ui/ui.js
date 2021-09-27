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

function changeMenu(num,event){
    var openMenu = $('.menu-open') ; 
    openMenu.addClass('common-hover');
    openMenu.removeClass('menu-open');

    var target = $(event.target);
    target.addClass('menu-open')
    target.removeClass('common-hover')

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

function openLoading(){
    $('#loading-back').css("display","flex")
}

function closeLoading(){
    $('#loading-back').css("display","none")
}

function setDatePicker(target){
    target.datepicker({
        dateFormat: 'yy-mm-dd' //Input Display Format 변경
        ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
        ,showMonthAfterYear:true //년도 먼저 나오고, 뒤에 월 표시
        ,changeYear: true //콤보박스에서 년 선택 가능
        ,changeMonth: true //콤보박스에서 월 선택 가능                
        // ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시  
        // ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
        ,buttonImageOnly: true //기본 버튼의 회색 부분을 없애고, 이미지만 보이게 함
        ,buttonText: "선택" //버튼에 마우스 갖다 댔을 때 표시되는 텍스트                
        ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
        ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
        ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
        ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
        ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
        // ,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
        // ,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)                
    });
}