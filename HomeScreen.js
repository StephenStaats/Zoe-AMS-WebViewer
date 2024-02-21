//
//   Home screen
//

// Define the HomeScreen class globally
function HomeScreen(width, height) {

   this.width = width;
   this.height = height;

   this.left = 0;
   this.right = width;
   this.top = 0;
   this.bottom = height;

   this.headerWidth = 0;
   this.headerHeight = 0;
   this.headerLeft = 0;
   this.headerRight = 0;
   this.headerTop = 0;
   this.headerBottom = 0;

   this.waveformAreaWidth = 0;
   this.waveformAreaHeight = 0;
   this.waveformAreaLeft = 0;
   this.waveformAreaRight = 0;
   this.waveformAreaTop = 0;
   this.waveformAreaBottom = 0;

   this.rightParamAreaWidth = 0;
   this.rightParamAreaHeight = 0;
   this.rightParamAreaLeft = 0;
   this.rightParamAreaRight = 0;
   this.rightParamAreaTop = 0;
   this.rightParamAreaBottom = 0;

   this.bottomParamAreaWidth = 0;
   this.bottomParamAreaHeight = 0;
   this.bottomParamAreaLeft = 0;
   this.bottomParamAreaRight = 0;
   this.bottomParamAreaTop = 0;
   this.bottomParamAreaBottom = 0;

   this.messageAreaWidth = 0;
   this.messageAreaHeight = 0;
   this.messageAreaLeft = 0;
   this.messageAreaRight = 0;
   this.messageAreaTop = 0;
   this.messageAreaBottom = 0;

   this.eraseBarWidth = 10;

   this.waveforms = [];


}

