//
//   Define basic objects
//   

class RingBuffer {

   //   In this implementation:

   // The enqueue method adds a sample to the buffer and updates the head index.
   // The dequeue method removes and returns the oldest sample from the buffer and updates the tail index.
   // Methods like isEmpty, isFull, getSize, and getCapacity provide information about the buffer.
   // The toArray method converts the buffer to an array for easier inspection.

   constructor(name, capacity) {
      this.name = name;
      this.capacity = capacity;
      this.buffer = new Array(capacity);
      this.head = 0; // Points to the next available position for adding a sample
      this.tail = 0; // Points to the oldest sample in the buffer
      this.size = 0; // Tracks the number of elements in the buffer
   }

   // Method to add a sample to the buffer
   enqueue(sample) {
      // Check if the buffer is full
      if (this.size === this.capacity) {
         //throw new Error(this.name + " Buffer is full");
         LOGEVENTRED(this.name + " Buffer is full");
      }
      this.buffer[this.head] = sample;
      this.head = (this.head + 1) % this.capacity;
      this.size++;
   }

   // Method to remove and return the oldest sample from the buffer
   dequeue() {
      // Check if the buffer is empty
      if (this.size === 0) {
         //throw new Error(this.name + " Buffer is empty");
         LOGEVENTRED(this.name + " Buffer is empty (dequeue)");
         return (window.LEAD_OFF_OR_UNPLUGGED);
      }
      const sample = this.buffer[this.tail];
      this.tail = (this.tail + 1) % this.capacity;
      this.size--;
      return sample;
   }

   // Method to peek at current sample 
   peek() {
      // Check if the buffer is empty
      if (this.size === 0) {
         //throw new Error(this.name + " Buffer is empty");
         LOGEVENTRED(this.name + " Buffer is empty (peek)");
         return (window.LEAD_OFF_OR_UNPLUGGED);
      }
      const sample = this.buffer[this.tail];
      return sample;
   }

   // Method to peek at next sample 
   peekNext() {
      // Check if the buffer is empty
      if (this.size === 0) {
         //throw new Error(this.name + " Buffer is empty");
         LOGEVENTRED(this.name + " Buffer is empty (peekNext)");
         return (window.LEAD_OFF_OR_UNPLUGGED);
      }
      const sample = this.buffer[(this.tail + 1) % this.capacity];
      return sample;
   }

   // Method to check if the buffer is empty
   isEmpty() {
      return this.size === 0;
   }

   // Method to check if the buffer is full
   isFull() {
      return this.size === this.capacity;
   }

   // Method to get the number of elements in the buffer
   getSize() {
      return this.size;
   }

   // Method to get the capacity of the buffer
   getCapacity() {
      return this.capacity;
   }

   // Method to convert the buffer to an array
   toArray() {
      const result = [];
      let current = this.tail;
      for (let i = 0; i < this.size; i++) {
         result.push(this.buffer[current]);
         current = (current + 1) % this.capacity;
      }
      return result;
   }
}


class Waveform {

