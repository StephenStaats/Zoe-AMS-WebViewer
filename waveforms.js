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
         this.top = homeScreen.waveformAreaTop;
         this.height = topWaveformHeight;
         break;

      case 1:
         this.top = homeScreen.waveformAreaTop + topWaveformHeight;
         this.height = waveformHeight;
         break;

      case 2:
         this.top = homeScreen.waveformAreaTop + topWaveformHeight + waveformHeight;
         this.height = waveformHeight;
         break;

   }

   // Create a new ImageData object for a 1-pixel-wide column
   const columnWidth = 1;
   this.eraseTopWaveformImageData = displayCtx.createImageData(columnWidth, topWaveformHeight);
   this.eraseWaveformImageData = displayCtx.createImageData(columnWidth, waveformHeight);
   this.eraseWithDotsWaveformImageData = displayCtx.createImageData(columnWidth, waveformHeight);

   // Set color values for each pixel in the column
   const colorYellow = [255, 255, 0, 255]; // RGBA values for yellow color
   const colorBlack = [0, 0, 0, 255]; // RGBA values for black color

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

   // Create a new ImageData object for a 1-pixel-high row
   const rowHeight = 1;
   this.eraseTopWaveformImageDataRow = displayCtx.createImageData(topWaveformHeight, rowHeight);
   this.eraseWaveformImageDataRow = displayCtx.createImageData(waveformHeight, rowHeight);
   this.eraseWithDotsWaveformImageDataRow = displayCtx.createImageData(waveformHeight, rowHeight);

   for (let y = 0; y < topWaveformHeight; y++) {

      const pixelIndex = (y * columnWidth) * 4; // Each pixel occupies 4 positions (RGBA)
      this.eraseTopWaveformImageDataRow.data[pixelIndex] = colorBlack[0]; // Red
      this.eraseTopWaveformImageDataRow.data[pixelIndex + 1] = colorBlack[1]; // Green
      this.eraseTopWaveformImageDataRow.data[pixelIndex + 2] = colorBlack[2]; // Blue
      this.eraseTopWaveformImageDataRow.data[pixelIndex + 3] = colorBlack[3]; // Alpha (opacity)

   }

   for (let y = 0; y < waveformHeight; y++) {

      const pixelIndex = (y * columnWidth) * 4; // Each pixel occupies 4 positions (RGBA)
      this.eraseWaveformImageDataRow.data[pixelIndex] = colorBlack[0]; // Red
      this.eraseWaveformImageDataRow.data[pixelIndex + 1] = colorBlack[1]; // Green
      this.eraseWaveformImageDataRow.data[pixelIndex + 2] = colorBlack[2]; // Blue
      this.eraseWaveformImageDataRow.data[pixelIndex + 3] = colorBlack[3]; // Alpha (opacity)

   }

   for (let y = 0; y < waveformHeight; y++) {

      if ((y == 0) || (y == Math.floor(waveformHeight / 2)) || (y == waveformHeight - 1)) {
         const pixelIndex = (y * columnWidth) * 4; // Each pixel occupies 4 positions (RGBA)
         this.eraseWithDotsWaveformImageDataRow.data[pixelIndex] = colorYellow[0]; // Red
         this.eraseWithDotsWaveformImageDataRow.data[pixelIndex + 1] = colorYellow[1]; // Green
         this.eraseWithDotsWaveformImageDataRow.data[pixelIndex + 2] = colorYellow[2]; // Blue
         this.eraseWithDotsWaveformImageDataRow.data[pixelIndex + 3] = colorYellow[3]; // Alpha (opacity)
      }
      else {
         const pixelIndex = (y * columnWidth) * 4; // Each pixel occupies 4 positions (RGBA)
         this.eraseWithDotsWaveformImageDataRow.data[pixelIndex] = colorBlack[0]; // Red
         this.eraseWithDotsWaveformImageDataRow.data[pixelIndex + 1] = colorBlack[1]; // Green
         this.eraseWithDotsWaveformImageDataRow.data[pixelIndex + 2] = colorBlack[2]; // Blue
         this.eraseWithDotsWaveformImageDataRow.data[pixelIndex + 3] = colorBlack[3]; // Alpha (opacity)
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
      case 'ECGAVL':
      case 'ECGAVR':
      case 'ECGAVF':
      case 'ECGV':
      case 'ECGV1':
      case 'ECGV2':
      case 'ECGV3':
      case 'ECGV4':
      case 'ECGV5':
      case 'ECGV6':

         this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
         this.color = window.colors.ECGColor;
         this.fill = false;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 25.0;
         this.autoScale = false;
         this.yMin = -500;
         this.yMax = 500;
         break;

      case 'CO2':
         this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
         this.color = window.colors.CO2Color;
         this.fill = true;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 6.25;
         this.autoScale = false;
         if (window.simulatedDataMode == 1) {
            this.yMin = -500;
            this.yMax = 500;
         }
         else {

            var CO2Size = homeScreen.getSettingValue("CO2size");

            if (CO2Size == "20") {
               this.yMin = -100;
               this.yMax = 2000;
            }
            else if (CO2Size == "40") {
               this.yMin = -100;
               this.yMax = 4000;
            }
            else if (CO2Size == "60") {
               this.yMin = -100;
               this.yMax = 6000;
            }
            else if (CO2Size == "80") {
               this.yMin = -100;
               this.yMax = 8000;
            }
            else {
               this.yMin = -100;
               this.yMax = 8000;
            }

            // this.yMin = -100;
            // this.yMax = 4500;
            //this.yMax = 1500;
         }
         // this.maxSimulatedSampleIndex = window.simulatedWaveformCO2.length;
         // this.simulatedSamples = window.simulatedWaveformCO2;
         // this.autoscaleOffsetPercentage = 0;
         break;

      case 'SPO2':
         this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
         this.color = window.colors.SPO2Color;
         this.fill = false;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 25.0;
         this.autoScale = false;  // already auto-scaled by monitor
         if (window.simulatedDataMode == 1) {
            this.yMin = -5000;
            this.yMax = 5000;
         }
         else {
            this.yMin = -16384;
            this.yMax = 16384;
         }
         // this.maxSimulatedSampleIndex = window.simulatedWaveformSpO2At250Hz.length;
         // this.simulatedSamples = window.simulatedWaveformSpO2At250Hz;
         // this.autoscaleOffsetPercentage = 5;
         break;

      case 'RESP_AUTO':
         this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
         this.color = window.colors.RESPColor;
         this.fill = false;
         this.sampleRateIn = 250;
         this.sampleRate = 250;
         this.sweepSpeed = 6.25;
         this.autoScale = false;  // already auto-scaled by monitor
         if (window.simulatedDataMode == 1) {
            this.yMin = -5000;
            this.yMax = 5000;
         }
         else {
            this.yMin = -100;
            this.yMax = 100;
         }
         // this.maxSimulatedSampleIndex = window.simulatedWaveformRESP.length;
         // this.simulatedSamples = window.simulatedWaveformRESP;
         // this.autoscaleOffsetPercentage = 10;
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
         // this.maxSimulatedSampleIndex = window.simulatedWaveformRESP.length;
         // this.simulatedSamples = window.simulatedWaveformRESP;
         // this.autoscaleOffsetPercentage = 1;
         break;


   }


   //this.imageData = new ImageData(1, 1);  // for drawing dots in scales

   // // Extract RGB values from the color string
   // const hexColor = this.color.substring(1); // Remove '#' from the color string
   // const red = parseInt(hexColor.substring(0, 2), 16); // Parse the red component
   // const green = parseInt(hexColor.substring(2, 4), 16); // Parse the green component
   // const blue = parseInt(hexColor.substring(4, 6), 16); // Parse the blue component

   // // Construct the Uint8ClampedArray representing RGBA values
   // const rgbaValues = new Uint8ClampedArray([red, green, blue, 255]); // Alpha value set to 255 (fully opaque)

   // this.imageData.data.set(rgbaValues); // Set color values

   //this.initializing = true ;

   // this.runningMinSample = Number.MAX_VALUE;
   // this.runningMaxSample = Number.MIN_VALUE;

   // this.autoScaleCount = 0;

   // if (this.autoScale) {

   //    if (window.simulatedDataMode == 1) {

   //       var minY;
   //       var maxY;

   //       minY = Number.MAX_VALUE;
   //       maxY = Number.MIN_VALUE;
   //       var s;
   //       for (s = 0; s < this.maxSimulatedSampleIndex; s++) {
   //          if (this.simulatedSamples[s] < minY) {
   //             minY = this.simulatedSamples[s];
   //          }
   //          if (this.simulatedSamples[s] > maxY) {
   //             maxY = this.simulatedSamples[s];
   //          }
   //       }
   //       var amplitude = maxY - minY;

   //       this.yMin = minY - amplitude * this.autoscaleOffsetPercentage / 100;
   //       this.yMax = maxY + amplitude * this.autoscaleOffsetPercentage / 100;

   //    }

   // }

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

   var sweepSpeedMMPerSecond = wvf.sweepSpeed;
   var pixelsPerSecond = sweepSpeedMMPerSecond * pixelsPerMM;
   var pixelsPerMS = pixelsPerSecond / 1000;
   var MSPerPixel = 1 / pixelsPerMS;
   var MSPerSample = 0;
   if (window.simulatedDataMode == 1) {
      MSPerPixel = 1 / pixelsPerMS;
      MSPerSample = 1000 / wvf.sampleRateIn;
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
      var q = 0;
   }

   while (wvf.drawXTime < wvf.elapsedTime) {

      if (wvf.waveformName == "RESP_AUTO") {
         var q = 0;
      }

      //if (MSPerPixel > MSPerSample) {   we now upsample 50Hz waveform so that this is always true

      var avgYSum = 0;
      var avgYCount = 0;
      var highestY = Number.MIN_VALUE;
      var lowestY = Number.MAX_VALUE;

      var skipPixel = 0;
      while (wvf.drawnPixelTime > wvf.readSampleTime) {

         // if (window.simulatedDataMode == 1) {
         //    var thisY = normalizeWaveform(wvf.simulatedSamples[wvf.tailIndex]);
         //    wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSimulatedSampleIndex;
         //    wvf.samplesDrawn++;
         //    wvf.readSampleTime += MSPerSample;
         // }
         // else {
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
            else {

               avgYSum += thisY;
               avgYCount++;

               if (thisY > highestY) {
                  highestY = thisY;
               }
               if (thisY < lowestY) {
                  lowestY = thisY;
               }

            }

         }

         //}

         // avgYSum += thisY;
         // avgYCount++;

         // if (thisY > highestY) {
         //    highestY = thisY;
         // }
         // if (thisY < lowestY) {
         //    lowestY = thisY;
         // }

      }

      if (skipPixel == 0) {

         // if (wvf.waveformName.indexOf("ECG") !== -1) {  //if ECG (to preserve peaks) use :wvf.drawY = lowestY;
         //    wvf.drawY = lowestY;
         // }

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

         if (wvf.waveformName.indexOf("ECG") !== -1) { //if ECG (to preserve amplitude) use most extreme point

            // var highDiff = Math.abs(highestY - wvf.drawYLast);
            // var lowDiff = Math.abs(lowestY - wvf.drawYLast);
            // if (highDiff > lowDiff) {
            //    wvf.drawY = highestY;
            // }
            // else {
            //    wvf.drawY = lowestY;
            // }

            if ((highestY > wvf.drawYLast) && (lowestY > wvf.drawYLast)) {
               wvf.drawY = highestY;
            }
            else if ((highestY < wvf.drawYLast) && (lowestY < wvf.drawYLast)) {
               wvf.drawY = lowestY;
            }
            else {
               wvf.drawYLast = lowestY;
               wvf.drawY = highestY;
            }

            if (wvf.drawY < wvf.top) {
               wvf.drawY = wvf.top;
            }
            else if (wvf.drawY > wvf.bottom) {
               wvf.drawY = wvf.bottom;
            }
         }

         else {
            wvf.drawY = avgYSum / avgYCount;
         }

         //if ((wvf.drawXLast != Number.MIN_VALUE) && (wvf.drawYLast != Number.MIN_VALUE)) {
         if ((wvf.drawXLast != Number.MIN_VALUE) && (wvf.drawYLast != Number.MIN_VALUE) && (wvf.drawYLast != wvf.top) && (wvf.drawYLast != wvf.bottom)) {
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

   displayCtx.beginPath();

   displayCtx.strokeStyle = window.colors.ZBLACK;
   displayCtx.lineWidth = 2;
   displayCtx.lineJoin = 'round';
   displayCtx.lineCap = 'round';

   var eraseBarPixelsDrawn = 0;
   while (eraseBarPixelsDrawn < NewSamplePixelsDrawn) {

      // displayCtx.moveTo(wvf.eraseX, wvf.top + 1);
      // displayCtx.lineTo(wvf.eraseX, wvf.bottom);


      if (window.rotated) {

         // displayCtx.moveTo(wvf.eraseX, wvf.top + 1);
         // displayCtx.lineTo(wvf.eraseX, wvf.bottom);

         // wvf.eraseX++;
         // if (wvf.eraseX >= wvf.right) {
         //    wvf.eraseX = wvf.left;
         // }



            // var x ;
            // for (x = wvf.left; x < wvf.right; x++) {
            //    if ((x % 16) == 0) {
            //       var rotatedX = Math.floor(rotateX(x, -wvf.top, 90)) ;
            //       var rotatedY = Math.floor(displayCanvas.height - rotateY(x, -wvf.top, 90)) ;
            //       displayCtx.putImageData(wvf.eraseWithDotsWaveformImageDataRow, rotatedX, rotatedY);
            //       LOGEVENTYELLOW("put ImageData with dots at " + rotatedX + ", " + rotatedY) ;
            //    }
            // }



         var rotatedX = Math.floor(rotateX(wvf.eraseX, -wvf.top, 90)) ; 
         var rotatedY = Math.floor(displayCanvas.height - rotateY(wvf.eraseX, -wvf.top, 90)) ; 

         if (wvf.order == 0) {
            displayCtx.putImageData(wvf.eraseTopWaveformImageDataRow, rotatedX, rotatedY);
         }
         else if (wvf.waveformName == "CO2") {
            if ((wvf.eraseX % 16) == 0) {
               displayCtx.putImageData(wvf.eraseWithDotsWaveformImageDataRow, rotatedX, rotatedY);
            }
            else {
               displayCtx.putImageData(wvf.eraseWaveformImageDataRow, rotatedX, rotatedY);
            }
         }
         else {
            displayCtx.putImageData(wvf.eraseWaveformImageDataRow, rotatedX, rotatedY);
         }

         wvf.eraseX++;
         if (wvf.eraseX >= wvf.right) {
            wvf.eraseX = wvf.left;

            //var rotatedXL = displayCanvas.height - rotateX(wvf.left - 1, -wvf.top, 90) ;

            if (wvf.order == 0) {
               displayCtx.putImageData(wvf.eraseTopWaveformImageDataRow, rotatedX, rotatedY-1);
            }
            else {
               displayCtx.putImageData(wvf.eraseWaveformImageDataRow, rotatedX, rotatedY-1);
            }

         }

      }
      else {

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

            if (wvf.order == 0) {
               displayCtx.putImageData(wvf.eraseTopWaveformImageData, wvf.eraseX - 1, wvf.top);
            }
            else {
               displayCtx.putImageData(wvf.eraseWaveformImageData, wvf.eraseX - 1, wvf.top);
            }

         }

      }



      eraseBarPixelsDrawn++;

   }

   displayCtx.stroke();


}


//
//   getECGLeadTextFromWaveformName
//

function getECGLeadTextFromWaveformName(waveformName) {

   let returnText = "" ;

   switch (waveformName) {

      case "ECGI":     returnText = "I";      break ;
      case "ECGII":    returnText = "II";     break ;
      case "ECGIII":   returnText = "III";    break ;
      case "ECGAVL":   returnText = "aVL";    break ;
      case "ECGAVR":   returnText = "aVR";    break ;
      case "ECGAVF":   returnText = "aVF";    break ;
      case "ECGV":     returnText = "V";      break ;
      case "ECGV1":    returnText = "V1";     break ;
      case "ECGV2":    returnText = "V2";     break ;
      case "ECGV3":    returnText = "V3";     break ;
      case "ECGV4":    returnText = "V4";     break ;
      case "ECGV5":    returnText = "V5";     break ;
      case "ECGV6":    returnText = "V6";     break ;

   }

   return (returnText) ;

}


//
//   drawWaveformScaleArea
//

function drawWaveformScaleArea() {

   displayCtx.fillStyle = window.colors.ZBLACK;
   displayCtx.fillRect(homeScreen.waveformScaleAreaLeft, homeScreen.waveformScaleAreaTop, homeScreen.waveformScaleAreaWidth, homeScreen.waveformScaleAreaHeight);

   var w;
   for (w = 0; w < homeScreen.waveforms.length; w++) {

      wvf = homeScreen.waveforms[w];

      if (wvf.waveformName.indexOf("ECG") !== -1) {

         let labelRect, gainRect, bracketRect;

         let labelRectTop = wvf.top;
         let labelRectBottom = wvf.bottom;
         //var labelRectLeft = homeScreen.waveformScaleAreaLeft + homeScreen.waveformScaleAreaWidth * 30 / 100;
         var labelRectLeft = homeScreen.waveformScaleAreaLeft + homeScreen.waveformScaleAreaWidth * 10 / 100;
         var labelRectRight = homeScreen.waveformScaleAreaRight;

         labelRect = new CRect(labelRectLeft, labelRectTop, labelRectRight, labelRectBottom);

         let gainRectTop = wvf.top;
         let gainRectBottom = wvf.bottom;
         //var gainRectLeft = homeScreen.waveformScaleAreaLeft + homeScreen.waveformScaleAreaWidth * 10 / 100;
         var gainRectLeft = homeScreen.waveformScaleAreaLeft + homeScreen.waveformScaleAreaWidth * 10 / 100;
         var gainRectRight = homeScreen.waveformScaleAreaRight;

         gainRect = new CRect(gainRectLeft, gainRectTop, gainRectRight, gainRectBottom);

         //bracketRect = new CRect(homeScreen.waveformScaleAreaLeft, wvf.top, homeScreen.waveformScaleAreaRight, wvf.bottom);
         bracketRect = new CRect(gainRectLeft, wvf.top, homeScreen.waveformScaleAreaRight, wvf.bottom);

         let waveGain = homeScreen.getSettingValue("ECGGain")

         let bracketHeightInMM;
         let bracketHeightInPixels;
         let gainText;

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
               wvf.yMax = (bandHeightInMM * window.LSBS_PER_MV) / (1 * 5);
               bracketHeightInMM = 2.5;
               gainText = "1 mV";
               break;
            case "5 mm/mV":
               wvf.yMin = -(bandHeightInMM * window.LSBS_PER_MV) / (2 * 5);
               wvf.yMax = (bandHeightInMM * window.LSBS_PER_MV) / (2 * 5);
               bracketHeightInMM = 5.0;
               gainText = "1 mV";
               break;
            case "10 mm/mV":
               wvf.yMin = -(bandHeightInMM * window.LSBS_PER_MV) / (2 * 10);
               wvf.yMax = (bandHeightInMM * window.LSBS_PER_MV) / (2 * 10);
               bracketHeightInMM = 10.0;
               gainText = "1 mV";
               break;
            case "15 mm/mV":
               wvf.yMin = -(bandHeightInMM * window.LSBS_PER_MV) / (2 * 15);
               wvf.yMax = (bandHeightInMM * window.LSBS_PER_MV) / (2 * 15);
               bracketHeightInMM = 7.5;
               gainText = "0.5 mV";
               break;
            case "20 mm/mV":
               wvf.yMin = -(bandHeightInMM * window.LSBS_PER_MV) / (2 * 20);
               wvf.yMax = (bandHeightInMM * window.LSBS_PER_MV) / (2 * 20);
               bracketHeightInMM = 10.0;
               gainText = "0.5 mV";
               break;
         }

         bracketHeightInPixels = Math.round(bracketHeightInMM * pixelsPerMM);

         bracketRect.top = wvf.top + wvf.height * 50 / 100 - bracketHeightInPixels / 2;

         bracketRect.bottom = bracketRect.top + bracketHeightInPixels;

         // let leadText = homeScreen.getSettingValue("ECGLead")

         let leadText = getECGLeadTextFromWaveformName(wvf.waveformName);

         let leadHeight = wvf.height / 5;
         let gainHeight = wvf.height / 5;

         labelRect.top = bracketRect.top - leadHeight * 75 / 100;

         gainRect.top = bracketRect.bottom + gainHeight * 25 / 100;

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

         //fitText(leadText, window.colors.ZWHITE, 'Arial', 11, labelRect.left, labelRect.top, labelRect.width() - 1, labelRect.height(), 'left', 'top');
         //fitText(leadText, window.colors.ZWHITE, window.colors.ZBLACK, 'Arial', 11, (bracketCenterLeft + bracketCenterRight) / 2, labelRect.top, labelRect.width() - 1, labelRect.height(), 'center', 'top');
         //fitText(gainText, window.colors.ZWHITE, window.colors.ZBLACK, 'Arial', 11, gainRect.left, gainRect.top, gainRect.width() - 1, gainRect.height(), 'left', 'top');
         fitOverlayText(leadText, window.colors.ZWHITE, 'Arial', 11, (bracketCenterLeft + bracketCenterRight) / 2, labelRect.top, labelRect.width() - 1, labelRect.height(), 'center', 'top');
         fitOverlayText(gainText, window.colors.ZWHITE, 'Arial', 11, gainRect.left, gainRect.top, gainRect.width() - 1, gainRect.height(), 'left', 'top');

      }
      else if (wvf.waveformName == "CO2") {

         var scaleHiLeft = homeScreen.waveformScaleAreaLeft + homeScreen.waveformScaleAreaWidth * 80 / 100;
         var scaleHiTop = wvf.top + wvf.height * 5 / 100;
         var scaleHiWidth = homeScreen.waveformScaleAreaWidth;
         var scaleHiHeight = wvf.height * 25 / 100;

         var scaleLoLeft = homeScreen.waveformScaleAreaLeft + homeScreen.waveformScaleAreaWidth * 80 / 100;
         var scaleLoTop = wvf.bottom - wvf.height * 0 / 100;
         var scaleLoWidth = homeScreen.waveformScaleAreaWidth;
         var scaleLoHeight = wvf.height * 20 / 100;

         fitOverlayText(homeScreen.getSettingValue("CO2ScaleHi"), wvf.color, 'Arial', 11, scaleHiLeft, scaleHiTop, scaleHiWidth, scaleHiHeight, 'right', 'top');
         fitOverlayText(homeScreen.getSettingValue("CO2ScaleLo"), wvf.color, 'Arial', 11, scaleLoLeft, scaleLoTop, scaleLoWidth, scaleLoHeight, 'right', 'bottom');

         if (window.rotated) {

            // var x ;
            // for (x = wvf.left; x < wvf.right; x++) {
            //    if ((x % 16) == 0) {
            //       var rotatedImageData = rotateImageData(wvf.eraseWithDotsWaveformImageData, 1, wvf.height);
            //       displayCtx.putImageData(rotatedImageData, x, wvf.top);
            //       LOGEVENTYELLOW("put rotatedImageData with dots at " + x + ", " + wvf.top) ;
            //    }

            // }

            var x ;
            for (x = wvf.left; x < wvf.right; x++) {
               if ((x % 16) == 0) {
                  var rotatedX = Math.floor(rotateX(x, -wvf.top, 90)) ;
                  var rotatedY = Math.floor(displayCanvas.height - rotateY(x, -wvf.top, 90)) ;
                  displayCtx.putImageData(wvf.eraseWithDotsWaveformImageDataRow, rotatedX, rotatedY);
                  LOGEVENTYELLOW("put ImageData with dots at " + rotatedX + ", " + rotatedY) ;
               }
            }

            var s = 0 ;

         }
         else {

            var x;
            for (x = wvf.left; x < wvf.right; x++) {

               if ((x % 16) == 0) {
                  displayCtx.putImageData(wvf.eraseWithDotsWaveformImageData, x, wvf.top);
               }
               else {
                  displayCtx.putImageData(wvf.eraseWaveformImageData, x, wvf.top);
               }

            }

         }

      }

   }

}

