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


//
//   setupSettings 
//

function setupSettings(AMSSettings) {

   homeScreen.clearSettingList();

   var s = 0 ;
   for (s = 0; s < AMSSettings.length; s++) {

      const setting = new Setting(AMSSettings[s].settingName, AMSSettings[s].settingValue);
      homeScreen.addSetting(setting);

   }

}


//
//   processSettingData  
//

var lastBottomLineMessage;
var lastbottomLineMessageAlarmStatus;

window.bottomLineMessage = " ";
window.bottomLineMessageAlarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_NORMAL_NONE;

var settingDataMessageCount = 0;

var settingSetIndex = 0;

//var nSettings = 0;

function processSettingData(AMSSettings) {

   settingDataMessageCount++;

   LOGEVENT(" ");
   LOGEVENTCYAN('in processSettingData, count = ', settingDataMessageCount);

   // homeScreen.clearSettingList();

   // // Parse the JSON string into JavaScript object
   // //const settingData = JSON.parse(setupSettingDataMessage);

   // nSettings = AMSSettings.length;

   // // Add parameters from the parsed data
   // //settingData.settings.forEach(setting => {
   // var s = 0;
   // for (s = 0; s < nSettings; s++) {
   //    // Create an instance of Parameter class
   //    var setting = new Setting(AMSSettings[s].settingName, AMSSettings[s].settingValue);
   //    homeScreen.addSetting(setting);

   //    if (setting.settingName == "bottomLineMessage") {
   //       window.bottomLineMessage = setting.settingValue;
   //    }
   //    else if (setting.settingName == "bottomLineMessageAlarmStatus") {
   //       window.bottomLineMessageAlarmStatus = setting.settingValue;
   //    }
   //    if ((window.bottomLineMessage != lastBottomLineMessage) || (window.bottomLineMessageAlarmStatus != lastbottomLineMessageAlarmStatus)) {
   //       lastBottomLineMessage = window.bottomLineMessage;
   //       lastbottomLineMessageAlarmStatus = window.bottomLineMessageAlarmStatus;
   //       drawBottomLineMessageArea();
   //    }

   // }

   var somethingChanged = 0 ;

   // homeScreen.clearSettingList();

   nSettingsInAMSMessage = AMSSettings.length;

   var nSettingsInAMSMessage = AMSSettings.length;
   if (nSettingsInAMSMessage != homeScreen.settings.length) {
      somethingChanged = 1;
   }
   else if (homeScreen.settings.length == 0) {
      somethingChanged = 1;
   }
   else {
      var s;
      for (s = 0; s < AMSSettings.length; s++) {
         if (AMSSettings[s].settingName != homeScreen.settings[s].settingName) {
            somethingChanged = 1;
            break;
         }
      }
   }
   if (somethingChanged) {
      setupSettings(AMSSettings);
   }
   else {   

      var needToDrawTopLine = 0 ;
      var needToResetWaveforms = 0 ;
      var needToDrawParameterAreas = 0 ;
      var needToDrawBottomLineMessageArea = 0 ;

      var s = 0;
      for (s = 0; s < AMSSettings.length; s++) {

         var setting = AMSSettings[s] ;

         var hs = 0 ;

         for (hs = 0; s < homeScreen.settings.length; hs++) {

            if (homeScreen.settings[hs].settingName == setting.settingName) {

               if (homeScreen.settings[hs].settingValue != setting.settingValue) {

                  homeScreen.settings[hs].settingValue = setting.settingValue ;

                  if ((setting.settingName == "deviceName") || 
                      (setting.settingName == "patientFirstName") || 
                      (setting.settingName == "patientLastName") ||
                      (setting.settingName == "patientIdFormat") ||
                      (setting.settingName == "monitorIdFormat") ||
                      (setting.settingName == "patientId")) {

                     needToDrawTopLine = 1 ;

                  }
                  else if ((setting.settingName == "ECGLead") || 
                           (setting.settingName == "ECGGain") || 
                           (setting.settingName == "CO2ScaleHi") ||
                           (setting.settingName == "CO2ScaleLo") ||
                           (setting.settingName == "CO2Size")) {

                     needToResetWaveforms = 1 ;

                  }
                  else if ((setting.settingName == "TEMPunits") ||
                           (setting.settingName == "CO2units")) {

                     needToDrawParameterAreas = 1 ;

                  }
                  else if ((setting.settingName == "bottomLineMessage") ||
                           (setting.settingName == "bottomLineMessageAlarmStatus")) {
    
                     needToDrawBottomLineMessageArea = 1 ;

                  }
 
               }

               break ;

            }

         }

      }

      if (needToDrawTopLine) {
         drawTopLine() ;
      }

      if (needToResetWaveforms) {
         resetWaveforms() ;
      }

      if (needToDrawParameterAreas) {
         drawParamterAreas() ;
      }

      if (needToDrawBottomLineMessageArea) {
         drawBottomLineMessageArea();
      }

   }

   return (somethingChanged) ;

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

               //drawTopLine();
               redrawHomeScreen = 1 ;

               return;

            }

         }

      }

   }

}
