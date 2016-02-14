
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


// var testdata = [
// [0.748966772970291, 0.420133830290049],
// [0.973166725009863, 0.921640928350330],
// [1.18441009172371, 1.66152277005763],
// [1.27625295658650, 2.07878839448810],
// [1.36881905380677, 2.56470917656815],
// [1.45068281931972, 3.05293391133116],
// [1.52438115601154, 3.54226227968903],
// [1.60197632020340, 4.11119689492071],
// [1.66340524733256, 4.60250428476783],
// [1.77104281148501, 5.55503984782838],
// [1.84033581692304, 6.23291544786875],
// [1.88672275108265, 6.71620988007204],
// [1.90481977441887, 6.91133068120590],
// [1.93096138844469, 7.19980557985163],
// [1.96523918495835, 7.59007810308570],
// [1.98193578825049, 7.78518145884587],
// [1.99835387277285, 7.98026272722276],
// [2.06087851551741, 8.75300497568630],
// [2.12681106753463, 9.62025834622926],
// [2.16814449816021, 10.1921232889664],
// [2.22084530414855, 10.9535507503315],
// [2.26550280564596, 11.6276998612801],
// [2.32576024507836, 12.5804109562033],
// [2.36064406141887, 13.1550204305937],
// [2.38313225457903, 13.5345691099168],
// [2.40521937155178, 13.9143870238437],
// [2.42153169014036, 14.1994156065097],
// [2.44855078205641, 14.6800436415470],
// [2.47499301105530, 15.1607934403995],
// [2.49042892794745, 15.4462285629044],
// [2.51099228635801, 15.8320129251099],
// [2.53122571239524, 16.2178253922484],
// [2.56545093122038, 16.8846140236601],
// [2.58461622502219, 17.2658593548716],
// [2.60373940831558, 17.6519443216902],
// [2.62720036810047, 18.1334144977360],
// [2.66355717968287, 18.8967045618510],
// [2.67694439420090, 19.1830672894798],
// [2.69459304292146, 19.5649864956163],
// [2.72064972666853, 20.1380722583286],
// [2.73775311412716, 20.5202593261580],
// [2.76719014995986, 21.1893194922842],
// [2.79602560859350, 21.8586549359518],
// [2.83226280532315, 22.7195982274885],
// [2.87936007278214, 23.8719521009296],
// [2.92497879053147, 25.0246587481698],
// [2.95453157808539, 25.7908650044405],
// [2.96909196031892, 26.1740511641992],
// [2.96909196031892, 26.1740511641992],
// [2.96909196031892, 26.1740511641992],
// [2.96909196031892, 26.1740511641992],
// [2.96909196031892, 26.1740511641992],
// [2.96909196031892, 26.1740511641992],
// [2.96909196031892, 26.1740511641992],
// [2.96909196031892, 26.1740511641992],
// [2.96895496596245, 26.1704283072099],
// [2.96895496596245, 26.1704283072099],
// [2.96895496596245, 26.1704283072099],
// [2.96881793384262, 26.1668047860139],
// [2.96881793384262, 26.1668047860139],
// [2.96881793384262, 26.1668047860139],
// [2.96868086393401, 26.1631806001998],
// [2.96868086393401, 26.1631806001998],
// [2.96868086393401, 26.1631806001998],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559],
// [2.96854375621114, 26.1595557493559]
// ];
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


// import  "graph";


// function point(y,x){
//     this.y = y;
//     this.x = x
//     this.info = function(){
//         return [x,y];
//     }

// }
// $.getScript('/graph.js', function()
// {
    // script is now loaded and executed.
    // put your dependent JS here.


document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//


function onDeviceReady() {

    $.getScript('/graph.js', function()
{
    createGraph();
});

    
     //TODO  we need to make this graph dynamicly add additional data sets 
    // var canvas = document.getElementById('updating-chart'),
    // ctx = canvas.getContext('2d'),
    // startingData = {
    // labels: [0],
    // datasets: [
    //            {
    //            fillColor: "rgba(151,187,205,0.2)",
    //            strokeColor: "rgba(220,220,220,1)",
    //            pointColor: "rgba(220,220,220,1)",
    //            pointStrokeColor: "#fff",
    //            data: [0.0]
    //            }
    //            ]
    // }

    
    // myLiveChart = new Chart(ctx).Line(startingData);
    
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
    
    // addDataToChart(position);

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
