// Function to rotate image data
function rotateImageData(imageData, width, height) {

   // Create a temporary canvas and context
   var tempCanvas = document.createElement('canvas');
   var tempCtx = tempCanvas.getContext('2d');

   // Set canvas dimensions to match rotated dimensions
   tempCanvas.width = 480;
   tempCanvas.height = 800;

   // Clear the canvas
   tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);

   // Translate the origin to the lower left corner of the canvas
   tempCtx.translate(0, tempCanvas.height);

   // Rotate the canvas 90 degrees counterclockwise (to achieve portrait orientation)
   tempCtx.rotate(-Math.PI / 2);

   // Draw the image data at the rotated position
   tempCtx.putImageData(imageData, 0, -height);

   // Get the rotated image data
   var rotatedImageData = tempCtx.getImageData(0, 0, width, -height);

   // Return the rotated image data
   return rotatedImageData;

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
      //redrawHomeScreen = 1;
      pauseWaveformDrawing = 0;
      resetWaveforms();
   }

}


//
//  drawWaveformAreas
//

function drawWaveformAreas() {

   displayCtx.fillStyle = window.colors.ZBLACK;
   displayCtx.fillRect(homeScreen.waveformAreaLeft - 1, homeScreen.waveformAreaTop, homeScreen.waveformAreaWidth + 1, homeScreen.waveformAreaHeight + 1);

   drawWaveformScaleArea();

}


