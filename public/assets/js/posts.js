$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        console.log(res);
        var html = template('postsTpl', res);
        $('#postsBox').html(html);
        var page = template('pageTpl', res);
        $('#page').html(page);
    }
});
//处理日期时间格式
function dateFormat(date) {
    var date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function changePage(pageNum) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: pageNum
        },
        success: function(res) {
            console.log(res);
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('#page').html(page);
        }
    });
};

//获取并渲染分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        console.log(res);
       var html= template('categoryTpl',{data:res});
       $('#categoryBox').html(html)
    }
});
$('#filterForm').on('submit',function(){
    var formData=$(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data:formData,
        success: function(res) {
            console.log(res);
            var html = template('postsTpl', res);
            $('#postsBox').html(html);
            var page = template('pageTpl', res);
            $('#page').html(page);
        }
    });
    return false;
});

//编辑功能
$('#postsBox').on('click','.modify',function(){
    var id=$(this).attr('data-id')
    location.href='modify.html?id='+id;
})