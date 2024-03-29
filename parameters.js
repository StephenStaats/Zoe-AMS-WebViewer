//
//   Parameter
//   

// Define the Parameter class globally
function Parameter(parameterName) {

   this.parameterName = parameterName;
   this.parameterValue = "---";
   this.parameterAlarmStatus = "Z_PARAM_ALARM_STATUS_NORMAL_NONE";

}

// Method to set parameter value
Parameter.prototype.setValue = function(value) {
   this.parameterValue = value;
};

// Method to get parameter value
Parameter.prototype.getValue = function() {
   return this.parameterValue;
};

// Method to set parameter alarm status
Parameter.prototype.setAlarmStatus = function(alarmStatus) {
   this.parameterAlarmStatus = alarmStatus;
};

// Method to get parameter alarm status
Parameter.prototype.getAlarmStatus = function() {
   return this.parameterAlarmStatus;
};

//
//   getUnitsOfMeasureFromParameterName  
//

Parameter.prototype.getUnitsOfMeasureFromParameterName = function() {

   var unitsOfMeasure = "";

   if (this.parameterName == "HR") { 
      unitsOfMeasure = "bpm"; 
   }
   else if (this.parameterName == "SPO2") { 
      unitsOfMeasure = "%"; 
   }
   else if (this.parameterName == "ETCO2") { 
      unitsOfMeasure = "mmHg"; 
   }
   else if (this.parameterName == "FICO2") { 
      unitsOfMeasure = "mmHg"; 
   }
   else if (this.parameterName == "RRC") { 
      unitsOfMeasure = "rpm";  
   }
   else if (this.parameterName == "TEMP") { 
      if (homeScreen.getSettingValue("TEMP units") == "C") {
         unitsOfMeasure = "\u00B0 C";
      }
      else {
         unitsOfMeasure = "\u00B0 F";
      }
   }
   else if (this.parameterName == "NIBP") { 
      unitsOfMeasure = "mmHg"; 
   }

   return (unitsOfMeasure);

}


//
//   getColorFromParameterName  
//

Parameter.prototype.getColorFromParameterName = function() {

   var color = window.colors.ZRED;

   if (this.parameterName == "HR") { 
      color = window.colors.HRColor; 
   }
   else if (this.parameterName == "SPO2") { 
      color = window.colors.SPO2Color; 
   }
   else if (this.parameterName == "ETCO2") { 
      color = window.colors.ETCO2Color; 
   }
   else if (this.parameterName == "FICO2") { 
      color = window.colors.FICO2Color; 
   }
   else if (this.parameterName == "RRC") { 
      color = window.colors.RRCColor; 
   }
   else if (this.parameterName == "TEMP") { 
      color = window.colors.TEMPColor; 
   }
   else if (this.parameterName == "NIBP") { 
      color = window.colors.NIBPColor; 
   }

   return (color);

}


//
//   getPointSizeFromParameterName  
//

var HRpointSize = 50;
var ETCO2pointSize = 50;
var FICO2pointSize = 20;
var SPO2pointSize = 50;
var RRCpointSize = 50;
var TEMPpointSize = 30;
var NIBPpointSize = 45;

Parameter.prototype.getPointSizeFromParameterName = function() {

   var pointSize = 20 ;

   if (this.parameterName == "HR") { 
      pointSize = HRpointSize; 
   }
   else if (this.parameterName == "SPO2") { 
      pointSize = SPO2pointSize; 
   }
   else if (this.parameterName == "ETCO2") { 
      pointSize = ETCO2pointSize; 
   }
   else if (this.parameterName == "FICO2") { 
      pointSize = FICO2pointSize; 
   }
   else if (this.parameterName == "RRC") { 
      pointSize = RRCpointSize; 
   }
   else if (this.parameterName == "TEMP") { 
      pointSize = TEMPpointSize; 
   }
   else if (this.parameterName == "NIBP") { 
      pointSize = NIBPpointSize; 
   }

   return (pointSize);

}

//
//   getGraphicsDebugValueFromParameterName  
//

Parameter.prototype.getGraphicsDebugValueFromParameterName = function() {

   var graphicsDebugValue = "???" ;

   if (this.parameterName == "HR") { 
      graphicsDebugValue = "333" ; 
   }
   else if (this.parameterName == "SPO2") { 
      graphicsDebugValue = "100" ;
   }
   else if (this.parameterName == "ETCO2") { 
      graphicsDebugValue = "33.3" ;
   }
   else if (this.parameterName == "FICO2") { 
      graphicsDebugValue = "33.3" ;
   }
   else if (this.parameterName == "RRC") { 
      graphicsDebugValue = "133" ; 
   }
   else if (this.parameterName == "TEMP") { 
      graphicsDebugValue = "122.2" ; 
   }
   else if (this.parameterName == "NIBP") { 
      graphicsDebugValue = "222 / 222 (222)" ; 
   }

   return (graphicsDebugValue);

}

