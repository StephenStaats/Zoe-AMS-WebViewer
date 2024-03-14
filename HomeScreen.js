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

   this.waveformScaleAreaWidth = 0;
   this.waveformScaleAreaHeight = 0;
   this.waveformScaleAreaLeft = 0;
   this.waveformScaleAreaRight = 0;
   this.waveformScaleAreaTop = 0;
   this.waveformScaleAreaBottom = 0;

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

   this.dateTimeAreaWidth = 0;
   this.dateTimeAreaHeight = 0;
   this.dateTimeAreaLeft = 0;
   this.dateTimeAreaRight = 0;
   this.dateTimeAreaTop = 0;
   this.dateTimeAreaBottom = 0;

   this.messageAreaWidth = 0;
   this.messageAreaHeight = 0;
   this.messageAreaLeft = 0;
   this.messageAreaRight = 0;
   this.messageAreaTop = 0;
   this.messageAreaBottom = 0;

   this.eraseBarWidth = 10;

   this.waveforms = [];

   this.parameters = [];

   this.settings = [];

}

HomeScreen.prototype.initializeAreas = function () {


   var canvasWidth = this.width;
   var canvasHeight = this.height;

   this.headerWidth = canvasWidth;
   this.headerHeight = Math.round(canvasHeight * 10 / 100);
   this.headerLeft = 0;
   this.headerRight = this.headerLeft + this.headerWidth;
   this.headerTop = 0;
   this.headerBottom = this.headerTop + this.headerHeight;

   this.waveformScaleAreaWidth = Math.round(canvasWidth * 6 / 100);
   this.waveformScaleAreaHeight = Math.round(canvasHeight * 57 / 100);
   this.waveformScaleAreaLeft = 0;
   this.waveformScaleAreaRight = this.waveformScaleAreaLeft + this.waveformScaleAreaWidth;
   this.waveformScaleAreaTop = this.headerBottom;
   this.waveformScaleAreaBottom = this.waveformAreaTop + this.waveformAreaHeight;

   this.waveformAreaWidth = Math.round(canvasWidth * 54 / 100);
   this.waveformAreaHeight = Math.round(canvasHeight * 57 / 100);
   this.waveformAreaLeft = this.waveformScaleAreaRight;
   this.waveformAreaRight = this.waveformAreaLeft + this.waveformAreaWidth;
   this.waveformAreaTop = this.headerBottom;
   this.waveformAreaBottom = this.waveformAreaTop + this.waveformAreaHeight;

   this.bottomParamAreaWidth = this.waveformScaleAreaWidth + this.waveformAreaWidth;
   this.bottomParamAreaHeight = Math.round(canvasHeight * 20 / 100);
   this.bottomParamAreaLeft = 0;
   this.bottomParamAreaRight = this.bottomParamAreaLeft + this.bottomParamAreaWidth;
   this.bottomParamAreaTop = this.waveformAreaBottom + 1;
   this.bottomParamAreaBottom = this.bottomParamAreaTop + this.bottomParamAreaHeight;

   this.dateTimeAreaLeft = 0;
   this.dateTimeAreaRight = Math.round(canvasWidth * 15 / 100);;
   this.dateTimeAreaHeight = Math.round(canvasHeight * 13 / 100);
   this.dateTimeAreaWidth = this.dateTimeAreaRight - this.dateTimeAreaLeft;
   this.dateTimeAreaTop = this.bottomParamAreaBottom + 1;
   this.dateTimeAreaBottom = this.bottom;

   this.messageAreaLeft = this.dateTimeAreaRight + 1;
   this.messageAreaRight = this.headerRight;
   this.messageAreaWidth = this.messageAreaRight - this.messageAreaLeft;
   this.messageAreaHeight = Math.round(canvasHeight * 13 / 100);
   this.messageAreaTop = this.bottomParamAreaBottom + 1;
   this.messageAreaBottom = this.bottom;

   //this.middleParamAreaWidth = Math.round(canvasWidth * 20 / 100);
   this.middleParamAreaWidth = Math.round(canvasWidth * 20 / 100);
   this.middleParamAreaHeight = Math.round(canvasHeight * 77 / 100);
   this.middleParamAreaLeft = this.waveformAreaRight + 1;
   this.middleParamAreaRight = this.middleParamAreaLeft + this.middleParamAreaWidth;
   this.middleParamAreaTop = this.headerBottom;
   this.middleParamAreaBottom = this.middleParamAreaTop + this.middleParamAreaHeight;

   //this.rightParamAreaWidth = canvasWidth - this.waveformAreaWidth - this.middleParamAreaWidth - 4;
   this.rightParamAreaWidth = Math.round(canvasWidth * 20 / 100);
   this.rightParamAreaHeight = Math.round(canvasHeight * 77 / 100);
   this.rightParamAreaLeft = this.middleParamAreaRight + 1;
   this.rightParamAreaRight = this.rightParamAreaLeft + this.rightParamAreaWidth;
   this.rightParamAreaTop = this.headerBottom;
   this.rightParamAreaBottom = this.rightParamAreaTop + this.rightParamAreaHeight;




   ///////////////////////////////////////////////

   this.HRParamAreaWidth = this.middleParamAreaWidth;
   this.HRParamAreaHeight = Math.round(this.middleParamAreaHeight * 40 / 100);
   this.HRParamAreaLeft = this.middleParamAreaLeft;
   this.HRParamAreaRight = this.middleParamAreaRight;
   this.HRParamAreaTop = this.middleParamAreaTop;
   this.HRParamAreaBottom = this.HRParamAreaTop + this.HRParamAreaHeight;

   this.ETCO2ParamAreaWidth = this.middleParamAreaWidth;
   this.ETCO2ParamAreaHeight = Math.round(this.middleParamAreaHeight * 35 / 100);
   this.ETCO2ParamAreaLeft = this.middleParamAreaLeft;
   this.ETCO2ParamAreaRight = this.middleParamAreaRight;
   this.ETCO2ParamAreaTop = this.HRParamAreaBottom + 1;
   this.ETCO2ParamAreaBottom = this.ETCO2ParamAreaTop + this.ETCO2ParamAreaHeight;

   this.FICO2ParamAreaWidth = this.middleParamAreaWidth;
   this.FICO2ParamAreaHeight = this.ETCO2ParamAreaHeight / 2;
   this.FICO2ParamAreaLeft = this.middleParamAreaLeft;
   this.FICO2ParamAreaRight = this.middleParamAreaRight;
   this.FICO2ParamAreaTop = this.ETCO2ParamAreaBottom + 1;
   this.FICO2ParamAreaBottom = this.middleParamAreaBottom;
   //this.FICO2ParamAreaHeight = this.FICO2ParamAreaBottom - this.FICO2ParamAreaTop;
   this.FICO2ParamAreaBottom = this.FICO2ParamAreaTop + this.FICO2ParamAreaHeight;

   this.SPO2ParamAreaWidth = this.rightParamAreaWidth;
   this.SPO2ParamAreaHeight = this.HRParamAreaHeight;
   this.SPO2ParamAreaLeft = this.rightParamAreaLeft;
   this.SPO2ParamAreaRight = this.rightParamAreaRight;
   this.SPO2ParamAreaTop = this.HRParamAreaTop;
   this.SPO2ParamAreaBottom = this.HRParamAreaBottom;

   this.RRCParamAreaWidth = this.rightParamAreaWidth;
   //this.RRCParamAreaHeight = this.ETCO2ParamAreaHeight;
   this.RRCParamAreaHeight = this.ETCO2ParamAreaHeight / 2;
   this.RRCParamAreaLeft = this.rightParamAreaLeft;
   this.RRCParamAreaRight = this.rightParamAreaRight;
   this.RRCParamAreaTop = this.ETCO2ParamAreaTop;
   //this.RRCParamAreaBottom = this.ETCO2ParamAreaBottom;
   this.RRCParamAreaBottom = this.RRCParamAreaTop + this.RRCParamAreaHeight;

   this.RRParamAreaWidth = this.rightParamAreaWidth;
   //this.RRParamAreaHeight = this.ETCO2ParamAreaHeight;
   this.RRParamAreaHeight = this.ETCO2ParamAreaHeight / 2;
   this.RRParamAreaLeft = this.rightParamAreaLeft;
   this.RRParamAreaRight = this.rightParamAreaRight;
   this.RRParamAreaTop = this.ETCO2ParamAreaTop;
   //this.RRParamAreaBottom = this.ETCO2ParamAreaBottom;
   this.RRParamAreaBottom = this.RRParamAreaTop + this.RRParamAreaHeight;

   // this.blankParamAreaWidth = this.rightParamAreaWidth;
   // this.blankParamAreaHeight = this.FICO2ParamAreaHeight;
   // this.blankParamAreaLeft = this.rightParamAreaLeft;
   // this.blankParamAreaRight = this.rightParamAreaRight;
   // this.blankParamAreaTop = this.FICO2ParamAreaTop;
   // this.blankParamAreaBottom = this.FICO2ParamAreaBottom;

   this.TEMPParamAreaWidth = this.rightParamAreaWidth;
   this.TEMPParamAreaLeft = this.rightParamAreaLeft;
   this.TEMPParamAreaRight = this.rightParamAreaRight;
   this.TEMPParamAreaTop = this.RRCParamAreaBottom;
   //this.TEMPParamAreaBottom = this.rightParamAreaBottom;
   //this.TEMPParamAreaBottom = this.messageAreaTop - 1;
   //this.TEMPParamAreaHeight = this.TEMPParamAreaBottom - this.TEMPParamAreaTop;
   //this.TEMPParamAreaBottom = this.TEMPParamAreaTop + this.TEMPParamAreaHeight;
   this.TEMPParamAreaBottom = this.FICO2ParamAreaBottom;
   this.TEMPParamAreaHeight = this.TEMPParamAreaBottom - this.TEMPParamAreaTop;

   this.NIBPParamAreaLeft = this.bottomParamAreaLeft;
   //this.NIBPParamAreaRight = this.bottomParamAreaRight - this.bottomParamAreaWidth * 15 / 100;
   this.NIBPParamAreaRight = this.bottomParamAreaRight;
   this.NIBPParamAreaWidth = this.NIBPParamAreaRight - this.NIBPParamAreaLeft;
   this.NIBPParamAreaTop = this.bottomParamAreaTop + 1;
   //this.NIBPParamAreaBottom = this.bottomParamAreaBottom;
   this.NIBPParamAreaBottom = this.messageAreaTop - 1;
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

HomeScreen.prototype.clearParameterList = function () {
   this.parameters = [];
};

HomeScreen.prototype.addParameter = function (param) {
   this.parameters.push(param);
};

HomeScreen.prototype.getNParameters = function () {
   return (this.parameters.length);
};

HomeScreen.prototype.clearSettingList = function () {
   this.settings = [];
};

HomeScreen.prototype.addSetting = function (setting) {
   this.settings.push(setting);
};

HomeScreen.prototype.getNSettings = function () {
   return (this.settings.length);
};


// Method to get setting value by name
HomeScreen.prototype.getSettingValue = function (settingName) {

   var settingValue = "";

   var s;
   for (s = 0; s < homeScreen.settings.length; s++) {

      setting = homeScreen.settings[s];

      if (setting.settingName == settingName) {
         settingValue = setting.settingValue;
         break;
      }

   }

   return (settingValue);

};



//
//   drawHomeScreenAreas
//

function drawHomeScreenAreas() {

   // Assuming this.ctx is a CanvasRenderingContext2D or a similar object

   displayCtx.fillStyle = window.colors.ZBLACK;
   //displayCtx.clearRect(homeScreen.left, homeScreen.top, homeScreen.width, homeScreen.height);
   displayCtx.fillRect(homeScreen.left, homeScreen.top, homeScreen.width, homeScreen.height);

   // displayCtx.fillStyle = window.colors.ZGRAY4;
   // //displayCtx.clearRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);
   // displayCtx.fillRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);

   // displayCtx.fillStyle = "#ff0000";
   // displayCtx.clearRect(homeScreen.rightParamAreaLeft, homeScreen.rightParamAreaTop, homeScreen.rightParamAreaWidth, homeScreen.rightParamAreaHeight);
   // displayCtx.fillRect(homeScreen.rightParamAreaLeft, homeScreen.rightParamAreaTop, homeScreen.rightParamAreaWidth, homeScreen.rightParamAreaHeight);

   // displayCtx.fillStyle = "#ff5555";
   // displayCtx.clearRect(homeScreen.bottomParamAreaLeft, homeScreen.bottomParamAreaTop, homeScreen.bottomParamAreaWidth, homeScreen.bottomParamAreaHeight);
   // displayCtx.fillRect(homeScreen.bottomParamAreaLeft, homeScreen.bottomParamAreaTop, homeScreen.bottomParamAreaWidth, homeScreen.bottomParamAreaHeight);

   // displayCtx.fillStyle = window.colors.ZGRAY5;
   // displayCtx.clearRect(homeScreen.messageAreaLeft, homeScreen.messageAreaTop, homeScreen.messageAreaWidth, homeScreen.messageAreaHeight);
   // displayCtx.fillRect(homeScreen.messageAreaLeft, homeScreen.messageAreaTop, homeScreen.messageAreaWidth, homeScreen.messageAreaHeight);

   // displayCtx.fillStyle = window.colors.ZRED;
   // displayCtx.clearRect(homeScreen.waveformScaleAreaLeft, homeScreen.waveformScaleAreaTop, homeScreen.waveformScaleAreaWidth, homeScreen.waveformScaleAreaHeight);
   // displayCtx.fillRect(homeScreen.waveformScaleAreaLeft, homeScreen.waveformScaleAreaTop, homeScreen.waveformScaleAreaWidth, homeScreen.waveformScaleAreaHeight);

   drawTopLine();

   drawWaveformAreas();

   drawParameterAreas(1);

   drawBottomLineMessageArea();

}


//
//   drawHomeScreen
//

var frameCount = 0;

var redrawHomeScreen = 1;

let lastTime;
let elapsedTime;

function drawHomeScreen(timestamp) {

   if (redrawHomeScreen == 1) {
      drawHomeScreenAreas();
      redrawHomeScreen = 0;
   }

   if (!lastTime) {
      lastTime = timestamp;
   }

   if (timestamp) {

      elapsedTime = timestamp - lastTime;
      lastTime = timestamp;

      if (elapsedTime) {

         updateFramesPerSecond(elapsedTime);

         drawWaveforms(elapsedTime);

      }

   }

   frameCount++;

   //if (frameCount < 300) {
   requestAnimationFrame(drawHomeScreen);
   //}

}


//
//  drawTopLine
//

function drawTopLine() {

   var patientButtonLeftPercent = 5;
   var patientButtonRightPercent = 45;

   var monitorButtonLeftPercent = 50;
   var monitorButtonRightPercent = 90;

   var backArrowLeftPercent = 94;
   var backArrowRightPercent = 100;

   var patientButtonLeft = homeScreen.headerLeft + homeScreen.headerWidth * patientButtonLeftPercent / 100;
   var patientButtonRight = homeScreen.headerLeft + homeScreen.headerWidth * patientButtonRightPercent / 100;
   var patientButtonTop = homeScreen.headerTop;
   var patientButtonHeight = homeScreen.headerHeight;
   var patientButtonWidth = patientButtonRight - patientButtonLeft;

   var monitorButtonLeft = homeScreen.headerLeft + homeScreen.headerWidth * monitorButtonLeftPercent / 100;
   var monitorButtonRight = homeScreen.headerLeft + homeScreen.headerWidth * monitorButtonRightPercent / 100;
   var monitorButtonTop = homeScreen.headerTop;
   var monitorButtonHeight = homeScreen.headerHeight;
   var monitorButtonWidth = monitorButtonRight - monitorButtonLeft;

   var backArrowLeft = homeScreen.headerLeft + homeScreen.headerWidth * backArrowLeftPercent / 100;
   var backArrowRight = homeScreen.headerLeft + homeScreen.headerWidth * backArrowRightPercent / 100;
   var backArrowTop = homeScreen.headerTop;
   var backArrowHeight = homeScreen.headerHeight;
   var backArrowWidth = backArrowRight - backArrowLeft;

   displayCtx.fillStyle = window.colors.ZGRAY4;
   displayCtx.fillRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);

   displayCtx.fillStyle = window.colors.ZWHITE;
   displayCtx.font = '20pt Arial';
   displayCtx.textAlign = 'left';
   displayCtx.textBaseline = 'middle'; // Set text baseline to middle for vertical centering

   var textTop = patientButtonTop + patientButtonHeight * 55 / 100 ;
 
   let patientButtonLabel = "";

   var patientId = homeScreen.getSettingValue("patientId") ;
   var firstName = homeScreen.getSettingValue("patientFirstName") ;
   var lastName  = homeScreen.getSettingValue("patientLastName") ;

   var patientIdFormat = homeScreen.getSettingValue("patientIdFormat") ;

   if (patientIdFormat == "PID") {
      patientButtonLabel = patientId ; 
   }
   if (patientIdFormat == "LNFI") {
      if (firstName.length > 0) {
         patientButtonLabel = lastName + ", " + firstName.charAt(0) + "." ;
      }
      else {
         patientButtonLabel = lastName  ;
      }
   }
   else if (patientIdFormat == "FNLI") {
      if (lastName.length > 0) {
         patientButtonLabel = firstName + " " + lastName.charAt(0) + "." ;
      }
      else {
         patientButtonLabel = firstName  ;
      }
   }
   else if (patientIdFormat == "blank") {
      patientButtonLabel = "";
   }

   let monitorButtonLabel = "";

   var monitorId = homeScreen.getSettingValue("monitorId") ;
   var clinicianId = homeScreen.getSettingValue("clinicianId") ;

   var monitorIdFormat = homeScreen.getSettingValue("monitorIdFormat") ;

   if (monitorIdFormat == "MID") {
      monitorButtonLabel = monitorId ; 
   }
   else if (monitorIdFormat == "CID") {
      monitorButtonLabel = clinicianId ; 
   }
   else {
      monitorButtonLabel = "";
   }

   if (patientIdFormat != "blank") {
      if (patientButtonLabel.length == 0) {
         patientButtonLabel = translateNumber(window.StringNumbers.SN_Patient) + ":" ;
      }
      fitText(patientButtonLabel, window.colors.ZWHITE, 'Arial', 20, patientButtonLeft, textTop, patientButtonWidth, patientButtonHeight, 'left', 'middle');
   }

   if (monitorButtonLabel.length == 0) {
      if (monitorIdFormat == "MID") {
         monitorButtonLabel = translateNumber(window.StringNumbers.SN_Monitor) + ":" ;
      }
      else {
         monitorButtonLabel = translateNumber(window.StringNumbers.SN_Clinician) + ":" ;
      }
   }
   fitText(monitorButtonLabel, window.colors.ZWHITE, 'Arial', 20, monitorButtonLeft, textTop, monitorButtonWidth, monitorButtonHeight, 'left', 'middle');

   drawBackArrow(backArrowLeft, backArrowTop, backArrowWidth, backArrowHeight, backArrowHeight * 50 / 100);

}