   constructor(waveformName, order) {

      this.waveformName = waveformName;
      this.capacity = 20000;
      this.buffer = new RingBuffer(this.waveformName, this.capacity);
      this.bufferReadCount = 0;

      this.left = homeScreen.waveformAreaLeft;
      this.top = homeScreen.waveformAreaTop + order * waveformHeight;
      this.right = homeScreen.waveformAreaLeft + homeScreen.waveformAreaWidth;
      this.width = homeScreen.waveformAreaWidth;
      this.height = waveformHeight - 1;
      this.bottom = this.top + this.height;

      this.drawX = this.left;
      this.drawXTime = 0;
      this.eraseX = this.drawX + homeScreen.eraseBarWidth;
      this.drawY = 0;
      this.drawXLast = 0;
      this.drawYLast = 0;
      this.startY = Number.MIN_VALUE;
      this.headIndex = 0;
      this.tailIndex = 0;

      this.elapsedTime = 0;       // total elapsed time in MS (as clocked by the browser)
      this.drawnPixelTime = 0;    // total time represented by drawn pixels
      this.shiftedPixelTime = 0;  // total time represented by shifted pixels
      this.readSampleTime = 0;    // total time represented by read samples
      this.readSampleTime = 0;    // total time represented by read samples

      this.pixelsDrawnToBuffer = 0;
      this.pixelBufferIndex = 0;

      this.samplesDrawn = 0;
      this.samplesToDraw = this.width;

      switch (this.waveformName) {

         case 'ECGII':
            this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
            this.color = window.colors.ECGColor;
            this.fill = false;
            this.sampleRateIn = 250;
            this.sampleRate = 250;
            this.sweepSpeed = 25.0;
            this.autoScale = false;
            this.yMin = -500;
            this.yMax = 500;
            this.maxSimulatedSampleIndex = window.simulatedWaveformECGII.length;
            this.simulatedSamples = window.simulatedWaveformECGII;
            break;

         case 'CO2':
            this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
            this.color = window.colors.CO2Color;
            this.fill = true;
            this.sampleRateIn = 50;
            this.sampleRate = 250;
            this.sweepSpeed = 6.25;
            this.autoScale = false;
            this.yMin = -100;
            this.yMax = 4000;
            this.maxSimulatedSampleIndex = window.simulatedWaveformCO2.length;
            this.simulatedSamples = window.simulatedWaveformCO2;
            break;

         case 'SpO2':
            this.waveformId = getWaveformIdFromWaveformName(this.waveformName);
            this.color = window.colors.SpO2Color;
            this.fill = false;
            if (window.simulatedDataMode) {
               this.sampleRateIn = 250;
            }
            else {
               this.sampleRateIn = 50;
            }
            this.sampleRate = 250;
            this.sweepSpeed = 25.0;
            this.autoScale = true;
            this.yMin = 0;
            this.yMax = 0;
            this.maxSimulatedSampleIndex = window.simulatedWaveformSpO2At250Hz.length;
            this.simulatedSamples = window.simulatedWaveformSpO2At250Hz;
            break;

         case 'RESP':
            this.waveformId = window.Z_WAVEFORM_ID.Z_WAVEFORM_RESP;
            this.color = window.colors.RESPColor;
            this.fill = false;
            this.sampleRateIn = 50;
            this.sampleRate = 250;
            this.sweepSpeed = 6.25;
            this.autoScale = true;
            this.yMin = 0;
            this.yMax = 0;
            this.maxSimulatedSampleIndex = window.simulatedWaveformRESP.length;
            this.simulatedSamples = window.simulatedWaveformRESP;
            break;

      }

      if (this.autoScale) {

         var minY;
         var maxY;

         minY = Number.MAX_VALUE;
         maxY = Number.MIN_VALUE;
         var s;
         for (s = 0; s < this.maxSimulatedSampleIndex; s++) {
            if (this.simulatedSamples[s] < minY) {
               minY = this.simulatedSamples[s];
            }
            if (this.simulatedSamples[s] > maxY) {
               maxY = this.simulatedSamples[s];
            }
         }
         var amplitude = maxY - minY;

         this.yMin = minY - amplitude * window.autoscaleOffsetPercentage / 100 ;
         this.yMax = maxY + amplitude * window.autoscaleOffsetPercentage / 100 ;

      }

   }

   // Method to write a sample to the waveform ring buffer
   writeSample(sample) {
      this.buffer.enqueue(sample);
      if (this.buffer.getSize() > this.capacity) {
         this.buffer.dequeue(); // Remove oldest sample if buffer exceeds capacity
      }
   }

   // Method to read a sample from the waveform ring buffer
   readSample() {
      this.bufferReadCount++;
      const sample = this.buffer.dequeue();
      return sample;
   }

   // Method to peek at current sample from the waveform ring buffer without dequeuing it
   peekThisSample() {
      const sample = this.buffer.peek();
      return sample;
   }

   // Method to peek at sample beyond current sample from the waveform ring buffer without dequeuing it
   peekNextSample() {
      const sample = this.buffer.peekNext();
      return sample;
   }

   // Method to clear the waveform data
   clearSamples() {
      while (!this.buffer.isEmpty()) {
         this.buffer.dequeue();
      }
   }

   // Method to get number of samples
   getNSamples() {
      return this.buffer.getSize();
   }

   // Method to get the waveform name
   getWaveformName() {
      return this.waveformName;
   }

   // Method to get the waveform ID
   getWaveformId() {
      return this.waveformId;
   }

   // Method to get the samples as an array
   getSamples() {
      return this.buffer.toArray();
   }

   // Method to get the number of samples in the waveform
   getNumSamples() {
      return this.buffer.getSize();
   }

   // Method to get the capacity of the waveform
   getCapacity() {
      return this.capacity;
   }

}


//
//   Home screen
//

class HomeScreen {

