//向服务器端发送请求 索要图片轮播列表数据
$.ajax({
    type:'get',
    url:'/slides',
    success:function(res){
        // console.log(res);
        var html=template('slidesTpl',{data:res});
        // console.log(html);
        $('#slidesBox').html(html)
    }
});
//添加轮播图图片
$('#file').on('change',function(){
    // console.dir(this);
    // console.dir($(this));
    //用户选择文件
    var file=this.files[0];
    //创建formData对象二进制文件上传
    var formData=new FormData();
    //将管理员选择到的文件添加到formData对象中
    formData.append('image',file);
    //向服务器发送请求
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        processData:false,
        contentType:false,
        success:function(res){
            console.log(res[0].image);
            $('#image').val(res[0].image);
            $('.thumbnail').attr('src',res[0].image).show()
        }
    })
});
//添加文本内容
$('#slidesForm').on('submit',function(){
    var formData=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/slides',
        data:formData,
        success:function(){
            location.reload();
        }
    })
    return false;
});
//删除功能
$('#slidesBox').on('click','.delete',function(){
    var id=$(this).attr('data-id');
    if(confirm('您确定要删除吗？')){
        $.ajax({
            type:'delete',
            url:`/slides/${id}`,
            success:function(){
                location.reload()
            }
        })
    }
})