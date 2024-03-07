//
//   getAMSMessages
//

async function getAMSMessages() {

   LOGEVENTGREEN("In getAMSMessages");

   try {

      const response = await fetch('https://app-streamingapiservice.azurewebsites.net/api/v1/toStreamingViewer/c/fromStreamingDevice/JSON/ASDR3', {
         method: 'GET',
         headers: {
            'Accept': 'application/json',
         },
      })
      if (!response.ok) {
         throw new Error('Failed to fetch data');
      }

      var AMSMessages = await response.json();

      var m = 0;
      for (m = 0; m < AMSMessages.length; m++) {
         AMSMessage = AMSMessages[m];
         processAMSMessage(AMSMessage);
      }

   } catch (error) {

      LOGEVENTRED('Error:', error);

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

   const AMSWaveforms = newAMSMessage.waveforms ;
   processWaveformData(AMSWaveforms) ;

   const AMSParameters = newAMSMessage.parameters ;
   processParameterData(AMSParameters) ;

   const AMSSettings = newAMSMessage.settings ;
   processSettingData(AMSSettings) ;

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

