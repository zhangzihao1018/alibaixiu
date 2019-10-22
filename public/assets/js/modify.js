var id=location.search.split('=')[1];
//根据id获取文章渲染到修改页面
$.ajax({
    type:'get',
    url:`/posts/${id}`,
    success:function(res){
    // console.log(res);    
        $.ajax({
            type:'get',
            url:'/categories',
            success:function(res1){
                // console.log(res);
                res.cateList=res1;
                console.log(res);
                
                var html=template('modifyTpl',res);
                
                $('#textBox').append(html);
            }
        });
    }
})
//当管理员选择文件的时候 触发事件
$('#textBox').on('change','#feature',function(){
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
$('#textBox').on('submit','#editForm',function(){
    var formData=$(this).serialize();
    $.ajax({
        type:'put',
        url:`/posts/${id}`,
        data:formData,
        success:function(){
            // console.log(res);
            
            location.href='posts.html'
        }
    })
    return false;
});

//像服务器端发送请求 获取文章分类数据

