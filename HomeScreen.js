//
//   Define basic objects
//

class RingBuffer {

   //   In this implementation:

   // The enqueue method adds a sample to the buffer and updates the head index.
   // The dequeue method removes and returns the oldest sample from the buffer and updates the tail index.
   // Methods like isEmpty, isFull, getSize, and getCapacity provide information about the buffer.
   // The toArray method converts the buffer to an array for easier inspection.

   constructor(capacity) {
      this.capacity = capacity;
      this.buffer = new Array(capacity);
      this.head = 0; // Points to the next available position for adding a sample
      this.tail = 0; // Points to the oldest sample in the buffer
      this.size = 0; // Tracks the number of elements in the buffer
   }

   // Method to add a sample to the buffer
   enqueue(sample) {
      // Check if the buffer is full
      if (this.size === this.capacity) {
         throw new Error("Buffer is full");
      }
      this.buffer[this.head] = sample;
      this.head = (this.head + 1) % this.capacity;
      this.size++;
   }

   // Method to remove and return the oldest sample from the buffer
   dequeue() {
      // Check if the buffer is empty
      if (this.size === 0) {
         throw new Error("Buffer is empty");
      }
      const sample = this.buffer[this.tail];
      this.tail = (this.tail + 1) % this.capacity;
      this.size--;
      return sample;
   }

   // Method to check if the buffer is empty
   isEmpty() {
      return this.size === 0;
   }

   // Method to check if the buffer is full
   isFull() {
      return this.size === this.capacity;
   }

   // Method to get the number of elements in the buffer
   getSize() {
      return this.size;
   }

   // Method to get the capacity of the buffer
   getCapacity() {
      return this.capacity;
   }

   // Method to convert the buffer to an array
   toArray() {
      const result = [];
      let current = this.tail;
      for (let i = 0; i < this.size; i++) {
         result.push(this.buffer[current]);
         current = (current + 1) % this.capacity;
      }
      return result;
   }
}


class Waveform {

   constructor(waveformName, order) {

      this.waveformName = waveformName;
      this.capacity = 10000;
      this.buffer = new RingBuffer(this.capacity);

      this.left = homeScreen.waveformAreaLeft;
      this.top = homeScreen.waveformAreaTop + order * waveformHeight;
      this.bottom = homeScreen.waveformAreaTop + (order + 1) * waveformHeight;
      this.right = homeScreen.waveformAreaLeft + homeScreen.waveformAreaWidth;
      this.width = homeScreen.waveformAreaWidth;
      this.height = waveformHeight;
      this.drawXValue = 0;
      this.eraseXValue = homeScreen.eraseBarWidth;
      this.drawYValue = 0;
      this.startY = Number.MIN_VALUE;
      this.headIndex = 0;
      this.tailIndex = 0;
      this.pixelTime = 0;
      this.sampleTime = 0;
      this.pixelTimeBuffer = 0;
      this.sampleTimeBuffer = 0;

      this.pixelsDrawnToBuffer = 0;
      this.pixelsToDrawInBuffer = 0;
      this.pixelBufferIndex = 0;

      this.samplesDrawn = 0;
      this.samplesToDraw = 50;
      this.samplesShiftedTime = 0;
      this.samplesShifted = 0;

      switch (this.waveformName) {

         case 'ECGII':
            //this.waveformId = window.Z_WAVEFORM_ID.Z_WAVEFORM_ECGII;
            this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
            this.color = window.colors.ECGColor;
            this.fill = false;
            this.sampleRate = 250;
            this.sweepSpeed = 25.0;
            this.autoScale = false;
            this.yMin = -500;
            this.yMax = 500;
            this.maxSampleIndex = window.simulatedWaveformECG.length;
            this.samples = window.simulatedWaveformECG;
            break;

         case 'CO2':
            this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
            this.color = window.colors.CO2Color;
            this.fill = true;
            this.sampleRate = 50;
            this.sweepSpeed = 6.25;
            this.autoScale = false;
            this.yMin = -100;
            this.yMax = 4000;
            this.maxSampleIndex = window.simulatedWaveformCO2.length;
            this.samples = window.simulatedWaveformCO2;
            break;

         case 'SpO2':
            this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
            this.color = window.colors.SpO2Color;
            this.fill = false;
            this.sampleRate = 50;
            this.sweepSpeed = 25.0;
            this.autoScale = true;
            this.yMin = 0;
            this.yMax = 0;
            this.maxSampleIndex = window.simulatedWaveformSpO2.length;
            this.samples = window.simulatedWaveformSpO2;
            break;

         case 'RESP':
            this.waveformId = window.Z_WAVEFORM_ID.Z_WAVEFORM_RESP;
            this.color = window.colors.RESPColor;
            this.fill = false;
            this.sampleRate = 50;
            this.sweepSpeed = 6.25;
            this.autoScale = true;
            this.yMin = 0;
            this.yMax = 0;
            this.maxSampleIndex = window.simulatedWaveformRESP.length;
            this.samples = window.simulatedWaveformRESP;
            break;

      }

      if (this.autoScale) {

         var minY;
         var maxY;

         minY = Number.MAX_VALUE;
         maxY = Number.MIN_VALUE;
         var s;
         for (s = 0; s < this.maxSampleIndex; s++) {
            if (this.samples[s] < minY) {
               minY = this.samples[s];
            }
            if (this.samples[s] > maxY) {
               maxY = this.samples[s];
            }
         }
         var amplitude = maxY - minY;

         this.yMin = minY - amplitude * .10;
         this.yMax = maxY + amplitude * .10;

      }

   }