   constructor(width, height) {

      this.width = width;
      this.height = height;

      this.left = 0;
      this.right = width;
      this.top = 0;
      this.bottom = height;

      this.headerWidth = 0;
      this.headerHeight = 0;
      this.headerLeft = 0;
      this.headerRight = 0;
      this.headerTop = 0;
      this.headerBottom = 0;

      this.waveformAreaWidth = 0;
      this.waveformAreaHeight = 0;
      this.waveformAreaLeft = 0;
      this.waveformAreaRight = 0;
      this.waveformAreaTop = 0;
      this.waveformAreaBottom = 0;

      this.rightParamAreaWidth = 0;
      this.rightParamAreaHeight = 0;
      this.rightParamAreaLeft = 0;
      this.rightParamAreaRight = 0;
      this.rightParamAreaTop = 0;
      this.rightParamAreaBottom = 0;

      this.bottomParamAreaWidth = 0;
      this.bottomParamAreaHeight = 0;
      this.bottomParamAreaLeft = 0;
      this.bottomParamAreaRight = 0;
      this.bottomParamAreaTop = 0;
      this.bottomParamAreaBottom = 0;

      this.messageAreaWidth = 0;
      this.messageAreaHeight = 0;
      this.messageAreaLeft = 0;
      this.messageAreaRight = 0;
      this.messageAreaTop = 0;
      this.messageAreaBottom = 0;

      this.eraseBarWidth = 10;

      this.waveforms = [];


   }

   initializeAreas() {

      this.headerWidth = this.width;
      this.headerHeight = Math.round(this.height * 15 / 100);
      this.headerLeft = 0;
      this.headerRight = this.headerLeft + this.headerWidth;
      this.headerTop = 0;
      this.headerBottom = this.headerTop + this.headerHeight;

      this.waveformAreaWidth = Math.round(this.width * 80 / 100);
      this.waveformAreaHeight = Math.round(this.height * 65 / 100);
      this.waveformAreaLeft = 0;
      this.waveformAreaRight = this.waveformAreaLeft + this.waveformAreaWidth;
      this.waveformAreaTop = this.headerBottom;
      this.waveformAreaBottom = this.waveformAreaTop + this.waveformAreaHeight;

      this.rightParamAreaWidth = this.width * 20 / 100;
      this.rightParamAreaHeight = this.height * 65 / 100;
      this.rightParamAreaLeft = this.waveformAreaRight;
      this.rightParamAreaRight = this.rightParamAreaLeft + this.rightParamAreaWidth;
      this.rightParamAreaTop = this.headerBottom;
      this.rightParamAreaBottom = this.rightParamAreaTop + this.rightParamAreaHeight;

      this.bottomParamAreaWidth = this.width;
      this.bottomParamAreaHeight = this.height * 10 / 100;
      this.bottomParamAreaLeft = 0;
      this.bottomParamAreaRight = this.bottomParamAreaLeft + this.bottomParamAreaWidth;
      this.bottomParamAreaTop = this.waveformAreaBottom;
      this.bottomParamAreaBottom = this.bottomParamAreaTop + this.bottomParamAreaHeight;

      this.messageAreaWidth = this.width;
      this.messageAreaHeight = this.height * 10 / 100;
      this.messageAreaLeft = 0;
      this.messageAreaRight = this.messageAreaLeft + this.messageAreaWidth;
      this.messageAreaTop = this.bottomParamAreaBottom;
      this.messageAreaBottom = this.messageAreaTop + this.messageAreaHeight;
   }

   clearWaveformList() {
      this.waveforms = [];
   }

   addWaveform(wvf) {
      this.waveforms.push(wvf);
   }

   getNWaveforms() {
      return (this.waveforms.length);
   }

}


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
//   Simulated waveform data messages
//