HomeScreen.prototype.initializeAreas = function () {

   this.headerWidth = this.width;
   this.headerHeight = Math.round(this.height * 10 / 100);
   this.headerLeft = 0;
   this.headerRight = this.headerLeft + this.headerWidth;
   this.headerTop = 0;
   this.headerBottom = this.headerTop + this.headerHeight;

   this.waveformAreaWidth = Math.round(this.width * 60 / 100);
   this.waveformAreaHeight = Math.round(this.height * 60 / 100);
   this.waveformAreaLeft = 0;
   this.waveformAreaRight = this.waveformAreaLeft + this.waveformAreaWidth;
   this.waveformAreaTop = this.headerBottom;
   this.waveformAreaBottom = this.waveformAreaTop + this.waveformAreaHeight;

   this.middleParamAreaWidth = Math.round(this.width * 20 / 100);
   this.middleParamAreaHeight = this.waveformAreaHeight;
   this.middleParamAreaLeft = this.waveformAreaRight + 1;
   this.middleParamAreaRight = this.middleParamAreaLeft + this.middleParamAreaWidth;
   this.middleParamAreaTop = this.headerBottom;
   this.middleParamAreaBottom = this.middleParamAreaTop + this.middleParamAreaHeight;

   this.rightParamAreaWidth = this.width - this.waveformAreaWidth - this.middleParamAreaWidth - 4;
   this.rightParamAreaHeight = Math.round(this.height * 75 / 100);
   this.rightParamAreaLeft = this.middleParamAreaRight + 1;
   this.rightParamAreaRight = this.rightParamAreaLeft + this.rightParamAreaWidth;
   this.rightParamAreaTop = this.headerBottom;
   this.rightParamAreaBottom = this.rightParamAreaTop + this.rightParamAreaHeight;

   this.bottomParamAreaWidth = this.width - this.rightParamAreaWidth;
   this.bottomParamAreaHeight = this.rightParamAreaHeight - this.waveformAreaHeight;
   this.bottomParamAreaLeft = 0;
   this.bottomParamAreaRight = this.bottomParamAreaLeft + this.bottomParamAreaWidth;
   this.bottomParamAreaTop = this.waveformAreaBottom + 1;
   this.bottomParamAreaBottom = this.rightParamAreaBottom;

   this.messageAreaWidth = this.width;
   this.messageAreaLeft = 0;
   this.messageAreaRight = this.messageAreaLeft + this.messageAreaWidth;
   this.messageAreaTop = this.bottomParamAreaBottom + 1;
   this.messageAreaBottom = this.messageAreaTop + this.messageAreaHeight;
   this.messageAreaHeight = this.bottom;

   ///////////////////////////////////////////////

   this.HRParamAreaWidth = this.middleParamAreaWidth;
   this.HRParamAreaHeight = Math.round(this.middleParamAreaHeight * 45 / 100);
   this.HRParamAreaLeft = this.middleParamAreaLeft;
   this.HRParamAreaRight = this.middleParamAreaRight;
   this.HRParamAreaTop = this.middleParamAreaTop;
   this.HRParamAreaBottom = this.HRParamAreaTop + this.HRParamAreaHeight;

   this.ETCO2ParamAreaWidth = this.middleParamAreaWidth;
   this.ETCO2ParamAreaHeight = Math.round(this.middleParamAreaHeight * 40 / 100);
   this.ETCO2ParamAreaLeft = this.middleParamAreaLeft;
   this.ETCO2ParamAreaRight = this.middleParamAreaRight;
   this.ETCO2ParamAreaTop = this.HRParamAreaBottom + 1;
   this.ETCO2ParamAreaBottom = this.ETCO2ParamAreaTop + this.ETCO2ParamAreaHeight;

   this.FICO2ParamAreaWidth = this.middleParamAreaWidth;
   this.FICO2ParamAreaLeft = this.middleParamAreaLeft;
   this.FICO2ParamAreaRight = this.middleParamAreaRight;
   this.FICO2ParamAreaTop = this.ETCO2ParamAreaBottom + 1;
   this.FICO2ParamAreaBottom = this.bottomParamAreaTop - 1;
   this.FICO2ParamAreaHeight = this.FICO2ParamAreaBottom - this.FICO2ParamAreaTop;

   this.SPO2ParamAreaWidth = this.rightParamAreaWidth;
   this.SPO2ParamAreaHeight = this.HRParamAreaHeight;
   this.SPO2ParamAreaLeft = this.rightParamAreaLeft;
   this.SPO2ParamAreaRight = this.rightParamAreaRight;
   this.SPO2ParamAreaTop = this.HRParamAreaTop;
   this.SPO2ParamAreaBottom = this.HRParamAreaBottom;

   this.RRCParamAreaWidth = this.rightParamAreaWidth;
   this.RRCParamAreaHeight = this.ETCO2ParamAreaHeight;
   this.RRCParamAreaLeft = this.rightParamAreaLeft;
   this.RRCParamAreaRight = this.rightParamAreaRight;
   this.RRCParamAreaTop = this.ETCO2ParamAreaTop;
   this.RRCParamAreaBottom = this.ETCO2ParamAreaBottom;

   // this.blankParamAreaWidth = this.rightParamAreaWidth;
   // this.blankParamAreaHeight = this.FICO2ParamAreaHeight;
   // this.blankParamAreaLeft = this.rightParamAreaLeft;
   // this.blankParamAreaRight = this.rightParamAreaRight;
   // this.blankParamAreaTop = this.FICO2ParamAreaTop;
   // this.blankParamAreaBottom = this.FICO2ParamAreaBottom;

   this.TEMPParamAreaWidth = this.rightParamAreaWidth;
   this.TEMPParamAreaLeft = this.rightParamAreaLeft;
   this.TEMPParamAreaRight = this.rightParamAreaRight;
   this.TEMPParamAreaTop = this.FICO2ParamAreaTop;
   this.TEMPParamAreaBottom = this.rightParamAreaBottom;
   this.TEMPParamAreaHeight = this.TEMPParamAreaBottom - this.TEMPParamAreaTop;

   this.NIBPParamAreaLeft = this.bottomParamAreaLeft;
   this.NIBPParamAreaRight = this.bottomParamAreaRight - this.bottomParamAreaWidth * 15 / 100;
   this.NIBPParamAreaWidth = this.NIBPParamAreaRight - this.NIBPParamAreaLeft;
   this.NIBPParamAreaTop = this.bottomParamAreaTop;
   this.NIBPParamAreaBottom = this.bottomParamAreaBottom;
   this.NIBPParamAreaHeight = this.NIBPParamAreaBottom - this.NIBPParamAreaTop;

};

