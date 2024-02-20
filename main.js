//
//   Get the canvas and context
//

const displayCanvas = document.getElementById('displayCanvas');
const displayCtx = displayCanvas.getContext('2d');

// Create an off-screen canvas for double buffering
const bufferCanvas = document.createElement('canvas');
const bufferCtx = bufferCanvas.getContext('2d');

// Set initial dimensions of the canvas
function resizeCanvas() {

   // displayCanvas.width = window.innerWidth;
   // displayCanvas.height = 200; // Fixed height

   // You might need to adjust the drawing here if necessary
   // For example, redraw the waveform or clear the canvas
   displayCtx.fillStyle = 'black';
   displayCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);

   bufferCanvas.width = displayCanvas.width;
   bufferCanvas.height = displayCanvas.height;

   // Initial clear for buffer canvas
   bufferCtx.fillStyle = 'black';
   bufferCtx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);

   redrawHomeScreen = 1;

}


//
//   Event listener for changing simulation type dropdown
//

var intervalId = 0;

const simulationTypeDropdown = document.getElementById("simulationTypeDropdown");

simulationTypeDropdown.addEventListener("change", function () {

   const selectedValue = simulationTypeDropdown.value;

   if (selectedValue == 'simulateWaveformData') {
      window.simulatedDataMode = 1;
      clearInterval(intervalId); // This stops the interval
   }
   else {
      window.simulatedDataMode = 0;
      intervalId = setInterval(simulateArrivalOfWaveformMessage, 1000);   
   }

   resetWaveforms(0);

});


//  Increment / decrement MS per pixel 
var dialMSPerPixel = document.getElementById('dialMSPerPixel');

function incrementMSPerPixel() {
   if (parseFloat(dialMSPerPixel.value) < parseFloat(dialMSPerPixel.max)) {
      dialMSPerPixel.value = (parseFloat(dialMSPerPixel.value) + 0.1).toFixed(1); // Increase by 0.1 and round to 1 decimal place
      enteredMSPerPixel = parseFloat(dialMSPerPixel.value);
   }
}

function decrementMSPerPixel() {
   if (parseFloat(dialMSPerPixel.value) > parseFloat(dialMSPerPixel.min)) {
      dialMSPerPixel.value = (parseFloat(dialMSPerPixel.value) - 0.1).toFixed(1); // Decrease by 0.1 and round to 1 decimal place
      enteredMSPerPixel = parseFloat(dialMSPerPixel.value);
   }
}



//  Increment / decrement MS per sample 
var dialMSPerSample = document.getElementById('dialMSPerSample');

function incrementMSPerSample() {
   if (parseFloat(dialMSPerSample.value) < parseFloat(dialMSPerSample.max)) {
      dialMSPerSample.value = (parseFloat(dialMSPerSample.value) + 0.1).toFixed(1); // Increase by 0.1 and round to 1 decimal place
      enteredMSPerSample = parseFloat(dialMSPerSample.value);
   }
}

function decrementMSPerSample() {
   if (parseFloat(dialMSPerSample.value) > parseFloat(dialMSPerSample.min)) {
      dialMSPerSample.value = (parseFloat(dialMSPerSample.value) - 0.1).toFixed(1); // Decrease by 0.1 and round to 1 decimal place
      enteredMSPerSample = parseFloat(dialMSPerSample.value);
   }
}


// Call resizeCanvas initially and on window resize

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Set the background of the canvas to black
displayCtx.fillStyle = 'black';
displayCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);


//
//   Create and initialize home screen
//

let pauseWaveformDrawing = 0;
var framesPerSecond = 60;

homeScreen = new HomeScreen(displayCanvas.width, displayCanvas.height);
homeScreen.initializeAreas();
//homeScreen.setupWaveforms(waveformDataMessage);

resetWaveforms(0);

// Start drawing
drawHomeScreen();


// Define the function to be executed at each interval
function simulateArrivalOfWaveformMessage() {

   processWaveformDataMessage(currentWaveforms[waveformSetIndex]);

}

var waveformDataMessageCount = 0;

// Set the interval to execute the function every 1000 milliseconds (1 second)
if (window.simulatedDataMode == 0) {
   intervalId = setInterval(simulateArrivalOfWaveformMessage, 1000);
}

// To stop the interval after a certain amount of time (e.g., 5 seconds), you can use setTimeout
// setTimeout(() => {
//    clearInterval(intervalId); // This stops the interval
//    console.log('Interval stopped.');
// }, 10000);

