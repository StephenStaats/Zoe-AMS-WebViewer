// const displayCanvas = document.getElementById('displayCanvas');
// const displayCtx = displayCanvas.getContext('2d');

// // Set canvas dimensions to match rotated dimensions
// displayCanvas.width = 480;
// displayCanvas.height = 800;

// // Clear the canvas
// displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);

// // Save the current transformation matrix
// displayCtx.save();

// // Translate the origin to the center of the canvas
// displayCtx.translate(displayCanvas.width / 2, displayCanvas.height / 2);

// // Rotate the canvas 90 degrees counterclockwise
// displayCtx.rotate(-Math.PI / 2);

// // Set the background of the canvas to red
// displayCtx.fillStyle = 'red';
// displayCtx.fillRect(-displayCanvas.height / 2, -displayCanvas.width / 2, displayCanvas.height, displayCanvas.width);

// // Restore the transformation matrix to its original state
// //displayCtx.restore();

// const displayCanvas = document.getElementById('displayCanvas');
// const displayCtx = displayCanvas.getContext('2d');

// // Clear the canvas
// displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);

// // Save the current transformation matrix
// displayCtx.save();

// // Translate the origin to the center of the canvas
// //displayCtx.translate(displayCanvas.width / 2, displayCanvas.height * 3 / 4);
// displayCtx.translate(0, displayCanvas.height);

// // Rotate the canvas 90 degrees counterclockwise (to achieve portrait orientation)
// displayCtx.rotate(-Math.PI / 2);

// // // Restore the transformation matrix to its original state
// // ctx.restore();

// resizeCanvas();

// // Set the background of the canvas to red
// displayCtx.fillStyle = 'red';
// displayCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);

/////////////////////////////////////////////////////////////////////////////////////////////////

// moved to script section inside .html files:

// //
// //   Get the canvas and context
// //

// const displayCanvas = document.getElementById('displayCanvas');
// const displayCtx = displayCanvas.getContext('2d');

// // Call resizeCanvas initially and on window resize

// //resizeCanvas();
// //window.addEventListener('resize', resizeCanvas);

// // Set the background of the canvas to black
// displayCtx.fillStyle = 'black';
// displayCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);
// //displayCtx.fillRect(0, 0, 200, 50);
// //displayCtx.fillRect(0, 0, displayCanvas.height, displayCanvas.width);


// //
// //   Create and initialize home screen
// //

// let pauseWaveformDrawing = 0;
// var framesPerSecond = 60;

// homeScreen = new HomeScreen(displayCanvas.width, displayCanvas.height);
// //homeScreen = new HomeScreen(displayCanvas.height, displayCanvas.width);
// homeScreen.initializeAreas();
// //homeScreen.setupWaveforms(waveformDataMessage);

// resetWaveforms(0);

// simulateArrivalOfParameterDataMessage();
// simulateArrivalOfParameterDataMessage();

// simulateArrivalOfSettingDataMessage();
// simulateArrivalOfSettingDataMessage();

// // Find selected patient
// findSelectedPatient(sessionStorage.getItem("selectedDeviceId")) ;

// // Start drawing
// drawHomeScreen();

// var intervalId = 0;
// // Set the interval to execute the function every 250 milliseconds  
// if (window.simulatedDataMode == 0) {
//    //intervalId = setInterval(simulateArrivalOfWaveformDataMessage, 1000);
//    intervalId = setInterval(periodicUpdate, 250);
// }

// // To stop the interval after a certain amount of time (e.g., 5 seconds), you can use setTimeout
// // setTimeout(() => {
// //    clearInterval(intervalId); // This stops the interval
// //    console.log('Interval stopped.');
// // }, 10000);

/////////////////////////////////////////////////////////////////////////////////////////////////



// function simulateArrivalOfWaveformDataMessage() {

//    getWaveformDataMessages() ;

// }


// //
// //   simulateArrivalOfParameterDataMessage
// //

// function simulateArrivalOfParameterDataMessage() {

//    processParameterDataMessage(currentParameters[parameterSetIndex]);

// }


// //
// //   simulateArrivalOfSettingDataMessage
// //

// function simulateArrivalOfSettingDataMessage() {

//    processSettingDataMessage(currentSettings[settingSetIndex]);

// }

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
