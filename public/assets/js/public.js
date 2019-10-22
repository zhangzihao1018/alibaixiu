$.ajax({
    type:'get',
    url:'/posts/random',
    success:function(res){
        // console.log(res);
        var tpl=`
        {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                  <p class="title">{{$value.title}}</p>
                  <p class="reading">{{$value.meta.views}}</p>
                  <div class="pic">
                    <img src="{{$value.thumbnail}}" alt="">
                  </div>
                </a>
            </li>
      {{/each}}
        `;
        var html=template.render(tpl,{data:res})
        $('#public').html(html)
    }   
});
//获取评论数据
$.ajax({
  type:'get',
  url:'/comments/lasted',
  success:function(res){
    // console.log(res);
    var tpl=`
    {{each data}}
    <li>
    <a href="javascript:;">
      <div class="avatar">
        <img src="{{$value.author.avatar}}" alt="">
      </div>
      <div class="txt">
        <p>
          <span>{{$value.author.nickName}}</span>{{$value.createAt.split('T')[0]}}说:
        </p>
        <p>{{$value.content}}</p>
      </div>
    </a>
  </li>
  {{/each}}
    `;
    var html=template.render(tpl,{data:res})
    $('#commentBox').html(html);
  }
});
//向服务器端发送请求 索要分类导航数据
$.ajax({
  type:'get',
  url:'/categories',
  success:function(res){
    // console.log(res);
    var tpl=`
      {{each data}}
      <li><a href="list.html?id={{$value._id}}"><i class="fa fa-glass"></i>{{$value.title}}</a></li>
      {{/each}}
    `;
    var html=template.render(tpl,{data:res})
    $('#navBox').html(html)
    $('#topNav').html(html)
  }
});

//根据key找对应的value值
function getUrlParams(key){
  var str=location.search.substr(1);
  var arr =str.split('&');
  for(var i=0;i<arr.length;i++){
      var arr1=arr[i].split('=');
      if(arr1[0]=key){
          return arr1[1]
      }
  }
};

//获取到搜索表单 并为其添加点击事件 实现搜索功能
$('.search form').on('submit',function(){
  //获取用户在搜索框中输入的关键字内容
 var keys= $(this).find('.keys').val().trim();
  location.href='search.html?key='+keys;
  return false;
})