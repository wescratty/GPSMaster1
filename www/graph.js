

var coorPoints = [];
var distancePoints = [];
var lineChart;
var canvas;
var ctx;

function createGraph() {

    var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
        label: "First",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,20,20,1)",
        pointColor: "rgba(220,20,20,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 90]
    },{
        label: "Second",
        fillColor: "rgba(0, 191, 255,0.2)",
        strokeColor: "rgba(0, 191, 255,1)",
        pointColor: "rgba(0, 191, 255,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0, 191, 255,1)",
        data: [2,4,8,16,32,64,21]
    }, {
        label: "Third",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(15,187,25,1)",
        pointColor: "rgba(15,187,25,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [38, 55, 50, 65, 35, 67, 54]
    }]
};

var options = {
    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label %>: <%}%><%= value + ' %' %>",
    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value + ' %' %>",
};

var ctx = document.getElementById("updating-chart").getContext("2d");

window.lineChart = new Chart(ctx).Line(data, options);
window.lineChart.store = new Array();

$('#lineOne').click(function () {
    var label = 'First';
    var chart = window.lineChart;
    var store = chart.store;
    var finded = false;
    for (var i = 0; i < store.length; i++) {
        console.log("Store name " + store[i][0]);
        if (store[i][0] === label) {
            finded = true;
            var restored = store.splice(i, 1)[0][1];
            chart.datasets.push(restored);
        }
    }
    //Если нет, то добавляем в стор
    if (!finded) {
        console.log('Start search dataset with label = ' + label);
        for (var i = 0; i < chart.datasets.length; i++) {
            if (chart.datasets[i].label === label) {
                chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
            }
        }
    }
    chart.update();
});
$('#lineTwo').click(function () {
    var label = 'Second';
    var chart = window.lineChart;
    var store = chart.store;
    var finded = false;
    for (var i = 0; i < store.length; i++) {
        console.log("Store name " + store[i][1]);
        if (store[i][0] === label) {
            finded = true;
            var restored = store.splice(i, 1)[0][1];
            chart.datasets.push(restored);
        }
    }
    //Если нет, то добавляем в стор
    if (!finded) {
        console.log('Start search dataset with label = ' + label);
        for (var i = 0; i < chart.datasets.length; i++) {
            if (chart.datasets[i].label === label) {
                chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
            }
        }
    }
    chart.update();
});
$('#lineThree').click(function () {
    var label = 'Third';
    var chart = window.lineChart;
    var store = chart.store;
    var finded = false;
    for (var i = 0; i < store.length; i++) {
        console.log("Store name " + store[i][2]);
        if (store[i][0] === label) {
            finded = true;
            var restored = store.splice(i, 1)[0][1];
            chart.datasets.push(restored);
        }
    }
    //Если нет, то добавляем в стор
    if (!finded) {
        console.log('Start search dataset with label = ' + label);
        for (var i = 0; i < chart.datasets.length; i++) {
            if (chart.datasets[i].label === label) {
                chart.store.push([label, chart.datasets.splice(i, 1)[0]]);
            }
        }
    }
    chart.update();
});
  

    // canvas = document.getElementById('updating-chart'),
    // ctx = canvas.getContext('2d'),
    // startingData = {
    // labels: [0],
    // datasets: [
    //            {
    //             label: "My First dataset",
    //             fillColor: "rgba(220,220,220,0.2)",
    //             strokeColor: "rgba(220,220,220,1)",
    //             pointColor: "rgba(220,220,220,1)",
    //             pointStrokeColor: "#fff",
    //             pointHighlightStroke: "rgba(220,220,220,1)",
    //             data: [0.0]
    //     },
    //     {
    //             label: "My Second dataset",
    //             fillColor: "rgba(151,187,205,0.2)",
    //             strokeColor: "rgba(151,187,205,1)",
    //             pointColor: "rgba(151,187,205,1)",
    //             pointStrokeColor: "#fff",
    //             pointHighlightFill: "#fff",
    //             pointHighlightStroke: "rgba(151,187,205,1)",
    //             data: [0.0,0.0,0.0]
    //     },
    //     {
    //             label: "My Third dataset",
    //             fillColor: "rgba(0, 191, 255,0.2)",
    //             strokeColor: "rgba(0, 191, 255,1)",
    //             pointColor: "rgba(0, 191, 255,1)",
    //             pointStrokeColor: "#fff",
    //             pointHighlightFill: "#fff",
    //             pointHighlightStroke: "rgba(0, 191, 255,1)",
    //             data: [0.0,0.0,0.0]
    //     }
    //            ]
    // }

    
    // lineChart = new Chart(ctx).Line(startingData);

    
    
    
}
function add_graph_line(){
    lineChart.datasets[1].points[0].value = 50;
    lineChart.datasets[1].points[2].value = 20;
    lineChart.datasets[2].points[0].value = 30;
    lineChart.datasets[2].points[2].value = 10;
    lineChart.update();

}





function flow(){
    var tempPoint = getGeoPosition();

}

function getGeoPosition(position){
    var lat = position.coords.latitude; 
    var lon = position.coords.longitude;
    return new point(lat,lon)

}

function buildLatLonPoints(aPoint){
    this.aPoint = aPoint;
    coorPoints.push(aPoint.info);

}

function coorPoints_to_distance (coorPoints) {
    for (var i = 0; i <= coorPoints.length-1; i++) {
        var point_a = coorPoints[i];
        var point_b = coorPoints[i+1];
        distancePoints[i]= new point(getDistanceFromLatLonInKm(point_a[0],point_a[1],point_b[0],point_b[1]),i)
    };
}

function makeGraphFromDataArr(datArr){
    for (var i = 0; i < datArr.length; i++) {
        addPointsToChart(datArr[i]);
    };

}



function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


function addPointsToChart(aPoint){
    this.aPoint = aPoint.info;
    var x = aPoint[0]; 
    var y = aPoint[1]; 
    
    
    myLiveChart.addData([x],y);

}

// function startLocationPoints(){
//     startTime = Date.now();

//     if (refreshIntervalId == null){
//         refreshIntervalId = setInterval(getNew, K_MILL_SEC);
//     }else{
//         clearInterval(refreshIntervalId);
//         refreshIntervalId = null;
//     }
// }

function point(y,x){
    this.y = y;
    this.x = x
    this.info = function(){
        return [x,y];
    }

}
