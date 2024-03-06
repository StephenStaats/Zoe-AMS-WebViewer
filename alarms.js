//
//   Alarm logic
//

window.monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_NONE ;
window.lastMonitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_NONE ;

window.monitorAlarmTone = window.Z_ALARM_TONE.Z_ALARM_TONE_NONE ;
window.lastMonitorAlarmTone = window.Z_ALARM_TONE.Z_ALARM_TONE_NONE ;

window.monitorNeedToColor = 0 ;

window.toneToggleState = 0 ;

window.blinkState = 0 ;

//
//   setAlarmStatusHIGH  
//

function setAlarmStatusHIGH() {

   monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_HIGH ;

}

//
//   setAlarmStatusMEDIUM  
//

function setAlarmStatusMEDIUM() {

   monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_MEDIUM ;

}

//
//   setAlarmStatusLOW  
//

function setAlarmStatusLOW() {

   monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_LOW ;

}

//
//   setAlarmStatusNONE  
//

function setAlarmStatusNONE() {

   monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_NONE ;

}

//
//   silenceAlarms  
//

function silenceAlarms() {

   //monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_NONE ;
   if (window.monitorAlarmTone != window.Z_ALARM_TONE.Z_ALARM_TONE_NONE) {
      window.alarmsSilenced = 1 ;
      window.audio.pause();
   }

}


//
//  getNumericAlarmStatusFromAlarmStatus
//

function getNumericAlarmStatusFromAlarmStatus(alarmStatus) {

   var numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.NORMAL_NONE ;

   switch (alarmStatus) {
      case "NORMAL_NONE" :         numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.NORMAL_NONE; break ;
      case "ACKNOWLEDGED_NONE" :   numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_NONE; break ;
      case "LATCHED_NONE" :        numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.LATCHED_NONE; break ;
      case "ACTIVE_NONE" :         numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_NONE; break ;
      case "ACKNOWLEDGED_LOW" :    numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_LOW; break ;
      case "ACKNOWLEDGED_MEDIUM" : numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_MEDIUM; break ;
      case "LATCHED_LOW" :         numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.LATCHED_LOW; break ;
      case "LATCHED_MEDIUM" :      numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.LATCHED_MEDIUM; break ;
      case "ACTIVE_LOW" :          numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_LOW; break ;
      case "ACTIVE_MEDIUM" :       numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_MEDIUM; break ;
      case "ACKNOWLEDGED_HIGH" :   numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_HIGH; break ;
      case "LATCHED_HIGH" :        numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.LATCHED_HIGH; break ;
      case "ACTIVE_HIGH" :         numericAlarmStatus = window.Z_PARAM_ALARM_STATUS.ACTIVE_HIGH; break ;
   }

   return(numericAlarmStatus) ;

}


//
//  getNeedToColorFromAlarmStatus
//

function getNeedToColorFromAlarmStatus(alarmStatus) {

   var needToColor = 0;

   switch (alarmStatus) {
      case window.Z_PARAM_ALARM_STATUS.NORMAL_NONE:
      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_NONE:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_NONE:
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_NONE:
         needToColor = 0;
         break;

      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_LOW:
      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_LOW:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_LOW:
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_HIGH:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_HIGH:
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_HIGH:
         needToColor = 1;
         break;

      default:
         needToColor = 0;
         break;
   }

   return(needToColor) ;

}

 
//
//  getAlarmToneFromAlarmStatus
//

function getAlarmToneFromAlarmStatus(alarmStatus) {

   var alarmTone = window.Z_ALARM_TONE.Z_ALARM_TONE_NONE ;

   switch (alarmStatus) {

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_HIGH :
         alarmTone = window.Z_ALARM_TONE.Z_ALARM_TONE_HIGH ;
         break ;

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_MEDIUM :
         alarmTone = window.Z_ALARM_TONE.Z_ALARM_TONE_MEDIUM ;
         break ;

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_LOW :
         alarmTone = window.Z_ALARM_TONE.Z_ALARM_TONE_LOW ;
         break ;

      default :
         alarmTone = window.Z_ALARM_TONE.Z_ALARM_TONE_NONE ;
         break ;

   }

   return (alarmTone);

}


//
//  soundalarmTone
//

