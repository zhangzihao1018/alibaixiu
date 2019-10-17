$.ajax({
    type: 'get',
    url: '/users',
    success: function(res) {
        var html = template('usersTpl', { data: res })
        $('#tbody').html(html)
    }
});
$('#userForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(res) {
            location.reload();
        }
    })
    return false;
});
//上传用户对象
$('#modifyBox').on('change', '#avatar', function() {
    var fd = new FormData();
    console.dir(this)
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: fd,
        success: function(res) {
            // console.log(res);
            //实现头像预览功能
            $('#preview').attr('src', res[0].avatar);
            $('#hiddenAvatar').val(res[0].avatar);

        }
    })
});
//修改事件
$('#tbody').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
    console.log(id);
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(res) {
            console.log(res);
            var html = template('modifyTpl', res);
            $('#modifyBox').html(html);
        }
    })
});
//用事件委托给修改表单添加事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    var dataForm = $(this).serialize();
    console.log(dataForm);
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: dataForm,
        success: function(res) {
            location.reload();
        }
    })
    return false;
});
//删除事件 事件委托
$('#tbody').on('click', '.del', function() {
    //判断是否真的要删除
    if (confirm('是否真的要删除此用户')) {
        //获取要删除用户的id
        var id = $(this).attr('data-id');
        // console.log(id);
        //执行删除请求
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function(res) {
                // console.log(res);
                location.reload();
            }
        })
    }

});
//批量删除功能实现
$('#checkAll').on('change', function() {
    var bool = $(this).prop('checked');
    var checkList = $('#tbody input[type="checkbox"]');
    checkList.prop('checked', bool);
    if (bool == true) {
        $('.deleteMany').show()
    } else {
        $('.deleteMany').hide()
    }
});
$('#tbody').on('change', 'input[type="checkbox"]', function() {
    if ($('#tbody input[type="checkbox"]').length == $('#tbody input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true)

    } else {
        $('#checkAll').prop('checked', false)
    };
    if ($('#tbody input[type="checkbox"]:checked').length >= 2) {
        $('.deleteMany').show()
    } else {
        $('.deleteMany').hide()
    }

});
//实现批量删除
$('.deleteMany').on('click', function() {
    if (confirm('确定删除吗')) {
        //选出来所有打钩的checkbox
        var checkList = $('#tbody input[type="checkbox"]:checked');
        var str = '';
        checkList.each(function(index, item) {
            str += $(item).attr('data-id') + '-';
        })
        str = str.substr(0, str.length - 1);
        console.log(str);
        $.ajax({
            type: 'delete',
            url: '/users/' + str,
            success: function() {
                location.reload()
            }
        })
    }

})