//
//   getLeftFromParameterName  
//

Parameter.prototype.getLeftFromParameterName = function() {

   var left = 0 ;

   if (this.parameterName == "HR") { 
      left = homeScreen.HRParamAreaLeft; 
   }
   else if (this.parameterName == "SPO2") { 
      left = homeScreen.SPO2ParamAreaLeft; 
   }
   else if (this.parameterName == "ETCO2") { 
      left = homeScreen.ETCO2ParamAreaLeft; 
   }
   else if (this.parameterName == "FICO2") { 
      left = homeScreen.FICO2ParamAreaLeft; 
   }
   else if (this.parameterName == "RRC") { 
      left = homeScreen.RRCParamAreaLeft; 
   }
   else if (this.parameterName == "TEMP") { 
      left = homeScreen.TEMPParamAreaLeft; 
   }
   else if (this.parameterName == "NIBP") { 
      left = homeScreen.NIBPParamAreaLeft; 
   }

   return (left);

}

//
//   getTopFromParameterName  
//

Parameter.prototype.getTopFromParameterName = function() {

   var top = 0 ;

   if (this.parameterName == "HR") { 
      top = homeScreen.HRParamAreaTop; 
   }
   else if (this.parameterName == "SPO2") { 
      top = homeScreen.SPO2ParamAreaTop; 
   }
   else if (this.parameterName == "ETCO2") { 
      top = homeScreen.ETCO2ParamAreaTop; 
   }
   else if (this.parameterName == "FICO2") { 
      top = homeScreen.FICO2ParamAreaTop; 
   }
   else if (this.parameterName == "RRC") { 
      top = homeScreen.RRCParamAreaTop; 
   }
   else if (this.parameterName == "TEMP") { 
      top = homeScreen.TEMPParamAreaTop; 
   }
   else if (this.parameterName == "NIBP") { 
      top = homeScreen.NIBPParamAreaTop ; 
   }

   return (top);

}

//
//   getWidthFromParameterName  
//

Parameter.prototype.getWidthFromParameterName = function() {

   var width = 0 ;

   if (this.parameterName == "HR") { 
      width = homeScreen.HRParamAreaWidth; 
   }
   else if (this.parameterName == "SPO2") { 
      width = homeScreen.SPO2ParamAreaWidth; 
   }
   else if (this.parameterName == "ETCO2") { 
      width = homeScreen.ETCO2ParamAreaWidth; 
   }
   else if (this.parameterName == "FICO2") { 
      width = homeScreen.FICO2ParamAreaWidth; 
   }
   else if (this.parameterName == "RRC") { 
      width = homeScreen.RRCParamAreaWidth; 
   }
   else if (this.parameterName == "TEMP") { 
      width = homeScreen.TEMPParamAreaWidth; 
   }
   else if (this.parameterName == "NIBP") { 
      width = homeScreen.NIBPParamAreaWidth; 
   }

   return (width);

}

//
//   getHeightFromParameterName  
//

Parameter.prototype.getHeightFromParameterName = function() {

   var height = 0 ;

   if (this.parameterName == "HR") { 
      height = homeScreen.HRParamAreaHeight; 
   }
   else if (this.parameterName == "SPO2") { 
      height = homeScreen.SPO2ParamAreaHeight; 
   }
   else if (this.parameterName == "ETCO2") { 
      height = homeScreen.ETCO2ParamAreaHeight; 
   }
   else if (this.parameterName == "FICO2") { 
      height = homeScreen.FICO2ParamAreaHeight; 
   }
   else if (this.parameterName == "RRC") { 
      height = homeScreen.RRCParamAreaHeight; 
   }
   else if (this.parameterName == "TEMP") { 
      height = homeScreen.TEMPParamAreaHeight; 
   }
   else if (this.parameterName == "NIBP") { 
      height = homeScreen.NIBPParamAreaHeight; 
   }

   return (height);

}

//
//  drawParameterArea
//

