//handles phone data persistence and phone file readin

//todo I know wes had this working
function savetoCSV(Filename){

}

function readinCSV(Filename){
    function win(file) {
        var reader = new FileReader();
        reader.onloadend = function (evt) {
            console.log("read success");
            console.log(new Uint8Array(evt.target.result));
        };
        reader.readAsArrayBuffer(file);
    };

    var fail = function (error) {
        console.log(error.code);
    };

}
// template I found online  want to see how this works
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;

                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
function loadCSV(){

}

//todo wes does this look rightish?
function load_data(data){
    var resultArray = []
    for (var i = 0;i< data.length;i++) {
        var temp_arr = data[i];
        var a_point = new point(temp_arr[0],temp_arr[1]);

        resultArray.push(a_point);
    };
    return resultArray;
}