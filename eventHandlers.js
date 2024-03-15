//
//  Event handling functions 
//

//
//  resizeCanvas
//

function resizeCanvas() {

   // displayCanvas.width = window.innerWidth;
   // displayCanvas.height = 200; // Fixed height

   // You might need to adjust the drawing here if necessary
   // For example, redraw the waveform or clear the canvas
   displayCtx.fillStyle = 'black';
   displayCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);

   // bufferCanvas.width = displayCanvas.width;
   // bufferCanvas.height = displayCanvas.height;

   // // Initial clear for buffer canvas
   // bufferCtx.fillStyle = 'black';
   // bufferCtx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);

   redrawHomeScreen = 1;

}

//
//  Listener for changing simulation type dropdown
//

simulationTypeDropdown.addEventListener("change", function () {

   homeScreen.clearWaveformList() ;
   homeScreen.clearParameterList() ;
   homeScreen.clearSettingList() ;

   const selectedValue = simulationTypeDropdown.value;

   if (selectedValue == 'simulatedData') {

      window.simulatedDataMode = 1;

      simulateArrivalOfAMSMessage();
      simulateArrivalOfAMSMessage();

   }
   else {

      window.simulatedDataMode = 0;

   }

   redrawHomeScreen = 1 ;

});


//
//  Listener for incrementing / decrementing MS per pixel 
//

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


//
//  Listener for incrementing / decrementing MS per sample 
//

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