const currentWaveforms = [
   `
   {
      "messageType": "waveformData",
      "waveforms":
      [
         {
         "waveformName": "ECGII",
         "waveformSamples": [0,10,20,30,40,50,60,70,79,89,99,109,118,128,137,147,156,165,174,183,192,201,210,218,226,235,243,251,258,266,273,281,288,295,301,308,314,320,326,332,337,343,348,352,357,361,366,370,373,377,380,383,386,388,390,392,394,396,397,398,399,399,399,399,399,399,398,397,396,394,392,390,388,386,383,380,377,373,370,366,361,357,352,348,343,337,332,326,320,314,308,301,295,288,281,273,266,258,251,243,235,226,218,210,201,192,183,174,165,156,147,137,128,118,109,99,89,79,70,60,50,40,30,20,10,0,-11,-21,-31,-41,-51,-61,-71,-80,-90,-100,-110,-119,-129,-138,-148,-157,-166,-175,-184,-193,-202,-211,-219,-227,-236,-244,-252,-259,-267,-274,-282,-289,-296,-302,-309,-315,-321,-327,-333,-338,-344,-349,-353,-358,-362,-367,-371,-374,-378,-381,-384,-387,-389,-391,-393,-395,-397,-398,-399,-400,-400,-400,-400,-400,-400,-399,-398,-397,-395,-393,-391,-389,-387,-384,-381,-378,-374,-371,-367,-362,-358,-353,-349,-344,-338,-333,-327,-321,-315,-309,-302,-296,-289,-282,-274,-267,-259,-252,-244,-236,-227,-219,-211,-202,-193,-184,-175,-166,-157,-148,-138,-129,-119,-110,-100,-90,-80,-71,-61,-51,-41,-31,-21,-11]
         },
         {
         "waveformName": "CO2",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         },
         {
         "waveformName": "SpO2",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         },
         {
         "waveformName": "RESP",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         }
      ]
   }
`,
   `
   {
      "messageType": "waveformData",
      "waveforms":
      [
         {
         "waveformName": "RESP",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         },
         {
         "waveformName": "ECGII",
         "waveformSamples": [0,10,20,30,40,50,60,70,79,89,99,109,118,128,137,147,156,165,174,183,192,201,210,218,226,235,243,251,258,266,273,281,288,295,301,308,314,320,326,332,337,343,348,352,357,361,366,370,373,377,380,383,386,388,390,392,394,396,397,398,399,399,399,399,399,399,398,397,396,394,392,390,388,386,383,380,377,373,370,366,361,357,352,348,343,337,332,326,320,314,308,301,295,288,281,273,266,258,251,243,235,226,218,210,201,192,183,174,165,156,147,137,128,118,109,99,89,79,70,60,50,40,30,20,10,0,-11,-21,-31,-41,-51,-61,-71,-80,-90,-100,-110,-119,-129,-138,-148,-157,-166,-175,-184,-193,-202,-211,-219,-227,-236,-244,-252,-259,-267,-274,-282,-289,-296,-302,-309,-315,-321,-327,-333,-338,-344,-349,-353,-358,-362,-367,-371,-374,-378,-381,-384,-387,-389,-391,-393,-395,-397,-398,-399,-400,-400,-400,-400,-400,-400,-399,-398,-397,-395,-393,-391,-389,-387,-384,-381,-378,-374,-371,-367,-362,-358,-353,-349,-344,-338,-333,-327,-321,-315,-309,-302,-296,-289,-282,-274,-267,-259,-252,-244,-236,-227,-219,-211,-202,-193,-184,-175,-166,-157,-148,-138,-129,-119,-110,-100,-90,-80,-71,-61,-51,-41,-31,-21,-11]
         },
         {
         "waveformName": "CO2",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         },
         {
         "waveformName": "SpO2",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         }
      ]
   }
`,

   `
   {
      "messageType": "waveformData",
      "waveforms":
      [
         {
         "waveformName": "SpO2",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         },
         {
         "waveformName": "RESP",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         },
         {
         "waveformName": "ECGII",
         "waveformSamples": [0,10,20,30,40,50,60,70,79,89,99,109,118,128,137,147,156,165,174,183,192,201,210,218,226,235,243,251,258,266,273,281,288,295,301,308,314,320,326,332,337,343,348,352,357,361,366,370,373,377,380,383,386,388,390,392,394,396,397,398,399,399,399,399,399,399,398,397,396,394,392,390,388,386,383,380,377,373,370,366,361,357,352,348,343,337,332,326,320,314,308,301,295,288,281,273,266,258,251,243,235,226,218,210,201,192,183,174,165,156,147,137,128,118,109,99,89,79,70,60,50,40,30,20,10,0,-11,-21,-31,-41,-51,-61,-71,-80,-90,-100,-110,-119,-129,-138,-148,-157,-166,-175,-184,-193,-202,-211,-219,-227,-236,-244,-252,-259,-267,-274,-282,-289,-296,-302,-309,-315,-321,-327,-333,-338,-344,-349,-353,-358,-362,-367,-371,-374,-378,-381,-384,-387,-389,-391,-393,-395,-397,-398,-399,-400,-400,-400,-400,-400,-400,-399,-398,-397,-395,-393,-391,-389,-387,-384,-381,-378,-374,-371,-367,-362,-358,-353,-349,-344,-338,-333,-327,-321,-315,-309,-302,-296,-289,-282,-274,-267,-259,-252,-244,-236,-227,-219,-211,-202,-193,-184,-175,-166,-157,-148,-138,-129,-119,-110,-100,-90,-80,-71,-61,-51,-41,-31,-21,-11]
         },
         {
         "waveformName": "CO2",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         }
      ]
   }
`,

   `
   {
      "messageType": "waveformData",
      "waveforms":
      [
         {
         "waveformName": "CO2",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         },
         {
         "waveformName": "SpO2",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         },
         {
         "waveformName": "RESP",
         "waveformSamples": [2000,2250,2497,2736,2963,3175,3369,3541,3688,3809,3902,3964,3996,3996,3964,3902,3809,3688,3541,3369,3175,2963,2736,2497,2250,2000,1749,1502,1263,1036,824,630,458,311,190,97,35,3,3,35,97,190,311,458,630,824,1036,1263,1502,1749]
         },
         {
         "waveformName": "ECGII",
         "waveformSamples": [0,10,20,30,40,50,60,70,79,89,99,109,118,128,137,147,156,165,174,183,192,201,210,218,226,235,243,251,258,266,273,281,288,295,301,308,314,320,326,332,337,343,348,352,357,361,366,370,373,377,380,383,386,388,390,392,394,396,397,398,399,399,399,399,399,399,398,397,396,394,392,390,388,386,383,380,377,373,370,366,361,357,352,348,343,337,332,326,320,314,308,301,295,288,281,273,266,258,251,243,235,226,218,210,201,192,183,174,165,156,147,137,128,118,109,99,89,79,70,60,50,40,30,20,10,0,-11,-21,-31,-41,-51,-61,-71,-80,-90,-100,-110,-119,-129,-138,-148,-157,-166,-175,-184,-193,-202,-211,-219,-227,-236,-244,-252,-259,-267,-274,-282,-289,-296,-302,-309,-315,-321,-327,-333,-338,-344,-349,-353,-358,-362,-367,-371,-374,-378,-381,-384,-387,-389,-391,-393,-395,-397,-398,-399,-400,-400,-400,-400,-400,-400,-399,-398,-397,-395,-393,-391,-389,-387,-384,-381,-378,-374,-371,-367,-362,-358,-353,-349,-344,-338,-333,-327,-321,-315,-309,-302,-296,-289,-282,-274,-267,-259,-252,-244,-236,-227,-219,-211,-202,-193,-184,-175,-166,-157,-148,-138,-129,-119,-110,-100,-90,-80,-71,-61,-51,-41,-31,-21,-11]
         }
      ]
   }
`

];


