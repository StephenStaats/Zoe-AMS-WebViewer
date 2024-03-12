//
//   Parameter
//   

// Define the Parameter class globally
function Parameter(parameterName) {

   //this.firstTimeDraw             = 1 ;

   this.parameterName             = parameterName;
   this.parameterValue            = "";
   this.parameterAlarmStatus      = "";

   this.alarmsOn                  = "";
   this.upperLimit                = "";
   this.lowerLimit                = "";
   this.textForegroundColor       = "";
   this.textBackgroundColor       = "";

   this.lastParameterName         = "";
   this.lastParameterValue        = "";
   this.lastParameterAlarmStatus  = "";

   this.lastAlarmsOn              = "";
   this.lastUpperLimit            = "";
   this.lastLowerLimit            = "";
   this.lastTextForegroundColor   = "";
   this.lastTextBackgroundColor   = "";

   // this.parameterTime             = "";
   // this.alarmSettingsString       = "";
   // this.parameterTime             = "";

   this.NIBPtime                  = "";
   this.NIBPAlarmSettingsString   = "";

   this.TEMPtime                  = "";

   this.parameterAlarmStatus      = "";

}

// Method to set parameter value
Parameter.prototype.setValue = function (value) {
   this.parameterValue = value;
};

// Method to get parameter value
Parameter.prototype.getValue = function () {
   return this.parameterValue;
};

// Parameter.prototype.setTime = function(time) {
//    this.parameterTime = time;
// };

// // Method to get parameter time
// Parameter.prototype.getTime = function() {
//    return this.parameterTime;
// };

// Method to set parameter alarm status
Parameter.prototype.setAlarmStatus = function (alarmStatus) {
   this.parameterAlarmStatus = alarmStatus;
};

// Method to get parameter alarm status
Parameter.prototype.getAlarmStatus = function () {
   return this.parameterAlarmStatus;
};

//
//   getUnitsOfMeasureFromParameterName  
//

