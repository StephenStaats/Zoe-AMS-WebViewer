//
//   Waveform
//   

// Define the Waveform class globally
function Waveform(waveformName, order) {

   this.waveformName = waveformName;
   this.capacity = 20000;
   this.buffer = new RingBuffer(this.waveformName, this.capacity);
   this.bufferReadCount = 0;

   this.left = homeScreen.waveformAreaLeft;
   this.top = homeScreen.waveformAreaTop + order * waveformHeight;
   this.right = homeScreen.waveformAreaLeft + homeScreen.waveformAreaWidth;
   this.width = homeScreen.waveformAreaWidth;
   this.height = waveformHeight - 1;
   this.bottom = this.top + this.height;

   this.drawX = this.left;
   this.drawXTime = 0;
   this.eraseX = this.drawX + homeScreen.eraseBarWidth;
   this.drawY = 0;
   this.drawXLast = Number.MIN_VALUE;
   this.drawYLast = Number.MIN_VALUE;
   this.startY = Number.MIN_VALUE;
   this.headIndex = 0;
   this.tailIndex = 0;

   this.elapsedTime = 0;       // total elapsed time in MS (as clocked by the browser)
   this.drawnPixelTime = 0;    // total time represented by drawn pixels
   this.shiftedPixelTime = 0;  // total time represented by shifted pixels
   this.readSampleTime = 0;    // total time represented by read samples
   this.readSampleTime = 0;    // total time represented by read samples

   this.pixelsDrawnToBuffer = 0;
   this.pixelBufferIndex = 0;

   this.samplesDrawn = 0;
   this.samplesToDraw = this.width;

   switch (this.waveformName) {

      case 'ECGII':
         this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
         this.color = window.colors.ECGColor;
         this.fill = false;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 25.0;
         this.autoScale = false;
         this.yMin = -500;
         this.yMax = 500;
         this.maxSimulatedSampleIndex = window.simulatedWaveformECGII.length;
         this.simulatedSamples = window.simulatedWaveformECGII;
         break;

      case 'CO2':
         this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
         this.color = window.colors.CO2Color;
         this.fill = true;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 6.25;
         this.autoScale = false;
         if (window.simulatedDataMode) {
            this.yMin = -100;
            this.yMax = 4500; 
         }
         else {
            this.yMin = -500;
            this.yMax = 500;
         }
         this.maxSimulatedSampleIndex = window.simulatedWaveformCO2.length;
         this.simulatedSamples = window.simulatedWaveformCO2;
         break;

      case 'SPO2':
         this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
         this.color = window.colors.SPO2Color;
         this.fill = false;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 25.0;
         this.autoScale = true;
         this.yMin = 0;
         this.yMax = 0;
         this.maxSimulatedSampleIndex = window.simulatedWaveformSpO2At250Hz.length;
         this.simulatedSamples = window.simulatedWaveformSpO2At250Hz;
         break;

      case 'RESP':
         this.waveformId = window.Z_WAVEFORM_ID.Z_WAVEFORM_RESP;
         this.color = window.colors.RESPColor;
         this.fill = false;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 6.25;
         this.autoScale = true;
         this.yMin = 0;
         this.yMax = 0;
         this.maxSimulatedSampleIndex = window.simulatedWaveformRESP.length;
         this.simulatedSamples = window.simulatedWaveformRESP;
         break;

   }

   if (this.autoScale) {

      var minY;
      var maxY;

      minY = Number.MAX_VALUE;
      maxY = Number.MIN_VALUE;
      var s;
      for (s = 0; s < this.maxSimulatedSampleIndex; s++) {
         if (this.simulatedSamples[s] < minY) {
            minY = this.simulatedSamples[s];
         }
         if (this.simulatedSamples[s] > maxY) {
            maxY = this.simulatedSamples[s];
         }
      }
      var amplitude = maxY - minY;

      this.yMin = minY - amplitude * window.autoscaleOffsetPercentage / 100;
      this.yMax = maxY + amplitude * window.autoscaleOffsetPercentage / 100;

   }

}

// Method to write a sample to the waveform ring buffer
Waveform.prototype.writeSample = function(sample) {
   this.buffer.enqueue(sample);
   if (this.buffer.getSize() > this.capacity) {
      this.buffer.dequeue(); // Remove oldest sample if buffer exceeds capacity
   }
};

// Method to read a sample from the waveform ring buffer
Waveform.prototype.readSample = function() {
   this.bufferReadCount++;
   const sample = this.buffer.dequeue();
   return sample;
};

