
//
//   processWaveformDataMessage
//

function processWaveformDataMessage(newWaveformDataMessage) {

   if (pauseWaveformDrawing == 1) return;

   waveformDataMessageCount++
   LOGEVENT(" ");
   LOGEVENTGREEN('in processWaveformDataMessage, count = ', waveformDataMessageCount);

   // Parse the JSON string into JavaScript object
   const waveformData = JSON.parse(newWaveformDataMessage);

   // See if the waveform setup is changing
   var somethingChanged = 0;
   var nWaveformswaveformDataMessage = waveformData.waveforms.length;
   if (nWaveformswaveformDataMessage != nWaveforms) {
      somethingChanged = 1;
   }
   else {
      var w;
      for (w = 0; w < waveformData.waveforms.length; w++) {
         if (waveformData.waveforms[w].waveformName != homeScreen.waveforms[w].waveformName) {
            somethingChanged = 1;
            break;
         }
      }
   }

   if (somethingChanged) {
      setupWaveforms(newWaveformDataMessage);
   }
   else {

      // Write samples from this message into waveform ring buffers
      var w;
      for (w = 0; w < waveformData.waveforms.length; w++) {
         var foundMatch = 0;
         var cw;
         for (cw = 0; w < homeScreen.waveforms.length; cw++) {
            if (waveformData.waveforms[w].waveformName == homeScreen.waveforms[cw].waveformName) {
               foundMatch = 1;
               break;
            }
         }
         if (foundMatch) {

            var wvf = homeScreen.waveforms[cw];

            var minY;
            var maxY;

            minY = Number.MAX_VALUE;
            maxY = Number.MIN_VALUE;

            samplesIn = waveformData.waveforms[cw].waveformSamples;
            var samplesWritten = 0;
            var s;
            for (s = 0; s < samplesIn.length; s++) {
               var thisSample = samplesIn[s];
               wvf.writeSample(thisSample);
               samplesWritten++;
               if (thisSample < minY) {
                  minY = thisSample;
               }
               else if (thisSample > maxY) {
                  maxY = thisSample;
               }
            }

            if (wvf.autoScale) {

               var amplitude = maxY - minY;

               wvf.yMin = minY - amplitude * window.autoscaleOffsetPercentage / 100;
               wvf.yMax = maxY + amplitude * window.autoscaleOffsetPercentage / 100;

            }

            LOGEVENTGREEN("Read ", homeScreen.waveforms[cw].bufferReadCount, " samples from ", homeScreen.waveforms[cw].waveformName);
            homeScreen.waveforms[cw].bufferReadCount = 0;

            LOGEVENTGREEN("Wrote ", samplesWritten, " samples to ", homeScreen.waveforms[cw].waveformName);

         }
      }
   }

   var w;
   for (w = 0; w < homeScreen.waveforms.length; w++) {

      LOGEVENTGREEN("homeScreen waveform ", homeScreen.waveforms[w].waveformName, " buffer has ", homeScreen.waveforms[w].getNSamples(), "samples");

   }

}
