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

   this.headerWidth = this.width;
   this.headerHeight = Math.round(this.height * 10 / 100);
   this.headerLeft = 0;
   this.headerRight = this.headerLeft + this.headerWidth;
   this.headerTop = 0;
   this.headerBottom = this.headerTop + this.headerHeight;

   this.waveformScaleAreaWidth = Math.round(this.width * 5 / 100);
   this.waveformScaleAreaHeight = Math.round(this.height * 60 / 100);
   this.waveformScaleAreaLeft = 0;
   this.waveformScaleAreaRight = this.waveformScaleAreaLeft + this.waveformScaleAreaWidth;
   this.waveformScaleAreaTop = this.headerBottom;
   this.waveformScaleAreaBottom = this.waveformAreaTop + this.waveformAreaHeight;

   this.waveformAreaWidth = Math.round(this.width * 55 / 100);
   this.waveformAreaHeight = Math.round(this.height * 60 / 100);
   //this.waveformAreaHeight = Math.round(this.height * 64 / 100);
   this.waveformAreaLeft = this.waveformScaleAreaRight;
   this.waveformAreaRight = this.waveformAreaLeft + this.waveformAreaWidth;
   this.waveformAreaTop = this.headerBottom;
   this.waveformAreaBottom = this.waveformAreaTop + this.waveformAreaHeight;

   this.bottomParamAreaWidth = this.waveformAreaWidth;
   this.bottomParamAreaHeight = Math.round(this.height * 17 / 100);
   this.bottomParamAreaLeft = 0;
   this.bottomParamAreaRight = this.bottomParamAreaLeft + this.bottomParamAreaWidth;
   this.bottomParamAreaTop = this.waveformAreaBottom + 1;
   this.bottomParamAreaBottom = this.bottomParamAreaTop + this.bottomParamAreaHeight;

   this.messageAreaWidth = this.width;
   this.messageAreaHeight = Math.round(this.height * 13 / 100);
   this.messageAreaLeft = 0;
   this.messageAreaRight = this.messageAreaLeft + this.messageAreaWidth;
   this.messageAreaTop = this.bottomParamAreaBottom + 1;
   this.messageAreaBottom = this.bottom;

   this.middleParamAreaWidth = Math.round(this.width * 20 / 100);
   this.middleParamAreaHeight = Math.round(this.height * 70 / 100);
   this.middleParamAreaLeft = this.waveformAreaRight + 1;
   this.middleParamAreaRight = this.middleParamAreaLeft + this.middleParamAreaWidth;
   this.middleParamAreaTop = this.headerBottom;
   this.middleParamAreaBottom = this.middleParamAreaTop + this.middleParamAreaHeight;

   this.rightParamAreaWidth = this.width - this.waveformAreaWidth - this.middleParamAreaWidth - 4;
   this.rightParamAreaHeight = Math.round(this.height * 77 / 100);
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
   this.FICO2ParamAreaLeft = this.middleParamAreaLeft;
   this.FICO2ParamAreaRight = this.middleParamAreaRight;
   this.FICO2ParamAreaTop = this.ETCO2ParamAreaBottom + 1;
   this.FICO2ParamAreaBottom = this.middleParamAreaBottom;
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
   //this.TEMPParamAreaBottom = this.rightParamAreaBottom;
   this.TEMPParamAreaBottom = this.messageAreaTop - 1;
   this.TEMPParamAreaHeight = this.TEMPParamAreaBottom - this.TEMPParamAreaTop;

   this.NIBPParamAreaLeft = this.bottomParamAreaLeft;
   //this.NIBPParamAreaRight = this.bottomParamAreaRight - this.bottomParamAreaWidth * 15 / 100;
   this.NIBPParamAreaRight = this.bottomParamAreaRight ;
   this.NIBPParamAreaWidth = this.NIBPParamAreaRight - this.NIBPParamAreaLeft;
   this.NIBPParamAreaTop = this.bottomParamAreaTop;
   //this.NIBPParamAreaBottom = this.bottomParamAreaBottom;
   this.NIBPParamAreaBottom = t= this.messageAreaTop - 1;
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
HomeScreen.prototype.getSettingValue = function(settingName) {

   var settingValue = "" ;

   var s;
   for (s = 0; s < homeScreen.settings.length; s++) {

      setting = homeScreen.settings[s];

      if (setting.settingName == settingName) {
         settingValue = setting.settingValue;
         break ;
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

   displayCtx.fillStyle = window.colors.ZRED;
   displayCtx.clearRect(homeScreen.waveformScaleAreaLeft, homeScreen.waveformScaleAreaTop, homeScreen.waveformScaleAreaWidth, homeScreen.waveformScaleAreaHeight);
   displayCtx.fillRect(homeScreen.waveformScaleAreaLeft, homeScreen.waveformScaleAreaTop, homeScreen.waveformScaleAreaWidth, homeScreen.waveformScaleAreaHeight);

   drawTopLine() ;

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
//  fitText
//

// no / Roboto: Designed by Google, Roboto is a sans-serif typeface that is widely used for its versatility and readability.
// Open Sans: Another Google font, Open Sans is a humanist sans-serif typeface known for its clean and modern appearance.
// Lato: Lato is a sans-serif typeface designed by Łukasz Dziedzic. It's known for its versatility and readability, making it suitable for various types of projects.
// no / Montserrat: Montserrat is a geometric sans-serif typeface inspired by the urban typography of Montserrat, a neighborhood in Buenos Aires. It's widely used for its modern and minimalist style.
// Source Sans Pro: Developed by Adobe, Source Sans Pro is a sans-serif typeface designed for user interfaces. It's known for its clean and elegant appearance.
// Nunito: Nunito is a rounded sans-serif typeface designed by Vernon Adams. It's characterized by its friendly and approachable look, making it suitable for various design purposes.
// Helvetica Neue: While not freely available like Google Fonts, Helvetica Neue is a widely recognized and popular sans-serif typeface known for its clean and timeless design.
// Georgia: Georgia is a serif typeface designed by Matthew Carter and is commonly used for its readability, particularly in body text on the web.
// Times New Roman: Another classic serif typeface, Times New Roman, is widely available on most systems and is often used in print and digital media for its readability and formal appearance.
// no / Verdana: Verdana is a sans-serif typeface designed by Matthew Carter for Microsoft. It's known for its clarity and readability, particularly at smaller sizes, making it popular for web content.


function fitText(textToFit, textColor, textFontTypeface, textPointSize, textLeft, textTop, textWidth, textHeight, textAlign, textBaseline) {

   displayCtx.fillStyle = textColor;

   let fontSizePt = textPointSize; // Initial font size in points
   var fontSizePx = fontSizePt * 1.33; // Convert points to pixels
   displayCtx.font = fontSizePx + 'px ' + textFontTypeface;

   // Adjust font size to fit text in rectangle
   while (displayCtx.measureText(textToFit).width > textWidth || fontSizePx > textHeight) {
      fontSizePx--;
      displayCtx.font = fontSizePx + 'px ' + textFontTypeface;
   }

   displayCtx.textAlign = textAlign;
   displayCtx.textBaseline = textBaseline;  

   // Draw text
   displayCtx.fillText(textToFit, textLeft, textTop);
 
}


//
//  drawTopLine
//

function drawTopLine() {
 
   var patientNameLabelLeftPercent  =   2 ;
   var patientNameLabelRightPercent =  12 ;

   var patientNameValueLeftPercent  =  13 ;
   var patientNameValueRightPercent =  43 ;

   var patientIDLabelLeftPercent    =  48 ;
   var patientIDLabelRightPercent   =  53 ;

   var patientIDValueLeftPercent    =  54 ;
   var patientIDValueRightPercent   =  66 ;

   var monitorIDLabelLeftPercent    =  71 ;
   var monitorIDLabelRightPercent   =  83 ;

   var monitorIDValueLeftPercent    =  84 ;
   var monitorIDValueRightPercent   =  98 ;

   var patientNameLabelLeft  = homeScreen.headerLeft + homeScreen.headerWidth * patientNameLabelLeftPercent / 100 ;
   var patientNameLabelRight = homeScreen.headerLeft + homeScreen.headerWidth * patientNameLabelRightPercent / 100 ;
   var patientNameLabelTop = homeScreen.headerTop ;
   var patientNameLabelHeight = homeScreen.headerHeight ; 
   var patientNameLabelWidth = patientNameLabelRight - patientNameLabelLeft ; 

   var patientNameValueLeft  = homeScreen.headerLeft + homeScreen.headerWidth * patientNameValueLeftPercent / 100 ;
   var patientNameValueRight = homeScreen.headerLeft + homeScreen.headerWidth * patientNameValueRightPercent / 100 ;
   var patientNameValueTop = homeScreen.headerTop ;
   var patientNameValueHeight = homeScreen.headerHeight ; 
   var patientNameValueWidth = patientNameValueRight - patientNameValueLeft ; 

   var patientIDLabelLeft  = homeScreen.headerLeft + homeScreen.headerWidth * patientIDLabelLeftPercent / 100 ;
   var patientIDLabelRight = homeScreen.headerLeft + homeScreen.headerWidth * patientIDLabelRightPercent / 100 ;
   var patientIDLabelTop = homeScreen.headerTop ;
   var patientIDLabelHeight = homeScreen.headerHeight ; 
   var patientIDLabelWidth = patientIDLabelRight - patientIDLabelLeft ; 

   var patientIDValueLeft  = homeScreen.headerLeft + homeScreen.headerWidth * patientIDValueLeftPercent / 100 ;
   var patientIDValueRight = homeScreen.headerLeft + homeScreen.headerWidth * patientIDValueRightPercent / 100 ;
   var patientIDValueTop = homeScreen.headerTop ;
   var patientIDValueHeight = homeScreen.headerHeight ; 
   var patientIDValueWidth = patientIDValueRight - patientIDValueLeft ; 

   var monitorIDLabelLeft  = homeScreen.headerLeft + homeScreen.headerWidth * monitorIDLabelLeftPercent / 100 ;
   var monitorIDLabelRight = homeScreen.headerLeft + homeScreen.headerWidth * monitorIDLabelRightPercent / 100 ;
   var monitorIDLabelTop = homeScreen.headerTop ;
   var monitorIDLabelHeight = homeScreen.headerHeight ; 
   var monitorIDLabelWidth = monitorIDLabelRight - monitorIDLabelLeft ; 

   var monitorIDValueLeft  = homeScreen.headerLeft + homeScreen.headerWidth * monitorIDValueLeftPercent / 100 ;
   var monitorIDValueRight = homeScreen.headerLeft + homeScreen.headerWidth * monitorIDValueRightPercent / 100 ;
   var monitorIDValueTop = homeScreen.headerTop ;
   var monitorIDValueHeight = homeScreen.headerHeight ;
   var monitorIDValueWidth = monitorIDValueRight - monitorIDValueLeft ; 

   displayCtx.fillStyle = window.colors.ZGRAY4;
   displayCtx.fillRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);

   displayCtx.fillStyle = window.colors.ZWHITE;
   displayCtx.font = '20pt Arial';  
   displayCtx.textAlign = 'left';
   displayCtx.textBaseline = 'middle'; // Set text baseline to middle for vertical centering

   var textTop ;

   // textTop = patientNameLabelTop + patientNameLabelHeight / 2 ;
   // fitText(translateNumber(window.StringNumbers.SN_Name), window.colors.ZWHITE, 'Arial', 20, patientNameLabelLeft, textTop, patientNameLabelWidth, patientNameLabelHeight, 'left', 'middle') ;

   // textTop = patientNameValueTop + patientNameValueHeight / 2 ;
   // fitText(homeScreen.getSettingValue("Patient Name"), window.colors.ZWHITE, 'Arial', 20, patientNameValueLeft, textTop, patientNameValueWidth, patientNameLabelHeight, 'left', 'middle') ;

   // textTop = patientIDLabelTop + patientIDLabelHeight / 2 ;
   // fitText(translateNumber(window.StringNumbers.SN_ID), window.colors.ZWHITE, 'Arial', 20, patientIDLabelLeft, textTop, patientIDLabelWidth, patientIDLabelHeight, 'left', 'middle') ;

   // textTop = patientIDValueTop + patientIDValueHeight / 2 ;
   // fitText(homeScreen.getSettingValue("Patient ID"), window.colors.ZWHITE, 'Arial', 20, patientIDValueLeft, textTop, patientIDValueWidth, patientIDLabelHeight, 'left', 'middle') ;

   // textTop = monitorIDLabelTop + monitorIDLabelHeight / 2 ;
   // fitText(translateNumber(window.StringNumbers.SN_Monitor), window.colors.ZWHITE, 'Arial', 20, monitorIDLabelLeft, textTop, monitorIDLabelWidth, patientIDLabelHeight, 'left', 'middle') ;

   // textTop = monitorIDValueTop + monitorIDValueHeight / 2 ;
   // fitText(homeScreen.getSettingValue("Monitor ID"), window.colors.ZWHITE, 'Arial', 20, monitorIDValueLeft, textTop, monitorIDValueWidth, patientIDLabelHeight, 'left', 'middle') ;


   // textTop = patientNameLabelTop + patientNameLabelHeight / 2 ;
   // fitText(translateNumber(window.StringNumbers.SN_Name), window.colors.ZWHITE, 'Droid Sans', 20, patientNameLabelLeft, textTop, patientNameLabelWidth, patientNameLabelHeight, 'left', 'middle') ;

   // textTop = patientNameValueTop + patientNameValueHeight / 2 ;
   // fitText(homeScreen.getSettingValue("Patient Name"), window.colors.ZWHITE, 'Droid Sans', 20, patientNameValueLeft, textTop, patientNameValueWidth, patientNameLabelHeight, 'left', 'middle') ;

   // textTop = patientIDLabelTop + patientIDLabelHeight / 2 ;
   // fitText(translateNumber(window.StringNumbers.SN_ID), window.colors.ZWHITE, 'Droid Sans', 20, patientIDLabelLeft, textTop, patientIDLabelWidth, patientIDLabelHeight, 'left', 'middle') ;

   // textTop = patientIDValueTop + patientIDValueHeight / 2 ;
   // fitText(homeScreen.getSettingValue("Patient ID"), window.colors.ZWHITE, 'Droid Sans', 20, patientIDValueLeft, textTop, patientIDValueWidth, patientIDLabelHeight, 'left', 'middle') ;

   // textTop = monitorIDLabelTop + monitorIDLabelHeight / 2 ;
   // fitText(translateNumber(window.StringNumbers.SN_Monitor), window.colors.ZWHITE, 'Droid Sans', 20, monitorIDLabelLeft, textTop, monitorIDLabelWidth, patientIDLabelHeight, 'left', 'middle') ;

   // textTop = monitorIDValueTop + monitorIDValueHeight / 2 ;
   // fitText(homeScreen.getSettingValue("Monitor ID"), window.colors.ZWHITE, 'Droid Sans', 20, monitorIDValueLeft, textTop, monitorIDValueWidth, patientIDLabelHeight, 'left', 'middle') ;

   textTop = patientNameLabelTop + patientNameLabelHeight / 2 ;
   fitText(translateNumber(window.StringNumbers.SN_Name), window.colors.ZWHITE, 'Arial', 20, patientNameLabelLeft, textTop, patientNameLabelWidth, patientNameLabelHeight, 'left', 'middle') ;

   textTop = patientNameValueTop + patientNameValueHeight / 2 ;
   fitText(homeScreen.getSettingValue("Patient Name"), window.colors.ZWHITE, 'Arial', 20, patientNameValueLeft, textTop, patientNameValueWidth, patientNameLabelHeight, 'left', 'middle') ;

   textTop = patientIDLabelTop + patientIDLabelHeight / 2 ;
   fitText(translateNumber(window.StringNumbers.SN_ID), window.colors.ZWHITE, 'Arial', 20, patientIDLabelLeft, textTop, patientIDLabelWidth, patientIDLabelHeight, 'left', 'middle') ;

   textTop = patientIDValueTop + patientIDValueHeight / 2 ;
   fitText(homeScreen.getSettingValue("Patient ID"), window.colors.ZWHITE, 'Arial', 20, patientIDValueLeft, textTop, patientIDValueWidth, patientIDLabelHeight, 'left', 'middle') ;

   textTop = monitorIDLabelTop + monitorIDLabelHeight / 2 ;
   fitText(translateNumber(window.StringNumbers.SN_Monitor), window.colors.ZWHITE, 'Arial', 20, monitorIDLabelLeft, textTop, monitorIDLabelWidth, patientIDLabelHeight, 'left', 'middle') ;

   textTop = monitorIDValueTop + monitorIDValueHeight / 2 ;
   fitText(homeScreen.getSettingValue("Monitor ID"), window.colors.ZWHITE, 'Arial', 20, monitorIDValueLeft, textTop, monitorIDValueWidth, patientIDLabelHeight, 'left', 'middle') ;


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

   //messageY  = messageY + homeScreen.messageAreaHeight * 20 / 100;  // adjust since values in NIBP font can go below the parameter area

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



 

// Add event listener for mouse click
displayCanvas.addEventListener('click', handleClick);

// Add event listener for touch events
displayCanvas.addEventListener('touchstart', handleTouch);

// Function to handle mouse click
function handleClick(event) {
    const rect = displayCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    LOGEVENTMAGENTA("Mouse click at (" + x + ", " + y + ")");
    // Perform actions based on x, y position
    // For example, draw something at the clicked position
    //displayCtx.fillRect(x - 5, y - 5, 10, 10);
}

// Function to handle touch events
function handleTouch(event) {
    event.preventDefault();
    const rect = displayCanvas.getBoundingClientRect();
    const touch = event.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    LOGEVENTMAGENTA("Touch at (" + x + ", " + y + ")");
    // Perform actions based on x, y position
    // For example, draw something at the touched position
    //displayCtx.fillRect(x - 5, y - 5, 10, 10);
}
