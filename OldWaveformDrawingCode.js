//
//   drawNextWaveformSegmentInBuffer
//

function drawNextWaveformSegmentInBuffer1(w) {

   wvf = homeScreen.waveforms[w];

   bufferCtx.fillStyle = "#000000";
   // bufferCtx.clearRect(wvf.right, wvf.top, 100, wvf.height);
   // bufferCtx.fillRect(wvf.right, wvf.top, 100, wvf.height);
   bufferCtx.clearRect(wvf.left, wvf.top, wvf.width, wvf.height);
   bufferCtx.fillRect(wvf.left, wvf.top, wvf.width, wvf.height);

   bufferCtx.strokeStyle = wvf.color;
   bufferCtx.lineWidth = 2;
   bufferCtx.lineJoin = 'round';
   bufferCtx.lineCap = 'round';

   var sweepSpeedMMPerSecond = wvf.sweepSpeed;
   var pixelsPerSecond = sweepSpeedMMPerSecond * pixelsPerMM;
   var pixelsPerMS = pixelsPerSecond / 1000;
   var MSPerPixel = 1 / pixelsPerMS;
   var MSPerSample = 1000 / wvf.sampleRate;

   const normalizeWaveform = (value) => {

      normalizedValue = wvf.top + wvf.height - ((value - wvf.yMin) / (wvf.yMax - wvf.yMin) * wvf.height);

      if (normalizedValue < wvf.top) {
         normalizedValue = wvf.top;
      }
      else if (normalizedValue > wvf.bottom) {
         normalizedValue = wvf.bottom;
      }
      return normalizedValue;
   };

   bufferCtx.beginPath();

   // wvf.pixelTimeBuffer = 0;
   // wvf.sampleTimeBuffer = 0;
   //var endingSampleTime = wvf.sampleTimeBuffer + wvf.samplesToDraw * MSPerSample ;

   wvf.samplesDrawn = 0;

   wvf.pixelsDrawnToBuffer = 0;
   wvf.pixelBufferIndex = 0;

   //var x = wvf.right + 1
   var x = wvf.left;
   bufferCtx.moveTo(x, wvf.endY);
   //LOGEVENT("moveTo:", x, ",", wvf.endY);
   x++;
   // var firstY = normalizeWaveform(wvf.peekThisSample());
   // bufferCtx.lineTo(x, firstY);

   var firstMove = 0;
   //while (1) {
   //var endTime = wvf.elapsedTime + wvf.samplesToDraw * MSPerSample ;
   //var endTime = wvf.shiftedPixelTime + wvf.samplesToDraw * MSPerSample ;
   //var endTime = wvf.shiftedPixelTime + 200 * MSPerPixel ;
   var endTime = wvf.elapsedTime + wvf.samplesToDraw * MSPerSample;

   // LOGEVENTCYAN(" ");
   // LOGEVENTCYAN("wvf.elapsed time      = ", wvf.elapsedTime);
   // LOGEVENTCYAN("wvf.shiftedPixelTime  = ", wvf.shiftedPixelTime);
   // LOGEVENTCYAN("wvf.drawnPixelTime    = ", wvf.drawnPixelTime);
   // LOGEVENTCYAN("wvf.readSampleTime    = ", wvf.readSampleTime);
   // //LOGEVENTCYAN("wvf.MSPerPixel        = ", MSPerPixel);
   // LOGEVENTCYAN("endTime               = ", endTime);

   //while (wvf.readSampleTime < endTime) {
   //while (wvf.drawnPixelTime < endTime) {
   //while (wvf.drawnPixelTime < wvf.elapsedTime) {
   while (wvf.readSampleTime < endTime) {

      //wvf.drawnPixelTime += MSPerPixel;

      var drewMidLine = 0;

      if (MSPerPixel > MSPerSample) {

         var avgYSum = 0;
         var avgYCount = 0;
         var highestY = Number.MIN_VALUE;
         var lowestY = Number.MAX_VALUE;
         //while (wvf.pixelTimeBuffer > wvf.sampleTimeBuffer) {
         while (wvf.drawnPixelTime > wvf.readSampleTime) {

            if (window.simulatedDataMode == 1) {
               var thisY = normalizeWaveform(wvf.samples[wvf.tailIndex]);
               wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
               wvf.samplesDrawn++;
               wvf.readSampleTime += MSPerSample;
               // if (wvf.samplesDrawn >= wvf.samplesToDraw) {
               //    break;
               // }
               // if (wvf.sampleTimeBuffer >= endingSampleTime) {
               //    break;
               // }
               if (wvf.readSampleTime >= endTime) {
                  break;
               }
               //LOGEVENTGREEN("wvf.tailIndex ", wvf.tailIndex, " = ", wvf.samples[wvf.tailIndex]);
            }
            else {
               var thisY = normalizeWaveform(wvf.readSample());
               wvf.samplesDrawn++;
               wvf.readSampleTime += MSPerSample;
               // if (wvf.samplesDrawn >= wvf.samplesToDraw) {
               //    break;
               // }
               // if (wvf.readSampleTime >= endTime) {
               //    break;
               // }
               //LOGEVENTYELLOW("1 readSample from ", wvf.waveformName, " = ", thisY) ;
            }

            avgYSum += thisY;
            avgYCount++;

            if (thisY < lowestY) {
               lowestY = thisY;
            }

         }
         //wvf.endY = avgYSum / avgYCount;
         wvf.endY = lowestY;

         bufferCtx.lineTo(x, wvf.endY);
         //LOGEVENTGREEN("mid lineTo:", x, ",", wvf.endY);

         if (wvf.fill) {
            bufferCtx.lineTo(x, wvf.bottom - 1);
            bufferCtx.moveTo(x, wvf.endY);
         }

         x++;
         wvf.pixelsDrawnToBuffer++
         wvf.drawnPixelTime += MSPerPixel;

      }
      else {

         while (wvf.drawnPixelTime > wvf.readSampleTime) {

            if (window.simulatedDataMode == 1) {
               var incrementToNextSample = wvf.samples[(wvf.tailIndex + 1) % wvf.maxSampleIndex] - wvf.samples[wvf.tailIndex];
               wvf.endY = normalizeWaveform(wvf.samples[wvf.tailIndex] + incrementToNextSample / 2);
            }
            else {
               var incrementToNextSample = wvf.peekNextSample() - wvf.peekThisSample();
               wvf.endY = normalizeWaveform(wvf.peekThisSample() + incrementToNextSample / 2);
            }

            if (firstMove) {
               firstMove = 0;
               bufferCtx.moveTo(x, wvf.endY);
               //LOGEVENTGREEN("mid moveTo:", x, ",", wvf.endY);
            }

            bufferCtx.lineTo(x, wvf.endY);
            //LOGEVENTGREEN("mid lineTo:", x, ",", wvf.endY);

            if (wvf.fill) {
               bufferCtx.lineTo(x, wvf.bottom - 1);
               bufferCtx.moveTo(x, wvf.endY);
            }

            x++;
            wvf.pixelsDrawnToBuffer++;
            wvf.drawnPixelTime += MSPerPixel;

            drewMidLine = 1;

            wvf.samplesDrawn++;

            if (window.simulatedDataMode == 1) {
               wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
               wvf.readSampleTime += MSPerSample;
               //LOGEVENTGREEN("wvf.tailIndex ", wvf.tailIndex, " = ", wvf.samples[wvf.tailIndex]);
            }
            else {
               var s = wvf.readSample();
               wvf.readSampleTime += MSPerSample;
               LOGEVENTYELLOW("2 readSample from ", wvf.waveformName, " = ", thisY);
               LOGEVENTYELLOW("2 wvf.readSampleTime = ", wvf.readSampleTime, "  endTime = ", endTime);
            }

         }

         if (drewMidLine == 0) {

            if (window.simulatedDataMode == 1) {
               wvf.endY = normalizeWaveform(wvf.samples[wvf.tailIndex]);
            }
            else {
               var thisY = normalizeWaveform(wvf.readSample());
               LOGEVENTYELLOW("3 readSample from ", wvf.waveformName, " = ", thisY);
            }

            if (firstMove) {
               firstMove = 0;
               bufferCtx.moveTo(wvf.right, wvf.endY);
               //LOGEVENTGREEN("end moveTo:", wvf.right, ",", wvf.endY);
            }
            bufferCtx.lineTo(x, wvf.endY);
            //LOGEVENTGREEN("end lineTo:", x, ",", wvf.endY);

            x++;
            wvf.pixelsDrawnToBuffer++;
            wvf.drawnPixelTime += MSPerPixel;

         }

         if (wvf.fill) {
            bufferCtx.lineTo(x, wvf.bottom - 1);
            bufferCtx.moveTo(x, wvf.endY);
         }

         // if (wvf.samplesDrawn >= wvf.samplesToDraw) {
         //    break;
         // }

      }

   }

   bufferCtx.stroke();

   //var pixelsadded = x - (wvf.right + 1) ;

   // LOGEVENTCYAN(" ");

   // LOGEVENTCYAN("MSPerPixel = ", MSPerPixel);
   // LOGEVENTCYAN("MSPerSample = ", MSPerSample);
   // LOGEVENTCYAN("pixel time  = ", pixelsadded * MSPerPixel);
   // LOGEVENTCYAN("sample time  = ", wvf.samplesDrawn * MSPerSample);
   // LOGEVENTCYAN("wvf.pixelTimeBuffer  = ", wvf.pixelTimeBuffer);
   // LOGEVENTCYAN("wvf.sampleTimeBuffer  = ", wvf.sampleTimeBuffer);

   // //LOGEVENTCYAN(" ");
   // LOGEVENTCYAN("   wvf.pixelsDrawnToBuffer  = ", wvf.pixelsDrawnToBuffer);
   // LOGEVENTCYAN("   wvf.samplesDrawn         = ", wvf.samplesDrawn);
   // LOGEVENTCYAN("   wvf.drawnPixelTime       = ", wvf.drawnPixelTime);
   // LOGEVENTCYAN("   wvf.readSampleTime       = ", wvf.readSampleTime);

}



