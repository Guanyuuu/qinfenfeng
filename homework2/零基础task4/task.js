/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
// 随机颜色
function randomColor() {
    var color = "#";
    //for循环中，如果后面仅有一条语句，{}可省略不写
    //随机生成6位0-15之间的数字，再用toString(16)将数字转成16进制
    for (var i = 0; i < 6; i++) color += parseInt(Math.random() * 16).toString(16);
    return color;
}

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
var data = [];
for (var k in aqiSourceData) {
    data.push(aqiSourceData[k]);
}
// console.log(randomBuildData(500))
// console.log(aqiSourceData['北京'])
// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
        nowSelectCity: '北京',
        nowGraTime: "day"
    }
    /**
     * 渲染图表
     */

function renderChart() {
    var aqiChartWrap = document.querySelector('.aqi-chart-wrap');
    var spans = document.querySelectorAll('span');
    for (var i = 0; i < spans.length; i++) {
        aqiChartWrap.removeChild(spans[i]);
    }
    for (var k in chartData) {
        var span = document.createElement('span');
        span.style.display = 'inline-block';
        if (pageState.nowGraTime == 'day') { // 每个不同时间线对应的宽度
            span.style.width = 14 + 'px';
        } else if (pageState.nowGraTime == 'week') {
            span.style.width = 98 + 'px';
        } else if (pageState.nowGraTime == 'month') {
            span.style.width = 425 + 'px';
        }
        zhi = k + '数据为：' + chartData[k];
        span.setAttribute('title', zhi);
        span.style.height = chartData[k] + 'px';
        span.style.backgroundColor = randomColor();
        span.style.marginTop = (500 - chartData[k]) + 'px';
        aqiChartWrap.appendChild(span);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化 
    chartData = aqiSourceData[pageState.nowSelectCity];
    if (pageState.nowGraTime == 'day') { // 以天为单位的数据
        chartData = aqiSourceData[pageState.nowSelectCity];
        renderChart();
    } else if (pageState.nowGraTime == 'week') {
        var sum = 0;
        var arr = [];
        var arr1 = [];
        for (var k in chartData) {
            arr.push(chartData[k]);
        }
        var j = 0; // 利用变量j来控制几个为一段求和
        for (var i = 0; i < arr.length; i++) {
            j++;
            if (j <= 7) {
                sum += arr[i];
            }
            if (j == 7) { // 当每一段结束后进行sum的重新赋值，以及对j变量重新赋值
                arr1.push(sum / j);
                // console.log(sum / j);
                j = 0;
                sum = 0;
            }
            // if (arr.length - i < 5) {
            //     console.log(sum / j);
            // }
        }
        chartData = {}; // 重新得到chartdata数据
        for (var n = 0; n < arr1.length; n++) {
            chartData[n] = arr1[n];
        }
        // console.log(chartData);
        // console.log(arr1);
        renderChart();
    } else if (pageState.nowGraTime == 'month') {
        var ary = [];
        var ary1 = [];
        for (var k in chartData) {
            ary.push(chartData[k]);
        }
        // console.log(ary);
        var sum1 = 0;
        for (var i = 0; i < 31; i++) {
            sum1 += ary[i];
        }
        ary1.push(sum1 / 31);
        var sum2 = 0;
        for (var j = 31; j < 60; j++) {
            sum2 += ary[j];
        }
        ary1.push(sum2 / 29);
        var sum3 = 0;
        for (var n = 60; n < ary.length; n++) {
            sum3 += ary[n];

        }
        ary1.push(sum3 / 31);
        // console.log(ary1);
        chartData = {};
        for (var m = 0; m < ary1.length; m++) {
            chartData[m] = ary1[m];
        }
        console.log(chartData);
        renderChart();
    }
    // console.log(chartData);
    // console.log(arr);
}

// 设置对应数据

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var inputs = document.querySelectorAll('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', function() {
            var value = this.value;
            pageState.nowGraTime = value;
            console.log(pageState.nowGraTime)
            graTimeChange();
        })
    }
    graTimeChange();

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var citySelect = document.querySelector('#city-select');
    for (var k in aqiSourceData) {
        var option = document.createElement('option');
        option.innerHTML = k;
        citySelect.appendChild(option);
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.addEventListener('change', function() {
        var index = citySelect.selectedIndex;
        // console.log(index)
        pageState.nowSelectCity = citySelect.children[index].innerHTML;
        // console.log(pageState.nowSelectCity);
        graTimeChange();
    })
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm();
    initCitySelector();
}

init();