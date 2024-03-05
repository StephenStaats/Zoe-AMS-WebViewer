//
//   Waveform
//   

function Waveform(waveformName, order) {

   this.waveformName = waveformName;
   this.capacity = 20000;
   this.buffer = new RingBuffer(this.waveformName, this.capacity);
   this.bufferReadCount = 0;

   this.left = homeScreen.waveformAreaLeft;
   this.order = order;

   switch (this.order) {

      case 0:
         this.top = homeScreen.waveformAreaTop ;
         this.height = topWaveformHeight ;
         break ;

      case 1:
         this.top = homeScreen.waveformAreaTop + topWaveformHeight;
         this.height = waveformHeight ;
         break ;

      case 2:
         this.top = homeScreen.waveformAreaTop + topWaveformHeight + waveformHeight ;
         this.height = waveformHeight ;
         break ;

   }

   // Create a new ImageData object for a 1-pixel-wide column
   const columnWidth = 1;
   this.eraseTopWaveformImageData = displayCtx.createImageData(columnWidth, topWaveformHeight);
   this.eraseWaveformImageData = displayCtx.createImageData(columnWidth, waveformHeight);
   this.eraseWithDotsWaveformImageData = displayCtx.createImageData(columnWidth, waveformHeight);

   // Set color values for each pixel in the column
   const colorYellow = [255, 255, 0, 255]; // RGBA values for yellow color
   const colorBlack  = [  0,   0, 0, 255]; // RGBA values for black color

   for (let y = 0; y < topWaveformHeight; y++) {

      const pixelIndex = (y * columnWidth) * 4; // Each pixel occupies 4 positions (RGBA)
      this.eraseTopWaveformImageData.data[pixelIndex] = colorBlack[0]; // Red
      this.eraseTopWaveformImageData.data[pixelIndex + 1] = colorBlack[1]; // Green
      this.eraseTopWaveformImageData.data[pixelIndex + 2] = colorBlack[2]; // Blue
      this.eraseTopWaveformImageData.data[pixelIndex + 3] = colorBlack[3]; // Alpha (opacity)

   }

   for (let y = 0; y < waveformHeight; y++) {

      const pixelIndex = (y * columnWidth) * 4; // Each pixel occupies 4 positions (RGBA)
      this.eraseWaveformImageData.data[pixelIndex] = colorBlack[0]; // Red
      this.eraseWaveformImageData.data[pixelIndex + 1] = colorBlack[1]; // Green
      this.eraseWaveformImageData.data[pixelIndex + 2] = colorBlack[2]; // Blue
      this.eraseWaveformImageData.data[pixelIndex + 3] = colorBlack[3]; // Alpha (opacity)

   }

   for (let y = 0; y < waveformHeight; y++) {

      if ((y == 0) || (y == Math.floor(waveformHeight / 2)) || (y == waveformHeight - 1)) {
         const pixelIndex = (y * columnWidth) * 4; // Each pixel occupies 4 positions (RGBA)
         this.eraseWithDotsWaveformImageData.data[pixelIndex] = colorYellow[0]; // Red
         this.eraseWithDotsWaveformImageData.data[pixelIndex + 1] = colorYellow[1]; // Green
         this.eraseWithDotsWaveformImageData.data[pixelIndex + 2] = colorYellow[2]; // Blue
         this.eraseWithDotsWaveformImageData.data[pixelIndex + 3] = colorYellow[3]; // Alpha (opacity)
      }
      else {
         const pixelIndex = (y * columnWidth) * 4; // Each pixel occupies 4 positions (RGBA)
         this.eraseWithDotsWaveformImageData.data[pixelIndex] = colorBlack[0]; // Red
         this.eraseWithDotsWaveformImageData.data[pixelIndex + 1] = colorBlack[1]; // Green
         this.eraseWithDotsWaveformImageData.data[pixelIndex + 2] = colorBlack[2]; // Blue
         this.eraseWithDotsWaveformImageData.data[pixelIndex + 3] = colorBlack[3]; // Alpha (opacity)
      }

   }

   this.right = homeScreen.waveformAreaLeft + homeScreen.waveformAreaWidth;
   this.width = homeScreen.waveformAreaWidth;
   this.bottom = this.top + this.height;

   this.drawX = this.left;
   this.drawXTime = 0;
   this.eraseX = this.drawX + homeScreen.eraseBarWidth;
   this.drawY = 0;
   this.drawXLast = Number.MIN_VALUE;
   this.drawYLast = Number.MIN_VALUE;
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

      case 'ECGI':
      case 'ECGII':
      case 'ECGIII':
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
         this.autoscaleOffsetPercentage = 0;
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
            this.yMax =  4500;
         }
         else {
            // this.yMin = -500;
            // this.yMax = 500;
            this.yMin = -100;
            this.yMax = 4500;
            //this.yMax = 1500;
         }
         this.maxSimulatedSampleIndex = window.simulatedWaveformCO2.length;
         this.simulatedSamples = window.simulatedWaveformCO2;
         this.autoscaleOffsetPercentage = 0;
         break;

      case 'SPO2':
         this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
         this.color = window.colors.SPO2Color;
         this.fill = false;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 25.0;
         this.autoScale = false;  // already auto-scaled by monitor
         this.yMin = -16384;
         this.yMax = 16384;
         this.maxSimulatedSampleIndex = window.simulatedWaveformSpO2At250Hz.length;
         this.simulatedSamples = window.simulatedWaveformSpO2At250Hz;
         this.autoscaleOffsetPercentage = 5;
         break;

      case 'RESP_AUTO':
         this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
         this.color = window.colors.RESPColor;
         this.fill = false;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 6.25;
         this.autoScale = false;  // already auto-scaled by monitor
         this.yMin = -100 ;
         this.yMax =  100;
         this.maxSimulatedSampleIndex = window.simulatedWaveformRESP.length;
         this.simulatedSamples = window.simulatedWaveformRESP;
         this.autoscaleOffsetPercentage = 10;
         break;

      case 'RRA':
         this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
         this.color = window.colors.RESPColor;
         this.fill = false;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 6.25;
         this.autoScale = false;  // already auto-scaled by monitor
         this.yMin = -16384;
         this.yMax = 16384;
         this.maxSimulatedSampleIndex = window.simulatedWaveformRESP.length;
         this.simulatedSamples = window.simulatedWaveformRESP;
         this.autoscaleOffsetPercentage = 1;
         break;


   }


   this.imageData = new ImageData(1, 1);  // for drawing dots in scales

   // Extract RGB values from the color string
   const hexColor = this.color.substring(1); // Remove '#' from the color string
   const red = parseInt(hexColor.substring(0, 2), 16); // Parse the red component
   const green = parseInt(hexColor.substring(2, 4), 16); // Parse the green component
   const blue = parseInt(hexColor.substring(4, 6), 16); // Parse the blue component

   // Construct the Uint8ClampedArray representing RGBA values
   const rgbaValues = new Uint8ClampedArray([red, green, blue, 255]); // Alpha value set to 255 (fully opaque)

   this.imageData.data.set(rgbaValues); // Set color values

   this.initializing = true ;

   this.runningMinSample = Number.MAX_VALUE;
   this.runningMaxSample = Number.MIN_VALUE;

   this.autoScaleCount = 0;

   if (this.autoScale) {

      if (window.simulatedDataMode) {

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

         this.yMin = minY - amplitude * this.autoscaleOffsetPercentage / 100;
         this.yMax = maxY + amplitude * this.autoscaleOffsetPercentage / 100;

      }

   }

}