//
//   drawNextWaveformSegmentInBuffer
//

function drawNextWaveformSegmentInBuffer(w) {

   wvf = homeScreen.waveforms[w];

   bufferCtx.fillStyle = "#000000";
   bufferCtx.clearRect(wvf.left, wvf.top, wvf.width, wvf.height);
   bufferCtx.fillRect(wvf.left, wvf.top, wvf.width, wvf.height);

   bufferCtx.strokeStyle = wvf.color;
   bufferCtx.lineWidth = 2;
   bufferCtx.lineJoin = 'round';
   bufferCtx.lineCap = 'round';

   var sweepSpeedMMPerSecond = wvf.sweepSpeed;
   var pixelsPerSecond = sweepSpeedMMPerSecond * pixelsPerMM;
   var pixelsPerMS = pixelsPerSecond / 1000;
   var MSPerPixel = 1 / pixelsPerMS;
   var MSPerSample = 1000 / wvf.sampleRate;

   const normalizeWaveform = (value) => {

      normalizedValue = wvf.top + wvf.height - ((value - wvf.yMin) / (wvf.yMax - wvf.yMin) * wvf.height);

      if (normalizedValue < wvf.top) {
         normalizedValue = wvf.top;
      }
      else if (normalizedValue > wvf.bottom) {
         normalizedValue = wvf.bottom;
      }
      return normalizedValue;
   };

   bufferCtx.beginPath();

   wvf.samplesDrawn = 0;

   wvf.pixelsDrawnToBuffer = 0;
   wvf.pixelBufferIndex = 0;

   var x = wvf.left;
   bufferCtx.moveTo(x, wvf.endY);

   var firstMove = 0;

   while (x < wvf.right) {

      var drewMidLine = 0;

      if (MSPerPixel > MSPerSample) {

         var avgYSum = 0;
         var avgYCount = 0;
         var highestY = Number.MIN_VALUE;
         var lowestY = Number.MAX_VALUE;
         while (wvf.drawnPixelTime > wvf.readSampleTime) {

            if (window.simulatedDataMode == 1) {
               var thisY = normalizeWaveform(wvf.samples[wvf.tailIndex]);
               wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
               wvf.samplesDrawn++;
               wvf.readSampleTime += MSPerSample;
               //LOGEVENTGREEN("wvf.tailIndex ", wvf.tailIndex, " = ", wvf.samples[wvf.tailIndex]);
            }
            else {
               var thisY = normalizeWaveform(wvf.readSample());
               wvf.samplesDrawn++;
               wvf.readSampleTime += MSPerSample;
               //LOGEVENTYELLOW("1 readSample from ", wvf.waveformName, " = ", thisY) ;
            }

            avgYSum += thisY;
            avgYCount++;

            if (thisY < lowestY) {
               lowestY = thisY;
            }

         }
         //wvf.endY = avgYSum / avgYCount;
         wvf.endY = lowestY;

         bufferCtx.lineTo(x, wvf.endY);
         //LOGEVENTGREEN("mid lineTo:", x, ",", wvf.endY);

         if (wvf.fill) {
            bufferCtx.lineTo(x, wvf.bottom - 1);
            bufferCtx.moveTo(x, wvf.endY);
         }

         x++;
         wvf.pixelsDrawnToBuffer++
         wvf.drawnPixelTime += MSPerPixel;

      }
      else {

         while (wvf.drawnPixelTime > wvf.readSampleTime) {

            if (window.simulatedDataMode == 1) {
               var incrementToNextSample = wvf.samples[(wvf.tailIndex + 1) % wvf.maxSampleIndex] - wvf.samples[wvf.tailIndex];
               wvf.endY = normalizeWaveform(wvf.samples[wvf.tailIndex] + incrementToNextSample / 2);
            }
            else {
               var incrementToNextSample = wvf.peekNextSample() - wvf.peekThisSample();
               wvf.endY = normalizeWaveform(wvf.peekThisSample() + incrementToNextSample / 2);
            }

            if (firstMove) {
               firstMove = 0;
               bufferCtx.moveTo(x, wvf.endY);
               //LOGEVENTGREEN("mid moveTo:", x, ",", wvf.endY);
            }

            bufferCtx.lineTo(x, wvf.endY);
            //LOGEVENTGREEN("mid lineTo:", x, ",", wvf.endY);

            if (wvf.fill) {
               bufferCtx.lineTo(x, wvf.bottom - 1);
               bufferCtx.moveTo(x, wvf.endY);
            }

            x++;
            wvf.pixelsDrawnToBuffer++;
            wvf.drawnPixelTime += MSPerPixel;

            drewMidLine = 1;

            wvf.samplesDrawn++;

            if (window.simulatedDataMode == 1) {
               wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
               //LOGEVENTGREEN("wvf.tailIndex ", wvf.tailIndex, " = ", wvf.samples[wvf.tailIndex]);
            }
            else {
               var s = wvf.readSample();
               LOGEVENTYELLOW("2 readSample from ", wvf.waveformName, " = ", thisY);
            }

            wvf.readSampleTime += MSPerSample;

         }

         if (drewMidLine == 0) {

            if (window.simulatedDataMode == 1) {
               wvf.endY = normalizeWaveform(wvf.samples[wvf.tailIndex]);
            }
            else {
               var thisY = normalizeWaveform(wvf.readSample());
               LOGEVENTYELLOW("3 readSample from ", wvf.waveformName, " = ", thisY);
            }

            if (firstMove) {
               firstMove = 0;
               bufferCtx.moveTo(wvf.right, wvf.endY);
               //LOGEVENTGREEN("end moveTo:", wvf.right, ",", wvf.endY);
            }
            bufferCtx.lineTo(x, wvf.endY);
            //LOGEVENTGREEN("end lineTo:", x, ",", wvf.endY);

            x++;
            wvf.pixelsDrawnToBuffer++;
            wvf.drawnPixelTime += MSPerPixel;

         }

         if (wvf.fill) {
            bufferCtx.lineTo(x, wvf.bottom - 1);
            bufferCtx.moveTo(x, wvf.endY);
         }

         // if (wvf.samplesDrawn >= wvf.samplesToDraw) {
         //    break;
         // }

      }

   }

   bufferCtx.stroke();

   //var pixelsadded = x - (wvf.right + 1) ;

   // LOGEVENTCYAN(" ");

   // LOGEVENTCYAN("MSPerPixel = ", MSPerPixel);
   // LOGEVENTCYAN("MSPerSample = ", MSPerSample);
   // LOGEVENTCYAN("pixel time  = ", pixelsadded * MSPerPixel);
   // LOGEVENTCYAN("sample time  = ", wvf.samplesDrawn * MSPerSample);
   // LOGEVENTCYAN("wvf.pixelTimeBuffer  = ", wvf.pixelTimeBuffer);
   // LOGEVENTCYAN("wvf.sampleTimeBuffer  = ", wvf.sampleTimeBuffer);

   // //LOGEVENTCYAN(" ");
   // LOGEVENTCYAN("   wvf.pixelsDrawnToBuffer  = ", wvf.pixelsDrawnToBuffer);
   // LOGEVENTCYAN("   wvf.samplesDrawn         = ", wvf.samplesDrawn);
   // LOGEVENTCYAN("   wvf.drawnPixelTime       = ", wvf.drawnPixelTime);
   // LOGEVENTCYAN("   wvf.readSampleTime       = ", wvf.readSampleTime);

}


