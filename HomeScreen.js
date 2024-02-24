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

   this.parameters = [];

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
   this.messageAreaBottom = this.bottom;
   this.messageAreaHeight = this.messageAreaBottom - this.messageAreaTop;



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

HomeScreen.prototype.clearParameterList = function () {
   this.parameters = [];
};

HomeScreen.prototype.addParameter = function (param) {
   this.parameters.push(param);
};

HomeScreen.prototype.getNParameters = function () {
   return (this.parameters.length);
};


//
//   drawHomeScreenAreas
//

function drawHomeScreenAreas() {

   // Assuming this.ctx is a CanvasRenderingContext2D or a similar object

   displayCtx.fillStyle = window.colors.ZBLACK;
   //displayCtx.clearRect(homeScreen.left, homeScreen.top, homeScreen.width, homeScreen.height);
   displayCtx.fillRect(homeScreen.left, homeScreen.top, homeScreen.width, homeScreen.height);

   displayCtx.fillStyle = window.colors.ZGRAY4;
   //displayCtx.clearRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);
   displayCtx.fillRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);

   // displayCtx.fillStyle = "#ff0000";
   // displayCtx.clearRect(homeScreen.rightParamAreaLeft, homeScreen.rightParamAreaTop, homeScreen.rightParamAreaWidth, homeScreen.rightParamAreaHeight);
   // displayCtx.fillRect(homeScreen.rightParamAreaLeft, homeScreen.rightParamAreaTop, homeScreen.rightParamAreaWidth, homeScreen.rightParamAreaHeight);

   // displayCtx.fillStyle = "#ff5555";
   // displayCtx.clearRect(homeScreen.bottomParamAreaLeft, homeScreen.bottomParamAreaTop, homeScreen.bottomParamAreaWidth, homeScreen.bottomParamAreaHeight);
   // displayCtx.fillRect(homeScreen.bottomParamAreaLeft, homeScreen.bottomParamAreaTop, homeScreen.bottomParamAreaWidth, homeScreen.bottomParamAreaHeight);

   // displayCtx.fillStyle = window.colors.ZGRAY5;
   // displayCtx.clearRect(homeScreen.messageAreaLeft, homeScreen.messageAreaTop, homeScreen.messageAreaWidth, homeScreen.messageAreaHeight);
   // displayCtx.fillRect(homeScreen.messageAreaLeft, homeScreen.messageAreaTop, homeScreen.messageAreaWidth, homeScreen.messageAreaHeight);

   drawParameterAreas();

   drawBottomLineMessageArea() ;

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

//
//   drawBottomLineMessageArea
//

function drawBottomLineMessageArea() {

   var numericAlarmStatus = getNumericAlarmStatusFromAlarmStatus(window.bottomLineMessageAlarmStatus) ;

   var foregroundColor = getTextForegroundColorFromAlarmStatus(numericAlarmStatus) ;
   var backgroundColor = getTextBackgroundColorFromAlarmStatus(numericAlarmStatus);

   var messageX       = homeScreen.messageAreaLeft ;
   var messageY       = homeScreen.messageAreaTop ;
   var messageWidth   = homeScreen.messageAreaWidth ;

   messageY  = messageY + homeScreen.messageAreaHeight * 20 / 100;  // adjust since values in NIBP font can go below the parameter area

   var messageHeight  = homeScreen.messageAreaBottom - messageY ;

   displayCtx.fillStyle = backgroundColor;
   //displayCtx.clearRect(messageX, messageY, messageWidth, messageHeight);
   displayCtx.fillRect(messageX, messageY, messageWidth, messageHeight);

   var centerX  = messageX + messageWidth / 2;
   var centerY  = messageY + messageHeight / 2;

   displayCtx.fillStyle = foregroundColor;
   displayCtx.font = '20pt Arial';  
   displayCtx.textAlign = 'center';
   displayCtx.textBaseline = 'middle'; // Set text baseline to middle for vertical centering

   displayCtx.fillText(window.bottomLineMessage, centerX, centerY); // Adjust the positioning as needed

}
