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
      //clearInterval(intervalId); // This stops the interval
   }
   else {
      window.simulatedDataMode = 0;
      //intervalId = setInterval(simulateArrivalOfWaveformDataMessage, 1000);   
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

simulateArrivalOfParameterDataMessage();
simulateArrivalOfParameterDataMessage();

simulateArrivalOfSettingDataMessage();
simulateArrivalOfSettingDataMessage();

// Disable the button
document.getElementById("setAlarmStatusHIGHButton").disabled = true;
document.getElementById("setAlarmStatusMEDIUMButton").disabled = true;
document.getElementById("setAlarmStatusLOWButton").disabled = true;
document.getElementById("setAlarmStatusNONEButton").disabled = true;
//document.getElementById("silenceAlarmsButton").disabled = true;



// Find selected patient
// Target page
//window.selectedDeviceId = sessionStorage.getItem("selectedDeviceId");
findSelectedPatient(sessionStorage.getItem("selectedDeviceId")) ;

// Start drawing
drawHomeScreen();


// Function to fetch EKG waveform data
async function getWaveformDataMessages() {

   LOGEVENTGREEN("In getWaveformDataMessages") ;

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

      var waveformDataMessages = await response.json();
      // Loop through each string in the waveformDataMessages array
      waveformDataMessages.forEach((waveformDataMessage, index) => {
         const waveformDataMessageString = JSON.stringify(waveformDataMessage);
         processWaveformDataMessage(waveformDataMessageString);
      });

   } catch (error) {

      LOGEVENTRED('Error:', error);

   }

}


function simulateArrivalOfWaveformDataMessage() {

   getWaveformDataMessages() ;

   //processWaveformDataMessage(currentWaveforms[waveformSetIndex]);

}


//
//   simulateArrivalOfParameterDataMessage
//

function simulateArrivalOfParameterDataMessage() {

   processParameterDataMessage(currentParameters[parameterSetIndex]);

}


//
//   simulateArrivalOfSettingDataMessage
//

function simulateArrivalOfSettingDataMessage() {

   processSettingDataMessage(currentSettings[settingSetIndex]);

}


// Define the function to be executed at each interval
function periodicUpdate() {

   updateBlinkState() ;

}

// Set the interval to execute the function every 250 milliseconds  
if (window.simulatedDataMode == 0) {
   //intervalId = setInterval(simulateArrivalOfWaveformDataMessage, 1000);
   intervalId = setInterval(periodicUpdate, 250);
}

// To stop the interval after a certain amount of time (e.g., 5 seconds), you can use setTimeout
// setTimeout(() => {
//    clearInterval(intervalId); // This stops the interval
//    console.log('Interval stopped.');
// }, 10000);


//
//   showSelectScreen  
//

function showSelectScreen() {

  window.location.href = 'select.html';

}