//
//  drawBackArrow
//

var backArrowTouchAreaLeft = 0;
var backArrowTouchAreaTop = 0;
var backArrowTouchAreaWidth = 0;
var backArrowTouchAreaHeight = 0;

function drawBackArrow(x, y, w, h, size) {

   backArrowTouchAreaLeft = x - w / 2;
   backArrowTouchAreaTop = y;
   backArrowTouchAreaWidth = w + 2 / 2;
   backArrowTouchAreaHeight = h + h / 2;

   // Fill background with gray
   displayCtx.fillStyle = window.colors.ZGRAY4; // Gray fill color
   displayCtx.fillRect(x, y, w, h);

   // Draw white arrow
   displayCtx.fillStyle = window.colors.ZWHITE; // White fill color

   displayCtx.beginPath();
   displayCtx.moveTo(x + w / 5 + size / 2, y + h / 5); // Top point
   displayCtx.lineTo(x + w / 5, y + h / 5 + size / 2); // Bottom left
   displayCtx.lineTo(x + w / 5 + size / 2, y + h / 5 + size); // Bottom right
   displayCtx.moveTo(x + w / 5 + size / 2, y + h / 5); // Back to top point
   displayCtx.lineTo(x + w / 5 + size, y + h / 5 + size / 2); // Right arrow line
   displayCtx.closePath();
   displayCtx.fill(); // Fill the arrow

}