//
//   drawMovingWaveforms
//

function drawMovingWaveforms(elapsed) {

   if (pauseWaveformDrawing == 1) return;

   if (elapsed == 0) return;

   var firstColumnShiftedAfterNewSegmentDrawn = 0;

   var w;
   for (w = 0; w < homeScreen.waveforms.length; w++) {

      wvf = homeScreen.waveforms[w];

      //LOGEVENTRED("elapsed = :", elapsed);

      wvf.elapsedTime += elapsed;
      //wvf.pixelTime += elapsed;

      var sweepSpeedMMPerSecond = wvf.sweepSpeed;
      var pixelsPerSecond = sweepSpeedMMPerSecond * pixelsPerMM;
      var pixelsPerMS = pixelsPerSecond / 1000;
      var MSPerPixel = 1 / pixelsPerMS;
      var MSPerSample = 1000 / wvf.sampleRate;
      //var sweepSpeedPixelsPerFrame = Math.round(elapsed / MSPerPixel);

      //while (wvf.pixelTime > MSPerPixel) {
      while (wvf.shiftedPixelTime < wvf.elapsedTime) {

         //LOGEVENTYELLOW("   wvf.pixelTime:", wvf.pixelTime);
         //wvf.pixelTime -= MSPerPixel;

         // Shift the waveform to the left, clear the rightmost part and set it to black again
         displayCtx.fillStyle = 'black';
         imageData = displayCtx.getImageData(wvf.left + 1, wvf.top, wvf.width - 1, wvf.height);
         //LOGEVENT("getImageData:", wvf.left + 1, ",", wvf.top, ",", wvf.width - 1, ",", wvf.height);
         displayCtx.putImageData(imageData, wvf.left, wvf.top);
         //LOGEVENT("putImageData:", wvf.left, ",", wvf.top);
         displayCtx.fillRect(wvf.right - 1, wvf.top, 1, wvf.height);
         //DEVEVENT("fillRect:", wvf.Width - 1, ",", wvf.Top, ",", 1, ",", wvf.Height);

         //LOGEVENT("   shifted left");

         //imageData = bufferCtx.getImageData(wvf.right + 1 + wvf.pixelBufferIndex, wvf.top, 1, wvf.height);
         imageData = bufferCtx.getImageData(wvf.left + wvf.pixelBufferIndex, wvf.top, 1, wvf.height);
         //LOGEVENT("getImageData:", wvf.right + 1 + wvf.pixelBufferIndex);
         displayCtx.putImageData(imageData, wvf.right - 1, wvf.top);
         //LOGEVENT("putImageData:", wvf.right);

         wvf.pixelBufferIndex++;
         //drawnImageIndex = (drawnImageIndex + 1) % maxDrawnImageIndex;
         //if (wvf.pixelBufferIndex > wvf.pixelsDrawnToBuffer) {
         //LOGEVENTYELLOW("   pixelBufferIndex >= pixelsDrawnToBuffer", wvf.pixelBufferIndex);
         //}

         //wvf.samplesShiftedTime += MSPerPixel;
         //wvf.samplesShifted = Math.round(wvf.samplesShiftedTime / MSPerSample);
         wvf.shiftedPixelTime += MSPerPixel;

         //LOGEVENTYELLOW("   samplesShiftedTime:", wvf.samplesShiftedTime);
         //LOGEVENTYELLOW("   samplesShifted:", wvf.samplesShifted);
         //if (wvf.samplesShifted >= wvf.samplesDrawn) {
         //LOGEVENTYELLOW("   samplesShifted >= samplesDrawn", wvf.samplesShifted);
         //}

         //if ((drawnImageIndex >= maxDrawnImageIndex) || (samplesShifted >= samplesDrawn)) {
         //if (wvf.pixelBufferIndex >= wvf.pixelsDrawnToBuffer) {
         if (wvf.pixelBufferIndex >= wvf.pixelsDrawnToBuffer) {

            // wvf.pixelBufferIndex = 0;
            // wvf.pixelsDrawnToBuffer = 0;
            //wvf.samplesShifted = 0;
            //wvf.samplesShiftedTime = 0;
            drawNextWaveformSegmentInBuffer(w);

            displayCtx.beginPath();

            // displayCtx.strokeStyle = "#FFFF00";
            // displayCtx.lineWidth = 2;
            // displayCtx.lineJoin = 'round';
            // displayCtx.lineCap = 'round';

            bufferCtx.strokeStyle = wvf.color;
            bufferCtx.lineWidth = 2;
            bufferCtx.lineJoin = 'round';
            bufferCtx.lineCap = 'round';


            displayCtx.moveTo(wvf.right - 100, wvf.top);
            displayCtx.moveTo(wvf.right - 100, wvf.bottom);
            displayCtx.stroke();


         }

      }

   }

   //debugger;

}



