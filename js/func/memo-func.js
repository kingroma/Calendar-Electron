$(document).ready(function(){

});

function getTree(yyyy,mm){
    var result = null ; 
    var params = '?';
    var searchType = 'Y' ; 

    if ( yyyy != undefined && yyyy != null ) {
        if ( mm == undefined || mm == null ) {
            searchType = 'YM'
            params += ( 'memoYyyy=' + yyyy ) ;
        } else {
            searchType = 'YMD'
            params += ( 'memoYyyy=' + yyyy + '&memoMm=' + mm );
        }
    }

    params += ( '&searchType=' + searchType ) 

    var url = '/memo/distinct' + params ;

    openLoading();

    get(
        url , 
        null , 
        function(data){
            if ( data != undefined && data != null &&
                    data.status != undefined && data.status != null && 
                    data.result != undefined ) {
                console.log(data);
            } 
            // else {
            //     console.error('memoTree get fail',data);
            //     closeLoading();
            // }
        } , 
        function(e){
            console.error(e)
            // alertMessage('get hloiday data error',e);
            closeLoading();
        }
    )

    closeLoading();

    return result ; 
}