//
//   drawBottomLineMessageArea
//

// Base64 encoded string of your image data
//const pauseAudioImageData = "data:image/png;base64,Qk32EgAAAAAAADYAAAAoAAAAKAAAACgAAAABABgAAAAAAMASAADDDgAAww4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
//Create an Image object
//const pauseAudioImage = new Image();
//Set the source of the image
//pauseAudioImage.src = pauseAudioImageData;

var lastAlarmsSilenced = -1;

function drawBottomLineMessageArea() {

   //var numericAlarmStatus = getNumericAlarmStatusFromAlarmStatus(window.bottomLineMessageAlarmStatus);
   var numericAlarmStatus = getNumericAlarmStatusFromAlarmStatus(homeScreen.getSettingValue("bottomLineMessageAlarmStatus"));

   var foregroundColor = getTextForegroundColorFromAlarmStatus(numericAlarmStatus, window.blinkState);
   var backgroundColor = getTextBackgroundColorFromAlarmStatus(numericAlarmStatus, window.blinkState);

   var messageX = homeScreen.messageAreaLeft;
   var messageY = homeScreen.messageAreaTop;
   var messageWidth = homeScreen.messageAreaWidth;
   var messageHeight = homeScreen.messageAreaHeight;

   if (window.alarmsSilenced == 1) {

      if (window.alarmsSilenced != lastAlarmsSilenced) {

         displayCtx.fillStyle = window.colors.ZBLACK;
         displayCtx.fillRect(messageX, messageY, 60, messageHeight);

         var audioPausedIconX = messageX + 10;
         var audioPausedIconY = messageY + (messageHeight - 40) / 2;

         const audioPausedImageData = "data:image/png;base64,Qk32EgAAAAAAADYAAAAoAAAAKAAAACgAAAABABgAAAAAAMASAADDDgAAww4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAD/AAD/AAD/wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAD/AAD/AAD/wMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAD/wMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAD/wMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAAAAAAAAAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAAAAAAAAAD/AAD/AAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAAAAAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAAAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/wMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/wMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/wMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/wMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/AAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMDAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
         const audioPausedImage = new Image();
         audioPausedImage.src = audioPausedImageData;

         audioPausedImage.onload = function () {
            // Draw the image onto the canvas
            displayCtx.drawImage(audioPausedImage, audioPausedIconX, audioPausedIconY);
         };

      }

      messageX += 60;
      messageWidth -= 60;

   }

   lastAlarmsSilenced = window.alarmsSilenced;

   var messageHeight = homeScreen.messageAreaBottom - messageY;

   displayCtx.fillStyle = backgroundColor;
   displayCtx.fillRect(messageX, messageY, messageWidth, messageHeight);

   var centerX = messageX + messageWidth / 2;
   var centerY = messageY + messageHeight / 2;

   displayCtx.fillStyle = foregroundColor;
   displayCtx.font = '20pt Arial';
   displayCtx.textAlign = 'center';
   displayCtx.textBaseline = 'middle'; // Set text baseline to middle for vertical centering

   //displayCtx.fillText(window.bottomLineMessage, centerX, centerY); // Adjust the positioning as needed
   displayCtx.fillText(homeScreen.getSettingValue("bottomLineMessage"), centerX, centerY); // Adjust the positioning as needed

}


