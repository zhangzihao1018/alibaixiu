//文章数量展示
$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(res){
        // console.log(res);
        $('#post').html(`<strong>${res.postCount}</strong>篇文章（<strong>${res.draftCount}</strong>篇草稿）`)
    }
});
//分类数量展示
$.ajax({
    type:'get',
    url:'/categories/count',
    success:function(res){
        // console.log(res);
        
        $('#categories').html(`<strong>${res.categoryCount}</strong>个分类`)
    }
});
//评论数量展示
$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(res){
        // console.log(res);
        $('#comments').html(`<strong>${res.commentCount}</strong>条评论`)
    }
})