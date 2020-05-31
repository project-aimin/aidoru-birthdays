var renderTable = {
 run : function(jsonFilePath,tableID,insertTo){
  var fetchFile = new XMLHttpRequest();
  fetchFile.onreadystatechange = function(){
   if(this.readyState == 4 && this.status == 200){
    var rawData = JSON.parse(fetchFile.responseText);
    var rowTitle = rawData.rows;
    var wholeTable = document.createElement("table");
    wholeTable.id = tableID;
    var tableHeader = document.createElement("tr");
    for(r=0;r<rowTitle.length;r++){
     var rowsEach = document.createElement("th");
     rowsEach.id = "entryrow_"+(r+1);
     rowsEach.innerHTML = rowTitle[r].replace("\n","<br />");
     tableHeader.appendChild(rowsEach);
    }

    wholeTable.appendChild(tableHeader);
    var entriesData = rawData.entries;
    for(e=0;e<entriesData.length;e++){
     var entriesEach = document.createElement("tr");
     for(d=0;d<rowTitle.length;d++){
      var datasEach = document.createElement("td");
      datasEach.innerHTML = entriesData[e][d].replace("\n","<br />");
      entriesEach.appendChild(datasEach);
     }
     entriesEach.setAttribute("data-calendar-day",entriesData[e][0]);
     wholeTable.appendChild(entriesEach);
    }
    document.getElementById(insertTo).appendChild(wholeTable);
   }
  };
  fetchFile.open("GET",jsonFilePath);
  fetchFile.send();
 }
};