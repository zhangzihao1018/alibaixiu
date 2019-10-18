//数据库调用数据展示在页面上
$.ajax({
    type:'get',
    url:'/comments',
    success:function(res){
        console.log(res);
        var html=template('commentsTpl',res);
        $('#commentsBox').html(html);
        var page=template('pageTpl',res);
        $('#page').html(page)
    }
});
//时间格式
function dateFormat(date) {
    var date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};
//分页操作
function changePage(pageNum){
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            page:pageNum
        },
        success:function(res){
            console.log(res);
            var html=template('commentsTpl',res);
            $('#commentsBox').html(html);
            var page=template('pageTpl',res);
            $('#page').html(page)
        }
    });
};
//批准驳回功能
$('#commentsBox').on('click','.status',function(){
    var status=$(this).attr('data-status');
    var id=$(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/comments/'+id,
        data:{
            state:status==1?'0':'1'
        },
        success:function(){
            location.reload()
        }
    })  
});
//实现删除功能
$('#commentsBox').on('click','.delete',function(){
    var id=$(this).attr('data-id');
   if(confirm('您真的确定删除？')){
    $.ajax({
        type:'delete',
        url:'/comments/'+id,
        success:function(){
            location.reload()
        }
    })
   }
})