// Method to peek at current sample from the waveform ring buffer without dequeuing it
Waveform.prototype.peekThisSample = function() {
   const sample = this.buffer.peek();
   return sample;
};

// Method to peek at sample beyond current sample from the waveform ring buffer without dequeuing it
Waveform.prototype.peekNextSample = function() {
   const sample = this.buffer.peekNext();
   return sample;
};

// Method to clear the waveform data
Waveform.prototype.clearSamples = function() {
   while (!this.buffer.isEmpty()) {
      this.buffer.dequeue();
   }
};

// Method to get number of samples
Waveform.prototype.getNSamples = function() {
   return this.buffer.getSize();
};

// Method to get the waveform name
Waveform.prototype.getWaveformName = function() {
   return this.waveformName;
};

// Method to get the waveform ID
Waveform.prototype.getWaveformId = function() {
   return this.waveformId;
};

// Method to get the samples as an array
Waveform.prototype.getSamples = function() {
   return this.buffer.toArray();
};

// Method to get the number of samples in the waveform
Waveform.prototype.getNumSamples = function() {
   return this.buffer.getSize();
};

// Method to get the capacity of the waveform
Waveform.prototype.getCapacity = function() {
   return this.capacity;
};


//
//   setupWaveforms - call when a new waveformDataMessage is received from the REST API
//

var nWaveforms;
var waveformHeight;

function setupWaveforms(setupWaveformDataMessage) {

   //homeScreen.setupWaveforms(setupWaveformDataMessage);

   homeScreen.clearWaveformList();

   // Parse the JSON string into JavaScript object
   const waveformData = JSON.parse(setupWaveformDataMessage);

   nWaveforms = waveformData.waveforms.length;
   waveformHeight = Math.round(homeScreen.waveformAreaHeight / nWaveforms);

   // Add waveforms from the parsed data
   var order = 0;
   waveformData.waveforms.forEach(waveform => {
      // Create an instance of Waveform class
      const wvf = new Waveform(waveform.waveformName, order);
      homeScreen.addWaveform(wvf);
      order++;
   });

}


//
//   resetWaveforms
//

var waveformSetIndex = 0;

function resetWaveforms(shiftWaveforms) {

   //const randomInteger = Math.floor(Math.random() * 2);

   if (shiftWaveforms) {
      waveformSetIndex++
      if (waveformSetIndex >= currentWaveforms.length) {
         waveformSetIndex = 0;
      }
   }

   pauseWaveformDrawing = 1;

   setupWaveforms(currentWaveforms[waveformSetIndex]);

   pauseWaveformDrawing = 0;

   if (window.simulatedDataMode == 0) {
      simulateArrivalOfWaveformDataMessage();
   }

   // Get the button element by its ID
   var button = document.getElementById('startStopWaveformsButton');

   button.textContent = 'Pause Waveforms';

   redrawHomeScreen = 1;

}


//
//   startStopWaveforms
//

function startStopWaveforms() {

   // Get the button element by its ID
   var button = document.getElementById('startStopWaveformsButton');

   //Check the current label and update it
   if (button.textContent === 'Pause Waveforms') {
      button.textContent = 'Restart Waveforms';
      pauseWaveformDrawing = 1;
   } else {
      button.textContent = 'Pause Waveforms';
      redrawHomeScreen = 1;
      //pauseWaveformDrawing = 0;
      resetWaveforms(0);
   }

}


//
//   shiftWaveforms  
//

function shiftWaveforms() {

   resetWaveforms(1);

}


//   Compute parameters used for waveform drawing
//
//   Adjust these values based on the display
//

const screenWidthMM = 500;
const screenWidthPixels = 1920;
const pixelsPerMM = screenWidthPixels / screenWidthMM;

var enteredMSPerPixel = 1 / (25 * pixelsPerMM / 1000) ;
var enteredMSPerSample = 4.0 ;

//
//   drawWaveform
//

