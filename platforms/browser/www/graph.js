

var coorPoints = [];
var distancePoints = [];
var lineChart;
var canvas;
var ctx;

function createGraph() {

    //TODO  we need to make this graph dynamicly add additional data sets 
    
    // var myBarChart = new Chart(ctx).Bar(data);

    canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
    labels: [0],
    datasets: [
               {
               fillColor: "rgba(151,187,205,0.2)",
               strokeColor: "rgba(220,220,220,1)",
               pointColor: "rgba(220,220,220,1)",
               pointStrokeColor: "#fff",
               data: [0.0]
               }
               ]
    }

    
    lineChart = new Chart(ctx).Line(startingData);

    
    
    
}
function add_graph_line(){
    // var ctx = document.getElementById('updating-chart').getContext('2d');
    // lineChart =  new Chart(ctx).Line(data);

    var myNewDataset = {
    // label: "My Second dataset",
    fillColor: "rgba(187,205,151,0.5)",
    strokeColor: "rgba(187,205,151,0.8)",
    pointColor: "rgba(220,220,220,1)",
    pointStrokeColor: "#fff",
    data: [48, 40, 19, 86, 27, 90, 28]
}
    var lines = []
myNewDataset.data.forEach(function (value, i) {
    lines.push(new lineChart({
        value: value,
        // label: lineChart.datasets[0].lines[i].label,
        // x: lineChart.scale.calculateBarX(lineChart.datasets.length + 1, lineChart.datasets.length, i),
        // y: lineChart.scale.endPoint,
        // width: lineChart.scale.calculateBarWidth(lineChart.datasets.length + 1),
        // base: lineChart.scale.endPoint,
        strokeColor: myNewDataset.strokeColor,
        fillColor: myNewDataset.fillColor,
        pointColor: myNewDataset.pointColor,
        pointStrokeColor: myNewDataset.pointStrokeColor
    }))
})

lineChart.datasets.push({
    lines: lines
})

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
