//像服务器端发送请求 获取文章分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        console.log(res);
        
        var html=template('categoryTpl',{data:res});
        $('#category').html(html)
    }
});
//当管理员选择文件的时候 触发事件
$('#feature').on('change',function(){
   //获取管理员所选择到的文件
    var file=this.files[0];
    //创建formData对象 实现二进制文件上传
    var formData=new FormData();
    formData.append('avatar',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(res){
            console.log(res);
            $('.thumbnail').attr('src',res[0].avatar).show();
            $('#thumbnail').val(res[0].avatar)
        }
    })

});
//创建文章
$('#addForm').on('submit',function(){
    var formData=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/posts',
        data:formData,
        success:function(){
            location.href='posts.html'
        }
    })
    return false;
});

