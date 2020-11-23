var input = document.querySelector('input');
var buttons = document.querySelectorAll('button');
var div = document.querySelector('div');
var spans = document.querySelectorAll('span');
var p = document.querySelector('p');
var rgx = /^\d{1,}$/;

function getSpans() {
    spans = document.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
        spans[i].addEventListener('click', function() {
            div.removeChild(this);
        })
    }
}
for (var i = 0; i < 2; i++) { // 循环绑定点击事件
    buttons[i].addEventListener('click', function() {
        for (var j = 0; j < buttons.length; j++) {
            buttons[j].className = 'nocolor'; // 首先给所有的span去除颜色
        }
        this.className = 'click'; //  取出后给点击的对象添加颜色
        if (!rgx.test(input.value)) { // 判断输入的数字不和，以及判断是不是为空的字符
            alert('请输入纯数字好不好！！！');
            input.value = '';
        }
        if (rgx.test(input.value)) { // 判断输入的数字是不是纯数字
            var span = document.createElement('span');
            if (this.innerHTML == '左侧入') { // 判断点击的是哪个按钮
                span.innerHTML = input.value;
                div.insertBefore(span, div.children[0]); // 在div的第一个子节点前添加创建的新节点
                input.value = ''; // 每次输入值后，清空input的输入框
            }
            if (this.innerHTML == '右侧入') {
                span.innerHTML = input.value;
                div.appendChild(span);
                input.value = '';
            }
        }
        getSpans();
    })
}
for (var j = 2; j < 4; j++) {
    buttons[j].addEventListener('click', function() {
        if (this.innerHTML == '左侧出') {
            alert(div.firstElementChild.innerHTML);
            div.removeChild(div.firstElementChild); // 移除第一个子元素节点。注意别用firstChild
        }
        if (this.innerHTML == '右侧出') {
            alert(div.lastElementChild.innerHTML);
            div.removeChild(div.lastElementChild);
        }
        getSpans();
    })
}