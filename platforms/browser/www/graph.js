

var coorPoints = [];
var distancePoints = [];

function createGraph() {

    //TODO  we need to make this graph dynamicly add additional data sets 
    var canvas = document.getElementById('updating-chart'),
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

    
    myLiveChart = new Chart(ctx).Line(startingData);
    
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
    coorPoints.push(aPoint.info));

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
