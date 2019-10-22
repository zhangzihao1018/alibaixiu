var id=getUrlParams('id');
// console.log(id);

$.ajax({
    type:'get',
    url:'/posts/'+id,
    success:function(res){
        // console.log(res);
       var html=template('detailTpl',res);
       $('.article').html(html);
    }
});

//点赞
$('.article').on('click','#like',function(){
    $.ajax({
        type:'post',
        url:'/posts/fabulous/'+id,
        success:function(){
            alert('点赞成功')
        }
    })
});
var state=0;//评论状态是否经过审核
//评论
$.ajax({
    type:'get',
    url:'settings',
    success:function(res){
        console.log(res);
        if(res.review==false){
            state=0;//不需要审核
        }else{
            state=1//需要审核
        }
        if(res.comment){
            $('.comment').show()
        };
        // location.reload();
    }
});

//提交评论功能
$('.comment form').on('submit',function(){
    var content=$(this).find('textarea').val();
    
    $.ajax({
        type:'get',
        url:'/comments',
        data:{
            content:content,
            post:id,
            state:state
        },
        success:function(){
            alert('评论成功');
           location.reload()
        }
    })
    return false;
})