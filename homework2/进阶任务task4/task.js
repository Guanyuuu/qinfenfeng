var arrTag = []; // 存储去重的爱好
var arrGoal = []; // 存储固定10个数据
var lis = []; // 存储tag
var arrli = []; // 存储每次添加li后的所有li
var input = document.querySelector('input');
var textarea = document.querySelector('textarea');
var tag = document.querySelector('#tag');
var regexp = /^[0-9a-zA-Z\u4e00-\u9fa5]$/; // 判断输入的值只能为数字字母和汉字

// 获取输入的数据并保存在目标数组中
function getRedentaTag() {
    var inputData = input.value.trim();
    var strIput = '';
    // 去除输入键盘的符号
    for (var b = 0; b < inputData.length; b++) {
        if (regexp.test(inputData.charAt(b))) {
            strIput += inputData.charAt(b);
        }
    }
    var lis = document.querySelectorAll('li');
    // console.log(lis);
    // console.log(inputData);
    var num = 0; // 用于检测是否有相同的数据
    if (lis.length != 0) { // 用于第一次检测是否有数据
        // console.log('123');
        for (var i = 0; i < lis.length; i++) {
            if (strIput == lis[i].innerHTML) { // 判断如果有相同的数据则num会自动加一
                num++;
            }
        }
        if (num == 0) { // 只有当num等于零的时候才会执行渲染数据
            if (lis.length >= 10) { // 判断是否已经达到10个数据，这里是达到10个了
                // console.log(lis[0]);
                tag.removeChild(lis[0]); // 清除第一个数据
                var li = document.createElement('li');
                li.innerHTML = strIput;
                tag.appendChild(li);
            } else {
                var li = document.createElement('li');
                li.innerHTML = strIput;
                tag.appendChild(li);
            }
        }
    } else { // 第一次的输入数据
        // console.log('456');
        var li = document.createElement('li');
        li.innerHTML = strIput;
        tag.appendChild(li);
    }
    lis = document.querySelectorAll('li');
    arrli = lis;
    // console.log(arrTag);
}

// 去重爱好和固定数量
function remove() {
    for (var j = 0; j < arrTag.length; j++) {
        for (var k = j + 1; k < arrTag.length; k++) {
            if (arrTag[j] == arrTag[k]) {
                arrTag.splice(k, 1);
                k--; // 去除后会此位置的元素没了位置会移动一位，否则会跳过一个
            }
        }
    }
    // console.log(arr);
    for (var i = 0; i < arrTag.length; i++) {
        if (arrTag.length - i <= 10) {
            arrGoal.push(arrTag[i]);
        }
    }
    // console.log(arrGoal);
}

// 清除数据
function clearData() {
    input.value = '';
    textarea.value = '';
    arrTag = [];
    arrGoal = [];
}

// 获取爱好
function getHobby() {
    // console.log(textarea);
    var textData = textarea.value;
    // console.log(textData);
    var strall = '';
    for (var i = 0; i < textData.length; i++) {
        if (regexp.test(textData.charAt(i))) {
            strall += textData.charAt(i);
        } else if (strall != '') {
            arrTag.push(strall);
            strall = '';
        }
        if (regexp.test(textData.charAt(i)) && i == textData.length - 1) {
            arrTag.push(strall);
        }
    }
}
// 渲染爱好数据
function redentaHobbyData() {
    var intrest = document.querySelector('#intrest');
    for (var i = 0; i < arrGoal.length; i++) {
        var span = document.createElement('span');
        span.innerHTML = arrGoal[i];
        intrest.appendChild(span);
    }
}
// 鼠标移动到li上在前面添加删除
function mousettt() {
    for (var i = 0; i < arrli.length; i++) {
        arrli[i].addEventListener('mouseover', function() {
            con1 = this.innerHTML;
            this.innerHTML = '删除' + con1;
        })
        arrli[i].addEventListener('mouseout', function() {
            con = this.innerHTML;
            this.innerHTML = con.slice(2);
        })
    }
}
// 点击删除tag
function deleTag() {
    for (var i = 0; i < arrli.length; i++) {
        arrli[i].addEventListener('click', function(e) {
            tag.removeChild(e.target);
        })
    }
}
// tag
function tagIput() {
    // 绑定键盘事件
    input.addEventListener('keyup', function(e) {
            // console.log(e.key);
            if (e.key == 'Enter' || e.key == ',') { // 空格要求就不用设置了，有点麻烦
                getRedentaTag();
                clearData();
            }
        })
        // 当光标移除时触发经过和移除事件
    input.addEventListener('mouseout', function() {
        mousettt();
        deleTag();
    })
}
// hobby
function hobbyInput() {
    var button = document.querySelector('button');
    button.addEventListener('click', function() {
        getHobby();
        remove();
        redentaHobbyData();
        clearData();
    })
}

tagIput();
hobbyInput();