var textarea = document.querySelector('#text');
var input = document.querySelector('input');
var data = [];
// 获取并分离多个内容
function getInner() {
    var regexp = /^[0-9a-zA-Z\u4e00-\u9fa5]$/;
    var str = textarea.value;
    var ostr = '';
    // console.log(str);
    for (var i = 0; i < str.length; i++) {
        var goalStr = str.charAt(i);
        if (regexp.test(goalStr)) {
            ostr += goalStr;
        } else {
            data.push(ostr);
            ostr = '';
        }
        if (regexp.test(goalStr) && i == str.length - 1) { // 如果只有一个合法数据直接push
            data.push(ostr);
        }
    }
}
// 渲染数据
function rendata() {
    var div = document.querySelector('div');
    for (var i = 0; i < data.length; i++) {
        var span = document.createElement('span');
        span.innerHTML = data[i];
        div.appendChild(span);
    }
}
// 清除每次插入后的data和textarea、input中的数据
function clear() {
    textarea.value = ''; // 在每次插入后的文本框的值清空
    data = []; // 将插入过后的data数据进行清空
    input.value = ''; // 清空每次查询后的查询框
}
// 模糊查询
function fuzzyQuery() {
    var spans = document.querySelectorAll('span');
    for (var n = 0; n < spans.length; n++) {
        spans[n].style.backgroundColor = 'pink';
        spans[n].style.color = 'black';
    }
    var charquery = input.value;
    for (var i = 0; i < spans.length; i++) { // 遍历所有的span
        var huntNumber = 0; // 定义一个变量来记录两个之间能有多少个字符相似
        var spanvalue = spans[i].innerHTML;
        // console.log(spanvalue);
        for (var j = 0; j < spanvalue.length; j++) { // 遍历当前span的innerHTML
            for (var k = 0; k < charquery.length; k++) { // 遍历查询框中的字符
                if (spanvalue.charAt(j) == charquery.charAt(k)) { // 将查询框中的字符每一个与span中的字符性对比
                    huntNumber++; // 匹配成功则huntNumber就加一
                }
            }
        }
        if (huntNumber >= 2) { // 如果有两个以及以上的相似就改变原来span的样式
            spans[i].style.backgroundColor = 'yellow';
            spans[i].style.color = 'blue';
        }
    }
}
// 绑定按钮事件
function bindButton() {
    var buttons = document.querySelectorAll('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if (this.innerHTML == '插入') {
                // console.log('123');
                getInner();
                rendata();
                clear();
            }
            if (this.innerHTML == '查询') {
                // console.log('123');
                fuzzyQuery();
                clear();
            }
        })
    }
}
bindButton();