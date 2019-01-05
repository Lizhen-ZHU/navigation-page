// 1. 初始化数据

var keys = {'0': {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
            '1': {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
            '2': {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
            'length': 3}
var hash = {'q': 'qq.com', 'b':'baidu.com','w': 'weibo.com', 'e': 'ele.me', 'r': 'renren.com', 'y': 'youtube.com', 'u': 'uc.com' , 'o': 'opera.com', 'a': 'amazon.com', 's': 'sohu.com', 'z': 'zhihu.com', 'm': 'www.mcdonalds.com.cn'}


//取出localstorage 中的upadate 对应的hash
var hashInLocalStorage = JSON.parse(localStorage.getItem('updated') || 'null')
if(hashInLocalStorage){
 hash = hashInLocalStorage
}


// 2. 生成键盘

//生成变量简化版：----------------------------------
function tag(tagName, attributes){
  var element = document.createElement(tagName)
  for (var key in attributes){
    element[key] = attributes[key]
  }
  return element
}
// var div = tag ('div', {className:'row'})
//----------------------------------------------



for(var index = 0; index< keys['length'];index = index + 1 ){ 
  var div1 = document.createElement('div')
  //div1.setAttribute("class", "row");
  div1.className = 'row'
  var mainpage = document.querySelector('#mainpage');
  mainpage.appendChild(div1)
  var row = keys[index]

    for(var index2=0; index2 < row['length'];index2 = index2 + 1 ){ 
      var kbd = document.createElement('kbd')
      //在kbd中间的字母中加上span，这样就可以绝对定位字母位置
      var span = document.createElement('span')
      span.textContent = row[index2]
      span.className = 'text'

      //先在css写好了key的样式，再在js里全部加上这个class
      kbd.className = 'key'  
      // 用dataid来命名， 可以同时和button的 id 用相同的内容     
      kbd.setAttribute('data-id', row[index2])
      
      //加点击事件
      kbd.addEventListener('click', function(e){
        var id = e.target.getAttribute('data-id');
        var weburl = hash[id];
        window.open("http://" + weburl, "_blank");
      })


      //加按钮
      var button1 = document.createElement('button')
      //  加上button的id
      button1.id = row[index2];
      //加按键事件
      button1.onclick = function(click1) {
            var key = click1['target']['id']  //取到click事件中的按钮具体是什么
            newweb = prompt('edit this website') //取到用户输入内容
            event.stopPropagation();//防止与点击效果重合

            // trim the user input path, remove the 'http'
            newweb = newweb.replace(/(http:\/\/|https:\/\/)/, '');
            hash[key] = newweb //让用户的输入key 放在hash里面的index中
          
            //同时改变当前图标，先拿到button前面的img标签
            var nowkey = click1.target
            var nowimg = nowkey.previousSibling
            nowimg.src = 'http://'+ newweb + '/favicon.ico'
          
            //把变更的部分储存在本地
            localStorage.setItem('updated',JSON.stringify(hash))
          }
          //加入角标
          var img = document.createElement('img')
          img.src = 'http://'+ hash[row[index2]] + '/favicon.ico'

          kbd.appendChild(span)
          kbd.appendChild(img)
          kbd.appendChild(button1)  
          div1.appendChild(kbd)
        }
      } 






// 3. 监听键盘
document.onkeypress = function(keypress){
  var key = keypress['key']
  website = hash[key]
  // location.href = 'http://'+website
  window.open('http://'+website, '_blank')
}