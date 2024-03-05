//
//   Setting
//   

// Define the Setting class globally
function Setting(settingName, settingValue) {

   this.settingName = settingName;
   this.settingValue = settingValue;

}

// Method to set setting value
Setting.prototype.setValue = function(value) {
   this.settingValue = value;
};

// Method to get setting value
Setting.prototype.getValue = function(value) {
   return (this.settingValue) ;
};


//
//   shiftSettings  
//

function shiftSettings() {

   settingSetIndex++;

   if (settingSetIndex >= currentSettings.length) {
      settingSetIndex = 0;
   }

   simulateArrivalOfSettingDataMessage() ;

   drawTopLine() ;

   drawWaveformScaleArea() ;

}


//
//   processSettingDataMessage - call when a new settingDataMessage is received from the REST API
//

var settingDataMessageCount = 0;

var settingSetIndex = 0;

var nSettings = 0 ;

function processSettingDataMessage(setupSettingDataMessage) {

   settingDataMessageCount++;

   LOGEVENT(" ");
   LOGEVENTCYAN('in processSettingDataMessage, count = ', settingDataMessageCount);

   homeScreen.clearSettingList();

   // Parse the JSON string into JavaScript object
   const settingData = JSON.parse(setupSettingDataMessage);

   nSettings = settingData.settings.length;

   // Add parameters from the parsed data
   settingData.settings.forEach(setting => {
      // Create an instance of Parameter class
      var setting = new Setting(setting.settingName, setting.settingValue);
      homeScreen.addSetting(setting);
   });

}


//
//   findSelectedPatient  
//

function findSelectedPatient(selectedDeviceId) {

   var c = 0 ;
   for (c = 0; c < currentSettings.length; c++) {

      // Parse the JSON string into JavaScript object
      const settingData = JSON.parse(currentSettings[c]);
      
      var s
      for (s = 0; s < settingData.settings.length; s++) {

         if (settingData.settings[s].settingName == "deviceId") {

            if (settingData.settings[s].settingValue == selectedDeviceId) {

               settingSetIndex = c ;

               simulateArrivalOfSettingDataMessage() ;

               drawTopLine() ;

               drawWaveformScaleArea() ;

               return ;

            }

         }

      }

   }

}