HomeScreen.prototype.clearWaveformList = function () {
   this.waveforms = [];
};

HomeScreen.prototype.addWaveform = function (wvf) {
   this.waveforms.push(wvf);
};

HomeScreen.prototype.getNWaveforms = function () {
   return (this.waveforms.length);
};


//
//   drawHomeScreenAreas
//

function drawHomeScreenAreas() {

   // Assuming this.ctx is a CanvasRenderingContext2D or a similar object

   displayCtx.fillStyle = window.colors.ZBLACK;
   displayCtx.clearRect(homeScreen.left, homeScreen.top, homeScreen.width, homeScreen.height);
   displayCtx.fillRect(homeScreen.left, homeScreen.top, homeScreen.width, homeScreen.height);

   displayCtx.fillStyle = window.colors.ZGRAY4;
   displayCtx.clearRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);
   displayCtx.fillRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);

   // displayCtx.fillStyle = "#ff0000";
   // displayCtx.clearRect(homeScreen.rightParamAreaLeft, homeScreen.rightParamAreaTop, homeScreen.rightParamAreaWidth, homeScreen.rightParamAreaHeight);
   // displayCtx.fillRect(homeScreen.rightParamAreaLeft, homeScreen.rightParamAreaTop, homeScreen.rightParamAreaWidth, homeScreen.rightParamAreaHeight);

   // displayCtx.fillStyle = "#ff5555";
   // displayCtx.clearRect(homeScreen.bottomParamAreaLeft, homeScreen.bottomParamAreaTop, homeScreen.bottomParamAreaWidth, homeScreen.bottomParamAreaHeight);
   // displayCtx.fillRect(homeScreen.bottomParamAreaLeft, homeScreen.bottomParamAreaTop, homeScreen.bottomParamAreaWidth, homeScreen.bottomParamAreaHeight);

   displayCtx.fillStyle = window.colors.ZGRAY5;
   displayCtx.clearRect(homeScreen.messageAreaLeft, homeScreen.messageAreaTop, homeScreen.messageAreaWidth, homeScreen.messageAreaHeight);
   displayCtx.fillRect(homeScreen.messageAreaLeft, homeScreen.messageAreaTop, homeScreen.messageAreaWidth, homeScreen.messageAreaHeight);

   drawParameterAreas();

   // if (window.graphicsDebug) {
   //    drawParameterArea(displayCtx, "HR", "333", window.colors.HRColor, "Arial", HRpointSize, homeScreen.HRParamAreaLeft, homeScreen.HRParamAreaTop, homeScreen.HRParamAreaWidth, homeScreen.HRParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "ETCO2", "32.3", window.colors.ETCO2Color, "Arial", ETCO2pointSize, homeScreen.ETCO2ParamAreaLeft, homeScreen.ETCO2ParamAreaTop, homeScreen.ETCO2ParamAreaWidth, homeScreen.ETCO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "FICO2", "13.3", window.colors.FICO2Color, "Arial", FICO2pointSize, homeScreen.FICO2ParamAreaLeft, homeScreen.FICO2ParamAreaTop, homeScreen.FICO2ParamAreaWidth, homeScreen.FICO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "SPO2", "100", window.colors.SPO2Color, "Arial", SPO2pointSize, homeScreen.SPO2ParamAreaLeft, homeScreen.SPO2ParamAreaTop, homeScreen.SPO2ParamAreaWidth, homeScreen.SPO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "RRC", "133", window.colors.RRCColor, "Arial", RRCpointSize, homeScreen.RRCParamAreaLeft, homeScreen.RRCParamAreaTop, homeScreen.RRCParamAreaWidth, homeScreen.RRCParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "TEMP", "103.3", window.colors.TEMPColor, "Arial", TEMPpointSize, homeScreen.TEMPParamAreaLeft, homeScreen.TEMPParamAreaTop, homeScreen.TEMPParamAreaWidth, homeScreen.TEMPParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "NIBP", "222 / 222 (222)", window.colors.NIBPColor, "Arial", NIBPpointSize, homeScreen.NIBPParamAreaLeft, homeScreen.NIBPParamAreaTop, homeScreen.NIBPParamAreaWidth, homeScreen.NIBPParamAreaHeight); // Draw the rectangle (x, y, width, height)
   // }
   // else {
   //    drawParameterArea(displayCtx, "HR", "80", window.colors.HRColor, "Arial", HRpointSize, homeScreen.HRParamAreaLeft, homeScreen.HRParamAreaTop, homeScreen.HRParamAreaWidth, homeScreen.HRParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "ETCO2", "32.2", window.colors.ETCO2Color, "Arial", ETCO2pointSize, homeScreen.ETCO2ParamAreaLeft, homeScreen.ETCO2ParamAreaTop, homeScreen.ETCO2ParamAreaWidth, homeScreen.ETCO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "FICO2", "1.5", window.colors.FICO2Color, "Arial", FICO2pointSize, homeScreen.FICO2ParamAreaLeft, homeScreen.FICO2ParamAreaTop, homeScreen.FICO2ParamAreaWidth, homeScreen.FICO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "SPO2", "98", window.colors.SPO2Color, "Arial", SPO2pointSize, homeScreen.SPO2ParamAreaLeft, homeScreen.SPO2ParamAreaTop, homeScreen.SPO2ParamAreaWidth, homeScreen.SPO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "RRC", "12", window.colors.RRCColor, "Arial", RRCpointSize, homeScreen.RRCParamAreaLeft, homeScreen.RRCParamAreaTop, homeScreen.RRCParamAreaWidth, homeScreen.RRCParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "TEMP", "98.6", window.colors.TEMPColor, "Arial", TEMPpointSize, homeScreen.TEMPParamAreaLeft, homeScreen.TEMPParamAreaTop, homeScreen.TEMPParamAreaWidth, homeScreen.TEMPParamAreaHeight); // Draw the rectangle (x, y, width, height)
   //    drawParameterArea(displayCtx, "NIBP", "120 / 80 (102)", window.colors.NIBPColor, "Arial", NIBPpointSize, homeScreen.NIBPParamAreaLeft, homeScreen.NIBPParamAreaTop, homeScreen.NIBPParamAreaWidth, homeScreen.NIBPParamAreaHeight); // Draw the rectangle (x, y, width, height)
   // }

}

