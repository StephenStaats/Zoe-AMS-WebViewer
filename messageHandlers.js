//
//   processWaveformDataMessage
//

var waveformDataMessageCount = 0;

function processWaveformDataMessage(newWaveformDataMessage) {
   //function processWaveformDataMessage(waveformData) {

   //LOGEVENTGREEN("In processWaveformDataMessage");

   if (pauseWaveformDrawing == 1) return;

   waveformDataMessageCount++
   LOGEVENT(" ");
   LOGEVENTGREEN('In processWaveformDataMessage, count = ', waveformDataMessageCount);
   // LOGEVENTMAGENTA("topWaveformHeight = ", topWaveformHeight) ;
   // LOGEVENTMAGENTA("   waveformHeight = ", waveformHeight) ;

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
      resetWaveforms(0);
   }
   else {

      // Write samples from this message into waveform ring buffers
      var w;
      for (w = 0; w < waveformData.waveforms.length; w++) {

         if (waveformData.waveforms[w].waveformName == "RRA") {
            var q = 0;
         }

         var foundMatch = 0;
         var cw;
         for (cw = 0; cw < homeScreen.waveforms.length; cw++) {
            if (waveformData.waveforms[w].waveformName == homeScreen.waveforms[cw].waveformName) {
               foundMatch = 1;
               break;
            }
         }
         if (foundMatch) {

            var wvf = homeScreen.waveforms[cw];

            //samplesIn = waveformData.waveforms[cw].waveformSamples;
            samplesIn = waveformData.waveforms[cw].waveformSamples.split(',');

            var samplesWritten = 0;
            var s;
            for (s = 0; s < samplesIn.length; s++) {
               //var thisSample = samplesIn[s];

               var thisSample = parseFloat(samplesIn[s]);

               wvf.writeSample(thisSample);
               samplesWritten++;

               if (wvf.autoScale) {

                  if (thisSample < wvf.runningMinSample) {
                     wvf.runningMinSample = thisSample;
                  }
                  else if (thisSample > wvf.runningMaxSample) {
                     wvf.runningMaxSample = thisSample;
                  }

               }
            }

            if (wvf.autoScale) {

               // wvf.yMaxSum += maxY ;
               // wvf.yMinSum += minY ;
               wvf.autoScaleCount += 1;

               LOGEVENTGREEN(wvf.waveformName, " runningMaxSample = = ", wvf.runningMaxSample, " runningMinSample = ", wvf.runningMinSample);
               LOGEVENTGREEN("   yMax = ", wvf.yMax, " yMin = ", wvf.yMin);

               //if ((wvf.autoScaleCountStartup) || (wvf.autoScaleCount >= 5)) {
               //if (wvf.autoScaleCount >= 0) {
               if (wvf.autoScaleCount % 10 == 0) {

                  //wvf.autoScaleCountStartup = false ;
                  // var averageYMax = wvf.yMaxSum / wvf.autoScaleCount ;
                  // var averageYMin = wvf.yMinSum / wvf.autoScaleCount ;
                  // var amplitude = averageYMax - averageYMin ;
                  // wvf.yMaxSum = 0 ;
                  // wvf.yMinSum = 0 ;
                  //wvf.autoScaleCount = 0 ;
                  // wvf.yMin = averageYMin - amplitude * wvf.autoscaleOffsetPercentage / 100;
                  // wvf.yMax = averageYMax + amplitude * wvf.autoscaleOffsetPercentage / 100;
                  // LOGEVENTRED("averageYMax = ", averageYMax, " averageYMin = ", averageYMin, " amplitude = ", amplitude);

                  var amplitude = wvf.runningMaxSample - wvf.runningMinSample;
                  wvf.yMax = wvf.runningMaxSample + amplitude * wvf.autoscaleOffsetPercentage / 100;
                  wvf.yMin = wvf.runningMinSample - amplitude * wvf.autoscaleOffsetPercentage / 100;
                  LOGEVENTGREEN("      New yMax = ", wvf.yMax, " yMin = ", wvf.yMin);

                  wvf.runningMinSample = Number.MAX_VALUE;
                  wvf.runningMaxSample = Number.MIN_VALUE;
                  // wvf.autoScaleDone = true ;

                  // if (wvf.waveformName == "RRA") {
                  //    var q = 0 ;
                  // }

               }

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

}


// {
//    "waveforms": [
//       {
//          "waveformName": "ECGII",
//          "waveformSamples": "1,2,3,4,5"
//       },
//       {
//          "waveformName": "SPO2",
//          "waveformSamples": "21,22,15,4,22"
//       }
//    ],
//    "parameters": [
//       {
//          "parameterName": "HR",
//          "parameterValue": "ASY",
//          "parameterAlarmStatus": "ACTIVE_HIGH"
//       },
//       {
//          "parameterName": "SPO2",
//          "parameterValue": "100",
//          "parameterAlarmStatus": "NORMAL_NONE"
//       }
//    ],
//    "settings": [
//       {
//          "settingName": "monitorSerialNumber",
//          "settingValue": "SN12345"
//       },
//       {
//          "settingName": "deviceName",
//          "settingValue": "<User friendly name from portal>"
//       },
//       {
//          "settingName": "deviceId",
//          "settingValue": "<GUID from portal>"
//       },
//       {
//          "settingName": "patientId",
//          "settingValue": "P12345"
//       },
//       {
//          "settingName": "patientFirstName",
//          "settingValue": "Diana"
//       },
//       {
//          "settingName": "patientLastName",
//          "settingValue": "Villiers"
//       },
//       {
//          "settingName": "bottomLineMessage",
//          "settingValue": "HR Asystole"
//       },
//       {
//          "settingName": "bottomLineMessageAlarmStatus",
//          "settingValue": "ACTIVE_HIGH"
//       }
//    ]
// }

