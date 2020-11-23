var input = document.querySelector('input');
var buttons = document.querySelectorAll('button');
var div = document.querySelector('div');
var regexp = /^\d{2,}$/;
// 可视化冒泡排序
function sortSpan() {
    var spans = document.querySelectorAll('span');
    // console.log(spans);
    var k = 0; // 这里不能用循环，可以用两个变量来模拟循环
    var m = 0;
    var time = setInterval(function() { // 间歇调用
        var first = spans[m].style.height;
        var second = spans[m + 1].style.height;
        if (parseInt(first) > parseInt(second)) {
            // console.log('123');
            spans[m].style.height = parseInt(second) + 'px'; // 交换两个的高度
            spans[m + 1].style.height = parseInt(first) + 'px';
            spans[m].style.marginTop = 100 - parseInt(spans[m].style.height) + 'px';
            spans[m + 1].style.marginTop = 100 - parseInt(spans[m + 1].style.height) + 'px';
            spans[m].style.backgroundColor = 'blue';
        }
        m++;
        if (k == spans.length - 1) {
            clearInterval(time);
        }
        if (m == spans.length - k - 1) {
            k++;
            m = 0;
        }
        spans[m].style.backgroundColor = 'red';
        spans[m + 1].style.backgroundColor = 'red';
    }, 7);
    for (var j = 0; j < spans.length; j++) {
        spans[j].style.marginTop = 100 - parseInt(spans[j].style.height) + 'px';
    }
}
// 随机50个数据
function radomData() {
    var arrData = [];
    for (var k = 0; k < 50; k++) {
        arrData[k] = parseInt(Math.random() * 100); // 得到50个数据存储到arrData数组中
        var spanss = document.createElement('span');
        spanss.className = 'sty';
        spanss.style.height = arrData[k] + 'px';
        spanss.style.marginTop = 100 - arrData[k] + 'px';
        div.appendChild(spanss);
    }
    // console.log(arrData);
}
for (var i = 0; i < buttons.length; i++) { // 给所有的button添加点击事件
    buttons[i].addEventListener('click', function() {
        var span = document.createElement('span');
        var lengthSpan = document.querySelectorAll('span');
        if (lengthSpan.length < 50) {
            if (regexp.test(input.value) && input.value <= 100 && input.value >= 10) { // 判断输入的信息是否符合规定
                // console.log('hh');
                if (this.innerHTML == '左侧入') {
                    // console.log(inputValue);
                    span.style.height = input.value + 'px';
                    span.className = 'sty';
                    span.style.marginTop = 100 - input.value + 'px'; // 根据高度来设置加入的span对齐下边
                    div.insertBefore(span, div.children[0]);
                }
                if (this.innerHTML == '右侧入') {
                    span.style.height = input.value + 'px';
                    span.className = 'sty';
                    span.style.marginTop = 100 - input.value + 'px';
                    div.appendChild(span);
                }
                input.value = ''; // 每次输入之后，清空输入框
            }
            if (this.innerHTML == '随机50') { // 随机50个span
                radomData();
            }
        } else {
            input.value = '';
        }
        // 判断输入的数据是否超过50个！
        if (lengthSpan.length == 50 && this.innerHTML == '左侧入' || lengthSpan.length == 50 && this.innerHTML == '右侧入' || lengthSpan.length == 50 && this.innerHTML == '随机50') {
            alert('最多输入50个数据哦！！！');
        }
        if (this.innerHTML == '左侧出') {
            var height = parseInt(div.firstElementChild.style.height);
            // console.log(height);
            alert(height);
            div.removeChild(div.firstElementChild);
        }
        if (this.innerHTML == '右侧出') {
            var height1 = parseInt(div.lastElementChild.style.height);
            alert(height1);
            div.removeChild(div.lastElementChild);
        }
        if (this.innerHTML == '排序') { // 进行冒泡排序
            sortSpan();
        }
    })
}