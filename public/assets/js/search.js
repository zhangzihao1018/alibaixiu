//获取地址栏上的分类id值
// var categoryId=location.search.split('=')[1]; 这样写没有通用性，在参数很多的时候得到错误的结果


var key= getUrlParams('key');

$.ajax({
    type:'get',
    url:'/posts/search/'+key,
    success:function(res){
        // console.log(res);
        var html=template('listTpl',{data:res});
        $('#listBox').html(html)
        
    }
})