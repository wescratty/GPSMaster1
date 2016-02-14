
var refreshIntervalId = null;
var myLiveChart;
var dataOutArray = [];
var pointsArray = [];
var startTime;
var count = 0;
var time = 0;

var coorPoints = [];
var distancePoints = [];
var accelerationPoints = [];
var ratePoints = [];
var total_distance = 0;
// var lineChart;


// this is x^2
var testdata = [
[ 0 ,  0 ],
[ 1 ,  1 ],
[ 2 ,  8 ],
[ 3 ,  27 ],
[ 4 ,  64 ],
[ 5 ,  125 ],
[ 6 ,  216 ],
[ 7 ,  343 ],
[ 8 ,  512 ],
[ 9 ,  729 ],
[ 10 ,  1000 ],
[ 11 ,  1331 ],
[ 12 ,  1728 ],
[ 13 ,  2197 ],
[ 14 ,  2744 ],
[ 15 ,  3375 ],
[ 16 ,  4096 ],
[ 17 ,  4913 ],
[ 18 ,  5832 ],
[ 19 ,  6859 ],
[ 20 ,  8000 ]
];


const METERTOFEET = 3.28084;
const K_MILL_SEC = 1000;



document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//


function onDeviceReady() {

    $.getScript('/graph.js', function()
{
    createGraph();
});

    
    
}



function startLocationPoints(){
    // startTime = Date.now();

    if (refreshIntervalId == null){
        refreshIntervalId = setInterval(getNew, K_MILL_SEC);
    }else{
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
}



function getNew(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}



function onSuccess(position) {
     $.getScript('/graph.js', function()
{
    addDataToChart(position);
});
    
    

    var element = document.getElementById('geolocation');
    element.innerHTML =
    'Latitude: '           + position.coords.latitude              + '<br />' +
    'Longitude: '          + position.coords.longitude             + '<br />' +
    'Altitude: '           + position.coords.altitude*METERTOFEET  + '<br />' +
    'Accuracy: '           + position.coords.accuracy              + '<br />' +
    'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
    'Heading: '            + position.coords.heading               + '<br />' +
    'Speed: '              + position.coords.speed*METERTOFEET     + '<br />' +
    'Timestamp: '          + position.timestamp                    + '<br />';
}

// function addDataToChart(position){
//     var speed = position.coords.speed*METERTOFEET; 
//     var currentTime = Date.now();
//     // var time = Math.floor((currentTime-startTime)/K_MILL_SEC);
//     var time = ++count;

//     speed = Math.random()*10;
    
//     if (speed<0) {
//         speed = 0;  // intercepts negative speed
        
//     };
//     $.getScript('/graph.js', function()
// {
//     lineChart.addData([speed],time);
// });
//     dataOutArray.push(speed+', '+time+'\n');
//     pointsArray.push(new point(speed,time));  // attempting to make object array for points

// }


function sendCSV(){
    var anArray = triNum();

    
    // var data = $.parseJSON( txt ).dataOutArray;

    var $table = $( "<table></table>" );

    for ( var i = 0; i < anArray.length; i++ ) {
        var dat = anArray[i];
        var $line = $( "<tr></tr>" );
        $line.append( $( "<td></td>" ).html( dat) );
        $table.append( $line );
    }

    $table.appendTo( $( "#tableDiv" ) );


    var csvFile = null,
    makeCsvFile = function (csv) {
        var data = new Blob([csv], {type: 'csv'});

        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (csvFile !== null) {
          window.URL.revokeObjectURL(csvFile);
        }

        csvFile = window.URL.createObjectURL(data);

        return csvFile;
    };


    var dataOut = anArray.join("")
    var create = document.getElementById('create'),
        tableVal = document.getElementById('tableDiv');

  create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    link.href = makeCsvFile(dataOut);
    link.style.display = 'table';
  }, false);


var snd = new Audio("notify.wav"); // buffers automatically when created
snd.play();  
}


function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


function clickedButton(){
    window.location = 'signIn.html'

}

function printPointsArray(){
    sessionStorage.setItem('pointsArray', pointsArray);


    for(var i = 0; i<pointsArray.length;i++){
        var pnt = pointsArray[i];
        document.write(pnt.info()+"<br />");
    }
}

function mailToMe(){
    sessionStorage.setItem('pointsArray', pointsArray);

}

function goToMail_out(){

    window.location = 'mail_out.html'

}
function triNum(){
    var valueArray= [];
    for (var i = 1; i <=20; i++) {
        valueArray[i] =new point(i, (i*(i+1))/2);
    };
    return valueArray;
    
}


// });
















