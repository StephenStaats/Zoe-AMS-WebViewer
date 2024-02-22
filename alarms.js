//
//   Alarm logic
//

window.blinkState = 0 ;

window.monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_NONE ;
window.lastMonitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_NONE ;

window.monitorNeedToColor = 0 ;

//
//   setAlarmStatusHIGH  
//

function setAlarmStatusHIGH() {

   monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_HIGH ;

}

//
//   setAlarmStatusMEDIUM  
//

function setAlarmStatusMEDIUM() {

   monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_MEDIUM ;

}

//
//   setAlarmStatusLOW  
//

function setAlarmStatusLOW() {

   monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_LOW ;

}

//
//   setAlarmStatusNONE  
//

function setAlarmStatusNONE() {

   monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_NONE ;

}

//
//   silenceAlarms  
//

function silenceAlarms() {

   monitorAlarmStatus = window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_NONE ;

}


//
//  getMonitorNeedToColorFromAlarmStatus
//

function getMonitorNeedToColorFromAlarmStatus() {

   switch (monitorAlarmStatus) {
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_NORMAL_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_NONE:
         monitorNeedToColor = 0;
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_LOW:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_LOW:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_LOW:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_HIGH:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_HIGH:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_HIGH:
         monitorNeedToColor = 1;
         break;

      default:
         monitorNeedToColor = 0;
         break;
   }

}

//
//  getTextBackgroundColorFromAlarmStatus
//

function getTextBackgroundColorFromAlarmStatus(alarmStatus, blinkState) {

   let returnColor;

   switch (alarmStatus) {
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_NORMAL_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_NONE:
         returnColor = window.colors.ZBLACK;
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_LOW:
         returnColor = window.colors.ZCYAN;
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_MEDIUM:
         returnColor = window.colors.ZYELLOW;
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_HIGH:
         returnColor = window.colors.ZRED;
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_LOW:
         returnColor = window.colors.ZCYAN;
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_MEDIUM:
         returnColor = (blinkState < 4) ? window.colors.ZBLINK_YELLOW_ON : window.colors.ZBLINK_YELLOW_OFF;
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_HIGH:
         switch (blinkState) {
            case 0:
            case 1:
            case 4:
            case 5:
               returnColor = window.colors.ZBLINK_RED_ON;
               break;

            case 2:
            case 3:
            case 6:
            case 7:
               returnColor = window.colors.ZBLINK_RED_OFF;
               break;
         }
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
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_NORMAL_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_NONE:
         returnColor = window.colors.ZWHITE;
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_LOW:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_LOW:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_LOW:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_MEDIUM:
         returnColor = window.colors.ZBLACK;
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_HIGH:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_HIGH:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_HIGH:
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

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_NORMAL_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_NONE:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_LOW:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_MEDIUM:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_LOW:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_MEDIUM:
         // silence 
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_LOW:
         playAlarmToneLOW();
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_MEDIUM:
         playAlarmToneMEDIUM();
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACKNOWLEDGED_HIGH:
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_LATCHED_HIGH:
         // silence 
         break;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_HIGH:
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
         simulateArrivalOfWaveformDataMessage() ;
         //simulateArrivalOfParameterDataMessage() ;
      }

   }

   //return ;
  
   var needToBlinkMessage        = 0 ;
   var needToBlinkParameterBoxes = 0 ;
   var suspendTimerRunning       = 0 ;

   if (monitorAlarmStatus != lastMonitorAlarmStatus) {

      lastMonitorAlarmStatus = monitorAlarmStatus ;

      getMonitorNeedToColorFromAlarmStatus() ;

      updateAlarmTones() ;

      drawHRParameterArea() ;

   }

   // if (monitorNeedToColor) {
   //    needToBlinkMessage        = 1 ;
   //    needToBlinkParameterBoxes = 1 ;
   // }

   switch (monitorAlarmStatus) {

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_HIGH :
      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_MEDIUM :
         needToBlinkMessage        = 1 ;
         needToBlinkParameterBoxes = 1 ;
         break ;

      case window.Z_PARAM_ALARM_STATUS.Z_PARAM_ALARM_STATUS_ACTIVE_LOW :
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

         // if ((mNBPs.NeedToColor()) || (mNBPm.NeedToColor()) || (mNBPd.NeedToColor())) {
         //    drawNBPParameterBoxText(pDC) ;
         // }

         // if (mSpO2.NeedToColor()) {
         //   drawSpO2ParameterBoxText(pDC) ;
         // }

         // if (mHR.NeedToColor()) {
             drawHRParameterArea() ;
         // }

         // if (mTEMP.NeedToColor()) {
         //    drawTEMPParameterBoxText(pDC) ;
         // }

         // if (mETCO2.NeedToColor()) {
         //    drawETCO2ParameterBoxText(pDC) ;
         // }
         // if (mFICO2.NeedToColor()) {
         //    drawFICO2ParameterBoxText(pDC) ;
         // }
         // if (mRRC.NeedToColor()) {
         //    drawRRCParameterBoxText(pDC) ;
         // }

      }

   }

}

