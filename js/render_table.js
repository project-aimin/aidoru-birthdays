var weekdayNames = ["일","월","화","수","목","금","토"];

var renderTable = {
 run : function(jsonFilePath,tableID,insertTo,listTo){
  var fetchFile = new XMLHttpRequest();
  fetchFile.onreadystatechange = function(){
   if(this.readyState == 4 && this.status == 200){
    var yearNow = (new Date()).getFullYear();
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
      var entryWeekday = (new Date(`${yearNow}/${entriesData[e][0]}`)).getDay();
      if(d == 0){datasEach.innerHTML = (entriesData[e][d]+`(${weekdayNames[entryWeekday]})`).replace("\n","<br />");}
      else{datasEach.innerHTML = entriesData[e][d].replace("\n","<br />");}
      entriesEach.appendChild(datasEach);
     }
     entriesEach.setAttribute("data-calendar-day",entriesData[e][0]);
     wholeTable.appendChild(entriesEach);

     var monEntryCur = new Number(entriesData[e][0].split("/")[0]);
     var monEntryNext = new Number(entriesData[e+1][0].split("/")[0]);
     console.log(e);
     if(typeof entriesData[e+1] != "undefined" && (monEntryCur != monEntryNext)){
      var monthsEach = document.createElement("th");
      var monthLine = document.createElement("td");
      monthLine.setAttribute("colspan","3");
      monthsEach.appendChild(monthLine);
      wholeTable.appendChild(monthsEach);
     }

    }
    document.getElementById(insertTo).innerHTML = "";
    document.getElementById(insertTo).appendChild(wholeTable);

    setInterval(function(){
     var today = new Date();
     var mon = (today.getMonth()+1);
     var day = (today.getDate());
     var md = mon+"/"+day;
     $(`tr[data-calendar-day^='${mon}']`).css("background-color","#FFFFEE");
     $(`tr[data-calendar-day='${md}']`).css("background-color","#EEEEAA");

     document.getElementById("date_01").innerHTML = md;
     var charasToday = $(`tr[data-calendar-day='${md}']`);
     var numCharas = charasToday.length;

     if(numCharas == 0){document.getElementById(listTo).innerHTML = "오늘 생일인 캐릭터가 없습니다.";}
     else{
      document.getElementById(listTo).innerHTML = "";
      for(n=0;n<numCharas;n++){
       var liEach = document.createElement("div");
       liEach.id = `chara_${mon}${day}_${n+1}`;
       var cat = charasToday[n].getElementsByTagName("td")[1].innerText;
       var chara = charasToday[n].getElementsByTagName("td")[2].innerText;
       cat = cat.replace("\n",", ");
       liEach.innerHTML = `${chara} (${cat})`;
       document.getElementById(listTo).appendChild(liEach);
      }
     }
    },1000);
   }
  };
  fetchFile.open("GET",jsonFilePath);
  fetchFile.send();
 },
 seekToday : function(tableTo){
  var today = new Date();
  var mon = (today.getMonth()+1);
  var day = (today.getDate());
  var md = mon+"/"+day;

  var charasToday = $(`tr[data-calendar-day='${md}']`);

  if(charasToday.length == 0){
   alert("오늘 생일인 캐릭터가 없습니다.");
   return false;
  }
  var scrollToday = charasToday.position().top - ($(`#${tableTo}`).height() / 2);
  
  $(`#${tableTo}`).animate({scrollTop : scrollToday},100);
 }
};

