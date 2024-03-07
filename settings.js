//
//   Setting
//   

// Define the Setting class globally
function Setting(settingName, settingValue) {

   this.settingName = settingName;
   this.settingValue = settingValue;

}

// Method to set setting value
Setting.prototype.setValue = function (value) {
   this.settingValue = value;
};

// Method to get setting value
Setting.prototype.getValue = function (value) {
   return (this.settingValue);
};


// //
// //   shiftSettings  
// //

// function shiftSettings() {

//    settingSetIndex++;

//    if (settingSetIndex >= currentSettings.length) {
//       settingSetIndex = 0;
//    }

//    simulateArrivalOfSettingDataMessage() ;

//    drawTopLine() ;

//    drawWaveformScaleArea() ;

// }


//
//   processSettingData  
//

var lastBottomLineMessage;
var lastbottomLineMessageAlarmStatus;

window.bottomLineMessage = " ";
window.bottomLineMessageAlarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_NORMAL_NONE;

var settingDataMessageCount = 0;

var settingSetIndex = 0;

var nSettings = 0;

function processSettingData(AMSSettings) {

   settingDataMessageCount++;

   LOGEVENT(" ");
   LOGEVENTCYAN('in processSettingData, count = ', settingDataMessageCount);

   homeScreen.clearSettingList();

   // Parse the JSON string into JavaScript object
   //const settingData = JSON.parse(setupSettingDataMessage);

   nSettings = AMSSettings.length;

   // Add parameters from the parsed data
   //settingData.settings.forEach(setting => {
   var s = 0;
   for (s = 0; s < nSettings; s++) {
      // Create an instance of Parameter class
      var setting = new Setting(AMSSettings[s].settingName, AMSSettings[s].settingValue);
      homeScreen.addSetting(setting);

      if (setting.settingName == "bottomLineMessage") {
         window.bottomLineMessage = setting.settingValue;
      }
      else if (setting.settingName == "bottomLineMessageAlarmStatus") {
         window.bottomLineMessageAlarmStatus = setting.settingValue;
      }
      if ((window.bottomLineMessage != lastBottomLineMessage) || (window.bottomLineMessageAlarmStatus != lastbottomLineMessageAlarmStatus)) {
         lastBottomLineMessage = window.bottomLineMessage;
         lastbottomLineMessageAlarmStatus = window.bottomLineMessageAlarmStatus;
         drawBottomLineMessageArea();
      }

   }

}


//
//   findSelectedPatient  
//

function findSelectedPatient(selectedDeviceId) {

   var m = 0;
   for (m = 0; m < simulatedAMSMessages.length; m++) {

      const AMSMessage = simulatedAMSMessages[m];

      var s
      for (s = 0; s < AMSMessage.settings.length; s++) {

         if (AMSMessage.settings[s].settingName == "deviceId") {

            //if (AMSMessage.settings[s].settingValue == selectedDeviceId) {

            var deviceId = AMSMessage.settings[s].settingValue
            if (deviceId == selectedDeviceId) {

               simulatedAMSMessageIndex = m;

               simulateArrivalOfAMSMessage();

               drawTopLine();

               drawWaveformScaleArea();

               return;

            }

         }

      }

   }

}