   // Method to write a sample to the waveform ring buffer
   writeSample(sample) {
      this.buffer.enqueue(sample);
      if (this.buffer.getSize() > this.capacity) {
         this.buffer.dequeue(); // Remove oldest sample if buffer exceeds capacity
      }
   }

   // Method to read a sample from the waveform ring buffer
   readSample() {
      const sample = this.buffer.dequeue();
      return sample;
   }

   // Method to clear the waveform data
   clearSamples() {
      while (!this.buffer.isEmpty()) {
         this.buffer.dequeue();
      }
   }

   // Method to get number of samples
   getNSamples() {
      return this.buffer.getSize();
   }

   // Method to get the waveform name
   getWaveformName() {
      return this.waveformName;
   }

   // Method to get the waveform ID
   getWaveformId() {
      return this.waveformId;
   }

   // Method to get the samples as an array
   getSamples() {
      return this.buffer.toArray();
   }

   // Method to get the number of samples in the waveform
   getNumSamples() {
      return this.buffer.getSize();
   }

   // Method to get the capacity of the waveform
   getCapacity() {
      return this.capacity;
   }

}


//
//   Home screen
//

class HomeScreen {

   constructor(width, height) {

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

   initializeAreas() {

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
   }

   setupWaveforms(jsonWaveformNames) {

      this.clearWaveformList();

      // Parse the JSON string into JavaScript array
      const waveformNamesData = JSON.parse(jsonWaveformNames);

      nWaveforms = waveformNamesData.length;
      waveformHeight = Math.round(this.waveformAreaHeight / nWaveforms);

      // Add waveforms from the parsed data
      var order = 0;
      waveformNamesData.forEach(waveformName => {
         // Create an instance of Waveform class
         const wvf = new Waveform(waveformName, order);
         homeScreen.addWaveform(wvf);
         order++;
      });

   }

   clearWaveformList() {
      this.waveforms = [];
   }

   addWaveform(wvf) {
      this.waveforms.push(wvf);
   }

   getNWaveforms() {
      return (this.waveforms.length);
   }


}


//
//   Get the canvas and context
//

const displayCanvas = document.getElementById('displayCanvas');
const displayCtx = displayCanvas.getContext('2d');

// Create an off-screen canvas for double buffering
const bufferCanvas = document.createElement('canvas');
const bufferCtx = bufferCanvas.getContext('2d');

// Set initial dimensions of the canvas
function resizeCanvas() {

   // displayCanvas.width = window.innerWidth;
   // displayCanvas.height = 200; // Fixed height

   // You might need to adjust the drawing here if necessary
   // For example, redraw the waveform or clear the canvas
   displayCtx.fillStyle = 'black';
   displayCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);

   bufferCanvas.width = displayCanvas.width;
   bufferCanvas.height = displayCanvas.height;

   // Initial clear for buffer canvas
   bufferCtx.fillStyle = 'black';
   bufferCtx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);

}

