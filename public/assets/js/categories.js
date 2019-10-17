$.ajax({
    type: 'get',
    url: '/categories',
    success: function(result) {
        var html = template('categoriesTpl', { data: result });
        $('#categoriesBox').html(html)
    }
});
//添加分类的功能
$('#addCategory').on('submit', function() {
    var dataForm = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: dataForm,
        success: function() {
            // console.log(res);
            location.reload();
        }
    })
    return false;
});
//为编辑按钮添加点击事件
$('#categoriesBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(res) {
            console.log(res);
            var html = template('modifyTpl', res);
            $('#modifyBox').html(html)
        }
    })
});
//实现修改功能
$('#modifyBox').on('submit', '#modifyForm', function() {

    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: $(this).serialize(),
        success: function() {
            location.reload()
        }
    })
    return false;
});
//删除按钮添加点击事件
// $('#categoriesBox').on('click','.delete',function(){
//     var id=$(this).attr('data-id');

// })