Parameter.prototype.drawParameterArea = function() {

   textForegroundColor = this.getColorFromParameterName(this.parameterName) ;
   textBackgroundColor = window.colors.ZBLACK;

   var numericAlarmStatus = getNumericAlarmStatusFromAlarmStatus(this.parameterAlarmStatus) ;

   var needToColor  = getNeedToColorFromAlarmStatus(numericAlarmStatus) ;

   //LOGEVENTYELLOW("In drawParameterArea, needToColor = ", needToColor, " this.parameterAlarmStatus = ", this.parameterAlarmStatus);

   if (this.parameterName == "SPO2") {
      var p = 0;
   }

   if (needToColor) {
      textForegroundColor = getTextForegroundColorFromAlarmStatus(numericAlarmStatus, window.blinkState) ;
      textBackgroundColor = getTextBackgroundColorFromAlarmStatus(numericAlarmStatus, window.blinkState) ;
   }

   // if (this.parameterName == "FICO2") {
   //    textBackgroundColor = window.colors.ZRED;
   // }
   // if (this.parameterName == "NIBP") {
   //    textBackgroundColor = window.colors.ZGREEN;
   // }
   // if (this.parameterName == "TEMP") {
   //    textBackgroundColor = window.colors.ZBLUE;
   // }

   displayCtx.fillStyle = textBackgroundColor;

   var left = this.getLeftFromParameterName() ;
   var top = this.getTopFromParameterName() ;
   var width = this.getWidthFromParameterName() ;
   var height = this.getHeightFromParameterName() ;

   //displayCtx.clearRect(left, top, width, height);
   displayCtx.fillRect(left, top, width, height);

   var pointSize = this.getPointSizeFromParameterName(this.parameterName) ;

   var units = this.getUnitsOfMeasureFromParameterName(this.parameterName) ;

   if (window.graphicsDebug) {
      var graphicsDebugValue = this.getGraphicsDebugValueFromParameterName(this.parameterName) ;
      drawGenericParameterArea(this.parameterName, units, graphicsDebugValue, textForegroundColor, "Arial", pointSize, left, top, width, height); // Draw the rectangle (x, y, width, height)
   }
   else {
      drawGenericParameterArea(this.parameterName, units, this.parameterValue, textForegroundColor, "Arial", pointSize, left, top, width, height); // Draw the rectangle (x, y, width, height)
   }

}

//
//  drawGenericParameterArea
//

function drawGenericParameterArea(label, units, value, labelColor, font, fontSize, x, y, width, height) {

   // // Set the outline color
   // displayCtx.strokeStyle = window.colors.AreaSeparatorColor;
   // // Set the outline width
   // displayCtx.lineWidth = 1; 
   // // Draw the rectangle outline
   // displayCtx.strokeRect(x, y, width, height);

   // Set the text color
   displayCtx.fillStyle = labelColor;

   // var labelX = x + width * 10 / 100 ;
   // var labelY = y + height * 15 / 100 ;
   var labelX = x + 8;
   var labelY = y + 20;

   var unitsX = x + 8;
   var unitsY = y + 35;

   var valueX = x + width * 50 / 100;
   var valueY = y + height * 70 / 100;

   // Add label in the upper left corner
   // Set the font and font size
   displayCtx.font = '11pt Arial'; // Reset to default font and size
   displayCtx.textAlign = 'left';
   displayCtx.fillText(label, labelX, labelY); // Adjust the positioning as needed

   // Add units right below label in the upper left corner
   // Set the font and font size
   displayCtx.font = '9pt Arial'; // Reset to default font and size
   displayCtx.textAlign = 'left';
   displayCtx.fillText(units, unitsX, unitsY); // Adjust the positioning as needed

   if (label == "NIBP") {

      //displayCtx.fillStyle = 'rgba(255, 255, 255, 0.5)'; // Transparent white

      // Split the string by "/"
      const parts = value.split(" / ");

      // Extract systolic and diastolic values
      const systolic = parts[0]; // "120"
      const diastolicWithMean = parts[1]; // "80 (100)"

      // Extract diastolic and mean values
      const diastolic = diastolicWithMean.split(" ")[0]; // "80"
      const mean = diastolicWithMean.split("(")[1].replace(")", ""); // "100"

      // Form the desired strings
      const sysDiaString = `${systolic} / ${diastolic}`; // "120 / 80"
      const meanString = `(${mean})`; // "(100)"

      displayCtx.font = `${fontSize}pt ${font}`;
      displayCtx.textAlign = 'center';

      valueX = x + width * 40 / 100;
      valueY = y + height * 70 / 100;

      displayCtx.fillText(sysDiaString, valueX, valueY); // Adjust the positioning as needed


      displayCtx.font = `${fontSize-15}pt ${font}`;
      displayCtx.textAlign = 'left';

      valueX = x + width * 70 / 100;
      valueY = y + height * 70 / 100;

      displayCtx.fillText(meanString, valueX, valueY); // Adjust the positioning as needed

   }
   else {
      displayCtx.font = `${fontSize}pt ${font}`;
      displayCtx.textAlign = 'center';
      displayCtx.fillText(value, valueX, valueY); // Adjust the positioning as needed   
   }


   //     // Reset the styles to default values
   //     displayCtx.strokeStyle = '#000000'; // Reset to default black
   //     displayCtx.fillStyle = '#000000'; // Reset to default black
   //     displayCtx.font = '10px Arial'; // Reset to default font and size

}