function soundalarmTone() {

   // called every 250 ms

   //LOGALARMEVENT("In SoundalarmTone") ;
 
   var highestAlarmStatus = window.Z_PARAM_ALARM_STATUS.NORMAL_NONE ;

   for (p = 0; p < homeScreen.parameters.length; p++) {

      var param = homeScreen.parameters[p];

      var thisNumericAlarmStatus = getNumericAlarmStatusFromAlarmStatus(param.parameterAlarmStatus) ;

      if (thisNumericAlarmStatus > highestAlarmStatus) {

         highestAlarmStatus = thisNumericAlarmStatus ;

      }

   }

   monitorAlarmStatus = highestAlarmStatus;

   monitorAlarmTone = getAlarmToneFromAlarmStatus(monitorAlarmStatus) ;

   if (monitorAlarmTone != lastMonitorAlarmTone) {

      lastMonitorAlarmTone = monitorAlarmTone ;

      toneToggleState = 0 ;

      //LOGALARMEVENT("New alarm tone requested: ", monitorAlarmTone) ;

      switch (monitorAlarmTone)  {

         case window.Z_ALARM_TONE.Z_ALARM_TONE_NONE :
            //LOGALARMEVENT(translateNumber(window.StringNumbers.SN_New_alarm_tone_OFF)) ;
            window.alarmsSilenced = 0 ;
            break ;

         case window.Z_ALARM_TONE.Z_ALARM_TONE_LOW :
            LOGALARMEVENT(translateNumber(window.StringNumbers.SN_New_alarm_tone_LOW)) ;
            break ;

         case window.Z_ALARM_TONE.Z_ALARM_TONE_MEDIUM :
            LOGALARMEVENT(translateNumber(window.StringNumbers.SN_New_alarm_tone_MEDIUM)) ;
            break ;

         case window.Z_ALARM_TONE.Z_ALARM_TONE_HIGH :
            LOGALARMEVENT(translateNumber(window.StringNumbers.SN_New_alarm_tone_HIGH)) ;
            break ;

      }

   }

   switch (monitorAlarmTone) {

      case window.Z_ALARM_TONE.Z_ALARM_TONE_HIGH :
         //
         //   Two bursts of five chime tones (three, pause, two) at 8 second intervals
         //
         switch (toneToggleState) {
            case 0 :
               if (window.alarmsSilenced == 0) {
                  playAlarmToneHIGH() ;
                  LOGEVENT("playAlarmToneHIGH") ;
                  monitorAlarmToneInProgress = 1 ;
               }
               break ;
            case 16 :
               monitorAlarmToneInProgress = 0 ;   // high alarm tone .wav file is 4 seconds long
               break ;
         }
         toneToggleState++ ;
         if (toneToggleState >= 32) toneToggleState = 0 ;
         break ;

      case window.Z_ALARM_TONE.Z_ALARM_TONE_MEDIUM :

         //
         //   Three tones at 15 second intervals
         //
         switch (toneToggleState) {
            case 0 :
               if (window.alarmsSilenced == 0) {
                  playAlarmToneMEDIUM() ;
                  LOGEVENT("playAlarmToneMEDIUM") ;
                  monitorAlarmToneInProgress = 1 ;
               }
               break ;
            case 8 :
               monitorAlarmToneInProgress = 0 ;   // medium alarm tone .wav file is 2 seconds long 
               break ;
         }
         toneToggleState++ ;
         if (toneToggleState >= 60) toneToggleState = 0 ;
         break ;

      case window.Z_ALARM_TONE.Z_ALARM_TONE_LOW :

         //
         //   One tone at 20 second intervals
         //
         switch (toneToggleState) {
            case 0 :
               if (window.alarmsSilenced == 0) {
                  playAlarmToneLOW() ;
                  LOGEVENT("playAlarmToneLOW") ;
                  monitorAlarmToneInProgress = 1 ;
               }
               break ;
            case 8 :
               monitorAlarmToneInProgress = 0 ;   // low alarm tone .wav file is 2 seconds long 
               break ;
         }
         toneToggleState++ ;
         if (toneToggleState >= 80) toneToggleState = 0 ;

         break ;

      case window.Z_ALARM_TONE.Z_ALARM_TONE_NONE :

         //LOGEVENT("SOUND_TONE_NONE") ;
         monitorAlarmToneInProgress = 0 ;

         break ;

      default :

         break ;

   }

}



//
//  getTextBackgroundColorFromAlarmStatus
//

