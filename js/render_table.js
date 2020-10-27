var renderTable = {
 run : function(jsonFilePath,tableID,insertTo,listTo){
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
    var today = new Date();
    var mon = (today.getMonth()+1);
    var day = (today.getDate());
    var md = mon+"/"+day;
    $(`tr[data-calendar-day^='${mon}']`).css("background-color","#FFFFEE");
    $(`tr[data-calendar-day='${md}']`).css("background-color","#EEEEAA");

    document.getElementById("date_01").innerHTML = md;
    var charasToday = $(`tr[data-calendar-day='${md}']`);
    var numCharas = charasToday.length;

    for(n=0;n<numCharas;n++){
     var liEach = document.createElement("div");
     liEach.id = `chara_${mon}${day}${n+1}`;
     var cat = charasToday[n].getElementsByTagName("td")[1].innerText;
     var chara = charasToday[n].getElementsByTagName("td")[2].innerText;
     liEach.innerHTML = `${chara} (${cat})`;
     document.getElementById(listTo).appendChild(liEach);
    }
   }
  };
  fetchFile.open("GET",jsonFilePath);
  fetchFile.send();
 }
};