//
//   updateClock
//

function updateClock() {

   var messageX = homeScreen.messageAreaLeft;
   var messageY = homeScreen.messageAreaTop;
   var messageWidth = homeScreen.messageAreaWidth;

   var messageHeight = homeScreen.messageAreaBottom - messageY;

   displayCtx.fillStyle = window.colors.ZBLACK;
   displayCtx.fillRect(homeScreen.dateTimeAreaLeft, homeScreen.dateTimeAreaTop, homeScreen.dateTimeAreaWidth, homeScreen.dateTimeAreaHeight);

   var dateLeft = homeScreen.dateTimeAreaLeft;
   var dateTop = homeScreen.dateTimeAreaTop + homeScreen.dateTimeAreaHeight * 5 / 100;;
   var dateWidth = homeScreen.dateTimeAreaWidth;
   var dateHeight = homeScreen.dateTimeAreaHeight * 30 / 100;

   var timeLeft = homeScreen.dateTimeAreaLeft;
   var timeTop = homeScreen.dateTimeAreaTop + homeScreen.dateTimeAreaHeight * 35 / 100;;
   var timeWidth = homeScreen.dateTimeAreaWidth;
   var timeHeight = homeScreen.dateTimeAreaHeight * 60 / 100;

   displayCtx.fillStyle = window.colors.ZWHITE;
   displayCtx.font = '12pt Arial';
   displayCtx.textAlign = 'center';
   displayCtx.textBaseline = 'middle';

   // Create a new Date object without any parameters
   const currentDate = new Date();

   // Get the current month, day, and year
   const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to match the standard month numbering
   const day = currentDate.getDate().toString().padStart(2, '0');
   const fullYear = currentDate.getFullYear();
   const year = currentDate.getFullYear().toString().slice(-2); // Get last two digits of the year

   let formattedDate = "";

   var dateFormat = homeScreen.getSettingValue("dateFormat") ;

   if (dateFormat == "MMDDYY") {
      formattedDate = `${month}/${day}/${year}`;
   }
   else if (dateFormat == "DDMMYYYY") {
      formattedDate = `${day}/${month}/${fullYear}`;
   }
   else if (dateFormat == "MMDDYYYY") {
      formattedDate = `${month}/${day}/${fullYear}`;
   }
   else if (dateFormat == "YYYYMMDD") {
      formattedDate = `${fullYear}/${month}/${day}`;
   }
 

   // Get the current hours and minutes
   const hours = currentDate.getHours().toString().padStart(2, '0');
   const minutes = currentDate.getMinutes().toString().padStart(2, '0');
   const seconds = currentDate.getSeconds().toString().padStart(2, '0');

   // Format the time as HH:MM
   const formattedTime = `${hours}:${minutes}:${seconds}`;

   displayCtx.fillText(formattedDate, dateLeft + dateWidth / 2, dateTop + dateHeight / 2); // Adjust the positioning as needed

   displayCtx.font = '18pt Arial';

   displayCtx.fillText(formattedTime, timeLeft + timeWidth / 2, timeTop + timeHeight / 2); // Adjust the positioning as needed

}


