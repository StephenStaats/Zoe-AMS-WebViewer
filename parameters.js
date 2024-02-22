//
//   Parameter
//   

// Define the Parameter class globally
function Parameter(parameterName) {

   this.parameterName = parameterName;

}

//
//   setupParameters - call when a new parameterDataMessage is received from the REST API
//

var nParameters = 0 ;

function setupParameters(setupParameterDataMessage) {

   homeScreen.clearParameterList();

   // Parse the JSON string into JavaScript object
   const parameterData = JSON.parse(setupParameterDataMessage);

   nParameters = parameterData.parameters.length;

   // Add parameters from the parsed data
   parameterData.parameters.forEach(parameter => {
      // Create an instance of Parameter class
      const param = new Parameter(parameter.parameterName);
      homeScreen.addParameter(param);
   });

}


//
//   processParameterDataMessage
//

var parameterDataMessageCount = 0;

var parameterSetIndex = 0;

function processParameterDataMessage(newParameterDataMessage) {

   parameterDataMessageCount++
   LOGEVENT(" ");
   LOGEVENTGREEN('in processParameterDataMessage, count = ', parameterDataMessageCount);

   // Parse the JSON string into JavaScript object
   const parameterData = JSON.parse(newParameterDataMessage);

   // See if the parameter setup is changing
   var somethingChanged = 0;
   var nParametersparameterDataMessage = parameterData.parameters.length;
   if (nParametersparameterDataMessage != nParameters) {
      somethingChanged = 1;
   }
   else {
      var p;
      for (p = 0; p < parameterData.parameters.length; p++) {
         LOGEVENTYELLOW(p + " message = " + parameterData.parameters[p].parameterName + "homeScreen = " + homeScreen.parameters[p].parameterName) ;

         if (parameterData.parameters[p].parameterName != homeScreen.parameters[p].parameterName) {
            somethingChanged = 1;
            break;
         }
      }
   }

   if (somethingChanged) {
      setupParameters(newParameterDataMessage);
   }
   else {
   }

   var p = 0 ;

}


//
//   shiftParameters  
//

function shiftParameters() {

   parameterSetIndex++;

   if (parameterSetIndex >= currentParameters.length) {
      parameterSetIndex = 0;
   }

}



