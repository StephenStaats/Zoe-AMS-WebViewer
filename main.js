intervalId = setInterval(periodicUpdate, 250);

//   shiftToNextSimulatedAMSMessage  
//

var simulatedAMSMessageIndex = 0 ;

function shiftToNextSimulatedAMSMessage() {

   simulatedAMSMessageIndex++;

   if (simulatedAMSMessageIndex >= simulatedAMSMessages.length) {
      simulatedAMSMessageIndex = 0;
   }

}


//
//   simulateArrivalOfAMSMessage
//

function simulateArrivalOfAMSMessage() {

   processAMSMessage(simulatedAMSMessages[simulatedAMSMessageIndex]);

}

// Define the function to be executed at each interval
function periodicUpdate() {

   updateBlinkState();

}

//
//   showSelectScreen  
//

function showSelectScreen() {

   window.location.href = 'select.html';

}




// Save the current transformation matrix
// displayCtx.save();

// // Rotate the canvas 90 degrees counterclockwise (to achieve portrait orientation)
// displayCtx.rotate(-Math.PI / 2);

// // Now, draw your waveforms with the same x and y coordinates as in landscape orientation
// // For example:
// displayCtx.beginPath();
// displayCtx.moveTo(50, 50);  // This would be equivalent to (50, 50) in landscape orientation
// displayCtx.lineTo(100, 100); // This would be equivalent to (100, 100) in landscape orientation
// Draw more waveforms as needed...

// Restore the transformation matrix to its original state
//ctx.restore();