// Add event listener for mouse click
displayCanvas.addEventListener('click', handleClick);

// Add event listener for touch events
displayCanvas.addEventListener('touchstart', handleTouch);

// Function to handle touch events
function handleTouch(event) {
   event.preventDefault();
   const rect = displayCanvas.getBoundingClientRect();
   const touch = event.touches[0];
   const x = touch.clientX - rect.left;
   const y = touch.clientY - rect.top;
   LOGEVENTMAGENTA("Touch at (" + x + ", " + y + ")");
   respondToMouseClickOrTouchAt(x, y);
}

function rotateX(x, y, degrees) {
   var radians = degrees * (Math.PI / 180);
   var cosRadians = Math.cos(radians) ;
   var sinRadians = Math.sin(radians) ;
   var rotatedX = x * cosRadians - y * sinRadians ;
   return(rotatedX) ;
}

function rotateY(x, y, degrees) {
   var radians = degrees * (Math.PI / 180);
   var cosRadians = Math.cos(radians) ;
   var sinRadians = Math.sin(radians) ;
   var rotatedY = x * sinRadians + y * cosRadians ;
   return(rotatedY) ;
}

// Function to handle mouse click
function handleClick(event) {
   const rect = displayCanvas.getBoundingClientRect();
   const x = event.clientX - rect.left;
   const y = event.clientY - rect.top;
   LOGEVENTMAGENTA("Mouse click at (" + x + ", " + y + ")");
   respondToMouseClickOrTouchAt(x, y);
}




