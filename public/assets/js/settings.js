//当管理员选择到的文件添加到formData对象中
$('#logo').on('change',function(){
    var file=this.files[0];
    var formData=new FormData();
    formData.append('logo',file)
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(res){
            // console.log(res[0].logo);
            
            $('#hiddenLogo').val(res[0].logo)
            $('#image').attr('src',res[0].logo)
        }
    })
});
//实现添加功能
$('#settingsForm').on('submit',function(){
    var formData=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/settings',
        data:formData,
        success:function(){
            location.reload()
        }
    })
    //阻止表单默认提交行为
    return false;
});
//向服务器端发送请求 索要网站设置数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(res){
        console.log(res);
        if(res){
            //将logo地址存在隐藏域中
            $('#hiddenLogo').val(res.logo);
            //将logo显示出来
            $('#image').attr('src',res.logo);
            //将网站标题显示在页面中
            $('input[name="title"]').val(res.title);
            //将是否开启评论功能显示在页面中
            $('input[name="comment"]').prop('checked',res.comment);
            //将评论是否经过人工审核显示在页面中
            $('input[name="review"]').prop('checked',res.review);
        }
    }
})