//
//  drawParameterAreas
//

function drawParameterAreas() {

   for (p = 0; p < homeScreen.parameters.length; p++) {

      var param = homeScreen.parameters[p];

      param.drawParameterArea() ;

   }
}


//
//   setupParameters - call when a new parameterDataMessage is received from the REST API
//

var nParameters = 0 ;

function setupParameters(setupParameterDataMessage) {

   homeScreen.clearParameterList();

   // Parse the JSON string into JavaScript object
   const parameterData = JSON.parse(setupParameterDataMessage);

   nParameters = parameterData.parameters.length;

   // Add parameters from the parsed data
   parameterData.parameters.forEach(parameter => {
      // Create an instance of Parameter class
      const param = new Parameter(parameter.parameterName);
      homeScreen.addParameter(param);
   });

}

//
//   shiftParameters  
//

function shiftParameters() {

   parameterSetIndex++;

   if (parameterSetIndex >= currentParameters.length) {
      parameterSetIndex = 0;
   }

}


//
//   processParameterDataMessage
//

var parameterDataMessageCount = 0;

var parameterSetIndex = 0;

var lastBottomLineMessage ;
var lastbottomLineMessageAlarmStatus;

window.bottomLineMessage = " " ;
window.bottomLineMessageAlarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_NORMAL_NONE ;

function processParameterDataMessage(newParameterDataMessage) {

   parameterDataMessageCount++
   LOGEVENT(" ");
   LOGEVENTYELLOW('in processParameterDataMessage, count = ', parameterDataMessageCount);

   // Parse the JSON string into JavaScript object
   const parameterData = JSON.parse(newParameterDataMessage);

   var bottomLineMessage = parameterData.bottomLineMessage ;
   var bottomLineMessageAlarmStatus = parameterData.bottomLineMessageAlarmStatus ;
   if ((bottomLineMessage != lastBottomLineMessage) || (bottomLineMessageAlarmStatus != lastbottomLineMessageAlarmStatus)) {
      lastBottomLineMessage = bottomLineMessage ;
      lastbottomLineMessageAlarmStatus = bottomLineMessageAlarmStatus ;
      window.bottomLineMessage = bottomLineMessage ;
      window.bottomLineMessageAlarmStatus = bottomLineMessageAlarmStatus ;
      drawBottomLineMessageArea() ;
   }

   // See if the parameter setup is changing
   var somethingChanged = 0;
   var nParametersparameterDataMessage = parameterData.parameters.length;
   if (nParametersparameterDataMessage != nParameters) {
      somethingChanged = 1;
   }
   else {
      var p;
      for (p = 0; p < parameterData.parameters.length; p++) {
         //LOGEVENTYELLOW(p + " message = " + parameterData.parameters[p].parameterName + "homeScreen = " + homeScreen.parameters[p].parameterName) ;

         if (parameterData.parameters[p].parameterName != homeScreen.parameters[p].parameterName) {
            somethingChanged = 1;
            break;
         }
      }
   }

   if (somethingChanged) {
      setupParameters(newParameterDataMessage);
   }
   else {

      // Update values from this message into home screen parameter objects
      var p;
      for (p = 0; p < parameterData.parameters.length; p++) {
         var foundMatch = 0;
         var cp;
         for (cp = 0; cp < parameterData.parameters.length; cp++) {
            if (parameterData.parameters[p].parameterName == homeScreen.parameters[cp].parameterName) {
               foundMatch = 1;
               break;
            }
         }
         if (foundMatch) {

            var param = homeScreen.parameters[cp];
 
            var value = parameterData.parameters[cp].parameterValue ;
            var alarmStatus = parameterData.parameters[cp].parameterAlarmStatus ;

            param.setValue(value);
            param.setAlarmStatus(alarmStatus);
            param.drawParameterArea();

         }

      }

   }

}

