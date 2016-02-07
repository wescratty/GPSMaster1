
var refreshIntervalId = null;
var myLiveChart;
var dataOutArray = [];


document.addEventListener("deviceready", onDeviceReady, false);
// device APIs are available
//


function onDeviceReady() {
    var canvas = document.getElementById('updating-chart'),
    ctx = canvas.getContext('2d'),
    startingData = {
    labels: [1],
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



function startLocationPoints(){
    if (refreshIntervalId == null){
        refreshIntervalId = setInterval(getNew, 1000);
    }else{
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
}



function getNew(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}



function onSuccess(position) {
    
    addDataToChart(position);

    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
    'Longitude: '          + position.coords.longitude             + '<br />' +
    'Altitude: '           + position.coords.altitude              + '<br />' +
    'Accuracy: '           + position.coords.accuracy              + '<br />' +
    'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
    'Heading: '            + position.coords.heading               + '<br />' +
    'Speed: '              + position.coords.speed                 + '<br />' +
    'Timestamp: '          + position.timestamp                    + '<br />';
}

function addDataToChart(position){
    var speed = position.coords.speed; 
    var time = Math.floor((Date.now()-1454739000000)/4000 );
    speed = Math.random() * 20;  // intercepts and gives something to 

    
    if (speed==0||speed<0) {
        speed = Math.random() * 20;  // intercepts and gives something to
    };
    
    myLiveChart.addData([speed],time);//position.coords.speed,Math.floor(Date.now() / 1000)
    // dataOutArray.push(speed+'\n');
    dataOutArray.push(speed+', '+time+'\n');

}


function sendCSV(){

    
    // var data = $.parseJSON( txt ).dataOutArray;

    var $table = $( "<table></table>" );

    for ( var i = 0; i < dataOutArray.length; i++ ) {
        var dat = dataOutArray[i];
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


    var dataOut = dataOutArray.join("")
    var create = document.getElementById('create'),
    tableVal = document.getElementById('tableDiv');

  create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    link.href = makeCsvFile(dataOut);
    link.style.display = 'table';
  }, false);




// blob = new Blob([dataOutArray], { type: 'text/csv' }); //new way
// var csvUrl = URL.createObjectURL(blob);

// $(this)
// .attr({
//     'download': filename,
//     'href': csvUrl
// });



 // document.getElementById("myDiv").innerHTML = $table;
 //    var csvContent = "$table:text/csv;charset=utf-8,";

 //    var encodedUri = encodeURI(csvContent);
 //    var link = document.createElement("a");
 //    link.setAttribute("href", encodedUri);
 //    link.setAttribute("download", "my_data.csv");

 //    link.click(); // This will download the data file named "my_data.csv".


  
}




function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


function clickedButton(){
    window.location = 'signIn.html'

}



















