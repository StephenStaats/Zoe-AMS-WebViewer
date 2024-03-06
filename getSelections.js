// Dummy data
const data = [
  { deviceId: "1", deviceName: "Device 1", patientFirstName: "", patientLastName: "" },
  { deviceId: "2", deviceName: "Device 2", patientFirstName: "Preserved", patientLastName: "Killick" },
  { deviceId: "3", deviceName: "Device 3", patientFirstName: "Diana", patientLastName: "Villers" },
  { deviceId: "4", deviceName: "Device 4", patientFirstName: "Jack", patientLastName: "Aubrey" },
  { deviceId: "5", deviceName: "Device 5", patientFirstName: "Stephen", patientLastName: "Maturin" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
   { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
  { deviceId: "ID6", deviceName: "Device 2", patientFirstName: "Jane", patientLastName: "Smith" },
  { deviceId: "ID7", deviceName: "Device 1", patientFirstName: "John", patientLastName: "Doe" },
];
 

//
//   populateList  
//

function populateList() {
  const listBody = document.getElementById('scrollableList');

  data.forEach(item => {
    const listItem = document.createElement('div');
    listItem.classList.add('list-item');

    const deviceNameColumn = document.createElement('div');
    deviceNameColumn.classList.add('column');
    deviceNameColumn.textContent = item.deviceName;
    listItem.appendChild(deviceNameColumn);

    const firstNameColumn = document.createElement('div');
    firstNameColumn.classList.add('column');
    firstNameColumn.textContent = item.patientFirstName;
    listItem.appendChild(firstNameColumn);

    const lastNameColumn = document.createElement('div');
    lastNameColumn.classList.add('column');
    lastNameColumn.textContent = item.patientLastName;
    listItem.appendChild(lastNameColumn);

    listItem.onclick = () => handleListItemClick(item); // Assign click event handler
    listItem.dataset.deviceId = item.deviceId; // Store deviceId as a data attribute
    listBody.appendChild(listItem);
  });
}


//
//   handleListItemClick  
//

function handleListItemClick(item) {
   // Access the associated deviceId when needed
   const deviceId = item.deviceId;
   console.log("Selected item:", item);
   console.log("Associated deviceId:", deviceId);
   //window.selectedDeviceId = deviceId ;
   sessionStorage.setItem("selectedDeviceId", deviceId);
   window.location.href = "index.html";
}

// Call the function to populate list when the page loads
window.onload = populateList;


//
//   showLiveScreen  
//

function showLiveScreen() {
   window.location.href = 'index.html';
}



