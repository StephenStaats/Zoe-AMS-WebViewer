//
// Fetch API 
//
// Function to fetch waveform data from Joe's REST API and reset waveforms accordingly
window.fetchAndResetWaveforms() = async function(){
    try {
       // Specify the URL of Joe's REST API
       const apiUrl = 'http://joe-api.example.com/waveforms'; // Replace with the actual API URL
 
       // Make an asynchronous GET request to the API
       const response = await fetch(apiUrl);
 
       // Check if the request was successful
       if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
       }
 
       // Parse the JSON response
       const data = await response.json();
 
       // Assuming the API returns a JSON object with a property 'waveforms' that contains an array of waveform names
       const waveformNames = JSON.stringify(data.waveforms);
 
       // Call the resetWaveforms function with the received waveform names
       resetWaveforms(waveformNames);
 
       // Optionally, log the received data for debugging
       console.log("Received waveform data from API:", data);
    } catch (error) {
       console.error("Failed to fetch waveform data from API:", error);
    }
 }
 

//
//   resetWaveforms
//

// resetWaveforms function that accepts a JSON string with waveform names and sets up waveforms accordingly
window.resetWaveforms = function(jsonWaveformNames) {
    try {
        // Clear the current waveforms on the home screen to prepare for new ones
        homeScreen.clearWaveformList();

        // Parse the JSON string into a JavaScript array of waveform names
        const waveformNames = JSON.parse(jsonWaveformNames);

        // Determine the number of waveforms and calculate the height for each waveform based on the available area
        const nWaveforms = waveformNames.length;
        const waveformHeight = Math.round(homeScreen.waveformAreaHeight / nWaveforms);

        // Loop through each waveform name, create a new Waveform instance, and add it to the home screen
        waveformNames.forEach((waveformName, index) => {
            const waveform = new Waveform(waveformName, index, waveformHeight);
            homeScreen.addWaveform(waveform);
        });

        // Set flag to redraw the home screen with the new waveforms
        redrawHomeScreen = 1;

        // Optionally, log the updated waveforms for debugging
        console.log("Waveforms reset with names:", waveformNames);
    } catch (error) {
        console.error('Error resetting waveforms with the provided names:', error);
    }
}