//
//   setupWaveforms - call when a new waveformSetup message is received from the REST API
//

var nWaveforms;
var waveformHeight;

function setupWaveforms(setupWaveformDataMessage) {

   //homeScreen.setupWaveforms(setupWaveformDataMessage);

   homeScreen.clearWaveformList();

   // Parse the JSON string into JavaScript object
   const waveformData = JSON.parse(setupWaveformDataMessage);

   nWaveforms = waveformData.waveforms.length;
   waveformHeight = Math.round(homeScreen.waveformAreaHeight / nWaveforms);

   // Add waveforms from the parsed data
   var order = 0;
   waveformData.waveforms.forEach(waveform => {
      // Create an instance of Waveform class
      const wvf = new Waveform(waveform.waveformName, order);
      homeScreen.addWaveform(wvf);
      order++;
   });

}


//
//   resetWaveforms
//

var waveformSetIndex = 0;

function resetWaveforms(shiftWaveforms) {

   //const randomInteger = Math.floor(Math.random() * 2);

   if (shiftWaveforms) {
      waveformSetIndex++
      if (waveformSetIndex >= currentWaveforms.length) {
         waveformSetIndex = 0;
      }
   }

   pauseWaveformDrawing = 1;

   setupWaveforms(currentWaveforms[waveformSetIndex]);

   pauseWaveformDrawing = 0;

   if (window.simulatedDataMode == 0) {
      simulateArrivalOfWaveformMessage();
      simulateArrivalOfWaveformMessage();
   }

   redrawHomeScreen = 1;

}


//
//   shiftWaveforms  
//

function shiftWaveforms() {

   resetWaveforms(1);

}


//
//   drawHomeScreenAreas
//