//
//  drawParameterAreas
//

function drawParameterAreas() {

   drawHRParameterArea();
   drawETCO2ParameterArea();
   drawFICO2ParameterArea();
   drawSPO2ParameterArea();
   drawRRCParameterArea();
   drawTEMPParameterArea();
   drawNIBPParameterArea();

}


var HRpointSize = 50;
var ETCO2pointSize = 50;
var FICO2pointSize = 20;
var SPO2pointSize = 50;
var RRCpointSize = 50;
var TEMPpointSize = 30;
var NIBPpointSize = 45;

function drawHRParameterArea() {

   textForegroundColor = window.colors.HRColor ;
   textBackgroundColor = window.colors.ZBLACK;

   // var needToColor  = 1 ;
   // var alarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_HIGH ;
   var needToColor  = window.monitorNeedToColor ;
   var alarmStatus = window.monitorAlarmStatus ;

   LOGEVENTYELLOW("In drawHRParameterArea, needToColor = ", needToColor, " alarmStatus = ", alarmStatus);

   if (alarmStatus == window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_LOW) {
      var q = 0;
   }

   if (needToColor) {
      textForegroundColor = getTextForegroundColorFromAlarmStatus(alarmStatus, window.blinkState) ;
      textBackgroundColor = getTextBackgroundColorFromAlarmStatus(alarmStatus, window.blinkState) ;
   }

   displayCtx.fillStyle = textBackgroundColor;
   displayCtx.clearRect(homeScreen.HRParamAreaLeft, homeScreen.HRParamAreaTop, homeScreen.HRParamAreaWidth, homeScreen.HRParamAreaHeight);
   displayCtx.fillRect(homeScreen.HRParamAreaLeft, homeScreen.HRParamAreaTop, homeScreen.HRParamAreaWidth, homeScreen.HRParamAreaHeight);

   if (window.graphicsDebug) {
      drawParameterArea(displayCtx, "HR", "333", textForegroundColor, "Arial", HRpointSize, homeScreen.HRParamAreaLeft, homeScreen.HRParamAreaTop, homeScreen.HRParamAreaWidth, homeScreen.HRParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }
   else {
      drawParameterArea(displayCtx, "HR", "80", textForegroundColor, "Arial", HRpointSize, homeScreen.HRParamAreaLeft, homeScreen.HRParamAreaTop, homeScreen.HRParamAreaWidth, homeScreen.HRParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }

}

function drawETCO2ParameterArea() {

   if (window.graphicsDebug) {
      drawParameterArea(displayCtx, "ETCO2", "32.3", window.colors.ETCO2Color, "Arial", ETCO2pointSize, homeScreen.ETCO2ParamAreaLeft, homeScreen.ETCO2ParamAreaTop, homeScreen.ETCO2ParamAreaWidth, homeScreen.ETCO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }
   else {
      drawParameterArea(displayCtx, "ETCO2", "32.2", window.colors.ETCO2Color, "Arial", ETCO2pointSize, homeScreen.ETCO2ParamAreaLeft, homeScreen.ETCO2ParamAreaTop, homeScreen.ETCO2ParamAreaWidth, homeScreen.ETCO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }

}

function drawFICO2ParameterArea() {

   if (window.graphicsDebug) {
      drawParameterArea(displayCtx, "FICO2", "13.3", window.colors.FICO2Color, "Arial", FICO2pointSize, homeScreen.FICO2ParamAreaLeft, homeScreen.FICO2ParamAreaTop, homeScreen.FICO2ParamAreaWidth, homeScreen.FICO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }
   else {
      drawParameterArea(displayCtx, "FICO2", "1.5", window.colors.FICO2Color, "Arial", FICO2pointSize, homeScreen.FICO2ParamAreaLeft, homeScreen.FICO2ParamAreaTop, homeScreen.FICO2ParamAreaWidth, homeScreen.FICO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }

}

function drawSPO2ParameterArea() {

   if (window.graphicsDebug) {
      drawParameterArea(displayCtx, "SPO2", "100", window.colors.SPO2Color, "Arial", SPO2pointSize, homeScreen.SPO2ParamAreaLeft, homeScreen.SPO2ParamAreaTop, homeScreen.SPO2ParamAreaWidth, homeScreen.SPO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }
   else {
      drawParameterArea(displayCtx, "SPO2", "98", window.colors.SPO2Color, "Arial", SPO2pointSize, homeScreen.SPO2ParamAreaLeft, homeScreen.SPO2ParamAreaTop, homeScreen.SPO2ParamAreaWidth, homeScreen.SPO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }

}

function drawRRCParameterArea() {

   if (window.graphicsDebug) {
      drawParameterArea(displayCtx, "RRC", "133", window.colors.RRCColor, "Arial", RRCpointSize, homeScreen.RRCParamAreaLeft, homeScreen.RRCParamAreaTop, homeScreen.RRCParamAreaWidth, homeScreen.RRCParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }
   else {
      drawParameterArea(displayCtx, "RRC", "12", window.colors.RRCColor, "Arial", RRCpointSize, homeScreen.RRCParamAreaLeft, homeScreen.RRCParamAreaTop, homeScreen.RRCParamAreaWidth, homeScreen.RRCParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }

}

function drawTEMPParameterArea() {

   if (window.graphicsDebug) {
      drawParameterArea(displayCtx, "TEMP", "103.3", window.colors.TEMPColor, "Arial", TEMPpointSize, homeScreen.TEMPParamAreaLeft, homeScreen.TEMPParamAreaTop, homeScreen.TEMPParamAreaWidth, homeScreen.TEMPParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }
   else {
      drawParameterArea(displayCtx, "TEMP", "98.6", window.colors.TEMPColor, "Arial", TEMPpointSize, homeScreen.TEMPParamAreaLeft, homeScreen.TEMPParamAreaTop, homeScreen.TEMPParamAreaWidth, homeScreen.TEMPParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }

}

function drawNIBPParameterArea() {

   if (window.graphicsDebug) {
      drawParameterArea(displayCtx, "NIBP", "222 / 222 (222)", window.colors.NIBPColor, "Arial", NIBPpointSize, homeScreen.NIBPParamAreaLeft, homeScreen.NIBPParamAreaTop, homeScreen.NIBPParamAreaWidth, homeScreen.NIBPParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }
   else {
      drawParameterArea(displayCtx, "NIBP", "120 / 80 (102)", window.colors.NIBPColor, "Arial", NIBPpointSize, homeScreen.NIBPParamAreaLeft, homeScreen.NIBPParamAreaTop, homeScreen.NIBPParamAreaWidth, homeScreen.NIBPParamAreaHeight); // Draw the rectangle (x, y, width, height)
   }

}


// if (window.graphicsDebug) {
//    drawParameterArea(displayCtx, "HR", "333", window.colors.HRColor, "Arial", HRpointSize, homeScreen.HRParamAreaLeft, homeScreen.HRParamAreaTop, homeScreen.HRParamAreaWidth, homeScreen.HRParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "ETCO2", "32.3", window.colors.ETCO2Color, "Arial", ETCO2pointSize, homeScreen.ETCO2ParamAreaLeft, homeScreen.ETCO2ParamAreaTop, homeScreen.ETCO2ParamAreaWidth, homeScreen.ETCO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "FICO2", "13.3", window.colors.FICO2Color, "Arial", FICO2pointSize, homeScreen.FICO2ParamAreaLeft, homeScreen.FICO2ParamAreaTop, homeScreen.FICO2ParamAreaWidth, homeScreen.FICO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "SPO2", "100", window.colors.SPO2Color, "Arial", SPO2pointSize, homeScreen.SPO2ParamAreaLeft, homeScreen.SPO2ParamAreaTop, homeScreen.SPO2ParamAreaWidth, homeScreen.SPO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "RRC", "133", window.colors.RRCColor, "Arial", RRCpointSize, homeScreen.RRCParamAreaLeft, homeScreen.RRCParamAreaTop, homeScreen.RRCParamAreaWidth, homeScreen.RRCParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "TEMP", "103.3", window.colors.TEMPColor, "Arial", TEMPpointSize, homeScreen.TEMPParamAreaLeft, homeScreen.TEMPParamAreaTop, homeScreen.TEMPParamAreaWidth, homeScreen.TEMPParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "NIBP", "222 / 222 (222)", window.colors.NIBPColor, "Arial", NIBPpointSize, homeScreen.NIBPParamAreaLeft, homeScreen.NIBPParamAreaTop, homeScreen.NIBPParamAreaWidth, homeScreen.NIBPParamAreaHeight); // Draw the rectangle (x, y, width, height)
// }
// else {
//    drawParameterArea(displayCtx, "HR", "80", window.colors.HRColor, "Arial", HRpointSize, homeScreen.HRParamAreaLeft, homeScreen.HRParamAreaTop, homeScreen.HRParamAreaWidth, homeScreen.HRParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "ETCO2", "32.2", window.colors.ETCO2Color, "Arial", ETCO2pointSize, homeScreen.ETCO2ParamAreaLeft, homeScreen.ETCO2ParamAreaTop, homeScreen.ETCO2ParamAreaWidth, homeScreen.ETCO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "FICO2", "1.5", window.colors.FICO2Color, "Arial", FICO2pointSize, homeScreen.FICO2ParamAreaLeft, homeScreen.FICO2ParamAreaTop, homeScreen.FICO2ParamAreaWidth, homeScreen.FICO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "SPO2", "98", window.colors.SPO2Color, "Arial", SPO2pointSize, homeScreen.SPO2ParamAreaLeft, homeScreen.SPO2ParamAreaTop, homeScreen.SPO2ParamAreaWidth, homeScreen.SPO2ParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "RRC", "12", window.colors.RRCColor, "Arial", RRCpointSize, homeScreen.RRCParamAreaLeft, homeScreen.RRCParamAreaTop, homeScreen.RRCParamAreaWidth, homeScreen.RRCParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "TEMP", "98.6", window.colors.TEMPColor, "Arial", TEMPpointSize, homeScreen.TEMPParamAreaLeft, homeScreen.TEMPParamAreaTop, homeScreen.TEMPParamAreaWidth, homeScreen.TEMPParamAreaHeight); // Draw the rectangle (x, y, width, height)
//    drawParameterArea(displayCtx, "NIBP", "120 / 80 (102)", window.colors.NIBPColor, "Arial", NIBPpointSize, homeScreen.NIBPParamAreaLeft, homeScreen.NIBPParamAreaTop, homeScreen.NIBPParamAreaWidth, homeScreen.NIBPParamAreaHeight); // Draw the rectangle (x, y, width, height)
// }


function drawParameterArea(displayCtx, label, value, labelColor, font, fontSize, x, y, width, height) {

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

   var valueX = x + width * 50 / 100;
   var valueY = y + height * 70 / 100;

   // Add label in the upper left corner
   // Set the font and font size
   displayCtx.font = '11pt Arial'; // Reset to default font and size
   displayCtx.textAlign = 'left';
   displayCtx.fillText(label, labelX, labelY); // Adjust the positioning as needed

   // Add value in the center
   // Set the font and font size
   displayCtx.font = `${fontSize}pt ${font}`;
   displayCtx.textAlign = 'center';
   displayCtx.fillText(value, valueX, valueY); // Adjust the positioning as needed

   //     // Reset the styles to default values
   //     displayCtx.strokeStyle = '#000000'; // Reset to default black
   //     displayCtx.fillStyle = '#000000'; // Reset to default black
   //     displayCtx.font = '10px Arial'; // Reset to default font and size

}


//
//   drawHomeScreen
//

var frameCount = 0;

let fpsDisplay = document.getElementById('fps-display'); // Assuming you have an HTML element to display the frame rate

var redrawHomeScreen = 1;

let lastTime;
let elapsedTime;

function drawHomeScreen(timestamp) {

   if (redrawHomeScreen == 1) {
      redrawHomeScreen = 0;
      drawHomeScreenAreas();
   }

   if (!lastTime) {
      lastTime = timestamp;
   }

   if (timestamp) {

      elapsedTime = timestamp - lastTime;
      lastTime = timestamp;

      if (elapsedTime) {

         framesPerSecond = 1000 / elapsedTime; // Calculate frames per second
         fpsDisplay.textContent = `Frame Rate: ${Math.round(framesPerSecond)} FPS`;

         //drawMovingWaveforms(elapsedTime);
         drawWaveforms(elapsedTime);

      }

   }

   frameCount++;

   //if (frameCount < 300) {
   requestAnimationFrame(drawHomeScreen);
   //}

}