Parameter.prototype.getUnitsOfMeasureFromParameterName = function () {

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
   else if (this.parameterName == "RR") {
      unitsOfMeasure = "rpm";
   }
   else if (this.parameterName == "TEMP") {
      if (homeScreen.getSettingValue("TEMPunits") == "C") {
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
//   getAlarmsOnFromParameterName  
//

Parameter.prototype.getAlarmsOnFromParameterName = function () {

   var alarmsOn = "";

   if (this.parameterName == "HR") {
      alarmsOn = homeScreen.getSettingValue("HRAlarmsOn");
   }
   else if (this.parameterName == "SPO2") {
      alarmsOn = homeScreen.getSettingValue("SPO2AlarmsOn");
   }
   else if (this.parameterName == "ETCO2") {
      alarmsOn = homeScreen.getSettingValue("ETCO2AlarmsOn");
   }
   else if (this.parameterName == "FICO2") {
      alarmsOn = homeScreen.getSettingValue("FICO2AlarmsOn");
   }
   else if (this.parameterName == "RRC") {
      alarmsOn = homeScreen.getSettingValue("RRCAlarmsOn");
   }
   else if (this.parameterName == "RR") {
      alarmsOn = homeScreen.getSettingValue("RRAlarmsOn");
   }
   else if (this.parameterName == "TEMP") {
      alarmsOn = homeScreen.getSettingValue("TEMPAlarmsOn");
   }
   else if (this.parameterName == "NIBP") {
      alarmsOn = homeScreen.getSettingValue("NIBPAlarmsOn");
   }

   return (alarmsOn);

}

//
//   getUpperLimitFromParameterName  
//

Parameter.prototype.getUpperLimitFromParameterName = function () {

   var upperLimit = "";

   if (this.parameterName == "HR") {
      upperLimit = homeScreen.getSettingValue("HRUL");
   }
   else if (this.parameterName == "SPO2") {
      upperLimit = homeScreen.getSettingValue("SPO2UL");
   }
   else if (this.parameterName == "ETCO2") {
      upperLimit = homeScreen.getSettingValue("ETCO2UL");
   }
   else if (this.parameterName == "FICO2") {
      upperLimit = homeScreen.getSettingValue("FICO2UL");
   }
   else if (this.parameterName == "RRC") {
      upperLimit = homeScreen.getSettingValue("RRCUL");
   }
   else if (this.parameterName == "RR") {
      upperLimit = homeScreen.getSettingValue("RRUL");
   }
   else if (this.parameterName == "TEMP") {
      upperLimit = homeScreen.getSettingValue("TEMPUL");
   }
   else if (this.parameterName == "NIBP") {
      upperLimit = homeScreen.getSettingValue("NIBPUL");
   }

   return (upperLimit);

}


//
//   getLowerLimitFromParameterName  
//

Parameter.prototype.getLowerLimitFromParameterName = function () {

   var lowerLimit = "";

   if (this.parameterName == "HR") {
      lowerLimit = homeScreen.getSettingValue("HRLL");
   }
   else if (this.parameterName == "SPO2") {
      lowerLimit = homeScreen.getSettingValue("SPO2LL");
   }
   else if (this.parameterName == "ETCO2") {
      lowerLimit = homeScreen.getSettingValue("ETCO2LL");
   }
   else if (this.parameterName == "FICO2") {
      lowerLimit = homeScreen.getSettingValue("FICO2LL");
   }
   else if (this.parameterName == "RRC") {
      lowerLimit = homeScreen.getSettingValue("RRCLL");
   }
   else if (this.parameterName == "RR") {
      lowerLimit = homeScreen.getSettingValue("RRLL");
   }
   else if (this.parameterName == "TEMP") {
      lowerLimit = homeScreen.getSettingValue("TEMPLL");
   }
   else if (this.parameterName == "NIBP") {
      lowerLimit = homeScreen.getSettingValue("NIBPLL");
   }

   return (lowerLimit);

}


//
//   getColorFromParameterName  
//

Parameter.prototype.getColorFromParameterName = function () {

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
   else if (this.parameterName == "RR") {
      color = window.colors.RRColor;
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
var ETCO2pointSize = 45;
var FICO2pointSize = 20;
var SPO2pointSize = 50;
var RRCpointSize = 30;
var RRpointSize = 30;
var TEMPpointSize = 30;
var NIBPpointSize = 45;

Parameter.prototype.getPointSizeFromParameterName = function () {

   var pointSize = 20;

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
   else if (this.parameterName == "RR") {
      pointSize = RRpointSize;
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

Parameter.prototype.getGraphicsDebugValueFromParameterName = function () {

   var graphicsDebugValue = "???";

   if (this.parameterName == "HR") {
      graphicsDebugValue = "333";
   }
   else if (this.parameterName == "SPO2") {
      graphicsDebugValue = "100";
   }
   else if (this.parameterName == "ETCO2") {
      graphicsDebugValue = "33.3";
   }
   else if (this.parameterName == "FICO2") {
      graphicsDebugValue = "33.3";
   }
   else if (this.parameterName == "RRC") {
      graphicsDebugValue = "133";
   }
   else if (this.parameterName == "RR") {
      graphicsDebugValue = "133";
   }
   else if (this.parameterName == "TEMP") {
      graphicsDebugValue = "122.2";
   }
   else if (this.parameterName == "NIBP") {
      graphicsDebugValue = "222 / 222 (222)";
   }

   return (graphicsDebugValue);

}

//
//   getLeftFromParameterName  
//

//Parameter.prototype.getLeftFromParameterName = function() {
function getLeftFromParameterName(parameterName) {

   var left = 0;

   if (parameterName == "HR") {
      left = homeScreen.HRParamAreaLeft;
   }
   else if (parameterName == "SPO2") {
      left = homeScreen.SPO2ParamAreaLeft;
   }
   else if (parameterName == "ETCO2") {
      left = homeScreen.ETCO2ParamAreaLeft;
   }
   else if (parameterName == "FICO2") {
      left = homeScreen.FICO2ParamAreaLeft;
   }
   else if (parameterName == "RRC") {
      left = homeScreen.RRCParamAreaLeft;
   }
   else if (parameterName == "RR") {
      left = homeScreen.RRParamAreaLeft;
   }
   else if (parameterName == "TEMP") {
      left = homeScreen.TEMPParamAreaLeft;
   }
   else if (parameterName == "NIBP") {
      left = homeScreen.NIBPParamAreaLeft;
   }

   return (left);

}

//
//   getTopFromParameterName  
//

//Parameter.prototype.getTopFromParameterName = function() {
function getTopFromParameterName(parameterName) {

   var top = 0;

   if (parameterName == "HR") {
      top = homeScreen.HRParamAreaTop;
   }
   else if (parameterName == "SPO2") {
      top = homeScreen.SPO2ParamAreaTop;
   }
   else if (parameterName == "ETCO2") {
      top = homeScreen.ETCO2ParamAreaTop;
   }
   else if (parameterName == "FICO2") {
      top = homeScreen.FICO2ParamAreaTop;
   }
   else if (parameterName == "RRC") {
      top = homeScreen.RRCParamAreaTop;
   }
   else if (parameterName == "RR") {
      top = homeScreen.RRParamAreaTop;
   }
   else if (parameterName == "TEMP") {
      top = homeScreen.TEMPParamAreaTop;
   }
   else if (parameterName == "NIBP") {
      top = homeScreen.NIBPParamAreaTop;
   }

   return (top);

}

//
//   getWidthFromParameterName  
//

//Parameter.prototype.getWidthFromParameterName = function() {
function getWidthFromParameterName(parameterName) {

   var width = 0;

   if (parameterName == "HR") {
      width = homeScreen.HRParamAreaWidth;
   }
   else if (parameterName == "SPO2") {
      width = homeScreen.SPO2ParamAreaWidth;
   }
   else if (parameterName == "ETCO2") {
      width = homeScreen.ETCO2ParamAreaWidth;
   }
   else if (parameterName == "FICO2") {
      width = homeScreen.FICO2ParamAreaWidth;
   }
   else if (parameterName == "RRC") {
      width = homeScreen.RRCParamAreaWidth;
   }
   else if (parameterName == "RR") {
      width = homeScreen.RRParamAreaWidth;
   }
   else if (parameterName == "TEMP") {
      width = homeScreen.TEMPParamAreaWidth;
   }
   else if (parameterName == "NIBP") {
      width = homeScreen.NIBPParamAreaWidth;
   }

   return (width);

}

//
//   getHeightFromParameterName  
//

//Parameter.prototype.getHeightFromParameterName = function() {
function getHeightFromParameterName(parameterName) {

   var height = 0;

   if (parameterName == "HR") {
      height = homeScreen.HRParamAreaHeight;
   }
   else if (parameterName == "SPO2") {
      height = homeScreen.SPO2ParamAreaHeight;
   }
   else if (parameterName == "ETCO2") {
      height = homeScreen.ETCO2ParamAreaHeight;
   }
   else if (parameterName == "FICO2") {
      height = homeScreen.FICO2ParamAreaHeight;
   }
   else if (parameterName == "RRC") {
      height = homeScreen.RRCParamAreaHeight;
   }
   else if (parameterName == "RR") {
      height = homeScreen.RRParamAreaHeight;
   }
   else if (parameterName == "TEMP") {
      height = homeScreen.TEMPParamAreaHeight;
   }
   else if (parameterName == "NIBP") {
      height = homeScreen.NIBPParamAreaHeight;
   }

   return (height);

}

//
//  drawParameterArea
//

Parameter.prototype.drawParameterArea = function () {

   textForegroundColor = this.getColorFromParameterName(this.parameterName);
   textBackgroundColor = window.colors.ZBLACK;

   var numericAlarmStatus = getNumericAlarmStatusFromAlarmStatus(this.parameterAlarmStatus);

   var needToColor = getNeedToColorFromAlarmStatus(numericAlarmStatus);

   if (needToColor) {
      textForegroundColor = getTextForegroundColorFromAlarmStatus(numericAlarmStatus, window.blinkState);
      textBackgroundColor = getTextBackgroundColorFromAlarmStatus(numericAlarmStatus, window.blinkState);
   }

   // displayCtx.fillStyle = this.textBackgroundColor;

   var left = getLeftFromParameterName(this.parameterName);
   var top = getTopFromParameterName(this.parameterName);
   var width = getWidthFromParameterName(this.parameterName);
   var height = getHeightFromParameterName(this.parameterName);

   // displayCtx.fillRect(left, top, width, height);

   var pointSize = this.getPointSizeFromParameterName(this.parameterName);

   units = this.getUnitsOfMeasureFromParameterName(this.parameterName);

   alarmsOn = this.getAlarmsOnFromParameterName(this.parameterName);

   upperLimit = this.getUpperLimitFromParameterName(this.parameterName);

   lowerLimit = this.getLowerLimitFromParameterName(this.parameterName);

   if (window.graphicsDebug) {
      var graphicsDebugValue = this.getGraphicsDebugValueFromParameterName(this.parameterName);
      drawGenericParameterArea(this.parameterName, units, graphicsDebugValue, "Yes", "333", "333", textForegroundColor, textBackgroundColor, "Arial", pointSize, left, top, width, height); // Draw the rectangle (x, y, width, height)
   }
   else {

      var redrawNeeded = 0 ;

      if (redrawHomeScreen) {
         redrawNeeded = 1 ;
      }

      // if (this.firstTimeDraw > 0) {
      //    this.firstTimeDraw -= 1 ;
      //    redrawNeeded = 1 ;
      // }

      if ((this.parameterName          != this.lastParameterName) ||
         (this.parameterValue          != this.lastParameterValue) ||
         (this.parameterAlarmStatus    != this.lastParameterAlarmStatus) ||

         (alarmsOn                     != this.lastAlarmsOn) ||
         (upperLimit                   != this.lastUpperLimit) ||
         (lowerLimit                   != this.lastLowerLimit) ||
         (textForegroundColor          != this.lastTextForegroundColor) ||
         (textBackgroundColor          != this.lastTextBackgroundColor)) {

         this.lastParameterName          = this.parameterName ;
         this.lastParameterValue         = this.parameterValue ;
         this.lastParameterAlarmStatus   = this.parameterAlarmStatus ;

         this.lastAlarmsOn               = alarmsOn ;
         this.lastUpperLimit             = upperLimit ;
         this.lastLowerLimit             = lowerLimit ;
         this.lastTextForegroundColor    = textForegroundColor ;
         this.lastTextBackgroundColor    = textBackgroundColor ;

         redrawNeeded = 1 ;

      }

      if (this.parameterName == "NIBP") {

         var NIBPtime = homeScreen.getSettingValue("NIBPtime") ;
         var NIBPAlarmSettingsString = homeScreen.getSettingValue("NIBPAlarmSettingsString") ;

         if (NIBPtime != this.NIBPtime)  {

            this.NIBPtime = NIBPtime ;

            redrawNeeded = 1 ;

         }

         if (NIBPAlarmSettingsString != this.NIBPAlarmSettingsString) {

            this.NIBPAlarmSettingsString = NIBPAlarmSettingsString ;

            redrawNeeded = 1 ;

         }

      }

      if (this.parameterName == "TEMP") {

         var TEMPtime = homeScreen.getSettingValue("TEMPtime") ;

         if (TEMPtime != this.TEMPtime) {

            this.TEMPtime = TEMPtime ;

            redrawNeeded = 1 ;

         }

      }

      //redrawNeeded = 1 ;

      if (redrawNeeded) {

         drawGenericParameterArea(this.parameterName, units, this.parameterValue, alarmsOn, upperLimit, lowerLimit, textForegroundColor, textBackgroundColor, "Arial", pointSize, left, top, width, height); // Draw the rectangle (x, y, width, height)

      }

   }

}


//
//  clearParameterArea
//

//Parameter.prototype.clearParameterArea = function() {
function clearParameterArea(parameterName) {

   var left = getLeftFromParameterName(parameterName);
   var top = getTopFromParameterName(parameterName);
   var width = getWidthFromParameterName(parameterName);
   var height = getHeightFromParameterName(parameterName);

   displayCtx.fillStyle = window.colors.ZBLACK;
   displayCtx.fillRect(left, top, width, height);

}



//
//  drawGenericParameterArea
//

// Base64 encoded string of your image data
const pauseAudioImageData = "data:image/png;base64,Qk32EgAAAAAAADYAAAAoAAAAKAAAACgAAAABABgAAAAAAMASAADDDgAAww4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

// Create an Image object
const pauseAudioImage = new Image();

// Set the source of the image
pauseAudioImage.src = pauseAudioImageData;

// var lastHRAlarmsOn = "" ;
// var lastSPO2AlarmsOn = "" ;
// var lastETCO2AlarmsOn = "" ;
// var lastFICO2AlarmsOn = "" ;
// var lastRRCAlarmsOn = "" ;
// var lastRRAlarmsOn = "" ;
// var lastTEMPAlarmsOn = "" ;
// var lastNIBPAlarmsOn = "" ;

function drawGenericParameterArea(label, units, value, alarmsOn, upperLimit, lowerLimit, textForegroundColor, textBackgroundColor, font, fontSize, x, y, width, height) {

   displayCtx.fillStyle = textBackgroundColor;

   // var left = getLeftFromParameterName(label);
   // var top = getTopFromParameterName(label);
   // var width = getWidthFromParameterName(labele);
   // var height = getHeightFromParameterName(tlabel);

   displayCtx.fillRect(x, y, width, height);



   // // Set the outline color
   // displayCtx.strokeStyle = window.colors.AreaSeparatorColor;
   // // Set the outline width
   // displayCtx.lineWidth = 1; 
   // // Draw the rectangle outline
   // displayCtx.strokeRect(x, y, width, height);

   // Set the text color
   displayCtx.fillStyle = textForegroundColor;

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

   //var labelRight= labelX + displayCtx.measureText(label).width;
   var labelRight= labelX + displayCtx.measureText("MMM").width;

   // Add units right below label in the upper left corner
   // Set the font and font size
   displayCtx.font = '9pt Arial'; // Reset to default font and size
   displayCtx.textAlign = 'left';
   displayCtx.fillText(units, unitsX, unitsY); // Adjust the positioning as needed

   if (label == "NIBP") {

      displayCtx.font = `${fontSize}pt ${font}`;
      displayCtx.textAlign = 'center';

      valueX = x + width * 40 / 100;
      valueY = y + height * 70 / 100;
      valueX = x + width * 40 / 100;
      valueY = y + height * 70 / 100;

      if (value.indexOf(" / ") == -1) {

         displayCtx.fillText(value, valueX, valueY); // Adjust the positioning as needed

      }
      else {

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

         displayCtx.font = `${fontSize + 5}pt ${font}`;
         displayCtx.textAlign = 'center';

         valueX = x + width * 50 / 100;

         displayCtx.fillText(sysDiaString, valueX, valueY); // Adjust the positioning as needed

         displayCtx.font = `${fontSize - 15}pt ${font}`;
         displayCtx.textAlign = 'left';

         valueX = x + width * 80 / 100;
         valueY = y + height * 70 / 100;

         displayCtx.fillText(meanString, valueX, valueY); // Adjust the positioning as needed

         var parameterTime = homeScreen.getSettingValue("NIBPtime");

         if (parameterTime.indexOf(":") != -1) {

            timeY = y + height * 80 / 100;

            displayCtx.font = '12pt Arial'; // Reset to default font and size
            displayCtx.textAlign = 'left';

            displayCtx.fillText(translateNumber(window.StringNumbers.SN_Last_time) + ": " + parameterTime, labelX, timeY); // Adjust the positioning as needed

         }

      }

   }
   else if (label == "TEMP") {

      valueY = y + height * 60 / 100;

      displayCtx.font = `${fontSize}pt ${font}`;
      displayCtx.textAlign = 'center';
      displayCtx.fillText(value, valueX, valueY); // Adjust the positioning as needed   

      var parameterTime = homeScreen.getSettingValue("TEMPtime");

      if (parameterTime.indexOf(":") != -1) {

         timeY = y + height * 85 / 100;

         displayCtx.font = '11pt Arial'; // Reset to default font and size
         displayCtx.textAlign = 'left';

         displayCtx.fillText(translateNumber(window.StringNumbers.SN_Last_time) + ": " + parameterTime, labelX, timeY); // Adjust the positioning as needed

      }

   }
   // else if (label == "FICO2") {

   //    valueY = y + height * 80 / 100;

   //    displayCtx.font = `${fontSize}pt ${font}`;
   //    displayCtx.textAlign = 'center';
   //    displayCtx.fillText(value, valueX, valueY); // Adjust the positioning as needed   

   // }
   else {

      displayCtx.font = `${fontSize}pt ${font}`;
      displayCtx.textAlign = 'center';
      displayCtx.fillText(value, valueX, valueY); // Adjust the positioning as needed  

   }

   // var redrawAlarmLimits = 0 ;

   // if ((label == "HR") && (alarmsOn != lastHRAlarmsOn)) {
   //    lastHRAlarmsOn = alarmsOn ;
   //    redrawAlarmLimits = 1 ;
   // }

   // if ((label == "SPO2") && (alarmsOn != lastSPO2AlarmsOn)) {
   //    lastSPO2AlarmsOn = alarmsOn ;
   //    redrawAlarmLimits = 1 ;
   // }

   // if ((label == "ETCO2") && (alarmsOn != lastETCO2AlarmsOn)) {
   //    lastETCO2AlarmsOn = alarmsOn ;
   //    redrawAlarmLimits = 1 ;
   // }

   // if ((label == "FICO2") && (alarmsOn != lastFICO2AlarmsOn)) {
   //    lastFICO2AlarmsOn = alarmsOn ;
   //    redrawAlarmLimits = 1 ;
   // }

   // if ((label == "RRC") && (alarmsOn != lastRRCAlarmsOn)) {
   //    lastRRCAlarmsOn = alarmsOn ;
   //    redrawAlarmLimits = 1 ;
   // }

   // if ((label == "RR") && (alarmsOn != lastRRAlarmsOn)) {
   //    lastRRAlarmsOn = alarmsOn ;
   //    redrawAlarmLimits = 1 ;
   // }

   // if ((label == "TEMP") && (alarmsOn != lastTEMPAlarmsOn)) {
   //    lastTEMPAlarmsOn = alarmsOn ;
   //    redrawAlarmLimits = 1 ;
   // }

   // if ((label == "NIBP") && (alarmsOn != lastNIBPAlarmsOn)) {
   //    lastNIBPAlarmsOn = alarmsOn ;
   //    redrawAlarmLimits = 1 ;
   // }

   // if (redrawAlarmLimits) {

      if (alarmsOn == "1") {

         if (label == "NIBP") {

            var alarmStringX = x + width * 55 / 100;
            var alarmStringY = y + 20;

            displayCtx.font = '10pt Arial'; // Reset to default font and size
            displayCtx.textAlign = 'left';
            displayCtx.fillText(homeScreen.getSettingValue("NIBPAlarmSettingsString"), alarmStringX, alarmStringY); // Adjust the positioning as needed

         }
         else {

            var upperLimitX = x + width * 90 / 100;
            var lowerLimitX = x + width * 90 / 100;

            var upperLimitY = y + 20;
            var lowerLimitY = y + 35;

            // Add limits in the upper right corner
            // Set the font and font size
            displayCtx.font = '9pt Arial'; // Reset to default font and size
            displayCtx.textAlign = 'right';
            displayCtx.fillText(upperLimit, upperLimitX, upperLimitY); // Adjust the positioning as needed
            displayCtx.fillText(lowerLimit, lowerLimitX, lowerLimitY); // Adjust the positioning as needed
         }

      }
      else {

         // display alarms off icon

         var alarmsOffIconX = x + width - 45;
         var alarmsOffIconY = y + 7;

         if (label == "NIBP") {
            alarmsOffIconX = labelRight + 10;
            alarmsOffIconY = y + 10;
         }

         const alarmsOffImageData = "data:image/png;base64,Qk1aAwAAAAAAAHYAAAAoAAAAIgAAACUAAAABAAQAAAAAAOQCAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAgAAAgAAAAICAAIAAAACAAIAAgIAAAMDAwACAgIAAAAD/AAD/AAAA//8A/wAAAP8A/wD//wAA////AACQAAAAAAAAAAAAAAAACQAAAAAACZkAAAAAAAAAAAAAAACZkAAAAACZmZAAAAAAAAAAAAAACZmZAAAAAAmZmQAAAAAAAAAAAACZmZAAAAAAAJmZkAAAAAAAAAAACZmZAAAAAAAACZmZAAAAAAAAAACZmZAAAAAAAAAAmZmQAAAAAAAACZmZAAAAAAAAB3d5mZl3d3d3d3eZmZd3cAAAAAAHd3eZmZd3d3d3eZmZd3dwAAAAAAB3AAmZmQAAAACZmZAAdwAAAAAAAHcAAJmZkAAACZmZAAB3AAAAAAAAB3AACZmZAACZmZAAB3AAAAAAAAAHcAAAmZmQCZmZAAAHcAAAAAAAAAB3AAAJmZmZmZAAAHcAAAAAAAAAAHcAAACZmZmZAAAAdwAAAAAAAAAAB3AAAAmZmZAAAAdwAAAAAAAAAAAHcAAACZmZkAAAB3AAB3AAAAAAAAB3AACZmZmZAAB3AAAHcAAAAAAAAHcACZmZmZmQAHcAAHcAAAAAAAAAB3CZmZAJmZkHcAAAdwAAAAAAAAAHeZmZAACZmZdwAAdwAAAAAAAAAACZmZAAAAmZmQAAB3AAAAAAAAAACZmZAAAAAJmZkAB3AAAAAAAAAACZmZAAAAAACZmZAHcAAAAAAAAACZmZcAAAAAAHmZmXcAAAAAAAAACZmZB3AAAAAHcJmZlwAAAAAAAACZmZAHcAAAAAdwCZmZAAAAAAAACZmZAAB3AAAAdwAAmZmQAAAAAACZmZAAAHcAAAB3AAB5mZkAAAAACZmZAAAAB3AAB3AAAHeZmZAAAAAAmZAAAAAHcAAHcAAHcAmZAAAAAAAJAAAAAAB3AHcAAAdwAJAAAAAAAAAAAAAAAHcAdwAAdwAAAAAAAAAAAAAAAAAAB3dwAAB3AAAAAAAAAAAAAAAAAAAHd3AAB3AAAAAAAAAAAAAAAAAAAAB3AAAHcAAAAAAAAAAAAAAAAAAAAHcAAAAAAAAAAAAAAA";
         const alarmsOffImage = new Image();
         alarmsOffImage.src = alarmsOffImageData;
         // Wait for the image to load
         alarmsOffImage.onload = function () {
            // Draw the image onto the canvas
            displayCtx.drawImage(alarmsOffImage, alarmsOffIconX, alarmsOffIconY);
         };

         //   pauseAudioImage.onload = function() {
         //       // Draw the image onto the canvas
         //       displayCtx.drawImage(pauseAudioImage, 0, 50);
         //   };

         //   audioPausedImage.onload = function() {
         //       // Draw the image onto the canvas
         //       displayCtx.drawImage(audioPausedImage, 0, 100);
         //   };

      }

   //}

}


//
//  drawParameterAreas
//

function drawParameterAreas() {

   var clearRESPParameterArea = 1;

   for (p = 0; p < homeScreen.parameters.length; p++) {

      var param = homeScreen.parameters[p];

      param.drawParameterArea();

      if ((param.parameterName == "RRC") || (param.parameterName == "RR")) {
         clearRESPParameterArea = 0;
      }

   }

   if (clearRESPParameterArea) {
      clearParameterArea("RR");
      return;
   }

}


//
//   setupParameters  I
//

function setupParameters(AMSParameters) {

   homeScreen.clearParameterList();

   var p = 0;
   for (p = 0; p < AMSParameters.length; p++) {

      const param = new Parameter(AMSParameters[p].parameterName);
      homeScreen.addParameter(param);

   }

   processParameterData(AMSParameters) ;  // not circular since parameters will match 

}


//
//   processParameterData
//

var parameterDataMessageCount = 0;

var parameterSetIndex = 0;

function processParameterData(AMSParameters) {

   parameterDataMessageCount++
   LOGEVENT(" ");
   LOGEVENTYELLOW('in processParameterData, count = ', parameterDataMessageCount);

   // Parse the JSON string into JavaScript object
   //const parameterData = JSON.parse(newParameterDataMessage);

   // See if the parameter setup is changing
   var somethingChanged = 0;
   var nParametersInAMSMessage = AMSParameters.length;
   if (nParametersInAMSMessage != homeScreen.parameters.length) {
      somethingChanged = 1;
   }
   else if (homeScreen.parameters.length == 0) {
      somethingChanged = 1;
   }
   else {
      var p;
      for (p = 0; p < AMSParameters.length; p++) {
         if (AMSParameters[p].parameterName != homeScreen.parameters[p].parameterName) {
            somethingChanged = 1;
            break;
         }
      }
   }

   if (somethingChanged) {
      setupParameters(AMSParameters);
   }
   else {

      // Update values from this message into home screen parameter objects
      var p;
      for (p = 0; p < AMSParameters.length; p++) {
         var foundMatch = 0;
         var hp;
         for (hp = 0; hp < homeScreen.parameters.length; hp++) {
            if (AMSParameters[p].parameterName == homeScreen.parameters[hp].parameterName) {
               foundMatch = 1;
               break;
            }
         }
         if (foundMatch) {

            homeScreen.parameters[hp].parameterName = AMSParameters[p].parameterName;
            homeScreen.parameters[hp].parameterValue = AMSParameters[p].parameterValue;
            homeScreen.parameters[hp].parameterAlarmStatus = AMSParameters[p].parameterAlarmStatus;

            if ((AMSParameters[p].parameterName == "NIBP") || (AMSParameters[p].parameterName == "TEMP")) {
               homeScreen.parameters[hp].parameterTime = AMSParameters[p].parameterTime;
            }

            homeScreen.parameters[hp].drawParameterArea();

         }

      }

   }

   return (somethingChanged);

}