// Call resizeCanvas initially and on window resize
resizeCanvas();
window.addEventListener('resize', resizeCanvas);


//
//   Create and initialize home screen
//

// JSON string containing waveform Names  'waveformSetup'
const waveformSetupMessageBody = '["ECGII", "CO2", "SpO2", "RESP"]';
//const waveformSetupMessageBody = '["ECGII"]';

homeScreen = new HomeScreen(displayCanvas.width, displayCanvas.height);
homeScreen.initializeAreas();
homeScreen.setupWaveforms(waveformSetupMessageBody);

//
//   setupWaveforms - call when a new waveformSetup message is received from the REST API
//

var nWaveforms;
var waveformHeight;

function setupWaveforms(waveformSetupMessageBody) {
   homeScreen.setupWaveforms(waveformSetupMessageBody);
}

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




let pauseWaveformDrawing = 0;

var framesPerSecond = 60;

//
//   Compute parameters used for waveform drawing
//
//   Adjust these values based on the display
//

const screenWidthMM = 500;
const screenWidthPixels = 1920;
const pixelsPerMM = screenWidthPixels / screenWidthMM;

//
//   startStopWaveforms
//

function startStopWaveforms() {

   // Get the button element by its ID
   var button = document.getElementById('StartStopWaveformsButton');

   //Check the current label and update it
   if (button.textContent === 'Pause Waveforms') {
      button.textContent = 'Restart Waveforms';
      pauseWaveformDrawing = 1;
   } else {
      button.textContent = 'Pause Waveforms';
      redrawHomeScreen = 1;
      pauseWaveformDrawing = 0;
   }

}


//
//   resetWaveforms
//

var waveformSetIndex = 0;

function resetWaveforms() {

   const currentWaveformNames = [
      //'["SpO2"]',
      '["ECGII", "CO2", "SpO2", "RESP"]',
      '["RESP", "ECGII", "CO2", "SpO2"]',
      '["SpO2", "RESP", "ECGII", "CO2"]',
      '["CO2", "SpO2", "RESP", "ECGII"]',
   ]

   const randomInteger = Math.floor(Math.random() * 4);

   waveformSetIndex++
   if (waveformSetIndex >= currentWaveformNames.length) {
      waveformSetIndex = 0;
   }

   pauseWaveformDrawing = 1;

   setupWaveforms(currentWaveformNames[waveformSetIndex]);

   redrawHomeScreen = 1;
   pauseWaveformDrawing = 0;

}


//
//   drawNextWaveformSegmentInBuffer
//