//
//   setupWaveforms 
//

var topWaveformHeight;
var waveformHeight;

function setupWaveforms(AMSWaveforms) {

   homeScreen.clearWaveformList();

   if (displayCtx.width == 800) { // 740, top channel given extra height

      switch (AMSWaveforms.length) {

         case 3:

            topWaveformHeight = Math.round(homeScreen.waveformAreaHeight / 2);
            waveformHeight = Math.round((Math.round(homeScreen.waveformAreaHeight) - Math.round(topWaveformHeight)) / 2);
            break;

         case 2:

            topWaveformHeight = Math.round(homeScreen.waveformAreaHeight / 2);
            waveformHeight = Math.round(Math.round(homeScreen.waveformAreaHeight) - Math.round(topWaveformHeight));
            break;

         case 1:
         default:

            topWaveformHeight = homeScreen.waveformAreaHeight;
            waveformHeight = topWaveformHeight;
            break;

      }

   }
   else {                          // DS20, all channels same height

      switch (AMSWaveforms.length) {

         case 3:

            topWaveformHeight = Math.round(homeScreen.waveformAreaHeight / 3);
            waveformHeight = topWaveformHeight;
            break;

         case 2:

            topWaveformHeight = Math.round(homeScreen.waveformAreaHeight / 2);
            waveformHeight = topWaveformHeight;
            break;

         case 1:
         default:

            topWaveformHeight = homeScreen.waveformAreaHeight;
            waveformHeight = topWaveformHeight;
            break;

      }

   }


   var order = 0;
   for (order = 0; order < AMSWaveforms.length; order++) {

      var waveformName = AMSWaveforms[order].waveformName;
      const wvf = new Waveform(waveformName, order);
      homeScreen.addWaveform(wvf);

   }

   drawWaveformAreas();

}


