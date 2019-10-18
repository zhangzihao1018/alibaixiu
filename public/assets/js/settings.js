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
})