function drawNextWaveformSegmentInBuffer(w) {

   wvf = homeScreen.waveforms[w];

   bufferCtx.fillStyle = "#000000";
   bufferCtx.clearRect(wvf.right, wvf.top, 100, wvf.height);
   bufferCtx.fillRect(wvf.right, wvf.top, 100, wvf.height);

   bufferCtx.strokeStyle = wvf.color;
   bufferCtx.lineWidth = 2;
   bufferCtx.lineJoin = 'round';
   bufferCtx.lineCap = 'round';

   var sweepSpeedMMPerSecond = wvf.sweepSpeed;
   var pixelsPerSecond = sweepSpeedMMPerSecond * pixelsPerMM;
   var pixelsPerMS = pixelsPerSecond / 1000;
   var MSPerPixel = 1 / pixelsPerMS;
   var MSPerSample = 1000 / wvf.sampleRate;

   //const normalizeWaveform = value => wvf.top + wvf.height - ((value - wvf.yMin) / (wvf.yMax - wvf.yMin) * wvf.height);

   const normalizeWaveform = (value) => {
      
      normalizedValue = wvf.top + wvf.height - ((value - wvf.yMin) / (wvf.yMax - wvf.yMin) * wvf.height) ;
      
      if (normalizedValue < wvf.top) {
         normalizedValue = wvf.top;
      }
      else if (normalizedValue > wvf.bottom ) {
         normalizedValue = wvf.bottom ;
      }
      return normalizedValue;
   };


   bufferCtx.beginPath();

   wvf.pixelTimeBuffer = 0;
   wvf.sampleTimeBuffer = 0;

   wvf.samplesDrawn = 0;

   wvf.pixelsDrawnToBuffer = 0;
   wvf.pixelBufferIndex = 0;

   var x = wvf.right + 1
   bufferCtx.moveTo(x, wvf.endY);
   LOGEVENT("moveTo:", x, ",", wvf.endY);
   x++;

   var firstMove = 0;
   while (1) {

      wvf.pixelTimeBuffer += MSPerPixel;

      var drewMidLine = 0;

      if (MSPerPixel > MSPerSample) {

         var avgYSum = 0;
         var avgYCount = 0;
         while (wvf.sampleTimeBuffer < wvf.pixelTimeBuffer) {

            avgYSum += normalizeWaveform(wvf.samples[wvf.tailIndex]);
            avgYCount++;
            wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
            LOGEVENTGREEN("wvf.tailIndex ", wvf.tailIndex, " = ", wvf.samples[wvf.tailIndex]);
            wvf.sampleTimeBuffer += MSPerSample;

         }
         wvf.endY = avgYSum / avgYCount;

         bufferCtx.lineTo(x, wvf.endY);
         LOGEVENTGREEN("mid lineTo:", x, ",", wvf.endY);

         if (wvf.fill) {
            bufferCtx.lineTo(x, wvf.bottom - 1);
            bufferCtx.moveTo(x, wvf.endY);
         }

         x++;
         wvf.pixelsDrawnToBuffer++

         wvf.samplesDrawn++;

         if (wvf.samplesDrawn >= wvf.samplesToDraw) {
            break;
         }

      }
      else {

         while (wvf.sampleTimeBuffer < wvf.pixelTimeBuffer) {

            var incrementToNextSample = wvf.samples[(wvf.tailIndex + 1) % wvf.maxSampleIndex] - wvf.samples[wvf.tailIndex];
            wvf.endY = normalizeWaveform(wvf.samples[wvf.tailIndex] + incrementToNextSample / 2);
            if (firstMove) {
               firstMove = 0;
               bufferCtx.moveTo(x, wvf.endY);
               LOGEVENTGREEN("mid moveTo:", x, ",", wvf.endY);
            }

            bufferCtx.lineTo(x, wvf.endY);
            LOGEVENTGREEN("mid lineTo:", x, ",", wvf.endY);

            if (wvf.fill) {
               bufferCtx.lineTo(x, wvf.bottom - 1);
               bufferCtx.moveTo(x, wvf.endY);
            }

            x++;
            wvf.pixelsDrawnToBuffer++;

            drewMidLine = 1;

            wvf.samplesDrawn++;

            wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
            LOGEVENTGREEN("wvf.tailIndex ", wvf.tailIndex, " = ", wvf.samples[wvf.tailIndex]);
            wvf.sampleTimeBuffer += MSPerSample;

         }

         if (drewMidLine == 0) {
            wvf.endY = normalizeWaveform(wvf.samples[wvf.tailIndex]);
            if (firstMove) {
               firstMove = 0;
               bufferCtx.moveTo(wvf.right, wvf.endY);
               LOGEVENTGREEN("end moveTo:", wvf.right, ",", wvf.endY);
            }
            bufferCtx.lineTo(x, wvf.endY);
            LOGEVENTGREEN("end lineTo:", x, ",", wvf.endY);

            x++;
            wvf.pixelsDrawnToBuffer++;
         }

         if (wvf.fill) {
            bufferCtx.lineTo(x, wvf.bottom - 1);
            bufferCtx.moveTo(x, wvf.endY);
         }

         if (wvf.samplesDrawn >= wvf.samplesToDraw) {
            break;
         }

      }

   }

   bufferCtx.stroke();

}


//
//   drawWaveforms
//

