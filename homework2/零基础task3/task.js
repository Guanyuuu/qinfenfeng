var aqiData = {};
var tbody = document.querySelector('tbody');
var input = document.querySelectorAll('input');
var button = document.getElementById('add-btn');
var cs = /^[\u4e00-\u9fa5|a-zA-Z]{1,}$/;
var zl = /^\d{1,}$/;
// console.log(button);
function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function addAqiData(aqiData) {
    input[0].value = input[0].value.trim(); // 去掉两端的空格
    input[1].value = input[1].value.trim();
    if (cs.test(input[0].value) && zl.test(input[1].value)) { // 判断输入的值是否符合
        var dataValue = input[0].value;
        // console.log(typeof dataValue);
        var dataValueKey = parseInt(input[1].value);
        aqiData[dataValue] = dataValueKey; // 把数据添加到aqidata中
        // console.log(aqiData);
        return aqiData;
    } else {
        alert('输入有误！！！');
    }

}
// 渲染数据
function renderAqiList(aqiData) {
    for (var k in aqiData) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        // if(k )
        var td = document.createElement('td');
        td.innerHTML = k;
        tr.appendChild(td);
        var td = document.createElement('td');
        td.innerHTML = aqiData[k];
        tr.appendChild(td);
        k++;
        var td = document.createElement('td');
        td.innerHTML = '<a href = "javascript:;">删除</a>'
        tr.appendChild(td);
    }
    for (var j = 0; j < 2; j++) {
        input[j].value = ''; // 每次添加后，清空输入框
    }
}

function addBtnHandle(aqiData) {
    aqiData = addAqiData(aqiData);
    renderAqiList(aqiData);
}

function init() {
    button.addEventListener('click', function() {
        var aqiData = {};
        addBtnHandle(aqiData);
        var a = document.querySelectorAll('a');
        // console.log(a)
        for (var i = 0; i < a.length; i++) {
            a[i].addEventListener('click', function() {
                // console.log(this.parentNode.parentNode); // 循环添加点击事件
                tbody.removeChild(this.parentNode.parentNode); // 移除相对应的节点
                // console.log(this.innerText)
            })
        }
    });
}

init();