function drawHomeScreenAreas() {

   // Assuming this.ctx is a CanvasRenderingContext2D or a similar object

   displayCtx.fillStyle = "#000000";
   displayCtx.clearRect(homeScreen.left, homeScreen.top, homeScreen.width, homeScreen.height);
   displayCtx.fillRect(homeScreen.left, homeScreen.top, homeScreen.width, homeScreen.height);

   displayCtx.fillStyle = "#444444";
   displayCtx.clearRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);
   displayCtx.fillRect(homeScreen.headerLeft, homeScreen.headerTop, homeScreen.headerWidth, homeScreen.headerHeight);

   displayCtx.fillStyle = "#ff0000";
   displayCtx.clearRect(homeScreen.rightParamAreaLeft, homeScreen.rightParamAreaTop, homeScreen.rightParamAreaWidth, homeScreen.rightParamAreaHeight);
   displayCtx.fillRect(homeScreen.rightParamAreaLeft, homeScreen.rightParamAreaTop, homeScreen.rightParamAreaWidth, homeScreen.rightParamAreaHeight);

   displayCtx.fillStyle = "#ff5555";
   displayCtx.clearRect(homeScreen.bottomParamAreaLeft, homeScreen.bottomParamAreaTop, homeScreen.bottomParamAreaWidth, homeScreen.bottomParamAreaHeight);
   displayCtx.fillRect(homeScreen.bottomParamAreaLeft, homeScreen.bottomParamAreaTop, homeScreen.bottomParamAreaWidth, homeScreen.bottomParamAreaHeight);

   displayCtx.fillStyle = "#555555";
   displayCtx.clearRect(homeScreen.messageAreaLeft, homeScreen.messageAreaTop, homeScreen.messageAreaWidth, homeScreen.messageAreaHeight);
   displayCtx.fillRect(homeScreen.messageAreaLeft, homeScreen.messageAreaTop, homeScreen.messageAreaWidth, homeScreen.messageAreaHeight);

   // Initial clear for buffer canvas
   bufferCtx.fillStyle = 'black';
   bufferCtx.fillRect(0, 0, bufferCanvas.width, bufferCanvas.height);

}


//
//   startStopWaveforms
//

function startStopWaveforms() {

   // Get the button element by its ID
   var button = document.getElementById('StartStopWaveformsButton');

   //Check the current label and update it
   if (button.textContent === 'Pause Waveforms') {
      button.textContent = 'Restart Waveforms';
      pauseWaveformDrawing = 1;
   } else {
      button.textContent = 'Pause Waveforms';
      redrawHomeScreen = 1;
      //pauseWaveformDrawing = 0;
      resetWaveforms(0);
   }

}


//
//   drawWaveform
//

