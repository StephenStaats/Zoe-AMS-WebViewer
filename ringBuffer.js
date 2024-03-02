//
//   RingBuffer
//   

// Define the RingBuffer class globally
function RingBuffer(name, capacity) {
   this.name = name;
   this.capacity = capacity;
   this.buffer = new Array(capacity);
   this.head = 0; // Points to the next available position for adding a sample
   this.tail = 0; // Points to the oldest sample in the buffer
   this.size = 0; // Tracks the number of elements in the buffer

}

// Method to add a sample to the buffer
RingBuffer.prototype.enqueue = function(sample) {
   // Check if the buffer is full
   if (this.size === this.capacity) {
      //throw new Error(this.name + " Buffer is full");
      LOGEVENTRED(this.name + " Buffer is full");
   }
   this.buffer[this.head] = sample;
   this.head = (this.head + 1) % this.capacity;
   this.size++;
};

// Method to remove and return the oldest sample from the buffer
RingBuffer.prototype.dequeue = function() {
      // Check if the buffer is empty
      if (this.size === 0) {
         //throw new Error(this.name + " Buffer is empty");
         //LOGEVENTRED(this.name + " Buffer is empty (dequeue)");
         return (window.LEAD_OFF_OR_UNPLUGGED);
      }
      const sample = this.buffer[this.tail];
      this.tail = (this.tail + 1) % this.capacity;
      this.size--;
      return sample;
};

// Method to peek at current sample 
RingBuffer.prototype.peek = function() {
   // Check if the buffer is empty
   if (this.size === 0) {
      //throw new Error(this.name + " Buffer is empty");
      LOGEVENTRED(this.name + " Buffer is empty (peek)");
      return (window.LEAD_OFF_OR_UNPLUGGED);
   }
   const sample = this.buffer[this.tail];
   return sample;
};

// Method to peek at next sample 
RingBuffer.prototype.peekNext = function() {
   // Check if the buffer is empty
   if (this.size === 0) {
      //throw new Error(this.name + " Buffer is empty");
      LOGEVENTRED(this.name + " Buffer is empty (peekNext)");
      return (window.LEAD_OFF_OR_UNPLUGGED);
   }
   const sample = this.buffer[(this.tail + 1) % this.capacity];
   return sample;
};

   // Method to check if the buffer is empty
RingBuffer.prototype.isEmpty = function() {
   return this.size === 0;
};

// Method to check if the buffer is full
RingBuffer.prototype.isFull = function() {
   return this.size === this.capacity;
};

// Method to get the number of elements in the buffer
RingBuffer.prototype.getSize = function() {
   return this.size;
};

// Method to get the capacity of the buffer
RingBuffer.prototype.getCapacity = function() {
   return this.capacity;
};

// Method to convert the buffer to an array
RingBuffer.prototype.toArray = function() {
   const result = [];
   let current = this.tail;
   for (let i = 0; i < this.size; i++) {
      result.push(this.buffer[current]);
      current = (current + 1) % this.capacity;
   }
   return result;
};

