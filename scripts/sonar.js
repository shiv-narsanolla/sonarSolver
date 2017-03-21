var fileContent;
var textFile = null;

function allowDrop(ev) {
    ev.preventDefault();
}

function checkForSonar(){
    var regExp = /\)\s{/g;
    if(regExp.test(fileContent)){
        fileContent = fileContent.replace(/\)\s{/g,'){');
    }
    regExp = /\)\s/g;
    if(regExp.test(fileContent)){
        fileContent = fileContent.replace(/\)\s/g,');\r');
    }
    regExp = /};/g;
    if(!regExp.test(fileContent)){
        fileContent = fileContent.replace(/\}/g,'};');
    }
}

function drop(ev) {
    ev.preventDefault();
    if(ev.dataTransfer.files[0] && ev.dataTransfer.files[0].type == "application/javascript"){
        readFile(ev.dataTransfer.files[0]);
    }else{
        document.getElementById('message').innerHTML  = "<span>please upload a <strong> Java Script File</strong></span>"
    }
}

function selectFile(ev){
    if(ev.target.files){
        readFile(ev.target.files[0]);
    }else{
        document.getElementById('message').innerHTML  = "<span>please upload a <strong> Java Script File</strong></span>"
    }
}

function readFile(file){
    if(file){
        startRead(file);
        document.getElementById("downloadLink").download = file.name;
        document.getElementById('message').innerHTML = "<span>File information: <strong>" + file.name +
            "</strong> type: <strong>" + file.type +
            "</strong> size: <strong>" + file.size +
            "</strong> bytes</p></span>"
    }else{
        document.getElementById('message').innerHTML  = "<span>please upload a <strong> Java Script File</strong></span>"
    }
}

function startRead(file) {
    if(file){
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            fileContent = evt.target.result;
        };
        reader.onerror = function (evt) {
            fileContent = "error while reading file";
        }
    }
}

function displayContent(){
    if(fileContent != undefined && fileContent !== ""){
        checkForSonar();
        document.getElementById('message').innerHTML = "<pre>"+fileContent+"</pre>";
        if(document.getElementById("newFileNeeded").checked){
            document.getElementById("downloadLink").href = download(fileContent);
            document.getElementById("downloadLink").style.display = 'inline';
        }else{
            document.getElementById("downloadLink").style.display = 'none';
        }
    }else{
        document.getElementById('message').innerHTML  = "<span>some thing went<strong> Wrong</strong>. Please check if you have uploaded a valid <strong>Java Script File</strong>.</span>";
    }
}

function download(text){

    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    // returns a URL you can use as a href
    return textFile;
};
