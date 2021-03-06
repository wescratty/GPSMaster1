
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
var ratePoints = [];
var total_distance = 0;

var lineChart;
var canvas;
var ctx;
var logOb;



// this is x^3
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
document.addEventListener("touchstart", function() {}, false);





function onDeviceReady() {

    $.getScript('/graph.js', function()
{
    createGraph();
});

    // navigator.splashscreen.hide();
    var fileApp = new FileApp();
    fileApp.run();

    console.log(device.platform);

    if (device.platform == "Android") {
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (dir) {
            console.log("Main Dir:", dir);
            dir.getFile("export.csv", {create: true}, function (file) {
                console.log("File: ", file);
                logOb = file;
                //writeLog("App started");
            });
        });
    }
    else if (device.platform == "iOS") {
        window.resolveLocalFileSystemURL(cordova.file.documentsDirectory, function (dir) {
            console.log("Main Dir:", dir);
            dir.getFile("export.csv", {create: true}, function (file) {
                console.log("File: ", file);
                logOb = file;
                //writeLog("App started");
            });
        });
    }

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
     $.getScript('/graph.js', function()
{
    buildLatLonPoints(getGeoPosition(position));
    var len = coorPoints.length;
    if (len>1) {
        var dis_point = new point(time, coorPoints_to_distance(len-1));
        addDataToChart(dis_point);
    };
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


   
  

// var snd = new Audio("notify.wav"); // buffers automatically when created
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
        temp = temp+dat.info()[0]+", "+dat.info()[1]+"%0D%0A";
}

return temp+"%0D%0A"+"%0D%0A";
        
}


function tryEmail(the_message){
    this.the_message = the_message;
    cordova.plugins.email.isAvailable(
    function (isAvailable) {
        // alert('Service is not available') unless isAvailable;
        console.log("isAvailable");
        
        cordova.plugins.email.open({
            to:      'DewyCox@gmail.com',
            cc:      '',
            bcc:     [],
            subject: 'Cordova data',
            body:    this.the_message,
            attachments: [logOb.nativeURL]
    
        });
    }
);

}



function FileApp() {
}
//  $.getScript('/io.js', function()
// {




function writeF() {
    if(!logOb) return;
    //var log = str + " [" + (new Date()) + "]\n";
    var text = "Distance"+"%0D%0A"+makeCSVString(distancePoints)+"Velocity"+"%0D%0A"+makeCSVString(ratePoints)+"Acceleration"+"%0D%0A"+makeCSVString(accelerationPoints);
    console.log("Writing to file: "+text);
    logOb.createWriter(function(fileWriter) {

        fileWriter.seek(fileWriter.length);

        var blob = new Blob([text], {type:'text/csv'});
        fileWriter.write(blob);
        console.log("Finished writing");
    }, fail);
}

function readF() {
    logOb.file(function(file) {
        var reader = new FileReader();

        reader.onloadend = function(e) {
            console.log(this.result);
        };

        reader.readAsText(file);
    }, fail);
}

function deleteF() {
/*    if(!logOb) return;
    logOb.createWriter(function(fileWriter) {

        fileWriter.seek(fileWriter.length);

        var blob = new Blob("", {type:'text/csv'});
        fileWriter.write(blob);
        console.log("Finished deleting");
    }, fail);*/
    logOb.clearData();
}
/*
function emailMessage() {
    console.log(logOb.nativeURL)
    window.plugin.email.open({
        to:      ['andrew.maclean@umontana.edu'],
        subject: 'atty',
        body:    'log file',

    });
}*/

function fail() {
    console.log('Something failed...')
}


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
                                             //that._writeTextToFile.call(that);
                                             writeF();
                                         });
        
        readFileButton.addEventListener("click",
                                        function() {
                                            //that._readTextFromFile.call(that);
                                            deleteF();
                                        });
        
        deleteFileButton.addEventListener("click",
                                          function() {
                                              //that._deleteFile.call(that)
                                              tryEmail();
                                          });

        emailFileButton.addEventListener("click",
            function() {
                //that._deleteFile.call(that)
                tryEmail();
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
            text = "Distance"+"%0D%0A"+makeCSVString(distancePoints)+"Velocity"+"%0D%0A"+makeCSVString(ratePoints)+"Acceleration"+"%0D%0A"+makeCSVString(accelerationPoints);
            // text = that.textField.value;

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









