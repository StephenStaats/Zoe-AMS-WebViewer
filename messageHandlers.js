//
//   getAMSMessages
//

async function getAMSMessages() {

   LOGEVENTGREEN("In getAMSMessages");

   try {

      // const response = await fetch('https://app-streamingapiservice.azurewebsites.net/api/v1/toStreamingViewer/c/fromStreamingDevice/JSON/8000.002011', {
      //const response = await fetch('https://app-streamingapiservice.azurewebsites.net/api/v1/toStreamingViewer/c/fromStreamingDevice/JSON/ASDR3', {  // A Streaming Device for Richmond, 3
      const response = await fetch('https://app-streamingapiservicewithviewer.azurewebsites.net/api/v1/toStreamingViewer/sjs/fromStreamingDevice/JSON/01a1eb57-d2e5-4c23-b804-79be30ddd247', {  // A Streaming Device for Richmond, 3



         method: 'GET',
         headers: {
            'Accept': 'application/json',
            'x-api-key': '4DA67B46-E266-4139-9189-9C4F42E72604:18bc10d6-e583-450a-bae6-a445ae120084',
         },
      })
      if (!response.ok) {
         //throw new Error('Failed to fetch data');
         throw new Error('Failed to fetch data. Status: ' + response.status + ' ' + response.statusText);
      }

      var AMSMessages = await response.json();

      if (AMSMessages.length > 0) {

         connectedToDevice  = 10 ;

         var m = 0;
         for (m = 0; m < AMSMessages.length; m++) {
            AMSMessage = AMSMessages[m];
            processAMSMessage(AMSMessage);
         }

      }

   } catch (error) {

      //LOGEVENTRED('Error:', error);
        LOGEVENTRED('Error:', error.message); // Log the error message
        LOGEVENTRED('Error stack:', error.stack); // Log the error stack trace
        LOGEVENTRED('Error occurred. See console for details.');


   }

}


//
//   processAMSMessage
//

var AMSMessageCount = 0;

function processAMSMessage(newAMSMessage) {

   AMSMessageCount++
   LOGEVENT(" ");
   LOGEVENTGREEN('In processAMSMessage, count = ', AMSMessageCount);

   const AMSSettings = newAMSMessage.settings ;
   var settingChange = processSettingData(AMSSettings) ;
   if (settingChange) {
      drawTopLine();
      drawWaveformAreas();
      drawParameterAreas(0);
      drawBottomLineMessageArea();
   }

   const AMSWaveforms = newAMSMessage.waveforms ;
   var waveformChange = processWaveformData(AMSWaveforms) ;
   if (waveformChange) {
      drawWaveformAreas();
   }

   const AMSParameters = newAMSMessage.parameters ;
   var parameterChange = processParameterData(AMSParameters) ;
   if (parameterChange) {
      drawWaveformAreas();
      drawParameterAreas(0);
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