function drawWaveform(w) {

   wvf = homeScreen.waveforms[w];

   var sweepSpeedMMPerSecond = wvf.sweepSpeed;
   var pixelsPerSecond = sweepSpeedMMPerSecond * pixelsPerMM;
   var pixelsPerMS = pixelsPerSecond / 1000;
   var MSPerPixel = 1 / pixelsPerMS;
   var MSPerSample = 0;
   if (window.simulatedDataMode) {
      //MSPerPixel = 1 / pixelsPerMS;
      MSPerSample = 1000 / wvf.sampleRateIn;
   }
   else {   
      //MSPerPixel = enteredMSPerPixel;
      MSPerSample = enteredMSPerSample;
   }

   const normalizeWaveform = (value) => {

      normalizedValue = wvf.top + wvf.height - ((value - wvf.yMin) / (wvf.yMax - wvf.yMin) * wvf.height);

      if (normalizedValue < wvf.top + 1) {
         //normalizedValue = wvf.top + 1;
         normalizedValue = LEAD_OFF_OR_UNPLUGGED;
      }
      else if (normalizedValue > wvf.bottom - 1) {
         //normalizedValue = wvf.bottom - 1;
         normalizedValue = LEAD_OFF_OR_UNPLUGGED;
      }
      return normalizedValue;
   };

   //
   //   Draw new samples
   //

   var NewSamplePixelsDrawn = 0;

   displayCtx.beginPath();

   displayCtx.strokeStyle = wvf.color;
   displayCtx.lineWidth = 2;
   displayCtx.lineJoin = 'round';
   displayCtx.lineCap = 'round';

   //displayCtx.moveTo(wvf.drawXLast, wvf.drawYLast);

   while (wvf.drawXTime < wvf.elapsedTime) {

      //if (MSPerPixel > MSPerSample) {   we now upsample 50Hz waveform so that this is always true

      var avgYSum = 0;
      var avgYCount = 0;
      var lowestY = Number.MAX_VALUE;

      var skipPixel = 0 ;
      while (wvf.drawnPixelTime > wvf.readSampleTime) {

         if (window.simulatedDataMode) {
            var thisY = normalizeWaveform(wvf.simulatedSamples[wvf.tailIndex]);
            wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSimulatedSampleIndex;
            wvf.samplesDrawn++;
            wvf.readSampleTime += MSPerSample;
         }
         else {
            var thisSample = wvf.readSample() ;
            //LOGEVENTYELLOW("1 readSample from ", wvf.waveformName, " = ", thisY) ;
            wvf.samplesDrawn++;
            wvf.readSampleTime += MSPerSample;
            if (thisSample == LEAD_OFF_OR_UNPLUGGED) {
               skipPixel = 1 ;
            }
            else {
               var thisY = normalizeWaveform(thisSample);
               if (thisY == LEAD_OFF_OR_UNPLUGGED) {
                  skipPixel = 1 ;
               }
            }

         }

         avgYSum += thisY;
         avgYCount++;

         if (thisY < lowestY) {
            lowestY = thisY;
         }

      }

      //if ECG (to preserve peaks) use :wvf.drawY = lowestY;
      const index = wvf.waveformName.indexOf("ECG");
      if (index !== -1) {
         wvf.drawY = lowestY;
      } else {
         wvf.drawY = avgYSum / avgYCount;
      }

      //if (wvf.drawX > wvf.drawXLast) {
      if (skipPixel) {
         var q = 0 ;
      }
      else {
         if (wvf.drawXLast != Number.MIN_VALUE) {
            displayCtx.moveTo(wvf.drawXLast, wvf.drawYLast);
            displayCtx.lineTo(wvf.drawX, wvf.drawY);
            if (wvf.fill) {
               displayCtx.lineTo(wvf.drawX, wvf.bottom - 1);
               //displayCtx.moveTo(wvf.drawX, wvf.drawY);
            }
         }
         wvf.drawXLast = wvf.drawX;
         wvf.drawYLast = wvf.drawY;
      }
      //}

      NewSamplePixelsDrawn++;

      wvf.drawX++;
      if (wvf.drawX >= wvf.right) {
         wvf.drawX = wvf.left;
      }
      wvf.drawXLast = wvf.drawX;

      wvf.drawXTime += MSPerPixel;
      wvf.drawnPixelTime += MSPerPixel;

   }

   displayCtx.stroke();

   //
   //   Draw erase bar
   //

   displayCtx.beginPath();

   displayCtx.strokeStyle = window.colors.ZBLACK;
   displayCtx.lineWidth = 2;
   displayCtx.lineJoin = 'round';
   displayCtx.lineCap = 'round';

   displayCtx.moveTo(wvf.eraseX, wvf.top);

   var eraseBarPixelsDrawn = 0;
   while (eraseBarPixelsDrawn < NewSamplePixelsDrawn) {

      displayCtx.moveTo(wvf.eraseX, wvf.top + 1);
      displayCtx.lineTo(wvf.eraseX, wvf.bottom - 1);

      wvf.eraseX++;
      if (wvf.eraseX >= wvf.right) {
         wvf.eraseX = wvf.left;
      }

      eraseBarPixelsDrawn++;

   }

   displayCtx.stroke();

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

      wvf.elapsedTime += elapsed;

      drawWaveform(w);

   }

   //debugger;

}


