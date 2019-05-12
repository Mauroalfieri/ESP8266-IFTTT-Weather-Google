var SS = SpreadsheetApp.openById('[YOUR SPREADSHEET ID]');
var sheet = SS.getSheetByName('Sheet1');
var str = "";

function onOpen(){
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('ESP8266 Logging')
  .addItem('Clear', 'Clear')
  .addToUi();
}

function Clear(){
  sheet.deleteRows(4, sheet.getLastRow());
  SS.toast('Chart cleared', 'ESP8266 logging', 5);
}

function doPost(e) {

  var parsedData;
  var result = {};
  
  try { parsedData = JSON.parse(e.postData.contents); } 
  catch(f){ return ContentService.createTextOutput("Error in parsing request body: " + f.message); }
   
  if (parsedData !== undefined){
    // Common items first
    // data format: 0 = display value(literal), 1 = object value
    var flag = parsedData.format;
    
    if (flag === undefined){ flag = 0; }
    
    switch (parsedData.command) {
      case "appendRow":
         var tmp = SS.getSheetByName(parsedData.sheet_name);
         var nextFreeRow = tmp.getLastRow() + 1;
         var dataArr = parsedData.values.split(",");
         
         tmp.appendRow(dataArr);
         
         str = "Success";
         SpreadsheetApp.flush();
         break;
    }
    
    return ContentService.createTextOutput(str);
  } // endif (parsedData !== undefined)
  
  else{ return ContentService.createTextOutput("Error! Request body empty or in incorrect format."); }
}


function doGet(e){
  
  var readJson  = e.parameter.readJson;
  var readCsv   = e.parameter.readCsv;
  var debugJson = e.parameter.debugJson;
  var debugCsv  = e.parameter.debugCsv;
  
  var lastRecord = sheet.getDataRange().getNumRows();
  
  if (readCsv !== undefined) { return ContentService.createTextOutput( getDataCsv(lastRecord) ); }
  if (debugCsv !== undefined){ return ContentService.createTextOutput("Last: "+ lastRecord + " \nData: " + getDataCsv( lastRecord )); }
   
  if (readJson !== undefined) { return ContentService.createTextOutput( getDataJson(lastRecord) ); }
  if (debugJson !== undefined){ return ContentService.createTextOutput("Last: "+ lastRecord + " \nData: " + getDataJson( lastRecord )); }
}

function getDataJson( last ){
    var separator = "\",";
    var response  = "{";
        response += "\"CheckTime\":\""                + sheet.getRange('A'+last).getValue() + separator;
        response += "\"Current\":\""                  + sheet.getRange('B'+last).getValue() + separator;
        response += "\"CurrentCondition\":\""         + sheet.getRange('C'+last).getValue() + separator;
        response += "\"CurrentTempCelsius\":\""       + sheet.getRange('D'+last).getValue() + separator;
        response += "\"LowTempCelsius\":\""           + sheet.getRange('E'+last).getValue() + separator;
        response += "\"HighTempCelsius\":\""          + sheet.getRange('F'+last).getValue() + separator;
        response += "\"WindDirection\":\""            + sheet.getRange('G'+last).getValue() + separator;
        response += "\"WindSpeedMph\":\""             + sheet.getRange('H'+last).getValue() + separator;
        response += "\"PollenCount\":\""              + sheet.getRange('I'+last).getValue() + separator;
        response += "\"TodaysCondition\":\""          + sheet.getRange('J'+last).getValue() + separator;
        response += "\"Humidity\":\""                 + sheet.getRange('K'+last).getValue() + separator;
        response += "\"UvIndex\":\""                  + sheet.getRange('L'+last).getValue() + separator;
        response += "\"SunriseAt\":\""                + sheet.getRange('M'+last).getValue() + separator;
        response += "\"SunsetAt\":\""                 + sheet.getRange('N'+last).getValue() + separator;
        response += "\"ForecastUrl\":\""              + sheet.getRange('O'+last).getValue() + separator;
        response += "\"CurrentConditionImageURL\":\"" + sheet.getRange('P'+last).getValue() + separator;
        response += "\"TodaysConditionImageURL\":\""  + sheet.getRange('Q'+last).getValue() + "\"}";
    
    return response; 
}

function getDataCsv( last ){
    var separator = ",";
    var response = "";
        response += sheet.getRange('A'+last).getValue() + separator;
        response += sheet.getRange('B'+last).getValue() + separator;
        response += sheet.getRange('C'+last).getValue() + separator;
        response += sheet.getRange('D'+last).getValue() + separator;
        response += sheet.getRange('E'+last).getValue() + separator;
        response += sheet.getRange('F'+last).getValue() + separator;
        response += sheet.getRange('G'+last).getValue() + separator;
        response += sheet.getRange('H'+last).getValue() + separator;
        response += sheet.getRange('I'+last).getValue() + separator;
        response += sheet.getRange('J'+last).getValue() + separator;
        response += sheet.getRange('K'+last).getValue() + separator;
        response += sheet.getRange('L'+last).getValue() + separator;
        response += sheet.getRange('M'+last).getValue() + separator;
        response += sheet.getRange('N'+last).getValue() + separator;
        response += sheet.getRange('O'+last).getValue() + separator;
        response += sheet.getRange('P'+last).getValue() + separator;
        response += sheet.getRange('Q'+last).getValue();
    
    return response; 
}

