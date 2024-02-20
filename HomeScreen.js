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

HomeScreen.prototype.initializeAreas = function() {

   this.headerWidth = this.width;
   this.headerHeight = Math.round(this.height * 15 / 100);
   this.headerLeft = 0;
   this.headerRight = this.headerLeft + this.headerWidth;
   this.headerTop = 0;
   this.headerBottom = this.headerTop + this.headerHeight;

   this.waveformAreaWidth = Math.round(this.width * 80 / 100);
   this.waveformAreaHeight = Math.round(this.height * 65 / 100);
   this.waveformAreaLeft = 0;
   this.waveformAreaRight = this.waveformAreaLeft + this.waveformAreaWidth;
   this.waveformAreaTop = this.headerBottom;
   this.waveformAreaBottom = this.waveformAreaTop + this.waveformAreaHeight;

   this.rightParamAreaWidth = this.width * 20 / 100;
   this.rightParamAreaHeight = this.height * 65 / 100;
   this.rightParamAreaLeft = this.waveformAreaRight;
   this.rightParamAreaRight = this.rightParamAreaLeft + this.rightParamAreaWidth;
   this.rightParamAreaTop = this.headerBottom;
   this.rightParamAreaBottom = this.rightParamAreaTop + this.rightParamAreaHeight;

   this.bottomParamAreaWidth = this.width;
   this.bottomParamAreaHeight = this.height * 10 / 100;
   this.bottomParamAreaLeft = 0;
   this.bottomParamAreaRight = this.bottomParamAreaLeft + this.bottomParamAreaWidth;
   this.bottomParamAreaTop = this.waveformAreaBottom;
   this.bottomParamAreaBottom = this.bottomParamAreaTop + this.bottomParamAreaHeight;

   this.messageAreaWidth = this.width;
   this.messageAreaHeight = this.height * 10 / 100;
   this.messageAreaLeft = 0;
   this.messageAreaRight = this.messageAreaLeft + this.messageAreaWidth;
   this.messageAreaTop = this.bottomParamAreaBottom;
   this.messageAreaBottom = this.messageAreaTop + this.messageAreaHeight;
};

HomeScreen.prototype.clearWaveformList = function() {
   this.waveforms = [];
};

HomeScreen.prototype.addWaveform = function(wvf) {
   this.waveforms.push(wvf);
};

HomeScreen.prototype.getNWaveforms = function() {
   return (this.waveforms.length);
};


//
//   drawHomeScreenAreas
//

function drawHomeScreenAreas() {

   // Assuming this.ctx is a CanvasRenderingContext2D or a similar object

   displayCtx.fillStyle = "#000000";
   displayCtx.clearRect(homeScreen.left, homeScreen.top, homeScreen.width, homeScreen.height);
   displayCtx.fillRect(homeScreen.left, homeScreen.top, homeScreen.width, homeScreen.height);

   displayCtx.fillStyle = "#444444";
   displayCtx.clearRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);
   displayCtx.fillRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);

   displayCtx.fillStyle = "#ff0000";
   displayCtx.clearRect(homeScreen.rightParamAreaLeft, homeScreen.rightParamAreaTop, homeScreen.rightParamAreaWidth, homeScreen.rightParamAreaHeight);
   displayCtx.fillRect(homeScreen.rightParamAreaLeft, homeScreen.rightParamAreaTop, homeScreen.rightParamAreaWidth, homeScreen.rightParamAreaHeight);

   displayCtx.fillStyle = "#ff5555";
   displayCtx.clearRect(homeScreen.bottomParamAreaLeft, homeScreen.bottomParamAreaTop, homeScreen.bottomParamAreaWidth, homeScreen.bottomParamAreaHeight);
   displayCtx.fillRect(homeScreen.bottomParamAreaLeft, homeScreen.bottomParamAreaTop, homeScreen.bottomParamAreaWidth, homeScreen.bottomParamAreaHeight);

   displayCtx.fillStyle = "#555555";
   displayCtx.clearRect(homeScreen.messageAreaLeft, homeScreen.messageAreaTop, homeScreen.messageAreaWidth, homeScreen.messageAreaHeight);
   displayCtx.fillRect(homeScreen.messageAreaLeft, homeScreen.messageAreaTop, homeScreen.messageAreaWidth, homeScreen.messageAreaHeight);

   // Initial clear for buffer canvas
   bufferCtx.fillStyle = 'black';
   bufferCtx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);

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
