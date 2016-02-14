


var lineChart;
var canvas;
var ctx;


function createGraph() {

    var data = {
    labels: [0],
    datasets: [{
        label: "First",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,20,20,1)",
        pointColor: "rgba(220,20,20,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [0]
    },{
        label: "Second",
        fillColor: "rgba(0, 191, 255,0.2)",
        strokeColor: "rgba(0, 191, 255,1)",
        pointColor: "rgba(0, 191, 255,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0, 191, 255,1)",
        data: [0]
    }, {
        label: "Third",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(15,187,25,1)",
        pointColor: "rgba(15,187,25,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [0]
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

function addDataToChart(position){
    var distance = 0.0;
    var rate = 0.0;
    var acceleration = 0.0;
   


    // buildLatLonPoints(getGeoPosition(position));  // need to uncomment once it is working on phone
    // and delete next 4 lines
    var tmpArr = testdata[time];
    var x = tmpArr[0];
    var y= tmpArr[1];
    coorPoints.push(new point(x,y));

    var  num_coor_points = coorPoints.length;  
    if (num_coor_points>1) {        // once we have atleast 2 lat long we can get a distance
         coorPoints_to_distance(num_coor_points-1);  // gets distance
         distance = distancePoints[num_coor_points-2].info()[1] // gets total distance
         var  num_dis_points = distancePoints.length;
        if (num_dis_points>1) {
            rate = dv_dt(distancePoints[num_dis_points-1],distancePoints[num_dis_points-2]);
            ratePoints.push(new point(num_dis_points-2,rate));
            var  num_rate_points = ratePoints.length;
            if (num_rate_points>1) {
                acceleration = dv_dt(ratePoints[num_rate_points-1],ratePoints[num_rate_points-2]);
                accelerationPoints.push(new point(num_rate_points-2,acceleration));
                
            };
        };

    };

    lineChart.addData([distance,rate,acceleration],time);
    time = time+1;

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
    return new point(lat,lon);

}

function buildLatLonPoints(aPoint){
    this.aPoint = aPoint;
    coorPoints.push(aPoint.info);

}

function coorPoints_to_distance (index) {
    this.index  = index;
    
    // uncomment later
    // var point_a = coorPoints[this.index].info();  //last point in array
    // var point_b = coorPoints[this.index-1].info();// second to last point
        
        // creates a point that is the distance covered
    // var temp_dis = getDistanceFromLatLonInKm(point_a[0],point_a[1],point_b[0],point_b[1]); uncomment for real lat long

    // delete this later, uses tempdata -----------------
    var point_a = coorPoints[this.index];  //last point in array
    var point_b = coorPoints[this.index-1];// second to last point

    var temp_dis=dv_dt(point_a,point_b);
    //----------------------------



    total_distance = total_distance+temp_dis;   // adds up didstance
    distancePoints.push(new point(this.index-1,total_distance)); // makes a point and adds to array
     
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
  return deg * (Math.PI/180);
}


function addPointsToChart(aPoint){
    this.aPoint = aPoint.info;
    var x = aPoint[0]; 
    var y = aPoint[1]; 
    
    myLiveChart.addData([x],y);

}



function point(x,y){
    this.y = y;
    this.x = x;
    this.info = function(){
        return [this.x,this.y];
    }

}




function dv_dt(a_point,b_point){

    this.a_point = a_point.info();
    this.b_point = b_point.info();

    var a_x = this.a_point[0];
    var a_y = this.a_point[1];
    var b_x = this.b_point[0];
    var b_y = this.b_point[1];

    var new_rate = (a_y-b_y)/(a_x-b_x);

    return new_rate;


}