//
//   resetWaveforms
//

function resetWaveforms() {

   var w = 0;
   for (w = 0; w < homeScreen.waveforms.length; w++) {

      var wvf = homeScreen.waveforms[w];

      wvf.drawX = wvf.left;
      wvf.drawXTime = 0;
      wvf.eraseX = wvf.drawX + homeScreen.eraseBarWidth;
      wvf.drawY = 0;
      wvf.drawXLast = Number.MIN_VALUE;
      wvf.drawYLast = Number.MIN_VALUE;
      wvf.headIndex = 0;
      wvf.tailIndex = 0;

      wvf.elapsedTime = 0;       // total elapsed time in MS (as clocked by the browser)
      wvf.drawnPixelTime = 0;    // total time represented by drawn pixels
      wvf.shiftedPixelTime = 0;  // total time represented by shifted pixels
      wvf.readSampleTime = 0;    // total time represented by read samples
      wvf.readSampleTime = 0;    // total time represented by read samples

      wvf.pixelsDrawnToBuffer = 0;
      wvf.pixelBufferIndex = 0;

      wvf.samplesDrawn = 0;
      wvf.samplesToDraw = wvf.width;
      wvf.clearSamples();

      if (wvf.waveformName == "CO2") {

         var CO2Size = homeScreen.getSettingValue("CO2size");

         if (CO2Size == "20") {
            wvf.yMin = -100;
            wvf.yMax = 2000;
         }
         else if (CO2Size == "40") {
            wvf.yMin = -100;
            wvf.yMax = 4000;
         }
         else if (CO2Size == "60") {
            wvf.yMin = -100;
            wvf.yMax = 6000;
         }
         else if (CO2Size == "80") {
            wvf.yMin = -100;
            wvf.yMax = 8000;
         }
         else {
            wvf.yMin = -100;
            wvf.yMax = 8000;
         }

      }

   }

   drawWaveformAreas();

}

