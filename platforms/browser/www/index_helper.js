 
    var refreshIntervalId = null;
    var myLiveChart;
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
        var speed = position.coords.speed;
        speed = Math.random() *20;
        if (speed<0) {
            speed = 0;
        };

        myLiveChart.addData([speed],Math.floor((Date.now()-1454739000000)/4000 ));//position.coords.speed,Math.floor(Date.now() / 1000)

    function sendCSV(){

    var csvContent = "data:text/csv;charset=utf-8,";
        data.forEach(function(infoArray, index){

            dataString = infoArray.join(",");
            csvContent += index < data.length ? dataString+ "\n" : dataString;

    }); }
      

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
    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }