
var refreshIntervalId = null;
var myLiveChart;
var dataOutArray = [];
var pointsArray = [];
var startTime;
var count = 0;
var time = 0;

var coorPoints = [];
var non_lat_long_Points = [];
var distancePoints = [];
var accelerationPoints = [];
var positionPoints = [];

var ratePoints = [];
var total_distance = 0;

var lineChart;
var canvas;
var ctx;
var logOb;

var distance = [];
var rate = [];
var acceleration = [];



// this is x^3
var testdata = [
[ 0 ,  0 ],
[ 1 ,  0.258819 ],
[ 2 ,  0.5 ],
[ 3 ,  0.7071068 ],
[ 4 ,  0.8660254 ],
[ 5 ,  0.9659258 ],
[ 6 ,  1 ],
[ 7 ,  0.9659258 ],
[ 8 ,  0.8660254 ],
[ 9 ,  0.7071068 ],
[ 10 ,  0.5 ],
[ 11 ,  0.258819 ],
[ 12 ,  0.0 ],
[ 13 ,  -0.258819 ],
[ 14 ,  -0.5 ],
[ 15 ,  -0.7071068 ],
[ 16 ,  -0.8660254 ],
[ 17 ,  -0.9659258 ],
[ 18 ,  -1 ],
[ 19 ,  -0.9659258 ],
[ 20 ,  -0.8660254 ],
[ 21 ,  -0.7071068 ],
[ 22 ,  -0.5 ],
[ 23 ,  -0.258819 ],
[ 24 ,  0.0 ]
                ];


const METERTOFEET = 3.28084;
const K_MILL_SEC = 1000;

document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("touchstart", function() {}, false);


function onDeviceReady() {
  
    
    createGraph();
    
    var fileApp = new FileApp();
    fileApp.run();
    
}


function startLocationPoints(){
    
    if (refreshIntervalId == null){
        refreshIntervalId = setInterval(getNew, K_MILL_SEC);
    }else{
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
}

function load_test_data(){
    for (var i = 0;i< testdata.length;i++) {
        var temp_arr = testdata[i];
        var a_point = new point(temp_arr[0],temp_arr[1])
        
        addDataToChart(a_point);
        
    };
}



function getNew(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}



function onSuccess(position) {
   
    
                buildLatLonPoints(getGeoPosition(position));
                var len = coorPoints.length;
                if (len>1) {
                var dis_point = new point(time, coorPoints_to_distance(len-1));
                addDataToChart(dis_point);
                };
    
    
    
    
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


function sendCSV(){
    var anArray = distancePoints;
    
    
    // var data = $.parseJSON( txt ).dataOutArray;
    
    var $table = $( "<table></table>" );
    
    for ( var i = 0; i < anArray.length; i++ ) {
        var dat = anArray[i];
        var $line = $( "<tr></tr>" );
        $line.append( $( "<td></td>" ).html( dat.info()[0]+", "+dat.info()[1]) );
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
    
    // console.log("hi there");
    
    var dataOut = anArray.join("")
    var create = document.getElementById('create'),
    tableVal = document.getElementById('tableDiv');
    
    create.addEventListener('click', function () {
                            var link = document.getElementById('downloadlink');
                            link.href = makeCsvFile(makeCSVString(distancePoints));
                            
                            link.style.display = 'table';
                            }, false);
    
    
    
    
    
    // var snd = new Audio("/resources/notify.wav"); // buffers automatically when created
    // snd.play();
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

function makeCSVString(an_array){
    var temp;
    for (var i = 0; i< an_array.length; i++) {
        var dat = an_array[i];
        temp = temp+dat.info()[0]+", "+dat.info()[1]+"\n\r\n";
    }
    
    return temp+"\n\r\n";
    
}


function tryEmail(the_message){
    this.the_message = the_message;
    cordova.plugins.email.isAvailable(
          function (isAvailable) {
          // alert('Service is not available') unless isAvailable;
          console.log("isAvailable1");
          
          cordova.plugins.email.open({
             to:      'person@gmail.com',
             cc:      '',
             bcc:     [],
             subject: 'Cordova data',
             body:    this.the_message,
             attachments:
             'file://resources/data.csv'
             // 'file://img/logo.png', //=> assets/www/img/logo.png (Android)
             // 'file://css/index.css' //=> www/css/index.css (iOS)
                                     
                                     
        });
  }
  );
    
}



function FileApp() {
}
//  $.getScript('/io.js', function()
// {





FileApp.prototype = {
fileSystemHelper: null,
fileNameField: "data.csv",
textField: null,
    
run: function() {
    var that = this,
    writeFileButton = document.getElementById("writeFileButton"),
    readFileButton = document.getElementById("readFileButton"),
    deleteFileButton = document.getElementById("deleteFileButton");
    
    that.fileNameField = document.getElementById("fileNameInput");
    that.textField = document.getElementById("textInput");
    
    writeFileButton.addEventListener("click",
                                     function() {
                                     that._writeTextToFile.call(that);

                                     });
    
    readFileButton.addEventListener("click",
                                    function() {
                                    that._readTextFromFile.call(that);
                                    });
    
    deleteFileButton.addEventListener("click",
                                      function() {
                                      that._deleteFile.call(that)
                                      });
    
    fileSystemHelper = new FileSystemHelper();
},
    
_deleteFile: function () {
    var that = this,
    fileName = that.fileNameField.value;
    
    if (that._isValidFileName(fileName)) {
        fileSystemHelper.deleteFile(fileName, that._onSuccess, that._onError);
    }
    else {
        var error = { code: 44, message: "Invalid filename"};
        that._onError(error);
    }
},
    
_readTextFromFile: function() {
    var that = this,
    fileName = that.fileNameField.value;
    
    if (that._isValidFileName(fileName)) {
        fileSystemHelper.readTextFromFile(fileName, that._onSuccess, that._onError);
    }
    else {
        var error = { code: 44, message: "Invalid filename"};
        that._onError(error);
    }
},
    
    
    
_writeTextToFile: function() {
    var that = this,
     fileName = that.fileNameField.value,
    text = "Distance"+"\n"+makeCSVString(distancePoints)+"Volocity"+"\n"+makeCSVString(ratePoints)+"Acceleration"+"\n"+makeCSVString(accelerationPoints);
    // text = that.textField.value;
    console.log(fileName);


    
    if (that._isValidFileName(fileName)) {
        fileSystemHelper.writeLine(fileName, text, that._onSuccess, that._onError)
    }
    else {
        var error = { code: 44, message: "Invalid filename"};
        that._onError(error);
    }
},
    
_onSuccess: function(value) {
    var notificationBox = document.getElementById("result");
    notificationBox.textContent = value;
},
    
_onError: function(error) {
    
    var errorCodeDiv = document.createElement("div"),
    errorMessageDiv = document.createElement("div"),
    notificationBox = document.getElementById("result");
    
    errorCodeDiv.textContent = "Error code: " + error.name;
    errorMessageDiv.textContent = "Message: " + error.message;
    
    notificationBox.innerHTML = "";
    notificationBox.appendChild(errorCodeDiv);
    notificationBox.appendChild(errorMessageDiv);
},
    
_isValidFileName: function(fileName) {
    //var patternFileName = /^[\w]+\.[\w]{1,5}$/;
    
    return fileName.length > 2;
}
}


// });