//
//   drawWaveform
//

function drawWaveform(w) {

   wvf = homeScreen.waveforms[w];

   var sweepSpeedMMPerSecond = wvf.sweepSpeed;
   var pixelsPerSecond = sweepSpeedMMPerSecond * pixelsPerMM;
   var pixelsPerMS = pixelsPerSecond / 1000;
   var MSPerPixel = 1 / pixelsPerMS;
   var MSPerSample = 1000 / wvf.sampleRate;

   const normalizeWaveform = (value) => {

      normalizedValue = wvf.top + wvf.height - ((value - wvf.yMin) / (wvf.yMax - wvf.yMin) * wvf.height);

      if (normalizedValue < wvf.top) {
         normalizedValue = wvf.top;
      }
      else if (normalizedValue > wvf.bottom) {
         normalizedValue = wvf.bottom;
      }
      return normalizedValue;
   };

   //
   //   Draw new samples
   //

   var NewSamplePixelsDrawn = 0 ;

   displayCtx.beginPath();

   displayCtx.strokeStyle = wvf.color;
   displayCtx.lineWidth = 2;
   displayCtx.lineJoin = 'round';
   displayCtx.lineCap = 'round';

   //displayCtx.moveTo(wvf.drawXLast, wvf.drawYLast);

   while (wvf.drawXTime < wvf.elapsedTime) {

      if (MSPerPixel > MSPerSample) {

         var avgYSum = 0;
         var avgYCount = 0;
         var lowestY = Number.MAX_VALUE;

         while (wvf.drawnPixelTime > wvf.readSampleTime) {

            if (window.simulatedDataMode == 1 ) {
               var thisY = normalizeWaveform(wvf.samples[wvf.tailIndex]);
               wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
               wvf.samplesDrawn++;
               wvf.readSampleTime += MSPerSample;
            }
            else {
               var thisY = normalizeWaveform(wvf.readSample());
               //LOGEVENTYELLOW("1 readSample from ", wvf.waveformName, " = ", thisY) ;
               wvf.samplesDrawn++;
               wvf.readSampleTime += MSPerSample;
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
            displayCtx.moveTo(wvf.drawXLast, wvf.drawYLast);
            displayCtx.lineTo(wvf.drawX, wvf.drawY);
            if (wvf.fill) {
               displayCtx.lineTo(wvf.drawX, wvf.bottom - 1);
               //displayCtx.moveTo(wvf.drawX, wvf.drawY);
            }
         //}
         wvf.drawXLast = wvf.drawX ;
         wvf.drawYLast = wvf.drawY ;

         NewSamplePixelsDrawn++ ;

         wvf.drawX++;
         if (wvf.drawX >= wvf.right) {
            wvf.drawX = wvf.left ;
         }
         wvf.drawXLast = wvf.drawX ;

         wvf.drawXTime += MSPerPixel ;
         wvf.drawnPixelTime += MSPerPixel ;

      }
      else {

         // while (wvf.drawnPixelTime < wvf.readSampleTime) {

         //    if (window.simulatedDataMode == 1 ) {
         //       var incrementToNextSample = wvf.samples[(wvf.tailIndex + 1) % wvf.maxSampleIndex] - wvf.samples[wvf.tailIndex];
         //       wvf.drawY = normalizeWaveform(wvf.samples[wvf.tailIndex] + incrementToNextSample / 2);
         //       //wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
         //    }
         //    else {
         //       var nextSample = wvf.peekNextSample() ;
         //       var thisSample = wvf.peekThisSample() ;
         //       var incrementToNextSample = nextSample - thisSample ;
         //       var valueToNormalize = thisSample + incrementToNextSample / 2;
         //       wvf.drawY = normalizeWaveform(valueToNormalize);
         //    }

         //    //displayCtx.moveTo(wvf.drawXLast, wvf.drawYLast);
         //    displayCtx.lineTo(wvf.drawX, wvf.drawY);
         //    if (wvf.fill) {
         //       displayCtx.lineTo(wvf.drawX, wvf.bottom - 1);
         //    }
         //    wvf.drawXLast = wvf.drawX ;
         //    wvf.drawYLast = wvf.drawY ;

         //    NewSamplePixelsDrawn++ ;

         //    wvf.drawnPixelTime += MSPerPixel ;
         //    wvf.drawXTime += MSPerPixel ;

         //    wvf.drawX++;
         //    if (wvf.drawX >= wvf.right) {
         //       wvf.drawX = wvf.left ;
         //       wvf.drawXLast = wvf.drawX ;
         //    }

         // }

         // if (window.simulatedDataMode == 1 ) {
         //    wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
         // }
         // else {
         //    var s = wvf.readSample() ;
         // }
         // wvf.samplesDrawn++;
         // wvf.readSampleTime += MSPerSample;


         var drewMidLine = 0;

         while (wvf.drawnPixelTime > wvf.readSampleTime) {

            if (window.simulatedDataMode == 1 ) {
               var incrementToNextSample = wvf.samples[(wvf.tailIndex + 1) % wvf.maxSampleIndex] - wvf.samples[wvf.tailIndex];
               wvf.drawY = normalizeWaveform(wvf.samples[wvf.tailIndex] + incrementToNextSample / 2);
               wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
            }
            else {
               var incrementToNextSample = wvf.peekNextSample() - wvf.peekThisSample();
               wvf.drawY = normalizeWaveform(wvf.peekThisSample() + incrementToNextSample / 2);
            }

            wvf.samplesDrawn++;
            wvf.readSampleTime += MSPerSample;

            //if (wvf.drawX > wvf.drawXLast) {
               //displayCtx.moveTo(wvf.drawXLast, wvf.drawYLast);
               displayCtx.lineTo(wvf.drawX, wvf.drawY);
               if (wvf.fill) {
                  displayCtx.lineTo(wvf.drawX, wvf.bottom - 1);
                  //displayCtx.moveTo(wvf.drawX, wvf.drawY);
               }
            //}
            wvf.drawXLast = wvf.drawX ;
            wvf.drawYLast = wvf.drawY ;

            NewSamplePixelsDrawn++ ;

            wvf.drawX++;
            if (wvf.drawX >= wvf.right) {
               wvf.drawX = wvf.left ;
               wvf.drawXLast = wvf.drawX ;
            }

            wvf.drawXTime += MSPerPixel ;
            wvf.drawnPixelTime += MSPerPixel ;

            if (window.simulatedDataMode == 1 ) {
               wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
            }
            else {
               var s = wvf.readSample() ;
               //LOGEVENTYELLOW("2 readSample from ", wvf.waveformName, " = ", thisY) ;
            }

            drewMidLine = 1;

         }

         if (drewMidLine == 0) {

            if (window.simulatedDataMode == 1 ) {
               wvf.drawY = normalizeWaveform(wvf.samples[wvf.tailIndex]);
               wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSampleIndex;
            }
            else {
               wvf.drawY = normalizeWaveform(wvf.readSample());
               LOGEVENTYELLOW("wvf.drawXTime = ", wvf.drawXTime, "  wvf.elapsedTime = ", wvf.elapsedTime ) ;
               LOGEVENTYELLOW("   wvf.drawnPixelTime = ", wvf.drawnPixelTime, "  wvf.readSampleTime = ", wvf.readSampleTime ) ;
               LOGEVENTYELLOW("      3 readSample from ", wvf.waveformName, " = ", wvf.drawY) ;
            }

            wvf.samplesDrawn++;
            wvf.readSampleTime += MSPerSample;

            //if (wvf.drawX > wvf.drawXLast) {
               //displayCtx.moveTo(wvf.drawXLast, wvf.drawYLast);
               displayCtx.lineTo(wvf.drawX, wvf.drawY);
               if (wvf.fill) {
                  displayCtx.lineTo(wvf.drawX, wvf.bottom - 1);
                  //displayCtx.moveTo(wvf.drawX, wvf.drawY);
               }
            //}

            wvf.drawXLast = wvf.drawX ;
            wvf.drawYLast = wvf.drawY ;

            NewSamplePixelsDrawn++ ;

            wvf.drawX++;
            if (wvf.drawX >= wvf.right) {
               wvf.drawX = wvf.left ;
               wvf.drawxLast = wvf.drawX ;
            }

            wvf.drawXTime += MSPerPixel ;
            wvf.drawnPixelTime += MSPerPixel ;

         }

      }

   }

   displayCtx.stroke();
 
   //
   //   Draw erase bar
   //

   displayCtx.beginPath();

   displayCtx.strokeStyle = "#000000";
   displayCtx.lineWidth = 2;
   displayCtx.lineJoin = 'round';
   displayCtx.lineCap = 'round';

   displayCtx.moveTo(wvf.eraseX, wvf.top);

   var eraseBarPixelsDrawn = 0 ;
   while (eraseBarPixelsDrawn < NewSamplePixelsDrawn) {

      displayCtx.moveTo(wvf.eraseX, wvf.top + 1);
      displayCtx.lineTo(wvf.eraseX, wvf.bottom - 1);

      wvf.eraseX++;
      if (wvf.eraseX >= wvf.right) {
         wvf.eraseX = wvf.left ;
      }

      eraseBarPixelsDrawn++ ;

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



