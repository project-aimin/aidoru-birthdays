

var renderTable = {
 run : function(jsonFilePath,tableID,insertTo){
  var fetchFile = new XMLHttpRequest();
  fetchFile.onreadystatechange = function(){
   var rawData = JSON.parse(fetchFile.responseText);
   var rowTitle = rawData.rows;

   var wholeTable = document.createElement("table");
   wholeTable.id = tableID;

   var tableHeader = document.createElement("tr");
   for(r=0;r<rowTitle.length;r++){
    var rowsEach = document.createElement("th");
    rowsEach.appendChild(document.createTextNode(rowTitle[r]));
    tableHeader.appendChild(rowsEach);
   }

   wholeTable.appendChild(tableHeader);

   var entriesData = rawData.entries;
   for(e=0;e<entriesData.length;e++){
    var entriesEach = document.createElement("tr");
    for(d=0;d<rowTitle.length;d++){
     var datasEach = document.createElement("td");
     datasEach.appendChild(document.createTextNode(entriesData[e][d]));
     entriesEach.appendChild(datasEach);
    }
    wholeTable.appendChild(entriesEach);
   }
   document.getElementById(insertTo).appendChild(wholeTable);
  };
  fetchFile.open("GET",jsonFilePath);
  fetchFile.send();
 }
};