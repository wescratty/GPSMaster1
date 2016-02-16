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


function FileSystemHelper() { 
}

FileSystemHelper.prototype = {
	
    //Writing operations
    writeLine: function(fileName, text, onSuccess, onError) {
		var that = this;
		var grantedBytes = 0;

		window.requestFileSystem(LocalFileSystem.PERSISTENT, grantedBytes,
								 function(fileSystem) {
									 that._createFile.call(that, fileSystem, fileName, text, onSuccess, onError);

								 },
								 function(error) {
									 error.message = "Request file system failed.";
									 onError.call(that, error);
								 });
	},
    
	_createFile: function(fileSystem, fileName, text, onSuccess, onError) { 
		var that = this;
		var options = {
			create: true, 
			exclusive: false
		};

		fileSystem.root.getFile(fileName, options,
								function(fileEntry) {
									that._createFileWriter.call(that, fileEntry, text, onSuccess, onError);
									console.log("Success! Look for the file at " + fileEntry.file)

								},
								function (error) {
									error.message = "Failed creating file.";
									onError.call(that, error);
								});
	},


    
	_createFileWriter: function(fileEntry, text, onSuccess, onError) {
		var that = this;
		fileEntry.createWriter(function(fileWriter) {
			console.log(fileEntry.fullPath);
                                    var len = fileWriter.length;
                                    fileWriter.seek(len);
                                    fileWriter.write(text + '\n');
                                    var message = "Wrote: " + text;
                                    onSuccess.call(that, message);
                                },
                    			function(error) {
                    				error.message = "Unable to create file writer.";
                    				onError.call(that, error);
                    			});
        
	},
    
    //Reading operations
	readTextFromFile : function(fileName, onSuccess, onError) {
		var that = this;
        
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
								 function(fileSystem) {
									 that._getFileEntry.call(that, fileSystem, fileName, onSuccess, onError);
									 // console.log(fileSystem);
								 },
								 function(error) {
									 error.message = "Unable to request file system.";
									 onError.call(that, error);
								 });
	},
    
	_getFileEntry: function(fileSystem, fileName, onSuccess, onError) {
        
		var that = this;
		// Get existing file, don't create a new one.
		fileSystem.root.getFile(fileName, null,
								function(fileEntry) {
									that._getFile.call(that, fileEntry, onSuccess, onError);
								}, 
								function(error) {
									error.message = "Unable to get file entry for reading.";
									onError.call(that, error);
								});
	},

	_getFile: function(fileEntry, onSuccess, onError) { 
		var that = this; 
		fileEntry.file(
			function(file) { 
				that._getFileReader.call(that, file, onSuccess);
				console.log(file);
			},
			function(error) {
				error.message = "Unable to get file for reading.";
				onError.call(that, error);
			});
	},

	_getFileReader: function(file, onSuccess) {
		var that = this;
		var reader = new FileReader();
		reader.onloadend = function(evt) { 
			var textToWrite = evt.target.result;
			tryEmail(textToWrite);
			onSuccess.call(that, textToWrite);
		};
        
		reader.readAsText(file);
	},
   
    //Deleting operations
	deleteFile: function(fileName, onSuccess, onError) {
		var that = this;
       
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
                                function(fileSystem) {
                        			that._getFileEntryForDelete.call(that, fileSystem, fileName, onSuccess, onError);
                        		}, function(error) {
                        			error.message = "Unable to retrieve file system.";
                        			onError.call(that, error);
                        		});
	}, 
    
	_getFileEntryForDelete: function(fileSystem, fileName, onSuccess, onError) { 
		var that = this;
		fileSystem.root.getFile(fileName, 
                                null, 
								function (fileEntry) {
									that._removeFile.call(that, fileEntry, onSuccess, onError);
								},
								function(error) {
									error.message = "Unable to find the file.";
									onError.call(that, error)
								});
	},
    
	_removeFile : function(fileEntry, onSuccess, onError) {
		var that = this;
		fileEntry.remove(function (entry) {
                			var message = "File removed.";
                			onSuccess.call(that, message);
                		}, function (error) {
                			error.message = "Unable to remove the file.";
                			onError.call(that, error)
                		});
	}
};