function getTextBackgroundColorFromAlarmStatus(alarmStatus, blinkState) {

   let returnColor;

   switch (alarmStatus) {
      case window.Z_PARAM_ALARM_STATUS.NORMAL_NONE:
      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_NONE:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_NONE:
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_NONE:
         returnColor = window.colors.ZBLACK;
         break;

      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_LOW:
         returnColor = window.colors.ZCYAN;
         break;

      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_MEDIUM:
         returnColor = window.colors.ZYELLOW;
         break;

      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_HIGH:
         returnColor = window.colors.ZRED;
         break;

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_LOW:
         returnColor = window.colors.ZCYAN;
         break;

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_MEDIUM:
         returnColor = (blinkState < 4) ? window.colors.ZBLINK_YELLOW_ON : window.colors.ZBLINK_YELLOW_OFF;
         break;

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_HIGH:
         returnColor = (blinkState < 4) ? window.colors.ZBLINK_RED_ON : window.colors.ZBLINK_RED_OFF;
         break;

      default:
         returnColor = window.colors.ZBLACK;
         break;
   }

   return returnColor;
}


function getTextForegroundColorFromAlarmStatus(alarmStatus, blinkState) {

   let returnColor;

   switch (alarmStatus) {
      case window.Z_PARAM_ALARM_STATUS.NORMAL_NONE:
      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_NONE:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_NONE:
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_NONE:
         returnColor = window.colors.ZWHITE;
         break;

      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_LOW:
      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_LOW:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_LOW:
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_MEDIUM:
         returnColor = window.colors.ZBLACK;
         break;

      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_HIGH:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_HIGH:
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_HIGH:
         returnColor = window.colors.ZWHITE;
         break;

      default:
         returnColor = window.colors.ZWHITE;
         break;
   }

   return returnColor;
}


function updateAlarmTones() {

   switch (monitorAlarmStatus) {

      case window.Z_PARAM_ALARM_STATUS.NORMAL_NONE:
      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_NONE:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_NONE:
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_NONE:
      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_LOW:
      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_LOW:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_MEDIUM:
         // silence 
         break;

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_LOW:
         playAlarmToneLOW();
         break;

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_MEDIUM:
         playAlarmToneMEDIUM();
         break;

      case window.Z_PARAM_ALARM_STATUS.ACKNOWLEDGED_HIGH:
      case window.Z_PARAM_ALARM_STATUS.LATCHED_HIGH:
         // silence 
         break;

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_HIGH:
         playAlarmToneHIGH();
         break;

      default:
         // silence 
         break;

   }

}

//
//  updateBlinkState
//

function updateBlinkState() {

   blinkState++ ;

   if (blinkState > 7) {
      blinkState = 0 ; 
   }

   if (window.simulatedDataMode == 0) {

      if ((blinkState % 4) == 1) {
         //fetchAndProcessData();
         simulateArrivalOfWaveformDataMessage() ;
         simulateArrivalOfParameterDataMessage() ;
         simulateArrivalOfSettingDataMessage() ;
      }

   }

   soundalarmTone() ;
  
   var needToBlinkMessage        = 0 ;
   var needToBlinkParameterBoxes = 0 ;
   var suspendTimerRunning       = 0 ;

   //if (monitorAlarmStatus != lastMonitorAlarmStatus) {

      //lastMonitorAlarmStatus = monitorAlarmStatus ;

      //getMonitorAlarmToneFromMonitorAlarmStatus() ;

      //monitorNeedToColor = getNeedToColorFromAlarmStatus(monitorAlarmStatus) ;

      //updateAlarmTones() ;

      //drawHRParameterArea() ;

   //}

   // if (monitorNeedToColor) {
   //    needToBlinkMessage        = 1 ;
   //    needToBlinkParameterBoxes = 1 ;
   // }

   switch (monitorAlarmStatus) {

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_HIGH :
      case window.Z_PARAM_ALARM_STATUS.ACTIVE_MEDIUM :
         needToBlinkMessage        = 1 ;
         needToBlinkParameterBoxes = 1 ;
         break ;

      case window.Z_PARAM_ALARM_STATUS.ACTIVE_LOW :
         needToBlinkMessage        = 0 ;
         needToBlinkParameterBoxes = 0 ;
         break ;

   }

   if (suspendTimerRunning != window.Z_ALL_ALARMS_OFF_FALSE) needToBlinkMessage = 1 ;

   if (needToBlinkMessage) {

	   //
	   //   Do this to blink message
	   //

      if ((blinkState % 2) == 0) {                 // avoid too much distracting redrawing on desktop...

         //displayGMessage(&mMessageRect) ; // in UpdateAlarms

      }

   }

   if (needToBlinkParameterBoxes) {

	   //
	   //   Do this to blink parameter boxes
	   //

      if ((blinkState % 2) == 0) {                 // avoid too much distracting redrawing on desktop...

         drawParameterAreas();

         // if (mHR.NeedToColor()) {
            // drawHRParameterArea() ;
         // }


      }

   }

}