function drawWaveform(w) {

   wvf = homeScreen.waveforms[w];

   var sweepSpeedMMPerSecond = wvf.sweepSpeed;
   var pixelsPerSecond = sweepSpeedMMPerSecond * pixelsPerMM;
   var pixelsPerMS = pixelsPerSecond / 1000;
   var MSPerPixel = 1 / pixelsPerMS;
   var MSPerSample = 1000 / wvf.sampleRate;
   if (window.simulatedDataMode) {
      var MSPerSample = 1000 / wvf.sampleRateIn;
   }

   if (w == 2) {
      var q = 0;
   }
   const normalizeWaveform = (value) => {

      normalizedValue = wvf.top + wvf.height - ((value - wvf.yMin) / (wvf.yMax - wvf.yMin) * wvf.height);

      if (normalizedValue < wvf.top + 1) {
         normalizedValue = wvf.top + 1;
      }
      else if (normalizedValue > wvf.bottom - 1) {
         normalizedValue = wvf.bottom - 1;
      }
      return normalizedValue;
   };

   //
   //   Draw new samples
   //

   var NewSamplePixelsDrawn = 0 ;

   displayCtx.beginPath();

   displayCtx.strokeStyle = wvf.color;
   displayCtx.lineWidth = 2;
   displayCtx.lineJoin = 'round';
   displayCtx.lineCap = 'round';

   //displayCtx.moveTo(wvf.drawXLast, wvf.drawYLast);

   while (wvf.drawXTime < wvf.elapsedTime) {

      //if (MSPerPixel > MSPerSample) {   we now upsample 50Hz waveform so that this is always true

      var avgYSum = 0;
      var avgYCount = 0;
      var lowestY = Number.MAX_VALUE;

      while (wvf.drawnPixelTime > wvf.readSampleTime) {

         if (window.simulatedDataMode) {
            var thisY = normalizeWaveform(wvf.simulatedSamples[wvf.tailIndex]);
            wvf.tailIndex = (wvf.tailIndex + 1) % wvf.maxSimulatedSampleIndex;
            wvf.samplesDrawn++;
            wvf.readSampleTime += MSPerSample;
         }
         else {
            var thisY = normalizeWaveform(wvf.readSample());
            //LOGEVENTYELLOW("1 readSample from ", wvf.waveformName, " = ", thisY) ;
            wvf.samplesDrawn++;
            wvf.readSampleTime += MSPerSample;
         }

         avgYSum += thisY;
         avgYCount++;

         if (thisY < lowestY) {
            lowestY = thisY;
         }

      }

      //if ECG (to preserve peaks) use :wvf.drawY = lowestY;
      const index = wvf.waveformName.indexOf("ECG");
      if (index !== -1) {
         wvf.drawY = lowestY;
      } else {
         wvf.drawY = avgYSum / avgYCount;
      }

      //if (wvf.drawX > wvf.drawXLast) {
         displayCtx.moveTo(wvf.drawXLast, wvf.drawYLast);
         displayCtx.lineTo(wvf.drawX, wvf.drawY);
         if (wvf.fill) {
            displayCtx.lineTo(wvf.drawX, wvf.bottom - 1);
            //displayCtx.moveTo(wvf.drawX, wvf.drawY);
         }
      //}
      wvf.drawXLast = wvf.drawX ;
      wvf.drawYLast = wvf.drawY ;

      NewSamplePixelsDrawn++ ;

      wvf.drawX++;
      if (wvf.drawX >= wvf.right) {
         wvf.drawX = wvf.left ;
      }
      wvf.drawXLast = wvf.drawX ;

      wvf.drawXTime += MSPerPixel ;
      wvf.drawnPixelTime += MSPerPixel ;

   }

   displayCtx.stroke();
 
   //
   //   Draw erase bar
   //

   displayCtx.beginPath();

   displayCtx.strokeStyle = "#000000";
   displayCtx.lineWidth = 2;
   displayCtx.lineJoin = 'round';
   displayCtx.lineCap = 'round';

   displayCtx.moveTo(wvf.eraseX, wvf.top);

   var eraseBarPixelsDrawn = 0 ;
   while (eraseBarPixelsDrawn < NewSamplePixelsDrawn) {

      displayCtx.moveTo(wvf.eraseX, wvf.top + 1);
      displayCtx.lineTo(wvf.eraseX, wvf.bottom - 1);

      wvf.eraseX++;
      if (wvf.eraseX >= wvf.right) {
         wvf.eraseX = wvf.left ;
      }

      eraseBarPixelsDrawn++ ;

   }

   displayCtx.stroke();

}


//
//   drawWaveforms
//

function drawWaveforms(elapsed) {

   if (pauseWaveformDrawing == 1) return;

   if (elapsed == 0) return;

   var w;
   for (w = 0; w < homeScreen.waveforms.length; w++) {

      wvf = homeScreen.waveforms[w];

      wvf.elapsedTime += elapsed;

      drawWaveform(w);

   }

   //debugger;

}


//
//   drawHomeScreen
//

var frameCount = 0;

let fpsDisplay = document.getElementById('fps-display'); // Assuming you have an HTML element to display the frame rate

var redrawHomeScreen = 1;

let lastTime;
let elapsedTime;

function drawHomeScreen(timestamp) {

   if (redrawHomeScreen == 1) {
      redrawHomeScreen = 0;
      drawHomeScreenAreas();
   }

   if (!lastTime) {
      lastTime = timestamp;
   }

   if (timestamp) {

      elapsedTime = timestamp - lastTime;
      lastTime = timestamp;

      if (elapsedTime) {

         framesPerSecond = 1000 / elapsedTime; // Calculate frames per second
         fpsDisplay.textContent = `Frame Rate: ${Math.round(framesPerSecond)} FPS`;

         //drawMovingWaveforms(elapsedTime);
         drawWaveforms(elapsedTime);

      }

   }

   frameCount++;

   //if (frameCount < 300) {
      requestAnimationFrame(drawHomeScreen);
   //}

}