// Method to write a sample to the waveform ring buffer
Waveform.prototype.writeSample = function (sample) {
   this.buffer.enqueue(sample);
   if (this.buffer.getSize() > this.capacity) {
      this.buffer.dequeue(); // Remove oldest sample if buffer exceeds capacity
   }
};

// Method to read a sample from the waveform ring buffer
Waveform.prototype.readSample = function () {
   this.bufferReadCount++;
   const sample = this.buffer.dequeue();
   return sample;
};

// Method to peek at current sample from the waveform ring buffer without dequeuing it
Waveform.prototype.peekThisSample = function () {
   const sample = this.buffer.peek();
   return sample;
};

// Method to peek at sample beyond current sample from the waveform ring buffer without dequeuing it
Waveform.prototype.peekNextSample = function () {
   const sample = this.buffer.peekNext();
   return sample;
};

// Method to clear the waveform data
Waveform.prototype.clearSamples = function () {
   while (!this.buffer.isEmpty()) {
      this.buffer.dequeue();
   }
};

// Method to get number of samples
Waveform.prototype.getNSamples = function () {
   return this.buffer.getSize();
};

// Method to get the waveform name
Waveform.prototype.getWaveformName = function () {
   return this.waveformName;
};

// Method to get the waveform ID
Waveform.prototype.getWaveformId = function () {
   return this.waveformId;
};