function drawWaveforms(elapsed) {

   if (pauseWaveformDrawing == 1) return;

   if (elapsed == 0) return;

   var w;
   for (w = 0; w < homeScreen.waveforms.length; w++) {

      wvf = homeScreen.waveforms[w];

      LOGEVENTRED("elapsed = :", elapsed);

      wvf.pixelTime += elapsed;

      var sweepSpeedMMPerSecond = wvf.sweepSpeed;
      var pixelsPerSecond = sweepSpeedMMPerSecond * pixelsPerMM;
      var pixelsPerMS = pixelsPerSecond / 1000;
      var MSPerPixel = 1 / pixelsPerMS;
      var MSPerSample = 1000 / wvf.sampleRate;
      //var sweepSpeedPixelsPerFrame = Math.round(elapsed / MSPerPixel);

      while (wvf.pixelTime > MSPerPixel) {

         LOGEVENTYELLOW("   wvf.pixelTime:", wvf.pixelTime);
         wvf.pixelTime -= MSPerPixel;

         // Shift the waveform to the left, clear the rightmost part and set it to black again
         displayCtx.fillStyle = 'black';
         imageData = displayCtx.getImageData(wvf.left + 1, wvf.top, wvf.width - 1, wvf.height);
         //LOGEVENT("getImageData:", wvf.left + 1, ",", wvf.top, ",", wvf.width - 1, ",", wvf.height);
         displayCtx.putImageData(imageData, wvf.left, wvf.top);
         //LOGEVENT("putImageData:", wvf.left, ",", wvf.top);
         displayCtx.fillRect(wvf.right - 1, wvf.top, 1, wvf.height);
         //DEVEVENT("fillRect:", wvf.Width - 1, ",", wvf.Top, ",", 1, ",", wvf.Height);

         LOGEVENT("   shifted left");

         imageData = bufferCtx.getImageData(wvf.right + 1 + wvf.pixelBufferIndex, wvf.top, 1, wvf.height);
         LOGEVENT("getImageData:", wvf.right + 1 + wvf.pixelBufferIndex);
         displayCtx.putImageData(imageData, wvf.right - 1, wvf.top);
         LOGEVENT("putImageData:", wvf.right);

         wvf.pixelBufferIndex++;
         //drawnImageIndex = (drawnImageIndex + 1) % maxDrawnImageIndex;
         if (wvf.pixelBufferIndex > wvf.pixelsDrawnToBuffer) {
            LOGEVENTYELLOW("   pixelBufferIndex >= pixelsDrawnToBuffer", wvf.pixelBufferIndex);
         }

         wvf.samplesShiftedTime += MSPerPixel;
         wvf.samplesShifted = Math.round(wvf.samplesShiftedTime / MSPerSample);

         LOGEVENTYELLOW("   samplesShiftedTime:", wvf.samplesShiftedTime);
         LOGEVENTYELLOW("   samplesShifted:", wvf.samplesShifted);
         if (wvf.samplesShifted >= wvf.samplesDrawn) {
            LOGEVENTYELLOW("   samplesShifted >= samplesDrawn", wvf.samplesShifted);
         }

         //if ((drawnImageIndex >= maxDrawnImageIndex) || (samplesShifted >= samplesDrawn)) {
         if (wvf.pixelBufferIndex >= wvf.pixelsDrawnToBuffer) {
            wvf.pixelBufferIndex = 0;
            wvf.pixelsDrawnToBuffer = 0;
            wvf.samplesShifted = 0;
            wvf.samplesShiftedTime = 0;
            drawNextWaveformSegmentInBuffer(w);
         }

      }

   }

   //debugger;

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

   // var w;
   // for (w = 0; w < homeScreen.waveforms.length; w++) {
   //    wvf = homeScreen.waveforms[w];
   //    LOGEVENT("waveform ", w, "top ", wvf.top, "bottom ", wvf.bottom) ;
   // }

   // debugger;

   if (redrawHomeScreen == 1) {
      redrawHomeScreen = 0;
      drawHomeScreenAreas();
   }


   if (!lastTime) {
      lastTime = timestamp;
   }

   if (timestamp) {

      //onst elapsed = timestamp - lastTime;
      elapsedTime = timestamp - lastTime;
      lastTime = timestamp;

      if (elapsedTime) {
         //const fps = Math.round(1000 / elapsed); // Calculate frames per second
         //fpsDisplay.textContent = `Frame Rate: ${fps} FPS`;
         framesPerSecond = 1000 / elapsedTime; // Calculate frames per second
         fpsDisplay.textContent = `Frame Rate: ${Math.round(framesPerSecond)} FPS`;

         drawWaveforms(elapsedTime);

      }

   }

   frameCount++;

   //if (frameCount < 300) {
   requestAnimationFrame(drawHomeScreen);
   //}

}


// Set the background of the canvas to black
displayCtx.fillStyle = 'black';
displayCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);

// Start drawing
drawHomeScreen();