function processWaveformDataMessage(newWaveformDataMessage) {

   if (pauseWaveformDrawing == 1) return;

   waveformDataMessageCount++
   LOGEVENT(" ");
   LOGEVENTGREEN('in processWaveformDataMessage, count = ', waveformDataMessageCount);

   // Parse the JSON string into JavaScript object
   const waveformData = JSON.parse(newWaveformDataMessage);

   // See if the waveform setup is changing
   var somethingChanged = 0;
   var nWaveformswaveformDataMessage = waveformData.waveforms.length;
   if (nWaveformswaveformDataMessage != nWaveforms) {
      somethingChanged = 1;
   }
   else {
      var w;
      for (w = 0; w < waveformData.waveforms.length; w++) {
         if (waveformData.waveforms[w].waveformName != homeScreen.waveforms[w].waveformName) {
            somethingChanged = 1;
            break;
         }
      }
   }

   if (somethingChanged) {
      setupWaveforms(newWaveformDataMessage);
   }
   else {

      // Write samples from this message into waveform ring buffers
      var w;
      for (w = 0; w < waveformData.waveforms.length; w++) {
         var foundMatch = 0;
         var cw;
         for (cw = 0; w < homeScreen.waveforms.length; cw++) {
            if (waveformData.waveforms[w].waveformName == homeScreen.waveforms[cw].waveformName) {
               foundMatch = 1;
               break;
            }
         }
         if (foundMatch) {

            var wvf = homeScreen.waveforms[cw];

            var minY;
            var maxY;

            minY = Number.MAX_VALUE;
            maxY = Number.MIN_VALUE;

            //samples = waveformData.waveforms[cw].waveformSamples.split(',');
            samplesIn = waveformData.waveforms[cw].waveformSamples ;
            var samplesWritten = 0;
            var s;
            // upsample to simplify waveform drawing
            if (wvf.sampleRateIn == 50) { 
               for (s = 0; s < samplesIn.length; s++) {
                  var thisSample = samplesIn[s] ;
                  var difference = thisSample - wvf.lastSample ;
                  var increment  = difference / 5 ;
                  var i;
                  for (i = 0; i < 5; i++) {
                     var valueToWrite = thisSample + increment * i ;
                     wvf.writeSample(valueToWrite);
                     samplesWritten++;
                     if (valueToWrite < minY) {
                        minY = valueToWrite ;
                     }
                     else if (valueToWrite > maxY) {
                        maxY = valueToWrite ;
                     }
                  }
                  wvf.lastSample = thisSample ;
               }
            }
            else {
               for (s = 0; s < samplesIn.length; s++) {
                  wvf.writeSample(samplesIn[s]);
                  samplesWritten++;
                  if (valueToWrite < minY) {
                     minY = valueToWrite ;
                  }
                  else if (valueToWrite > maxY) {
                     maxY = valueToWrite ;
                  }
               }
            }

            if (wvf.autoScale) {

               var amplitude = maxY - minY;

               wvf.yMin = minY - amplitude * window.autoscaleOffsetPercentage / 100 ;
               wvf.yMax = maxY + amplitude * window.autoscaleOffsetPercentage / 100 ;

            }

            LOGEVENTGREEN("Read ", homeScreen.waveforms[cw].bufferReadCount, " samples from ", homeScreen.waveforms[cw].waveformName);
            homeScreen.waveforms[cw].bufferReadCount = 0;

            LOGEVENTGREEN("Wrote ", samplesWritten, " samples to ", homeScreen.waveforms[cw].waveformName);
         }
      }
   }

   var w;
   for (w = 0; w < homeScreen.waveforms.length; w++) {

      LOGEVENTGREEN("homeScreen waveform ", homeScreen.waveforms[w].waveformName, " buffer has ", homeScreen.waveforms[w].getNSamples(), "samples");

   }

}

// Define the function to be executed at each interval
function simulateArrivalOfWaveformMessage() {

   processWaveformDataMessage(currentWaveforms[waveformSetIndex]);

}



// Call resizeCanvas initially and on window resize

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Set the background of the canvas to black
displayCtx.fillStyle = 'black';
displayCtx.fillRect(0, 0, displayCanvas.width, displayCanvas.height);


//
//   Compute parameters used for waveform drawing
//
//   Adjust these values based on the display
//

const screenWidthMM = 500;
const screenWidthPixels = 1920;
const pixelsPerMM = screenWidthPixels / screenWidthMM ;

//
//   Create and initialize home screen
//

let pauseWaveformDrawing = 0;
var framesPerSecond = 60;

homeScreen = new HomeScreen(displayCanvas.width, displayCanvas.height);
homeScreen.initializeAreas();
//homeScreen.setupWaveforms(waveformDataMessage);

resetWaveforms(0) ;

// Start drawing
drawHomeScreen();

var waveformDataMessageCount = 0;

// Set the interval to execute the function every 1000 milliseconds (1 second)
if (window.simulatedDataMode == 0) {
   const intervalId = setInterval(simulateArrivalOfWaveformMessage, 1000);
}

// To stop the interval after a certain amount of time (e.g., 5 seconds), you can use setTimeout
// setTimeout(() => {
//    clearInterval(intervalId); // This stops the interval
//    console.log('Interval stopped.');
// }, 10000);