// Method to get the samples as an array
Waveform.prototype.getSamples = function () {
   return this.buffer.toArray();
};

// Method to get the number of samples in the waveform
Waveform.prototype.getNumSamples = function () {
   return this.buffer.getSize();
};

// Method to get the capacity of the waveform
Waveform.prototype.getCapacity = function () {
   return this.capacity;
};


//
//   setupWaveforms - call when a new waveformDataMessage is received from the REST API
//

var nWaveforms;
var topWaveformHeight;
var waveformHeight;

function setupWaveforms(setupWaveformDataMessage) {

   homeScreen.clearWaveformList();

   // Parse the JSON string into JavaScript object
   const waveformData = JSON.parse(setupWaveformDataMessage);

   nWaveforms = waveformData.waveforms.length;

   //waveformHeight = Math.round(homeScreen.waveformAreaHeight / nWaveforms);

   switch (nWaveforms) {

      case 3 :

         topWaveformHeight = Math.round(homeScreen.waveformAreaHeight / 2);
         waveformHeight    = Math.round((Math.round(homeScreen.waveformAreaHeight) - Math.round(topWaveformHeight)) / 2) ;
         break ;

      case 2 :

         topWaveformHeight = Math.round(homeScreen.waveformAreaHeight / 2);
         waveformHeight    = Math.round(Math.round(homeScreen.waveformAreaHeight) - Math.round(topWaveformHeight)) ;
         break ;

      case 1 :
      default :

         topWaveformHeight = homeScreen.waveformAreaHeight ;
         waveformHeight    = topWaveformHeight ;
         break ;

   }

   // Add waveforms from the parsed data
   var order = 0;
   for (order = 0; order < nWaveforms; order++) {
      const wvf = new Waveform(waveformData.waveforms[order].waveformName, order);
      homeScreen.addWaveform(wvf);
   }

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

   //setupWaveforms(currentWaveforms[waveformSetIndex]);

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

var enteredMSPerPixel = 1 / (25 * pixelsPerMM / 1000);
var enteredMSPerSample = 4.0;
var currentMSPerSample = 4.0;
var currentMSPerSampleHigh = 4.1;
var currentMSPerSampleNormal = 4.0;
var currentMSPerSampleLow = 3.9;
// var waveformSampleBufferCountMin = 300;
// var waveformSampleBufferCountMax = 400;
var waveformSampleBufferCountMin = 300;
var waveformSampleBufferCountMax = 400;

//
//   drawWaveform
//

function drawWaveform(w) {

   wvf = homeScreen.waveforms[w];

   if (wvf.waveformName == "CO2") {

      if (wvf.initializing) {

         wvf.initializing = false ;
         
         var x ;
         for (x = wvf.left; x < wvf.right; x++) {

            if (((x - wvf.left) % 16) == 0) {
               displayCtx.putImageData(wvf.eraseWithDotsWaveformImageData, x, wvf.top);
            }
            else {
               displayCtx.putImageData(wvf.eraseWaveformImageData, x, wvf.top);
            }

         }

      }

   }

   var sweepSpeedMMPerSecond = wvf.sweepSpeed;
   var pixelsPerSecond = sweepSpeedMMPerSecond * pixelsPerMM;
   var pixelsPerMS = pixelsPerSecond / 1000;
   var MSPerPixel = 1 / pixelsPerMS;
   var MSPerSample = 0;
   if (window.simulatedDataMode) {
      //MSPerPixel = 1 / pixelsPerMS;
      //MSPerSample = 1000 / wvf.sampleRateIn;
   }
   else {
      //MSPerPixel = enteredMSPerPixel;
      //MSPerSample = enteredMSPerSample;
      MSPerSample = currentMSPerSample;
   }

   const normalizeWaveform = (value) => {

      normalizedValue = wvf.top + wvf.height - ((value - wvf.yMin) / (wvf.yMax - wvf.yMin) * wvf.height);

      if (normalizedValue < wvf.top + 1) {
         normalizedValue = wvf.top + 1;
         //normalizedValue = LEAD_OFF_OR_UNPLUGGED;
      }
      else if (normalizedValue > wvf.bottom - 1) {
         normalizedValue = wvf.bottom - 1;
         //normalizedValue = LEAD_OFF_OR_UNPLUGGED;
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

   if (wvf.waveformName == "RESP_AUTO") {
      var q = 0 ;
   }

   while (wvf.drawXTime < wvf.elapsedTime) {

      if (wvf.waveformName == "RESP_AUTO") {
         var q = 0 ;
      }

      //if (MSPerPixel > MSPerSample) {   we now upsample 50Hz waveform so that this is always true

      var avgYSum = 0;
      var avgYCount = 0;
      var highestY = Number.MIN_VALUE;
      var lowestY = Number.MAX_VALUE;

      var skipPixel = 0;
      while (wvf.drawnPixelTime > wvf.readSampleTime) {

         if (window.simulatedDataMode) {
            var thisY = normalizeWaveform(wvf.simulatedSamples[wvf.tailIndex]);
            wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSimulatedSampleIndex;
            wvf.samplesDrawn++;
            wvf.readSampleTime += MSPerSample;
         }
         else {
            var thisSample = wvf.readSample();
            wvf.samplesDrawn++;
            wvf.readSampleTime += MSPerSample;

            if (thisSample == LEAD_OFF_OR_UNPLUGGED) {
               skipPixel = 1;
            }
            else {
               var thisY = normalizeWaveform(thisSample);
               if (thisY == LEAD_OFF_OR_UNPLUGGED) {
                  skipPixel = 1;
               }
            }

         }

         avgYSum += thisY;
         avgYCount++;

         if (thisY > highestY) {
            highestY = thisY;
         }
         if (thisY < lowestY) {
            lowestY = thisY;
         }

      }

      if (skipPixel == 0) {

         if (wvf.waveformName.indexOf("ECG") !== -1) {  //if ECG (to preserve peaks) use :wvf.drawY = lowestY;
            wvf.drawY = lowestY;
         }
         // else if (wvf.waveformName.indexOf("RRA") !== -1) { //if RRA (to preserve amplitude) use most extreme point
         //    var highDiff = Math.abs(highestY - wvf.drawY);
         //    var lowDiff = Math.abs(lowestY - wvf.drawY);
         //    if (highDiff > lowDiff) {
         //       wvf.drawY = highestY;
         //    }
         //    else {
         //       wvf.drawY = lowestY;
         //    }
         //    if (wvf.drawY < wvf.top) {
         //       wvf.drawY = wvf.top;
         //    }
         //    else if (wvf.drawY > wvf.bottom) {
         //       wvf.drawY = wvf.bottom;
         //    }
         // }
         else {
            wvf.drawY = avgYSum / avgYCount;
         }

         if ((wvf.drawXLast != Number.MIN_VALUE) && (wvf.drawYLast != Number.MIN_VALUE)) {
            displayCtx.moveTo(wvf.drawXLast, wvf.drawYLast);
            displayCtx.lineTo(wvf.drawX, wvf.drawY);
            if (wvf.fill) {
               displayCtx.lineTo(wvf.drawX, wvf.bottom - 1);
            }
         }
         wvf.drawXLast = wvf.drawX;
         wvf.drawYLast = wvf.drawY;

      }

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
 
   var eraseBarPixelsDrawn = 0;
   while (eraseBarPixelsDrawn < NewSamplePixelsDrawn) {

      if (wvf.order == 0) {
         displayCtx.putImageData(wvf.eraseTopWaveformImageData, wvf.eraseX, wvf.top);
      }
      else if (wvf.waveformName == "CO2") {
         if ((wvf.eraseX % 16) == 0) {
            displayCtx.putImageData(wvf.eraseWithDotsWaveformImageData, wvf.eraseX, wvf.top);
         }
         else {
            displayCtx.putImageData(wvf.eraseWaveformImageData, wvf.eraseX, wvf.top);
         }
      }
      else {
         displayCtx.putImageData(wvf.eraseWaveformImageData, wvf.eraseX, wvf.top);
      }

      wvf.eraseX++;
      if (wvf.eraseX >= wvf.right) {

         wvf.eraseX = wvf.left;

         // do this to erase the pixel column that gets drawn to the left of wvf.left since the line width is 2
         if (wvf.order == 0) {
            displayCtx.putImageData(wvf.eraseTopWaveformImageData, wvf.eraseX-1, wvf.top + 2);
         }
         else {
            displayCtx.putImageData(wvf.eraseWaveformImageData, wvf.eraseX-1, wvf.top + 2);
         }

      }

      eraseBarPixelsDrawn++;

   }

}


//
//   drawWaveformScaleArea
//

function drawWaveformScaleArea(elapsed) {

   displayCtx.fillStyle = window.colors.ZBLACK;
   displayCtx.clearRect(homeScreen.waveformScaleAreaLeft, homeScreen.waveformScaleAreaTop, homeScreen.waveformScaleAreaWidth, homeScreen.waveformScaleAreaHeight);
   displayCtx.fillRect(homeScreen.waveformScaleAreaLeft, homeScreen.waveformScaleAreaTop, homeScreen.waveformScaleAreaWidth, homeScreen.waveformScaleAreaHeight);

   var w;
   for (w = 0; w < homeScreen.waveforms.length; w++) {

      wvf = homeScreen.waveforms[w];

      if (wvf.waveformName.indexOf("ECG") !== -1) {  
   
         let labelRect, gainRect, bracketRect;

         let labelRectTop = wvf.top ;
         let labelRectBottom = wvf.bottom ;
         var labelRectLeft = homeScreen.waveformScaleAreaLeft + homeScreen.waveformScaleAreaWidth * 30 / 100 ;
         var labelRectRight = homeScreen.waveformScaleAreaRight ;

         labelRect = new CRect(labelRectLeft, labelRectTop, labelRectRight, labelRectBottom);

         let gainRectTop = wvf.top ;
         let gainRectBottom = wvf.bottom ;
         var gainRectLeft = homeScreen.waveformScaleAreaLeft + homeScreen.waveformScaleAreaWidth * 10 / 100 ;
         var gainRectRight = homeScreen.waveformScaleAreaRight ;

         gainRect =  new CRect(gainRectLeft, gainRectTop, gainRectRight, gainRectBottom);
 
         bracketRect = new CRect(homeScreen.waveformScaleAreaLeft, wvf.top, homeScreen.waveformScaleAreaRight, wvf.bottom);

         let waveGain = homeScreen.getSettingValue("ECGGain")

         let bracketHeightInMM;
         let bracketHeightInPixels;
         let gainText ;

         let bandHeightInMM = Math.round(wvf.height / pixelsPerMM);

         // WAVE_SIZE_SETTING ECGSettings[] = {
         //    { SN_2_5_mm_mV ,  -(bandHeightInMM * LSBS_PER_MV) / (1 * 5)  , (bandHeightInMM * LSBS_PER_MV) / (1 * 5)  } ,
         //    { SN_5_mm_mV   ,  -(bandHeightInMM * LSBS_PER_MV) / (2 * 5)  , (bandHeightInMM * LSBS_PER_MV) / (2 * 5)  } ,
         //    { SN_10_mm_mV  ,  -(bandHeightInMM * LSBS_PER_MV) / (2 * 10) , (bandHeightInMM * LSBS_PER_MV) / (2 * 10) } ,
         //    { SN_15_mm_mV  ,  -(bandHeightInMM * LSBS_PER_MV) / (2 * 15) , (bandHeightInMM * LSBS_PER_MV) / (2 * 15) } ,
         //    { SN_20_mm_mV  ,  -(bandHeightInMM * LSBS_PER_MV) / (2 * 20) , (bandHeightInMM * LSBS_PER_MV) / (2 * 20) } ,
         // } ;

         switch (waveGain) {
            case "2.5 mm/mV":
               wvf.yMin = -(bandHeightInMM * window.LSBS_PER_MV) / (1 * 5);
               wvf.yMax =  (bandHeightInMM * window.LSBS_PER_MV) / (1 * 5);
               bracketHeightInMM = 2.5;
               gainText = "1 mV";
               break;
            case "5 mm/mV":
               wvf.yMin = -(bandHeightInMM * window.LSBS_PER_MV) / (2 * 5);
               wvf.yMax =  (bandHeightInMM * window.LSBS_PER_MV) / (2 * 5);
               bracketHeightInMM = 5.0;
               gainText = "1 mV";
               break;
            case "10 mm/mV":
               wvf.yMin = -(bandHeightInMM * window.LSBS_PER_MV) / (2 * 10);
               wvf.yMax =  (bandHeightInMM * window.LSBS_PER_MV) / (2 * 10);
               bracketHeightInMM = 10.0;
               gainText = "1 mV";
               break;
            case "15 mm/mV":
               wvf.yMin = -(bandHeightInMM * window.LSBS_PER_MV) / (2 * 15);
               wvf.yMax =  (bandHeightInMM * window.LSBS_PER_MV) / (2 * 15);
               bracketHeightInMM = 7.5;
               gainText = "0.5 mV";
               break;
            case "20 mm/mV":
               wvf.yMin = -(bandHeightInMM * window.LSBS_PER_MV) / (2 * 20);
               wvf.yMax =  (bandHeightInMM * window.LSBS_PER_MV) / (2 * 20);
               bracketHeightInMM = 10.0;
               gainText = "0.5 mV";
               break;
         }

         bracketHeightInPixels = Math.round(bracketHeightInMM * pixelsPerMM);

         bracketRect.top = wvf.top + wvf.height * 50 / 100 - bracketHeightInPixels / 2;

         bracketRect.bottom = bracketRect.top + bracketHeightInPixels;

         let leadText = homeScreen.getSettingValue("ECGLead")

         let leadHeight = wvf.height / 5;
         let gainHeight = wvf.height / 5;

         labelRect.top = bracketRect.top - leadHeight * 75 / 100 ;

         gainRect.top = bracketRect.bottom + gainHeight * 25 / 100 ;

         fitText(leadText, window.colors.ZWHITE, 'Arial', 11, labelRect.left, labelRect.top, labelRect.width()-1, labelRect.height(), 'left', 'top') ;
         fitText(gainText, window.colors.ZWHITE, 'Arial', 11, gainRect.left, gainRect.top, gainRect.width()-1, gainRect.height(), 'left', 'top') ;

         let bracketXOffset = 5;
         let bracketLegWidth = 10;
         let bracketCenterWidth = 10;

         let bracketLeft = bracketRect.left + bracketXOffset;
         let bracketCenterLeft = bracketLeft + bracketLegWidth;
         let bracketCenterRight = bracketCenterLeft + bracketCenterWidth;
         let bracketRight = bracketCenterRight + bracketLegWidth;

         let bracketTop = bracketRect.top;
         let bracketBottom = bracketRect.bottom;

         drawLine(displayCtx, bracketLeft, bracketBottom, bracketCenterLeft, bracketBottom, window.colors.ZWHITE);
         drawLine(displayCtx, bracketCenterLeft, bracketBottom, bracketCenterLeft, bracketTop, window.colors.ZWHITE);
         drawLine(displayCtx, bracketCenterLeft, bracketTop, bracketCenterRight, bracketTop, window.colors.ZWHITE);
         drawLine(displayCtx, bracketCenterRight, bracketTop, bracketCenterRight, bracketBottom, window.colors.ZWHITE);
         drawLine(displayCtx, bracketCenterRight, bracketBottom, bracketRight, bracketBottom, window.colors.ZWHITE);

      }
      else if (wvf.waveformName == "CO2") {

         var scaleHiLeft = homeScreen.waveformScaleAreaLeft + homeScreen.waveformScaleAreaWidth * 80 / 100 ;
         var scaleHiTop = wvf.top + wvf.height * 5 / 100 ;
         var scaleHiWidth = homeScreen.waveformScaleAreaWidth ;
         var scaleHiHeight = wvf.height * 25 / 100 ;

         var scaleLoLeft = homeScreen.waveformScaleAreaLeft + homeScreen.waveformScaleAreaWidth * 80 / 100 ;
         var scaleLoTop = wvf.bottom - wvf.height * 0 / 100 ;
         var scaleLoWidth = homeScreen.waveformScaleAreaWidth ;
         var scaleLoHeight = wvf.height * 20 / 100 ;

         fitText(homeScreen.getSettingValue("CO2 scale hi"), wvf.color, 'Arial', 11, scaleHiLeft, scaleHiTop, scaleHiWidth, scaleHiHeight, 'right', 'top') ;
         fitText(homeScreen.getSettingValue("CO2 scale lo"), wvf.color, 'Arial', 11, scaleLoLeft, scaleLoTop, scaleLoWidth, scaleLoHeight, 'right', 'bottom') ;

      }

   }

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