//
//   processWaveformData
//

var waveformDataMessageCount = 0;

function processWaveformData(AMSWaveforms) {

   if (pauseWaveformDrawing == 1) return (0);

   waveformDataMessageCount++
   LOGEVENT(" ");
   LOGEVENTGREEN('In processWaveformData, count = ', waveformDataMessageCount);
   // LOGEVENTMAGENTA("topWaveformHeight = ", topWaveformHeight) ;
   // LOGEVENTMAGENTA("   waveformHeight = ", waveformHeight) ;

   // Parse the JSON string into JavaScript object
   //const waveformData = JSON.parse(newWaveformDataMessage);

   // See if the waveform setup is changing
   var somethingChanged = 0;
   var nWaveformsInAMSMessage = AMSWaveforms.length;
   if (nWaveformsInAMSMessage != homeScreen.waveforms.length) {
      somethingChanged = 1;
   }
   else if (homeScreen.waveforms.length == 0) {
      somethingChanged = 1;
   }
   else {
      var w;
      for (w = 0; w < AMSWaveforms.length; w++) {
         if (AMSWaveforms[w].waveformName != homeScreen.waveforms[w].waveformName) {
            somethingChanged = 1;
            break;
         }
      }
   }

   if (somethingChanged) {
      setupWaveforms(AMSWaveforms);
   }
   else {

      // Write samples from this message into waveform ring buffers
      var w;
      for (w = 0; w < AMSWaveforms.length; w++) {

         var foundMatch = 0;
         var hw;
         for (hw = 0; hw < homeScreen.waveforms.length; hw++) {
            if (AMSWaveforms[w].waveformName == homeScreen.waveforms[hw].waveformName) {
               foundMatch = 1;
               break;
            }
         }
         if (foundMatch) {

            var wvf = homeScreen.waveforms[hw];

            //samplesIn = waveformData.waveforms[cw].waveformSamples;
            samplesIn = AMSWaveforms[w].waveformSamples.split(',');

            var samplesWritten = 0;
            var s;
            for (s = 0; s < samplesIn.length; s++) {

               //var thisSample = samplesIn[s];
               var thisSample = parseFloat(samplesIn[s]);

               wvf.writeSample(thisSample);
               samplesWritten++;

            }

            LOGEVENTGREEN("Read ", homeScreen.waveforms[hw].bufferReadCount, " samples from ", homeScreen.waveforms[hw].waveformName);
            homeScreen.waveforms[hw].bufferReadCount = 0;

            LOGEVENTGREEN("Wrote ", samplesWritten, " samples to ", homeScreen.waveforms[hw].waveformName);

         }

      }

      var w;
      for (w = 0; w < homeScreen.waveforms.length; w++) {

         LOGEVENTGREEN("homeScreen waveform ", homeScreen.waveforms[w].waveformName, " buffer has ", homeScreen.waveforms[w].getNSamples(), "samples");

      }

      if (homeScreen.waveforms[0].getNSamples() < waveformSampleBufferCountMin) {
         currentMSPerSample = currentMSPerSampleHigh;
         LOGEVENTGREEN("-->  setting currentMSPerSample = currentMSPerSampleHigh");
      }
      else if (homeScreen.waveforms[0].getNSamples() > waveformSampleBufferCountMax) {
         currentMSPerSample = currentMSPerSampleLow;
         LOGEVENTGREEN("-->  setting currentMSPerSample = currentMSPerSampleLow");
      }
      else {
         currentMSPerSample = currentMSPerSampleNormal;
         LOGEVENTGREEN("-->  setting currentMSPerSample = currentMSPerSampleNormal");
      }

      var d = 0;

   }

   return (somethingChanged);

}

