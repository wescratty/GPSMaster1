//handles phone data persistence and phone file readin

//todo I know wes had this working
function savetoCSV(Filename){

}

function readinCSV(Filename){

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